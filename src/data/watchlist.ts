import type { Screening } from "./types";
import { watchCover } from "../lib/media";

/**
 * Movies and shows. `by` is the director for films and the creator(s) for
 * series.
 *
 * Film series are ONE entry, not one per instalment: Iron Man, Thor, Captain
 * America, Avengers, Guardians, Ant-Man, Harry Potter, John Wick and Knives
 * Out each collapse to a single tile carrying the count in `note`. Listed
 * individually they buried everything else — the MCU alone was 21 of 44 tiles,
 * so the grid read as a Marvel shelf with a few other films stuck to it.
 * Standalone MCU films with no sequel (Doctor Strange, Homecoming, Black
 * Panther, Captain Marvel) stay on their own.
 *
 * A collapsed series keeps the first instalment's poster, so `slug` and the
 * cover stem intentionally diverge in places — `captain-america` is drawn by
 * captain-america-first-avenger.jpg. The posters for the other instalments are
 * still in public/media/watch/ and are simply unreferenced.
 *
 * Posters come from the English Wikipedia article for each film. Apple dropped
 * video from the public iTunes API (`media=movie`, `tvShow` and `shortFilm` all
 * return zero now, while books, podcasts and albums still work), so that route
 * is gone. Show posters come from TVMaze, which is free and needs no key.
 *
 * The Harry Potter posters come from the Harry Potter Fandom wiki instead: the
 * English Wikipedia articles use wide banner images (365x273, some of them even
 * filenamed "poster"), Wikidata has no P3383 for these films, and every
 * other-language Wikipedia uses a landscape logo too.
 *
 * Scope of the MCU set: phase 1 through Avengers: Endgame inclusive, minus
 * The Incredible Hulk. Spider-Man: Far From Home is *after* Endgame, so it is
 * out. John Wick is the four numbered films; Ballerina is a spin-off, not a
 * John Wick chapter, so it is out too. Say the word on either.
 */
export const watchlist: Screening[] = [
  {
    slug: "interstellar",
    title: "Interstellar",
    kind: "movie",
    cover: watchCover("interstellar"),
  },
  {
    slug: "the-prestige",
    title: "The Prestige",
    kind: "movie",
    cover: watchCover("the-prestige"),
  },
  {
    slug: "inception",
    title: "Inception",
    kind: "movie",
    cover: watchCover("inception"),
  },
  {
    slug: "memento",
    title: "Memento",
    kind: "movie",
    cover: watchCover("memento"),
  },
  {
    slug: "oppenheimer",
    title: "Oppenheimer",
    kind: "movie",
    cover: watchCover("oppenheimer"),
  },
  {
    slug: "everything-everywhere",
    title: "Everything Everywhere All at Once",
    kind: "movie",
    cover: watchCover("everything-everywhere"),
  },
  {
    slug: "marty-supreme",
    title: "Marty Supreme",
    kind: "movie",
    cover: watchCover("marty-supreme"),
  },
  {
    slug: "parasite",
    title: "Parasite",
    kind: "movie",
    cover: watchCover("parasite"),
  },
  {
    slug: "iron-man",
    title: "Iron Man",
    kind: "movie",
    note: "3 films",
    cover: watchCover("iron-man"),
  },
  {
    slug: "thor",
    title: "Thor",
    kind: "movie",
    note: "3 films",
    cover: watchCover("thor"),
  },
  {
    slug: "captain-america",
    title: "Captain America",
    kind: "movie",
    note: "3 films",
    cover: watchCover("captain-america-first-avenger"),
  },
  {
    slug: "avengers",
    title: "Avengers",
    kind: "movie",
    note: "4 films",
    cover: watchCover("the-avengers"),
  },
  {
    slug: "guardians-of-the-galaxy",
    title: "Guardians of the Galaxy",
    kind: "movie",
    note: "3 films",
    cover: watchCover("guardians-of-the-galaxy"),
  },
  {
    slug: "ant-man",
    title: "Ant-Man",
    kind: "movie",
    note: "3 films",
    cover: watchCover("ant-man"),
  },
  {
    slug: "doctor-strange",
    title: "Doctor Strange",
    kind: "movie",
    cover: watchCover("doctor-strange"),
  },
  {
    slug: "spider-man-homecoming",
    title: "Spider-Man: Homecoming",
    kind: "movie",
    cover: watchCover("spider-man-homecoming"),
  },
  {
    slug: "black-panther",
    title: "Black Panther",
    kind: "movie",
    cover: watchCover("black-panther"),
  },
  {
    slug: "captain-marvel",
    title: "Captain Marvel",
    kind: "movie",
    cover: watchCover("captain-marvel"),
  },
  {
    slug: "knives-out",
    title: "Knives Out",
    kind: "movie",
    note: "3 films",
    cover: watchCover("knives-out"),
  },
  {
    slug: "harry-potter",
    title: "Harry Potter",
    kind: "movie",
    note: "8 films",
    cover: watchCover("hp-philosophers-stone"),
  },
  {
    slug: "john-wick",
    title: "John Wick",
    kind: "movie",
    note: "4 films",
    cover: watchCover("john-wick"),
  },
  {
    slug: "suits",
    title: "Suits",
    kind: "show",
    cover: watchCover("suits"),
  },
  {
    slug: "arrow",
    title: "Arrow",
    kind: "show",
    cover: watchCover("arrow"),
  },
  {
    slug: "the-flash",
    title: "The Flash",
    kind: "show",
    cover: watchCover("the-flash"),
  },
  {
    slug: "agents-of-shield",
    title: "Marvel's Agents of S.H.I.E.L.D.",
    kind: "show",
    cover: watchCover("agents-of-shield"),
  },
  {
    slug: "loki",
    title: "Loki",
    kind: "show",
    cover: watchCover("loki"),
  },
  {
    slug: "silicon-valley",
    title: "Silicon Valley",
    kind: "show",
    cover: watchCover("silicon-valley"),
  },
  {
    slug: "brooklyn-nine-nine",
    title: "Brooklyn Nine-Nine",
    kind: "show",
    cover: watchCover("brooklyn-nine-nine"),
  },
];
