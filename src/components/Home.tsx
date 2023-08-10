import React from "react";
import Projects from "./Projects";
import SocialIcons from "./SocialIcon";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
function Home() {
	return (
		<div>
			<div>Tom Nguyen</div>
			<div>
				<SocialIcons />
			</div>
			<div>
				<div>About Me</div>
				<ul>
					<li>
						4th year Computer Science student @{" "}
						<a href="https://www.stanford.edu/" target="_blank">
							Stanford
						</a>
					</li>
					<li>
						I am interested in creating AI/ML products, and I am currently
						working at @{" "}
						<a href="https://www.nasa.gov/ames" target="_blank">
							NASA
						</a>
					</li>
				</ul>
			</div>
			<div>
				<div>Thinking About</div>
				<ul>
					<li>Discipline vs Motivation</li>
					<li>balancing ambition and satisfaction</li>
				</ul>
			</div>

			<div>
				<NavLink to="/projects">Projects</NavLink>
			</div>
		</div>
	);
}
export default Home;
