"""
Regenerate the image assets gandalf_md_scene.py needs, from the poster PDF.

    pip install pymupdf pillow
    python gandalf_md_assets.py ~/Downloads/gandalf-poster.pdf

The poster is the `poster` link on the GANDALF-MD project:
https://drive.google.com/file/d/1pJD2CZyGIRjJHr-gOd51RXHqrIPGzzMn/view

The PNGs are written to ./assets/ next to this script and are NOT committed —
they are derived data, and the repo already carries the encoded mp4.

Two of the eleven embedded images matter:
  index 2  (1222x394)  Figure 2 — the three dataset example grids
  index 6  ( 862x812)  Figure 7 — the reals / DiffAug / GANDALF-MD comparison
Both are extracted at native resolution rather than screenshotted off a page
render, which is why the samples stay sharp when scaled up.
"""

import sys
from pathlib import Path

import fitz  # pymupdf
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

OUT = Path(__file__).resolve().parent / "assets"


def main(pdf_path: str) -> None:
    OUT.mkdir(exist_ok=True)
    doc = fitz.open(pdf_path)
    xrefs = [im[0] for im in doc[0].get_images(full=True)]

    def embedded(i: int) -> Image.Image:
        px = fitz.Pixmap(doc, xrefs[i])
        if px.n > 3:
            px = fitz.Pixmap(fitz.csRGB, px)
        return Image.frombytes("RGB", (px.width, px.height), px.samples)

    fig2, fig7 = embedded(2), embedded(6)

    # Figure 2 — three 3x3 grids: dermatoscopy, histology, fundus.
    for key, bbox in {
        "ham": (8, 5, 390, 388),
        "pan": (420, 5, 800, 388),
        "ret": (834, 5, 1214, 388),
    }.items():
        fig2.crop(bbox).resize((512, 512), Image.LANCZOS).save(OUT / f"data_{key}.png")

    # One HAM10k sample, inset past the grid rules, as the augmentation subject.
    cell = (390 - 8) / 3
    x0, y0 = 8 + cell + 7, 5 + cell + 7
    x = fig2.crop((int(x0), int(y0), int(x0 + cell - 14), int(y0 + cell - 14)))
    x = x.resize((384, 384), Image.LANCZOS)
    x.save(OUT / "x.png")

    # DiffAugment's baseline chain, T(x) = Cutout(Translation(Color(x))). The
    # poster demonstrates these ops on an unrelated photo; applying them to a
    # real lesion keeps the demo on-topic.
    col = ImageEnhance.Brightness(ImageEnhance.Color(x).enhance(1.9)).enhance(1.16)
    col.save(OUT / "aug_color.png")

    tr = Image.new("RGB", x.size, (255, 255, 255))
    tr.paste(col, (int(384 * 0.16), int(-384 * 0.12)))
    tr.save(OUT / "aug_trans.png")

    arr = np.array(tr)
    s, cy, cx = int(384 * 0.42), int(384 * 0.52), int(384 * 0.46)
    arr[max(0, cy - s // 2):cy + s // 2, max(0, cx - s // 2):cx + s // 2] = 128
    Image.fromarray(arr).save(OUT / "aug_cutout.png")

    # A Viewmaker view: a smooth, budget-bounded perturbation added to x — so
    # low-frequency noise, and blended weakly enough that the lesion survives.
    rng = np.random.default_rng(5)
    n = rng.normal(0, 1, (14, 14, 3))
    pert = Image.fromarray(((n - n.min()) / np.ptp(n) * 255).astype("uint8"))
    pert = pert.resize((384, 384), Image.BICUBIC).filter(ImageFilter.GaussianBlur(7.0))
    pert.save(OUT / "perturb.png")

    base = np.array(x).astype(np.int16)
    dv = (np.array(pert).astype(np.int16) - 128) * 0.45
    Image.fromarray(np.clip(base + dv, 0, 255).astype("uint8")).save(OUT / "view.png")

    # Figure 7 — nine panels: {ham, pannuke, retinal} x {real, diffaug, gandalf}.
    cols = {"real": (62, 297), "diff": (340, 575), "gan": (622, 858)}
    rows = {"ham": (8, 240), "pan": (258, 492), "ret": (525, 760)}
    for rk, (y0_, y1_) in rows.items():
        for ck, (x0_, x1_) in cols.items():
            panel = fig7.crop((x0_, y0_, x1_, y1_)).resize((448, 448), Image.LANCZOS)
            panel.save(OUT / f"r_{rk}_{ck}.png")

    print(f"wrote {len(list(OUT.glob('*.png')))} assets to {OUT}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: gandalf_md_assets.py <gandalf-poster.pdf>")
    main(sys.argv[1])
