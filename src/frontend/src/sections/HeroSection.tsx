import ArcSweep from "@/components/brand/ArcSweep";
import HeroConsole from "@/components/brand/HeroConsole";
import { useBookDemoModal } from "@/hooks/useBookDemoModal";
import {
  ArrowRight,
  ChevronRight,
  Cloud,
  Languages,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const trustItems = [
  { icon: Users, label: "Admin & Collection Agent roles" },
  { icon: Cloud, label: "Cloud-based, backed up regularly" },
  { icon: Languages, label: "Tamil & English" },
];

export default function HeroSection() {
  const { openModal: openBookDemoModal } = useBookDemoModal();
  const reduce = useReducedMotion();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // staged entrance — each element rises in sequence; instant if reduced motion
  const stage = (i: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.6,
            delay: 0.1 + i * 0.09,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[var(--rk-navy)] pb-20 pt-28 sm:pb-24 lg:py-24"
    >
      {/* ledger-grid architecture, masked to a soft vignette (structure, not fog) */}
      <div
        aria-hidden="true"
        className="rk-ledger pointer-events-none absolute inset-0 opacity-60"
        style={{
          maskImage:
            "radial-gradient(115% 90% at 72% 8%, #000 35%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(115% 90% at 72% 8%, #000 35%, transparent 82%)",
        }}
      />
      {/* one restrained brand glow — no orbs, no particles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12%] top-[6%] h-[520px] w-[520px] rounded-full opacity-45"
        style={{
          background:
            "radial-gradient(circle, rgba(28,130,232,.30), transparent 66%)",
          filter: "blur(90px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10%] bottom-[2%] h-[420px] w-[420px] rounded-full opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(106,44,224,.28), transparent 68%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
          {/* ---------- Messaging ---------- */}
          <div className="flex flex-col items-start text-left">
            {/* preserved trust badge */}
            <motion.div
              {...stage(0)}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--rk-hair-2)] bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                {!reduce && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--rk-emerald)] opacity-60" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--rk-emerald)]" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--rk-slate)]">
                Fintech Software · Lending &amp; Finance
              </span>
            </motion.div>

            <motion.h1
              {...stage(1)}
              className="font-display text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-[var(--rk-ink)] sm:text-5xl sm:leading-[1.06] lg:text-[3.75rem] lg:leading-[1.02] lg:tracking-[-0.03em] xl:text-[4.25rem]"
            >
              Software built for the way{" "}
              <span className="relative inline-block font-bold">
                finance businesses
                {/* abstract rising sweep — the single warm signature moment */}
                <ArcSweep delay={0.8} />
              </span>{" "}
              work.
            </motion.h1>

            <motion.p
              {...stage(2)}
              className="mt-7 max-w-xl text-base leading-relaxed text-[var(--rk-slate)] sm:text-lg"
            >
              RIKNOVA builds Finance Pro — practical software for managing
              lending operations, collections, receipts, and reports.
            </motion.p>

            <motion.div
              {...stage(3)}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <button
                type="button"
                onClick={openBookDemoModal}
                className="rk-btn-arc group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-display text-base font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[var(--rk-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rk-navy)]"
                data-ocid="hero.book_demo_button"
              >
                Book a demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("products")}
                className="group inline-flex items-center justify-center gap-1.5 rounded-xl border border-[var(--rk-hair-2)] bg-white/[0.02] px-6 py-3.5 font-display text-base font-semibold text-[var(--rk-ink)] outline-none transition-colors hover:border-[var(--rk-cyan)]/50 hover:bg-white/[0.05] focus-visible:ring-2 focus-visible:ring-[var(--rk-cyan)]"
                data-ocid="hero.explore_products_button"
              >
                Explore Products
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* preserved trust indicators — as a mono metric strip */}
            <motion.div
              {...stage(4)}
              className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-3"
            >
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-2">
                    <span
                      className="h-3.5 w-[3px] rounded-full"
                      style={{ background: "var(--rk-grad-bars)" }}
                    />
                    <Icon className="h-4 w-4 text-[var(--rk-cyan)]" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--rk-slate)]">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* ---------- Financial software console ---------- */}
          <div className="flex flex-col items-center lg:items-end">
            <HeroConsole />
            <p className="mt-3 w-full max-w-[560px] text-right text-[11px] italic text-[var(--rk-slate)]/70">
              *For illustrative purpose only. Actual UI may differ.*
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
