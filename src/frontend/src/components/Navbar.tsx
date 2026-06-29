import { Button } from "@/components/ui/button";
import { useBookDemoModal } from "@/hooks/useBookDemoModal";
import { useScrollDirection } from "@/hooks/useScrollReveal";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Industries", href: "#industries" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollDirection, scrollY } = useScrollDirection();
  const location = useLocation();
  const router = useRouter();
  const isHomePage = location.pathname === "/";
  const { openModal: openBookDemoModal } = useBookDemoModal();

  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-glass"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <button
              type="button"
              onClick={handleLogoClick}
              className="flex items-center gap-2 group"
              data-ocid="navbar.logo_link"
            >
              <img
                src="/assets/images/logo/riknova-logo-dark.png"
                alt="RIKNOVA Fintech Solutions"
                className="h-8 w-auto"
              />
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md hover:bg-muted/50"
                  data-ocid={`navbar.nav_${link.label.toLowerCase()}_link`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavClick("#contact")}
                className="text-muted-foreground hover:text-foreground"
                data-ocid="navbar.contact_sales_button"
              >
                Contact Sales
              </Button>
              <Button
                size="sm"
                onClick={handleBookDemo}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
                data-ocid="navbar.book_demo_button"
              >
                Book Demo
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50 p-2 rounded-lg hover:bg-muted/50 transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              data-ocid="navbar.mobile_menu_toggle"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative flex flex-col items-center justify-center h-full gap-8 px-6"
            >
              <div className="flex flex-col items-center gap-6">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-2xl font-display font-semibold text-foreground hover:text-primary transition-colors"
                    data-ocid={`navbar.mobile_nav_${link.label.toLowerCase()}_link`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-col gap-3 w-full max-w-xs"
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleNavClick("#contact")}
                  className="w-full"
                  data-ocid="navbar.mobile_contact_sales_button"
                >
                  Contact Sales
                </Button>
                <Button
                  size="lg"
                  onClick={handleBookDemo}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
                  data-ocid="navbar.mobile_book_demo_button"
                >
                  Book Demo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
