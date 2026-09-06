### Personal Website

Website:
[tomnguyen.ai](https://tomnguyen.ai/)

Email:
tomtkkn@gmail.com

---

## running it

```bash
npm start        # localhost:3000
npm test         # jest + testing-library
npm run build    # production bundle
npx tsc --noEmit # typecheck
```

## adding a project

Everything lives in `src/data/`. To add a project, append to `src/data/projects.ts`
— no component changes needed. It shows up in the index inside the Projects app,
and its accent hue is assigned by position.

```ts
{
  slug: "my-thing",              // also the media filename stem
  name: "My Thing",              // real casing; lowercasing is CSS
  summary: "one-line hook",
  description: ["bullet", "bullet"],
  stack: ["python", "pytorch"],
  year: "2025",
  links: [{ label: "code", href: "https://github.com/..." }],
  visual: pending,               // or: video("my-thing", "alt text")
}
```

`visual` takes one of four things:

| value | renders |
| --- | --- |
| `video("slug", "alt")` | the looping demo, hover-to-play |
| `image("slug", "alt")` | a still screenshot |
| `pending` | a dashed "demo coming soon" tile |
| `noVisual` | a typographic tile built from `stack` — for projects that will never have a demo |

## adding a project video

Videos are self-hosted in `public/media/`. Muted, looping, `playsInline`, with a
poster frame — no GIFs (5–20× larger for worse quality) and no third-party
embeds.

**1. Record.** `Cmd+Shift+5` → Record Selected Portion. Keep it **8–15 seconds**
and start/end on similar frames so the loop is seamless.

**2. Encode.**

```bash
./scripts/encode.sh ~/Desktop/raw.mov felix 3 12
#                   input             slug  start duration
```

That writes `public/media/felix.mp4` and `felix.jpg`, and prints the line to add
to `projects.ts`. It needs ffmpeg (`brew install ffmpeg`).

**3. Wire it up.** In `src/data/projects.ts`:

```ts
visual: video("felix", "felix scanning a rubik's cube through a webcam"),
```

The slug must match the filename stem. That's the whole change.

### Screenshots are worth doing first

A still per project takes five minutes and makes the layout land immediately:

```bash
sips -s format jpeg -s formatOptions 80 -Z 1600 ~/Desktop/shot.png \
  --out public/media/felix.jpg
```

then `visual: image("felix", "...")`.

### Size budgets

| asset | target | hard cap |
| --- | --- | --- |
| `<slug>.mp4` | 1.5 MB | 2.5 MB |
| `<slug>.jpg` (poster) | 120 KB | 200 KB |
| `<slug>.jpg` (screenshot) | 250 KB | 400 KB |
| all of `public/media/` | 10 MB | 20 MB |

Check with `du -sh public/media`.

> Raw `.mov` recordings are gitignored on purpose — a 30-second 4K capture is
> 200+ MB and git would keep it forever. Only the encoded mp4 gets committed.

## bookshelf and podcasts

Same idea — data only, in `src/data/`.

**Books** (`books.ts`) and **podcasts** (`podcasts.ts`) render as cover grids.
Covers are optional: leave `cover` off and the tile falls back to a typographic
panel carrying the title, so the grid looks intentional before you source any
artwork. Add one like this:

```ts
// public/media/books/dune.jpg  (2:3 portrait, ~400x600, <= 80 KB)
import { bookCover } from "../lib/media";
{ slug: "dune", title: "Dune", author: "Frank Herbert", cover: bookCover("dune") }
```

```ts
// public/media/podcasts/acquired.jpg  (1:1 square, ~600x600, <= 80 KB)
import { podcastCover } from "../lib/media";
{ slug: "acquired", name: "Acquired", host: "Ben Gilbert & David Rosenthal",
  cover: podcastCover("acquired") }
```

Resize with the same tool as the project screenshots:

```bash
sips -s format jpeg -s formatOptions 80 -Z 600 ~/Downloads/cover.png \
  --out public/media/books/dune.jpg
```

When a cover exists the caption shows title + author; without one the tile
carries the title and the caption shows just the author, so nothing prints
twice.

> The books are still `TODO(tom)` placeholders; the podcasts are real.

To add a whole new section, add an entry to `src/data/apps.tsx` — it appears in
the dock and on the phone home screen automatically.

## design

The site is a **macOS desktop**. A wallpaper, a menu bar with a live clock, and
a dock; clicking a dock app swaps the whole page. Phones get the matching joke
instead of a broken one — an iOS-style home screen of the same icons.

- **Shell.** `App.tsx` holds one piece of state: which app is open (`null` is
  the desktop). `components/Desktop/` has the menu bar, dock, desktop panel and
  phone home screen. `data/apps.tsx` is the registry — id, label, glyph, hue
  and content — and is the only file to touch to add a section.
- **One h1, always.** Each app is a page, so its title is the h1; with nothing
  open, the name is. `App.test.tsx` asserts there is exactly one.
- **Icons** are drawn in `AppIcon.tsx` as strokes on a 24-unit grid, on a
  graded squircle tile. `vectorEffect="non-scaling-stroke"` keeps the stroke
  from thickening under dock magnification.
- **Colour.** `lib/accent.ts` holds seven muted hues. Each project owns one, so
  the accent changes as you browse rather than seven competing; each dock app
  owns one too (indices hand-picked so neighbouring icons never match). All
  seven clear 4.5:1 on the light surfaces.
- **The wallpaper is a CSS gradient mesh**, not a photograph — nothing to ship
  or licence, and it can be tuned dark enough for the white menu-bar and dock
  text while the translucent white sheets still read as lit panels.
- **`fg-subtle` carries 11–12px meta text**, so it has to clear the
  normal-text contrast floor (4.8:1 on the light surface). A lighter grey looks
  better in isolation and is unreadable at that size — don't lighten it.
- **Motion.** A rise on open, dock magnification, hover states. Magnification
  is gated on `prefers-reduced-motion`, as is everything else.

### why index + detail for projects

Five of the eight projects have no figure yet. Any layout that stacks them
vertically puts five identical "demo coming soon" panels on screen at once;
showing one project at a time removes that and gives the ones with real media
the full pane. Revisit once every project has a figure.

### testing notes

`useMediaQuery` returns false without `matchMedia`, and jsdom has none — so
`App` asks `(max-width: 767px)` rather than `(min-width: …)`. That means it
defaults to the desktop shell instead of flashing the phone home screen on
first paint, and it is why the tests exercise the dock rather than the home
screen.


## notes

- `tailwind.config.js` must stay at the repo root with exactly that name:
  react-scripts detects Tailwind via `fs.existsSync` on that path, and it sets
  `postcssOptions.config: false`, so a `postcss.config.js` would be ignored.
- Fonts are declared in `public/index.html`, not `src/index.css` — see the
  comment there for why. Both faces are latin-subset woff2, self-hosted, and
  variable across 100–900, so it is one file each (~56 KB total).
- No page-level horizontal scroll at 320px or 390px. The wallpaper is
  `position: fixed`, so it is sized to the viewport rather than the
  document — it will look like an overflow in a naive audit and is not one.
