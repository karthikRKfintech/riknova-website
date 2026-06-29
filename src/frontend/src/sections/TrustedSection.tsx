import {
  Brain,
  Building2,
  Cloud,
  Cpu,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const trustBadges = [
  { icon: Cpu, label: "Technology" },
  { icon: Shield, label: "Security" },
  { icon: Cloud, label: "Cloud" },
  { icon: Zap, label: "Performance" },
  { icon: TrendingUp, label: "Scalability" },
  { icon: Brain, label: "AI" },
  { icon: Building2, label: "Enterprise" },
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

export default function TrustedSection() {
  return (
    <section
      id="trusted"
      className="relative w-full py-24 md:py-32 bg-muted/40 overflow-hidden"
    >
      {/* Subtle aurora background */}
      <div className="absolute inset-0 gradient-aurora opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono uppercase tracking-widest text-accent mb-4">
            Trusted By Industry Leaders
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Built for <span className="text-gradient">Enterprise Scale</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg font-body">
            Powering the infrastructure behind the world&apos;s most demanding
            organizations with cutting-edge technology and uncompromising
            security.
          </p>
        </motion.div>

        {/* Trust badges grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6"
        >
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                variants={itemVariants}
                className="group"
                data-ocid={`trusted.item.${index + 1}`}
              >
                <div className="glass rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center gap-4 h-full min-h-[140px] transition-smooth hover:shadow-elevated hover:scale-105 hover:border-accent/30 cursor-default">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-smooth" />
                    <Icon
                      className="relative w-8 h-8 md:w-10 md:h-10 text-accent transition-smooth group-hover:text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="font-body text-sm md:text-base font-medium text-foreground/90 text-center">
                    {badge.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom trust statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center"
                >
                  <span className="text-[10px] font-bold text-primary-foreground">
                    {String.fromCharCode(64 + i)}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground font-body ml-2">
              Trusted by <strong className="text-foreground">500+</strong>{" "}
              enterprise teams worldwide
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
