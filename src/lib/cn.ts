type ClassValue = string | false | null | undefined;

/** Joins conditional class names. Deliberately tiny — we don't have enough
 *  conflicting-utility cases to justify clsx + tailwind-merge as deps. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
