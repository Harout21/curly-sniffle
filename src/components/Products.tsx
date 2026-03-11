import { motion } from "motion/react";

const products = [
  {
    name: "Interior Doors",
    alt: "Bespoke handcrafted interior wooden doors with premium finish",
    image: "https://images.unsplash.com/photo-1759262151001-b9cfec26a9d5?auto=format&fit=crop&q=80&w=1080",
    category: "Doors",
  },
  {
    name: "Modern Furniture",
    alt: "Custom minimalist furniture for luxury living rooms",
    image: "https://images.unsplash.com/photo-1763565909003-46e9dfb68a00?auto=format&fit=crop&q=80&w=1080",
    category: "Furniture",
  },
  {
    name: "Kitchen Cabinets",
    alt: "Modern wooden kitchen cabinets with artisanal craftsmanship",
    image: "https://images.unsplash.com/photo-1758548157243-f4ef3e614684?auto=format&fit=crop&q=80&w=1080",
    category: "Furniture",
  },
  {
    name: "Entrance Doors",
    alt: "Premium exterior entrance doors for modern residential architecture",
    image: "https://images.unsplash.com/photo-1769008301910-c69807d0c736?auto=format&fit=crop&q=80&w=1080",
    category: "Doors",
  },
  {
    name: "Custom Wardrobes",
    alt: "Built-in luxury wooden wardrobes and storage solutions",
    image: "https://images.unsplash.com/photo-1750420556288-d0e32a6f517b?auto=format&fit=crop&q=80&w=1080",
    category: "Furniture",
  },
  {
    name: "Glass Doors",
    alt: "Modern sliding glass doors with minimal metal framing",
    image: "https://images.unsplash.com/photo-1759803545394-041ea7b71989?auto=format&fit=crop&q=80&w=1080",
    category: "Doors",
  },
];

export function Products() {
  return (
      <section id="products" className="py-24 px-6 bg-white" aria-labelledby="products-heading">
        <div className="max-w-7xl mx-auto">

          {/* Header Section */}
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

          {/* Product Grid - Structured as a List */}
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0">
            {products.map((product, index) => (
                <motion.li
                    key={index}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                >
                  <article>
                    <div
                        className="relative overflow-hidden rounded-lg mb-4 aspect-[4/5] bg-slate-100"
                        role="img"
                        aria-label={product.alt}
                    >
                      <img
                          src={product.image}
                          alt={product.alt}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          loading="lazy"
                      />
                      {/* Subtle color overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#302c2b]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.15em] font-bold text-[#e54201]">
                        {product.category}
                      </p>
                      <h3 className="text-xl font-bold text-[#302c2b] group-hover:text-[#e54201] transition-colors">
                        {product.name}
                      </h3>
                    </div>
                  </article>
                </motion.li>
            ))}
          </ul>

          {/* Hidden Context for Search Crawlers */}
          <div className="sr-only">
            Explore our collection of premium custom doors, modern luxury furniture,
            bespoke kitchen cabinetry, and architectural entrance solutions
            crafted with high-quality materials and expert design.
          </div>
        </div>
      </section>
  );
}