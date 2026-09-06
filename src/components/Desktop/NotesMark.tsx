import { useId } from "react";

/**
 * A notepad mark in the style of Apple's Notes icon: yellow header band, a
 * perforated tear line, then ruled paper.
 *
 * Redrawn as vector rather than lifted from the system `.icns`, so nothing of
 * Apple's is redistributed, it stays crisp at any size, and it lives in the
 * same squircle/gloss/rim system as every other icon here. The visual design
 * is Apple's.
 *
 * Full-bleed on a 100-unit grid — the band runs edge to edge and is cropped by
 * the tile's squircle clip, so this is not inset like the other glyphs.
 */
function NotesMark() {
  const uid = useId().replace(/:/g, "");
  const band = `notes-band-${uid}`;
  const paper = `notes-paper-${uid}`;

  return (
    <>
      <defs>
        <linearGradient id={band} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FEDC63" />
          <stop offset="1" stopColor="#F3BE3D" />
        </linearGradient>
        <linearGradient id={paper} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDFCFA" />
          <stop offset="1" stopColor="#EFEDE8" />
        </linearGradient>
      </defs>

      <rect width="100" height="100" fill={`url(#${paper})`} />
      <rect width="100" height="31" fill={`url(#${band})`} />

      {/* Tear line: notches bitten out of the paper just under the band. */}
      <g fill="#E8E4DC">
        {Array.from({ length: 9 }, (_, i) => (
          <rect
            key={i}
            x={7.5 + i * 10.4}
            y="31"
            width="6"
            height="4.4"
            rx="3"
          />
        ))}
      </g>

      {/* Rules. Kept clear of the squircle's bottom curve. */}
      <g fill="#E2DFD8">
        <rect x="0" y="52" width="100" height="2" />
        <rect x="0" y="74" width="100" height="2" />
      </g>
    </>
  );
}

export default NotesMark;
