import { useEffect } from "react";
import { useLocation } from "react-router";
import { getLenisInstance } from "~/lib/lenis";

function scrollViewportToTop() {
  const lenis = getLenisInstance();

  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.resize();
    lenis.scrollTo(0, { immediate: true, force: true });
    return;
  }

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Route changes need an imperative browser scroll reset after the next screen commits.
    const frame = window.requestAnimationFrame(scrollViewportToTop);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);
};

export default useScrollToTop;
