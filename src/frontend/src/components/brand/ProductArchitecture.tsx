import { motion, useReducedMotion } from "motion/react";

/**
 * ProductArchitecture — a restrained, ABSTRACT product schematic for the
 * Finance Pro flagship. Deliberately NOT another populated analytics
 * dashboard (the Hero already owns that) and NOT a fabricated screenshot:
 * no data, no metrics, no charts, no transactions, no invented feature
 * labels. It is a labelled architecture graphic — a core platform composed
 * of connected modules, drawn in the brand's geometric language — carrying
 * an "illustrative" caption. It reads as "structured financial software"
 * through composition, not through faked UI.
 */

const modules = [
  { x: 34, y: 40, accent: "#0FD6A6" }, // top-left
  { x: 326, y: 40, accent: "#12B9C9" }, // top-right
  { x: 34, y: 214, accent: "#1C82E8" }, // bottom-left
  { x: 326, y: 214, accent: "#7C4DFF" }, // bottom-right
];

// connector endpoints: module inner edge → nearest core corner
const connectors = [
  { d: "M154 72 C 168 72, 168 120, 182 122", c: "#0FD6A6" },
  { d: "M326 72 C 312 72, 312 120, 298 122", c: "#12B9C9" },
  { d: "M154 246 C 168 246, 168 198, 182 198", c: "#1C82E8" },
  { d: "M326 246 C 312 246, 312 198, 298 198", c: "#7C4DFF" },
];

export default function ProductArchitecture() {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full max-w-[560px]">
      {/* single restrained brand glow, not an orb field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(55% 55% at 65% 35%, rgba(28,130,232,.24), transparent 70%), radial-gradient(45% 45% at 25% 85%, rgba(124,77,255,.20), transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* violet-leg frame */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl p-[1.5px]"
        style={{ background: "var(--rk-grad-leg)" }}
      >
        <div
          className="relative overflow-hidden rounded-2xl bg-[var(--rk-navy-2)]"
          style={{ boxShadow: "var(--rk-shadow-panel)" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(147,179,224,.35), transparent)",
            }}
          />

          {/* label bar — identifies the graphic as an architecture view */}
          <div className="flex items-center justify-between border-b border-[var(--rk-hair)] px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-6 items-end gap-[3px]"
                title="RIKNOVA ascending motif"
              >
                <span
                  className="w-[3px] rounded-sm"
                  style={{ height: 9, background: "#0FD6A6" }}
                />
                <span
                  className="w-[3px] rounded-sm"
                  style={{ height: 14, background: "#12B9C9" }}
                />
                <span
                  className="w-[3px] rounded-sm"
                  style={{ height: 19, background: "#1C82E8" }}
                />
              </span>
              <span className="font-display text-sm font-semibold text-[var(--rk-ink)]">
                Finance Pro
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--rk-slate)]">
              Platform Architecture
            </span>
          </div>

          {/* schematic */}
          <div className="relative p-5 sm:p-6">
            <svg
              viewBox="0 0 480 318"
              className="w-full"
              role="img"
              aria-label="Abstract schematic: a Finance Pro core platform composed of four connected modules."
            >
              <title>
                Finance Pro platform core composed of connected modules
                (illustrative)
              </title>

              {/* ledger grid */}
              <defs>
                <pattern
                  id="pa-grid"
                  width="26"
                  height="26"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M26 0H0V26"
                    fill="none"
                    stroke="rgba(147,179,224,.10)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="480" height="318" fill="url(#pa-grid)" />

              {/* connectors (draw in) */}
              {connectors.map((cn, i) => (
                <motion.path
                  key={cn.d}
                  d={cn.d}
                  fill="none"
                  stroke={cn.c}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.7 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    delay: reduce ? 0 : 0.5 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}

              {/* module planes */}
              {modules.map((m, i) => (
                <motion.g
                  key={`${m.x}-${m.y}`}
                  initial={reduce ? false : { opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.5,
                    delay: reduce ? 0 : 0.15 + i * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformOrigin: `${m.x + 60}px ${m.y + 32}px` }}
                >
                  <rect
                    x={m.x}
                    y={m.y}
                    width="120"
                    height="64"
                    rx="11"
                    fill="var(--rk-navy-3)"
                    stroke="var(--rk-hair)"
                    strokeWidth="1"
                  />
                  <rect
                    x={m.x + 16}
                    y={m.y + 14}
                    width="30"
                    height="3"
                    rx="1.5"
                    fill={m.accent}
                  />
                  {/* abstract module glyph — a small rounded node, no data */}
                  <circle
                    cx={m.x + 20}
                    cy={m.y + 42}
                    r="6"
                    fill="none"
                    stroke={m.accent}
                    strokeWidth="1.6"
                    opacity="0.8"
                  />
                  <rect
                    x={m.x + 36}
                    y={m.y + 38}
                    width="60"
                    height="3"
                    rx="1.5"
                    fill="rgba(147,179,224,.28)"
                  />
                  <rect
                    x={m.x + 36}
                    y={m.y + 46}
                    width="40"
                    height="3"
                    rx="1.5"
                    fill="rgba(147,179,224,.18)"
                  />
                </motion.g>
              ))}

              {/* core platform node */}
              <motion.g
                initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.55,
                  delay: reduce ? 0 : 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: "240px 160px" }}
              >
                <rect
                  x="180"
                  y="110"
                  width="120"
                  height="100"
                  rx="14"
                  fill="var(--rk-navy)"
                  stroke="rgba(124,77,255,.5)"
                  strokeWidth="1.25"
                />
                <rect
                  x="204"
                  y="110"
                  width="72"
                  height="3"
                  rx="1.5"
                  fill="#7C4DFF"
                />
                {/* ascending-bars motif (abstract, not the logo) */}
                <rect
                  x="216"
                  y="176"
                  width="10"
                  height="16"
                  rx="2"
                  fill="#0FD6A6"
                />
                <rect
                  x="230"
                  y="168"
                  width="10"
                  height="24"
                  rx="2"
                  fill="#12B9C9"
                />
                <rect
                  x="244"
                  y="158"
                  width="10"
                  height="34"
                  rx="2"
                  fill="#1C82E8"
                />
                <rect
                  x="204"
                  y="126"
                  width="34"
                  height="3"
                  rx="1.5"
                  fill="rgba(147,179,224,.34)"
                />
              </motion.g>
            </svg>
          </div>
        </div>
      </motion.div>

      <p className="mt-3 text-right text-[11px] italic text-[var(--rk-slate)]/70">
        *Illustrative architecture. Not an actual product screen.*
      </p>
    </div>
  );
}
