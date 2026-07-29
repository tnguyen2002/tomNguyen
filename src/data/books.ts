import type { Book } from "./types";
// import { bookCover } from "../lib/media";

/**
 * TODO(tom): every entry below is a PLACEHOLDER so you can see the layout —
 * replace the whole array with what you've actually read.
 *
 * To add a cover: drop a jacket image at public/media/books/<slug>.jpg, then
 * uncomment the bookCover import and add `cover: bookCover("<slug>")`.
 * Without a cover the tile falls back to a typographic panel, so the grid
 * looks intentional either way. See README.md for sizing.
 */
export const books: Book[] = [
  {
    slug: "the-beginning-of-infinity",
    title: "The Beginning of Infinity",
    author: "David Deutsch",
    note: "placeholder — swap for a real one",
  },
  {
    slug: "siddhartha",
    title: "Siddhartha",
    author: "Hermann Hesse",
  },
  {
    slug: "the-selfish-gene",
    title: "The Selfish Gene",
    author: "Richard Dawkins",
  },
  {
    slug: "dune",
    title: "Dune",
    author: "Frank Herbert",
  },
];
