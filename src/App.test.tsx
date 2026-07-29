import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "./App";
import { projects } from "./data/projects";
import { books } from "./data/books";
import { podcasts } from "./data/podcasts";
import { substack } from "./data/substack";

// jsdom implements neither matchMedia nor IntersectionObserver. These tests
// pass only because useMediaQuery and useInView guard for that — if either
// guard is removed, every case here fails on render.

test("renders the name as the page's h1", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { level: 1, name: /tom nguyen/i })
  ).toBeInTheDocument();
});

test("keeps real casing in the DOM rather than lowercasing the text itself", () => {
  render(<App />);
  // The visual lowercasing is CSS; the accessible text must stay intact.
  expect(
    screen.getByRole("heading", { level: 3, name: "GANDALF-MD" })
  ).toBeInTheDocument();
});

test("renders every project as a row", () => {
  render(<App />);
  expect(screen.getAllByRole("article")).toHaveLength(projects.length);
});

test("sections are disclosures that toggle", () => {
  render(<App />);
  const trigger = screen.getByRole("button", { name: /^experience$/i });

  expect(trigger).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  fireEvent.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("projects is open on load and its panel is wired to its trigger", () => {
  render(<App />);
  const trigger = screen.getByRole("button", { name: /^projects$/i });
  expect(trigger).toHaveAttribute("aria-expanded", "true");

  const panelId = trigger.getAttribute("aria-controls")!;
  const panel = document.getElementById(panelId)!;
  expect(panel).toHaveAttribute("aria-labelledby", trigger.id);
});

test("social links are safe and have accessible names", () => {
  render(<App />);
  const nav = screen.getByRole("navigation", { name: /social links/i });
  const links = within(nav).getAllByRole("link");

  expect(links.length).toBeGreaterThan(0);
  links.forEach((link) => {
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link.getAttribute("aria-label")).toBeTruthy();
  });
});

test("every section has a disclosure trigger", () => {
  render(<App />);
  const labels = [
    /^projects$/i,
    /^experience$/i,
    /^bookshelf$/i,
    /^podcasts$/i,
    /^substack$/i,
    /30 before 30/i,
  ];
  labels.forEach((label) => {
    expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
  });
});

test("bookshelf and podcasts render a tile per entry", () => {
  render(<App />);
  // Casing is preserved in the DOM — the lowercasing is CSS only.
  books.forEach((book) => {
    expect(screen.getAllByText(book.author).length).toBeGreaterThan(0);
  });
  podcasts.forEach((podcast) => {
    expect(screen.getAllByText(podcast.name).length).toBeGreaterThan(0);
  });
});

test("substack exposes a subscribe link", () => {
  render(<App />);
  const subscribe = screen.getByRole("link", { name: "[subscribe]" });
  expect(subscribe).toHaveAttribute("href", substack.url);
  expect(subscribe).toHaveAttribute("target", "_blank");
});

test("no link points at youtube", () => {
  render(<App />);
  const hrefs = screen
    .getAllByRole("link")
    .map((link) => link.getAttribute("href") ?? "");
  expect(hrefs.some((href) => href.includes("youtube"))).toBe(false);
});
