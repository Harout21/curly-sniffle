import { motion } from "motion/react";
import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useTranslation } from "react-i18next";

export function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('contact.alertMessage'));
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
      <section id="contact" className="py-24 px-6 bg-[#f5f5f5]" aria-labelledby="contact-heading">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
          >
          <span className="text-[#e54201] uppercase tracking-[0.2em] text-xs font-bold px-3 py-1 mb-3 bg-[#e54201]/10 rounded-full">
            {t('contact.workflow')}
          </span>
            <h2 id="contact-heading" className="text-4xl md:text-5xl mt-4 font-bold tracking-tight">
              {t('contact.heading')}
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Info Side */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-8 text-[#1a1a1a]">
                {t('contact.consultation')}
              </h3>

              <address className="not-italic space-y-6 mb-12">
                <a href="tel:+37410123456" className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm text-[#e54201] group-hover:bg-[#e54201] group-hover:text-white transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b] mb-1">{t('contact.phoneLabel')}</div>
                    <div className="text-lg text-[#1a1a1a] font-medium">+374 (10) 123-456</div>
                  </div>
                </a>

                <a href="mailto:info@doorandmore.am" className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm text-[#e54201] group-hover:bg-[#e54201] group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b] mb-1">{t('contact.emailLabel')}</div>
                    <div className="text-lg text-[#1a1a1a] font-medium">info@doorandmore.am</div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm text-[#e54201]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b] mb-1">{t('contact.workshopLabel')}</div>
                    <div className="text-lg text-[#1a1a1a] font-medium">{t('contact.workshopLocation')}</div>
                  </div>
                </div>
              </address>

              {/* Google Maps Embed */}
              <div className="aspect-video rounded-xl overflow-hidden shadow-md border border-gray-200">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195160.8443907722!2d44.3484835!3d40.153369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406aa2dab8fc8b5b%3A0x3d1479ae87da5a72!2sYerevan%2C%20Armenia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title={t('contact.mapTitle')}
                />
              </div>
            </motion.div>

            {/* Form Side */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-black/5"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-bold text-gray-700">{t('contact.fullNameLabel')}</label>
                  <Input
                      id="name"
                      name="name"
                      placeholder={t('contact.fullNamePlaceholder')}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-gray-700">{t('contact.emailAddressLabel')}</label>
                  <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t('contact.emailAddressPlaceholder')}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border-gray-200 focus:bg-white"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="phone" className="text-sm font-bold text-gray-700">{t('contact.phoneNumberLabel')}</label>
                  <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={t('contact.phoneNumberPlaceholder')}
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-gray-50 border-gray-200 focus:bg-white"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-bold text-gray-700">{t('contact.projectDetailsLabel')}</label>
                  <Textarea
                      id="message"
                      name="message"
                      placeholder={t('contact.projectDetailsPlaceholder')}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-gray-50 border-gray-200 focus:bg-white"
                  />
                </div>

                <Button
                    type="submit"
                    className="w-full h-14 text-lg font-bold text-white bg-[#e54201] hover:bg-[#ff4b02] shadow-lg shadow-[#e54201]/20 transition-all active:scale-95"
                >
                  {t('contact.requestConsultation')}
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
  );
}