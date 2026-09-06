import { checklist, checklistNote } from "../../data/checklist";
import { cn } from "../../lib/cn";
import { accentFor } from "../../lib/accent";

function Before30Checklist() {
  const doneCount = checklist.filter((item) => item.done).length;

  return (
    <div className="w-full max-w-3xl">
      {/* No heading here — the app's own title ("Reminders", with the
          "30 under 30" subtitle, set in data/apps.tsx) is the page h1, and
          repeating it stacked three near-identical headings on mobile. */}
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="meta">
          {doneCount} / {checklist.length} done
        </span>
      </div>

      <ol className="mt-6 grid grid-cols-2 gap-x-10">
        {checklist.map((item, idx) => (
          <li
            key={idx}
            className="flex items-baseline gap-3 border-b border-line py-2.5"
          >
            {/* Done entries get a tick in the item's own hue instead of a grey
                strike-through — the list was rendering as one long grey block. */}
            {item.done ? (
              <span
                aria-hidden="true"
                style={{ color: accentFor(idx).fg }}
                className="font-mono text-[0.6875rem] leading-none"
              >
                &#10003;
              </span>
            ) : (
              <span className="font-mono text-[0.6875rem] tabular-nums text-fg-subtle">
                {String(idx + 1).padStart(2, "0")}
              </span>
            )}
            <span
              className={cn(
                "text-[0.875rem] leading-relaxed",
                item.done ? "text-fg-subtle line-through" : "text-fg-muted"
              )}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-6 max-w-measure text-[0.875rem] leading-relaxed text-fg-subtle">
        {checklistNote}
      </p>
    </div>
  );
}

export default Before30Checklist;
