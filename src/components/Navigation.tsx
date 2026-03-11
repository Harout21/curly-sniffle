import { useState } from "react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      // Offset for the fixed header height (~84px)
      const offset = 84;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      setIsMobileMenuOpen(false);
    }
  };

  return (
      <>
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            /* Background is now hardcoded to white with a shadow */
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100"
        >
          <div className="max-w-7xl mx-auto px-6 py-2">
            <div className="flex items-center justify-between">
              <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="flex items-center gap-2 transition-transform hover:scale-105"
                  aria-label="Door & More Home"
              >
                {/* Logo height adjusted for better visibility on white bg */}
                <img src={MAIN_LOGO} alt="Door & More Logo" className="h-16 w-auto" />
              </a>

              {/* Desktop Navigation - Text color is now always dark/primary */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-sm font-bold uppercase tracking-widest text-[#302c2b] hover:text-[#e54201] transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                ))}
              </div>

              {/* Mobile Menu Button - Color is now always dark */}
              <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-[#302c2b] hover:text-[#e54201] transition-colors"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-0 z-[60] bg-white md:hidden"
              >
                <div className="flex flex-col h-full">
                  {/* Header inside mobile menu to keep branding visible */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <img src={MAIN_LOGO} alt="logo" className="h-12 w-auto" />
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-[#e54201]"
                    >
                      <X className="w-8 h-8" />
                    </button>
                  </div>

                  <div className="flex flex-col items-center justify-center flex-grow gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-3xl font-bold text-[#302c2b] hover:text-[#e54201] transition-colors"
                        >
                          {link.name}
                        </a>
                    ))}
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </>
  );
}