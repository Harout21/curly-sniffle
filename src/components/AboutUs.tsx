import { motion } from "framer-motion";

export function AboutUs() {
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
              {/* Decorative element for premium feel */}

              <img
                  src="https://images.unsplash.com/photo-1674065719169-5ba77e617e60?auto=format&fit=crop&q=80&w=1400"
                  alt="Artisanal door craftsmanship at Best Project workshop"
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
                Our Heritage
              </span>

                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                  Excellence in <span className="text-[#e54201]">Every Detail</span>
                </h2>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-6 text-gray-600 leading-relaxed text-lg"
              >
                <p>
                  For over two decades, **Best Project** has been a leader in
                  architectural millwork, combining traditional woodworking
                  craftsmanship with state-of-the-art precision technology.
                </p>

                <p>
                  Our expert artisans treat every piece as a signature statement.
                  Whether it's a grand entrance or bespoke interior furniture,
                  we ensure every product exceeds European quality standards.
                </p>
              </motion.div>

              {/* Stats - Refactored for SEO and impact */}
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
                    Years of Mastery
                  </dd>
                </div>

                <div className="flex flex-col gap-1 border-x border-slate-100 px-4">
                  <dt className="text-3xl md:text-4xl font-extrabold text-[#e54201]">5k+</dt>
                  <dd className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">
                    Installations
                  </dd>
                </div>

                <div className="flex flex-col gap-1">
                  <dt className="text-3xl md:text-4xl font-extrabold text-[#e54201]">100%</dt>
                  <dd className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">
                    Quality Guarantee
                  </dd>
                </div>
              </motion.dl>
            </div>

          </div>
        </div>
      </section>
  );
}