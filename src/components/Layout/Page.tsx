import type { ReactNode } from "react";

/** Single source of truth for page gutters and max width. Replaces the old
 *  three overlapping centering mechanisms and the 8px (px-2) mobile gutter. */
function Page({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-content px-5 py-10 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
      {children}
    </div>
  );
}

export default Page;
