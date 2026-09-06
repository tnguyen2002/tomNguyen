/** Aspect ratio for a project's media tile. Maps to a literal Tailwind class in
 *  ProjectMedia — never interpolate these into a className, the JIT will purge it. */
export type Ratio = "video" | "wide" | "square" | "portrait";

/**
 * A project's visual. Modelled as a discriminated union so that "no video yet"
 * is a designed state rather than a missing field:
 *
 *   video   — an encoded clip in public/media/
 *   image   — a still screenshot (ship these first, they're 5 minutes of work)
 *   pending — a demo is coming; renders a quiet dashed tile
 *   none    — there will never be one; renders a typographic stack tile
 */
export type ProjectVisual =
  | { kind: "video"; src: string; poster: string; alt: string; ratio: Ratio }
  | { kind: "image"; src: string; alt: string; ratio: Ratio }
  | { kind: "pending" }
  | { kind: "none" };

export type LinkLabel =
  | "code"
  | "demo"
  | "website"
  | "report"
  | "poster"
  | "paper"
  /** Published artefacts — a Hugging Face dataset or model card. */
  | "dataset"
  | "model"
  /** The project's own X account, where the project is the account. */
  | "x account"
  /** A post about the project, as opposed to the project itself — the launch
   *  or result announcement rather than the thing it announces. */
  | "post";

export interface ProjectLink {
  label: LinkLabel;
  href: string;
}

export interface Project {
  /** Stable id AND the media filename stem: public/media/<slug>.mp4 + .jpg */
  slug: string;
  /** Real casing — lowercasing is a CSS concern, so screen readers and search
   *  engines still see "GANDALF-MD" and "GPT-4" rather than mangled text. */
  name: string;
  /** One-line hook. Falls back to description[0] when absent. */
  summary?: string;
  description: string[];
  stack?: string[];
  year?: string;
  links: ProjectLink[];
  /** Defaults to { kind: "none" } when omitted. */
  visual?: ProjectVisual;
  /** Files this project under the collapsible "Bite Sized" group in the index
   *  nav. Purely an index concern — the article still renders in the feed in
   *  its normal position. */
  biteSized?: boolean;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  title: string;
  /** Free text on purpose — six hand-maintained entries don't need a formatter. */
  date: string;
  description: string[];
}

export interface ChecklistItem {
  text: string;
  done: boolean;
}

export type SocialId = "linkedin" | "github" | "x";

export interface SocialLink {
  id: SocialId;
  /** Accessible name — icon-only links are otherwise announced as just "link". */
  label: string;
  href: string;
}

/** Aspect ratio of a cover tile. Book jackets are 2:3, podcast art is square. */
export type CoverRatio = "portrait" | "square";

export interface Book {
  /** Cover filename stem: public/media/books/<slug>.jpg */
  slug: string;
  title: string;
  author: string;
  /** Optional one-line take. Shown under the grid caption on hover-free layouts. */
  note?: string;
  /** Omit until a cover file exists — the tile falls back to a typographic one. */
  cover?: string;
  href?: string;
}

/** Anything you listen to that is not a podcast. `kind` decides which row
 *  it lands in inside the Spotify app. */
export interface Track {
  /** Cover filename stem: public/media/tracks/<slug>.jpg */
  slug: string;
  title: string;
  artist: string;
  kind: "song" | "soundtrack" | "album";
  note?: string;
  /** Omit until a cover file exists — the tile falls back to a typographic one. */
  cover?: string;
  href?: string;
}

/** Something you watched. `kind` decides which row it lands in. */
export interface Screening {
  /** Poster filename stem: public/media/watch/<slug>.jpg */
  slug: string;
  title: string;
  /** Director, creator, or whatever is worth naming under the title. */
  by?: string;
  kind: "movie" | "show";
  note?: string;
  /** Omit until a poster exists — the tile falls back to a typographic one. */
  cover?: string;
  href?: string;
}

export interface Podcast {
  /** Cover filename stem: public/media/podcasts/<slug>.jpg */
  slug: string;
  name: string;
  host?: string;
  note?: string;
  cover?: string;
  href?: string;
}

