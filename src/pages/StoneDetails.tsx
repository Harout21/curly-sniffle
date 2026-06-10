import { useParams } from "react-router-dom";
import { useState } from "react";
import { stones } from "../data/stonesData";
import { useTranslation } from "react-i18next";
import SEO from "../components/Seo";

export default function StoneDetails() {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const stone = stones.find((s) => s.id.toString() === id);
    const [activeImage, setActiveImage] = useState(0);

    // State to handle the Pop-up Modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!stone) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg">
                {t("stone_not_found")}
            </div>
        );
    }

    const currentLang = i18n.language;
    const isRu = currentLang.startsWith('ru');
    const isHy = currentLang.startsWith('hy');

    let displayName = stone.name_en;
    if (isRu) displayName = stone.name_ru;
    if (isHy) displayName = stone.name_hy || stone.name_en;

    const dynamicTitle = t("seo.stones.details.title", { stone: displayName });
    const dynamicDescription = t("seo.stones.details.description", { stone: displayName });

    return (
        <>
            <SEO
                page="stones.details"
                titleOverride={dynamicTitle}
                descriptionOverride={dynamicDescription}
            />

            <div className="max-w-7xl mx-auto px-4 md:px-6 pt-14 pb-10 md:pt-36 md:pb-20">
                {/* HEADER */}
                <div className="mb-10 border-b border-gray-100 pb-6">
                    <h1 className="text-2xl md:text-4xl font-bold text-[#302c2b]">
                        {displayName}
                    </h1>
                    <div className="w-16 h-1 bg-[#e54201] mt-4"></div>
                </div>

                {/* MAIN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                    {/* LEFT: GALLERY */}
                    <div className="space-y-4">
                        <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                            <img
                                src={stone.images[activeImage]}
                                alt={displayName}
                                className="w-full h-auto object-contain block"
                            />
                        </div>

                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {stone.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`w-20 h-16 md:w-24 md:h-20 rounded border-2 shrink-0 transition ${
                                        activeImage === i ? "border-[#e54201]" : "border-transparent opacity-60"
                                    }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: INFO & TECH SPECS */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold mb-2">
                                {t("description")}
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                              {displayName}
                            </p>
                        </div>

                        {/* Specs Grid */}
                        <div className="border-t border-b border-gray-100 py-4 space-y-3 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">{t("product_specs.collection")}</span>
                                <span className="text-[#302c2b] font-semibold">{displayName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">{t("product_specs.surface_type_label")}</span>
                                <span className="text-[#302c2b] font-medium">{t("product_specs.surface_type_value")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">{t("product_specs.dimensions_label")}</span>
                                <span className="text-[#302c2b] font-medium tracking-wide">{t("product_specs.dimensions_value")}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full border-2 border-[#e54201] text-[#e54201] py-3 rounded-lg font-semibold hover:bg-[#e54201] hover:text-white transition uppercase"
                        >
                            {t("request_measurement")}
                        </button>
                    </div>
                </div>
            </div>

            {/* POP-UP MODAL WITH PITCH BLACK HIGH-OPACITY BACKDROP */}
            {isModalOpen && (
                <div
                    onClick={() => setIsModalOpen(false)} // Closes modal when clicking outside
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs transition-all cursor-pointer"
                >
                    <div
                        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the card
                        className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in-95 duration-200 cursor-default"
                    >

                        <h3 className="text-xl font-bold text-[#302c2b] mb-2">
                            {t("modal.title")}
                        </h3>

                        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                            {t("modal.description")}
                        </p>

                        {/* Direct Click-to-Call Link */}
                        <a
                            href="tel:+374 77 44 45 96"
                            className="block w-full bg-[#e54201] text-white py-3 rounded-xl font-bold text-lg hover:bg-[#c83a00] transition shadow-md mb-3"
                        >
                            +374 77 44 45 96
                        </a>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 font-medium transition"
                        >
                            {t("modal.close")}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}