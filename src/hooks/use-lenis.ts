import { useRef, useEffect, useCallback } from "react";
import type Lenis from "@studio-freight/lenis";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initLenis = async () => {
      try {
        // 動的importを一度だけ実行
        const LenisClass = (await import("@studio-freight/lenis")).default;

        if (!isMounted) return;

        const lenis = new LenisClass({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });

        lenisRef.current = lenis;

        // RAF関数を最適化
        function raf(time: number) {
          if (lenisRef.current && isMounted) {
            lenisRef.current.raf(time);
            rafId.current = requestAnimationFrame(raf);
          }
        }

        rafId.current = requestAnimationFrame(raf);
      } catch (error) {
        console.error("Failed to initialize Lenis:", error);
      }
    };

    initLenis();

    return () => {
      isMounted = false;

      // RAFをキャンセル
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      // Lenisを破棄
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: 0 });
    }
  }, []);

  return { scrollToSection };
}
