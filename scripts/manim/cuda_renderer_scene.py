"""
Simple CUDA renderer — 7s. What one thread block does for one tile, straight
from kernelThreadCircleIntersection in cudaRenderer.cu:

    the screen is a 32x32 grid of tiles, one block of 256 threads per tile
    for every batch of 256 circles:
        thread i tests circle i against the tile      -> circleFlags[i] in {0,1}
        exclusive scan over the flags in shared mem   -> circleScan
        flagged circles write themselves to circleOrder[scan[i]]
            -> a compacted list that is STILL in circle-index (draw) order
        the same 256 threads then shade the tile's pixels, blending that
        list in order, one pixel per thread, colour kept in a register

The flags on screen are computed from the real geometry of the circles you can
see against the highlighted tile, so the scan is the scan of what is drawn.

Render:  manim -qm --format=mp4 cuda_renderer_scene.py CudaRenderer
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402
import numpy as np  # noqa: E402
from house import INK, LINE, MUTED, SLATE, close, header, label  # noqa: E402

# A window onto the 32x32 tile grid — every cell is one thread block.
COLS, ROWS = 8, 6
FIELD_W, FIELD_H = 4.2, 3.15
FIELD_C = np.array([-3.85, -1.02, 0])
TILE_W, TILE_H = FIELD_W / COLS, FIELD_H / ROWS

# The classic renderer output: many translucent circles, overlapping, where the
# compositing order is the whole difficulty.
PALETTE = [SLATE, "#6E93B8", "#4E7A5E", "#C0741E", "#8A87B8", "#B8502F"]

BATCH = 12          # stands in for THREADS_PER_BLOCK = 256
SLOT = 0.40         # horizontal pitch of the batch rows
ROW_X0 = 1.75       # x of the first slot
LABEL_X = -1.45     # shared left edge of the row labels


def circle_in_box(cx, cy, r, l, rt, b, t):
    """circleInBox from circleBoxTest.cu_inl: nearest point on the box."""
    nx = min(max(cx, l), rt)
    ny = min(max(cy, b), t)
    return (cx - nx) ** 2 + (cy - ny) ** 2 <= r * r


class CudaRenderer(Scene):
    def construct(self):
        chrome = header(
            self, "cuda renderer",
            "one thread block per tile: test, count, pack, blend", SLATE,
        )

        # ------------------------------------------------------------------
        # The rendered field, with the tile grid over it.
        frame = Rectangle(width=FIELD_W, height=FIELD_H, stroke_color=LINE, stroke_width=2,
                          fill_color="#FFFFFF", fill_opacity=1).move_to(FIELD_C)

        rng = np.random.default_rng(7)
        n = 64
        geo, circles = [], VGroup()
        for i in range(n):
            rad = float(rng.uniform(0.11, 0.30))
            cx = float(rng.uniform(-FIELD_W / 2 + rad * 0.5, FIELD_W / 2 - rad * 0.5))
            cy = float(rng.uniform(-FIELD_H / 2 + rad * 0.5, FIELD_H / 2 - rad * 0.5))
            geo.append((cx, cy, rad))
            circles.add(
                Circle(radius=rad, stroke_width=0,
                       fill_color=PALETTE[i % len(PALETTE)],
                       fill_opacity=float(rng.uniform(0.32, 0.62)))
                .move_to(FIELD_C + np.array([cx, cy, 0]))
            )

        # Pick the tile that the first BATCH circles (one batch, in draw order)
        # cover 4-6 of, so the flag row has something to say.
        def tile_bounds(c, r):
            l = -FIELD_W / 2 + c * TILE_W
            b = -FIELD_H / 2 + r * TILE_H
            return l, l + TILE_W, b, b + TILE_H

        best, best_k = (3, 2), -1
        for r in range(1, ROWS - 1):
            for c in range(1, COLS - 1):
                l, rt, b, t = tile_bounds(c, r)
                k = sum(circle_in_box(*geo[i], l, rt, b, t) for i in range(BATCH))
                if 4 <= k <= 6 and k > best_k:
                    best, best_k = (c, r), k
        tc, tr = best
        l, rt, b, t = tile_bounds(tc, tr)
        flags = [1 if circle_in_box(*geo[i], l, rt, b, t) else 0 for i in range(BATCH)]
        scan, run = [], 0
        for f in flags:
            scan.append(run)
            run += f

        self.play(FadeIn(frame), run_time=0.25)
        # The renderer's output being drawn: circles land one by one, in draw order.
        self.play(LaggedStart(*[GrowFromCenter(c) for c in circles], lag_ratio=0.06),
                  run_time=1.60, rate_func=linear)

        grid = VGroup()
        for c in range(1, COLS):
            x = -FIELD_W / 2 + c * TILE_W
            grid.add(Line(FIELD_C + np.array([x, -FIELD_H / 2, 0]),
                          FIELD_C + np.array([x, FIELD_H / 2, 0]),
                          stroke_width=1.5, color=LINE))
        for r in range(1, ROWS):
            y = -FIELD_H / 2 + r * TILE_H
            grid.add(Line(FIELD_C + np.array([-FIELD_W / 2, y, 0]),
                          FIELD_C + np.array([FIELD_W / 2, y, 0]),
                          stroke_width=1.5, color=LINE))
        tile = Rectangle(width=TILE_W, height=TILE_H, stroke_color=SLATE, stroke_width=3.5,
                         fill_opacity=0).move_to(FIELD_C + np.array([(l + rt) / 2, (b + t) / 2, 0]))
        cap_grid = label("one thread block per tile", 17, MUTED)
        cap_grid.next_to(frame, DOWN, buff=0.20)
        self.play(LaggedStart(*[Create(g) for g in grid], lag_ratio=0.05), FadeIn(cap_grid),
                  run_time=0.55)
        self.play(Create(tile), run_time=0.30)

        # ------------------------------------------------------------------
        # One batch of circles through the block's shared memory.
        ys = {"batch": 0.75, "flag": 0.02, "scan": -0.70, "order": -1.62}

        def slot_x(i):
            return ROW_X0 + i * SLOT

        def row_label(text, key, color=MUTED):
            return label(text, 17, color).move_to([LABEL_X, ys[key], 0], aligned_edge=LEFT)

        batch = VGroup()
        for i in range(BATCH):
            cx, cy, rad = geo[i]
            batch.add(
                Circle(radius=0.075 + rad * 0.32, stroke_width=0,
                       fill_color=PALETTE[i % len(PALETTE)],
                       fill_opacity=circles[i].get_fill_opacity() + 0.25)
                .move_to([slot_x(i), ys["batch"], 0])
            )
        lab_batch = row_label("batch of circles", "batch")
        self.play(FadeIn(lab_batch),
                  LaggedStart(*[TransformFromCopy(circles[i], batch[i]) for i in range(BATCH)],
                              lag_ratio=0.05),
                  run_time=0.70)

        flag_t = VGroup(*[
            label(str(f), 21, SLATE if f else LINE, weight=BOLD if f else NORMAL)
            .move_to([slot_x(i), ys["flag"], 0])
            for i, f in enumerate(flags)
        ])
        lab_flag = row_label("1  test\nin the tile?", "flag")
        self.play(FadeIn(lab_flag), run_time=0.15)
        # The test flashes on the field: each flagged circle brightens once.
        self.play(
            LaggedStart(*[FadeIn(flag_t[i], scale=0.6) for i in range(BATCH)], lag_ratio=0.06),
            *[Indicate(circles[i], color=SLATE, scale_factor=1.15) for i in range(BATCH) if flags[i]],
            run_time=0.75,
        )

        scan_t = VGroup(*[
            label(str(s), 21, INK if flags[i] else MUTED).move_to([slot_x(i), ys["scan"], 0])
            for i, s in enumerate(scan)
        ])
        lab_scan = row_label("2  count\nprefix sum", "scan")
        self.play(FadeIn(lab_scan), run_time=0.15)
        self.play(LaggedStart(*[TransformFromCopy(flag_t[i], scan_t[i]) for i in range(BATCH)],
                              lag_ratio=0.06), run_time=0.75)

        # Flagged circles write themselves at circleOrder[scan[i]]: contiguous,
        # and because scan is monotone in i, still in draw order.
        order = VGroup()
        pairs = []
        for i in range(BATCH):
            if flags[i]:
                dst = batch[i].copy().move_to([slot_x(scan[i]), ys["order"], 0])
                order.add(dst)
                pairs.append((i, dst))
        slots = VGroup(*[
            Rectangle(width=SLOT * 0.86, height=0.42, stroke_color=LINE, stroke_width=1.5,
                      fill_opacity=0).move_to([slot_x(k), ys["order"], 0])
            for k in range(run)
        ])
        lab_order = row_label("3  pack\ndraw order kept", "order", SLATE)
        self.play(FadeIn(lab_order), FadeIn(slots), run_time=0.20)
        self.play(LaggedStart(*[TransformFromCopy(batch[i], dst) for i, dst in pairs],
                              lag_ratio=0.10), run_time=0.70)

        # Then the same 256 threads switch roles and shade the tile's pixels,
        # blending the list in that order — one writer per pixel, no atomics.
        cap_shade = label("4  blend\none pixel per thread", 17, SLATE)
        cap_shade.next_to(slots, DOWN, buff=0.30).align_to(slots, LEFT)
        back = CurvedArrow(
            cap_shade.get_left() + LEFT * 0.15, tile.get_bottom() + DOWN * 0.06,
            angle=-0.75, color=SLATE, stroke_width=3, tip_length=0.18,
        )
        self.play(Create(back), FadeIn(cap_shade), run_time=0.45)
        self.play(
            tile.animate.set_fill(SLATE, opacity=0.18),
            *[circles[i].animate.set_fill(opacity=min(1.0, circles[i].get_fill_opacity() + 0.30))
              for i in range(BATCH) if flags[i]],
            run_time=0.40,
        )
        self.wait(1.00)
        close(self, keep=[chrome[0]])
