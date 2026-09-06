"""
post2vid — 5s. The whole path from a mention to a posted video:

    post ─► poller ─► queue ─► worker
                                 └─► source ─► storyboard ─► narration ─► video ─┐
    post ◄──────────────────────────────────────────── reply ◄─────────────────┘

Eight stages on screen at once, revealed fast — at five seconds there is no
walking through it, so the finished diagram is what the loop leaves you with.

Render:  manim -qm --format=mp4 post2vid_scene.py Post2Vid
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402
import numpy as np  # noqa: E402
from house import CLAY, FILL, LINE, MUTED, box, close, header, label  # noqa: E402


def post_glyph(w=1.55, h=0.78):
    card = box(w, h, "#FFFFFF", LINE, radius=0.10)
    rows = VGroup(
        Line(ORIGIN, RIGHT * w * 0.52, stroke_width=3.5, color=LINE),
        Line(ORIGIN, RIGHT * w * 0.40, stroke_width=3.5, color=CLAY),
    ).arrange(DOWN, buff=0.14, aligned_edge=LEFT).move_to(card)
    return VGroup(card, rows)


def clock_glyph(r=0.32):
    return VGroup(
        Circle(radius=r, stroke_color=MUTED, stroke_width=3, fill_color="#FFFFFF", fill_opacity=1),
        Line(ORIGIN, UP * r * 0.52, stroke_color=MUTED, stroke_width=3),
        Line(ORIGIN, RIGHT * r * 0.72, stroke_color=MUTED, stroke_width=3),
    )


def stack_glyph(n=3, w=1.0, h=0.16):
    return VGroup(*[box(w, h, FILL, LINE, radius=0.04) for _ in range(n)]).arrange(DOWN, buff=0.08)


def cog_glyph(r=0.28, teeth=8):
    spokes = VGroup()
    for i in range(teeth):
        t = Rectangle(width=0.10, height=0.14, fill_color=MUTED, fill_opacity=1, stroke_width=0)
        a = i * TAU / teeth
        t.move_to([np.cos(a) * (r + 0.05), np.sin(a) * (r + 0.05), 0]).rotate(a)
        spokes.add(t)
    return VGroup(
        spokes,
        Circle(radius=r, stroke_color=MUTED, stroke_width=3, fill_color=FILL, fill_opacity=1),
        Circle(radius=r * 0.34, stroke_color=MUTED, stroke_width=2.5, fill_color="#FFFFFF", fill_opacity=1),
    )


def page_glyph(w=0.86, h=1.12):
    sheet = box(w, h, "#FFFFFF", LINE, radius=0.05)
    rules = VGroup(*[
        Line(ORIGIN, RIGHT * (w * 0.58 if i % 3 else w * 0.38), stroke_width=2, color=LINE)
        for i in range(5)
    ]).arrange(DOWN, buff=0.13, aligned_edge=LEFT).move_to(sheet)
    return VGroup(sheet, rules)


def beats_glyph(n=6, s=0.30):
    return VGroup(*[box(s, s, FILL, LINE, radius=0.05) for _ in range(n)]).arrange(RIGHT, buff=0.07)


def wave_glyph(n=22, w=1.35):
    rng = np.random.default_rng(4)
    amps = 0.10 + 0.32 * np.abs(np.sin(np.linspace(0, 5.2, n))) * rng.uniform(0.4, 1.0, n)
    g = VGroup(*[Line(DOWN * a, UP * a, stroke_width=3, color=MUTED) for a in amps])
    return g.arrange(RIGHT, buff=(w / n) * 0.55)


def video_glyph(w=1.35, h=0.80):
    screen = box(w, h, "#FFFFFF", LINE, radius=0.08)
    tri = Triangle(color=CLAY, fill_color=CLAY, fill_opacity=1, stroke_width=0)
    tri.rotate(-PI / 2).scale(0.14).move_to(screen)
    return VGroup(screen, tri)


def link(a, b, color=MUTED, w=2.8):
    return Arrow(a, b, buff=0.11, color=color, stroke_width=w,
                 max_tip_length_to_length_ratio=0.34)


class Post2Vid(Scene):
    def construct(self):
        chrome = header(self, "post2vid", None, CLAY)

        # Top band: the mention becomes a claimed job.
        top = [post_glyph(), clock_glyph(), stack_glyph(), cog_glyph()]
        Group(*top).arrange(RIGHT, buff=1.05).move_to([0, 0.85, 0])
        top_caps = VGroup(*[
            label(t, 16, MUTED).next_to(m, DOWN, buff=0.20)
            for t, m in zip(("mention", "poller", "queue", "worker"), top)
        ])
        # The reply arrow arrives underneath the post, so that one caption goes
        # above instead of being written through by the arrowhead.
        top_caps[0].next_to(top[0], UP, buff=0.18)
        top_ar = VGroup(*[link(top[i].get_right(), top[i + 1].get_left()) for i in range(3)])

        self.play(FadeIn(top[0]), FadeIn(top_caps[0]), run_time=0.44)
        for i in range(1, 4):
            self.play(GrowArrow(top_ar[i - 1]), FadeIn(top[i]), FadeIn(top_caps[i]), run_time=0.37)

        # Bottom band: the worker's pipeline, ending in the posted reply.
        # Reversed on purpose: laid out right-to-left, the two bands form a
        # serpentine and the reply is a short hop up to the post it answers,
        # not a diagonal slashed across everything between.
        bot = [page_glyph(), beats_glyph(), wave_glyph(), video_glyph()]
        Group(*bot).arrange(LEFT, buff=1.05).move_to([0, -1.85, 0])
        bot_caps = VGroup(*[
            label(t, 16, MUTED).next_to(m, DOWN, buff=0.20)
            for t, m in zip(("source", "storyboard", "narration", "video"), bot)
        ])
        bot_ar = VGroup(*[link(bot[i].get_left(), bot[i + 1].get_right()) for i in range(3)])
        drop = link(top[3].get_bottom(), bot[0].get_top(), MUTED)

        self.play(GrowArrow(drop), FadeIn(bot[0]), FadeIn(bot_caps[0]), run_time=0.44)
        for i in range(1, 4):
            self.play(GrowArrow(bot_ar[i - 1]), FadeIn(bot[i]), FadeIn(bot_caps[i]), run_time=0.40)

        # The reply closes the loop back to the post it answered.
        reply = link(bot[3].get_top(), top[0].get_bottom(), CLAY, 3.0)
        reply_t = label("reply", 16, CLAY).next_to(reply, LEFT, buff=0.12)
        self.play(GrowArrow(reply), FadeIn(reply_t), run_time=0.70)
        self.wait(1.63)
        close(self, keep=[chrome[0]])
