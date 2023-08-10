import { get } from "http";
import { type } from "os";
import React, { Component, useState, useEffect } from "react";
import { isCommaListExpression } from "typescript";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Airtable from "airtable";

interface project {
	Name: string;
	Link: string;
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
		<div>
			<NavLink to="/">Home</NavLink>
			{allProjects.map((project) => (
				<li>
					<div>
						{project.Name}{" "}
						<a href={project.Link} target="_blank">
							Link
						</a>
					</div>
				</li>
			))}
		</div>
	);
}

export default Projects;
