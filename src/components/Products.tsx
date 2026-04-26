import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import product1 from "../images/4.jpeg";
import product2 from "../images/3.jpeg";
import product3 from "../images/30.jpeg";
import product4 from "../images/53.jpeg";
import product5 from "../images/25.jpeg";
import product6 from "../images/12.jpeg";

const products = [
  {
    key: "interiorDoors",
    categoryKey: "doors",
    altKey: "interiorDoorsAlt",
    image: product1,
  },
  {
    key: "modernFurniture",
    categoryKey: "furniture",
    altKey: "modernFurnitureAlt",
    image: product2,
  },
  {
    key: "kitchenCabinets",
    categoryKey: "furniture",
    altKey: "kitchenCabinetsAlt",
    image: product3,
  },
  {
    key: "entranceDoors",
    categoryKey: "doors",
    altKey: "entranceDoorsAlt",
    image: product4,
  },
  {
    key: "customWardrobes",
    categoryKey: "furniture",
    altKey: "customWardrobesAlt",
    image: product5,
  },
  {
    key: "glassDoors",
    categoryKey: "doors",
    altKey: "glassDoorsAlt",
    image: product6,
  },
];

export function Products() {
  const { t } = useTranslation();

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
            {t('products.workflow')}
          </span>
            <h2 id="products-heading" className="text-4xl md:text-5xl font-bold tracking-tight mt-4 text-[#302c2b]">
              {t('products.collectionTitle')}
            </h2>
          </motion.div>

          {/* Product Grid */}
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0">
            {products.map((product, index) => (
                <motion.li
                    key={product.key}
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
                        aria-label={t(`products.altTexts.${product.altKey}`)}
                    >
                      <img
                          src={product.image}
                          alt={t(`products.altTexts.${product.altKey}`)}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#302c2b]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.15em] font-bold text-[#e54201]">
                        {t(`products.categories.${product.categoryKey}`)}
                      </p>
                      <h3 className="text-xl font-bold text-[#302c2b] group-hover:text-[#e54201] transition-colors">
                        {t(`products.names.${product.key}`)}
                      </h3>
                    </div>
                  </article>
                </motion.li>
            ))}
          </ul>

          <div className="sr-only">
            {t('products.hiddenDescription')}
          </div>
        </div>
      </section>
  );
}