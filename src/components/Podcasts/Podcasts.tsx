import { podcasts } from "../../data/podcasts";
import CoverGrid from "../CoverGrid/CoverGrid";
import CoverTile from "../CoverGrid/CoverTile";

function Podcasts() {
  if (podcasts.length === 0) return null;

  return (
    <div className="w-full">
      <CoverGrid variant="podcasts">
        {podcasts.map((podcast) => (
          <CoverTile
            key={podcast.slug}
            ratio="square"
            title={podcast.name}
            subtitle={podcast.host}
            note={podcast.note}
            cover={podcast.cover}
            href={podcast.href}
          />
        ))}
      </CoverGrid>
    </div>
  );
}

export default Podcasts;
