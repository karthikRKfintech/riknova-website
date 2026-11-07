import { Component, type ReactNode, Suspense, lazy, useEffect } from "react";
import { useState } from "react";
import {
  getDevPreview,
  getIstDateKey,
  isEligible,
  isWithinFestivalWindow,
  readLastShown,
  writeLastShown,
} from "./diwaliConfig";

// Separate chunk: only fetched when the visitor is eligible.
const loadOverlay = () => import("./DiwaliOverlay");
const DiwaliOverlay = lazy(loadOverlay);

/** Delay after the existing LoadingScreen starts fading (500 ms fade). */
const AFTER_LOADING_MS = 550;

/** Any failure inside the overlay renders nothing; the page is unaffected. */
class SilentBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

interface Decision {
  show: boolean;
  forced: boolean;
  reduced: boolean;
  simulatedNow: number | null;
}

function decide(): Decision {
  try {
    const preview = getDevPreview();
    const reduced = preview.reduced || prefersReducedMotion();
    if (preview.force) {
      return { show: true, forced: true, reduced, simulatedNow: null };
    }
    const now = preview.nowMs ?? Date.now();
    // Date check first: outside the window, storage is never touched.
    return {
      show: isWithinFestivalWindow(now) && isEligible(now, readLastShown()),
      forced: false,
      reduced,
      simulatedNow: preview.nowMs,
    };
  } catch {
    return { show: false, forced: false, reduced: false, simulatedNow: null };
  }
}

/**
 * Homepage-only gate for the Diwali 2026 overlay. Outside the festival window
 * this renders nothing and never requests the animation chunk.
 */
export default function DiwaliGate({ ready }: { ready: boolean }) {
  const [decision] = useState(decide);
  const [phase, setPhase] = useState<"waiting" | "playing" | "done">("waiting");

  // Prefetch the chunk as soon as we know we're eligible, in parallel with
  // the existing loading screen, so the show starts on time.
  useEffect(() => {
    if (decision.show) loadOverlay().catch(() => setPhase("done"));
  }, [decision.show]);

  // Start only after the loading screen has faded and the tab is visible.
  useEffect(() => {
    if (!decision.show || !ready || phase !== "waiting") return;
    let timer = 0;
    const tryStart = () => {
      if (document.visibilityState !== "visible") return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        // Re-check at real start time (e.g. page opened just before midnight).
        const now = decision.simulatedNow ?? Date.now();
        if (decision.forced || isEligible(now, readLastShown())) {
          setPhase("playing");
        } else {
          setPhase("done");
        }
      }, AFTER_LOADING_MS);
    };
    tryStart();
    document.addEventListener("visibilitychange", tryStart);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", tryStart);
    };
  }, [decision, ready, phase]);

  if (!decision.show || phase !== "playing") return null;

  const markShown = () => {
    if (decision.forced) return; // Preview never consumes the daily showing.
    writeLastShown(getIstDateKey(decision.simulatedNow ?? Date.now()));
  };
  const end = () => setPhase("done");

  return (
    <SilentBoundary onError={end}>
      <Suspense fallback={null}>
        <DiwaliOverlay
          reduced={decision.reduced}
          onStart={markShown}
          onDone={end}
        />
      </Suspense>
    </SilentBoundary>
  );
}
