const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				// One family everywhere: San Francisco, via the system UI font.
				// It is what macOS itself uses — Dock labels, menus, window
				// titles — which is the whole point of the desktop conceit. SF
				// cannot be *served* as a webfont (Apple's licence covers use on
				// their platforms, not redistribution); referencing the locally
				// installed system font is how Apple recommends doing it, and
				// costs nothing to download.
				//
				// Geist stays last so Windows/Linux/Android get a deliberate
				// typeface rather than a browser default. On a Mac it is never
				// fetched, because SF wins the stack before it is needed.
				sans: [
					"-apple-system",
					"BlinkMacSystemFont",
					'"SF Pro Text"',
					'"Segoe UI"',
					'"Geist"',
					...defaultTheme.fontFamily.sans,
				],
				// Deliberately NOT a monospace stack. macOS has no monospace in
				// its UI chrome, so the small caps labels, dates and index
				// numerals use the same face as everything else. Numeral
				// alignment comes from `tabular-nums`, which SF supports, not
				// from a fixed-width font.
				mono: [
					"-apple-system",
					"BlinkMacSystemFont",
					'"SF Pro Text"',
					'"Segoe UI"',
					'"Geist"',
					...defaultTheme.fontFamily.sans,
				],
			},
			colors: {
				// Warm neutrals. The previous palette was blue-grey (#FCFCFD) and
				// read clinical; these are the same lightness with the hue pulled
				// round to ~40deg. Warm, but stopping well short of cream — the
				// beige version of this site was the one that got rejected.
				canvas: "#FDFCFA",
				surface: {
					DEFAULT: "#F6F4F0",
					strong: "#EFEBE4",
				},
				line: {
					DEFAULT: "#EAE5DD",
					strong: "#DAD3C8",
				},
				fg: {
					DEFAULT: "#1B1816",
					muted: "#5E574E",
					// 4.8:1 on canvas, 4.5:1 on surface. It carries the 11-12px
					// meta text (dates, counts, captions), so it has to clear the
					// normal-text floor — a lighter grey looked better in
					// isolation and was unreadable at that size.
					subtle: "#6F6960",
				},
				// Default accent, used where no project hue applies. Clay rather
				// than cobalt: it belongs to the warm neutrals instead of sitting
				// on top of them.
				accent: {
					DEFAULT: "#B8502F",
					hover: "#9A3F23",
					wash: "#FBF0EB",
				},
			},
			boxShadow: {
				// Two-part shadows: a tight contact edge plus a wide soft cast.
				// A single blurred shadow reads as a grey halo at this lightness.
				soft: "0 1px 2px rgba(27,24,22,0.04), 0 8px 24px -10px rgba(27,24,22,0.12)",
				lift: "0 1px 2px rgba(27,24,22,0.05), 0 16px 32px -12px rgba(27,24,22,0.18)",
				inset: "inset 0 1px 0 rgba(255,255,255,0.7)",
			},
			maxWidth: {
				measure: "36rem",
				content: "72rem",
			},
			transitionTimingFunction: {
				"out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
			},
			keyframes: {
				rise: {
					from: { opacity: "0", transform: "translateY(8px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				fade: {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
			},
			animation: {
				rise: "rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
				fade: "fade 0.25s ease-out both",
			},
		},
	},
	plugins: [],
};
