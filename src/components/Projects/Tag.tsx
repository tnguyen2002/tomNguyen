import type { ReactNode } from "react";

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs lowercase tracking-wide text-neutral-600">
      {children}
    </span>
  );
}

export default Tag;
