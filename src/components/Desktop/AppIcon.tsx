import { memo, useId, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { isLight, isVeryDark, lighten, vivid, type Accent } from "../../lib/accent";
import { BRAND_PATHS } from "../BrandIcon/BrandIcon";
import VSCodeMark from "./VSCodeMark";
import NotesMark from "./NotesMark";
import type { SocialId } from "../../data/types";

export type GlyphId =
  | "home"
  | "netflix"
  | "phone"
  | "vscode"
  | "notes"
  | "spotify"
  | "projects"
  | "experience"
  | "bookshelf"
  | "podcasts"
  | "checklist"
  | "mail";

/**
 * Apple's icon shape is a superellipse ("squircle"), not a rounded rectangle —
 * the corner curvature is continuous rather than an arc spliced onto a
 * straight edge, which is most of why `border-radius` never quite looks right.
 *
 * Sampled once at module load into a path in a 100x100 box. n = 5 is close to
 * the iOS/macOS curve; 160 steps is smooth well past the size we render at.
 */
function superellipse(n = 5, steps = 160, size = 100): string {
  const r = size / 2;
  const points: string[] = [];
  for (let i = 0; i < steps; i += 1) {
    const t = (i / steps) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const x = r + r * Math.sign(c) * Math.abs(c) ** (2 / n);
    const y = r + r * Math.sign(s) * Math.abs(s) ** (2 / n);
    points.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `M${points.join("L")}Z`;
}

const SQUIRCLE = superellipse();

/**
 * Glyphs are solid shapes on a 24-unit grid, not strokes — App Store icons are
 * built from filled forms, and a hairline stroke reads as a UI symbol rather
 * than an app. Interior detail is done with white at lower opacity, or a soft
 * black overlay, so every glyph works on any hue.
 */
const GLYPHS: Record<GlyphId, ReactNode> = {
  // Placeholders: `vscode` and `notes` are multi-tone artwork on their own
  // 100-unit grids (VSCodeMark / NotesMark) and are branched on below. They
  // sit in this map only so GlyphId stays a single source of truth.
  notes: null,
  // Spotify mark. Path from simpleicons.org (icon set MIT, path data CC0); the
  // mark is Spotify's trademark. The wave bars are knocked out of the disc, so
  // filling it green over a black tile gives the real two-colour icon.
  spotify: <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />,
  vscode: <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />,
  // Netflix mark. Path from simpleicons.org (icon set MIT, path data CC0); the
  // mark is Netflix's trademark. Red on black, as the real app icon is.
  netflix: <path d="m5.398 0 8.348 23.602c2.346.059 4.856.398 4.856.398L10.113 0H5.398zm8.489 0v9.172l4.715 13.33V0h-4.715zM5.398 1.5V24c1.873-.225 2.81-.312 4.715-.398V14.83L5.398 1.5z" />,
  // Handset, for the Phone-style tile. Drawn rather than extracted: iOS's
  // Phone app has no macOS counterpart, and the simulator runtime omits the
  // bundle, so there is no official artwork on this machine to lift.
  phone: (
    <path d="M6.5 10.8a17.6 17.6 0 0 0 6.7 6.7l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.4.6 3.7.6.6 0 1 .5 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 3.9c0-.6.5-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.7.1.4 0 .8-.3 1.1l-2.3 2.1Z" />
  ),
  home: (
    <>
      <path d="M12 1.9 1.6 10.6l1.5 1.8L12 4.9l8.9 7.5 1.5-1.8Z" />
      <path d="M4.6 13.2 12 7l7.4 6.2v7.2a1.6 1.6 0 0 1-1.6 1.6h-3.6v-5.4a2.2 2.2 0 0 0-4.4 0V22H6.2a1.6 1.6 0 0 1-1.6-1.6Z" opacity=".85" />
    </>
  ),
  projects: (
    <>
      <path d="M12 2.4 22.6 8.3 12 14.2 1.4 8.3Z" />
      <path d="m4.7 11.6-3.3 1.8L12 19.3l10.6-5.9-3.3-1.8L12 15.6Z" opacity=".72" />
      <path d="m4.7 16.2-3.3 1.8L12 23.9l10.6-5.9-3.3-1.8L12 20.2Z" opacity=".48" />
    </>
  ),
  experience: (
    <>
      <path d="M9.2 2.6h5.6a3 3 0 0 1 3 3v1.6h-2.5V6a1 1 0 0 0-1-1h-4.6a1 1 0 0 0-1 1v1.2H6.2V5.6a3 3 0 0 1 3-3Z" />
      <rect x="1.6" y="7.2" width="20.8" height="14.2" rx="3.2" />
      <rect x="1.6" y="12.4" width="20.8" height="1.7" opacity=".18" fill="#000" />
      <rect x="10.1" y="11.2" width="3.8" height="4.1" rx="1" fill="#000" opacity=".22" />
    </>
  ),
  bookshelf: (
    <>
      <path d="M11.1 6.4C9.5 5 7.2 4.3 3.8 4.2A1.5 1.5 0 0 0 2.2 5.7v12.1c0 .8.6 1.5 1.5 1.5 3.1.1 5.2.7 6.7 1.9a1 1 0 0 0 .7.2Z" />
      <path
        d="M12.9 6.4c1.6-1.4 3.9-2.1 7.3-2.2a1.5 1.5 0 0 1 1.6 1.5v12.1c0 .8-.6 1.5-1.5 1.5-3.1.1-5.2.7-6.7 1.9a1 1 0 0 1-.7.2Z"
        opacity=".78"
      />
    </>
  ),
  podcasts: (
    <>
      <rect x="8.9" y="1.9" width="6.2" height="11.6" rx="3.1" />
      <path d="M4.4 10.6a1.25 1.25 0 0 1 2.5 0 5.1 5.1 0 0 0 10.2 0 1.25 1.25 0 0 1 2.5 0 7.6 7.6 0 0 1-6.35 7.5v2.3a1.25 1.25 0 0 1-2.5 0v-2.3a7.6 7.6 0 0 1-6.35-7.5Z" />
    </>
  ),
  checklist: (
    <>
      <rect x="1.6" y="3.2" width="7.4" height="7.4" rx="2.3" opacity=".95" />
      <path d="m3.5 6.9 1.4-1.4 1 1 2.2-2.2 1.4 1.4-3.6 3.6Z" fill="#000" opacity=".3" />
      <rect x="1.6" y="13.4" width="7.4" height="7.4" rx="2.3" opacity=".95" />
      <path d="m3.5 17.1 1.4-1.4 1 1 2.2-2.2 1.4 1.4-3.6 3.6Z" fill="#000" opacity=".3" />
      <rect x="11.6" y="5.1" width="10.8" height="2.4" rx="1.2" opacity=".85" />
      <rect x="11.6" y="15.3" width="10.8" height="2.4" rx="1.2" opacity=".85" />
    </>
  ),
  mail: (
    <>
      <rect x="1.6" y="4.4" width="20.8" height="15.2" rx="3.4" />
      <path
        d="M2.9 6.6 11 12.5a1.7 1.7 0 0 0 2 0l8.1-5.9v1.9l-7.2 5.2a2.9 2.9 0 0 1-3.8 0L2.9 8.5Z"
        fill="#000"
        opacity=".24"
      />
    </>
  ),
};

/** Fraction of the tile a glyph should occupy. A disc-shaped mark needs more
 *  room than a line-drawn one to look the same weight. */
const GLYPH_FRACTION: Partial<Record<GlyphId, number>> = {
  spotify: 0.7,
  netflix: 0.62,
};
const DEFAULT_FRACTION = 0.53;

interface AppIconProps {
  glyph: GlyphId;
  accent: Accent;
  className?: string;
  /** Exact tile colour, for icons that carry a brand's own hue. Bypasses
   *  `vivid()`, which would shift a brand colour off-spec. */
  brandColor?: string;
  /** Mark colour, when the glyph is not white — e.g. a brand icon whose real
   *  form is a coloured mark on a light tile. */
  glyphColor?: string;
}

/**
 * A dock/home-screen app icon.
 *
 * The whole thing is one SVG so the squircle can be shared by the fill, the
 * gloss, the glyph clip and the rim light — clipping a DOM element to this
 * shape would need the path duplicated in a clip-path and would still lose the
 * inner rim highlight.
 */
function AppIcon({
  glyph,
  accent,
  className,
  brandColor,
  glyphColor,
}: AppIconProps) {
  // Instance-scoped ids: several icons render at once and duplicate gradient
  // ids would make every tile inherit the first one's fill.
  const uid = useId().replace(/:/g, "");
  const fill = `f-${uid}`;
  const gloss = `g-${uid}`;
  const clip = `c-${uid}`;
  const shade = `s-${uid}`;

  // Tile colour only — accent.fg stays the muted value everywhere it carries
  // text.
  const base = brandColor ?? vivid(accent.fg);
  // The gradient lift and gloss are calibrated for mid-tone tiles. On a
  // near-black brand tile they just turn the top grey — a black app icon is
  // genuinely flat black — so both are pulled right back at the extremes.
  const veryDark = isVeryDark(base);
  const light = isLight(base);
  const top = veryDark ? base : lighten(base, light ? 0.06 : 0.3);
  const glossTop = veryDark ? 0.06 : light ? 0.3 : 0.42;
  const glossMid = veryDark ? 0.01 : 0.06;

  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={cn(className)}
    >
      <defs>
        <linearGradient id={fill} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={base} />
        </linearGradient>
        {/* Specular sweep across the top third, the way a glass-faced icon
            catches light. */}
        <linearGradient id={gloss} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={glossTop} />
          <stop offset="0.55" stopColor="#fff" stopOpacity={glossMid} />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {/* Contact shade along the bottom edge, inside the shape. */}
        <linearGradient id={shade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.2" />
        </linearGradient>
        <clipPath id={clip}>
          <path d={SQUIRCLE} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clip})`}>
        <rect width="100" height="100" fill={`url(#${fill})`} />
        <rect width="100" height="100" fill={`url(#${gloss})`} />
        <rect width="100" height="100" fill={`url(#${shade})`} />

        {/* 24-unit glyph scaled to 54% of the tile and centred. No drop-shadow
            on this group on purpose: it was a second filter per icon, and
            filters re-rasterise as the tile scales under dock magnification.
            Every hue clears 3.4:1 against white, so the glyph does not need
            one to separate. */}
        {glyph === "vscode" ? (
          // Already a 100-unit drawing with its own fills, so it needs its own
          // scale and must not inherit a glyph colour.
          <g transform="translate(19 19) scale(0.62)">
            <VSCodeMark />
          </g>
        ) : glyph === "notes" ? (
          // Full-bleed: the yellow band runs to the tile edge and is cropped
          // by the squircle, so no inset transform.
          <NotesMark />
        ) : (
          <g
            transform={(() => {
              const size = 100 * (GLYPH_FRACTION[glyph] ?? DEFAULT_FRACTION);
              const offset = (100 - size) / 2;
              return `translate(${offset} ${offset}) scale(${size / 24})`;
            })()}
            fill={glyphColor ?? "#fff"}
          >
            {GLYPHS[glyph]}
          </g>
        )}
      </g>

      {/* Rim light: a hairline inside the edge, brightest at the top. Drawn
          after the clip so it sits on top of the fill rather than under it. */}
      <path
        d={SQUIRCLE}
        fill="none"
        stroke={light ? "#000" : "#fff"}
        strokeOpacity={light ? 0.14 : 0.3}
        strokeWidth="1.5"
        clipPath={`url(#${clip})`}
      />
    </svg>
  );
}

/**
 * The same tile for the social links, in graphite. Shares SQUIRCLE so the whole
 * dock is one shape — a rounded-rect next to a superellipse is exactly the kind
 * of mismatch that reads as "not a real icon".
 */
/** Memoised: `accentFor` returns a stable object from the palette array and
 *  the className is a constant, so an app switch re-renders the dock without
 *  rebuilding nine SVG trees. */
function BrandTileImpl({
  id,
  className,
}: {
  id: SocialId;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const fill = `bf-${uid}`;
  const gloss = `bg-${uid}`;
  const clip = `bc-${uid}`;

  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={cn(className)}
    >
      <defs>
        <linearGradient id={fill} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#4a4642" />
          <stop offset="1" stopColor="#1d1b19" />
        </linearGradient>
        <linearGradient id={gloss} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.03" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={clip}>
          <path d={SQUIRCLE} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clip})`}>
        <rect width="100" height="100" fill={`url(#${fill})`} />
        <rect width="100" height="100" fill={`url(#${gloss})`} />
        <g transform="translate(26 26) scale(2)" fill="#fff" fillOpacity="0.92">
          <path d={BRAND_PATHS[id]} />
        </g>
      </g>

      <path
        d={SQUIRCLE}
        fill="none"
        stroke="#fff"
        strokeOpacity="0.22"
        strokeWidth="1.5"
        clipPath={`url(#${clip})`}
      />
    </svg>
  );
}

export const BrandTile = memo(BrandTileImpl);

export default memo(AppIcon);
