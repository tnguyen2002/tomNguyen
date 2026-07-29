import type { ProjectVisual, Ratio } from "../data/types";

/**
 * Media helpers. Adding a demo to a project is a one-line data edit:
 *
 *   visual: video("felix", "felix scanning a rubik's cube through a webcam")
 *
 * The slug must match the filename stem in public/media/. See the "adding a
 * project video" section of README.md for the ffmpeg recipe.
 */

export function video(
  slug: string,
  alt: string,
  ratio: Ratio = "video"
): ProjectVisual {
  return {
    kind: "video",
    src: `/media/${slug}.mp4`,
    poster: `/media/${slug}.jpg`,
    alt,
    ratio,
  };
}

export function image(
  slug: string,
  alt: string,
  ratio: Ratio = "video"
): ProjectVisual {
  return { kind: "image", src: `/media/${slug}.jpg`, alt, ratio };
}

/** A demo is coming — renders a quiet dashed placeholder. */
export const pending: ProjectVisual = { kind: "pending" };

/** There will never be one — renders a typographic stack tile instead. */
export const noVisual: ProjectVisual = { kind: "none" };
