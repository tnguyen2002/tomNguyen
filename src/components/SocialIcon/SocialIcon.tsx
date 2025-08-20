import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faYoutube,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
const SocialIcons = () => {
  const links = [
    {
      url: "https://www.linkedin.com/in/anhtomnguyen/",
      icon: faLinkedin,
    },
    { url: "https://github.com/tnguyen2002", icon: faGithub },
    {
      url: "https://www.youtube.com/@tomnguyen4548",
      icon: faYoutube,
    },
    {
      url: "https://x.com/t0m_win",
      icon: faTwitter,
    },
  ];

  return (
    <div className="flex flex-row justify-left">
      {links.map((link, index) => (
        <a className="font-bold text-rose-500 pr-2" key={index} href={link.url}>
          <FontAwesomeIcon icon={link.icon} className="fa-xl" />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
