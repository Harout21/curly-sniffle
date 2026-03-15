import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
// @ts-ignore
import MAIN_LOGO from "../images/main.png";
// @ts-ignore
import FLAG_US from "../images/en.png";
// @ts-ignore
import FLAG_AM from "../images/hy.png";
// @ts-ignore
import FLAG_RU from "../images/ru.png";

const languages = [
  { code: "en", label: "English", flag: FLAG_US },
  { code: "hy", label: "Հայերեն", flag: FLAG_AM },
  { code: "ru", label: "Русский", flag: FLAG_RU },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { i18n, t } = useTranslation();

  const navLinks = [
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.process"), href: "#process" },
    { name: t("nav.technologies"), href: "#technologies" },
    { name: t("nav.products"), href: "#products" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 84;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setIsMobileMenuOpen(false);
    }
  };

  const currentLang = languages.find((l) => l.code === i18n.language);

  return (
      <>
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100"
        >
          <div className="max-w-7xl mx-auto px-6 py-2">
            <div className="flex items-center justify-between">

              {/* Logo */}
              <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 transition-transform hover:scale-105"
                  aria-label="Door & More Home"
              >
                <img src={MAIN_LOGO} alt="Door & More Logo" className="h-12 md:h-20 w-auto" />
              </a>

              {/* Desktop Navigation */}
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

                {/* Language Switcher */}
                <div className="relative">
                  <button
                      onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                      className="flex items-center gap-2 border border-gray-200 rounded-md px-2 py-1 text-sm font-semibold text-[#302c2b] hover:border-[#e54201]"
                  >
                    <img src={currentLang?.flag} alt="" className="w-5 h-5" />
                    <span>{currentLang?.label}</span>
                  </button>
                  {langDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                        {languages.map((lang) => (
                            <div
                                key={lang.code}
                                onClick={() => {
                                  changeLanguage(lang.code);
                                  setLangDropdownOpen(false);
                                }}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              <img src={lang.flag} alt="" className="w-5 h-5" />
                              <span>{lang.label}</span>
                            </div>
                        ))}
                      </div>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-[#302c2b] hover:text-[#e54201] transition-colors"
                  aria-label={isMobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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

                  {/* Mobile Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <img src={MAIN_LOGO} alt="logo" className="h-12 w-auto" />
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-[#e54201]"
                    >
                      <X className="w-8 h-8" />
                    </button>
                  </div>

                  {/* Mobile Navigation */}
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

                    {/* Mobile Language Switcher */}
                    <div className="relative mt-6">
                      <button
                          onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                          className="flex items-center gap-2 border border-gray-200 rounded-md px-4 py-2 text-lg font-semibold text-[#302c2b]"
                      >
                        <img src={currentLang?.flag} alt="" className="w-6 h-6" />
                        <span>{currentLang?.label}</span>
                      </button>
                      {langDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                            {languages.map((lang) => (
                                <div
                                    key={lang.code}
                                    onClick={() => {
                                      changeLanguage(lang.code);
                                      setLangDropdownOpen(false);
                                      setIsMobileMenuOpen(false);
                                    }}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                  <img src={lang.flag} alt="" className="w-5 h-5" />
                                  <span>{lang.label}</span>
                                </div>
                            ))}
                          </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </>
  );
}