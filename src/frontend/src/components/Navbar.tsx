import Logo from "@/components/Logo";
import SpectrumRail from "@/components/brand/SpectrumRail";
import { useBookDemoModal } from "@/hooks/useBookDemoModal";
import { useScrollDirection } from "@/hooks/useScrollReveal";
import { useLocation, useRouter } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Industries", href: "#industries" },
  { label: "Contact", href: "#contact" },
];

/** Stable section-id list for the scroll-spy (module scope so its identity
 * never changes between renders). */
const NAV_SECTION_IDS = ["products", "about", "industries", "contact"] as const;

/** Lightweight scroll-spy: returns the id of the section currently in view. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollDirection, scrollY } = useScrollDirection();
  const location = useLocation();
  const router = useRouter();
  const isHomePage = location.pathname === "/";
  const { openModal: openBookDemoModal } = useBookDemoModal();
  const activeSection = useActiveSection(NAV_SECTION_IDS);

  useEffect(() => {
    setIsScrolled(scrollY > 40);
  }, [scrollY]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (!isHomePage) {
      router.navigate({ to: "/", hash: href.slice(1) });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBookDemo = () => {
    setIsMobileMenuOpen(false);
    openBookDemoModal();
  };

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    if (!isHomePage) {
      router.navigate({ to: "/" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navbarVisible = scrollDirection !== "down" || scrollY < 200;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: navbarVisible ? 0 : -100 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? "bg-[var(--rk-navy)]/85 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo — official RIKNOVA asset via <Logo/> */}
            <button
              type="button"
              onClick={handleLogoClick}
              className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--rk-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rk-navy)]"
              data-ocid="navbar.logo_link"
              aria-label="RIKNOVA — back to top"
            >
              <Logo size={39} />
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => {
                const active = activeSection === link.href.slice(1);
                return (
                  <button
                    type="button"
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    data-active={active}
                    className={`rk-underline font-mono text-[12px] uppercase tracking-[0.14em] outline-none transition-colors duration-200 focus-visible:text-[var(--rk-ink)] ${
                      active
                        ? "text-[var(--rk-ink)]"
                        : "text-[var(--rk-slate)] hover:text-[var(--rk-ink)]"
                    }`}
                    data-ocid={`navbar.nav_${link.label.toLowerCase()}_link`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={() => handleNavClick("#contact")}
                className="rounded-lg px-3.5 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--rk-slate)] outline-none transition-colors hover:text-[var(--rk-ink)] focus-visible:ring-2 focus-visible:ring-[var(--rk-cyan)]"
                data-ocid="navbar.contact_sales_button"
              >
                Contact Sales
              </button>
              <button
                type="button"
                onClick={handleBookDemo}
                className="rk-btn-arc inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-display text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[var(--rk-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rk-navy)]"
                data-ocid="navbar.book_demo_button"
              >
                Book a demo
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-50 rounded-lg p-2 text-[var(--rk-ink)] outline-none transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-[var(--rk-cyan)] lg:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              data-ocid="navbar.mobile_menu_toggle"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
        {/* spectrum hairline — appears once the bar is solid */}
        <div
          className={`transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}
        >
          <SpectrumRail height={2} />
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-[color:var(--rk-navy)] backdrop-blur-xl" />
            <div
              className="rk-ledger pointer-events-none absolute inset-0 opacity-40"
              style={{
                maskImage:
                  "radial-gradient(90% 60% at 50% 30%, #000, transparent 85%)",
                WebkitMaskImage:
                  "radial-gradient(90% 60% at 50% 30%, #000, transparent 85%)",
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full flex-col items-start justify-center gap-8 px-8"
            >
              <div className="flex w-full flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 + 0.08 }}
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center gap-3 py-2 text-left font-display text-3xl font-semibold text-[var(--rk-ink)]"
                    data-ocid={`navbar.mobile_nav_${link.label.toLowerCase()}_link`}
                  >
                    <span
                      className="h-6 w-1 rounded-full"
                      style={{ background: "var(--rk-grad-bars)" }}
                    />
                    {link.label}
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex w-full max-w-xs flex-col gap-3"
              >
                <button
                  type="button"
                  onClick={() => handleNavClick("#contact")}
                  className="w-full rounded-xl border border-[var(--rk-hair-2)] py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[var(--rk-ink)]"
                  data-ocid="navbar.mobile_contact_sales_button"
                >
                  Contact Sales
                </button>
                <button
                  type="button"
                  onClick={handleBookDemo}
                  className="rk-btn-arc flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-display text-base font-semibold"
                  data-ocid="navbar.mobile_book_demo_button"
                >
                  Book a demo
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
