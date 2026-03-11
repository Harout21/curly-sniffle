import { Facebook, Instagram, Linkedin, Mail, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
      <footer className="bg-[#111111] text-white py-16 border-t border-white/5" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Brand & Mission */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold text-[#e54201] mb-6 tracking-tight">
              Best Project
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Setting the standard in premium architectural woodwork and custom furniture across Armenia since 2004.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={14} className="text-[#e54201]" />
                <span>Best Project {currentYear} All rights reserved.</span>
              </div>
            </div>

            {/* Product Categories (SEO Keywords) */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6">Products</h4>
              <ul className="space-y-3">
                {['Interior Doors', 'Entrance Doors', 'Kitchen Cabinets', 'Custom Furniture'].map((item) => (
                    <li key={item}>
                      <a href="#products" className="text-gray-400 hover:text-[#e54201] transition-all duration-300 flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-700 rounded-full" />
                        {item}
                      </a>
                    </li>
                ))}
              </ul>
            </div>

            {/* Quick Navigation */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-gray-400 hover:text-[#e54201] transition-colors">Our Story</a></li>
                <li><a href="#process" className="text-gray-400 hover:text-[#e54201] transition-colors">Production Process</a></li>
                <li><a href="#portfolio" className="text-gray-400 hover:text-[#e54201] transition-colors">Recent Projects</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-[#e54201] transition-colors">Get an Estimate</a></li>
              </ul>
            </div>

            {/* Social & Contact */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6">Social Presence</h4>
              <div className="flex gap-3 mb-8">
                {[
                  { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com", label: "Follow on Facebook" },
                  { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com", label: "Follow on Instagram" },
                  { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com", label: "Connect on LinkedIn" },
                  { icon: <Mail className="w-5 h-5" />, href: "mailto:info@doorandmore.am", label: "Email Us" }
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
                Premium Craftsmen <br /> Verified Local Business
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-gray-500">
            <div className="order-2 md:order-1">
              © {currentYear} Best Project Architectural Woodworking.
            </div>

            <div className="flex gap-8 order-1 md:order-2">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/sitemap.xml" className="hover:text-white transition-colors hidden md:block">Sitemap</a>
            </div>
          </div>

        </div>
      </footer>
  );
}