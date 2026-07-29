import { useMediaQuery } from "./useMediaQuery";

/**
 * The CSS `prefers-reduced-motion` block in index.css kills transitions, but it
 * cannot stop video autoplay — that has to be gated in JS, which is what this
 * hook is for.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
