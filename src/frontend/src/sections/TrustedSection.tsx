import DarkToLightTransition from "@/components/brand/DarkToLightTransition";
import SectionEyebrow from "@/components/brand/SectionEyebrow";
import {
  Brain,
  Building2,
  Cloud,
  Cpu,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const capabilities = [
  { icon: Cpu, label: "Technology", color: "var(--rk-blue-ink)" },
  { icon: Shield, label: "Security", color: "var(--rk-cyan-ink)" },
  { icon: Cloud, label: "Cloud", color: "var(--rk-emerald-ink)" },
  { icon: Zap, label: "Performance", color: "var(--rk-blue-ink)" },
  { icon: TrendingUp, label: "Scalability", color: "var(--rk-cyan-ink)" },
  { icon: Brain, label: "AI", color: "var(--rk-emerald-ink)" },
  { icon: Building2, label: "Enterprise", color: "var(--rk-blue-ink)" },
];

const dotColors = ["#0FD6A6", "#12B9C9", "#1C82E8"];

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function TrustedSection() {
  return (
    <section
      id="trusted"
      className="relative overflow-hidden bg-[var(--rk-canvas)] pb-24 pt-40 sm:pt-48 md:pb-28"
    >
      <DarkToLightTransition />

      {/* very faint full-section ledger structure */}
      <div
        aria-hidden="true"
        className="rk-ledger-l pointer-events-none absolute inset-0 opacity-70"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, #000 30%, #000)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 30%, #000)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial header — asymmetric statement / context */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:col-span-7"
          >
            <SectionEyebrow>Trusted by Industry Leaders</SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl font-medium leading-[1.04] tracking-[-0.02em] text-[color:var(--rk-ink-strong)] sm:text-5xl lg:text-[3.4rem]">
              Built for <span className="font-bold">Enterprise Scale</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="flex items-end lg:col-span-5"
          >
            <div className="border-l-2 border-[color:var(--rk-line-l-strong)] pl-5">
              <p className="text-base leading-relaxed text-[color:var(--rk-ink-body)] md:text-lg">
                Powering the infrastructure behind the world&apos;s most
                demanding organizations with cutting-edge technology and
                uncompromising security.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Capability register — structured rows with leader rules, not cards */}
        <div className="mt-16 md:mt-20">
          <div className="mb-2 flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--rk-ink-mute)]">
              Platform Capabilities
            </span>
            <span className="h-px flex-1 bg-[color:var(--rk-line-l)]" />
            <span className="font-mono text-[11px] tracking-[0.14em] text-[color:var(--rk-ink-mute)]">
              07
            </span>
          </div>

          <div className="grid gap-x-16 md:grid-cols-2">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.label}
                  custom={i}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="group flex items-center gap-4 border-t border-[color:var(--rk-line-l)] py-5"
                  data-ocid={`trusted.item.${i + 1}`}
                >
                  <Icon
                    className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
                    style={{ color: cap.color }}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <span className="font-display text-lg font-semibold text-[color:var(--rk-ink-strong)]">
                    {cap.label}
                  </span>
                  <span className="rk-leader h-px flex-1 opacity-50" />
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: dotColors[i % dotColors.length] }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Trust statement band */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-16 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t-2 border-[color:var(--rk-ink-strong)]/10 pt-6"
        >
          <span className="rk-tnum font-display text-3xl font-bold text-[color:var(--rk-ink-strong)]">
            500+
          </span>
          <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-[color:var(--rk-ink-mute)]">
            enterprise teams worldwide
          </span>
        </motion.div>
      </div>
    </section>
  );
}
