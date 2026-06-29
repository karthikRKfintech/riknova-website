import { Badge } from "@/components/ui/badge";
import { BarChart3, Landmark, Wallet } from "lucide-react";
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
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

interface ProductCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  featured?: boolean;
  index: number;
}

function ProductCard({
  icon,
  title,
  description,
  badge,
  featured,
  index,
}: ProductCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className={`
        group relative rounded-2xl p-8
        glass transition-smooth
        hover:shadow-elevated hover:-translate-y-2
        ${featured ? "md:col-span-2 lg:col-span-1" : ""}
      `}
      data-ocid={`products.item.${index + 1}`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
          {badge && (
            <Badge
              variant="outline"
              className="bg-accent/10 text-accent border-accent/30 text-xs font-medium"
            >
              {badge}
            </Badge>
          )}
        </div>

        <h3 className="text-xl font-display font-semibold text-foreground mb-3">
          {title}
        </h3>

        <p className="text-muted-foreground leading-relaxed text-sm">
          {description}
        </p>

        {featured && (
          <a
            href="https://www.appfinpro.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:text-accent transition-colors duration-300"
            data-ocid="products.learn_more_link"
          >
            <span>Learn more</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Arrow right</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function ProductsSection() {
  const products = [
    {
      icon: <Landmark className="w-6 h-6" />,
      title: "Finance Pro",
      description:
        "Complete finance management platform for microfinance, NBFCs, and financial institutions. Streamline operations, automate workflows, and scale with confidence.",
      featured: true,
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Finance Pro NBFC",
      description:
        "Intelligent debt collection and recovery management system with automated workflows and compliance tracking.",
      badge: "Coming Soon",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "ChitFund Pro",
      description:
        "A dedicated platform for managing chit fund operations, subscriber records, auctions, and payouts with ease.",
      badge: "Coming Soon",
    },
  ];

  return (
    <section
      id="products"
      className="relative py-24 md:py-32 bg-muted/30 overflow-hidden"
      data-ocid="products.section"
    >
      {/* Subtle aurora background */}
      <div className="absolute inset-0 gradient-aurora opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Our <span className="text-gradient">Products</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful solutions built for modern financial institutions
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.title}
              icon={product.icon}
              title={product.title}
              description={product.description}
              badge={product.badge}
              featured={product.featured}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
