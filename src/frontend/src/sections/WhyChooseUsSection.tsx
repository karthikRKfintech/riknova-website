import DarkToLightTransition from "@/components/brand/DarkToLightTransition";
import SectionEyebrow from "@/components/brand/SectionEyebrow";
import { motion } from "motion/react";

/**
 * WhyChooseUsSection — Phase 2E "decision / positioning" layer.
 *
 * The light return after the navy Finance Pro product zone. A type-led
 * editorial argument (large reason statements + supporting copy on thin
 * ledger rules), NOT a feature grid, diagram, register or lifecycle. Every
 * reason is grounded in already-verified RIKNOVA facts — no enterprise
 * jargon, no unsupported claims.
 */

const reasons = [
  {
    index: "01",
    color: "var(--rk-cyan-ink)",
    title: "Built for lending businesses",
    description:
      "RIKNOVA makes software specifically for microfinance institutions, NBFCs, and lending businesses — not a general tool adapted to fit.",
  },
  {
    index: "02",
    color: "var(--rk-blue-ink)",
    title: "Runs your everyday operations",
    description:
      "Finance Pro keeps loan records, collections, receipts, and reports in one place, so your team can handle daily finance work without switching between tools.",
  },
  {
    index: "03",
    color: "var(--rk-emerald-ink)",
    title: "Shaped around your team",
    description:
      "Access is organised around the people who use it every day — Admins running the business and Collection Agents working with customers in the field.",
  },
  {
    index: "04",
    color: "var(--rk-violet-ink)",
    title: "In the cloud, backed up",
    description:
      "Your business data is stored in the cloud and backed up regularly to support continuity of your day-to-day operations.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const listV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const reasonV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const ruleV = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: EASE } },
};
const fadeV = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function WhyChooseUsSection() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-[color:var(--rk-canvas)] pb-24 pt-40 sm:pt-48 md:pb-28"
    >
      <DarkToLightTransition />

      {/* faint ledger structure */}
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-2xl"
        >
          <SectionEyebrow>Why RIKNOVA</SectionEyebrow>
          <h2 className="mt-5 font-display text-4xl font-medium leading-[1.04] tracking-[-0.02em] text-[color:var(--rk-ink-strong)] sm:text-5xl lg:text-[3.4rem]">
            Why Choose <span className="font-bold">RIKNOVA</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[color:var(--rk-ink-body)] md:text-lg">
            Finance software built around the day-to-day operations of lending
            businesses — practical, focused, and purpose-built for the work your
            team actually does.
          </p>
        </motion.div>

        {/* Reasons — type-led editorial argument */}
        <motion.ol
          variants={listV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 md:mt-20"
        >
          {reasons.map((r, i) => (
            <motion.li
              key={r.index}
              variants={reasonV}
              className="relative grid gap-4 pt-8 md:pt-10 lg:grid-cols-12 lg:gap-10 [&:not(:last-child)]:pb-12 md:[&:not(:last-child)]:pb-14"
              data-ocid={`whyus.item.${i + 1}`}
            >
              {/* drawn ledger rule */}
              <motion.span
                aria-hidden="true"
                variants={ruleV}
                className="absolute inset-x-0 top-0 h-px origin-left bg-[color:var(--rk-line-l-strong)]"
              />

              <motion.div variants={fadeV} className="lg:col-span-7">
                <span
                  className="rk-tnum font-mono text-[13px] font-semibold tracking-[0.14em]"
                  style={{ color: r.color }}
                >
                  {r.index}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-[1.12] tracking-tight text-[color:var(--rk-ink-strong)] sm:text-3xl lg:text-[2.1rem]">
                  {r.title}
                </h3>
              </motion.div>

              <motion.p
                variants={fadeV}
                className="max-w-xl text-base leading-relaxed text-[color:var(--rk-ink-body)] lg:col-span-5 lg:pt-11"
              >
                {r.description}
              </motion.p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
