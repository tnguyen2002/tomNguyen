"""
distilled.gg — 5s. The whole pipeline, end to end:

    vod ─► sample every 2s ─► YOLO finds killfeed rows ─► OCR the left strip
        ─► vote the reads into one name ─► cluster kills ─► cut clips

Six stages on screen at once, revealed fast.

Render:  manim -qm --format=mp4 distilled_gg_scene.py Distilled
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402
import numpy as np  # noqa: E402
from house import AMBER, FILL, GREEN, LINE, MUTED, box, close, header, label  # noqa: E402


def vod_glyph(w=1.60, h=1.20):
    """A VOD: a frame with sprocket holes, i.e. a lot of footage."""
    body = box(w, h, "#FFFFFF", LINE, radius=0.06)
    holes = VGroup(*[
        Rectangle(width=0.10, height=0.09, fill_color=LINE, fill_opacity=1, stroke_width=0)
        for _ in range(8)
    ])
    for i, hbox in enumerate(holes):
        side = -1 if i < 4 else 1
        hbox.move_to(body.get_center() + np.array([side * (w / 2 - 0.11), 0.30 - 0.20 * (i % 4), 0]))
    return VGroup(body, holes)


def sampled_glyph(n=9, w=1.60):
    """0.5 fps: a sparse comb of sampled instants, not every frame."""
    rail = Line(LEFT * w / 2, RIGHT * w / 2, stroke_width=3, color=LINE)
    ticks = VGroup(*[
        Line(DOWN * 0.16, UP * 0.16, stroke_width=3, color=MUTED)
        .move_to(rail.get_left() + RIGHT * (w * i / (n - 1)))
        for i in range(n)
    ])
    return VGroup(rail, ticks)


def killrow_glyph(w=1.85, h=0.54):
    """A killfeed row with the detector's box on it."""
    bar = box(w, h, "#FFFFFF", LINE, radius=0.06)
    strip = Rectangle(width=w * 0.40, height=h, fill_color=FILL, fill_opacity=1, stroke_width=0)
    strip.align_to(bar, LEFT).set_y(bar.get_y())
    dots = VGroup(*[
        Circle(radius=0.07, stroke_width=0, fill_color=LINE, fill_opacity=1) for _ in range(3)
    ]).arrange(RIGHT, buff=0.11)
    dots.next_to(strip, RIGHT, buff=0.11).set_y(bar.get_y())
    det = Rectangle(width=w + 0.10, height=h + 0.16, stroke_color=AMBER, stroke_width=2.5,
                    fill_opacity=0).move_to(bar)
    return VGroup(bar, strip, dots, det)


def ocr_glyph():
    """OCR reads only the left strip, where the attacker's name sits."""
    strip = box(1.15, 0.52, FILL, AMBER, radius=0.05)
    txt = label("PR0PER", 17, MUTED).move_to(strip)
    return VGroup(strip, txt)


def vote_glyph():
    """Three disagreeing reads collapsing to one."""
    reads = VGroup(
        label("PROPER", 16, MUTED), label("PR0PER", 16, MUTED), label("PROPERO", 16, MUTED),
    ).arrange(DOWN, buff=0.10)
    out = label("PROPER", 18, GREEN, weight=BOLD).next_to(reads, DOWN, buff=0.18)
    return VGroup(reads, out)


def clips_glyph():
    g = VGroup()
    for _ in range(3):
        s = box(0.80, 0.52, "#FFFFFF", LINE, radius=0.05)
        t = Triangle(color=AMBER, fill_color=AMBER, fill_opacity=1, stroke_width=0)
        t.rotate(-PI / 2).scale(0.095).move_to(s)
        g.add(VGroup(s, t))
    return g.arrange(RIGHT, buff=0.10)


def link(a, b, color=MUTED, w=2.8):
    return Arrow(a, b, buff=0.11, color=color, stroke_width=w,
                 max_tip_length_to_length_ratio=0.36)


class Distilled(Scene):
    def construct(self):
        chrome = header(self, "distilled.gg", "drop an overwatch 2 vod, get back a clip of every kill you got, cut to the frame", AMBER)

        stages = [vod_glyph(), sampled_glyph(), killrow_glyph(), ocr_glyph(), vote_glyph(), clips_glyph()]
        row = Group(*stages).arrange(RIGHT, buff=0.50)
        row.set_width(12.4).move_to([0, -0.55, 0])   # fill the frame without running off it
        caps = VGroup(*[
            label(t, 16, MUTED).next_to(m, DOWN, buff=0.24)
            for t, m in zip(("vod", "every 2s", "detect", "read", "vote", "clips"), stages)
        ])
        # The vote stage is tall; keep its caption clear of the reads.
        caps[4].next_to(stages[4], DOWN, buff=0.16)
        arrows = VGroup(*[link(stages[i].get_right(), stages[i + 1].get_left()) for i in range(5)])

        self.play(FadeIn(stages[0]), FadeIn(caps[0]), run_time=0.51)
        for i in range(1, 6):
            self.play(GrowArrow(arrows[i - 1]), FadeIn(stages[i]), FadeIn(caps[i]), run_time=0.51)
        self.play(Indicate(stages[5], color=AMBER, scale_factor=1.10), run_time=0.77)
        self.wait(1.79)
        close(self, keep=[chrome[0]])
