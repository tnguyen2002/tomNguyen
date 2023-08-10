import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGithub,
	faYoutube,
	faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const SocialIcons = () => {
	const links = [
		{ url: "https://github.com/bard", icon: faGithub },
		{
			url: "https://www.youtube.com/c/BardLargeLanguageModel",
			icon: faYoutube,
		},
		{
			url: "https://www.linkedin.com/in/bard-large-language-model/",
			icon: faLinkedin,
		},
	];

	return (
		<div className="social-icons">
			{links.map((link, index) => (
				<a key={index} href={link.url} target="_blank" className="social-icon">
					<FontAwesomeIcon icon={link.icon} />
				</a>
			))}
		</div>
	);
};

export default SocialIcons;
