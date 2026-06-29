import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Link } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { ArrowLeft, Mail, Shield } from "lucide-react";
import { motion } from "motion/react";
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
              Last updated: 19 March 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Section 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                1. Information We Collect
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Depending on the product or service you use, we may collect
                  information including:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Name</li>
                  <li>Business Name</li>
                  <li>Mobile Number</li>
                  <li>Email Address</li>
                  <li>Address</li>
                  <li>Login Credentials</li>
                  <li>Customer Information entered by you</li>
                  <li>Loan Records</li>
                  <li>Collection Records</li>
                  <li>Financial Transactions</li>
                  <li>Reports</li>
                  <li>Analytics</li>
                  <li>Device Information</li>
                  <li>Browser Information</li>
                  <li>IP Address</li>
                  <li>Log Information</li>
                  <li>Usage Statistics</li>
                </ul>
                <p>
                  Some products may collect additional information necessary to
                  provide requested features.
                </p>
              </div>
            </motion.div>

            {/* Section 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                2. Customer Data
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Our software allows businesses to securely maintain and manage
                  their operational records.
                </p>
                <p>Examples include:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Customer records</li>
                  <li>Loan details</li>
                  <li>Collection entries</li>
                  <li>Payment history</li>
                  <li>Expenses</li>
                  <li>Reports</li>
                  <li>Uploaded documents</li>
                  <li>Images</li>
                  <li>Business settings</li>
                </ul>
                <p>
                  All customer data entered into our software remains the
                  property of the respective customer or business using our
                  services.
                </p>
                <p>RIKNOVA acts solely as the software service provider.</p>
              </div>
            </motion.div>

            {/* Section 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                3. How We Use Information
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>Information collected may be used to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Provide software functionality</li>
                  <li>Authenticate users</li>
                  <li>Synchronize information across devices</li>
                  <li>Generate reports and analytics</li>
                  <li>Improve product performance</li>
                  <li>Provide customer support</li>
                  <li>Send service-related notifications</li>
                  <li>Maintain platform security</li>
                  <li>Prevent fraud and misuse</li>
                  <li>Comply with applicable laws</li>
                </ul>
                <p>We never sell your personal information.</p>
              </div>
            </motion.div>

            {/* Section 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                4. Cloud Storage
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Your information may be securely stored using trusted cloud
                  infrastructure providers and secure database services.
                </p>
                <p>
                  These services are used solely for delivering the requested
                  software functionality.
                </p>
              </div>
            </motion.div>

            {/* Section 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                5. Data Security
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>Protecting customer information is a high priority.</p>
                <p>We implement appropriate security measures including:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Secure HTTPS communication</li>
                  <li>Authentication controls</li>
                  <li>Role-based access permissions</li>
                  <li>Password protection</li>
                  <li>Secure cloud infrastructure</li>
                  <li>Regular software updates</li>
                  <li>Backup procedures</li>
                </ul>
                <p>
                  While we take reasonable precautions, no internet-based
                  service can guarantee absolute security.
                </p>
              </div>
            </motion.div>

            {/* Section 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                6. Third-Party Services
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Our software may integrate with trusted third-party providers
                  for services such as:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Authentication</li>
                  <li>Email delivery</li>
                  <li>SMS delivery</li>
                  <li>Payment processing</li>
                  <li>Cloud hosting</li>
                  <li>Analytics</li>
                  <li>File storage</li>
                </ul>
                <p>
                  These providers process information only as necessary to
                  provide the requested functionality.
                </p>
              </div>
            </motion.div>

            {/* Section 7 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                7. Data Sharing
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  RIKNOVA does <strong className="text-foreground">NOT</strong>:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Sell personal information</li>
                  <li>Rent customer information</li>
                  <li>Share customer databases for advertising</li>
                  <li>Share business data for marketing purposes</li>
                </ul>
                <p>Information may only be disclosed:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>When required by applicable law</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our legal rights</li>
                  <li>To investigate fraud or security incidents</li>
                </ul>
              </div>
            </motion.div>

            {/* Section 8 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                8. Data Retention
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Information is retained only as long as necessary to provide
                  our services or comply with applicable legal obligations.
                </p>
                <p>
                  Certain information may remain in secure backups for disaster
                  recovery purposes.
                </p>
              </div>
            </motion.div>

            {/* Section 9 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                9. Data Deletion
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Users may delete business records directly from supported
                  products.
                </p>
                <p>Examples include:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Customers</li>
                  <li>Loans</li>
                  <li>Collections</li>
                  <li>Expenses</li>
                  <li>Transactions</li>
                  <li>Reports</li>
                </ul>
                <p>
                  Deleted information may remain in encrypted backup systems for
                  a limited period before permanent removal.
                </p>
              </div>
            </motion.div>

            {/* Section 10 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                10. Account Deletion
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Users may permanently delete their account from supported
                  applications.
                </p>
                <p>For Finance Pro:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Open the application</li>
                  <li>
                    Navigate to{" "}
                    <strong className="text-foreground">Settings</strong>
                  </li>
                  <li>
                    Select{" "}
                    <strong className="text-foreground">Delete Account</strong>
                  </li>
                  <li>Confirm deletion</li>
                </ul>
                <p>
                  After confirmation, account deletion will proceed according to
                  our retention policy.
                </p>
                <p>
                  If assistance is required, contact us using the details below.
                </p>
              </div>
            </motion.div>

            {/* Section 11 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                11. Cookies &amp; Website Analytics
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>Our websites may use cookies and similar technologies to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Improve website functionality</li>
                  <li>Remember user preferences</li>
                  <li>Analyze website traffic</li>
                  <li>Enhance user experience</li>
                </ul>
                <p>Users may disable cookies through their browser settings.</p>
              </div>
            </motion.div>

            {/* Section 12 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                12. Children&apos;s Privacy
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>Our products are intended for business users.</p>
                <p>
                  We do not knowingly collect personal information from children
                  under 18 years of age.
                </p>
              </div>
            </motion.div>

            {/* Section 13 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                13. Changes to this Privacy Policy
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>We may revise this Privacy Policy periodically.</p>
                <p>
                  The latest version will always be available on our official
                  website.
                </p>
                <p>
                  Continued use of our products after updates constitutes
                  acceptance of the revised Privacy Policy.
                </p>
              </div>
            </motion.div>

            {/* Section 14 - Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  14. Contact Information
                </h2>
              </div>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p className="text-foreground font-semibold">
                  RIKNOVA FINTECH SOLUTIONS
                </p>
                <div className="space-y-2">
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
                      +91 93637 70295
                    </a>
                  </p>
                  <p>
                    <span className="text-foreground font-medium">
                      Address:
                    </span>{" "}
                    50/1, Ground Floor, Narayana Maistry Street, Purasaiwakkam,
                    Chennai, Tamil Nadu, India.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="text-center text-sm text-muted-foreground pt-8"
            >
              &copy; 2026 RIKNOVA FINTECH SOLUTIONS. All Rights Reserved.
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
