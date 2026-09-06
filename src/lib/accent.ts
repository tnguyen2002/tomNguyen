/**
 * Per-item accent hues.
 *
 * The page shows exactly one project at a time, so giving each project its own
 * hue adds real colour without ever putting seven of them on screen together —
 * the accent simply changes as you move down the index. The same palette
 * tints the cover-grid fallbacks, which are otherwise a wall of grey panels.
 *
 * All seven are muted and roughly equal in lightness, so no single one jumps
 * out of the row, and every one clears 4.5:1 on the warm canvas.
 */
export interface Accent {
  /** Text and icon colour. */
  fg: string;
  /** Very low-alpha fill for selected rows and tinted panels. */
  wash: string;
  /** Hairline / border tint. */
  ring: string;
}

export const ACCENTS: Accent[] = [
  { fg: "#B8502F", wash: "#FBF0EB", ring: "#EBD5C9" }, // clay
  { fg: "#855C0D", wash: "#FAF3E4", ring: "#EADFC3" }, // ochre (darkened: the
  //   original #9A6B12 sat at ~4.3:1 on the canvas, under the 4.5 floor for
  //   the 11px labels these are used for)
  { fg: "#5F7033", wash: "#F3F5E9", ring: "#DCE3C9" }, // olive
  { fg: "#1F6F63", wash: "#EAF4F2", ring: "#C6E0DA" }, // teal
  { fg: "#3D6389", wash: "#EDF2F7", ring: "#CBDAE7" }, // steel
  { fg: "#4E51A0", wash: "#F0F0FA", ring: "#D3D4EE" }, // indigo
  { fg: "#8A3F6B", wash: "#F9EDF4", ring: "#E9CFE0" }, // plum
];

/** Cycles, so adding an eighth project reuses the first hue rather than
 *  falling off the end. */
export const accentFor = (index: number): Accent =>
  ACCENTS[((index % ACCENTS.length) + ACCENTS.length) % ACCENTS.length];

function toRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const toHex = (r: number, g: number, b: number) =>
  `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const seg = Math.floor(h / 60) % 6;
  const table: [number, number, number][] = [
    [c, x, 0],
    [x, c, 0],
    [0, c, x],
    [0, x, c],
    [x, 0, c],
    [c, 0, x],
  ];
  const [r, g, b] = table[seg];
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

const channel = (c: number) => {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const luminance = ([r, g, b]: [number, number, number]) =>
  0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

/** True when a colour is dark enough that the usual gradient lift and gloss
 *  turn it grey instead of giving it depth. */
export function isVeryDark(hex: string): boolean {
  const n = parseInt(hex.slice(1), 16);
  return luminance([(n >> 16) & 255, (n >> 8) & 255, n & 255]) < 0.05;
}

/** True when a colour is light enough that white detail on it disappears. */
export function isLight(hex: string): boolean {
  const n = parseInt(hex.slice(1), 16);
  return luminance([(n >> 16) & 255, (n >> 8) & 255, n & 255]) > 0.55;
}

/** Contrast of a colour against pure white. */
const onWhite = (rgb: [number, number, number]) =>
  1.05 / (luminance(rgb) + 0.05);

/**
 * A vivid version of a hue, for icon tiles only.
 *
 * The palette is deliberately muted because it carries *text*, which has to
 * clear 4.5:1 on a light ground. An app icon carries none — it is a coloured
 * tile with a white glyph on it — and at that muteness it reads washed out
 * next to a real dock.
 *
 * Saturation is pushed up, but lightness is *solved for* rather than pinned:
 * perceived lightness varies enormously by hue, so a fixed HSL lightness that
 * suits blue turns yellow and teal into near-white and drops the white glyph
 * to ~1.7:1. This walks lightness down from bright until the white glyph
 * clears the 3:1 floor for graphical objects, taking the most vivid value
 * that qualifies.
 */
export function vivid(hex: string, minContrast = 3.4): string {
  const [r0, g0, b0] = toRgb(hex).map((c) => c / 255);
  const max = Math.max(r0, g0, b0);
  const min = Math.min(r0, g0, b0);
  const l0 = (max + min) / 2;
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    if (max === r0) h = ((g0 - b0) / d) % 6;
    else if (max === g0) h = (b0 - r0) / d + 2;
    else h = (r0 - g0) / d + 4;
  }
  h *= 60;
  if (h < 0) h += 360;

  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l0 - 1));
  const saturated = Math.min(1, s * 1.5);

  let best = hslToRgb(h, saturated, 0.24);
  for (let l = 0.62; l >= 0.24; l -= 0.005) {
    const rgb = hslToRgb(h, saturated, l);
    if (onWhite(rgb) >= minContrast) {
      best = rgb;
      break;
    }
  }
  return toHex(best[0], best[1], best[2]);
}

/** Mix a hex colour toward white. Used for the top stop of a dock icon's
 *  gradient — a flat tile reads as a sticker, a graded one reads as an icon. */
export function lighten(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const mix = (channel: number) =>
    Math.round(channel + (255 - channel) * amount);
  const r = mix((n >> 16) & 255);
  const g = mix((n >> 8) & 255);
  const b = mix(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
