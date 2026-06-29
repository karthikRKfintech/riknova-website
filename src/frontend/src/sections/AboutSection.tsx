import { Brain, Shield, TrendingUp, Zap } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  {
    icon: Shield,
    label: "99.9% Uptime",
    description: "Enterprise-grade reliability",
  },
  {
    icon: Zap,
    label: "Enterprise Grade",
    description: "Built for scale and security",
  },
  {
    icon: Brain,
    label: "AI Ready",
    description: "Intelligent automation built-in",
  },
  {
    icon: TrendingUp,
    label: "Future Proof",
    description: "Continuous innovation pipeline",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-muted/30 py-24 md:py-32"
    >
      {/* Subtle aurora background */}
      <div className="pointer-events-none absolute inset-0 gradient-aurora opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center space-y-8">
            <motion.div variants={itemVariants}>
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                About RIKNOVA
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
            >
              Transforming Traditional Finance Through{" "}
              <span className="text-gradient">Intelligent Software</span>
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                We exist because traditional financial software has failed to
                keep pace with the speed of modern business. Legacy systems are
                rigid, expensive, and ill-equipped for the demands of
                digital-first finance.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground">
                RIKNOVA fills this critical gap by building intelligent,
                adaptive financial infrastructure that empowers microfinance
                institutions, NBFCs, and lending platforms to operate with the
                agility of a tech company and the trust of a bank.
              </p>

              <div className="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                  Our Vision
                </h3>
                <p className="text-muted-foreground">
                  To become the leading fintech platform provider, enabling
                  every financial institution to deliver seamless, intelligent,
                  and inclusive services to their customers.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Stats Grid + Abstract Visual */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Abstract visual element */}
            <motion.div
              variants={itemVariants}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/50 bg-card/30"
            >
              <div className="absolute inset-0 gradient-aurora opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Orbiting circles */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="h-48 w-48 rounded-full border border-primary/20 md:h-64 md:w-64"
                  >
                    <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-primary/60 shadow-lg shadow-primary/30" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 15,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="absolute inset-0 m-auto h-32 w-32 rounded-full border border-accent/20 md:h-44 md:w-44"
                  >
                    <div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent/60 shadow-lg shadow-accent/30" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="absolute inset-0 m-auto h-16 w-16 rounded-full border border-secondary/20 md:h-24 md:w-24"
                  >
                    <div className="absolute -right-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-secondary/60 shadow-lg shadow-secondary/30" />
                  </motion.div>
                  {/* Center glow */}
                  <div className="absolute inset-0 m-auto h-8 w-8 rounded-full bg-primary/20 blur-xl md:h-12 md:w-12" />
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={cardVariants}
                    custom={index}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="glass group rounded-xl p-5 transition-smooth"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="mb-1 font-display text-lg font-semibold text-foreground">
                      {stat.label}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
