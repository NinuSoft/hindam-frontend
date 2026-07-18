import { useEffect } from "react";

declare global {
  interface Window {
    __hdReactMounted?: () => void;
    __hdReactReady?: () => void;
  }
}

/**
 * Immediately signals the HTML intro overlay (index.html) to dismiss.
 * Use on routes with no heavy above-the-fold assets to preload — see
 * IntroScreen for the homepage's gated version that waits on image loads.
 */
export default function DismissIntro() {
  useEffect(() => {
    window.__hdReactMounted?.();
    window.__hdReactReady?.();
  }, []);

  return null;
}
