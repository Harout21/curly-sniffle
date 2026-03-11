import { motion } from "framer-motion"; // Note: ensure you use "framer-motion" or "motion/react" based on your install
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
    const scrollToContact = () => {
        const element = document.getElementById("contact");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black">

            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] scale-105"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1769008301910-c69807d0c736?auto=format&fit=crop&q=80&w=1920')",
                        // Added auto=format for better browser delivery
                    }}
                />
                {/* Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </div>

            {/* Content Area */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">

                <motion.h1
                    className="text-5xl md:text-8xl font-bold tracking-tight mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="text-[#e54201]">Premium Doors</span>
                    <br />
                    <span className="text-white">Crafted to Perfection</span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-2xl mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    Elevate your space with Best Project's custom-engineered
                    doors and artisanal furniture designed for modern luxury.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <Button
                        size="lg"
                        className="bg-[#e54201] hover:bg-[#ff4b02] text-white text-lg px-10 py-7 h-auto rounded-full transition-all duration-300 shadow-xl hover:shadow-[#e54201]/20"
                        onClick={scrollToContact}
                    >
                        Start Your Project
                        <motion.span
                            className="ml-3"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                            <ArrowRight className="h-5 w-5" />
                        </motion.span>
                    </Button>
                </motion.div>
            </div>

            {/* Animated Scroll Indicator */}
            <motion.button
                onClick={scrollToContact}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <div className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center p-2 backdrop-blur-sm">
                    <motion.div
                        className="w-1.5 h-1.5 bg-[#e54201] rounded-full"
                        animate={{
                            y: [0, 20, 0],
                            opacity: [1, 0.5, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
            </motion.button>

        </section>
    );
}