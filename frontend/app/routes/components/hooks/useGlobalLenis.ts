import { useEffect, useSyncExternalStore } from "react";
import Lenis from "lenis";
import { getLenisInstance, setLenisInstance } from "~/lib/lenis";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function destroyLenisInstance(instance: Lenis | null) {
  if (!instance) {
    return;
  }

  if (getLenisInstance() === instance) {
    setLenisInstance(null);
  }

  instance.destroy();
}

function subscribeToReducedMotionPreference(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const reducedMotionMedia = window.matchMedia(REDUCED_MOTION_QUERY);
  reducedMotionMedia.addEventListener("change", onStoreChange);

  return () => {
    reducedMotionMedia.removeEventListener("change", onStoreChange);
  };
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotionPreference,
    getReducedMotionSnapshot,
    () => false,
  );
}

export function useGlobalLenis() {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (prefersReducedMotion) {
      destroyLenisInstance(getLenisInstance());
      return;
    }

    // Lenis is an imperative scrolling engine, so its lifecycle must stay in sync with the browser.
    const activeLenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      syncTouch: false,
      orientation: "vertical",
      gestureOrientation: "vertical",
      overscroll: true,
      autoResize: true,
      anchors: true,
      stopInertiaOnNavigate: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      prevent: (node) =>
        Boolean(
          node.closest(
            "[data-lenis-prevent], [data-scroll-lock], dialog, [role='dialog']",
          ),
        ),
    });

    destroyLenisInstance(getLenisInstance());
    setLenisInstance(activeLenis);

    return () => {
      destroyLenisInstance(activeLenis);
    };
  }, [prefersReducedMotion]);
}
