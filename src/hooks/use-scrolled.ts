// hooks/useScrolled.ts
import { useEffect, useState, useCallback } from "react";

export function useScrolled(threshold: number = 50) {
  const [isScrolled, setIsScrolled] = useState(false);

  // スロットリング関数
  const throttle = useCallback((func: () => void, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastExecTime = 0;

    return () => {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func();
        lastExecTime = currentTime;
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func();
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > threshold);
    };

    // スロットリングを適用（16ms = 60fps）
    const throttledHandleScroll = throttle(handleScroll, 16);

    // 初期状態を設定
    handleScroll();

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [threshold, throttle]);

  return isScrolled;
}
