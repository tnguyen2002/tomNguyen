const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Inter Variable"', ...defaultTheme.fontFamily.sans],
			},
			maxWidth: {
				// ~66 characters — a comfortable reading measure for body copy
				measure: "34rem",
				content: "72rem",
			},
			transitionTimingFunction: {
				"out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
			},
		},
	},
	plugins: [],
};
