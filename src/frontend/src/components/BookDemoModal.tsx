import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useBookDemoModal } from "@/hooks/useBookDemoModal";
import { ValidationError, useForm } from "@formspree/react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookDemoModal() {
  const { isOpen, closeModal } = useBookDemoModal();
  const [state, handleSubmit] = useForm("mlgylgdq");
  const formRef = useRef<HTMLFormElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus first field when modal opens
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => firstFieldRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        formRef.current?.reset();
      }, 250);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleDone = () => {
    closeModal();
  };

  const isSubmitting = state.submitting;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={isSubmitting ? undefined : closeModal}
            data-ocid="book_demo.backdrop"
          />

          {/* Modal Panel */}
          {/* biome-ignore lint/a11y/useSemanticElements: framer-motion requires a div for animation control */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-demo-title"
            className="glass-strong relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-elevated"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            data-ocid="book_demo.dialog"
          >
            {/* Decorative top glow */}
            <div className="pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              disabled={isSubmitting}
              aria-label="Close dialog"
              className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-muted/40 text-muted-foreground transition-smooth hover:bg-muted/70 hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              data-ocid="book_demo.close_button"
            >
              <X className="h-4 w-4" />
            </button>

            <AnimatePresence mode="wait">
              {state.succeeded ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center px-6 py-12 sm:px-10 sm:py-16 text-center"
                  data-ocid="book_demo.success_state"
                >
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/15 ring-1 ring-success/30"
                  >
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </motion.div>
                  <h2
                    id="book-demo-success-title"
                    className="font-display text-2xl font-bold text-foreground mb-3"
                  >
                    Demo Request Received
                  </h2>
                  <p className="text-muted-foreground leading-relaxed max-w-sm mb-8">
                    Thank you for your interest! Our team will contact you
                    within 24 hours to schedule your personalized demo.
                  </p>
                  <Button
                    onClick={handleDone}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow px-8"
                    data-ocid="book_demo.done_button"
                  >
                    Done
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 pt-8 pb-6 sm:px-8 sm:pt-10"
                >
                  {/* Header */}
                  <div className="mb-6 pr-10">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                      <Sparkles className="h-3 w-3 text-primary" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Book a Demo
                      </span>
                    </div>
                    <h2
                      id="book-demo-title"
                      className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2"
                    >
                      See RIKNOVA in Action
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Fill in your details and our team will reach out within 24
                      hours to schedule a personalized walkthrough.
                    </p>
                  </div>

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-4"
                    data-ocid="book_demo.form"
                  >
                    {/* Full Name — required */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="book-demo-fullName">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="book-demo-fullName"
                        ref={firstFieldRef}
                        type="text"
                        name="fullName"
                        autoComplete="name"
                        placeholder="Your full name"
                        required
                        disabled={isSubmitting}
                        data-ocid="book_demo.full_name.input"
                      />
                      <ValidationError
                        prefix="Full Name"
                        field="fullName"
                        errors={state.errors}
                        className="text-xs text-destructive"
                        data-ocid="book_demo.full_name.field_error"
                      />
                    </div>

                    {/* Company Name — optional */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="book-demo-company">Company Name</Label>
                      <Input
                        id="book-demo-company"
                        type="text"
                        name="companyName"
                        autoComplete="organization"
                        placeholder="Your company"
                        disabled={isSubmitting}
                        data-ocid="book_demo.company.input"
                      />
                      <ValidationError
                        prefix="Company Name"
                        field="companyName"
                        errors={state.errors}
                        className="text-xs text-destructive"
                        data-ocid="book_demo.company.field_error"
                      />
                    </div>

                    {/* Mobile + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="book-demo-mobile">
                          Mobile Number{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="book-demo-mobile"
                          type="tel"
                          name="mobileNumber"
                          autoComplete="tel"
                          placeholder="+91 9XXXXXXXXX"
                          required
                          disabled={isSubmitting}
                          data-ocid="book_demo.mobile.input"
                        />
                        <ValidationError
                          prefix="Mobile Number"
                          field="mobileNumber"
                          errors={state.errors}
                          className="text-xs text-destructive"
                          data-ocid="book_demo.mobile.field_error"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="book-demo-email">Email Address</Label>
                        <Input
                          id="book-demo-email"
                          type="email"
                          name="email"
                          autoComplete="email"
                          placeholder="you@company.com"
                          pattern={EMAIL_REGEX.source}
                          disabled={isSubmitting}
                          data-ocid="book_demo.email.input"
                        />
                        <ValidationError
                          prefix="Email"
                          field="email"
                          errors={state.errors}
                          className="text-xs text-destructive"
                          data-ocid="book_demo.email.field_error"
                        />
                      </div>
                    </div>

                    {/* Business Type + Location row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="book-demo-businessType">
                          Business Type
                        </Label>
                        <Input
                          id="book-demo-businessType"
                          type="text"
                          name="businessType"
                          placeholder="e.g. NBFC, Bank, Fintech"
                          disabled={isSubmitting}
                          data-ocid="book_demo.business_type.input"
                        />
                        <ValidationError
                          prefix="Business Type"
                          field="businessType"
                          errors={state.errors}
                          className="text-xs text-destructive"
                          data-ocid="book_demo.business_type.field_error"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="book-demo-location">
                          City / Location
                        </Label>
                        <Input
                          id="book-demo-location"
                          type="text"
                          name="cityLocation"
                          autoComplete="address-level2"
                          placeholder="e.g. Chennai, India"
                          disabled={isSubmitting}
                          data-ocid="book_demo.location.input"
                        />
                        <ValidationError
                          prefix="City / Location"
                          field="cityLocation"
                          errors={state.errors}
                          className="text-xs text-destructive"
                          data-ocid="book_demo.location.field_error"
                        />
                      </div>
                    </div>

                    {/* Message — optional */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="book-demo-message">
                        Message / Requirement
                      </Label>
                      <Textarea
                        id="book-demo-message"
                        name="message"
                        placeholder="Tell us about your requirements..."
                        rows={3}
                        disabled={isSubmitting}
                        data-ocid="book_demo.message.textarea"
                      />
                      <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                        className="text-xs text-destructive"
                        data-ocid="book_demo.message.field_error"
                      />
                    </div>

                    {/* Error banner */}
                    <AnimatePresence>
                      {state.errors && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-3"
                          data-ocid="book_demo.error_state"
                        >
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                          <p className="text-xs leading-relaxed text-destructive-foreground/90">
                            Something went wrong while submitting your request.
                            Please try again or contact us at
                            financeprofintech@gmail.com.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow text-base"
                      data-ocid="book_demo.submit_button"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Request
                        </>
                      )}
                    </Button>

                    {/* Trust footer */}
                    <div className="mt-1 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      <span>
                        Or email us at{" "}
                        <a
                          href="mailto:financeprofintech@gmail.com"
                          className="text-accent hover:underline"
                          data-ocid="book_demo.email_link"
                        >
                          financeprofintech@gmail.com
                        </a>
                      </span>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
