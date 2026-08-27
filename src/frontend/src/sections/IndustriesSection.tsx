import SectionEyebrow from "@/components/brand/SectionEyebrow";
import { motion } from "motion/react";

/**
 * IndustriesSection — Phase 2F "who is RIKNOVA built for".
 *
 * A light sector-directory: four confirmed lending/finance business types as
 * large typographic entries with mono indices, concise context lines, and
 * thin ledger dividers. No cards, icons, timelines, diagrams or fabricated
 * capabilities — the composition simply makes the target customer obvious.
 * Kept light and continuous with the WhyChooseUs section above.
 */

const sectors = [
  {
    index: "01",
    color: "var(--rk-cyan-ink)",
    name: "Microfinance Institutions",
    context:
      "Microfinance institutions managing borrower loans, collections, and day-to-day lending operations.",
  },
  {
    index: "02",
    color: "var(--rk-blue-ink)",
    name: "NBFCs",
    context:
      "Non-banking financial companies managing lending and finance operations across their day-to-day business.",
  },
  {
    index: "03",
    color: "var(--rk-emerald-ink)",
    name: "Finance Companies",
    context:
      "Finance businesses managing loans, collections, and reporting as part of their everyday operations.",
  },
  {
    index: "04",
    color: "var(--rk-violet-ink)",
    name: "Lending Businesses",
    context:
      "Lending businesses that need practical software to manage loans, collections, and everyday operations.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const listV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const entryV = {
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

export default function IndustriesSection() {
  return (
    <section
      id="industries"
      className="relative overflow-hidden border-t border-[color:var(--rk-line-l)] bg-[color:var(--rk-canvas-2)] py-24 md:py-28 lg:py-32"
    >
      {/* subtle light-grid texture */}
      <div
        aria-hidden="true"
        className="rk-ledger-l pointer-events-none absolute inset-0 opacity-60"
        style={{
          maskImage:
            "radial-gradient(100% 90% at 15% 0%, #000 35%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(100% 90% at 15% 0%, #000 35%, transparent 82%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-3xl"
        >
          <SectionEyebrow>Industries</SectionEyebrow>
          <h2 className="mt-5 font-display text-4xl font-medium leading-[1.04] tracking-[-0.02em] text-[color:var(--rk-ink-strong)] sm:text-5xl lg:text-[3.4rem]">
            Built for{" "}
            <span className="font-bold">Lending &amp; Finance Businesses</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[color:var(--rk-ink-body)] md:text-lg">
            RIKNOVA builds software for lending and finance businesses — the
            institutions and companies that manage loans, collections, and
            everyday finance operations.
          </p>
        </motion.div>

        {/* Sector directory */}
        <motion.ol
          variants={listV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 md:mt-20"
        >
          {sectors.map((s, i) => (
            <motion.li
              key={s.index}
              variants={entryV}
              className="relative grid gap-3 pt-7 md:pt-9 lg:grid-cols-12 lg:items-baseline lg:gap-8 [&:not(:last-child)]:pb-8 md:[&:not(:last-child)]:pb-11"
              data-ocid={`industries.item.${i + 1}`}
            >
              {/* drawn ledger divider */}
              <motion.span
                aria-hidden="true"
                variants={ruleV}
                className="absolute inset-x-0 top-0 h-px origin-left bg-[color:var(--rk-line-l-strong)]"
              />

              <motion.div
                variants={fadeV}
                className="flex items-baseline gap-4 lg:col-span-8"
              >
                <span
                  className="rk-tnum shrink-0 font-mono text-[13px] font-semibold tracking-[0.14em]"
                  style={{ color: s.color }}
                >
                  {s.index}
                </span>
                <h3 className="font-display text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-[color:var(--rk-ink-strong)] sm:text-4xl lg:text-[2.9rem]">
                  {s.name}
                </h3>
              </motion.div>

              <motion.p
                variants={fadeV}
                className="max-w-md text-[15px] leading-relaxed text-[color:var(--rk-ink-body)] lg:col-span-4 lg:pl-4"
              >
                {s.context}
              </motion.p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
