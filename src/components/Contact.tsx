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
    company: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("contact.alertMessage"));

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "",
      message: "",
    });
  };

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
      <section
          id="contact"
          className="py-24 px-4 md:px-6 bg-[#f5f5f5] overflow-hidden"
          aria-labelledby="contact-heading"
      >
        <div className="max-w-7xl mx-auto w-full">

          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
          >
          <span className="text-[#e54201] uppercase tracking-[0.2em] text-xs font-bold px-3 py-1 mb-3 bg-[#e54201]/10 rounded-full">
            {t("contact.workflow")}
          </span>

            <h2
                id="contact-heading"
                className="text-4xl md:text-5xl mt-4 font-bold tracking-tight"
            >
              {t("contact.heading")}
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 w-full max-w-full">

            {/* Contact Info */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full max-w-full"
            >
              <h3 className="text-2xl font-semibold mb-8 text-[#1a1a1a]">
                {t("contact.consultation")}
              </h3>

              <address className="not-italic space-y-6 mb-12">

                {/* Phone */}
                <a
                    href="tel:+37410123456"
                    className="flex items-start gap-4 group cursor-pointer w-full max-w-full"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center bg-white shadow-sm text-[#e54201] group-hover:bg-[#e54201] group-hover:text-white transition-all">
                    <Phone className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b] mb-1">
                      {t("contact.phoneLabel")}
                    </div>

                    <div className="text-lg text-[#1a1a1a] font-medium break-words">
                      +374 (10) 123-456
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                    href="mailto:info@doorandmore.am"
                    className="flex items-start gap-4 group cursor-pointer w-full max-w-full"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center bg-white shadow-sm text-[#e54201] group-hover:bg-[#e54201] group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b] mb-1">
                      {t("contact.emailLabel")}
                    </div>

                    <div className="text-lg text-[#1a1a1a] font-medium break-words">
                      info@doorandmore.am
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4 w-full max-w-full">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center bg-white shadow-sm text-[#e54201]">
                    <MapPin className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b] mb-1">
                      {t("contact.workshopLabel")}
                    </div>

                    <div className="text-lg text-[#1a1a1a] font-medium break-words">
                      {t("contact.workshopLocation")}
                    </div>
                  </div>
                </div>
              </address>

              {/* Map */}
              <div className="w-full max-w-full aspect-video lg:h-[420px] rounded-xl overflow-hidden shadow-md border border-gray-200">
                <iframe
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195160.8443907722!2d44.3484835!3d40.153369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406aa2dab8fc8b5b%3A0x3d1479ae87da5a72!2sYerevan%2C%20Armenia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    title={t("contact.mapTitle")}
                />
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white p-6 md:p-10 lg:p-12 rounded-2xl shadow-xl shadow-black/5 w-full max-w-full overflow-hidden lg:min-h-[600px]"
            >
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name */}
                <div className="grid gap-2">
                  <label className="text-sm font-bold text-gray-700">
                    {t("contact.fullNameLabel")}
                  </label>

                  <Input
                      name="name"
                      value={formData.name}
                      placeholder={t("contact.fullNamePlaceholder")}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border-gray-200"
                  />
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <label className="text-sm font-bold text-gray-700">
                    {t("contact.emailAddressLabel")}
                  </label>

                  <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder={t("contact.emailAddressPlaceholder")}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border-gray-200"
                  />
                </div>

                {/* Phone */}
                <div className="grid gap-2">
                  <label className="text-sm font-bold text-gray-700">
                    {t("contact.phoneNumberLabel")}
                  </label>

                  <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      placeholder={t("contact.phoneNumberPlaceholder")}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-gray-200"
                  />
                </div>

                {/* Company + Project */}
                <div className="grid md:grid-cols-2 gap-4">

                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-gray-700">
                      {t("contact.companyLabel")}
                    </label>

                    <Input
                        name="company"
                        value={formData.company}
                        placeholder={t("contact.companyPlaceholder")}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-gray-200"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-gray-700">
                      {t("contact.projectTypeLabel")}
                    </label>

                    <Input
                        name="projectType"
                        value={formData.projectType}
                        placeholder={t("contact.projectTypePlaceholder")}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-gray-200"
                    />
                  </div>

                </div>

                {/* Message */}
                <div className="grid gap-2">
                  <label className="text-sm font-bold text-gray-700">
                    {t("contact.projectDetailsLabel")}
                  </label>

                  <Textarea
                      name="message"
                      value={formData.message}
                      placeholder={t("contact.projectDetailsPlaceholder")}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-gray-50 border-gray-200"
                  />
                </div>

                <Button
                    type="submit"
                    className="w-full h-14 text-lg font-bold text-white bg-[#e54201] hover:bg-[#ff4b02] shadow-lg shadow-[#e54201]/20 transition-all active:scale-95"
                >
                  {t("contact.requestConsultation")}
                  <Send className="ml-2 h-5 w-5" />
                </Button>

              </form>
            </motion.div>

          </div>
        </div>
      </section>
  );
}