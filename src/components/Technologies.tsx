import { motion } from "motion/react";

const materials = [
  {
    name: "Premium Oak",
    image: "https://images.unsplash.com/photo-1758548157195-67d141468467?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd29vZCUyMG1hdGVyaWFsJTIwdGV4dHVyZXxlbnwxfHx8fDE3NzE4NjE2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Sourced from sustainable forests",
  },
  {
    name: "Walnut Wood",
    image: "https://images.unsplash.com/photo-1737534884876-426964ba462a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBmdXJuaXR1cmUlMjBjcmFmdHNtYW5zaGlwJTIwZGV0YWlsfGVufDF8fHx8MTc3MTg2MTY5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Rich tones and exceptional durability",
  },
  {
    name: "CNC Technology",
    image: "https://images.unsplash.com/photo-1590880795696-20c7dfadacde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kd29ya2luZyUyMHRvb2xzJTIwd29ya3Nob3B8ZW58MXx8fHwxNzcxODYxNzAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Precision cutting and design accuracy",
  },
  {
    name: "Glass & Metal",
    image: "https://images.unsplash.com/photo-1759803545394-041ea7b71989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnbGFzcyUyMGRvb3IlMjBlbnRyYW5jZXxlbnwxfHx8fDE3NzE4MDMyMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Contemporary accents and finishes",
  },
];

export function Technologies() {
  return (
    <section id="technologies" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent uppercase tracking-widest text-sm mb-2">Technologies & Materials</p>
          <h2 className="text-4xl md:text-5xl tracking-tight">The Finest Materials,<br />The Latest Technology</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((material, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-sm"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={material.image}
                  alt={material.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl mb-1">{material.name}</h3>
                <p className="text-white/80 text-sm">{material.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
