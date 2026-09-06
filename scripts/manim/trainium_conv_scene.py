"""
AWS Trainium convolutions — 7s. The inner loop of fused_conv2d_maxpool in
part2/conv2d.py, laid out across the NeuronCore's memories:

    HBM ─► SBUF: the weights once, pre-transposed per filter tap (kh, kw)
                 into [128 c_in × 128 c_out] so the tensor engine reads them
                 without a transpose in the loop; then a band of input rows
                 (tile rows + fh − 1) for the current chunk of output rows
    tensor engine: every filter tap is ONE 128×128 matmul against a shifted
                 slice of the band, and all fh×fw of them accumulate in a PSUM
                 bank — that sum IS the output row for 128 channels at once
    SBUF:        + bias, then the 2×2 max-pool over the finished rows
    ─► HBM:      one store of the pooled tile

The 3×3 taps on screen are the nine matmuls; the psum bar fills once per tap.

Render:  manim -qm --format=mp4 trainium_conv_scene.py Trainium
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402
import numpy as np  # noqa: E402
from house import FILL, INK, LINE, MUTED, TEAL, arrow, box, close, header, label  # noqa: E402

FH = FW = 3                # filter taps drawn
BAND_ROWS, BAND_COLS = 6, 8    # tile_out_height + fh - 1 rows of input_width
OUT_ROWS, OUT_COLS = BAND_ROWS - FH + 1, BAND_COLS - FW + 1   # 4 x 6
CELL = 0.21


def grid(rows, cols, cell=CELL, fill=FILL, stroke=LINE):
    g = VGroup()
    for r in range(rows):
        for c in range(cols):
            g.add(Square(cell, stroke_color=stroke, stroke_width=1.2,
                         fill_color=fill, fill_opacity=1)
                  .move_to([c * cell, -r * cell, 0]))
    return g


def cell_at(g, cols, r, c):
    return g[r * cols + c]


def mem(name, w, h, accent=None):
    b = box(w, h, "#FFFFFF", accent or LINE, radius=0.12)
    t = label(name, 19, accent or MUTED, weight=BOLD).next_to(b.get_corner(UL), DR, buff=0.14)
    return VGroup(b, t)


class Trainium(Scene):
    def construct(self):
        chrome = header(
            self, "trainium conv",
            "load once, compute on chip, store once", TEAL,
        )

        # ------------------------------------------------------------------
        # The three memories, left to right. Everything happens inside SBUF.
        Y = -0.55
        hbm_in = mem("memory", 2.3, 3.55).move_to([-5.25, Y, 0])
        sbuf = mem("on chip", 5.9, 3.55, TEAL).move_to([-0.35, Y, 0])
        hbm_out = mem("memory", 2.3, 3.55).move_to([5.25, Y, 0])
        self.play(FadeIn(hbm_in), FadeIn(sbuf), FadeIn(hbm_out), run_time=0.40)

        # HBM holds X and W. Drawn as stacks: 128 channels deep per tile.
        def stack(rows, cols, name, depth=3):
            layers = VGroup(*[
                grid(rows, cols, 0.15, FILL, LINE).shift(RIGHT * 0.05 * k + UP * 0.05 * k)
                for k in range(depth)
            ][::-1])
            t = label(name, 17, MUTED).next_to(layers, DOWN, buff=0.10)
            return VGroup(layers, t)

        x_stack = stack(BAND_ROWS + 1, BAND_COLS, "input image").move_to([-5.25, -0.05, 0])
        w_stack = stack(FH, FW, "filter").move_to([-5.25, -1.6, 0])
        self.play(FadeIn(x_stack), FadeIn(w_stack), run_time=0.30)

        # ------------------------------------------------------------------
        # SBUF contents. Weights first — loaded once, transposed once.
        taps = grid(FH, FW, 0.30, FILL, MUTED).move_to([-2.5, 0.10, 0])
        taps_cap = label("filter taps", 17, MUTED).next_to(taps, DOWN, buff=0.14)
        band = grid(BAND_ROWS, BAND_COLS).move_to([-0.3, 0.10, 0])
        band_cap = label("1  load rows", 17, MUTED).next_to(band, DOWN, buff=0.14)

        self.play(
            TransformFromCopy(w_stack[0], taps), FadeIn(taps_cap),
            TransformFromCopy(x_stack[0], band), FadeIn(band_cap),
            run_time=0.70,
        )

        # PSUM bank: one output row, 128 channels x out_width, filled tap by tap.
        psum_w = 1.35
        psum_box = Rectangle(width=psum_w, height=0.30, stroke_color=TEAL, stroke_width=2,
                             fill_opacity=0).move_to([1.75, 0.58, 0])
        psum_fill = Rectangle(width=0.001, height=0.30, stroke_width=0,
                              fill_color=TEAL, fill_opacity=0.9).align_to(psum_box, LEFT).set_y(0.58)
        psum_cap = label("2  matmul per tap, summed", 17, TEAL).next_to(psum_box, UP, buff=0.10).align_to(psum_box, RIGHT)
        to_psum = Arrow(band.get_corner(UR) + DOWN * 0.15, psum_box.get_left(), buff=0.06,
                        color=TEAL, stroke_width=3, max_tip_length_to_length_ratio=0.3)
        self.play(FadeIn(psum_box), FadeIn(psum_cap), GrowArrow(to_psum), run_time=0.30)
        self.add(psum_fill)

        # The nine matmuls. Tap (i, j) reads band row (out_row + i), columns
        # j .. j + out_width — a shifted slice, no im2col copy.
        out_row = 0
        prev = None
        for k, (i, j) in enumerate([(i, j) for i in range(FH) for j in range(FW)]):
            tap = cell_at(taps, FW, i, j)
            slab = VGroup(*[cell_at(band, BAND_COLS, out_row + i, j + c) for c in range(OUT_COLS)])
            anims = [
                tap.animate.set_fill(TEAL, opacity=0.95),
                slab.animate.set_fill(TEAL, opacity=0.55),
                psum_fill.animate.stretch_to_fit_width(psum_w * (k + 1) / (FH * FW))
                .align_to(psum_box, LEFT),
            ]
            if prev is not None:
                ptap, pslab = prev
                anims += [ptap.animate.set_fill(FILL, opacity=1),
                          pslab.animate.set_fill(FILL, opacity=1)]
            self.play(*anims, run_time=0.13, rate_func=linear)
            prev = (tap, slab)
        ptap, pslab = prev
        self.play(ptap.animate.set_fill(FILL, opacity=1), pslab.animate.set_fill(FILL, opacity=1),
                  run_time=0.10)

        # The finished sum is one output row; bias added on the way down.
        out = grid(OUT_ROWS, OUT_COLS).move_to([1.75, -0.32, 0])
        out_cap = label("3  + bias", 17, MUTED).next_to(out, DOWN, buff=0.10)
        rows = [VGroup(*[cell_at(out, OUT_COLS, r, c) for c in range(OUT_COLS)]) for r in range(OUT_ROWS)]
        for r in rows:
            r.set_fill(TEAL, opacity=0.0)
        self.play(FadeIn(out), FadeIn(out_cap), run_time=0.15)
        self.play(TransformFromCopy(psum_fill, rows[0].copy().set_fill(TEAL, opacity=0.75)),
                  rows[0].animate.set_fill(TEAL, opacity=0.75), run_time=0.30)
        # The other rows go the same way, faster — same nine taps each.
        self.play(
            LaggedStart(*[r.animate.set_fill(TEAL, opacity=0.75) for r in rows[1:]], lag_ratio=0.4),
            psum_fill.animate.stretch_to_fit_width(0.001).align_to(psum_box, LEFT),
            run_time=0.35,
        )

        # 2x2 max-pool, still in SBUF: the tile shrinks before it ever leaves.
        pooled = grid(OUT_ROWS // 2 + 0, OUT_COLS // 2, CELL, TEAL, "#FFFFFF")
        pooled.set_fill(TEAL, opacity=0.9).move_to([1.75, -1.62, 0])
        pool_cap = label("4  max-pool", 17, MUTED).next_to(pooled, LEFT, buff=0.12)
        self.play(TransformFromCopy(out, pooled), FadeIn(pool_cap), run_time=0.45)

        # One store.
        store = arrow(sbuf[0].get_right() + LEFT * 0.02, hbm_out[0].get_left(), TEAL)
        store.set_y(pooled.get_y())
        result = pooled.copy().move_to([5.25, pooled.get_y(), 0])
        res_cap = label("5  store once", 17, TEAL).next_to(result, DOWN, buff=0.12)
        self.play(GrowArrow(store), run_time=0.25)
        self.play(TransformFromCopy(pooled, result), FadeIn(res_cap), run_time=0.40)

        self.wait(1.30)
        close(self, keep=[chrome[0]])
