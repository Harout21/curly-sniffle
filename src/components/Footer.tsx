import { Facebook, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
      <footer className="bg-[#111111] text-white py-16 border-t border-white/5" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Brand & Mission */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold text-[#e54201] mb-6 tracking-tight">
                {t('footer.brand')}
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                {t('footer.mission')}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={14} className="text-[#e54201]" />
                <span>{t('footer.rights', { year: currentYear })}</span>
              </div>
            </div>

            {/* Product Categories (SEO Keywords) */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6">
                {t('footer.productsTitle')}
              </h4>
              <ul className="space-y-3">
                {['interiorDoors', 'entranceDoors', 'kitchenCabinets', 'customFurniture'].map((key) => (
                    <li key={key}>
                      <a href="#products" className="text-gray-400 hover:text-[#e54201] transition-all duration-300 flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-700 rounded-full" />
                        {t(`footer.products.${key}`)}
                      </a>
                    </li>
                ))}
              </ul>
            </div>

            {/* Quick Navigation */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6">
                {t('footer.companyTitle')}
              </h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-gray-400 hover:text-[#e54201] transition-colors">{t('footer.company.ourStory')}</a></li>
                <li><a href="#process" className="text-gray-400 hover:text-[#e54201] transition-colors">{t('footer.company.productionProcess')}</a></li>
                <li><a href="#portfolio" className="text-gray-400 hover:text-[#e54201] transition-colors">{t('footer.company.recentProjects')}</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-[#e54201] transition-colors">{t('footer.company.getEstimate')}</a></li>
              </ul>
            </div>

            {/* Social & Contact */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6">
                {t('footer.socialTitle')}
              </h4>
              <div className="flex gap-3 mb-8">
                {[
                  { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com", label: t('footer.social.facebook') },
                  { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com", label: t('footer.social.instagram') },
                  { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com", label: t('footer.social.linkedin') },
                  { icon: <Mail className="w-5 h-5" />, href: "mailto:info@doorandmore.am", label: t('footer.social.email') }
                ].map((social, i) => (
                    <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 bg-white/5 hover:bg-[#e54201] flex items-center justify-center transition-all rounded-lg"
                        aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                ))}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-tighter">
                {t('footer.craftsmen')}
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-gray-500">
            <div className="order-2 md:order-1">
              {t('footer.bottomBar', { year: currentYear })}
            </div>

            <div className="flex gap-8 order-1 md:order-2">
              <a href="/privacy" className="hover:text-white transition-colors">{t('footer.privacyPolicy')}</a>
              <a href="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</a>
              <a href="/sitemap.xml" className="hover:text-white transition-colors hidden md:block">{t('footer.sitemap')}</a>
            </div>
          </div>
        </div>
      </footer>
  );
}