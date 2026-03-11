import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Modern Living Space",
    location: "Yerevan, Armenia",
    alt: "Modern luxury living room interior featuring custom woodwork in Yerevan",
    image: "https://images.unsplash.com/photo-1613545325268-9265e1609167?auto=format&fit=crop&q=80&w=1080",
  },
  {
    title: "Contemporary Bedroom",
    location: "Yerevan, Armenia",
    alt: "Contemporary bedroom furniture and custom wardrobes in Yerevan",
    image: "https://images.unsplash.com/photo-1750420556288-d0e32a6f517b?auto=format&fit=crop&q=80&w=1080",
  },
  {
    title: "Executive Office",
    location: "Yerevan, Armenia",
    alt: "Premium executive office interior design and custom desk in Armenia",
    image: "https://images.unsplash.com/photo-1737233347389-24bc3f3fe3a1?auto=format&fit=crop&q=80&w=1080",
  },
  {
    title: "Luxury Kitchen",
    location: "Yerevan, Armenia",
    alt: "Luxury custom kitchen cabinets and woodwork installation in Yerevan",
    image: "https://images.unsplash.com/photo-1758548157243-f4ef3e614684?auto=format&fit=crop&q=80&w=1080",
  },
];

export function Projects() {
  return (
      <section id="portfolio" className="py-24 px-6 bg-[#f8f8f8]" aria-labelledby="portfolio-title">
        <div className="max-w-7xl mx-auto">

          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
          >
            <span className="text-[#e54201] uppercase tracking-[0.2em] text-xs font-bold px-3 py-1 mb-3 bg-[#e54201]/10 rounded-full">
            Our Workflow
          </span>
            <h2 id="portfolio-title" className="text-4xl md:text-5xl font-bold tracking-tight mt-4 text-[#302c2b]">
              Recent Completed Projects
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
                <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-lg cursor-pointer bg-white shadow-sm"
                >
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.alt}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        loading="lazy"
                    />

                    {/* Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1817] via-[#1a1817]/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                    <div className="absolute inset-0 flex items-end p-8">
                      <div className="w-full">
                        <div className="flex items-end justify-between">
                          <div className="space-y-1">
                            <h3 className="text-white text-2xl font-bold group-hover:text-[#e54201] transition-colors duration-300">
                              {project.title}
                            </h3>
                            <p className="text-white/80 text-sm flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-[#e54201] rounded-full inline-block" />
                              {project.location}
                            </p>
                          </div>

                          <div className="mb-1 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm">
                            <ArrowUpRight className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
            ))}
          </div>

          {/* Hidden local SEO content */}
          <div className="sr-only">
            Showcasing architectural woodwork and custom furniture projects across Armenia,
            specifically in Yerevan. Our portfolio includes modern living spaces,
            luxury kitchen installations, and executive office designs.
          </div>
        </div>
      </section>
  );
}