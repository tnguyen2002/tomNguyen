import React from "react";
import Projects from "../Projects/Projects";
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
						I am interested in creating AI/ML products and currently working @{" "}
						<a href="https://www.nasa.gov/ames" target="_blank">
							NASA
						</a>
						. I am currently in my 4th year @{" "}
						<a href="https://www.stanford.edu/" target="_blank">
							Stanford
						</a>{" "}
						and will soon be pursuing a masters. In my free time I enjoy playing
						volleyball and making videos on{" "}
						<a href="https://www.youtube.com/@tomnguyen4548" target="_blank">
							Youtube
						</a>
						. My academic{" "}
						<a
							href="https://airtable.com/appNGte73TR0vBXG2/shrPevp160CKqhAKv"
							target="_blank"
						>
							background
						</a>{" "}
						is primarily computer science with specks of economics and math.
					</div>
					<div className="sectionText">Contact: anhn@stanford.edu</div>
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
