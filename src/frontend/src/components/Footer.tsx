import Logo from "@/components/Logo";
import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Finance Pro", href: "#products" },
    { label: "Features", href: "#finance-pro" },
    { label: "Pricing", href: "#contact" },
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

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Mail, href: "mailto:financeprofintech@gmail.com", label: "Email" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (href: string) => {
    if (href.startsWith("#") && href !== "#") {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderFooterLink = (link: { label: string; href: string }) => {
    const isInternalRoute = link.href.startsWith("/");
    const isAnchor = link.href.startsWith("#");

    if (isInternalRoute) {
      return (
        <Link
          to={link.href}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          data-ocid={`footer.link_${link.label.toLowerCase().replace(/\s+/g, "_")}`}
        >
          {link.label}
        </Link>
      );
    }

    if (isAnchor) {
      return (
        <button
          type="button"
          onClick={() => handleLinkClick(link.href)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          data-ocid={`footer.link_${link.label.toLowerCase().replace(/\s+/g, "_")}`}
        >
          {link.label}
        </button>
      );
    }

    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        data-ocid={`footer.link_${link.label.toLowerCase().replace(/\s+/g, "_")}`}
      >
        {link.label}
      </a>
    );
  };

  return (
    <footer className="relative border-t border-border/50 bg-card/40 backdrop-blur-sm">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <button
              type="button"
              onClick={handleLogoClick}
              className="flex items-center gap-2 mb-6"
              data-ocid="footer.logo_link"
            >
              <Logo size={36} />
            </button>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              Building intelligent financial infrastructure for modern
              enterprises. Secure, scalable, and future-ready fintech solutions.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-accent" />
                <span>financeprofintech@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-accent" />
                <span>+91 9363770295</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                <span>
                  50/1, Ground Floor, Narayana Maistry Street, Purasaiwakkam,
                  Chennai, Tamilnadu, India.
                </span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>{renderFooterLink(link)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>{renderFooterLink(link)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>{renderFooterLink(link)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} RIKNOVA. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                  data-ocid={`footer.social_${social.label.toLowerCase()}_link`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
