import { cn } from "../../lib/cn";
import type { CoverRatio } from "../../data/types";
import type { Accent } from "../../lib/accent";
import ExternalLink from "../ExternalLink/ExternalLink";

const RATIO: Record<CoverRatio, string> = {
  portrait: "aspect-[2/3]",
  square: "aspect-square",
};

export interface CoverTileProps {
  title: string;
  subtitle?: string;
  note?: string;
  cover?: string;
  href?: string;
  ratio: CoverRatio;
  /** Tints the fallback jacket. Ignored when a real cover image exists — the
   *  artwork should carry its own colour. */
  accent?: Accent;
}

/**
 * One item in a cover grid.
 *
 * When `cover` is absent the artwork falls back to a typographic panel rather
 * than a broken image, so the grid reads as designed before any jacket images
 * exist — the same principle as the project media placeholders.
 */
function CoverTile({
  title,
  subtitle,
  note,
  cover,
  href,
  ratio,
  accent,
}: CoverTileProps) {
  const art = (
    <div
      style={
        !cover && accent
          ? { backgroundColor: accent.wash, borderColor: accent.ring }
          : undefined
      }
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-surface shadow-soft ring-1 ring-line",
        "transition-all duration-300 ease-out-expo group-hover:-translate-y-1 group-hover:shadow-lift motion-reduce:transition-none motion-reduce:group-hover:translate-y-0",
        RATIO[ratio]
      )}
    >
      {cover ? (
        <img
          src={cover}
          alt={`${title} cover`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      ) : (
        // Stands in for the jacket, so it carries the title the way a real
        // cover would — which is why the caption below drops it in this case.
        <div className="absolute inset-0 flex items-end p-3.5">
          <span
            style={accent ? { color: accent.fg } : undefined}
            className="line-clamp-5 text-balance text-[0.875rem] font-medium leading-snug tracking-[-0.01em] text-fg"
          >
            {title}
          </span>
        </div>
      )}
    </div>
  );

  const caption = (
    <div className="mt-2.5">
      {cover && (
        <div className="text-[0.8125rem] font-medium leading-snug text-fg">
          {title}
        </div>
      )}
      {subtitle && (
        <div
          className={cn(
            "text-[0.75rem] leading-snug",
            cover ? "mt-0.5 text-fg-subtle" : "text-fg-subtle"
          )}
        >
          {subtitle}
        </div>
      )}
      {note && (
        <div className="mt-1 line-clamp-2 text-[0.75rem] leading-snug text-fg-subtle">
          {note}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <ExternalLink href={href} className="group block rounded-lg">
        {art}
        {caption}
      </ExternalLink>
    );
  }

  return (
    <div className="group">
      {art}
      {caption}
    </div>
  );
}

export default CoverTile;
