import {
  Activity,
  ArrowUpRight,
  Banknote,
  BarChart3,
  Cloud,
  DollarSign,
  FileText,
  MessageCircle,
  QrCode,
  Receipt,
  TrendingUp,
  UserCog,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Real-time financial dashboards with predictive insights and custom reporting.",
    color: "text-primary",
    bgGlow: "bg-primary/10",
  },
  {
    icon: Users,
    title: "Collections",
    description:
      "Automated debtor tracking, payment reminders, and collection workflows.",
    color: "text-secondary",
    bgGlow: "bg-secondary/10",
  },
  {
    icon: Banknote,
    title: "Loans",
    description:
      "End-to-end loan origination, amortization schedules, and risk scoring.",
    color: "text-accent",
    bgGlow: "bg-accent/10",
  },
  {
    icon: FileText,
    title: "Reports",
    description:
      "Generate regulatory, tax, and management reports with one click.",
    color: "text-primary",
    bgGlow: "bg-primary/10",
  },
  {
    icon: Receipt,
    title: "Receipts",
    description:
      "Digital receipt capture, OCR extraction, and automated bookkeeping.",
    color: "text-secondary",
    bgGlow: "bg-secondary/10",
  },
  {
    icon: QrCode,
    title: "QR Payments",
    description:
      "Instant QR-code generation for fast, contactless customer payments.",
    color: "text-accent",
    bgGlow: "bg-accent/10",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Integration",
    description:
      "Send invoices, reminders, and support messages directly via WhatsApp.",
    color: "text-primary",
    bgGlow: "bg-primary/10",
  },
  {
    icon: UserCog,
    title: "Role Management",
    description:
      "Granular RBAC with audit trails for every action in your organization.",
    color: "text-secondary",
    bgGlow: "bg-secondary/10",
  },
  {
    icon: Cloud,
    title: "Cloud Backup",
    description:
      "Encrypted daily backups with point-in-time recovery and geo-redundancy.",
    color: "text-accent",
    bgGlow: "bg-accent/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="glass-strong rounded-2xl p-6 shadow-elevated w-full max-w-md mx-auto lg:mx-0"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="font-display text-lg font-semibold text-foreground">
            Finance Dashboard
          </h4>
          <p className="text-sm text-muted-foreground">Live Overview</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Revenue", value: "₹124K", icon: DollarSign, trend: "+12%" },
          { label: "Expenses", value: "₹89K", icon: Activity, trend: "-3%" },
          { label: "Growth", value: "24%", icon: TrendingUp, trend: "+8%" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-3 text-center">
            <stat.icon className="w-4 h-4 mx-auto mb-1 text-accent" />
            <div className="font-display text-sm font-bold text-foreground">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
            <div className="text-xs text-success mt-0.5 flex items-center justify-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Chart Area */}
      <div className="glass rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">
            Monthly Revenue
          </span>
          <span className="text-xs text-muted-foreground">Last 6 months</span>
        </div>
        <div className="flex items-end gap-2 h-24">
          {[40, 65, 45, 80, 55, 90].map((height) => (
            <motion.div
              key={`chart-${height}`}
              initial={{ height: 0 }}
              whileInView={{ height: `${height}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + height * 0.01 }}
              className="flex-1 rounded-t-md bg-gradient-to-t from-primary/60 to-accent/60"
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass rounded-xl p-4">
        <h5 className="text-sm font-medium text-foreground mb-3">
          Recent Transactions
        </h5>
        <div className="space-y-2">
          {[
            { name: "Stripe Payout", amount: "₹12,450", type: "income" },
            { name: "AWS Invoice", amount: "₹2,340", type: "expense" },
            { name: "Client Payment", amount: "₹8,900", type: "income" },
          ].map((tx) => (
            <div
              key={tx.name}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-muted-foreground">{tx.name}</span>
              <span
                className={
                  tx.type === "income" ? "text-success" : "text-destructive"
                }
              >
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function FinanceProSection() {
  return (
    <section
      id="finance-pro"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background aurora */}
      <div className="absolute inset-0 gradient-aurora opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4">
            Finance Pro
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive suite of financial tools designed to streamline your
            operations, from analytics to cloud backup.
          </p>
        </motion.div>

        {/* Content Grid: Dashboard + Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Dashboard Mockup - Left on desktop */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <DashboardMockup />
          </div>

          {/* Feature Grid - Right on desktop */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-8 order-1 lg:order-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  className="group glass rounded-xl p-5 transition-smooth hover:shadow-glass hover:border-primary/30 cursor-default"
                  data-ocid={`finance.feature.item.${index + 1}`}
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-lg ${feature.bgGlow} flex items-center justify-center mb-3 transition-smooth group-hover:scale-110`}
                  >
                    <feature.icon
                      className={`w-5 h-5 ${feature.color}`}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-base font-semibold text-foreground mb-1.5">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
