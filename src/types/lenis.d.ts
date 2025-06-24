// types/lenis.d.ts
declare module "@studio-freight/lenis" {
  interface LenisOptions {
    duration?: number;
    easing?: (t: number) => number;
    smooth?: boolean;
    mouseMultiplier?: number;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    infinite?: boolean;
    orientation?: "vertical" | "horizontal";
    gestureOrientation?: "vertical" | "horizontal" | "both";
    normalizeWheel?: boolean;
    wheelMultiplier?: number;
  }

  class Lenis {
    constructor(options?: LenisOptions);
    raf(time: number): void;
    scrollTo(
      target: HTMLElement | string | number,
      options?: { offset?: number; duration?: number }
    ): void;
    destroy(): void;
    on(event: string, callback: Function): void;
    off(event: string, callback: Function): void;
    resize(): void;
    start(): void;
    stop(): void;
  }

  export default Lenis;
}
