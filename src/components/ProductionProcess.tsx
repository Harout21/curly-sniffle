import { motion } from "motion/react";
import { Pencil, Hammer, Sparkles, PackageCheck } from "lucide-react";

const steps = [
  {
    icon: Pencil,
    title: "Design & Consultation",
    description: "We work closely with you to understand your vision and create custom designs that match your aesthetic.",
  },
  {
    icon: Hammer,
    title: "Expert Craftsmanship",
    description: "Our skilled artisans bring designs to life using premium materials and time-honored techniques.",
  },
  {
    icon: Sparkles,
    title: "Quality Finishing",
    description: "Every piece undergoes meticulous finishing to ensure a flawless, luxurious appearance.",
  },
  {
    icon: PackageCheck,
    title: "Delivery & Installation",
    description: "Professional delivery and installation service ensures perfect placement in your space.",
  },
];

export function ProductionProcess() {
  return (
    <section id="process" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent uppercase tracking-widest text-sm mb-2">Our Process</p>
          <h2 className="text-4xl md:text-5xl tracking-tight">From Vision to Reality</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-sm h-full">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="text-6xl text-muted/20 absolute top-4 right-4">
                      0{index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-xl mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/30 z-10" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
