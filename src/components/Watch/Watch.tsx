import type { ReactNode } from "react";
import { accentFor } from "../../lib/accent";
import { watchlist } from "../../data/watchlist";
import type { Screening } from "../../data/types";
import CoverGrid from "../CoverGrid/CoverGrid";
import CoverTile from "../CoverGrid/CoverTile";

/** One entry per row; a row with nothing in it does not render. */
const ROWS: { kind: Screening["kind"]; heading: string; accentOffset: number }[] =
  [
    { kind: "show", heading: "shows", accentOffset: 0 },
    { kind: "movie", heading: "movies", accentOffset: 3 },
  ];

function Row({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="mb-10 last:mb-0">
      <h3 className="meta mb-4">{heading}</h3>
      {/* Posters are portrait like book jackets, so this uses the books grid
          rather than the square one the audio sections use. */}
      <CoverGrid variant="books">{children}</CoverGrid>
    </section>
  );
}

function Watch() {
  // Unlike the Spotify rows, an entirely empty app says so rather than rendering
  // a blank window — a section that silently shows nothing reads as broken.
  if (watchlist.length === 0) {
    return (
      <p className="max-w-measure text-[0.9375rem] leading-relaxed text-fg-muted">
        Nothing here yet.
      </p>
    );
  }

  return (
    <div className="w-full">
      {ROWS.map(({ kind, heading, accentOffset }) => {
        const group = watchlist.filter((item) => item.kind === kind);
        if (group.length === 0) return null;

        return (
          <Row key={kind} heading={heading}>
            {group.map((item, index) => (
              <CoverTile
                key={item.slug}
                ratio="portrait"
                title={item.title}
                note={item.note}
                cover={item.cover}
                href={item.href}
                accent={accentFor(index + accentOffset)}
              />
            ))}
          </Row>
        );
      })}
    </div>
  );
}

export default Watch;
