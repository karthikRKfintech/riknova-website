import LightToNavyTransition from "@/components/brand/LightToNavyTransition";
import ProductArchitecture from "@/components/brand/ProductArchitecture";
import SectionEyebrow from "@/components/brand/SectionEyebrow";
import { ArrowRight, BarChart3, Wallet } from "lucide-react";
import { motion } from "motion/react";

const roadmap = [
  {
    icon: Wallet,
    title: "Finance Pro NBFC",
    description:
      "A planned product focused on collections and recovery workflows for NBFCs.",
    status: "Coming Soon",
    accent: "#12B9C9",
  },
  {
    icon: BarChart3,
    title: "ChitFund Pro",
    description:
      "A dedicated platform for managing chit fund operations, subscriber records, auctions, and payouts with ease.",
    status: "Coming Soon",
    accent: "#1C82E8",
  },
];

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductsSection() {
  return (
    <section
      id="products"
      className="relative overflow-hidden bg-[var(--rk-navy)] pb-24 pt-40 sm:pt-48 md:pb-28"
      data-ocid="products.section"
    >
      <LightToNavyTransition />

      {/* faint ledger structure */}
      <div
        aria-hidden="true"
        className="rk-ledger pointer-events-none absolute inset-0 opacity-50"
        style={{
          maskImage:
            "radial-gradient(120% 100% at 80% 12%, #000 30%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(120% 100% at 80% 12%, #000 30%, transparent 82%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <SectionEyebrow tone="dark">Product Portfolio</SectionEyebrow>
          <h2 className="mt-5 font-display text-4xl font-medium leading-[1.04] tracking-[-0.02em] text-[var(--rk-ink)] sm:text-5xl lg:text-[3.4rem]">
            Our <span className="font-bold">Products</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--rk-slate)] md:text-lg">
            Finance Pro today, with more products on the way.
          </p>
        </motion.div>

        {/* Flagship — Finance Pro */}
        <div
          className="mt-14 grid items-center gap-10 md:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14"
          data-ocid="products.item.1"
        >
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* product-state labels (not marketing claims) */}
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--rk-slate)]">
                Flagship
              </span>
              <span className="h-3 w-px bg-[var(--rk-hair-2)]" />
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--rk-emerald)] opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--rk-emerald)]" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--rk-emerald)]">
                  Live
                </span>
              </span>
            </div>

            <h3 className="font-display text-3xl font-bold tracking-tight text-[var(--rk-ink)] sm:text-4xl">
              Finance Pro
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--rk-slate)] md:text-lg">
              Finance management software for microfinance institutions, NBFCs,
              finance companies, and lending businesses — bringing loans,
              collections, receipts, and reports together in one place.
            </p>

            <a
              href="https://www.appfinpro.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-2 rounded-lg font-display text-sm font-semibold text-[var(--rk-ink)] outline-none transition-colors hover:text-[var(--rk-cyan)] focus-visible:ring-2 focus-visible:ring-[var(--rk-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rk-navy)]"
              data-ocid="products.learn_more_link"
            >
              <span className="rk-underline pb-0.5">Learn more</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <ProductArchitecture />
          </motion.div>
        </div>

        {/* Roadmap rail — subordinate to the shipping flagship */}
        <div className="mt-20 md:mt-28">
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--rk-slate)]">
              On the Roadmap
            </span>
            <span className="h-px flex-1 bg-[var(--rk-hair)]" />
            <span className="rk-tnum font-mono text-sm font-semibold tracking-[0.12em] text-[var(--rk-ink)]">
              02
            </span>
          </div>

          <ol className="relative">
            {/* the rail */}
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-[7px] top-3 w-px"
              style={{ background: "var(--rk-hair-2)" }}
            />
            {roadmap.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative grid grid-cols-[auto_1fr] gap-x-5 pb-12 last:pb-0 md:gap-x-8"
                  data-ocid={`products.item.${i + 2}`}
                >
                  {/* rail node */}
                  <span
                    aria-hidden="true"
                    className="relative mt-1 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-[var(--rk-navy)]"
                    style={{ borderColor: p.accent }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: p.accent }}
                    />
                  </span>

                  {/* content — stacked on mobile, split into title / description at md */}
                  <div className="md:grid md:grid-cols-[minmax(0,290px)_1fr] md:items-start md:gap-x-8">
                    <div>
                      <span className="mb-2 inline-flex items-center rounded-full border border-[var(--rk-hair-2)] px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--rk-slate)]">
                        {p.status}
                      </span>
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className="h-5 w-5 shrink-0"
                          style={{ color: p.accent }}
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                        <h4 className="font-display text-xl font-semibold text-[var(--rk-ink)]">
                          {p.title}
                        </h4>
                      </div>
                    </div>

                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--rk-slate)] md:mt-8 md:text-[15px]">
                      {p.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
