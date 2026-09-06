import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { accentFor } from "../../lib/accent";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { projects } from "../../data/projects";
import ProjectArticles from "./ProjectArticles";

/** How far below the top of the scroller a project must be before it counts as
 *  the current one. */
const SPY_OFFSET = 40;

/** easeInOutCubic — slow at both ends, quick through the middle. */
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

/**
 * Every project in one continuous scroll, with the index acting as both a table
 * of contents and a scroll-spy.
 *
 * The scrolling happens inside the app window (see `data-window-scroll` in
 * App.tsx), not on the page — so both the spy and the scroll-to target that
 * element. `scrollIntoView` is avoided for the same reason: it walks up to
 * whatever ancestor it likes and can drag the page with it.
 */
function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [biteSizedOpen, setBiteSizedOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const animRef = useRef(0);
  /** True while a click-driven scroll is running. The spy stands down so the
   *  highlight goes straight to the target instead of walking through every
   *  project on the way. */
  const jumpingRef = useRef(false);
  const reduceMotion = usePrefersReducedMotion();

  // Stable, so the memoised article list never re-renders.
  const register = useCallback((el: HTMLElement | null, index: number) => {
    itemRefs.current[index] = el;
  }, []);

  const scroller = useCallback(
    (): HTMLElement | null =>
      rootRef.current?.closest<HTMLElement>("[data-window-scroll]") ??
      (document.scrollingElement as HTMLElement | null),
    []
  );

  useEffect(() => {
    const container = scroller();
    if (!container) return;
    const target: HTMLElement | Window =
      container === document.scrollingElement ? window : container;

    let frame = 0;
    const measure = () => {
      frame = 0;
      if (jumpingRef.current) return;
      const top =
        container === document.scrollingElement
          ? 0
          : container.getBoundingClientRect().top;
      let current = 0;
      itemRefs.current.forEach((el, index) => {
        if (el && el.getBoundingClientRect().top - top <= SPY_OFFSET) {
          current = index;
        }
      });
      setActiveIndex(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    /**
     * Each project gets a minimum height of one visible pane, so scrolling to
     * one leaves the next below the fold. Measured rather than a hardcoded
     * `calc(100vh - …)`, because the pane depends on the dock, the title bar
     * and the viewport, and a fixed guess drifts out of sync with all three.
     */
    const syncPaneHeight = () => {
      const root = rootRef.current;
      if (!root) return;
      const pane =
        container === document.scrollingElement
          ? window.innerHeight
          : container.clientHeight;
      // A small surplus, never a deficit: at exactly the pane height a rounding
      // error is enough to let the next project show a sliver.
      root.style.setProperty("--pane-h", `${pane + 8}px`);
    };

    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncPaneHeight);
    syncPaneHeight();
    measure();
    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncPaneHeight);
      if (frame) cancelAnimationFrame(frame);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [scroller]);

  /**
   * Scrolling into a bite-sized project opens the group, so the index never
   * highlights an entry that is folded out of sight. Deliberately one-way: it
   * does not re-collapse on the way back up, which would yank the list closed
   * under the cursor and undo a manual expand.
   */
  useEffect(() => {
    if (projects[activeIndex]?.biteSized) setBiteSizedOpen(true);
  }, [activeIndex]);

  const goTo = (index: number) => {
    // Set immediately rather than waiting for the scroll handler, so the index
    // responds on click even when the target cannot be scrolled to (the last
    // project already at the bottom).
    setActiveIndex(index);

    const container = scroller();
    const el = itemRefs.current[index];
    if (!container || !el) return;

    if (animRef.current) cancelAnimationFrame(animRef.current);

    const from = container.scrollTop;
    const delta =
      container === document.scrollingElement
        ? el.getBoundingClientRect().top
        : el.getBoundingClientRect().top -
          container.getBoundingClientRect().top;
    const to = Math.max(0, from + delta);

    if (reduceMotion || Math.abs(to - from) < 1) {
      container.scrollTop = to;
      return;
    }

    /**
     * Animated by hand rather than with `behavior: "smooth"`.
     *
     * Native smooth scrolling gives no control over duration, so a jump across
     * seven projects takes as long as a jump across one and reads as sluggish.
     * This scales the duration with distance but caps it, and — because we know
     * exactly when it ends — the spy can be held off for precisely that long.
     */
    const distance = Math.abs(to - from);
    const duration = Math.min(620, Math.max(260, distance * 0.28));
    const start = performance.now();
    jumpingRef.current = true;

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      container.scrollTop = from + (to - from) * ease(t);
      if (t < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        animRef.current = 0;
        jumpingRef.current = false;
      }
    };
    animRef.current = requestAnimationFrame(step);
  };

  /**
   * The index is split into two lists, but the scroll-spy and `goTo` both
   * address projects by their position in `projects` — so the partition has to
   * carry the original index. The printed number is separate: it counts in
   * display order (featured first, then bite-sized), otherwise the two lists
   * interleave and read 01, 04, 05 … 02, 03.
   */
  const entries = projects.map((item, index) => ({ item, index }));
  const featured = entries.filter(({ item }) => !item.biteSized);
  const biteSized = entries.filter(({ item }) => item.biteSized);
  const ordinal = new Map(
    [...featured, ...biteSized].map(({ index }, position) => [index, position + 1])
  );

  const navItem = ({ item, index }: (typeof entries)[number]) => {
    const active = index === activeIndex;
    const hue = accentFor(index);
    return (
      <li key={item.slug}>
        <button
          type="button"
          onClick={() => goTo(index)}
          aria-current={active ? "true" : undefined}
          style={active ? { backgroundColor: hue.wash, color: hue.fg } : undefined}
          className={cn(
            "group flex w-full items-baseline gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-200 motion-reduce:transition-none",
            active ? "shadow-soft" : "hover:bg-surface"
          )}
        >
          <span
            style={active ? undefined : { color: hue.fg, opacity: 0.55 }}
            className="font-mono text-[0.6875rem] tabular-nums"
          >
            {String(ordinal.get(index) ?? index + 1).padStart(2, "0")}
          </span>
          {/* Clamped: the pathology project's real title runs to four
              lines here and wrecks the index rhythm. */}
          <span
            title={item.name}
            className={cn(
              "line-clamp-2 flex-1 text-[0.9375rem] leading-snug transition-colors motion-reduce:transition-none",
              active ? "font-medium" : "text-fg-muted group-hover:text-fg"
            )}
          >
            {item.name}
          </span>
          {item.year && (
            <span
              className={cn(
                "shrink-0 font-mono text-[0.6875rem] tabular-nums",
                active ? "opacity-70" : "text-fg-subtle"
              )}
            >
              {item.year}
            </span>
          )}
        </button>
      </li>
    );
  };

  return (
    <div ref={rootRef} className="grid grid-cols-12 gap-16">
      <nav
        aria-label="project index"
        className="sticky top-0 col-span-3 self-start"
      >
        <ul className="flex flex-col gap-0.5">
          {featured.map(navItem)}

          <li className="mt-4">
            <button
              type="button"
              onClick={() => setBiteSizedOpen((open) => !open)}
              aria-expanded={biteSizedOpen}
              aria-controls="project-index-bite-sized"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-subtle transition-colors hover:text-fg-muted motion-reduce:transition-none"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 8 10"
                width="6"
                height="8"
                style={{ transform: `rotate(${biteSizedOpen ? 90 : 0}deg)` }}
                className="shrink-0 overflow-visible transition-transform duration-200 ease-out-expo motion-reduce:transition-none"
              >
                <path
                  d="M1 1l5 4-5 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Bite Sized
            </button>
            {/* The `hidden` attribute goes on a bare wrapper, never on the
                list itself. `[hidden] { display: none }` comes from the UA
                stylesheet, so any author-level display utility outranks it —
                `hidden` on an element also carrying `flex` collapsed nothing,
                and the group stayed open however the chevron was pointing. */}
            <div id="project-index-bite-sized" hidden={!biteSizedOpen}>
              <ul className="flex flex-col gap-0.5">
                {biteSized.length > 0 ? (
                  biteSized.map(navItem)
                ) : (
                  <li className="px-3 py-2 text-[0.8125rem] italic text-fg-subtle">
                    nothing here yet
                  </li>
                )}
              </ul>
            </div>
          </li>
        </ul>
      </nav>

      <ProjectArticles register={register} />
    </div>
  );
}

export default Projects;
