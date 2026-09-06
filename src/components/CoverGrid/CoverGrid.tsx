import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

/** Column counts are literal strings, never interpolated — the Tailwind JIT
 *  scans source text and would purge a computed class. */
const COLUMNS = {
  books: "grid-cols-6",
  podcasts: "grid-cols-5",
} as const;

interface CoverGridProps {
  variant: keyof typeof COLUMNS;
  children: ReactNode;
}

function CoverGrid({ variant, children }: CoverGridProps) {
  return (
    <div className={cn("grid gap-x-5 gap-y-7", COLUMNS[variant])}>
      {children}
    </div>
  );
}

export default CoverGrid;
