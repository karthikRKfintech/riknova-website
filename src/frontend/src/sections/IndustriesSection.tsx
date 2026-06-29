import {
  Briefcase,
  Building,
  Car,
  Gem,
  HandCoins,
  Landmark,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const industries = [
  {
    name: "Microfinance",
    description:
      "Empowering underserved communities with accessible credit solutions and digital lending platforms.",
    icon: HandCoins,
  },
  {
    name: "NBFC",
    description:
      "Comprehensive technology stack for non-banking financial companies to scale operations securely.",
    icon: Building,
  },
  {
    name: "Finance Companies",
    description:
      "End-to-end digital transformation for traditional finance institutions seeking modern infrastructure.",
    icon: Landmark,
  },
  {
    name: "Collection Agencies",
    description:
      "AI-powered recovery tools and compliant communication channels to optimize debt collection workflows.",
    icon: Users,
  },
  {
    name: "Vehicle Finance",
    description:
      "Specialized loan management and asset tracking solutions for automotive financing portfolios.",
    icon: Car,
  },
  {
    name: "Gold Loan",
    description:
      "Streamlined appraisal, vault management, and disbursement systems for precious metal-backed lending.",
    icon: Gem,
  },
  {
    name: "Business Lending",
    description:
      "Flexible working capital and term loan platforms tailored for SME and enterprise credit needs.",
    icon: Briefcase,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function IndustriesSection() {
  return (
    <section
      id="industries"
      className="relative overflow-hidden bg-muted/30 py-24 md:py-32"
    >
      {/* Aurora background */}
      <div className="gradient-aurora pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center md:mb-20"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Industries
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Industries We <span className="text-gradient">Serve</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Purpose-built fintech infrastructure powering the full spectrum of
            financial services across emerging and established markets.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                variants={cardVariants}
                custom={index}
                data-ocid={`industries.item.${index + 1}`}
                className="group relative flex flex-col rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-elevated hover:border-primary/30"
              >
                {/* Glow effect on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                </div>

                {/* Icon */}
                <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>

                {/* Content */}
                <h3 className="relative mb-2 font-display text-lg font-semibold text-foreground">
                  {industry.name}
                </h3>
                <p className="relative text-sm leading-relaxed text-muted-foreground">
                  {industry.description}
                </p>

                {/* Bottom accent line */}
                <div className="relative mt-4 h-px w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full w-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
