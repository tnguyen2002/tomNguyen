import { useEffect, useRef, useState, type RefObject } from "react";

interface UseInViewOptions {
  /** Stop observing after the first intersection. Use for one-shot reveals. */
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
}

/**
 * Reports whether the referenced element is in the viewport.
 *
 * When IntersectionObserver is unavailable (jsdom, ancient browsers) this fails
 * OPEN — it reports `true` rather than `false`. The primary consumer is a
 * scroll reveal that starts at opacity-0, so failing closed would leave the
 * entire page permanently invisible. The video consumer tolerates a spurious
 * `true` because play() is guarded and its rejection is caught.
 */
export function useInView<T extends Element>(
  options: UseInViewOptions = {}
): [RefObject<T>, boolean] {
  const { once = false, threshold = 0, rootMargin = "0px" } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return [ref, inView];
}
