import type { Book } from "./types";
import { bookCover } from "../lib/media";

/**
 * Jackets are in public/media/books/, sourced from the Open Library covers API
 * at up to 600px tall and compressed to the repo's cover budget.
 *
 * The first five are series; a shelf shows one spine per series, so each uses
 * book one's jacket. `note` is unused here — add a one-line take to any book
 * and it appears under the tile.
 */
export const books: Book[] = [
  {
    slug: "percy-jackson",
    title: "Percy Jackson & the Olympians",
    author: "Rick Riordan",
    cover: bookCover("percy-jackson"),
  },
  {
    slug: "heroes-of-olympus",
    title: "The Heroes of Olympus",
    author: "Rick Riordan",
    cover: bookCover("heroes-of-olympus"),
  },
  {
    slug: "kane-chronicles",
    title: "The Kane Chronicles",
    author: "Rick Riordan",
    cover: bookCover("kane-chronicles"),
  },
  {
    slug: "harry-potter",
    title: "Harry Potter",
    author: "J. K. Rowling",
    cover: bookCover("harry-potter"),
  },
  {
    slug: "maze-runner",
    title: "The Maze Runner",
    author: "James Dashner",
    cover: bookCover("maze-runner"),
  },
  {
    slug: "twelve-angry-men",
    title: "Twelve Angry Men",
    author: "Reginald Rose",
    cover: bookCover("twelve-angry-men"),
  },
  {
    slug: "frankenstein",
    title: "Frankenstein",
    author: "Mary Shelley",
    cover: bookCover("frankenstein"),
  },
  {
    slug: "frederick-douglass",
    title: "Narrative of the Life of Frederick Douglass",
    author: "Frederick Douglass",
    cover: bookCover("frederick-douglass"),
  },
  {
    slug: "time-management",
    title: "15 Secrets Successful People Know About Time Management",
    author: "Kevin Kruse",
    cover: bookCover("time-management"),
  },
  {
    slug: "bogleheads",
    title: "The Bogleheads' Guide to Investing",
    author: "Taylor Larimore",
    cover: bookCover("bogleheads"),
  },
  {
    slug: "and-then-there-were-none",
    title: "And Then There Were None",
    author: "Agatha Christie",
    cover: bookCover("and-then-there-were-none"),
  },
  {
    slug: "fault-in-our-stars",
    title: "The Fault in Our Stars",
    author: "John Green",
    cover: bookCover("fault-in-our-stars"),
  },
  {
    slug: "the-alchemist",
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover: bookCover("the-alchemist"),
  },
  {
    slug: "the-hobbit",
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
    cover: bookCover("the-hobbit"),
  },
  {
    slug: "unshakeable",
    title: "Unshakeable",
    author: "Tony Robbins",
    cover: bookCover("unshakeable"),
  },
  {
    slug: "lock-in",
    title: "Lock In",
    author: "John Scalzi",
    cover: bookCover("lock-in"),
  },
  {
    slug: "the-book-thief",
    title: "The Book Thief",
    author: "Markus Zusak",
    cover: bookCover("the-book-thief"),
  },
  {
    slug: "the-nightingale",
    title: "The Nightingale",
    author: "Kristin Hannah",
    cover: bookCover("the-nightingale"),
  },
  {
    slug: "hunger-games",
    title: "The Hunger Games",
    author: "Suzanne Collins",
    cover: bookCover("hunger-games"),
  },
  {
    slug: "to-kill-a-mockingbird",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: bookCover("to-kill-a-mockingbird"),
  },
  {
    slug: "mythology",
    title: "Mythology",
    author: "Edith Hamilton",
    cover: bookCover("mythology"),
  },
];
