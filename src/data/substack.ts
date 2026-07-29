import type { SubstackPost } from "./types";

/**
 * TODO(tom): point `url` at your real publication and replace the placeholder
 * posts. If you'd rather not maintain a post list, empty `posts` — the section
 * then renders just the intro line and the subscribe link, and nothing goes
 * stale when you don't publish.
 */
const posts: SubstackPost[] = [
  {
    title: "Placeholder post title",
    date: "mar 2026",
    blurb:
      "TODO(tom): replace with your real posts, or empty this array to show only the subscribe link.",
    href: "https://tomnguyen.substack.com",
  },
  {
    title: "Another placeholder",
    date: "jan 2026",
    href: "https://tomnguyen.substack.com",
  },
];

export const substack = {
  url: "https://tomnguyen.substack.com",
  intro: "i write occasionally about ml, systems, and whatever i'm chewing on.",
  posts,
};
