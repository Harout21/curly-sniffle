import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import CategoryImage from "../images/33.jpeg";

const clients = [
  { name: "Tumo", logo: new URL("../images/logos/tumo.jpg", import.meta.url).href },
  { name: "Ameriabank", logo: new URL("../images/logos/ameria.png", import.meta.url).href },
  { name: "SAS Grup", logo: new URL("../images/logos/sas.png", import.meta.url).href },
  { name: "UWC Dilijan", logo: new URL("../images/logos/uwc.png", import.meta.url).href },
  { name: "Dvin Hotel", logo: new URL("../images/logos/dvin.jpg", import.meta.url).href },
  { name: "Renshin", logo: new URL("../images/logos/renshin.png", import.meta.url).href },
];

export function AboutUs() {
  const { t } = useTranslation();

  return (
      <section id="about" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">

          {/* Main Grid */}
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

          {/* Trusted By Strip */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-20 pt-12 border-t border-slate-100"
          >
            <p className="text-center text-xs uppercase tracking-[0.25em] font-bold mb-10">
              {t("about.trustedBy")}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8">
              {clients.map((client, i) => (
                  <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      viewport={{ once: true }}
                      className="w-32 h-20 flex items-center justify-center"  // ← fixed box, all same size
                  >
                    <img
                        src={client.logo}
                        alt={client.name}
                        className="max-w-full max-h-full object-contain grayscale hover:grayscale-0
                   opacity-50 hover:opacity-100 transition-all duration-300"
                    />
                  </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
  );
}