import { Button } from "@/components/ui/button";
import { useBookDemoModal } from "@/hooks/useBookDemoModal";
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="gradient-aurora absolute inset-0 opacity-60" />
      <motion.div
        className="absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "oklch(0.55 0.22 300 / 0.3)" }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -right-[10%] top-[20%] h-[400px] w-[400px] rounded-full opacity-20 blur-[100px]"
        style={{ background: "oklch(0.72 0.15 195 / 0.3)" }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[30%] h-[350px] w-[350px] rounded-full opacity-15 blur-[90px]"
        style={{ background: "oklch(0.55 0.2 265 / 0.25)" }}
        animate={{
          x: [0, 20, -30, 0],
          y: [0, -20, 30, 0],
          scale: [1, 1.05, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent/30"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function DashboardMockup() {
  return (
    <motion.div
      className="glass relative w-full max-w-2xl overflow-hidden rounded-2xl p-6 shadow-elevated"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ animation: "float 6s ease-in-out infinite" }}
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
            <BarChart3 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">
              Finance Pro
            </div>
            <div className="text-xs text-muted-foreground">
              Dashboard Overview
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Revenue",
            value: "₹2.4M",
            change: "+12.5%",
            icon: TrendingUp,
            positive: true,
          },
          {
            label: "Active Loans",
            value: "1,847",
            change: "+8.2%",
            icon: Zap,
            positive: true,
          },
          {
            label: "Risk Score",
            value: "A+",
            change: "Stable",
            icon: Shield,
            positive: true,
          },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl bg-muted/50 p-3">
            <div className="mb-2 flex items-center gap-2">
              <stat.icon className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <div className="text-lg font-bold text-foreground">
              {stat.value}
            </div>
            <div
              className={`text-xs ${stat.positive ? "text-success" : "text-destructive"}`}
            >
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Chart Area */}
      <div className="rounded-xl bg-muted/30 p-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            Revenue Trend
          </span>
          <div className="flex gap-2">
            {["1W", "1M", "3M", "1Y"].map((period) => (
              <button
                type="button"
                key={period}
                className={`rounded-md px-2 py-1 text-xs transition-colors ${
                  period === "1M"
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <div className="flex h-32 items-end gap-1">
          {[40, 55, 45, 70, 60, 80, 75, 90, 85, 95, 88, 92].map((height) => (
            <motion.div
              key={`bar-${height}`}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/60 to-accent/40"
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.5, delay: 0.8 + height * 0.005 }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>Jan</span>
          <span>Jun</span>
          <span>Dec</span>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-4 flex items-center justify-between rounded-xl bg-muted/30 p-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-secondary/20" />
          <div>
            <div className="text-sm font-medium text-foreground">
              Recent Transaction
            </div>
            <div className="text-xs text-muted-foreground">
              Loan disbursement #2847
            </div>
          </div>
        </div>
        <span className="text-sm font-semibold text-success">+₹45,000</span>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const { openModal: openBookDemoModal } = useBookDemoModal();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background py-20"
    >
      <AuroraBackground />
      <FloatingParticles />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Trusted by 500+ Financial Institutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Transform Your{" "}
              <span className="text-gradient">Finance Business</span> with
              Intelligent Software
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              RIKNOVA builds secure, scalable cloud applications that empower
              financial businesses to streamline operations, reduce risk, and
              accelerate growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                className="group bg-primary text-primary-foreground shadow-glow hover:bg-primary/90"
                onClick={openBookDemoModal}
                data-ocid="hero.book_demo_button"
              >
                Book Demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-border bg-card/50 backdrop-blur-sm hover:bg-card/80"
                onClick={() => scrollToSection("products")}
                data-ocid="hero.explore_products_button"
              >
                Explore Products
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-6 text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-xs">Secure Role-Based Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-xs">99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="text-xs">₹2B+ Processed</span>
              </div>
            </motion.div>
          </div>

          {/* Dashboard Mockup */}
          <div className="flex flex-col items-center lg:items-end">
            <DashboardMockup />
            <p className="mt-3 text-xs italic text-muted-foreground/60">
              *For illustrative purpose only. Actual UI may differ.*
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
