import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

// @ts-ignore
import MAIN_LOGO from "../images/main.png";
// @ts-ignore
import FLAG_US from "../images/en.png";
// @ts-ignore
import FLAG_AM from "../images/hy.png";
// @ts-ignore
import FLAG_RU from "../images/ru.png";

interface NavLink {
  id: string;
  name: string;
  href: string;
  type: "scroll" | "route";
}

const languages = [
  { code: "en", label: "English", flag: FLAG_US },
  { code: "hy", label: "Հայերեն", flag: FLAG_AM },
  { code: "ru", label: "Русский", flag: FLAG_RU },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks: NavLink[] = useMemo(() => [
    { id: "about", name: t("nav.about"), href: "#about", type: "scroll" },
    { id: "process", name: t("nav.process"), href: "#process", type: "scroll" },
    { id: "tech", name: t("nav.technologies"), href: "#technologies", type: "scroll" },
    { id: "products", name: t("nav.products"), href: "#products", type: "scroll" },
    { id: "projects", name: t("nav.projects"), href: "#projects", type: "scroll" },
    { id: "contact", name: t("nav.contact"), href: "#contact", type: "scroll" },
    { id: "stones", name: t("stones"), href: "/stones", type: "route" },
    { id: "projects-all", name: t("projects-all"), href: "/projects", type: "route" }
  ], [t]);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    document.body.classList.remove("font-en", "font-hy", "font-ru");
    document.body.classList.add(`font-${lng}`);
    setLangDropdownOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (link.type === "route") {
      navigate(link.href);
      return;
    }

    const scrollToSection = () => {
      const element = document.querySelector(link.href);
      if (element) {
        const offset = 84;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const offsetPosition = elementRect - bodyRect - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToSection, 300);
      return;
    }
    scrollToSection();
  };

  useEffect(() => {
    const lng = localStorage.getItem("lang") || i18n.language;
    changeLanguage(lng);
  }, []);

  return (
      <>
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100"
        >
          <div className="max-w-7xl mx-auto px-6 py-2">
            <div className="flex items-center justify-between">
              {/* LOGO */}
              <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (location.pathname !== "/") {
                      navigate("/");
                    } else {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="flex items-center gap-2 transition-transform hover:scale-105"
              >
                <img src={MAIN_LOGO} alt="Logo" className="h-12 xl:h-20 w-auto" />
              </a>

              {/* DESKTOP MENU - Visible ONLY above 1200px (using xl breakpoint) */}
              <div className="hidden xl:flex items-center gap-8">
                {navLinks.map((link) => (
                    <a
                        key={link.id}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                        className="text-sm font-bold uppercase tracking-widest text-[#302c2b] hover:text-[#e54201] transition-colors"
                    >
                      {link.name}
                    </a>
                ))}

                {/* LANGUAGE DROPDOWN */}
                <div className="relative">
                  <button
                      onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                      className="flex items-center gap-2 border px-2 py-1 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <img src={currentLang.flag} className="w-5 h-5 object-cover rounded-sm" alt="" />
                    <span className="text-sm font-medium">{currentLang.label}</span>
                  </button>

                  <AnimatePresence>
                    {langDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg py-1"
                        >
                          {languages.map((lang) => (
                              <button
                                  key={lang.code}
                                  onClick={() => changeLanguage(lang.code)}
                                  className="flex items-center w-full gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-left transition-colors"
                              >
                                <img src={lang.flag} className="w-5 h-5 object-cover rounded-sm" alt="" />
                                <span className="text-sm">{lang.label}</span>
                              </button>
                          ))}
                        </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* MOBILE/TABLET BUTTON - Visible up to 1200px */}
              <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="xl:hidden p-2 text-[#302c2b]"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </motion.nav>

        {/* MOBILE/TABLET MENU DRAWER */}
        <AnimatePresence>
          {isMobileMenuOpen && (
              <motion.div
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-0 z-[60] bg-white xl:hidden"
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center p-4 border-b">
                    <img src={MAIN_LOGO} className="h-12" alt="Logo" />
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                      <X size={32} />
                    </button>
                  </div>

                  <div className="flex flex-col items-center gap-6 mt-10 overflow-y-auto px-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link)}
                            className="text-2xl font-bold text-[#302c2b] hover:text-[#e54201] text-center w-full py-2"
                        >
                          {link.name}
                        </a>
                    ))}

                    {/* Language selection inside drawer for Tablet/Mobile */}
                    <div className="mt-8 pt-8 border-t w-full">
                      <p className="text-center text-gray-400 uppercase text-xs tracking-widest mb-4">Select Language</p>
                      <div className="flex flex-wrap justify-center gap-4">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                  changeLanguage(lang.code);
                                  setIsMobileMenuOpen(false);
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm transition-all ${
                                    i18n.language === lang.code ? 'bg-[#e54201] text-white border-[#e54201]' : 'bg-white text-[#302c2b]'
                                }`}
                            >
                              <img src={lang.flag} className="w-6 h-6 rounded-full border border-gray-200" alt="" />
                              <span className="font-bold">{lang.label}</span>
                            </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </>
  );
}