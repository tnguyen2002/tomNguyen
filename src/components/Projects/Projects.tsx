import { useState } from "react";
import { NavLink } from "react-router-dom";
import Airtable from "airtable";
import "./Projects.css";

interface project {
	Name: string;
	Link: string;
	Description: string;
	Website: string;
	Poster: string;
	Report: string;
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
// const getData = (): Promise<any> => {
// 	return new Promise((resolve, reject) =>
// 		base("Projects")
// 			.select({ maxRecords: 2, view: "Grid view" })
// 			.eachPage(
// 				function page(records: any, fetchNextPage: any) {
// 					records.map((record: any) => output.push(record.fields));
// 					fetchNextPage();
// 				},
// 				function done(err) {
// 					if (err) {
// 						resolve(returnError(err));
// 					}
// 					resolve(returnSuccess(output));
// 				}
// 			)
// 	);
// };
const getData: Promise<any> = new Promise((resolve, reject) =>
	base("Projects")
		.select({ maxRecords: 2, view: "Grid view" })
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
	getData.then((data) => setAllProjects(data.data));

	return (
		<div className="w-2/4">
			<NavLink className="font-bold text-rose-500" to="/">
				← Home
			</NavLink>
			{allProjects.map((project, key) => (
				<div key={key}>
					<div className="font-bold">{project.Name}</div>{" "}
					<div>{project.Description}</div>
					<div className="flex flex-row">
						<a className="font-bold text-rose-500" href={project.Link}>
							[Code]
						</a>
						{project.Website && (
							<a className="font-bold text-rose-500" href={project.Website}>
								[Website]
							</a>
						)}
						{project.Report && (
							<a className="font-bold text-rose-500" href={project.Report}>
								[Report]
							</a>
						)}
						{project.Poster && (
							<a className="font-bold text-rose-500" href={project.Poster}>
								[Poster]
							</a>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

export default Projects;
