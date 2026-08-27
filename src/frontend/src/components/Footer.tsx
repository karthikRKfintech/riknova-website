import Logo from "@/components/Logo";
import { Link } from "@tanstack/react-router";

/**
 * Footer — Phase 2J "quiet brand close".
 *
 * The final settling of the navy closing zone: a near-black ground continuing
 * from Contact, the official RIKNOVA lockup, one factual descriptor, a compact
 * email route, lean navigation, legal routes and a dynamic copyright. No
 * marketing blurb, no CTA, no social cluster, no glass — restraint by design.
 */

const footerLinks = {
  product: [
    { label: "Finance Pro", href: "#products" },
    { label: "Features", href: "#finance-pro" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms and Conditions", href: "/terms" },
  ],
};

const linkClass =
  "text-sm text-[var(--rk-slate)] outline-none transition-colors hover:text-[var(--rk-ink)] focus-visible:text-[var(--rk-ink)] focus-visible:ring-2 focus-visible:ring-[var(--rk-cyan)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#05080f] rounded-sm";

function renderFooterLink(link: { label: string; href: string }) {
  const ocid = `footer.link_${link.label.toLowerCase().replace(/\s+/g, "_")}`;

  if (link.href.startsWith("/")) {
    return (
      <Link to={link.href} className={linkClass} data-ocid={ocid}>
        {link.label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        const el = document.querySelector(link.href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className={`${linkClass} text-left`}
      data-ocid={ocid}
    >
      {link.label}
    </button>
  );
}

function LinkGroup({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--rk-slate)]/70">
        {heading}
      </h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>{renderFooterLink(link)}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#05080f]">
      {/* one precise top hairline — the system settling into its final state */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--rk-hair)" }}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-5">
            <button
              type="button"
              onClick={handleLogoClick}
              className="inline-flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--rk-cyan)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#05080f]"
              data-ocid="footer.logo_link"
              aria-label="RIKNOVA — back to top"
            >
              <Logo size={38} />
            </button>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-[var(--rk-slate)]">
              Finance software for lending and finance businesses.
            </p>
            <a
              href="mailto:hello@riknova.com"
              className="mt-6 inline-block text-sm font-medium text-[var(--rk-ink)] outline-none transition-colors hover:text-[var(--rk-cyan)] focus-visible:text-[var(--rk-cyan)] focus-visible:ring-2 focus-visible:ring-[var(--rk-cyan)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#05080f] rounded-sm"
              data-ocid="footer.email_link"
            >
              hello@riknova.com
            </a>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-7 lg:gap-8"
          >
            <LinkGroup heading="Product" links={footerLinks.product} />
            <LinkGroup heading="Company" links={footerLinks.company} />
            <LinkGroup heading="Legal" links={footerLinks.legal} />
          </nav>
        </div>
      </div>

      {/* Bottom rail */}
      <div
        className="relative"
        style={{ borderTop: "1px solid var(--rk-hair)" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-xs text-[var(--rk-slate)]/80">
            &copy; {currentYear} RIKNOVA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
