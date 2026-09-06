"""
Pathology WSI embeddings — 5s loop. One idea: a slide is far too big to embed,
so it is cut into patches, and co-attention pools those patches into a single
slide-level vector.

Render:  manim -qm --format=mp4 pathology_wsi_scene.py PathologyWsi
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402
import numpy as np  # noqa: E402
from house import FILL, LINE, MUTED, PLUM, arrow, box, close, header, label  # noqa: E402


class PathologyWsi(Scene):
    def construct(self):
        chrome = header(self, "PathZero", "language-guided self-supervised embeddings for whole-slide pathology images", PLUM)

        slide = box(2.6, 2.0, "#FFFFFF", LINE, radius=0.06).move_to(LEFT * 4.7 + DOWN * 0.5)
        # Tissue, loosely: an empty white rectangle reads as a missing image.
        _r = np.random.default_rng(4)
        stain = VGroup(*[
            Circle(radius=float(_r.uniform(0.07, 0.26)), stroke_width=0,
                   fill_color=PLUM, fill_opacity=float(_r.uniform(0.10, 0.34)))
            .move_to(slide.get_center() + np.array([float(_r.uniform(-1.0, 1.0)),
                                                    float(_r.uniform(-0.72, 0.72)), 0]))
            for _ in range(26)
        ])
        slide = VGroup(slide, stain)
        slide_cap = label("one slide", 18, MUTED).next_to(slide[0], DOWN, buff=0.22)

        # The slide is cut into a grid of patches.
        rows, cols = 6, 8
        patch = VGroup()
        rng = np.random.default_rng(11)
        for r in range(rows):
            for c in range(cols):
                patch.add(
                    Square(side_length=0.28, stroke_width=1.2, stroke_color=LINE,
                           fill_color=PLUM, fill_opacity=float(rng.uniform(0.10, 0.55)))
                )
        patch.arrange_in_grid(rows=rows, cols=cols, buff=0.045).move_to(LEFT * 0.85 + DOWN * 0.5)
        patch_cap = label("20k patches", 18, MUTED).next_to(patch, DOWN, buff=0.22)

        a1 = arrow(slide[0].get_right(), patch.get_left())
        self.play(FadeIn(slide), FadeIn(slide_cap), run_time=0.43)
        self.play(GrowArrow(a1), run_time=0.24)
        self.play(LaggedStart(*[FadeIn(p, scale=0.6) for p in patch], lag_ratio=0.008),
                  run_time=0.92)
        self.play(FadeIn(patch_cap), run_time=0.24)

        # Co-attention weights the patches, then pools them into one vector.
        weights = rng.uniform(0, 1, len(patch))
        hot = [i for i in np.argsort(weights)[-9:]]
        self.play(
            *[patch[i].animate.set_fill(PLUM, opacity=0.95).set_stroke(PLUM, width=2)
              for i in hot],
            run_time=0.55,
        )

        # The language half: patch embeddings are aligned against text by CLIP.
        txt = box(1.5, 0.62, "#FFFFFF", LINE).move_to([-0.85, 1.62, 0])
        txt_rows = VGroup(
            Line(ORIGIN, RIGHT * 0.78, stroke_width=3, color=LINE),
            Line(ORIGIN, RIGHT * 0.52, stroke_width=3, color=PLUM),
        ).arrange(DOWN, buff=0.13, aligned_edge=LEFT).move_to(txt)
        txt_cap = label("report text", 17, MUTED).next_to(txt, UP, buff=0.16)
        clip_a = Arrow(txt.get_bottom(), patch.get_top(), buff=0.12, color=PLUM,
                       stroke_width=3, max_tip_length_to_length_ratio=0.26)
        clip_t = label("clip", 17, PLUM).next_to(clip_a, RIGHT, buff=0.10)
        self.play(FadeIn(txt), FadeIn(txt_rows), FadeIn(txt_cap), run_time=0.37)
        self.play(GrowArrow(clip_a), FadeIn(clip_t), run_time=0.37)

        vec = VGroup(*[
            Rectangle(width=0.42, height=0.20, stroke_width=1.2, stroke_color=LINE,
                      fill_color=PLUM, fill_opacity=float(v))
            for v in rng.uniform(0.25, 0.95, 8)
        ]).arrange(DOWN, buff=0.045).move_to(RIGHT * 4.3 + DOWN * 0.5)
        vec_cap = label("one embedding", 18, PLUM).next_to(vec, DOWN, buff=0.22)
        a2 = arrow(patch.get_right(), vec.get_left(), PLUM)
        pool = label("co-attention", 18, PLUM).next_to(a2, UP, buff=0.14)

        self.play(GrowArrow(a2), FadeIn(pool), run_time=0.43)
        self.play(
            LaggedStart(*[FadeIn(v, shift=LEFT * 0.15) for v in vec], lag_ratio=0.07),
            run_time=0.67,
        )
        self.play(FadeIn(vec_cap), run_time=0.31)
        self.wait(1.40)
        close(self, keep=[chrome[0]])
