import { Quote, Star } from "lucide-react";
import { motion } from "motion/react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Senthil",
    role: "Owner",
    company: "KRS Finance, Chennai",
    quote:
      "Finance Pro helped us manage customer loans, collections, and reports in a much more organized way. Daily work has become faster and easier.",
    rating: 5,
  },
  {
    name: "Rajendran",
    role: "Owner",
    company: "KMRT Finance, Coimbatore",
    quote:
      "The software is simple to use and very useful for tracking collections, pending dues, and customer details. It reduced our manual notebook work.",
    rating: 5,
  },
  {
    name: "Sathish",
    role: "Owner",
    company: "Sollai Savings and Finance, Chennai",
    quote:
      "Finance Pro gives clear reports and makes collection follow-up easier. It is a practical solution for finance businesses like ours.",
    rating: 5,
  },
  {
    name: "Saravankumar",
    role: "Owner",
    company: "RR Financial Services, Trichy",
    quote:
      "We are able to manage loans, agents, receipts, and reports from one place. The system is reliable and helpful for our daily finance operations.",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={`star-${i}-${rating}`}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-[#06B6D4] text-[#06B6D4]"
              : "text-muted-foreground"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className="group relative"
      data-ocid={`testimonial.item.${index + 1}`}
    >
      <div className="glass rounded-2xl p-6 md:p-8 h-full flex flex-col transition-smooth hover:shadow-glass hover:border-[oklch(0.22_0.02_260/0.7)]">
        {/* Quote Icon */}
        <div className="mb-4">
          <Quote className="h-8 w-8 text-[#06B6D4]/40" aria-hidden="true" />
        </div>

        {/* Star Rating */}
        <div className="mb-4">
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Quote Text */}
        <blockquote className="flex-1 mb-6">
          <p className="text-foreground/90 font-body text-sm md:text-base leading-relaxed">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-3 pt-4 border-t border-[oklch(0.22_0.02_260/0.5)]">
          {/* Avatar Placeholder */}
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-display text-sm font-semibold">
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>

          <div className="min-w-0">
            <p className="text-foreground font-display text-sm font-semibold truncate">
              {testimonial.name}
            </p>
            <p className="text-muted-foreground font-body text-xs truncate">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative py-20 md:py-32 bg-muted/30"
      aria-labelledby="testimonials-heading"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 gradient-aurora pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            id="testimonials-heading"
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg max-w-2xl mx-auto">
            Trusted by finance leaders at leading companies worldwide
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
