import { useEffect } from "react";
import { useLocation } from "react-router";
import { getLenisInstance } from "~/lib/lenis";

function getFixedNavbarOffset() {
  const navbar = document.querySelector("[data-site-nav]");

  if (!(navbar instanceof HTMLElement)) {
    return 0;
  }

  return -(navbar.getBoundingClientRect().height + 16);
}

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

function scrollToHashTarget(hash: string) {
  const targetId = decodeURIComponent(hash.replace(/^#/, ""));

  if (!targetId) {
    return true;
  }

  const target = document.getElementById(targetId);

  if (!target) {
    return false;
  }

  const offset = getFixedNavbarOffset();
  const lenis = getLenisInstance();

  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.resize();
    lenis.scrollTo(target, { offset, force: true });
    return true;
  }

  const top = window.scrollY + target.getBoundingClientRect().top + offset;
  window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "smooth" });
  return true;
}

const useScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let timeout: number | null = null;

    const scrollAfterNavigation = (attempt = 0) => {
      if (!hash) {
        scrollViewportToTop();
        return;
      }

      if (scrollToHashTarget(hash) || attempt >= 10) {
        return;
      }

      timeout = window.setTimeout(() => {
        scrollAfterNavigation(attempt + 1);
      }, 50);
    };

    // Route changes need an imperative scroll after the next screen commits.
    const frame = window.requestAnimationFrame(() => {
      scrollAfterNavigation();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (timeout !== null) {
        window.clearTimeout(timeout);
      }
    };
  }, [pathname, hash]);
};

export default useScrollToTop;
