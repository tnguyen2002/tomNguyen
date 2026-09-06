"""
Regenerate the image asset felix_scene.py needs.

    pip install pillow
    python felix_assets.py

Crops the cube out of felix_source.jpg — a real frame of Felix running, with the
detector's green facelet contours, red sample points and printed RGB triples
still on it. That capture is the only one of its kind in the repo, which is why
it is committed here rather than left in public/media, where the demo's poster
frame would have overwritten it.

Output goes to ./assets/ next to this script and is NOT committed: derived data,
and the encoded mp4 already carries the result.
"""

from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
OUT = HERE / "assets"


def main() -> None:
    OUT.mkdir(exist_ok=True)
    src = Image.open(HERE / "felix_source.jpg").convert("RGB")
    # The cube fills roughly the middle of the 1600x962 frame; this trims the
    # hand and the room without clipping any of the outlined facelets.
    crop = src.crop((470, 140, 1230, 900)).resize((560, 560), Image.LANCZOS)
    crop.save(OUT / "felix_scan.png")
    print(f"wrote {OUT / 'felix_scan.png'}")


if __name__ == "__main__":
    main()
