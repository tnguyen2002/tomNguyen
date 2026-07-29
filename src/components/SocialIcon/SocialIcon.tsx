import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { socials } from "../../data/profile";
import type { SocialId } from "../../data/types";

const ICONS: Record<SocialId, IconDefinition> = {
  linkedin: faLinkedin,
  github: faGithub,
  x: faXTwitter,
};

const SocialIcons = () => (
  <nav aria-label="social links" className="flex flex-row justify-start">
    {socials.map((social) => (
      <a
        className="font-bold text-rose-500 pr-2"
        key={social.id}
        href={social.href}
        aria-label={social.label}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={ICONS[social.id]} className="fa-xl" />
      </a>
    ))}
  </nav>
);

export default SocialIcons;
