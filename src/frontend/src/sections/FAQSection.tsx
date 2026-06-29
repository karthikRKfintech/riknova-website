import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Finance Pro?",
    answer:
      "Finance Pro is an enterprise-grade financial management platform designed for modern businesses. It combines real-time analytics, automated reporting, and intelligent forecasting into a single, powerful dashboard that helps you make data-driven decisions faster.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Finance Pro is built with secure login, role-based access, protected cloud storage, regular backups, and controlled user permissions. We follow practical security measures to help keep business data safe and accessible only to authorized users.",
  },
  {
    question: "Can I integrate with existing systems?",
    answer:
      "Yes. Finance Pro offers native integrations with 200+ platforms including QuickBooks, SAP, Salesforce, Stripe, and major banking APIs. Our open REST API and webhook support allow custom integrations with your existing tech stack in hours, not weeks.",
  },
  {
    question: "What industries do you support?",
    answer:
      "We serve a diverse range of industries including fintech, healthcare, e-commerce, SaaS, manufacturing, and professional services. Our flexible data models and customizable dashboards adapt to the unique compliance and reporting requirements of each sector.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started takes less than 10 minutes. Sign up for a free 30-day trial, connect your primary data sources through our guided onboarding wizard, and your first insights will be available immediately. No credit card required to begin.",
  },
  {
    question: "Do you offer custom development?",
    answer:
      "Yes, our Enterprise plan includes dedicated solution architects and custom development services. Whether you need bespoke reporting modules, specialized compliance workflows, or white-label deployments, our engineering team partners with you to build exactly what you need.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer transparent, tiered pricing: Starter (₹299 per month / ₹2,499 per year), Growth (₹599 per month / ₹4,999 per year), and Pro (₹1,299 per month / ₹9,999 per year). All plans include unlimited users, with pricing scaling based on transaction volume and API calls.",
  },
  {
    question: "Do you provide training and support?",
    answer:
      "Every plan includes 24/7 live chat and email support with sub-2-hour response times. Professional and Enterprise customers receive dedicated account managers, live training sessions, and access to our comprehensive knowledge base with video tutorials and best-practice guides.",
  },
];

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass rounded-xl overflow-hidden"
      data-ocid={`faq.item.${index + 1}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
        aria-expanded={isOpen}
        data-ocid={`faq.toggle.${index + 1}`}
      >
        <span className="font-display text-base sm:text-lg font-medium text-foreground pr-4">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-accent" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <div className="h-px bg-border mb-4" />
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 lg:py-32 bg-background overflow-hidden"
    >
      {/* Subtle aurora background accent */}
      <div className="absolute inset-0 gradient-aurora opacity-30 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Everything you need to know about Finance Pro. Can&apos;t find the
            answer you&apos;re looking for? Reach out to our team.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <FAQAccordionItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
