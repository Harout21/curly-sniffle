import { motion } from "motion/react";

const materials = [
  {
    name: "Premium Oak",
    alt: "Sustainable premium oak wood texture for custom door manufacturing",
    image: "https://images.unsplash.com/photo-1758548157195-67d141468467?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Sourced from sustainable forests for long-lasting structural integrity.",
  },
  {
    name: "Walnut Wood",
    alt: "Rich dark walnut wood finish for luxury custom furniture",
    image: "https://images.unsplash.com/photo-1737534884876-426964ba462a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Rich tones and exceptional durability for high-end interior design.",
  },
  {
    name: "CNC Technology",
    alt: "Precision CNC machinery cutting wood for custom furniture designs",
    image: "https://images.unsplash.com/photo-1590880795696-20c7dfadacde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "High-precision cutting and design accuracy for complex architectural patterns.",
  },
  {
    name: "Glass & Metal",
    alt: "Modern glass and metal door accents for contemporary home entrances",
    image: "https://images.unsplash.com/photo-1759803545394-041ea7b71989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Contemporary accents and finishes that define modern aesthetic standards.",
  },
];

export function Technologies() {
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
            Our Workflow
          </span>

            <h2 id="products-heading" className="text-4xl md:text-5xl font-bold tracking-tight mt-4 text-[#302c2b]">
              Architectural Product Collection
            </h2>
          </motion.div>

          {/* Using a list for better SEO structure */}
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
                        alt={material.alt} // High-value SEO keywords here
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />

                    {/* Darker gradient for text accessibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1817] via-[#302c2b]/30 to-transparent" />

                    <figcaption className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2 text-[#ffffff]">
                        {material.name}
                      </h3>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        {material.description}
                      </p>
                    </figcaption>
                  </figure>
                </motion.li>
            ))}
          </ul>

          {/* Hidden SEO text for crawlers */}
          <div className="sr-only">
            Best Project specializes in custom door manufacturing using sustainable
            oak, luxury walnut, and advanced CNC woodworking technology. Our
            artisanal approach combines modern glass and metal accents for
            high-end residential and commercial interiors.
          </div>
        </div>
      </section>
  );
}