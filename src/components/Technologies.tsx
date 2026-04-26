import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import Material1 from "../images/14.jpeg";
import Material2 from "../images/29.jpeg";
import Material3 from "../images/30.jpeg";
import Material4 from "../images/31.jpeg";

export function Technologies() {
    const { t } = useTranslation();

    const materials = [
        {
            name: t("technologies.materials.premiumOak.name"),
            alt: t("technologies.materials.premiumOak.alt"),
            image: Material1,
            description: t("technologies.materials.premiumOak.description"),
        },
        {
            name: t("technologies.materials.walnutWood.name"),
            alt: t("technologies.materials.walnutWood.alt"),
            image: Material2,
            description: t("technologies.materials.walnutWood.description"),
        },
        {
            name: t("technologies.materials.cncTech.name"),
            alt: t("technologies.materials.cncTech.alt"),
            image: Material3,
            description: t("technologies.materials.cncTech.description"),
        },
        {
            name: t("technologies.materials.glassMetal.name"),
            alt: t("technologies.materials.glassMetal.alt"),
            image: Material4,
            description: t("technologies.materials.glassMetal.description"),
        },
    ];

    return (
        <section id="technologies" className="py-24 px-6 bg-white" aria-labelledby="tech-title">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
          <span className="text-[#e54201] uppercase tracking-[0.2em] text-xs font-bold px-3 py-1 mb-3 bg-[#e54201]/10 rounded-full">
            {t("technologies.workflow")}
          </span>

                    <h2 id="products-heading" className="text-4xl md:text-5xl font-bold tracking-tight mt-4 text-[#302c2b]">
                        {t("technologies.heading")}
                    </h2>
                </motion.div>

                <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0">
                    {materials.map((material, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-lg shadow-sm"
                        >
                            <figure className="aspect-[3/4] relative overflow-hidden m-0">
                                <img
                                    src={material.image}
                                    alt={material.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1817] via-[#302c2b]/30 to-transparent" />
                                <figcaption className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-xl font-bold mb-2 text-[#ffffff]">{material.name}</h3>
                                    <p className="text-gray-200 text-sm leading-relaxed">{material.description}</p>
                                </figcaption>
                            </figure>
                        </motion.li>
                    ))}
                </ul>

                <div className="sr-only">
                    {t("technologies.seoText")}
                </div>
            </div>
        </section>
    );
}