import { useState } from "react";
import { cn } from "./lib/cn";
import Dock from "./components/Desktop/Dock";
import Wallpaper from "./components/Desktop/Wallpaper";
import ScaledDesktop from "./components/Desktop/ScaledDesktop";
import { APPS } from "./data/apps";

function App() {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Home *is* the desktop: nothing open falls back to it, so an app is always
  // showing and the page always has exactly one h1.
  const active = APPS.find((app) => app.id === (activeId ?? "home")) ?? null;

  return (
    <>
      {/* Outside the scaled canvas on purpose: the wallpaper should bleed to
          the real viewport edges, not stop at the 1280 canvas on a wide
          screen. It is the only thing that still knows the true size. */}
      <Wallpaper />

      {/* One layout at one width, zoomed to fit. Nothing below here may use a
          `sm:`/`md:`/`lg:` variant — see the note in ScaledDesktop. */}
      <ScaledDesktop>
        <div className="relative h-full">
          {/* The window area: fills the canvas minus the dock, and the window
              sizes itself within it. Previously the panel just grew with its
              content, so a long app ran off the bottom and its last lines sat
              *underneath* the dock. */}
          <main className="relative mx-auto flex h-full w-full max-w-content items-center justify-center px-6 pb-[8.5rem] pt-10">
            {active && (
              // The open app is the page, so its title is the h1 — the same way
              // a routed SPA gives each view its own.
              <section
                key={active.id}
                aria-labelledby="app-title"
                className={cn(
                  "animate-rise rounded-2xl border border-white/20 bg-white/90 shadow-[0_16px_50px_rgba(20,16,14,0.22)] backdrop-blur-2xl backdrop-saturate-150",
                  // Sized to its content, capped at the canvas, and vertically
                  // centred in it. The parent's `items-center` is what lets it
                  // be shorter than full height — flex's default `stretch`
                  // forced it to fill. `max-h-full` keeps it from ever exceeding
                  // the container, which is what makes centring safe: a taller
                  // child would be centred with its top cut off and unreachable.
                  //
                  // The six document apps all overflow, so they land on one size
                  // anyway. Home is deliberately the exception: a card's worth of
                  // content in a full-height window is mostly empty, and because
                  // this section is keyed by app id and re-mounts with
                  // `animate-rise`, a different size reads as a different window
                  // rather than as a panel resizing under you.
                  "flex max-h-full w-full flex-col overflow-hidden",
                  active.maxWidth ?? "max-w-content"
                )}
              >
                <div className="flex shrink-0 items-center gap-4 px-8 pb-4 pt-7">
                  <div className="min-w-0">
                    <h1
                      id="app-title"
                      // No manual tracking: San Francisco already applies its own
                      // optical tracking per size, so tightening on top of that
                      // makes the title narrower than any native macOS label.
                      className="text-[1.25rem] font-semibold text-fg"
                    >
                      {active.title ?? active.label}
                    </h1>
                    {active.subtitle && (
                      <p className="mt-0.5 text-[0.8125rem] text-fg-muted">
                        {active.subtitle}
                      </p>
                    )}
                  </div>
                  {active.headerAccessory && (
                    <div className="ml-auto">{active.headerAccessory}</div>
                  )}
                </div>

                {/* min-h-0 is mandatory: without it a flex child refuses to
                    shrink below its content and the scrollbar never appears. */}
                <div
                  // Marked so content can find the element it actually scrolls
                  // in. This div scrolls, not the page, so anything doing
                  // scroll-spy or scroll-to has to target it, not the window.
                  data-window-scroll=""
                  className="min-h-0 flex-1 overflow-y-auto px-8 pb-8"
                >
                  {active.content}
                </div>
              </section>
            )}
          </main>

          {/* Clicking the running app closes it, which lands back on Home. */}
          <Dock
            activeId={active?.id ?? null}
            onOpen={(id) => setActiveId((current) => (current === id ? null : id))}
          />
        </div>
      </ScaledDesktop>
    </>
  );
}

export default App;
