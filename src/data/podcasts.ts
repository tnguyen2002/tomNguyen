import type { Podcast } from "./types";
import { podcastCover } from "../lib/media";

/**
 * Artwork lives at public/media/podcasts/<slug>.jpg — square (1:1), 600px,
 * under the 80 KB cover budget. These two came from Apple's podcast artwork
 * CDN at 600x600.
 *
 * `note` is optional — add a one-line take on any of these if you want one
 * under the tile.
 */
export const podcasts: Podcast[] = [
  {
    slug: "acquired",
    name: "Acquired",
    host: "Ben Gilbert & David Rosenthal",
    cover: podcastCover("acquired"),
  },
  {
    slug: "how-i-built-this",
    name: "How I Built This",
    host: "Guy Raz",
    cover: podcastCover("how-i-built-this"),
  },
];
