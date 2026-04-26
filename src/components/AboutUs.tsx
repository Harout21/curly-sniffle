import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import CategoryImage from "../images/33.jpeg";

export function AboutUs() {
  const { t } = useTranslation();

  return (
      <section id="about" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image Side */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
            >
              <img
                  src={CategoryImage}
                  alt={t("about.imageAlt")}
                  className="w-full h-[400px] md:h-[600px] object-cover rounded-2xl shadow-2xl relative z-10"
                  loading="lazy"
              />
            </motion.div>

            {/* Text Side */}
            <div className="space-y-8">
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-4"
              >
              <span className="inline-block text-[#e54201] uppercase tracking-[0.2em] text-xs font-bold px-3 py-1 bg-[#e54201]/10 rounded-full">
                {t("about.label")}
              </span>

                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                  {t("about.headingPart1")}{" "}
                  <span className="text-[#e54201]">{t("about.headingPart2")}</span>
                </h2>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-6 text-gray-600 leading-relaxed text-lg"
              >
                <p>{t("about.paragraph1")}</p>
                <p>{t("about.paragraph2")}</p>
              </motion.div>

              {/* Stats */}
              <motion.dl
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-3 gap-4 pt-10 border-t border-slate-100"
              >
                <div className="flex flex-col gap-1">
                  <dt className="text-3xl md:text-4xl font-extrabold text-[#e54201]">20+</dt>
                  <dd className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">
                    {t("about.stats.years")}
                  </dd>
                </div>

                <div className="flex flex-col gap-1 border-x border-slate-100 px-4">
                  <dt className="text-3xl md:text-4xl font-extrabold text-[#e54201]">5k+</dt>
                  <dd className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">
                    {t("about.stats.installations")}
                  </dd>
                </div>

                <div className="flex flex-col gap-1">
                  <dt className="text-3xl md:text-4xl font-extrabold text-[#e54201]">100%</dt>
                  <dd className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">
                    {t("about.stats.quality")}
                  </dd>
                </div>
              </motion.dl>
            </div>
          </div>
        </div>
      </section>
  );
}