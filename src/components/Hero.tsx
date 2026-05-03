import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import MainImage from "../images/24.jpeg";
export function Hero() {
    const { t } = useTranslation();

    const scrollToContact = () => {
        const element = document.getElementById("contact");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black">

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] scale-105"
                    style={{
                        backgroundImage: `url(${MainImage})`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">

                <motion.h1
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="text-[#e54201]">{t("hero.title1")}</span>
                    <br />
                    <span className="text-white">{t("hero.title2")}</span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-2xl mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {t("hero.description")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <Button
                        size="default"
                        className="bg-[#e54201] hover:bg-[#ff4b02] text-white text-base px-6 py-4 h-auto rounded-full transition-all duration-300 shadow-xl hover:shadow-[#e54201]/20"
                        onClick={scrollToContact}
                    >
                        {t("hero.cta")}
                        <motion.span
                            className="ml-2"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                            <ArrowRight className="h-4 w-4" />
                        </motion.span>
                    </Button>
                </motion.div>
            </div>

            {/* Scroll indicator */}
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
                        animate={{ y: [0, 20, 0], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </motion.button>

        </section>
    );
}