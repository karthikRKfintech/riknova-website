import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Eye,
  FileText,
  Globe,
  Lock,
  Mail,
  Shield,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const privacySections = [
  {
    icon: FileText,
    title: "Information We Collect",
    content: `We collect information that you provide directly to us, including:

• Account information (name, email, phone number, company details)
• Payment and billing information
• Communication preferences and support inquiries
• Usage data and analytics from our platform
• Device and browser information for security purposes`,
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: `We use the information we collect to:

• Provide, maintain, and improve our fintech services
• Process transactions and send related information
• Send technical notices, updates, and security alerts
• Respond to your comments, questions, and customer service requests
• Communicate about products, services, offers, and events
• Monitor and analyze trends, usage, and activities in connection with our services`,
  },
  {
    icon: Lock,
    title: "Data Security",
    content: `We implement appropriate technical and organizational measures to protect your personal information:

• Encryption of data in transit and at rest using industry-standard protocols
• Regular security assessments and vulnerability testing
• Access controls and authentication mechanisms
• Employee training on data protection practices
• Incident response procedures for security breaches

While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure.`,
  },
  {
    icon: Users,
    title: "Information Sharing",
    content: `We do not sell your personal information. We may share information in the following circumstances:

• With service providers who perform services on our behalf
• In response to legal process or government requests
• To protect our rights, privacy, safety, or property
• In connection with a merger, acquisition, or sale of assets
• With your consent or at your direction`,
  },
  {
    icon: Globe,
    title: "International Data Transfers",
    content: `Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that are different from those in your country.

We take appropriate safeguards to ensure that your personal information remains protected in accordance with this Privacy Policy, including implementing Standard Contractual Clauses approved by relevant authorities.`,
  },
  {
    icon: Shield,
    title: "Your Rights",
    content: `Depending on your location, you may have the following rights regarding your personal information:

• Access: Request a copy of the personal information we hold about you
• Correction: Request that we correct inaccurate or incomplete information
• Deletion: Request that we delete your personal information
• Restriction: Request that we restrict the processing of your information
• Portability: Request a copy of your information in a structured, machine-readable format
• Objection: Object to our processing of your information

To exercise these rights, please contact us using the information provided below.`,
  },
];

import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

export default function PrivacyPolicyPage() {
  const location = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll-to-top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-aurora opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              data-ocid="privacy.back_link"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Privacy Policy
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              At RIKNOVA, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {privacySections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                </div>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line pl-13">
                  {section.content}
                </div>
              </motion.div>
            ))}

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: privacySections.length * 0.1,
              }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Contact Us
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <span className="text-foreground font-medium">Email:</span>{" "}
                  <a
                    href="mailto:financeprofintech@gmail.com"
                    className="text-primary hover:underline"
                  >
                    financeprofintech@gmail.com
                  </a>
                </p>
                <p>
                  <span className="text-foreground font-medium">Phone:</span>{" "}
                  <a
                    href="tel:+919363770295"
                    className="text-primary hover:underline"
                  >
                    +91 9363770295
                  </a>
                </p>
                <p>
                  <span className="text-foreground font-medium">Address:</span>{" "}
                  50/1, Ground Floor, Narayana Maistry Street, Purasaiwakkam,
                  Chennai, Tamilnadu, India.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
