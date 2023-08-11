import React from "react";
import Projects from "../Projects";
import SocialIcons from "../SocialIcon/SocialIcon";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Themes from "../../themes";
import "./Home.css";
function Home() {
	return (
		<div className="HomeContainer">
			<SocialIcons />
			<div className="Section">
				<div className="Name">Tom Nguyen</div>
			</div>

			<div className="Section">
				{/* <div className="About">About Me</div> */}
				<div>
					<div className="sectionText">
						I am interested in creating AI/ML products, and I am currently
						working at{" "}
						<a href="https://www.nasa.gov/ames" target="_blank">
							NASA
						</a>
						. I am currently in my 4th year @{" "}
						<a href="https://www.stanford.edu/" target="_blank">
							Stanford
						</a>{" "}
						In my free time I enjoy playing volleyball and making videos on{" "}
						<a
							href="https://www.youtube.com/c/BardLargeLanguageModel"
							target="_blank"
						>
							Youtube
						</a>
						. My academic{" "}
						<a
							href="https://www.youtube.com/c/BardLargeLanguageModel"
							target="_blank"
						>
							background
						</a>{" "}
						is primarily computer science with sprinkle of economics and math.
					</div>
				</div>
			</div>
			<div className="Section">
				<div className="moreAboutMe">
					<div className="sectionText">Listening to: JVKE</div>
					<div className="sectionText">Watching: Black Clover </div>
					<div className="sectionText">
						Thinking About: Balancing Ambition and Satisfaction
					</div>
				</div>
			</div>
			<div className="Section">
				<NavLink className="projectNavlink" to="/projects">
					Projects →
				</NavLink>
			</div>
		</div>
	);
}
export default Home;
