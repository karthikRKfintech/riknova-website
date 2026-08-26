import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import CountUp from "./CountUp";

/**
 * HeroConsole — a conceptual RIKNOVA financial-operations console.
 *
 * This is an ABSTRACT, illustrative composition derived from real financial
 * software patterns (loan portfolio, disbursement trend, collections ledger).
 * It is NOT a screenshot and NOT the RIKNOVA logo. Its purpose is to make the
 * hero instantly read as "RIKNOVA builds serious financial software".
 * The hero carries the "illustrative purpose only" disclaimer.
 */

const bars = [38, 52, 46, 63, 58, 74, 69, 88];
// smooth-ish upward line across a 0..320 x / 0..120 y viewbox
const linePath =
  "M4 96 L44 84 L84 90 L124 66 L164 72 L204 48 L244 40 L284 26 L316 20";
const areaPath = `${linePath} L316 120 L4 120 Z`;

const ledger = [
  {
    id: "#RK-4821",
    label: "Disbursement · Chennai",
    amt: "+₹45,000",
    ok: true,
  },
  {
    id: "#RK-4820",
    label: "Collection · KRS Finance",
    amt: "+₹12,450",
    ok: true,
  },
  { id: "#RK-4817", label: "EMI due · Coimbatore", amt: "₹8,900", ok: false },
];

export default function HeroConsole() {
  const reduce = useReducedMotion();

  // With reduced motion, elements render in their final state immediately.
  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <div className="relative w-full max-w-[560px]">
      {/* soft, single restrained glow behind the console (not an orb) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(60% 55% at 70% 30%, rgba(28,130,232,.28), transparent 70%), radial-gradient(45% 45% at 20% 90%, rgba(106,44,224,.22), transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* violet-leg shear frame accent */}
      <motion.div
        {...rise(0.15)}
        className="relative rounded-2xl p-[1.5px]"
        style={{ background: "var(--rk-grad-leg)" }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-[var(--rk-navy-2)]">
          {/* ledger grid texture */}
          <div
            aria-hidden="true"
            className="rk-ledger-fine pointer-events-none absolute inset-0 opacity-40"
            style={{
              maskImage:
                "radial-gradient(120% 120% at 80% 0%, #000 30%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(120% 120% at 80% 0%, #000 30%, transparent 80%)",
            }}
          />

          <div className="relative p-5 sm:p-6">
            {/* header */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ background: "var(--rk-grad-bars)" }}
                >
                  <ShieldCheck className="h-4 w-4 text-[#04202a]" />
                </span>
                <div className="leading-tight">
                  <div className="font-display text-sm font-semibold text-[var(--rk-ink)]">
                    Finance Pro
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--rk-slate)]">
                    Operations Console
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  {!reduce && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--rk-emerald)] opacity-60" />
                  )}
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--rk-emerald)]" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--rk-slate)]">
                  Live
                </span>
              </div>
            </div>

            {/* KPI tiles */}
            <div className="mb-5 grid grid-cols-3 gap-2.5">
              {[
                {
                  label: "Portfolio",
                  node: (
                    <CountUp
                      value={2.4}
                      decimals={1}
                      prefix="₹"
                      suffix="M"
                      delay={350}
                    />
                  ),
                  accent: "var(--rk-cyan)",
                  trend: "+12.5%",
                },
                {
                  label: "Active Loans",
                  node: <CountUp value={1847} separator delay={450} />,
                  accent: "var(--rk-emerald)",
                  trend: "+8.2%",
                },
                {
                  label: "Collection",
                  node: (
                    <CountUp value={98.2} decimals={1} suffix="%" delay={550} />
                  ),
                  accent: "var(--rk-blue)",
                  trend: "Stable",
                },
              ].map((k) => (
                <div
                  key={k.label}
                  className="rounded-xl border border-[var(--rk-hair)] bg-[var(--rk-navy-3)]/60 p-3"
                >
                  <div className="mb-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--rk-slate)]">
                    {k.label}
                  </div>
                  <div
                    className="font-display text-lg font-bold leading-none text-[var(--rk-ink)]"
                    style={{ color: k.accent }}
                  >
                    {k.node}
                  </div>
                  <div className="mt-1.5 flex items-center gap-0.5 text-[10px] text-[var(--rk-emerald)]">
                    <ArrowUpRight className="h-3 w-3" />
                    {k.trend}
                  </div>
                </div>
              ))}
            </div>

            {/* chart: ascending bars behind a drawn line + area */}
            <div className="mb-4 rounded-xl border border-[var(--rk-hair)] bg-[var(--rk-navy)]/50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--rk-slate)]">
                  Disbursements · 8w
                </span>
                <span className="font-display text-xs font-semibold text-[var(--rk-ink)]">
                  ₹18.6M
                </span>
              </div>
              <div className="relative h-28">
                {/* bars */}
                <div className="absolute inset-0 flex items-end gap-1.5">
                  {bars.map((h, i) => (
                    <motion.div
                      key={`bar-${h}`}
                      className="flex-1 rounded-[3px]"
                      style={{
                        background: "var(--rk-grad-bars)",
                        opacity: 0.28,
                        transformOrigin: "bottom",
                      }}
                      initial={reduce ? false : { scaleY: 0 }}
                      animate={{ scaleY: 1, height: `${h}%` }}
                      transition={{
                        duration: 0.5,
                        delay: reduce ? 0 : 0.5 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  ))}
                </div>
                {/* line + area */}
                <svg
                  viewBox="0 0 320 120"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="rk-line" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#0FD6A6" />
                      <stop offset="0.5" stopColor="#12B9C9" />
                      <stop offset="1" stopColor="#1C82E8" />
                    </linearGradient>
                    <linearGradient id="rk-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#1C82E8" stopOpacity="0.28" />
                      <stop offset="1" stopColor="#1C82E8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={areaPath}
                    fill="url(#rk-area)"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: reduce ? 0 : 1.1 }}
                  />
                  <motion.path
                    d={linePath}
                    fill="none"
                    stroke="url(#rk-line)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 1.1,
                      delay: reduce ? 0 : 0.6,
                      ease: "easeInOut",
                    }}
                  />
                </svg>
              </div>
            </div>

            {/* collections ledger — rows arrive in sequence */}
            <div className="space-y-1.5">
              {ledger.map((row, i) => (
                <motion.div
                  key={row.id}
                  {...(reduce
                    ? { initial: false as const }
                    : {
                        initial: { opacity: 0, x: 12 },
                        animate: { opacity: 1, x: 0 },
                        transition: {
                          duration: 0.4,
                          delay: 1.2 + i * 0.12,
                          ease: [0.22, 1, 0.36, 1] as const,
                        },
                      })}
                  className="flex items-center justify-between rounded-lg border border-[var(--rk-hair)] bg-[var(--rk-navy-3)]/40 px-3 py-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="shrink-0 whitespace-nowrap font-mono text-[10px] text-[var(--rk-slate)]">
                      {row.id}
                    </span>
                    <span className="truncate text-xs text-[var(--rk-ink)]/80">
                      {row.label}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2.5 pl-2">
                    <span
                      className="rounded-full px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider"
                      style={{
                        color: row.ok ? "#04202a" : "#3a0e08",
                        background: row.ok
                          ? "var(--rk-emerald)"
                          : "var(--rk-orange)",
                      }}
                    >
                      {row.ok ? "Paid" : "Due"}
                    </span>
                    <span className="rk-tnum whitespace-nowrap text-xs font-semibold text-[var(--rk-ink)]">
                      {row.amt}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
