"""
GANDALF-MD — 5s. The whole pipeline, rebuilt from the report's Figure 7
("GANDALF-MD Pipeline", the authors' own diagram), populated with the real
imagery from the poster and report:

    real x ─┐
             ⊕ ─► view ─► DiffAugment: the SAME T on x and on G(z) ─► D
    V(x)  ──┘                              └─► generated ─► FID 118.9 → 86.0

Redrawn rather than pasted: their figure is 2142px wide, so at tile size its
labels land near 7px. Every image inside it is theirs.

Assets: gandalf_md_assets.py (poster PDF) — see that file.
Render:  manim -qm --format=mp4 gandalf_md_scene.py Gandalf
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402
from house import CARDINAL, GREEN, INK, LINE, MUTED, box, close, header, label  # noqa: E402

ASSETS = Path(__file__).resolve().parent / "assets"
BLUE_LN, BLUE_TX, BLUE_FL = "#7C8CA8", "#41506B", "#DEE3EC"


def plate(name, height, border=LINE):
    img = ImageMobject(str(ASSETS / f"{name}.png")).set_height(height)
    return Group(img, SurroundingRectangle(img, color=border, buff=0, stroke_width=2))


def tag(text, mob, direction=UP, buff=0.14, size=17, color=MUTED):
    return label(text, size, color).next_to(mob, direction, buff=buff)


def link(a, b, color=MUTED, w=3.0):
    return Arrow(a, b, buff=0.11, color=color, stroke_width=w,
                 max_tip_length_to_length_ratio=0.32)


class Gandalf(Scene):
    def construct(self):
        chrome = header(
            self, "GANDALF-MD",
            "GANs with Data Augmentations Learned For Medical Data", CARDINAL,
        )

        # --- the transform: a real image plus the Viewmaker's perturbation
        real = plate("x", 1.15).move_to([-5.55, 0.42, 0])
        pert = plate("perturb", 1.15, CARDINAL).move_to([-5.55, -1.28, 0])
        plus = label("+", 30, MUTED).move_to([-4.28, -0.43, 0])
        view = plate("view", 1.42).move_to([-3.05, -0.43, 0])

        tags = VGroup(
            tag("real x", real, LEFT, 0.16), tag("V(x)", pert, LEFT, 0.16, color=CARDINAL),
            tag("view", view),
        )
        a_rv = link(real.get_right(), view.get_left() + UP * 0.28)
        a_pv = link(pert.get_right(), view.get_left() + DOWN * 0.28, CARDINAL)

        self.play(FadeIn(real), FadeIn(tags[0]), run_time=0.42)
        self.play(FadeIn(pert), FadeIn(tags[1]), FadeIn(plus), run_time=0.45)
        self.play(GrowArrow(a_rv), GrowArrow(a_pv), FadeIn(view), FadeIn(tags[2]), run_time=0.53)

        # --- DiffAugment: the same T on reals and on fakes, so D cannot cheat
        pane = RoundedRectangle(width=3.5, height=2.05, corner_radius=0.12,
                                stroke_color=LINE, stroke_width=2,
                                fill_color="#EDEFF4", fill_opacity=1).move_to([0.05, -0.43, 0])
        pane_t = tag("diffaugment", pane, UP, 0.10)
        dbox = VGroup(box(0.62, 0.54, BLUE_FL, BLUE_LN), label("D", 18, BLUE_TX)).move_to([1.20, -0.10, 0])
        gbox = VGroup(box(0.62, 0.50, BLUE_FL, BLUE_LN), label("G", 18, BLUE_TX)).move_to([-0.95, -1.10, 0])
        for g in (dbox, gbox):
            g[1].move_to(g[0])
        t_x = label("T(x)", 17, INK).move_to([-0.55, 0.30, 0])
        t_gz = label("T(G(z))", 17, INK).move_to([0.30, -1.10, 0])
        a_tx_d = link(t_x.get_right(), dbox.get_left() + UP * 0.10, MUTED, 2.4)
        a_g_t = link(gbox.get_right(), t_gz.get_left(), MUTED, 2.4)
        a_t_d = link(t_gz.get_right(), dbox.get_bottom() + DOWN * 0.02, MUTED, 2.4)
        a_view = link(view.get_right(), pane.get_left() + UP * 0.30, CARDINAL)

        self.play(FadeIn(pane), FadeIn(pane_t), GrowArrow(a_view), run_time=0.47)
        self.play(FadeIn(t_x), GrowArrow(a_tx_d), FadeIn(dbox), run_time=0.45)
        self.play(FadeIn(gbox), GrowArrow(a_g_t), FadeIn(t_gz), GrowArrow(a_t_d), run_time=0.50)

        # --- what comes out, and the number that justifies it
        gen = plate("r_ham_gan", 1.95).move_to([3.55, -0.43, 0])
        gen_t = tag("generated", gen)
        a_dg = link(pane.get_right(), gen.get_left())
        fid = VGroup(
            label("FID", 17, MUTED),
            label("118.9", 18, MUTED),
            label("→", 18, MUTED),
            label("86.0", 21, GREEN, weight=BOLD),
        ).arrange(RIGHT, buff=0.14).next_to(gen, DOWN, buff=0.28)

        self.play(GrowArrow(a_dg), FadeIn(gen), FadeIn(gen_t), run_time=0.56)
        self.play(FadeIn(fid, shift=UP * 0.10), run_time=0.45)
        self.play(Indicate(fid[3], color=GREEN, scale_factor=1.16), run_time=0.56)
        self.wait(1.39)
        close(self, keep=[chrome[0]])
