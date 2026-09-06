import type { ReactNode } from "react";
import { accentFor } from "../../lib/accent";
import { podcasts } from "../../data/podcasts";
import { tracks } from "../../data/songs";
import type { Track } from "../../data/types";
import CoverGrid from "../CoverGrid/CoverGrid";
import CoverTile from "../CoverGrid/CoverTile";

/**
 * Everything that goes in your ears: podcasts, soundtracks, albums and songs,
 * as one app rather than four.
 *
 * The track rows are driven by this table rather than repeated by hand, so a
 * new row is one entry here plus a `kind` in data/types.ts. `accentOffset`
 * keeps adjacent rows from opening on the same hue.
 *
 * A row with nothing in it does not render at all — better an absent row than
 * an empty grid or invented filler.
 */
const ROWS: { kind: Track["kind"]; heading: string; accentOffset: number }[] = [
  { kind: "soundtrack", heading: "soundtracks", accentOffset: 2 },
  { kind: "album", heading: "albums", accentOffset: 4 },
  { kind: "song", heading: "songs", accentOffset: 6 },
];

function Row({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="mb-10 last:mb-0">
      <h3 className="meta mb-4">{heading}</h3>
      <CoverGrid variant="podcasts">{children}</CoverGrid>
    </section>
  );
}

function Ears() {
  return (
    <div className="w-full">
      {podcasts.length > 0 && (
        <Row heading="podcasts">
          {podcasts.map((podcast, index) => (
            <CoverTile
              key={podcast.slug}
              ratio="square"
              title={podcast.name}
              subtitle={podcast.host}
              note={podcast.note}
              cover={podcast.cover}
              href={podcast.href}
              accent={accentFor(index)}
            />
          ))}
        </Row>
      )}

      {ROWS.map(({ kind, heading, accentOffset }) => {
        const group = tracks.filter((track) => track.kind === kind);
        if (group.length === 0) return null;

        return (
          <Row key={kind} heading={heading}>
            {group.map((track, index) => (
              <CoverTile
                key={track.slug}
                ratio="square"
                title={track.title}
                subtitle={track.artist}
                note={track.note}
                cover={track.cover}
                href={track.href}
                accent={accentFor(index + accentOffset)}
              />
            ))}
          </Row>
        );
      })}
    </div>
  );
}

export default Ears;
