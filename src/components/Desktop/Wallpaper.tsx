/**
 * Animated wallpaper.
 *
 * Built the way a stock desktop picture is composed rather than as a blur of
 * colour: one directional light source, broad colour fields lit relative to it,
 * a band sweeping underneath for depth, then a vignette to sink the corners and
 * a layer of grain over everything.
 *
 * The colour fields are radial gradients rather than blurred shapes (a radial
 * gradient is already soft, so there is no `filter: blur()` to rasterise), and
 * each is animated with `transform` only — so the whole thing composites on the
 * GPU and never repaints. Animating the gradient stops or `background-position`
 * instead would repaint a full-screen layer every frame, which is exactly the
 * cost we stripped out of the dock.
 *
 * `alternate` easing means every loop rejoins itself; there is no seam.
 */
function Wallpaper() {
  return (
    <div aria-hidden="true" className="wallpaper fixed inset-0 -z-10">
      <div className="wallpaper-field wallpaper-field-1" />
      <div className="wallpaper-field wallpaper-field-2" />
      <div className="wallpaper-field wallpaper-field-3" />
      <div className="wallpaper-ribbon" />
      <div className="wallpaper-vignette" />
      {/* Last, so it dithers everything above it. */}
      <div className="wallpaper-grain" />
    </div>
  );
}

export default Wallpaper;
