import { motion } from "motion/react";

export function AboutUs() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1674065719169-5ba77e617e60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmdXJuaXR1cmUlMjB3b3Jrc2hvcCUyMGNyYWZ0c21hbnxlbnwxfHx8fDE3NzE4NjE2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Our workshop"
              className="w-full h-[600px] object-cover rounded-sm"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <p className="text-accent uppercase tracking-widest text-sm">About Us</p>
              <h2 className="text-4xl md:text-5xl tracking-tight">Excellence in Every Detail</h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                For over two decades, we have been at the forefront of premium furniture and door manufacturing, 
                combining traditional craftsmanship with cutting-edge technology to create pieces that stand the test of time.
              </p>
              
              <p>
                Our master craftsmen pour their expertise and passion into every project, ensuring that each piece 
                not only meets but exceeds the highest standards of quality and design.
              </p>
              
              <p>
                We believe that furniture and doors are more than functional items—they are expressions of your style, 
                reflections of your taste, and investments in your space's future.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <div className="text-4xl mb-2">20+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl mb-2">5000+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl mb-2">100%</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Client Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
