import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Link } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { ArrowLeft, FileText, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const tocSections = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "eligibility", label: "2. Eligibility" },
  { id: "nature", label: "3. Nature of Our Services" },
  { id: "account", label: "4. Account Responsibility" },
  { id: "user-data", label: "5. User Data" },
  { id: "subscription", label: "6. Subscription & Billing" },
  { id: "acceptable-use", label: "7. Acceptable Use" },
  { id: "data-ownership", label: "8. Data Ownership" },
  { id: "availability", label: "9. Service Availability" },
  { id: "backups", label: "10. Backups" },
  { id: "disclaimer", label: "11. Disclaimer" },
  { id: "liability", label: "12. Limitation of Liability" },
  { id: "indemnification", label: "13. Indemnification" },
  { id: "suspension", label: "14. Account Suspension & Termination" },
  { id: "changes", label: "15. Changes to Terms" },
  { id: "governing-law", label: "16. Governing Law" },
  { id: "force-majeure", label: "17. Force Majeure" },
  { id: "contact", label: "18. Contact Information" },
];

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState<string>("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const location = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll-to-top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    for (const { id } of tocSections) {
      const el = document.getElementById(id);
      if (el) {
        sectionRefs.current[id] = el;
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);

  const handleTocClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-aurora opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              data-ocid="terms.back_link"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Terms & Conditions
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Please read these Terms & Conditions carefully before using any
              RIKNOVA product or service.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span>
                <span className="text-foreground font-medium">
                  Effective Date:
                </span>{" "}
                23 April 2026
              </span>
              <span className="hidden sm:inline text-border">|</span>
              <span>
                <span className="text-foreground font-medium">Version:</span>{" "}
                1.0
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content with Sticky TOC */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sticky TOC */}
            <aside className="lg:w-72 lg:flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
                  {tocSections.map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleTocClick(id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        activeSection === id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                      data-ocid={`terms.toc_${id}`}
                    >
                      {label}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0 space-y-12">
              {/* Intro */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Welcome to{" "}
                  <strong className="text-foreground">
                    RIKNOVA FINTECH SOLUTIONS
                  </strong>{" "}
                  (&quot;RIKNOVA&quot;, &quot;we&quot;, &quot;our&quot;, or
                  &quot;us&quot;).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These Terms & Conditions govern your access to and use of all
                  software products, websites, web applications, APIs, mobile
                  applications, and digital services owned or operated by{" "}
                  <strong className="text-foreground">
                    RIKNOVA FINTECH SOLUTIONS
                  </strong>
                  , including but not limited to{" "}
                  <strong className="text-foreground">Finance Pro</strong> and
                  any future products or services.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  By creating an account, accessing, or using any RIKNOVA
                  product or service, you acknowledge that you have read,
                  understood, and agreed to be bound by these Terms and our
                  Privacy Policy.
                </p>
              </motion.div>

              {/* Section 1 */}
              <motion.div
                id="acceptance"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These Terms constitute a legally binding agreement between you
                  and RIKNOVA FINTECH SOLUTIONS.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  If you do not agree with these Terms, you must not access or
                  use any of our products or services.
                </p>
              </motion.div>

              {/* Section 2 */}
              <motion.div
                id="eligibility"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  2. Eligibility
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To use our services you must:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
                  <li>Be at least 18 years of age.</li>
                  <li>
                    Be legally capable of entering into binding agreements.
                  </li>
                  <li>Use our software only for lawful business purposes.</li>
                  <li>Provide accurate registration information.</li>
                </ul>
              </motion.div>

              {/* Section 3 */}
              <motion.div
                id="nature"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  3. Nature of Our Services
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  RIKNOVA develops software solutions that help businesses
                  manage operations digitally.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our products may include features for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed mb-6">
                  <li>Customer Management</li>
                  <li>Loan Management</li>
                  <li>Collection Tracking</li>
                  <li>Reports</li>
                  <li>Analytics</li>
                  <li>Business Automation</li>
                  <li>Digital Records</li>
                  <li>Cloud Synchronization</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  RIKNOVA is <strong className="text-foreground">not</strong>:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed mb-6">
                  <li>A Bank</li>
                  <li>A Non-Banking Financial Company (NBFC)</li>
                  <li>A Money Lender</li>
                  <li>A Payment Gateway</li>
                  <li>A Financial Institution</li>
                  <li>A Debt Collection Agency</li>
                  <li>A Legal, Tax, or Financial Advisor</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  We only provide software.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Users remain solely responsible for their business operations,
                  lending activities, customer relationships, regulatory
                  compliance, and financial decisions.
                </p>
              </motion.div>

              {/* Section 4 */}
              <motion.div
                id="account"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  4. Account Responsibility
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed mb-4">
                  <li>Maintaining the confidentiality of your account.</li>
                  <li>Protecting your password and login credentials.</li>
                  <li>All activities performed using your account.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  You must immediately notify us if unauthorized access is
                  suspected.
                </p>
              </motion.div>

              {/* Section 5 */}
              <motion.div
                id="user-data"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  5. User Data
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  All information entered into our software is provided by you.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You remain solely responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed mb-4">
                  <li>Accuracy</li>
                  <li>Completeness</li>
                  <li>Legality</li>
                  <li>Customer consent</li>
                  <li>Regulatory compliance</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  RIKNOVA does not verify or validate customer records entered
                  by users.
                </p>
              </motion.div>

              {/* Section 6 */}
              <motion.div
                id="subscription"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  6. Subscription & Billing
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Certain products may be offered with free trial periods
                  followed by paid subscriptions.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Subscription plans, pricing, billing cycles, features, and
                  usage limits may vary by product.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Subscription fees are billed in advance.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Unless required by applicable law, subscription payments are
                  non-refundable.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to update pricing or features with
                  reasonable notice.
                </p>
              </motion.div>

              {/* Section 7 */}
              <motion.div
                id="acceptable-use"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  7. Acceptable Use
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed mb-4">
                  <li>Use our software for unlawful activities.</li>
                  <li>Upload illegal or harmful content.</li>
                  <li>Attempt to reverse engineer our software.</li>
                  <li>Interfere with platform security.</li>
                  <li>Share or resell your account without authorization.</li>
                  <li>Circumvent subscription or licensing controls.</li>
                  <li>Use our software to violate applicable laws.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Violation of these Terms may result in account suspension or
                  termination.
                </p>
              </motion.div>

              {/* Section 8 */}
              <motion.div
                id="data-ownership"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  8. Data Ownership
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You retain ownership of all information you enter into our
                  products.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  RIKNOVA acts only as the software service provider.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for ensuring lawful collection and use of
                  customer information.
                </p>
              </motion.div>

              {/* Section 9 */}
              <motion.div
                id="availability"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  9. Service Availability
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Although we strive for high availability, we do not guarantee
                  uninterrupted service.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Temporary interruptions may occur due to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
                  <li>Maintenance</li>
                  <li>Infrastructure upgrades</li>
                  <li>Third-party outages</li>
                  <li>Internet failures</li>
                  <li>Security incidents</li>
                  <li>Force majeure events</li>
                </ul>
              </motion.div>

              {/* Section 10 */}
              <motion.div
                id="backups"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  10. Backups
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We perform reasonable backup procedures.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  However, users are strongly encouraged to maintain independent
                  backups of business-critical information.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  RIKNOVA is not responsible for losses resulting from failure
                  to maintain separate backups.
                </p>
              </motion.div>

              {/* Section 11 */}
              <motion.div
                id="disclaimer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  11. Disclaimer
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our software is provided{" "}
                  <strong className="text-foreground">&quot;AS IS&quot;</strong>{" "}
                  and{" "}
                  <strong className="text-foreground">
                    &quot;AS AVAILABLE.&quot;
                  </strong>
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We make no warranty regarding:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed mb-4">
                  <li>Accuracy of user-entered data</li>
                  <li>Business outcomes</li>
                  <li>Regulatory compliance</li>
                  <li>Financial calculations</li>
                  <li>Profitability</li>
                  <li>Availability</li>
                  <li>Fitness for a particular purpose</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Users should independently verify all business information
                  generated by our software.
                </p>
              </motion.div>

              {/* Section 12 */}
              <motion.div
                id="liability"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  12. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To the fullest extent permitted by law, RIKNOVA FINTECH
                  SOLUTIONS shall not be liable for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed mb-4">
                  <li>Business losses</li>
                  <li>Revenue losses</li>
                  <li>Profit losses</li>
                  <li>Customer disputes</li>
                  <li>Incorrect user-entered information</li>
                  <li>Regulatory actions</li>
                  <li>Data loss</li>
                  <li>Service interruptions</li>
                  <li>Indirect or consequential damages</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Our maximum liability shall not exceed the subscription fees
                  paid by the user during the three months immediately preceding
                  the event giving rise to the claim.
                </p>
              </motion.div>

              {/* Section 13 */}
              <motion.div
                id="indemnification"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  13. Indemnification
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree to indemnify and hold harmless RIKNOVA FINTECH
                  SOLUTIONS from claims, liabilities, damages, penalties,
                  expenses, or legal costs arising from:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
                  <li>Your use of our software.</li>
                  <li>Your business activities.</li>
                  <li>Information entered by you.</li>
                  <li>Violations of these Terms.</li>
                  <li>Violations of applicable laws.</li>
                </ul>
              </motion.div>

              {/* Section 14 */}
              <motion.div
                id="suspension"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  14. Account Suspension & Termination
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may suspend or terminate accounts if:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed mb-4">
                  <li>These Terms are violated.</li>
                  <li>Required by law.</li>
                  <li>Security risks are identified.</li>
                  <li>Subscription payments remain unpaid.</li>
                  <li>Fraudulent or abusive activity is detected.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Users may permanently delete their account from supported
                  applications.
                </p>
              </motion.div>

              {/* Section 15 */}
              <motion.div
                id="changes"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  15. Changes to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may modify these Terms periodically.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Updated versions will be published on our official website.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Continued use of our products constitutes acceptance of the
                  revised Terms.
                </p>
              </motion.div>

              {/* Section 16 */}
              <motion.div
                id="governing-law"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  16. Governing Law
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These Terms shall be governed by the laws of India.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Any disputes shall be subject to the exclusive jurisdiction of
                  the courts located in Chennai, Tamil Nadu, India.
                </p>
              </motion.div>

              {/* Section 17 */}
              <motion.div
                id="force-majeure"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  17. Force Majeure
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  RIKNOVA shall not be liable for delays or failures caused by
                  events beyond reasonable control, including natural disasters,
                  internet outages, cyber incidents, governmental actions, or
                  other force majeure events.
                </p>
              </motion.div>

              {/* Section 18 - Contact */}
              <motion.div
                id="contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    18. Contact Information
                  </h2>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="font-display font-semibold text-foreground">
                    RIKNOVA FINTECH SOLUTIONS
                  </p>
                  <div className="space-y-2">
                    <p>
                      <span className="text-foreground font-medium">
                        Email:
                      </span>{" "}
                      <a
                        href="mailto:financeprofintech@gmail.com"
                        className="text-primary hover:underline"
                      >
                        financeprofintech@gmail.com
                      </a>
                    </p>
                    <p>
                      <span className="text-foreground font-medium">
                        Phone:
                      </span>{" "}
                      <a
                        href="tel:+919363770295"
                        className="text-primary hover:underline"
                      >
                        +91 93637 70295
                      </a>
                    </p>
                    <p>
                      <span className="text-foreground font-medium">
                        Address:
                      </span>{" "}
                      50/1, Ground Floor, Narayana Maistry Street,
                      Purasaiwakkam, Chennai, Tamil Nadu, India.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center text-sm text-muted-foreground pt-8 pb-4"
              >
                &copy; 2026 RIKNOVA FINTECH SOLUTIONS. All Rights Reserved.
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
