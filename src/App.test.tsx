import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "./App";
import { projects } from "./data/projects";
import { books } from "./data/books";
import { podcasts } from "./data/podcasts";
import { APPS } from "./data/apps";
import { profile } from "./data/profile";

// jsdom implements neither matchMedia nor IntersectionObserver. These tests
// pass only because useMediaQuery and useInView guard for that — if either
// guard is removed, every case here fails on render.
//
// That same guard is why these exercise the DESKTOP shell: useMediaQuery
// returns false without matchMedia, and App asks "(max-width: 767px)", so the
// dock renders rather than the phone home screen.

/** Dock labels are branding and have been renamed more than once (Projects ->
 *  "Visual Studio Code", the checklist -> "Reminders"). Reading them out of the
 *  data keeps these tests about behaviour rather than about the current copy. */
const labelFor = (id: string) => {
  const app = APPS.find((a) => a.id === id);
  if (!app) throw new Error(`no app with id "${id}"`);
  return app.label;
};
const PROJECTS = labelFor("projects");

const dock = () => screen.getByRole("navigation", { name: /dock/i });
const openApp = (label: string) => {
  fireEvent.click(within(dock()).getByRole("button", { name: label }));
};

/** The project index also holds group toggles (e.g. "Bite Sized"), so "every
 *  button in the nav" is no longer the same set as "every project". Project
 *  entries are the ones carrying a title-bearing label. */
const projectEntries = (index: HTMLElement) =>
  within(index)
    .getAllByRole("button")
    .filter((button) => button.querySelector("[title]"));

test("the desktop shows the name as the page's h1", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { level: 1, name: /tom nguyen/i })
  ).toBeInTheDocument();
});

test("the dock has a button for every app", () => {
  render(<App />);
  const buttons = within(dock()).getAllByRole("button");
  expect(buttons).toHaveLength(APPS.length);
  APPS.forEach((app) => {
    expect(
      within(dock()).getByRole("button", { name: app.label })
    ).toBeInTheDocument();
  });
});

test("opening an app makes it the page and marks it running in the dock", () => {
  render(<App />);
  openApp("Books");

  // exactly one h1 in every state — it is now the app, not the name
  const headings = screen.getAllByRole("heading", { level: 1 });
  expect(headings).toHaveLength(1);
  expect(headings[0]).toHaveTextContent("Books");

  expect(
    within(dock()).getByRole("button", { name: "Books" })
  ).toHaveAttribute("aria-current", "page");
  expect(
    within(dock()).getByRole("button", { name: PROJECTS })
  ).not.toHaveAttribute("aria-current");
});

test("clicking the running app closes it and lands back on Home", () => {
  render(<App />);
  // Home is the desktop, so it is showing on load and is marked running.
  expect(
    screen.getByRole("heading", { level: 1, name: /tom nguyen/i })
  ).toBeInTheDocument();
  expect(within(dock()).getByRole("button", { name: "Phone" })).toHaveAttribute(
    "aria-current",
    "page"
  );

  openApp("Notes");
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Notes");

  openApp("Notes");
  expect(
    screen.getByRole("heading", { level: 1, name: /tom nguyen/i })
  ).toBeInTheDocument();
});

test("switching apps replaces the open one", () => {
  render(<App />);
  openApp(PROJECTS);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(PROJECTS);

  openApp("Spotify");
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Spotify");
  expect(
    screen.queryByRole("navigation", { name: /project index/i })
  ).not.toBeInTheDocument();
});

test("keeps real casing in the DOM", () => {
  render(<App />);
  openApp(PROJECTS);
  const index = screen.getByRole("navigation", { name: /project index/i });
  expect(within(index).getByTitle("GANDALF-MD")).toBeInTheDocument();
});

test("the project index lists every project", () => {
  render(<App />);
  openApp(PROJECTS);
  const index = screen.getByRole("navigation", { name: /project index/i });

  expect(projectEntries(index)).toHaveLength(projects.length);
  projects.forEach((project) => {
    expect(within(index).getByTitle(project.name)).toBeInTheDocument();
  });
});

test("every project renders at once, and the index marks the current one", () => {
  render(<App />);
  openApp(PROJECTS);

  // One continuous scroll: all of them are on the page together, not one at a
  // time. This is the contract that replaced the old detail-pane swap.
  projects.forEach((project) => {
    expect(
      screen.getByRole("heading", { level: 3, name: project.name })
    ).toBeInTheDocument();
  });

  const index = screen.getByRole("navigation", { name: /project index/i });
  const entries = projectEntries(index);
  const current = () =>
    entries.filter((e) => e.getAttribute("aria-current") === "true");

  // Exactly one entry is current — not which one. The scroll-spy reads
  // getBoundingClientRect, and jsdom reports every rect as zero, so which item
  // it picks on mount is meaningless here. In a browser at scroll 0 only the
  // first item is within the offset.
  expect(current()).toHaveLength(1);

  // Clicking scrolls the window; jsdom has no layout, so what is assertable is
  // that the index immediately reflects the new position.
  fireEvent.click(within(index).getByTitle("Felix"));
  expect(current()).toHaveLength(1);
  // Found through its label rather than by position: once projects can be
  // grouped, DOM order in the index no longer tracks the data order.
  expect(within(index).getByTitle("Felix").closest("button")).toHaveAttribute(
    "aria-current",
    "true"
  );
});

test("bookshelf and ears render a tile per entry", () => {
  render(<App />);

  openApp("Books");
  books.forEach((book) => {
    expect(screen.getAllByText(book.author).length).toBeGreaterThan(0);
  });

  openApp("Spotify");
  podcasts.forEach((podcast) => {
    expect(screen.getAllByText(podcast.name).length).toBeGreaterThan(0);
  });
});

test("every off-site link is safe and named", () => {
  render(<App />);
  const offsite = screen
    .getAllByRole("link")
    .filter((link) => (link.getAttribute("href") ?? "").startsWith("http"));

  expect(offsite.length).toBeGreaterThan(0);
  offsite.forEach((link) => {
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAccessibleName();
  });
});

test("the dock is apps only; contact and socials live on the desktop", () => {
  render(<App />);
  // nothing in the dock leaves the site
  expect(within(dock()).queryAllByRole("link")).toHaveLength(0);

  // ...but both routes off the site are still present on the desktop
  expect(
    screen.getByRole("link", { name: new RegExp(profile.email, "i") })
  ).toHaveAttribute("href", `mailto:${profile.email}`);
  expect(
    within(screen.getByRole("navigation", { name: /social links/i })).getAllByRole(
      "link"
    ).length
  ).toBeGreaterThan(0);
});

test("no link points at youtube", () => {
  render(<App />);
  const hrefs = screen
    .getAllByRole("link")
    .map((link) => link.getAttribute("href") ?? "");
  expect(hrefs.some((href) => href.includes("youtube"))).toBe(false);
});
