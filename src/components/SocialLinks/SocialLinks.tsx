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
          className="rounded-md p-1.5 text-rose-500 transition-colors hover:text-rose-600 motion-reduce:transition-none"
        >
          <BrandIcon id={social.id} className="h-5 w-5" />
        </ExternalLink>
      ))}
    </nav>
  );
}

export default SocialLinks;
