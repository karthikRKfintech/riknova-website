import { motion, useReducedMotion } from "motion/react";

interface ArcSweepProps {
  /** Seconds to wait before the sweep draws. */
  delay?: number;
  className?: string;
}

/**
 * ArcSweep — an ABSTRACT rising sweep used as a headline accent. It borrows
 * the upward, left-to-right directional movement of the RIKNOVA mark WITHOUT
 * reconstructing or tracing it: a single gently curving stroke in the warm
 * signature gradient. It draws once on entrance (honours reduced motion).
 */
export default function ArcSweep({
  delay = 0.8,
  className = "",
}: ArcSweepProps) {
  const reduce = useReducedMotion();
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 22"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute -bottom-[0.24em] left-0 h-[0.42em] w-full overflow-visible ${className}`}
    >
      <defs>
        <linearGradient id="rk-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FF7A18" />
          <stop offset="0.55" stopColor="#F5391C" />
          <stop offset="1" stopColor="#E4145A" />
        </linearGradient>
      </defs>
      {/* rising curve: low-left to high-right, echoing the mark's ascent */}
      <motion.path
        d="M3 17 C 78 17, 150 15, 208 9 S 288 3, 297 3"
        fill="none"
        stroke="url(#rk-sweep)"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: reduce ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </svg>
  );
}
