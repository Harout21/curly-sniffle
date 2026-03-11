import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
// @ts-ignore
import MAIN_LOGO from "../images/main.png"

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Process", href: "#process" },
  { name: "Technologies", href: "#technologies" },
  { name: "Products", href: "#products" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-1">
          <div className="flex items-center justify-between">
            <a
                href="#"
                className={`flex items-center gap-2 text-2xl transition-colors ${
                    isScrolled ? "text-primary" : "text-white"
                }`}
            >
              <img src={MAIN_LOGO} alt="logo" className="h-20 w-auto" />
              {/*<span>Best Project</span>*/}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm uppercase tracking-wider transition-colors hover:text-accent ${
                    isScrolled ? "text-primary" : "text-white"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 ${isScrolled ? "text-primary" : "text-white"}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 bg-white md:hidden"
            >
              {/* Close Button */}
              <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-6 right-6 text-primary"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="flex flex-col items-center justify-center h-full gap-8">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-2xl text-primary hover:text-accent transition-colors"
                    >
                      {link.name}
                    </a>
                ))}
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
