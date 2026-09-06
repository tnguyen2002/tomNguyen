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
    by: "Christopher Nolan",
    kind: "movie",
    cover: watchCover("interstellar"),
  },
  {
    slug: "the-prestige",
    title: "The Prestige",
    by: "Christopher Nolan",
    kind: "movie",
    cover: watchCover("the-prestige"),
  },
  {
    slug: "inception",
    title: "Inception",
    by: "Christopher Nolan",
    kind: "movie",
    cover: watchCover("inception"),
  },
  {
    slug: "memento",
    title: "Memento",
    by: "Christopher Nolan",
    kind: "movie",
    cover: watchCover("memento"),
  },
  {
    slug: "oppenheimer",
    title: "Oppenheimer",
    by: "Christopher Nolan",
    kind: "movie",
    cover: watchCover("oppenheimer"),
  },
  {
    slug: "everything-everywhere",
    title: "Everything Everywhere All at Once",
    by: "Daniel Kwan & Daniel Scheinert",
    kind: "movie",
    cover: watchCover("everything-everywhere"),
  },
  {
    slug: "marty-supreme",
    title: "Marty Supreme",
    by: "Josh Safdie",
    kind: "movie",
    cover: watchCover("marty-supreme"),
  },
  {
    slug: "parasite",
    title: "Parasite",
    by: "Bong Joon-ho",
    kind: "movie",
    cover: watchCover("parasite"),
  },
  {
    slug: "iron-man",
    title: "Iron Man",
    by: "Jon Favreau & Shane Black",
    kind: "movie",
    note: "3 films",
    cover: watchCover("iron-man"),
  },
  {
    slug: "thor",
    title: "Thor",
    by: "Kenneth Branagh, Alan Taylor & Taika Waititi",
    kind: "movie",
    note: "3 films",
    cover: watchCover("thor"),
  },
  {
    slug: "captain-america",
    title: "Captain America",
    by: "Joe Johnston & the Russo brothers",
    kind: "movie",
    note: "3 films",
    cover: watchCover("captain-america-first-avenger"),
  },
  {
    slug: "avengers",
    title: "Avengers",
    by: "Joss Whedon & the Russo brothers",
    kind: "movie",
    note: "4 films",
    cover: watchCover("the-avengers"),
  },
  {
    slug: "guardians-of-the-galaxy",
    title: "Guardians of the Galaxy",
    by: "James Gunn",
    kind: "movie",
    note: "2 films",
    cover: watchCover("guardians-of-the-galaxy"),
  },
  {
    slug: "ant-man",
    title: "Ant-Man",
    by: "Peyton Reed",
    kind: "movie",
    note: "2 films",
    cover: watchCover("ant-man"),
  },
  {
    slug: "doctor-strange",
    title: "Doctor Strange",
    by: "Scott Derrickson",
    kind: "movie",
    cover: watchCover("doctor-strange"),
  },
  {
    slug: "spider-man-homecoming",
    title: "Spider-Man: Homecoming",
    by: "Jon Watts",
    kind: "movie",
    cover: watchCover("spider-man-homecoming"),
  },
  {
    slug: "black-panther",
    title: "Black Panther",
    by: "Ryan Coogler",
    kind: "movie",
    cover: watchCover("black-panther"),
  },
  {
    slug: "captain-marvel",
    title: "Captain Marvel",
    by: "Anna Boden & Ryan Fleck",
    kind: "movie",
    cover: watchCover("captain-marvel"),
  },
  {
    slug: "knives-out",
    title: "Knives Out",
    by: "Rian Johnson",
    kind: "movie",
    note: "3 films",
    cover: watchCover("knives-out"),
  },
  {
    slug: "harry-potter",
    title: "Harry Potter",
    by: "Chris Columbus, Alfonso Cuarón, Mike Newell & David Yates",
    kind: "movie",
    note: "8 films",
    cover: watchCover("hp-philosophers-stone"),
  },
  {
    slug: "john-wick",
    title: "John Wick",
    by: "Chad Stahelski",
    kind: "movie",
    note: "4 films",
    cover: watchCover("john-wick"),
  },
  {
    slug: "suits",
    title: "Suits",
    by: "Aaron Korsh",
    kind: "show",
    cover: watchCover("suits"),
  },
  {
    slug: "arrow",
    title: "Arrow",
    by: "Greg Berlanti, Marc Guggenheim & Andrew Kreisberg",
    kind: "show",
    cover: watchCover("arrow"),
  },
  {
    slug: "the-flash",
    title: "The Flash",
    by: "Greg Berlanti, Andrew Kreisberg & Geoff Johns",
    kind: "show",
    cover: watchCover("the-flash"),
  },
  {
    slug: "agents-of-shield",
    title: "Marvel's Agents of S.H.I.E.L.D.",
    by: "Joss Whedon, Jed Whedon & Maurissa Tancharoen",
    kind: "show",
    cover: watchCover("agents-of-shield"),
  },
  {
    slug: "loki",
    title: "Loki",
    by: "Michael Waldron",
    kind: "show",
    cover: watchCover("loki"),
  },
  {
    slug: "silicon-valley",
    title: "Silicon Valley",
    by: "Mike Judge, John Altschuler & Dave Krinsky",
    kind: "show",
    cover: watchCover("silicon-valley"),
  },
  {
    slug: "brooklyn-nine-nine",
    title: "Brooklyn Nine-Nine",
    by: "Dan Goor & Michael Schur",
    kind: "show",
    cover: watchCover("brooklyn-nine-nine"),
  },
];
