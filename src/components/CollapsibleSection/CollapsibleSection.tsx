import { useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";

interface CollapsibleSectionProps {
  id: string;
  label: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

/**
 * Disclosure section.
 *
 * The height animation uses grid-template-rows 0fr -> 1fr rather than
 * max-height. The old code transitioned to `max-h-none`, which is not an
 * interpolable value, so the height never actually animated — only opacity did,
 * and the content popped.
 *
 * The grid approach needs no measurement, so it stays correct when the content
 * height changes underneath it (web font swapping in, a video's aspect box
 * resolving, bullets rewrapping on resize). It degrades to an instant snap on
 * Safari < 16.4, where the content is still fully visible and functional.
 */
function CollapsibleSection({
  id,
  label,
  defaultOpen = false,
  children,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;

  return (
    <section className="w-full border-t border-neutral-200/70 first:border-t-0">
      <h2>
        <button
          type="button"
          id={triggerId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
          className="group flex w-full items-center gap-2 py-5 text-left"
        >
          <span className="text-xl font-bold lowercase tracking-tight text-rose-500 sm:text-2xl">
            {label}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "text-xl transition-transform duration-300 ease-out-expo motion-reduce:transition-none",
              open ? "rotate-90" : "group-hover:translate-x-1"
            )}
          >
            &#8594;
          </span>
        </button>
      </h2>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={cn(
          "grid w-full transition-[grid-template-rows,opacity,visibility] duration-500 ease-out-expo motion-reduce:transition-none",
          open
            ? "visible grid-rows-[1fr] opacity-100"
            : "invisible grid-rows-[0fr] opacity-0"
        )}
      >
        {/* min-h-0 is mandatory — without it the 0fr row will not clamp.
            The bottom padding has to sit on a CHILD of the grid item, not the
            item itself: min-height:0 does not shrink padding, so padding here
            would keep the collapsed row 40px tall instead of 0. */}
        <div className="min-h-0 overflow-hidden">
          <div className="pb-10">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default CollapsibleSection;
