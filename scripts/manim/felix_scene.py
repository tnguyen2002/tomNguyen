"""
Felix — 7s. The whole scan, from webcam frame to solution:

    webcam ─► contour the facelets ─► sample the centre RGB
           ─► CIEDE2000 to the nearest cube colour ─► face state ─► solution

The first plate is a real capture, not a drawing: the green outlines, the red
sample points and the printed RGB triples are Felix's own detector output. The
sampled value carried through the rest of the demo, [107 69 49], is read off
that frame — it is the blue facelet's, and blue is what CIEDE2000 picks.

Assets: felix_assets.py, which crops the capture kept at felix_source.jpg.
Render:  manim -qm --format=mp4 felix_scene.py Felix
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402
import numpy as np  # noqa: E402
from house import INK, LEAF, LINE, MUTED, box, close, header, label  # noqa: E402

ASSETS = Path(__file__).resolve().parent / "assets"

# The six cube colours Felix classifies into.
CUBE = {
    "white": "#F2F2EE", "yellow": "#E3C222", "red": "#C0392B",
    "orange": "#D9782D", "green": "#3E9B54", "blue": "#2E5FA8",
}
# The face read off the capture, top-left first.
FACE = ["yellow", "blue", "red", "yellow", "green", "orange", "green", "red", "red"]


def swatch(colour, s=0.42, stroke=LINE):
    return Square(side_length=s, fill_color=colour, fill_opacity=1,
                  stroke_color=stroke, stroke_width=1.6)


class Felix(Scene):
    def construct(self):
        chrome = header(self, "Felix", "scan the cube through a webcam, then get the solution moves back", LEAF)

        # --- the real detector output
        scan_img = ImageMobject(str(ASSETS / "felix_scan.png")).set_height(2.85)
        scan_img.move_to([-4.85, -0.55, 0])
        scan = Group(scan_img, SurroundingRectangle(scan_img, color=LINE, buff=0, stroke_width=2))
        scan_t = label("webcam + contours", 17, MUTED).next_to(scan, DOWN, buff=0.20)
        self.play(FadeIn(scan), FadeIn(scan_t), run_time=0.62)

        # --- one facelet's sampled centre, straight off that frame
        samp = swatch(CUBE["blue"], 0.70, INK).move_to([-1.95, 0.15, 0])
        samp_v = label("[107 69 49]", 18, MUTED).next_to(samp, DOWN, buff=0.20)
        a1 = Arrow(scan.get_right(), samp.get_left(), buff=0.16, color=MUTED, stroke_width=3,
                   max_tip_length_to_length_ratio=0.30)
        samp_t = label("sample", 17, MUTED).next_to(samp, UP, buff=0.18)
        self.play(GrowArrow(a1), FadeIn(samp), FadeIn(samp_v), FadeIn(samp_t), run_time=0.60)

        # --- CIEDE2000 against the six references; nearest wins
        refs = VGroup(*[swatch(CUBE[k]) for k in CUBE]).arrange(DOWN, buff=0.13)
        refs.move_to([0.35, -0.10, 0])
        refs_t = label("CIEDE2000", 17, LEAF).next_to(refs, UP, buff=0.18)
        a2 = Arrow(samp.get_right(), refs.get_left(), buff=0.16, color=MUTED, stroke_width=3,
                   max_tip_length_to_length_ratio=0.30)
        self.play(GrowArrow(a2), FadeIn(refs), FadeIn(refs_t), run_time=0.55)

        pick = list(CUBE).index("blue")
        ring = SurroundingRectangle(refs[pick], color=LEAF, buff=0.06, stroke_width=3.5)
        self.play(Create(ring), run_time=0.42)

        # --- the reconstructed face
        grid = VGroup(*[swatch(CUBE[c], 0.62) for c in FACE])
        grid.arrange_in_grid(rows=3, cols=3, buff=0.07).move_to([3.05, -0.10, 0])
        grid_t = label("face state", 17, MUTED).next_to(grid, UP, buff=0.18)
        a3 = Arrow(refs.get_right(), grid.get_left(), buff=0.16, color=MUTED, stroke_width=3,
                   max_tip_length_to_length_ratio=0.30)
        self.play(GrowArrow(a3), run_time=0.24)
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in grid], lag_ratio=0.06),
                  FadeIn(grid_t), run_time=0.80)

        # --- six of those make a cube, and the cube makes a solution
        six = label("× 6 faces", 17, MUTED).next_to(grid, DOWN, buff=0.22)
        self.play(FadeIn(six), run_time=0.32)

        moves = VGroup(*[
            label(m, 21, INK) for m in ("R", "U", "R'", "U'", "F'", "U", "F")
        ]).arrange(RIGHT, buff=0.30)
        moves.move_to([3.05, -2.55, 0])
        moves_box = SurroundingRectangle(moves, color=LEAF, buff=0.22, stroke_width=2.5,
                                         corner_radius=0.10)
        a4 = Arrow(grid.get_bottom() + DOWN * 0.55, moves_box.get_top(), buff=0.12, color=LEAF,
                   stroke_width=3, max_tip_length_to_length_ratio=0.34)
        self.play(GrowArrow(a4), Create(moves_box), run_time=0.42)
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.10) for m in moves], lag_ratio=0.10),
                  run_time=0.70)
        self.wait(1.25)
        close(self, keep=[chrome[0]])
