import { accentFor } from "../../lib/accent";
import AppIcon from "./AppIcon";
import type { DockApp } from "../../data/apps";

/**
 * Renders an app's icon: the real extracted artwork when there is one,
 * otherwise a tile drawn by AppIcon.
 *
 * The extracted icons already contain their own squircle, gradients and drop
 * shadow, so they are drawn flat rather than being clipped and re-lit by
 * AppIcon — doing both would round an already-rounded corner and double the
 * shadow.
 *
 * macOS icons sit inset inside a transparent canvas (~83% of it). AppIcon's
 * tiles fill their box edge to edge, so without the scale-up the real icons
 * would render visibly smaller than the drawn ones sitting next to them.
 */
function AppTile({ app, className }: { app: DockApp; className?: string }) {
  if (app.iconSrc) {
    return (
      <span className={className}>
        <img
          src={app.iconSrc}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="h-[120%] w-[120%] max-w-none -translate-x-[10%] -translate-y-[10%]"
        />
      </span>
    );
  }
  return (
    <AppIcon
      glyph={app.glyph}
      accent={accentFor(app.accentIndex)}
      brandColor={app.brandColor}
      glyphColor={app.glyphColor}
      className={className}
    />
  );
}

export default AppTile;
