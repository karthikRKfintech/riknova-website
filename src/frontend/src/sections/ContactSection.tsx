import { Button } from "@/components/ui/button";
import { useBookDemoModal } from "@/hooks/useBookDemoModal";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, Calendar, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";

const contactDetails = [
  {
    icon: Mail,
    label: "Email Us",
    value: "financeprofintech@gmail.com",
    href: "mailto:financeprofintech@gmail.com",
    color: "primary",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 9363770295",
    href: "tel:+919363770295",
    color: "accent",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value:
      "50/1, Ground Floor, Narayana Maistry Street,\nPurasaiwakkam, Chennai, Tamilnadu, India.",
    href: "#",
    color: "secondary",
  },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary" },
  accent: { bg: "bg-accent/10", text: "text-accent" },
  secondary: { bg: "bg-secondary/10", text: "text-secondary" },
};

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const { openModal: openBookDemoModal } = useBookDemoModal();

  const handleBookDemo = () => {
    openBookDemoModal();
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 bg-muted/20">
      {/* Subtle aurora accent */}
      <div className="absolute inset-0 gradient-aurora opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.08_0.02_260)_0%,_transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Calendar className="h-3 w-3 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Get In Touch
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Ready to Transform Your{" "}
            <span className="text-gradient">Business?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Book a personalized demo with our team and discover how RIKNOVA can
            accelerate your financial operations. We will walk you through the
            platform tailored to your use case.
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactDetails.map((detail, index) => (
            <motion.a
              key={detail.label}
              href={detail.href}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group glass rounded-2xl p-8 border border-border/20 hover:border-primary/30 hover:shadow-glass transition-all duration-300 hover:-translate-y-1 block"
              data-ocid={`contact.${detail.label.toLowerCase().replace(/\s+/g, "_")}_card`}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${colorMap[detail.color]?.bg ?? "bg-muted/50"} border border-${detail.color}/20 mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <detail.icon
                  className={`h-6 w-6 ${colorMap[detail.color]?.text ?? "text-foreground"}`}
                />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {detail.label}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                {detail.value}
              </p>
            </motion.a>
          ))}
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass-strong rounded-2xl p-8 sm:p-12 border border-border/30 shadow-elevated text-center max-w-3xl mx-auto"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Schedule Your Demo Today
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            See why 500+ financial institutions trust RIKNOVA to power their
            lending, collections, and financial operations. No commitment
            required.
          </p>

          <Button
            size="lg"
            onClick={handleBookDemo}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow px-8 h-12 text-base"
            data-ocid="contact.book_demo_button"
          >
            Book Demo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <p className="text-xs text-muted-foreground mt-6">
            Typical response time: under 24 hours. Enterprise inquiries receive
            priority support.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
