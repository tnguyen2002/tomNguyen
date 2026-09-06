import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import AppTile from "./AppTile";
import { APPS } from "../../data/apps";

interface DockProps {
  activeId: string | null;
  onOpen: (id: string) => void;
}

function DockTile({
  children,
  label,
  active,
}: {
  children: ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <li className="dock-item group relative flex flex-col items-center">
      {/* macOS tooltip: light translucent pill, dark text, caret underneath.
          aria-hidden because the control beneath already carries the same text
          as its accessible name. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 whitespace-nowrap rounded-md bg-[#dbd8d4]/95 px-2.5 py-1 text-[0.8125rem] text-[#1b1816] opacity-0 shadow-[0_2px_8px_rgba(12,10,9,0.35)] ring-1 ring-black/10 transition-opacity duration-150 after:absolute after:left-1/2 after:top-full after:-ml-[5px] after:border-[5px] after:border-transparent after:border-t-[#dbd8d4]/95 after:content-[''] group-hover:opacity-100 motion-reduce:transition-none"
      >
        {label}
      </span>

      <div className="dock-tile">{children}</div>

      {/* Running-app indicator: only the open app gets a dot. The span is
          always rendered so the row keeps its height and the icons do not
          shift when the open app changes. */}
      <span
        aria-hidden="true"
        className={cn(
          "mt-1.5 h-1.5 w-1.5 rounded-full transition-colors duration-200 motion-reduce:transition-none",
          active ? "bg-black/85" : "bg-transparent"
        )}
      />
    </li>
  );
}

// The dock is desktop-only, so there is no small-screen variant to carry.
const TILE = "h-full w-full";

function Dock({ activeId, onOpen }: DockProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-4">
      <nav
        aria-label="Dock"
        // No backdrop-filter: it is the single most expensive thing that can sit
        // behind an animation, and the wallpaper under it is a smooth gradient
        // with no detail to blur — it cost frames and bought nothing.
        className="pointer-events-auto rounded-[1.375rem] border border-white/15 bg-white/[0.14] px-3 py-2 shadow-[0_14px_46px_rgba(12,10,9,0.45)]"
      >
        <ul className="flex items-end gap-3.5">
          {APPS.map((app) => (
            <DockTile
              key={app.id}
              label={app.label}
              active={activeId === app.id}
            >
              <button
                type="button"
                onClick={() => onOpen(app.id)}
                aria-label={app.label}
                aria-current={activeId === app.id ? "page" : undefined}
                className="block h-full w-full"
              >
                <AppTile app={app} className={TILE} />
              </button>
            </DockTile>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Dock;
