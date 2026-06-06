import { useEffect } from "react";

interface IntroScreenProps {
  onComplete: () => void;
}

declare global {
  interface Window {
    __hdReactMounted?: () => void;
    __hdReactReady?: () => void;
  }
}

/**
 * Zero-render bridge component.
 *
 * The visible intro overlay lives in index.html as pure HTML/CSS/JS so it
 * appears instantly before the React bundle loads.
 *
 * This component does three things on mount:
 *  1. Signals to the HTML intro that React bundle has loaded via window.__hdReactMounted().
 *  2. Preloads the large homepage images (phone screenshots) and signals
 *     readiness via window.__hdReactReady() once they have fully loaded.
 *  3. Watches for the HTML overlay to be removed from the DOM, then calls
 *     onComplete() so the React app knows to display itself.
 */
export default function IntroScreen({ onComplete }: IntroScreenProps) {
  useEffect(() => {
    const introEl = document.getElementById("hd-intro");

    // Overlay already gone (bundle was very slow or already seen in session)
    if (!introEl) {
      document.body.classList.remove("hd-loading");
      onComplete();
      return;
    }

    // Watch for the overlay to be removed from the DOM
    const observer = new MutationObserver(() => {
      if (!document.getElementById("hd-intro")) {
        observer.disconnect();
        onComplete();
      }
    });
    observer.observe(document.body, { childList: true, subtree: false });

    // 1. Signal that React JS is mounted and is now loading images
    if (typeof window.__hdReactMounted === "function") {
      window.__hdReactMounted();
    }

    // 2. Preload critical above-the-fold homepage images based on the active theme
    const isDark = document.documentElement.classList.contains("dark");
    const imagesToLoad = isDark
      ? ["/customer-app-dark.png", "/manager-app-dark.png"]
      : ["/customer-app-light.png", "/manager-app-light.png"];

    let loadedCount = 0;
    let signalled = false;

    const signalReady = () => {
      if (signalled) return;
      signalled = true;
      if (typeof window.__hdReactReady === "function") {
        window.__hdReactReady();
      }
    };

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === imagesToLoad.length) {
        signalReady();
      }
    };

    // Safety fallback: if images take too long to load on very slow network,
    // signal ready anyway at 6 seconds so the user isn't stuck forever.
    const fallbackTimer = setTimeout(signalReady, 6000);

    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.complete) {
        checkAllLoaded();
      } else {
        img.onload = checkAllLoaded;
        img.onerror = checkAllLoaded; // don't get stuck on broken image links
      }
    });

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
