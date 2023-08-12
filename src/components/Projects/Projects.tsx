import { useState } from "react";
import { NavLink } from "react-router-dom";
import Airtable from "airtable";
import "./Projects.css";

interface project {
	Name: string;
	Link: string;
	Description: string;
}

const AIRTABLE_API_TOKEN = process.env.REACT_APP_AIRTABLE_API_TOKEN;
Airtable.configure({
	apiKey: AIRTABLE_API_TOKEN,
});
const base = Airtable.base("appNGte73TR0vBXG2");
const returnSuccess = (data: any): any => ({
	success: true,
	data,
	error: "",
});

const returnError = (error: any): any => ({
	success: false,
	data: [],
	error,
});

const output: any[] = [];
const getData: Promise<any> = new Promise((resolve, reject) =>
	base("Projects")
		.select({ maxRecords: 1, view: "Grid view" })
		.eachPage(
			function page(records: any, fetchNextPage: any) {
				records.map((record: any) => output.push(record.fields));
				fetchNextPage();
			},
			function done(err) {
				if (err) {
					resolve(returnError(err));
				}
				resolve(returnSuccess(output));
			}
		)
);
function Projects() {
	const [allProjects, setAllProjects] = useState<project[]>([]);
	getData.then((data) => {
		setAllProjects(data.data);
	});
	return (
		<div className="projectsContainer">
			<NavLink className="homeNavLink" to="/">
				← Home
			</NavLink>
			{allProjects.map((project) => (
				<div className="projectsItem">
					<div className="projectTitle">{project.Name}</div>{" "}
					<div className="projectDescription">{project.Description}</div>
					<a href={project.Link}>[code]</a>
				</div>
			))}
		</div>
	);
}

export default Projects;
