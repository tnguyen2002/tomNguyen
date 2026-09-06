import { useEffect, useState, type ReactNode } from "react";

/**
 * The desktop is drawn at one fixed width and zoomed to fit, rather than
 * reflowing into a separate phone layout. A narrow window shows the same
 * desktop, smaller — same window, same dock, same proportions.
 *
 * Consequence worth knowing: because the canvas is always DESIGN_WIDTH wide,
 * Tailwind's responsive variants inside it are dead. They key off the real
 * viewport, so at 500px they would flip a 1280px-wide canvas into its mobile
 * layout — the opposite of zooming. Everything under here is written for one
 * width only; do not reintroduce `sm:`/`md:`/`lg:` below this component.
 */
const DESIGN_WIDTH = 1280;

function readViewport() {
  if (typeof window === "undefined") {
    return { width: DESIGN_WIDTH, height: 800 };
  }
  return { width: window.innerWidth, height: window.innerHeight };
}

function ScaledDesktop({ children }: { children: ReactNode }) {
  // Read synchronously for the first paint. Measuring in an effect instead
  // shows one frame at full size before the zoom lands, which reads as a flash.
  const [{ width, height }, setViewport] = useState(readViewport);

  useEffect(() => {
    const update = () => setViewport(readViewport());
    update();
    window.addEventListener("resize", update);
    // iOS does not always fire resize on rotation.
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  // Only ever zoom out. Past the design width the desktop stays 1:1 and simply
  // centres, which is what it already did — the window caps at max-w-content
  // and the dock centres itself, so wide screens look exactly as before.
  // `|| 1` guards a zero width, which would make the scale 0 and the canvas
  // infinitely tall.
  const scale = Math.min(1, width / DESIGN_WIDTH) || 1;

  return (
    <div className="fixed inset-0 flex justify-center overflow-hidden">
      {/* The element keeps its unscaled 1280 layout box, so `justify-center`
          centres it and scaling about `top center` leaves the visible result
          centred too. Dividing the height by the scale is what makes the canvas
          still cover the viewport once shrunk — at 0.5 it is twice as tall, so
          the dock stays pinned to the real bottom edge. */}
      <div
        className="shrink-0 origin-top"
        style={{
          width: DESIGN_WIDTH,
          height: height / scale,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default ScaledDesktop;
