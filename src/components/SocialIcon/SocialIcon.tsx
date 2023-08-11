import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGithub,
	faYoutube,
	faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "./SocialIcon.css";
const SocialIcons = () => {
	const links = [
		{
			url: "https://www.linkedin.com/in/bard-large-language-model/",
			icon: faLinkedin,
		},
		{ url: "https://github.com/bard", icon: faGithub },
		{
			url: "https://www.youtube.com/c/BardLargeLanguageModel",
			icon: faYoutube,
		},
	];

	return (
		<div className="social-icons-container">
			{links.map((link, index) => (
				<a key={index} href={link.url} target="_blank">
					<FontAwesomeIcon icon={link.icon} className="fa-xl" />
				</a>
			))}
		</div>
	);
};

export default SocialIcons;
