"""
BlinkyBird — 7s. The whole control loop, from face to flap:

    webcam ─► MediaPipe eye landmarks ─► eye aspect ratio ─► below the
    calibrated threshold ─► one flap

The threshold is the interesting part: it is set per player during calibration,
because a resting EAR differs enough between faces that one constant would
either miss blinks or flap constantly.

Render:  manim -qm --format=mp4 blinkybird_scene.py BlinkyBird
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402
import numpy as np  # noqa: E402
from house import FILL, INK, LINE, MUTED, ROSE, box, close, header, label  # noqa: E402


def eye(width=0.62, open_frac=1.0):
    """Six landmarks per eye — the exact points the EAR is computed from."""
    h = 0.20 * open_frac
    pts = [
        np.array([-width / 2, 0, 0]),
        np.array([-width / 6, h, 0]),
        np.array([width / 6, h, 0]),
        np.array([width / 2, 0, 0]),
        np.array([width / 6, -h, 0]),
        np.array([-width / 6, -h, 0]),
    ]
    lid = VMobject(stroke_color=MUTED, stroke_width=2.5)
    lid.set_points_as_corners([*pts, pts[0]])
    dots = VGroup(*[
        Circle(radius=0.042, stroke_width=0, fill_color=ROSE, fill_opacity=1).move_to(p)
        for p in pts
    ])
    return VGroup(lid, dots)


def face_glyph():
    head = Ellipse(width=2.05, height=2.55, stroke_color=LINE, stroke_width=2.5,
                   fill_color="#FFFFFF", fill_opacity=1)
    left, right = eye(), eye()
    left.move_to(head.get_center() + np.array([-0.44, 0.30, 0]))
    right.move_to(head.get_center() + np.array([0.44, 0.30, 0]))
    mouth = Arc(radius=0.34, start_angle=PI + 0.5, angle=PI - 1.0,
                stroke_color=LINE, stroke_width=2.5)
    mouth.move_to(head.get_center() + np.array([0, -0.62, 0]))
    return VGroup(head, left, right, mouth)


def bird_glyph(r=0.20):
    body = Circle(radius=r, stroke_width=0, fill_color=ROSE, fill_opacity=1)
    beak = Triangle(color="#D8A23C", fill_color="#D8A23C", fill_opacity=1, stroke_width=0)
    beak.rotate(-PI / 2).scale(0.09).next_to(body, RIGHT, buff=-0.02)
    wing = Arc(radius=r * 0.62, start_angle=PI * 0.15, angle=PI * 0.9,
               stroke_color="#FFFFFF", stroke_width=2.5).move_to(body.get_center())
    return VGroup(body, wing, beak)


class BlinkyBird(Scene):
    def construct(self):
        chrome = header(self, "BlinkyBird", "blink to flap — the threshold is calibrated per player", ROSE)

        # --- the webcam sees a face; MediaPipe gives six points per eye
        face = face_glyph().move_to([-5.05, -0.55, 0])
        cam = box(2.5, 3.0, "#FFFFFF", LINE, radius=0.10).move_to(face)
        cam_t = label("webcam", 17, MUTED).next_to(cam, DOWN, buff=0.20)
        self.play(FadeIn(cam), FadeIn(cam_t), run_time=0.42)
        self.play(FadeIn(face), run_time=0.48)
        lm = label("6 landmarks / eye", 17, ROSE).next_to(cam, UP, buff=0.18)
        self.play(FadeIn(lm), run_time=0.38)

        # --- the eye aspect ratio over time, and the moment it collapses
        ax_w, ax_h = 4.5, 1.7
        origin = np.array([-1.85, -0.75, 0])
        axis = VGroup(
            Line(origin, origin + RIGHT * ax_w, stroke_width=2, color=LINE),
            Line(origin, origin + UP * ax_h, stroke_width=2, color=LINE),
        )
        ear_t = label("eye aspect ratio", 17, MUTED).next_to(
            VGroup(*axis), UP, buff=0.22).shift(RIGHT * 0.6)

        xs = np.linspace(0, 1, 90)
        # Resting open, one sharp collapse, back to open — a blink, not a squint.
        ys = 0.86 - 0.74 * np.exp(-((xs - 0.56) ** 2) / (2 * 0.035 ** 2))
        pts = [origin + np.array([x * ax_w, y * ax_h, 0]) for x, y in zip(xs, ys)]
        trace = VMobject(stroke_color=INK, stroke_width=3.2)
        trace.set_points_smoothly(pts)

        self.play(Create(axis), FadeIn(ear_t), run_time=0.42)
        self.play(Create(trace), run_time=1.15)

        thr_y = 0.40
        thr = DashedLine(origin + np.array([0, thr_y * ax_h, 0]),
                         origin + np.array([ax_w, thr_y * ax_h, 0]),
                         color=ROSE, stroke_width=2.6, dash_length=0.09)
        # Short, and hard right. Anything longer reaches back to the dip in
        # the middle of the trace and gets drawn through; the "calibrated per
        # player" half of this lives in the subtitle instead.
        thr_t = label("threshold", 17, ROSE)
        thr_t.next_to(thr, UP, buff=0.14).align_to(thr, RIGHT)
        self.play(Create(thr), FadeIn(thr_t), run_time=0.50)

        # The crossing is the blink.
        hit = Circle(radius=0.10, stroke_width=0, fill_color=ROSE, fill_opacity=1)
        hit.move_to(origin + np.array([0.56 * ax_w, 0.12 * ax_h, 0]))
        # Under the axis, clear of both the trace and the axis line itself.
        blink_t = label("blink", 18, ROSE, weight=BOLD)
        blink_t.move_to([hit.get_x(), origin[1] - 0.34, 0])
        self.play(GrowFromCenter(hit), FadeIn(blink_t), run_time=0.42)

        # --- one blink is one flap: the game, and the bird rising
        game = box(2.9, 3.0, "#FFFFFF", LINE, radius=0.10).move_to([4.75, -0.55, 0])
        pipes = VGroup(
            Rectangle(width=0.44, height=1.05, fill_color="#7FA86A", fill_opacity=1,
                      stroke_width=0).move_to(game.get_center() + np.array([0.55, 0.98, 0])),
            Rectangle(width=0.44, height=1.05, fill_color="#7FA86A", fill_opacity=1,
                      stroke_width=0).move_to(game.get_center() + np.array([0.55, -1.02, 0])),
        )
        bird = bird_glyph().move_to(game.get_center() + np.array([-0.72, -0.62, 0]))
        game_t = label("one blink, one flap", 17, MUTED).next_to(game, DOWN, buff=0.20)
        a_in = Arrow(hit.get_right() + RIGHT * 0.1, game.get_left(), buff=0.16, color=ROSE,
                     stroke_width=3, max_tip_length_to_length_ratio=0.28)

        self.play(FadeIn(game), FadeIn(pipes), FadeIn(bird), FadeIn(game_t), run_time=0.52)
        self.play(GrowArrow(a_in), run_time=0.34)
        lift = Arrow(bird.get_center() + DOWN * 0.10, bird.get_center() + UP * 0.95,
                     buff=0.06, color=ROSE, stroke_width=3,
                     max_tip_length_to_length_ratio=0.30)
        self.play(
            bird.animate.shift(UP * 0.95), GrowArrow(lift),
            run_time=0.55, rate_func=rush_from,
        )
        self.wait(1.35)
        close(self, keep=[chrome[0]])
