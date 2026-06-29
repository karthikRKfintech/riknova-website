import {
  Building2,
  CheckCircle,
  Cloud,
  Layout,
  RefreshCw,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Building2,
    title: "Enterprise Architecture",
    description:
      "Built for scale with microservices, event-driven design, and robust API gateways that power mission-critical operations.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Compliant",
    description:
      "End-to-end encryption, SOC 2 Type II certified, and GDPR-ready with automated compliance monitoring.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Sub-100ms response times powered by edge caching, optimized databases, and global CDN distribution.",
  },
  {
    icon: CheckCircle,
    title: "Highly Reliable",
    description:
      "99.99% uptime SLA with multi-region failover, automated backups, and real-time health monitoring.",
  },
  {
    icon: Cloud,
    title: "Cloud Native",
    description:
      "Kubernetes-native deployments with auto-scaling, container orchestration, and infrastructure-as-code.",
  },
  {
    icon: Layout,
    title: "Modern UI/UX",
    description:
      "Intuitive interfaces designed with accessibility-first principles, dark mode, and responsive layouts.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Updates",
    description:
      "Weekly feature releases with zero-downtime deployments and seamless automatic updates.",
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
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function WhyChooseUsSection() {
  return (
    <section
      id="why-us"
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
            Why RIKNOVA
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Why Choose <span className="text-gradient">RIKNOVA</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            The platform trusted by engineering teams who refuse to compromise
            on performance, security, or developer experience.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                data-ocid={`whyus.item.${index + 1}`}
                className="group relative flex flex-col rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>

                {/* Hover accent line */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 rounded-b-2xl bg-gradient-to-r from-primary to-accent transition-transform duration-300 group-hover:scale-x-100" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
