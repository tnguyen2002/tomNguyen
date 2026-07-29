import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { useInView } from "../../hooks/useInView";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import type { ProjectVisual, Ratio } from "../../data/types";
import MediaPlaceholder from "./MediaPlaceholder";
import { FRAME } from "./frame";

/** Literal lookup, never `aspect-[${ratio}]` — the Tailwind JIT scans source
 *  text and would purge an interpolated class. */
const RATIO: Record<Ratio, string> = {
  video: "aspect-video",
  wide: "aspect-[16/10]",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
};

interface ProjectMediaProps {
  visual: ProjectVisual;
  name: string;
  stack?: string[];
  year?: string;
}

function PlayButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="absolute inset-0 grid place-items-center bg-neutral-900/5 transition-colors hover:bg-neutral-900/10 motion-reduce:transition-none"
    >
      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 shadow-sm ring-1 ring-neutral-900/10">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-5 w-5 fill-rose-500">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}

function VideoTile({
  visual,
  name,
}: {
  visual: Extract<ProjectVisual, { kind: "video" }>;
  name: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);

  const reduceMotion = usePrefersReducedMotion();
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [containerRef, inView] = useInView<HTMLDivElement>({ threshold: 0.5 });

  // React sets `muted` as a property and does not always reflect the attribute,
  // which trips iOS's autoplay gate. Set it directly too.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, []);

  const play = useCallback(() => {
    // play() rejects on iOS Low Power Mode and on fast hover in/out
    // (AbortError). An uncaught rejection here is a console error on every
    // pointer flick, so it always gets a catch.
    videoRef.current?.play()?.catch(() => setNeedsTap(true));
  }, []);

  const pause = useCallback(() => {
    const element = videoRef.current;
    if (!element) return;
    element.pause();
    element.currentTime = 0;
  }, []);

  // Touch devices have no hover, so play while the tile is at least half on
  // screen instead.
  useEffect(() => {
    if (reduceMotion || canHover) return;
    if (inView) play();
    else pause();
  }, [inView, canHover, reduceMotion, play, pause]);

  const hoverProps =
    canHover && !reduceMotion
      ? {
          onMouseEnter: play,
          onMouseLeave: pause,
          onFocus: play,
          onBlur: pause,
        }
      : {};

  const showPlayButton = (reduceMotion || needsTap) && !playing;

  return (
    <div
      ref={containerRef}
      className={cn(FRAME, RATIO[visual.ratio])}
      {...hoverProps}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
        aria-label={visual.alt}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="h-full w-full object-cover"
      >
        <source src={visual.src} type="video/mp4" />
      </video>

      {/* A sibling <img> rather than the video's poster attribute: the poster
          attribute is fetched eagerly by every video on the page, while this
          gets native lazy-loading and a controllable crossfade. */}
      <img
        src={visual.poster}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 motion-reduce:transition-none",
          playing ? "opacity-0" : "opacity-100"
        )}
      />

      {showPlayButton && (
        <PlayButton
          label={`play demo for ${name}`}
          onClick={() => {
            setNeedsTap(false);
            const element = videoRef.current;
            if (element) element.controls = true;
            play();
          }}
        />
      )}
    </div>
  );
}

function ProjectMedia({ visual, name, stack, year }: ProjectMediaProps) {
  if (visual.kind === "video") {
    return <VideoTile visual={visual} name={name} />;
  }

  if (visual.kind === "image") {
    return (
      <div className={cn(FRAME, RATIO[visual.ratio])}>
        <img
          src={visual.src}
          alt={visual.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return <MediaPlaceholder kind={visual.kind} stack={stack} year={year} />;
}

export default ProjectMedia;
