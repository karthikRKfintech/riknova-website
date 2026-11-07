import { useCallback, useEffect, useRef, useState } from "react";
import { type FireworksHandle, startFireworks } from "./fireworksEngine";

export interface DiwaliOverlayProps {
  /** Static greeting only (prefers-reduced-motion or canvas failure). */
  reduced: boolean;
  /** Called once when the animation actually begins (used to mark shown). */
  onStart: () => void;
  /** Called once when the overlay should unmount. */
  onDone: () => void;
}

/** Milliseconds. Full show ≈ 6 s; hard cap 7 s. */
const TIMELINE = {
  full: { greetIn: 3000, greetOut: 5000, done: 5900 },
  reduced: { greetIn: 40, greetOut: 3800, done: 4600 },
  hardCap: 7000,
} as const;

type Tone = "dark" | "light";

/** Greeting styling tuned for the section behind it (dark navy or pale). */
const TONES = {
  dark: {
    halo: "rgba(8,13,26,0.82) 0%, rgba(8,13,26,0.66) 45%, rgba(8,13,26,0) 100%",
    gold: "linear-gradient(180deg, #fff3d6 0%, #f7d488 38%, #e2a63e 72%, #b9791f 100%)",
    glow: "drop-shadow(0 0 14px rgba(245,190,90,0.45)) drop-shadow(0 1px 1px rgba(8,13,26,0.6))",
    sub: "#f3e3bf",
    subShadow: "0 0 12px rgba(245,190,90,0.35), 0 1px 2px rgba(8,13,26,0.8)",
  },
  light: {
    halo: "rgba(255,251,242,0.92) 0%, rgba(255,248,232,0.7) 45%, rgba(255,248,232,0) 100%",
    gold: "linear-gradient(180deg, #e0a93f 0%, #c48a26 45%, #9a6512 80%, #7a4c0c 100%)",
    glow: "drop-shadow(0 0 12px rgba(255,214,140,0.7)) drop-shadow(0 1px 1px rgba(122,76,12,0.25))",
    sub: "#6e4a10",
    subShadow: "0 0 10px rgba(255,255,255,0.9)",
  },
} as const;

function luminance(rgb: string): number | null {
  const m = rgb.match(/[\d.]+/g);
  if (!m || m.length < 3) return null;
  if (m.length >= 4 && Number(m[3]) < 0.5) return null; // mostly transparent
  const [r, g, b] = m.slice(0, 3).map(Number);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/** Inspects the page behind the greeting's position (read-only). */
function detectTone(): Tone {
  try {
    const stack = document.elementsFromPoint(
      window.innerWidth / 2,
      window.innerHeight / 2,
    );
    for (const start of stack) {
      if (start.closest("[data-diwali-overlay]")) continue;
      for (let el: Element | null = start; el; el = el.parentElement) {
        const l = luminance(getComputedStyle(el).backgroundColor);
        if (l !== null) return l > 0.6 ? "light" : "dark";
      }
      break;
    }
  } catch {
    // Fall through to the default.
  }
  return "dark";
}

/**
 * Transparent, viewport-sized festive overlay. Purely decorative and
 * non-blocking: everything has pointer-events: none except the Skip button.
 */
export default function DiwaliOverlay({
  reduced,
  onStart,
  onDone,
}: DiwaliOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [staticOnly, setStaticOnly] = useState(reduced);
  const [tone, setTone] = useState<Tone>("dark");
  const doneRef = useRef(false);
  const theme = TONES[tone];

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  }, [onDone]);

  // Mount-once by design: the show runs exactly once per mount.
  // biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount
  useEffect(() => {
    let engine: FireworksHandle | null = null;
    let useStatic = reduced;

    if (!useStatic && canvasRef.current) {
      try {
        engine = startFireworks(canvasRef.current);
      } catch {
        // Canvas unavailable — degrade to the static greeting.
        useStatic = true;
        setStaticOnly(true);
      }
    }

    onStart();

    const t = useStatic ? TIMELINE.reduced : TIMELINE.full;
    const timers = [
      window.setTimeout(() => {
        setTone(detectTone());
        setGreetingVisible(true);
      }, t.greetIn),
      window.setTimeout(() => setGreetingVisible(false), t.greetOut),
      window.setTimeout(finish, t.done),
      window.setTimeout(finish, TIMELINE.hardCap),
    ];

    const onVisibility = () => {
      if (document.visibilityState === "hidden") finish();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("keydown", onKey);

    return () => {
      for (const id of timers) window.clearTimeout(id);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("keydown", onKey);
      engine?.destroy();
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
      data-diwali-overlay=""
    >
      {!staticOnly && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 h-full w-full"
          />
        </div>
      )}

      {/* Soft, feathered local halo (tint + light blur) behind the greeting
          keeps it legible over busy, light or dark sections without
          darkening the rest of the page. Sibling of the text so the
          backdrop blur is not isolated by the text's opacity transition. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(62vh,380px)] w-[min(118vw,820px)] -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: greetingVisible ? 1 : 0,
          transition: "opacity 700ms cubic-bezier(0.4,0,0.2,1)",
          backgroundImage: `radial-gradient(ellipse closest-side at center, ${theme.halo})`,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage:
            "radial-gradient(ellipse closest-side at center, #000 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse closest-side at center, #000 55%, transparent 100%)",
        }}
      />

      <div
        aria-live="polite"
        className="pointer-events-none absolute left-1/2 top-[50%] flex w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center px-6 py-8 text-center"
        style={{
          opacity: greetingVisible ? 1 : 0,
          transform: `translate(-50%, ${greetingVisible ? "-50%" : "-46%"})`,
          transition:
            "opacity 700ms cubic-bezier(0.4,0,0.2,1), transform 900ms cubic-bezier(0.2,0.8,0.2,1)",
        }}
      >
        <img
          src="/assets/images/logo/riknova-symbol-dark.png"
          alt=""
          aria-hidden="true"
          width={44}
          height={44}
          className="mb-3 h-10 w-10 sm:h-11 sm:w-11"
          style={{ mixBlendMode: "lighten" }}
        />
        <p
          className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          style={{
            backgroundImage: theme.gold,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: theme.glow,
          }}
        >
          Happy Diwali{" "}
          <span aria-hidden="true" style={{ color: "#f7d488" }}>
            ✨
          </span>
        </p>
        <p
          className="mt-3 font-body text-sm font-medium tracking-[0.08em] sm:text-base"
          style={{ color: theme.sub, textShadow: theme.subShadow }}
        >
          Wishing You Prosperity &amp; New Beginnings
        </p>
        <p className="sr-only">From RIKNOVA Fintech Solutions</p>
      </div>

      <button
        type="button"
        onClick={finish}
        aria-label="Skip Diwali animation"
        className="pointer-events-auto absolute bottom-5 right-5 rounded-full border border-[rgba(247,212,136,0.35)] bg-[rgba(8,13,26,0.55)] px-4 py-1.5 font-body text-xs font-medium tracking-[0.12em] text-[#f3e3bf] uppercase outline-none backdrop-blur-sm transition-colors hover:bg-[rgba(8,13,26,0.75)] focus-visible:ring-2 focus-visible:ring-[#f7d488] sm:bottom-6 sm:right-6"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        Skip
      </button>
    </div>
  );
}
