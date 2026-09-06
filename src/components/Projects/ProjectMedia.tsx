import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { useInView } from "../../hooks/useInView";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import type { ProjectVisual, Ratio } from "../../data/types";
import type { Accent } from "../../lib/accent";
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

/**
 * Cap each tile's width by its shape so the detail pane stays balanced. Without
 * this, a portrait phone capture rendered at the full pane width is over 1000px
 * tall and pushes every word of the write-up below the fold, while a 16:9 empty
 * state becomes a 440px void.
 */
const MAX_WIDTH: Record<Ratio, string> = {
  video: "max-w-[40rem]",
  wide: "max-w-[40rem]",
  square: "max-w-[26rem]",
  portrait: "max-w-[20rem]",
};

interface ProjectMediaProps {
  visual: ProjectVisual;
  name: string;
  stack?: string[];
  year?: string;
  /** The owning project's hue, forwarded to the two placeholder states. */
  accent?: Accent;
}

function PlayButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="absolute inset-0 grid place-items-center bg-fg/5 transition-colors hover:bg-fg/10 motion-reduce:transition-none"
    >
      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 shadow-sm ring-1 ring-line">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-5 w-5 fill-accent">
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
  // 0.4 rather than 0.5 so a demo is already running by the time it settles in
  // the pane, instead of starting a beat after you arrive.
  const [containerRef, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });

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

  /**
   * Loop whenever the tile is on screen, and stop when it is not.
   *
   * This used to be hover-to-play on anything with a pointer, which meant the
   * demos never ran unless you happened to mouse over them. Playing on
   * visibility instead is also what keeps the cost down: every project is
   * rendered at once in the scrolling list, but only the one or two actually
   * in view are ever decoding.
   */
  useEffect(() => {
    if (reduceMotion) return;
    if (inView) play();
    else pause();
  }, [inView, reduceMotion, play, pause]);

  const showPlayButton = (reduceMotion || needsTap) && !playing;

  return (
    <div
      ref={containerRef}
      className={cn(FRAME, RATIO[visual.ratio], MAX_WIDTH[visual.ratio])}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
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

function ProjectMedia({
  visual,
  name,
  stack,
  year,
  accent,
}: ProjectMediaProps) {
  if (visual.kind === "video") {
    return <VideoTile visual={visual} name={name} />;
  }

  if (visual.kind === "image") {
    return (
      <div className={cn(FRAME, RATIO[visual.ratio], MAX_WIDTH[visual.ratio])}>
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

  return (
    <MediaPlaceholder
      kind={visual.kind}
      stack={stack}
      year={year}
      accent={accent}
    />
  );
}

export default ProjectMedia;
