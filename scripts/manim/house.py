"""
Shared house style for the project demos in public/media.

Every demo is a ~5 second hover-to-play loop, so each one carries exactly ONE
idea. That is the whole design constraint: at five seconds there is no room for
act captions that change, so the caption is static and the animation says the
rest. Chrome is a title and one line; everything else is the diagram.

Palette is lifted from tailwind.config.js. Each project owns one accent hue —
keep them distinct, they are how the demos stay distinguishable at tile size.
"""

from manim import *

BG = "#F4F3EE"      # matches the existing encoded mp4s, not tailwind's canvas
INK = "#1C1B1A"
MUTED = "#6F6960"
LINE = "#DAD3C8"
FILL = "#EFEBE4"
GREEN = "#4E7A5E"

# One hue per project.
CLAY = "#B8502F"        # post2vid
AMBER = "#C0741E"       # distilled.gg
CARDINAL = "#8C1515"    # gandalf-md — Stanford's, from the poster
PLUM = "#7A4E7A"        # pathology-wsi
TEAL = "#3D7A6B"        # trainium-conv
SLATE = "#3E6A9A"       # cuda-renderer
PERI = "#8A87B8"        # mnist-numpy
ROSE = "#A63D6E"        # blinkybird
LEAF = "#2E7D4F"        # felix

# Pango has no SF Pro, so Helvetica Neue stands in for the site's system stack.
FONT = "Helvetica Neue"

# Font sizes have a floor of ~17: the tile renders about half of 1280px wide,
# so anything smaller lands at single-digit pixels for a visitor.
config.background_color = BG


# Pango hints glyphs at the pixel size it lays out at, so at the sizes used
# here every advance width snaps to the grid. Narrow letters (l, i, r, t) round
# hardest, and the error piles up into visible gaps mid-word — "th reshold",
# "cal ibrated". Laying out at 4x and scaling back down puts the layout well
# clear of the hinting grid; the glyph outlines are identical, so this costs
# nothing but a multiply.
TEXT_OVERSAMPLE = 4


def label(text, size=21, color=INK, weight=NORMAL):
    t = Text(text, font=FONT, font_size=size * TEXT_OVERSAMPLE, color=color,
             weight=weight)
    return t.scale(1 / TEXT_OVERSAMPLE)


def box(w, h, fill=FILL, stroke=LINE, radius=0.08):
    return RoundedRectangle(
        width=w, height=h, corner_radius=radius,
        fill_color=fill, fill_opacity=1, stroke_color=stroke, stroke_width=2,
    )


def arrow(start, end, color=MUTED):
    return Arrow(
        start, end, buff=0.15, color=color,
        stroke_width=3, max_tip_length_to_length_ratio=0.26,
    )


def header(scene, name, line, accent):
    """No-op. The demos used to open with a title and a one-line caption, but
    the site prints the project's name and summary directly under the video,
    so the frame now carries neither. Kept so every scene's
    `close(self, keep=[chrome[0]])` still has something to hold on to.
    """
    return VGroup(VGroup())


def close(scene, keep):
    """Fade back toward the opening frame so the loop closes cleanly."""
    scene.wait(0.20)
    scene.play(
        FadeOut(*[m for m in scene.mobjects if m not in keep]),
        run_time=0.40,
    )


def flow(nodes, y=-0.55, buff=0.62, color=MUTED, arrow_scale=1.0):
    """Lay out a whole pipeline on one line and return (group, arrows).

    Five seconds is not enough to walk a process stage by stage, so every demo
    puts the entire pipeline on screen at once and reveals it fast. The finished
    diagram is what the viewer is left holding when the loop repeats.
    """
    row = Group(*nodes).arrange(RIGHT, buff=buff)
    row.move_to([0, y, 0])
    arrows = VGroup(*[
        Arrow(
            nodes[i].get_right(), nodes[i + 1].get_left(), buff=0.10, color=color,
            stroke_width=3, max_tip_length_to_length_ratio=0.34 * arrow_scale,
        )
        for i in range(len(nodes) - 1)
    ])
    return row, arrows


def reveal(scene, nodes, arrows, per=0.30):
    """Stagger a pipeline into view: node, arrow, node, arrow…"""
    for i, n in enumerate(nodes):
        anims = [FadeIn(n, shift=RIGHT * 0.10)]
        if i:
            anims.append(GrowArrow(arrows[i - 1]))
        scene.play(*anims, run_time=per)


def caption_row(nodes, texts, size=17, color=MUTED, buff=0.22):
    """One short word under each stage — the only text a 5s pipeline can carry."""
    out = VGroup()
    for n, t in zip(nodes, texts):
        if t:
            out.add(label(t, size, color).next_to(n, DOWN, buff=buff))
    return out
