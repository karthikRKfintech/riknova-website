import SectionEyebrow from "@/components/brand/SectionEyebrow";
import {
  Banknote,
  BarChart3,
  Cloud,
  FileText,
  MessageCircle,
  QrCode,
  Receipt,
  UserCog,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

/**
 * FinanceProSection — Phase 2D "product depth".
 *
 * Products (2C) establishes WHAT Finance Pro is; this section shows WHAT it
 * enables operationally, by organising the nine existing capabilities into a
 * lending-operations lifecycle (Originate → Collect → Operate → Report). The
 * nine capability titles + descriptions are preserved verbatim; the stage
 * labels are approved structural language. No fake dashboard, no invented
 * metrics or integrations.
 */

type Capability = {
  icon: typeof BarChart3;
  title: string;
  description: string;
  ocid: number; // preserves the original data-ocid mapping
};

// Original capabilities, each keeping its original data-ocid index.
const analytics: Capability = {
  icon: BarChart3,
  title: "Analytics",
  description:
    "View key financial and operational insights through clear business dashboards.",
  ocid: 1,
};
const collections: Capability = {
  icon: Users,
  title: "Collections",
  description:
    "Track collections, record customer payments, and manage due and payment follow-up.",
  ocid: 2,
};
const loans: Capability = {
  icon: Banknote,
  title: "Loans",
  description:
    "Enter, create, and manage borrower loan records with the required loan details.",
  ocid: 3,
};
const reports: Capability = {
  icon: FileText,
  title: "Reports",
  description:
    "View daily and monthly reports, profit analysis, and cumulative collection, lending, and expense values.",
  ocid: 4,
};
const receipts: Capability = {
  icon: Receipt,
  title: "Receipts",
  description:
    "Generate and access a receipt for each recorded customer payment.",
  ocid: 5,
};
const qrPayments: Capability = {
  icon: QrCode,
  title: "QR Payments",
  description:
    "Upload a company payment QR code that authorized collection agents can show customers when receiving payments.",
  ocid: 6,
};
const whatsapp: Capability = {
  icon: MessageCircle,
  title: "WhatsApp Integration",
  description: "Share customer payment receipts directly through WhatsApp.",
  ocid: 7,
};
const roles: Capability = {
  icon: UserCog,
  title: "Role Management",
  description:
    "Manage access for Admin and Collection Agent users based on their operational roles.",
  ocid: 8,
};
const backup: Capability = {
  icon: Cloud,
  title: "Cloud Backup",
  description:
    "Keep your business data securely stored in the cloud with regular backups.",
  ocid: 9,
};

const stages = [
  { n: "01", label: "Originate", color: "#0FD6A6", items: [loans] },
  {
    n: "02",
    label: "Collect",
    color: "#12B9C9",
    items: [collections, qrPayments, whatsapp],
  },
  {
    n: "03",
    label: "Operate",
    color: "#1C82E8",
    items: [receipts, roles, backup],
  },
  {
    n: "04",
    label: "Report & Analyse",
    color: "#7C4DFF",
    items: [reports, analytics],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const listV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};
const spineHV = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
};
const spineVV = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.7, ease: EASE } },
};
const stageV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const nodeV = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
};
const itemV = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export default function FinanceProSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="finance-pro"
      className="relative overflow-hidden bg-[#070b15] py-24 md:py-28 lg:py-32"
    >
      {/* quiet technical rule marking the boundary inside the navy zone */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--rk-hair-2), transparent)",
        }}
      />
      {/* faint ledger structure */}
      <div
        aria-hidden="true"
        className="rk-ledger pointer-events-none absolute inset-0 opacity-40"
        style={{
          maskImage:
            "radial-gradient(120% 100% at 20% 10%, #000 30%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(120% 100% at 20% 10%, #000 30%, transparent 82%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-2xl"
        >
          <SectionEyebrow tone="dark">Inside Finance Pro</SectionEyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-[var(--rk-ink)] sm:text-5xl lg:text-[3.4rem]">
            The System Behind Every Loan
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--rk-slate)] md:text-lg">
            A comprehensive suite of financial tools designed to streamline your
            operations, from analytics to cloud backup.
          </p>
        </motion.div>

        {/* Lending-operations lifecycle */}
        <motion.ol
          variants={listV}
          initial={reduce ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mt-14 md:mt-20 md:grid md:grid-cols-4 md:gap-x-8"
        >
          {/* horizontal spine (desktop) — the connected operating system */}
          <motion.span
            aria-hidden="true"
            variants={spineHV}
            className="absolute left-4 right-10 top-4 hidden h-px origin-left md:block"
            style={{ background: "var(--rk-hair-2)" }}
          />
          {/* vertical spine (mobile/tablet) */}
          <motion.span
            aria-hidden="true"
            variants={spineVV}
            className="absolute bottom-3 left-[15px] top-2 w-px origin-top md:hidden"
            style={{ background: "var(--rk-hair-2)" }}
          />

          {stages.map((stage) => (
            <motion.li
              key={stage.label}
              variants={stageV}
              className="relative pb-11 pl-12 last:pb-0 md:pb-0 md:pl-0"
            >
              {/* stage node */}
              <motion.span
                variants={nodeV}
                className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-[#070b15] md:static md:mb-6"
                style={{ borderColor: stage.color }}
              >
                <span
                  className="rk-tnum font-mono text-[11px] font-semibold"
                  style={{ color: stage.color }}
                >
                  {stage.n}
                </span>
              </motion.span>

              {/* stage label */}
              <motion.div variants={itemV} className="mb-4 md:mb-5">
                <span
                  className="font-mono text-[11px] font-medium uppercase tracking-[0.2em]"
                  style={{ color: stage.color }}
                >
                  {stage.label}
                </span>
              </motion.div>

              {/* capabilities in this stage */}
              <div className="space-y-5">
                {stage.items.map((cap) => {
                  const Icon = cap.icon;
                  return (
                    <motion.div
                      key={cap.title}
                      variants={itemV}
                      className="flex gap-3"
                      data-ocid={`finance.feature.item.${cap.ocid}`}
                    >
                      <Icon
                        className="mt-0.5 h-5 w-5 shrink-0"
                        style={{ color: stage.color }}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-display text-[15px] font-semibold text-[var(--rk-ink)]">
                          {cap.title}
                        </h3>
                        <p className="mt-1 text-[13px] leading-relaxed text-[var(--rk-slate)]">
                          {cap.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
