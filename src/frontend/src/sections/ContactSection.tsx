import SectionEyebrow from "@/components/brand/SectionEyebrow";
import { useBookDemoModal } from "@/hooks/useBookDemoModal";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

/**
 * ContactSection — Phase 2I "closing conversation gateway".
 *
 * The final action layer of the navy closing zone opened by Testimonials and
 * continued by FAQ. A grounded closing invitation and the verified ways to
 * reach RIKNOVA — the working Book-a-demo modal plus direct email and phone —
 * presented as a distinctive asymmetric contact desk, not another card grid.
 * No hype, no fabricated channels, no invented metrics.
 */

const routes = [
  {
    icon: Mail,
    label: "Email",
    detail: "General enquiries and support",
    value: "hello@riknova.com",
    href: "mailto:hello@riknova.com",
    ocid: "contact.email_us_card",
    color: "var(--rk-cyan)",
    actionable: true,
  },
  {
    icon: Phone,
    label: "Call",
    detail: "Speak with the team",
    value: "+91 9363770295",
    href: "tel:+919363770295",
    ocid: "contact.call_us_card",
    color: "var(--rk-blue)",
    actionable: true,
  },
  {
    icon: MapPin,
    label: "Visit",
    detail: "Chennai, Tamil Nadu",
    value:
      "50/1, Ground Floor, Narayana Maistry Street, Purasaiwakkam, Chennai, Tamil Nadu, India.",
    href: null,
    ocid: "contact.visit_us_card",
    color: "var(--rk-emerald)",
    actionable: false,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const listV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
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
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function RouteRow({ route }: { route: (typeof routes)[number] }) {
  const Icon = route.icon;

  const inner = (
    <>
      <motion.span
        aria-hidden="true"
        variants={ruleV}
        className="absolute inset-x-0 top-0 h-px origin-left"
        style={{ background: "var(--rk-hair-2)" }}
      />
      <motion.span
        variants={fadeV}
        aria-hidden="true"
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
        style={{ borderColor: "var(--rk-hair-2)" }}
      >
        <Icon
          className="h-4 w-4"
          style={{ color: route.color }}
          strokeWidth={1.7}
        />
      </motion.span>

      <motion.span variants={fadeV} className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--rk-slate)]">
            {route.label}
          </span>
          {route.actionable && (
            <ArrowUpRight
              className="h-3.5 w-3.5 text-[var(--rk-slate)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              aria-hidden="true"
            />
          )}
        </span>
        <span className="mt-1.5 block font-display text-lg font-semibold text-[var(--rk-ink)]">
          {route.value}
        </span>
        <span className="mt-1 block text-sm text-[var(--rk-slate)]">
          {route.detail}
        </span>
      </motion.span>
    </>
  );

  const className =
    "group relative flex gap-4 py-6 outline-none first:pt-0 md:py-7";

  if (route.actionable && route.href) {
    return (
      <motion.a
        variants={rowV}
        href={route.href}
        data-ocid={route.ocid}
        className={`${className} rounded-sm focus-visible:ring-2 focus-visible:ring-[var(--rk-cyan)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--rk-navy)]`}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.div variants={rowV} data-ocid={route.ocid} className={className}>
      {inner}
    </motion.div>
  );
}

export default function ContactSection() {
  const reduce = useReducedMotion();
  const { openModal: openBookDemoModal } = useBookDemoModal();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[var(--rk-navy)] py-24 md:py-28 lg:py-32"
    >
      {/* faint ledger structure — continues the closing-zone ground */}
      <div
        aria-hidden="true"
        className="rk-ledger pointer-events-none absolute inset-0 opacity-40"
        style={{
          maskImage:
            "radial-gradient(120% 85% at 80% 8%, #000 32%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(120% 85% at 80% 8%, #000 32%, transparent 82%)",
        }}
      />
      {/* deepen slightly toward the footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, #05080f)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left — closing invitation + primary conversion */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:col-span-6"
          >
            <SectionEyebrow tone="dark">Contact</SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-[var(--rk-ink)] sm:text-5xl lg:text-[3.4rem]">
              Talk to the RIKNOVA team.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--rk-slate)] md:text-lg">
              Tell us about your business and we&apos;ll walk you through
              Finance Pro. Book a demo, or reach us directly.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={openBookDemoModal}
                className="rk-btn-arc inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-display text-base font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[var(--rk-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rk-navy)]"
                data-ocid="contact.book_demo_button"
              >
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="mailto:hello@riknova.com"
                className="group inline-flex items-center gap-2 font-display text-sm font-semibold text-[var(--rk-ink)] outline-none transition-colors hover:text-[var(--rk-cyan)] focus-visible:ring-2 focus-visible:ring-[var(--rk-cyan)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--rk-navy)]"
              >
                <span className="rk-underline pb-0.5">Or email us</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--rk-slate)]/85">
              See Finance Pro in action and discuss your requirements with the
              RIKNOVA team.
            </p>
          </motion.div>

          {/* Right — verified contact routes */}
          <motion.div
            variants={listV}
            initial={reduce ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5 lg:col-start-8"
          >
            <motion.span
              variants={fadeV}
              className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--rk-slate)]"
            >
              Reach us directly
            </motion.span>
            <div>
              {routes.map((route) => (
                <RouteRow key={route.label} route={route} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
