import { useEffect } from "react";
import { useLocation } from "react-router";
import { getLenisInstance } from "../lib/lenis";

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname]);
};

export default useScrollToTop;
