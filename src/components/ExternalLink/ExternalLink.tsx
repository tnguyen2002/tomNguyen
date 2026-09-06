import type { AnchorHTMLAttributes, ReactNode } from "react";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel">;

/** Every off-site link goes through here so target/rel are set in exactly one
 *  place. Previously every anchor on the site navigated away in-tab. */
function ExternalLink({ href, children, ...rest }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

export default ExternalLink;
