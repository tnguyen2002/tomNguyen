import BrandIcon from "../BrandIcon/BrandIcon";
import ExternalLink from "../ExternalLink/ExternalLink";
import { socials } from "../../data/profile";

function SocialLinks() {
  return (
    <nav aria-label="social links" className="flex flex-row items-center gap-1">
      {socials.map((social) => (
        <ExternalLink
          key={social.id}
          href={social.href}
          aria-label={social.label}
          className="rounded-md p-2 text-fg-subtle transition-colors hover:bg-surface hover:text-fg motion-reduce:transition-none"
        >
          <BrandIcon id={social.id} className="h-[18px] w-[18px]" />
        </ExternalLink>
      ))}
    </nav>
  );
}

export default SocialLinks;
