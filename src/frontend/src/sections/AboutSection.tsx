import InfrastructureDiagram from "@/components/brand/InfrastructureDiagram";
import SectionEyebrow from "@/components/brand/SectionEyebrow";
import { Target, TrendingUp, Users, Wrench } from "lucide-react";
import { motion } from "motion/react";

const principles = [
  {
    icon: Wrench,
    title: "Practical",
    description: "Built for real lending workflows.",
  },
  {
    icon: Target,
    title: "Focused",
    description: "Software for lending and finance businesses.",
  },
  {
    icon: Users,
    title: "Access",
    description: "Admin and Collection Agent roles.",
  },
  {
    icon: TrendingUp,
    title: "Evolving",
    description: "Built around the changing needs of finance businesses.",
  },
];

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-[color:var(--rk-line-l)] bg-[color:var(--rk-canvas-2)] py-24 md:py-32"
    >
      {/* faint ledger structure, anchored right */}
      <div
        aria-hidden="true"
        className="rk-ledger-l pointer-events-none absolute inset-y-0 right-0 w-2/3 opacity-60"
        style={{
          maskImage:
            "radial-gradient(80% 90% at 100% 30%, #000, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(80% 90% at 100% 30%, #000, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="max-w-4xl"
        >
          <SectionEyebrow>About RIKNOVA</SectionEyebrow>
          <h2 className="mt-5 font-display text-3xl font-medium leading-[1.08] tracking-[-0.02em] text-[color:var(--rk-ink-strong)] sm:text-4xl lg:text-5xl lg:leading-[1.05]">
            Software built around{" "}
            <span className="font-bold">real lending work</span>
          </h2>
        </motion.div>

        {/* Story + anchored diagram */}
        <div className="mt-12 grid items-start gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.14fr)] lg:gap-16">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-[color:var(--rk-ink-body)]">
              RIKNOVA is a fintech software company focused on lending and
              finance. We build practical tools around the real, everyday work
              of managing loans, collections, payments, and business records.
            </p>
            <p className="text-lg leading-relaxed text-[color:var(--rk-ink-body)]">
              Our flagship product, Finance Pro, brings these operations
              together in software designed for microfinance institutions,
              NBFCs, finance companies, and lending businesses.
            </p>
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="w-full"
          >
            <InfrastructureDiagram />
          </motion.div>
        </div>

        {/* Vision — a distinct pulled callout, not another paragraph or card */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-16 max-w-4xl border-l-2 pl-6 md:mt-20 md:pl-8"
          style={{ borderImage: "var(--rk-grad-leg) 1" }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--rk-violet-ink)]">
            Our Vision
          </span>
          <p className="mt-3 font-display text-xl font-medium leading-snug text-[color:var(--rk-ink-strong)] sm:text-2xl">
            To build financial software that lending businesses can rely on as
            their operations grow.
          </p>
        </motion.div>

        {/* Metric band — horizontal, rule-separated, not a card grid */}
        <div className="mt-16 grid grid-cols-2 gap-y-9 border-t-2 border-[color:var(--rk-ink-strong)]/[0.12] pt-10 md:mt-20 md:grid-cols-4 md:gap-y-0 md:pt-12">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className={`px-1 md:px-7 lg:px-8 ${i > 0 ? "md:border-l md:border-[color:var(--rk-line-l-strong)]" : ""}`}
                data-ocid={`about.metric.${i + 1}`}
              >
                <Icon
                  className="mb-3 h-5 w-5 text-[color:var(--rk-cyan-ink)] md:mb-4 md:h-[26px] md:w-[26px]"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div className="font-display text-2xl font-bold leading-none tracking-tight text-[color:var(--rk-ink-strong)] sm:text-3xl lg:text-[2.15rem]">
                  {p.title}
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-[color:var(--rk-ink-mute)]">
                  {p.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
