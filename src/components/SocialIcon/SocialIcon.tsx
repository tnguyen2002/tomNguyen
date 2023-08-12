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
			url: "https://www.linkedin.com/in/tom-nguyen-55b5001b8/",
			icon: faLinkedin,
		},
		{ url: "https://github.com/tnguyen2002", icon: faGithub },
		{
			url: "https://www.youtube.com/@tomnguyen4548",
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
