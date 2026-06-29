import {
  Brain,
  Code2,
  Container,
  Database,
  FileCode,
  Globe,
  Plug,
  Server,
} from "lucide-react";
import { motion } from "motion/react";

const technologies = [
  {
    name: "React",
    description:
      "Component-based UI library for building interactive interfaces",
    icon: Code2,
    color: "oklch(0.72 0.15 195)",
  },
  {
    name: "TypeScript",
    description: "Type-safe JavaScript for scalable, maintainable code",
    icon: FileCode,
    color: "oklch(0.55 0.2 265)",
  },
  {
    name: "Node.js",
    description:
      "High-performance JavaScript runtime for server-side applications",
    icon: Server,
    color: "oklch(0.65 0.18 150)",
  },
  {
    name: "PostgreSQL",
    description:
      "Advanced open-source relational database with robust features",
    icon: Database,
    color: "oklch(0.55 0.22 300)",
  },
  {
    name: "Cloudflare",
    description:
      "Global edge network for performance, security, and reliability",
    icon: Globe,
    color: "oklch(0.75 0.15 85)",
  },
  {
    name: "Docker",
    description:
      "Containerization platform for consistent deployment environments",
    icon: Container,
    color: "oklch(0.72 0.15 195)",
  },
  {
    name: "Modern APIs",
    description: "RESTful and GraphQL APIs for seamless system integration",
    icon: Plug,
    color: "oklch(0.55 0.2 265)",
  },
  {
    name: "AI Ready",
    description:
      "Built for machine learning integration and intelligent automation",
    icon: Brain,
    color: "oklch(0.55 0.22 300)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function TechStackSection() {
  return (
    <section
      id="technology"
      className="relative w-full overflow-hidden bg-muted/30 py-24 md:py-32"
    >
      {/* Aurora background */}
      <div className="gradient-aurora pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center md:mb-20"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Technology
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Built with <span className="text-gradient">Modern Technology</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Our platform leverages cutting-edge tools and frameworks to deliver
            a secure, scalable, and high-performance experience.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4"
        >
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                data-ocid={`tech.item.${index + 1}`}
                className="group relative"
              >
                <div
                  className="glass relative flex h-full flex-col items-center rounded-2xl p-6 text-center transition-smooth hover:border-primary/30 hover:shadow-glass md:p-8"
                  style={{
                    borderColor: "oklch(0.22 0.02 260 / 0.5)",
                  }}
                >
                  {/* Glow effect on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${tech.color} / 0.15, transparent 70%)`,
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 md:h-14 md:w-14"
                    style={{
                      background: `${tech.color} / 0.1`,
                      border: `1px solid ${tech.color} / 0.2`,
                    }}
                  >
                    <Icon
                      className="h-6 w-6 md:h-7 md:w-7"
                      style={{ color: tech.color }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="relative mb-2 font-display text-base font-semibold text-foreground md:text-lg">
                    {tech.name}
                  </h3>
                  <p className="relative text-sm leading-relaxed text-muted-foreground">
                    {tech.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
