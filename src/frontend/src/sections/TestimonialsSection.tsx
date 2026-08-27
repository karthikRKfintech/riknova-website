import LightToNavyTransition from "@/components/brand/LightToNavyTransition";
import SectionEyebrow from "@/components/brand/SectionEyebrow";
import { Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

/**
 * TestimonialsSection — Phase 2G "customer voice / social proof".
 *
 * Opens the site's dark closing zone. A navy editorial testimonial sequence
 * on the --rk-* system: four genuine customer statements carried by their
 * quotation typography, with mono 01–04 sequencing, thin drawn ledger
 * dividers, restrained per-voice accents and clean typographic attribution.
 * NOT a glass-card wall, carousel or metric block.
 *
 * The four testimonials (names, roles, companies, cities, quotes, 5/5
 * ratings and their order) are owner-approved and preserved verbatim; the
 * data-ocid mapping testimonial.item.1–4 is unchanged.
 */

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Senthil",
    role: "Owner",
    company: "KRS Finance, Chennai",
    quote:
      "Finance Pro helped us manage customer loans, collections, and reports in a much more organized way. Daily work has become faster and easier.",
    rating: 5,
  },
  {
    name: "Rajendran",
    role: "Owner",
    company: "KMRT Finance, Coimbatore",
    quote:
      "The software is simple to use and very useful for tracking collections, pending dues, and customer details. It reduced our manual notebook work.",
    rating: 5,
  },
  {
    name: "Sathish",
    role: "Owner",
    company: "Sollai Savings and Finance, Chennai",
    quote:
      "Finance Pro gives clear reports and makes collection follow-up easier. It is a practical solution for finance businesses like ours.",
    rating: 5,
  },
  {
    name: "Saravankumar",
    role: "Owner",
    company: "RR Financial Services, Trichy",
    quote:
      "We are able to manage loans, agents, receipts, and reports from one place. The system is reliable and helpful for our daily finance operations.",
    rating: 5,
  },
];

// per-voice accents — the same 01→04 cyan/blue/emerald/violet sequence used
// across WhyChooseUs and Industries, for cross-section continuity.
const accents = [
  "var(--rk-cyan)",
  "var(--rk-blue)",
  "var(--rk-emerald)",
  "var(--rk-violet)",
];

const EASE = [0.22, 1, 0.36, 1] as const;

const listV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } },
};
const entryV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const ruleV = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.7, ease: EASE } },
};
const quoteV = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const metaV = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function Rating({ rating, color }: { rating: number; color: string }) {
  return (
    <div className="flex items-center gap-1">
      <span className="sr-only">{`Rated ${rating} out of 5`}</span>
      <span aria-hidden="true" className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed 5-star scale
            key={i}
            className="h-3.5 w-3.5"
            style={{
              color,
              fill: i < rating ? color : "transparent",
              opacity: i < rating ? 0.9 : 0.3,
            }}
            strokeWidth={1.6}
          />
        ))}
      </span>
    </div>
  );
}

export default function TestimonialsSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-[var(--rk-navy)] pb-24 pt-40 sm:pt-48 md:pb-28 lg:pb-32"
    >
      {/* engineered light (Industries) → navy bridge */}
      <LightToNavyTransition />

      {/* faint ledger structure */}
      <div
        aria-hidden="true"
        className="rk-ledger pointer-events-none absolute inset-0 opacity-40"
        style={{
          maskImage:
            "radial-gradient(120% 90% at 82% 6%, #000 32%, transparent 84%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 82% 6%, #000 32%, transparent 84%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Intro — left-aligned editorial header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-2xl"
        >
          <SectionEyebrow tone="dark">In Their Words</SectionEyebrow>
          <h2
            id="testimonials-heading"
            className="mt-5 font-display text-4xl font-medium leading-[1.04] tracking-[-0.02em] text-[var(--rk-ink)] sm:text-5xl lg:text-[3.4rem]"
          >
            What Our <span className="font-bold">Clients Say</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--rk-slate)] md:text-lg">
            From finance businesses using Finance Pro every day.
          </p>
        </motion.div>

        {/* Voice sequence — editorial, not a card grid */}
        <motion.ol
          variants={listV}
          initial={reduce ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 md:mt-20"
        >
          {testimonials.map((t, i) => {
            const color = accents[i % accents.length];
            // gentle asymmetric indent alternation on wide screens
            const contentCol =
              i % 2 === 0 ? "lg:col-start-3" : "lg:col-start-4";
            return (
              <motion.li
                key={t.name}
                variants={entryV}
                data-ocid={`testimonial.item.${i + 1}`}
                className="relative pt-9 [&:not(:last-child)]:pb-10 md:pt-11 md:[&:not(:last-child)]:pb-14"
              >
                {/* drawn ledger divider */}
                <motion.span
                  aria-hidden="true"
                  variants={ruleV}
                  className="absolute inset-x-0 top-0 h-px origin-left"
                  style={{ background: "var(--rk-hair-2)" }}
                />

                <figure className="lg:grid lg:grid-cols-12 lg:gap-x-8">
                  {/* marginal index */}
                  <motion.span
                    aria-hidden="true"
                    variants={metaV}
                    className="rk-tnum mb-4 block font-mono text-lg font-semibold tracking-[0.12em] lg:col-span-2 lg:col-start-1 lg:mb-0 lg:text-xl"
                    style={{ color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>

                  <div className={`${contentCol} lg:col-span-9`}>
                    {/* the quote carries the composition */}
                    <motion.blockquote variants={quoteV}>
                      <p className="max-w-2xl font-display text-2xl font-medium leading-[1.32] tracking-[-0.01em] text-[var(--rk-ink)] sm:text-[1.7rem] lg:text-[1.9rem] lg:leading-[1.34]">
                        {t.quote}
                      </p>
                    </motion.blockquote>

                    {/* restrained rating, secondary to the quote */}
                    <motion.div variants={metaV} className="mt-6">
                      <Rating rating={t.rating} color={color} />
                    </motion.div>

                    {/* typographic attribution */}
                    <motion.figcaption
                      variants={metaV}
                      className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1"
                    >
                      <cite className="font-display text-base font-semibold not-italic text-[var(--rk-ink)]">
                        {t.name}
                      </cite>
                      <span
                        aria-hidden="true"
                        className="h-3 w-px"
                        style={{ background: "var(--rk-hair-2)" }}
                      />
                      <span className="text-sm text-[var(--rk-slate)]">
                        {t.role}, {t.company}
                      </span>
                    </motion.figcaption>
                  </div>
                </figure>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
