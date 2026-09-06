import { render, screen, act } from "@testing-library/react";
import ProjectMedia from "./ProjectMedia";
import { accentFor } from "../../lib/accent";
import { video } from "../../lib/media";

/**
 * The looping demo cannot be checked in a headless browser: under
 * `--virtual-time-budget` Chrome never delivers an IntersectionObserver
 * callback at all — not even the initial one — because delivery is tied to the
 * rendering lifecycle that virtual time skips. A tile that is plainly on
 * screen still reports `inView=false`, so the browser says "paused" no matter
 * what the code does.
 *
 * So the observer is driven by hand here instead, which tests the thing that
 * actually matters: intersecting starts playback, leaving stops it.
 */
type IOCallback = (entries: { isIntersecting: boolean }[]) => void;

let callbacks: IOCallback[] = [];
let play: jest.Mock;
let pause: jest.Mock;

beforeEach(() => {
  callbacks = [];
  class MockIO {
    constructor(cb: IOCallback) {
      callbacks.push(cb);
    }
    observe() {}
    disconnect() {}
    unobserve() {}
  }
  // @ts-expect-error — test double
  global.IntersectionObserver = MockIO;

  // jsdom implements neither, and an unmocked play() throws "not implemented"
  play = jest.fn().mockResolvedValue(undefined);
  pause = jest.fn();
  Object.defineProperty(HTMLMediaElement.prototype, "play", {
    configurable: true,
    value: play,
  });
  Object.defineProperty(HTMLMediaElement.prototype, "pause", {
    configurable: true,
    value: pause,
  });
});

const renderTile = () =>
  render(
    <ProjectMedia
      visual={video("demo", "a looping demo")}
      name="Demo"
      accent={accentFor(0)}
    />
  );

const setIntersecting = (isIntersecting: boolean) =>
  act(() => {
    callbacks.forEach((cb) => cb([{ isIntersecting }]));
  });

test("the demo loops, muted, and plays inline", () => {
  renderTile();
  const el = screen.getByLabelText("a looping demo") as HTMLVideoElement;

  expect(el).toHaveAttribute("loop");
  expect(el).toHaveAttribute("playsinline");
  expect(el.muted).toBe(true);
});

test("playback starts when the tile scrolls into view", () => {
  renderTile();
  expect(play).not.toHaveBeenCalled();

  setIntersecting(true);
  expect(play).toHaveBeenCalled();
});

test("playback stops when the tile scrolls out of view", () => {
  renderTile();
  setIntersecting(true);
  play.mockClear();

  setIntersecting(false);
  expect(pause).toHaveBeenCalled();
  expect(play).not.toHaveBeenCalled();
});
