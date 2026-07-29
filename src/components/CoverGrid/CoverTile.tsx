import { cn } from "../../lib/cn";
import type { CoverRatio } from "../../data/types";
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
}

/**
 * One item in a cover grid.
 *
 * When `cover` is absent the artwork falls back to a typographic panel rather
 * than a broken image, so the grid reads as designed before any jacket images
 * exist — the same principle as the project media placeholders.
 */
function CoverTile({ title, subtitle, note, cover, href, ratio }: CoverTileProps) {
  const art = (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg bg-neutral-50 ring-1 ring-neutral-900/5",
        "transition-transform duration-300 ease-out-expo group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0",
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
        <div className="absolute inset-0 flex flex-col justify-end gap-2 p-3">
          <span className="h-px w-6 bg-rose-300" />
          <span className="line-clamp-4 text-[11px] font-medium lowercase leading-snug text-neutral-600">
            {title}
          </span>
        </div>
      )}
    </div>
  );

  const caption = (
    <div className="mt-2.5">
      {cover && (
        <div className="text-xs font-medium lowercase leading-snug text-neutral-800">
          {title}
        </div>
      )}
      {subtitle && (
        <div
          className={cn(
            "text-xs lowercase leading-snug",
            cover ? "mt-0.5 text-neutral-400" : "font-medium text-neutral-800"
          )}
        >
          {subtitle}
        </div>
      )}
      {note && (
        <div className="mt-1 line-clamp-2 text-xs lowercase leading-snug text-neutral-500">
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
