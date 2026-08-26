import { motion, useReducedMotion } from "motion/react";

/**
 * InfrastructureDiagram — an ABSTRACT analytical diagram (not the logo, not
 * the hero console). It visualises the About copy literally: microfinance
 * institutions, NBFCs and lending platforms connecting into RIKNOVA's
 * financial infrastructure. Thin connectors draw in on reveal; the core node
 * carries the abstract ascending-bars motif. Everything is illustrative and
 * grounded in the section's real content — no fabricated metrics.
 */

const sources = [
  { label: "MICROFINANCE", y: 70, color: "#0FD6A6" },
  { label: "NBFCs", y: 168, color: "#12B9C9" },
  { label: "LENDING PLATFORMS", y: 266, color: "#1C82E8" },
];

export default function InfrastructureDiagram() {
  const reduce = useReducedMotion();
  const CORE = { x: 274, cy: 168 };

  return (
    <div className="relative w-full">
      {/* faint ledger canvas behind the diagram */}
      <div
        aria-hidden="true"
        className="rk-ledger-l-fine pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          maskImage:
            "radial-gradient(110% 100% at 50% 40%, #000 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(110% 100% at 50% 40%, #000 40%, transparent 85%)",
        }}
      />
      <svg
        viewBox="0 0 460 336"
        className="relative w-full"
        role="img"
        aria-label="Diagram: microfinance institutions, NBFCs and lending platforms connect into RIKNOVA's financial infrastructure."
      >
        <title>
          Microfinance, NBFCs and lending platforms connect into RIKNOVA
          financial infrastructure
        </title>

        {/* connectors (draw in) */}
        {sources.map((s, i) => {
          const startX = 196;
          const d = `M${startX} ${s.y} C ${startX + 45} ${s.y}, ${CORE.x - 45} ${CORE.cy}, ${CORE.x} ${CORE.cy}`;
          return (
            <g key={s.label}>
              <motion.path
                d={d}
                fill="none"
                stroke={s.color}
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.75 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.9,
                  delay: reduce ? 0 : 0.3 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              />
              <circle cx={CORE.x} cy={CORE.cy} r="2.5" fill={s.color} />
            </g>
          );
        })}

        {/* source nodes */}
        {sources.map((s, i) => (
          <motion.g
            key={`node-${s.label}`}
            initial={reduce ? false : { opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.5,
              delay: reduce ? 0 : 0.1 + i * 0.12,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            <rect
              x="24"
              y={s.y - 20}
              width="172"
              height="40"
              rx="9"
              fill="var(--rk-surface)"
              stroke="var(--rk-line-l-strong)"
              strokeWidth="1"
            />
            <rect
              x="24"
              y={s.y - 20}
              width="3.5"
              height="40"
              rx="1.75"
              fill={s.color}
            />
            <text
              x="44"
              y={s.y + 4}
              fill="var(--rk-ink-strong)"
              style={{
                font: "600 12px 'Geist Mono', monospace",
                letterSpacing: "0.08em",
              }}
            >
              {s.label}
            </text>
          </motion.g>
        ))}

        {/* core node */}
        <motion.g
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.55,
            delay: reduce ? 0 : 0.35,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          style={{ transformOrigin: "353px 168px" }}
        >
          <rect
            x="274"
            y="108"
            width="162"
            height="120"
            rx="16"
            fill="var(--rk-ink-strong)"
          />
          {/* violet top accent */}
          <rect
            x="298"
            y="108"
            width="114"
            height="3"
            rx="1.5"
            fill="#7C4DFF"
          />
          {/* abstract ascending bars (motif, not the logo) */}
          <g>
            <rect x="298" y="150" width="9" height="18" rx="2" fill="#0FD6A6" />
            <rect x="311" y="142" width="9" height="26" rx="2" fill="#12B9C9" />
            <rect x="324" y="132" width="9" height="36" rx="2" fill="#1C82E8" />
          </g>
          <text
            x="298"
            y="188"
            fill="#ffffff"
            style={{
              font: "700 19px 'Space Grotesk', sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            RIKNOVA
          </text>
          <text
            x="299"
            y="203"
            fill="var(--rk-slate)"
            style={{
              font: "500 8px 'Geist Mono', monospace",
              letterSpacing: "0.12em",
            }}
          >
            FINANCIAL
          </text>
          <text
            x="299"
            y="214"
            fill="var(--rk-slate)"
            style={{
              font: "500 8px 'Geist Mono', monospace",
              letterSpacing: "0.12em",
            }}
          >
            INFRASTRUCTURE
          </text>
        </motion.g>
      </svg>

      {/* annotation strip — pulled from the section copy, not invented */}
      <div className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--rk-ink-mute)]">
        <span
          aria-hidden="true"
          className="h-2.5 w-[3px] rounded-full"
          style={{ background: "var(--rk-grad-leg)" }}
        />
        Tech-company agility · bank-grade trust
      </div>
    </div>
  );
}
