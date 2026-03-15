import { motion } from "framer-motion";
import { Pencil, Hammer, Sparkles, PackageCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ProductionProcess() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Pencil,
      title: t("process.steps.design.title"),
      description: t("process.steps.design.description"),
    },
    {
      icon: Hammer,
      title: t("process.steps.craftsmanship.title"),
      description: t("process.steps.craftsmanship.description"),
    },
    {
      icon: Sparkles,
      title: t("process.steps.finishing.title"),
      description: t("process.steps.finishing.description"),
    },
    {
      icon: PackageCheck,
      title: t("process.steps.delivery.title"),
      description: t("process.steps.delivery.description"),
    },
  ];

  return (
      <section id="process" className="py-24 px-6 bg-[#fcfcfc] overflow-hidden">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
          >
          <span className="text-[#e54201] uppercase tracking-[0.2em] text-xs font-bold px-3 py-1 bg-[#e54201]/10 rounded-full">
            {t("process.label")}
          </span>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mt-4">
              {t("process.heading")}
            </h2>
            <div className="w-20 h-1 bg-[#e54201] mx-auto mt-6 rounded-full" />
          </motion.div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      viewport={{ once: true }}
                      className="group relative"
                  >
                    {/* Card Container */}
                    <div className="relative bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:border-[#e54201]/20 hover:shadow-xl transition-all duration-500 h-full z-10 overflow-hidden">

                      {/* Hover Accent Background */}
                      <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-[#e54201]/5 rounded-full group-hover:scale-[3] transition-transform duration-700" />

                      {/* Icon & Number Header */}
                      <div className="flex justify-between items-start mb-8">
                        <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center group-hover:bg-[#e54201] transition-colors duration-300 shadow-lg">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-5xl font-black text-slate-50 group-hover:text-slate-100 transition-colors">
                      0{index + 1}
                    </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#e54201] transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-slate-600 leading-relaxed relative z-10">
                        {step.description}
                      </p>
                    </div>

                    {/* Decorative Connector (Desktop Only) */}
                    {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[1px] bg-slate-200 z-0" />
                    )}
                  </motion.div>
              );
            })}
          </div>
        </div>
      </section>
  );
}