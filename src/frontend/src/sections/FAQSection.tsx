import SectionEyebrow from "@/components/brand/SectionEyebrow";
import { ArrowRight, Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

/**
 * FAQSection — Phase 2H "practical close".
 *
 * The next chapter of the dark closing zone opened by Testimonials: a
 * continuous --rk-navy ground (no new transition) carrying a restrained
 * two-column disclosure system — a left intro rail and a right numbered
 * question list separated by thin ledger rules. Not glass cards, not aurora,
 * not gradient text. Every answer is owner-approved and traces to confirmed
 * Finance Pro functionality.
 */

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Finance Pro?",
    answer:
      "Finance Pro is finance software built for lending and finance businesses. It helps you manage customer and borrower loan records, collections, and payment receipts, and view daily and monthly reports — bringing your everyday finance operations together in one place.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Finance Pro uses secure login and access based on operational roles for Admins and Collection Agents. Your business data is stored in cloud infrastructure and backed up regularly.",
  },
  {
    question: "What industries do you support?",
    answer:
      "Finance Pro is built for lending and finance businesses — Microfinance Institutions, NBFCs, Finance Companies, and Lending Businesses that manage loans, collections, and everyday finance operations.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started begins with a conversation. Contact RIKNOVA or book a demo, and the team will walk through Finance Pro and your business requirements before you move ahead.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "Pricing depends on your business requirements. Contact RIKNOVA or book a demo for current pricing details.",
  },
  {
    question: "Do you provide training and support?",
    answer:
      "Yes. RIKNOVA helps Finance Pro customers get set up and supports them with using the software. If you need assistance, contact the RIKNOVA team.",
  },
];

// per-row accents — the same 01→ cyan/blue/emerald/violet sequence used
// across the redesigned sections, cycled for six rows.
const accents = [
  "var(--rk-cyan)",
  "var(--rk-blue)",
  "var(--rk-emerald)",
  "var(--rk-violet)",
  "var(--rk-cyan)",
  "var(--rk-blue)",
];

const EASE = [0.22, 1, 0.36, 1] as const;

const listV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const rowV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const ruleV = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: EASE } },
};
const fadeV = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function FAQRow({
  item,
  index,
  isOpen,
  onToggle,
  reduce,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  reduce: boolean | null;
}) {
  const panelId = useId();
  const buttonId = useId();
  const color = accents[index % accents.length];

  return (
    <motion.div
      variants={rowV}
      className="relative"
      data-ocid={`faq.item.${index + 1}`}
    >
      {/* drawn ledger separator */}
      <motion.span
        aria-hidden="true"
        variants={ruleV}
        className="absolute inset-x-0 top-0 h-px origin-left"
        style={{ background: "var(--rk-hair-2)" }}
      />

      <h3>
        <motion.button
          variants={fadeV}
          type="button"
          id={buttonId}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          data-ocid={`faq.toggle.${index + 1}`}
          className="group flex w-full items-start gap-4 rounded-sm py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--rk-cyan)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--rk-navy)] md:gap-6 md:py-7"
        >
          <span
            className="rk-tnum mt-1 shrink-0 font-mono text-[13px] font-semibold tracking-[0.14em] transition-opacity"
            style={{ color, opacity: isOpen ? 1 : 0.85 }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="flex-1 font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-[var(--rk-ink)] transition-colors group-hover:text-white sm:text-2xl lg:text-[1.6rem]">
            {item.question}
          </span>

          <span
            aria-hidden="true"
            className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors"
            style={{ borderColor: isOpen ? color : "var(--rk-hair-2)" }}
          >
            <motion.span
              animate={reduce ? undefined : { rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="flex"
            >
              <Plus
                className="h-4 w-4"
                style={{ color: isOpen ? color : "var(--rk-slate)" }}
                strokeWidth={2}
              />
            </motion.span>
          </span>
        </motion.button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            id={panelId}
            aria-labelledby={buttonId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 pl-[calc(0.8125rem+1rem)] text-[15px] leading-relaxed text-[var(--rk-slate)] md:pl-[calc(0.8125rem+1.5rem)] md:text-base">
              {item.answer}
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[var(--rk-navy)] py-24 md:py-28 lg:py-32"
    >
      {/* faint ledger structure — continues the closing-zone ground */}
      <div
        aria-hidden="true"
        className="rk-ledger pointer-events-none absolute inset-0 opacity-40"
        style={{
          maskImage:
            "radial-gradient(120% 90% at 15% 4%, #000 32%, transparent 84%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 15% 4%, #000 32%, transparent 84%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left intro rail */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:col-span-4"
          >
            <div className="lg:sticky lg:top-28">
              <SectionEyebrow tone="dark">FAQ</SectionEyebrow>
              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-[var(--rk-ink)] sm:text-5xl lg:text-[3.1rem]">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--rk-slate)]">
                Straight answers about Finance Pro and how to get started with
                RIKNOVA.
              </p>

              <a
                href="#contact"
                className="group mt-7 inline-flex items-center gap-2 font-display text-sm font-semibold text-[var(--rk-ink)] outline-none transition-colors hover:text-[var(--rk-cyan)] focus-visible:ring-2 focus-visible:ring-[var(--rk-cyan)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--rk-navy)]"
              >
                <span className="rk-underline pb-0.5">Contact the team</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          {/* Right disclosure list */}
          <motion.div
            variants={listV}
            initial={reduce ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-8"
          >
            {faqData.map((item, index) => (
              <FAQRow
                key={item.question}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                reduce={reduce}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
