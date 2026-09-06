import { cn } from "../../lib/cn";
import type { Accent } from "../../lib/accent";
import { FRAME } from "./frame";

interface MediaPlaceholderProps {
  kind: "pending" | "none";
  stack?: string[];
  year?: string;
  accent?: Accent;
}

/**
 * What sits in the media column before (or instead of) a demo.
 *
 * "pending" promises a demo is coming. "none" makes no promise at all — it is
 * for projects that will never have one, and leans on the stack tags to fill
 * the space so the panel reads as designed rather than as a hole.
 */
function MediaPlaceholder({
  kind,
  stack = [],
  year,
  accent,
}: MediaPlaceholderProps) {
  if (kind === "pending") {
    // Deliberately shorter than a real figure and dashed: this is a stub, and
    // giving it a full 16:9 mount made it read as a broken image rather than
    // as "nothing here yet".
    // Left neutral on purpose. This is the largest surface in the pane, and
    // tinting it as well as the tags and links turned the whole column one
    // colour — the hue should be an accent, not a flood.
    return (
      <div
        style={accent ? { borderColor: accent.ring } : undefined}
        className="flex h-36 w-full max-w-[40rem] items-center justify-center rounded-2xl border border-dashed border-line-strong bg-surface/40"
      >
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-fg-subtle">
          demo coming soon
        </span>
      </div>
    );
  }

  return (
    <div
      style={
        accent
          ? { backgroundColor: accent.wash, borderColor: accent.ring }
          : undefined
      }
      className={cn(FRAME, "aspect-[16/9] max-w-[40rem]")}
    >
      <div className="absolute inset-0 flex flex-col justify-center gap-2 p-10">
        {stack.map((item) => (
          <span
            key={item}
            style={accent ? { color: accent.fg } : undefined}
            className="text-xl leading-snug tracking-[-0.01em] text-fg-subtle"
          >
            {item}
          </span>
        ))}
      </div>
      {year && <span className="meta absolute right-5 top-5">{year}</span>}
    </div>
  );
}

export default MediaPlaceholder;
