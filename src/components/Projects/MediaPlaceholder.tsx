import { cn } from "../../lib/cn";
import { FRAME } from "./frame";

interface MediaPlaceholderProps {
  kind: "pending" | "none";
  stack?: string[];
  year?: string;
}

/**
 * What sits in the media column before (or instead of) a demo.
 *
 * "pending" promises a demo is coming. "none" makes no promise at all — it is
 * for projects that will never have one, and leans on the stack tags to fill
 * the space so the row reads as a designed panel rather than a hole.
 */
function MediaPlaceholder({ kind, stack = [], year }: MediaPlaceholderProps) {
  if (kind === "pending") {
    return (
      <div
        className={cn(
          FRAME,
          "aspect-video border border-dashed border-rose-200 bg-rose-50/40 ring-0"
        )}
      >
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-sm lowercase tracking-[0.15em] text-rose-400">
            demo coming soon
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(FRAME, "aspect-video bg-neutral-50")}>
      <div className="absolute inset-0 flex flex-col justify-center gap-1.5 p-8 sm:p-10">
        {stack.map((item) => (
          <span
            key={item}
            className="text-lg lowercase leading-snug tracking-tight text-rose-500/80 sm:text-xl lg:text-2xl"
          >
            {item}
          </span>
        ))}
      </div>
      {year && (
        <span className="absolute right-6 top-6 text-xs tabular-nums tracking-[0.2em] text-neutral-400">
          {year}
        </span>
      )}
    </div>
  );
}

export default MediaPlaceholder;
