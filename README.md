### Personal Website

Website:
[tomnguyen.ai](https://tomnguyen.ai/)

Email:
tomthuckynguyen@gmail.com

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
— no component changes needed. Rows alternate media side automatically.

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

## notes

- `tailwind.config.js` must stay at the repo root with exactly that name:
  react-scripts detects Tailwind via `fs.existsSync` on that path, and it sets
  `postcssOptions.config: false`, so a `postcss.config.js` would be ignored.
- Fonts are declared in `public/index.html`, not `src/index.css` — see the
  comment there for why.
