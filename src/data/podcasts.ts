import type { Podcast } from "./types";
// import { podcastCover } from "../lib/media";

/**
 * TODO(tom): placeholders — replace with what you actually listen to.
 *
 * To add artwork: save a square image at public/media/podcasts/<slug>.jpg and
 * add `cover: podcastCover("<slug>")`. Podcast art is square (1:1); grabbing
 * it from the show's page at ~600px is plenty.
 */
export const podcasts: Podcast[] = [
  {
    slug: "acquired",
    name: "Acquired",
    host: "Ben Gilbert & David Rosenthal",
    note: "placeholder — swap for a real one",
  },
  {
    slug: "dwarkesh",
    name: "Dwarkesh Podcast",
    host: "Dwarkesh Patel",
  },
  {
    slug: "lex-fridman",
    name: "Lex Fridman Podcast",
    host: "Lex Fridman",
  },
];
