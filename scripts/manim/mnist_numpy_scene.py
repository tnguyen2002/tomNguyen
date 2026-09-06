"""
MNIST in numpy — 5s loop. One idea: the forward pass to a prediction, then the
gradient running back the other way — derived by hand, no autograd.

Render:  manim -qm --format=mp4 mnist_numpy_scene.py MnistNumpy
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402
import numpy as np  # noqa: E402
from house import FILL, INK, LINE, MUTED, PERI, arrow, box, close, header, label  # noqa: E402


def digit_glyph(side=1.5):
    """A crude 8x8 '7', enough to read as a handwritten digit at tile size."""
    grid = [
        "00000000", "01111100", "00000100", "00001000",
        "00010000", "00110000", "00100000", "00000000",
    ]
    cells = VGroup()
    c = side / 8
    for r, row in enumerate(grid):
        for k, v in enumerate(row):
            cells.add(
                Square(side_length=c, stroke_width=0, fill_opacity=1,
                       fill_color=INK if v == "1" else "#FFFFFF")
                .move_to([(k - 3.5) * c, (3.5 - r) * c, 0])
            )
    return VGroup(cells, SurroundingRectangle(cells, color=LINE, buff=0, stroke_width=2))


class MnistNumpy(Scene):
    def construct(self):
        chrome = header(self, "mnist, numpy only", "every gradient derived and written by hand", PERI)

        digit = digit_glyph(1.6).move_to(LEFT * 5.0 + DOWN * 0.45)

        # 784 inputs, drawn as a thin column rather than 784 dots.
        col = Rectangle(width=0.34, height=2.5, fill_color=FILL, fill_opacity=1,
                        stroke_color=LINE, stroke_width=2).move_to(LEFT * 2.85 + DOWN * 0.45)
        col_cap = label("784", 18, MUTED).next_to(col, DOWN, buff=0.20)

        h1 = box(0.9, 1.7).move_to(LEFT * 0.85 + DOWN * 0.45)
        h1_cap = label("relu", 18, MUTED).next_to(h1, DOWN, buff=0.20)
        h2 = box(0.9, 1.15).move_to(RIGHT * 1.15 + DOWN * 0.45)
        h2_cap = label("softmax", 18, MUTED).next_to(h2, DOWN, buff=0.20)

        bars = VGroup(*[
            Rectangle(width=0.14 + 0.9 * v, height=0.17, fill_color=PERI, fill_opacity=0.9,
                      stroke_width=0)
            for v in [0.12, 0.08, 0.05, 0.06, 0.1, 0.07, 0.09, 0.95, 0.05, 0.06]
        ])
        for b in bars:
            b.align_to(bars[0], LEFT)
        bars.arrange(DOWN, buff=0.055, aligned_edge=LEFT).move_to(RIGHT * 3.9 + DOWN * 0.45)
        pred = label("7", 26, PERI, weight=BOLD).next_to(bars[7], RIGHT, buff=0.22)

        fwd = VGroup(
            arrow(digit.get_right(), col.get_left()),
            arrow(col.get_right(), h1.get_left()),
            arrow(h1.get_right(), h2.get_left()),
            arrow(h2.get_right(), bars.get_left()),
        )

        self.play(FadeIn(digit), run_time=0.43)
        self.play(GrowArrow(fwd[0]), FadeIn(col), FadeIn(col_cap), run_time=0.50)
        self.play(GrowArrow(fwd[1]), FadeIn(h1), FadeIn(h1_cap), run_time=0.46)
        self.play(GrowArrow(fwd[2]), FadeIn(h2), FadeIn(h2_cap), run_time=0.46)
        self.play(GrowArrow(fwd[3]), LaggedStart(*[FadeIn(b) for b in bars], lag_ratio=0.04),
                  run_time=0.65)
        self.play(FadeIn(pred, scale=0.7), run_time=0.36)

        # The backward pass: the same path, the other way, by hand.
        # Below the captions on purpose: routed at their height it crossed
        # straight through "relu" and "softmax".
        back = CurvedArrow(
            [bars.get_x(), -2.30, 0], [col.get_x(), -2.30, 0],
            angle=0.45, color=PERI, stroke_width=3.5, tip_length=0.20,
        )
        grad = label("dL/dW, by hand", 19, PERI).next_to(back, DOWN, buff=0.10)
        self.play(Create(back), run_time=0.86)
        self.play(FadeIn(grad), run_time=0.36)
        self.wait(1.65)
        close(self, keep=[chrome[0]])
