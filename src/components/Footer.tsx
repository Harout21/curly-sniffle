import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl text-[#D4AF7A] mb-4">Door & More</h3>
              <p className="text-gray-400 leading-relaxed">
                Crafting premium furniture and doors with passion and precision since 2004.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                      href="#about"
                      className="text-gray-400 hover:text-[#D4AF7A] transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                      href="#products"
                      className="text-gray-400 hover:text-[#D4AF7A] transition-colors"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                      href="#projects"
                      className="text-gray-400 hover:text-[#D4AF7A] transition-colors"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                      href="#contact"
                      className="text-gray-400 hover:text-[#D4AF7A] transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social & Newsletter */}
            <div>
              <h4 className="text-lg mb-4">Connect With Us</h4>
              <div className="flex gap-4 mb-6">
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-[#D4AF7A] flex items-center justify-center transition-colors"
                    aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-[#D4AF7A] flex items-center justify-center transition-colors"
                    aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-[#D4AF7A] flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                    href="mailto:info@doorandmore.am"
                    className="w-10 h-10 bg-gray-800 hover:bg-[#D4AF7A] flex items-center justify-center transition-colors"
                    aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <p className="text-sm text-gray-400">
                Stay updated with our latest projects and offers
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {currentYear} Door & More. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#D4AF7A] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#D4AF7A] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
}
