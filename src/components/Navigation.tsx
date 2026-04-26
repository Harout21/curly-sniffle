import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const navLinks = [
    { name: t("nav.about"), href: "#about", type: "scroll" },
    { name: t("nav.process"), href: "#process", type: "scroll" },
    { name: t("nav.technologies"), href: "#technologies", type: "scroll" },
    { name: t("nav.products"), href: "#products", type: "scroll" },
    { name: t("nav.projects"), href: "#projects", type: "scroll" },
    { name: t("nav.contact"), href: "#contact", type: "scroll" },
    { name: t("stones"), href: "/stones", type: "route" },
    { name: t("projects-all"), href: "/projects", type: "route" }
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);

    document.body.classList.remove("font-en", "font-hy", "font-ru");
    document.body.classList.add(`font-${lng}`);
  };

  const handleNavClick = (
      e: React.MouseEvent<HTMLAnchorElement>,
      link: any
  ) => {
    e.preventDefault();

    setIsMobileMenuOpen(false);

    // 🌐 ROUTES (like /stones, /projects)
    if (link.type === "route") {
      navigate(link.href);
      return;
    }

    // 📍 SCROLL LINKS (#about etc)
    const scrollToSection = () => {
      const element = document.querySelector(link.href);

      if (element) {
        const offset = 84;

        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;

        const offsetPosition = elementRect - bodyRect - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };

    // 🧠 IF NOT ON HOME → go home first
    if (window.location.pathname !== "/") {
      navigate("/");

      // wait for home to render
      setTimeout(() => {
        scrollToSection();
      }, 300);

      return;
    }

    // 🏠 already on home
    scrollToSection();
  };

  useEffect(() => {
    const lng = localStorage.getItem("lang") || i18n.language;
    changeLanguage(lng);
  }, []);

  const currentLang = languages.find((l) => l.code === i18n.language);

  return (
      <>
        {/* NAVBAR */}
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
                    navigate("/");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 transition-transform hover:scale-105"
              >
                <img src={MAIN_LOGO} alt="Logo" className="h-12 md:h-20 w-auto" />
              </a>

              {/* DESKTOP MENU */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                        className="text-sm font-bold uppercase tracking-widest text-[#302c2b] hover:text-[#e54201]"
                    >
                      {link.name}
                    </a>
                ))}

                {/* LANGUAGE */}
                <div className="relative">
                  <button
                      onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                      className="flex items-center gap-2 border px-2 py-1 rounded-md"
                  >
                    <img src={currentLang?.flag} className="w-5 h-5" />
                    <span>{currentLang?.label}</span>
                  </button>

                  {langDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg">
                        {languages.map((lang) => (
                            <div
                                key={lang.code}
                                onClick={() => {
                                  changeLanguage(lang.code);
                                  setLangDropdownOpen(false);
                                }}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              <img src={lang.flag} className="w-5 h-5" />
                              <span>{lang.label}</span>
                            </div>
                        ))}
                      </div>
                  )}
                </div>
              </div>

              {/* MOBILE BUTTON */}
              <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </motion.nav>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && (
              <motion.div
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  className="fixed inset-0 z-[60] bg-white md:hidden"
              >
                <div className="flex flex-col h-full">

                  {/* HEADER */}
                  <div className="flex justify-between p-4 border-b">
                    <img src={MAIN_LOGO} className="h-12" />
                    <button onClick={() => setIsMobileMenuOpen(false)}>
                      <X />
                    </button>
                  </div>

                  {/* LINKS */}
                  <div className="flex flex-col items-center gap-8 mt-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link)}
                            className="text-2xl font-bold"
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