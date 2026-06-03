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

    if (!stone) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg">
                {t("stone_not_found")}
            </div>
        );
    }

    // Language Logic
    const currentLang = i18n.language;
    const isRu = currentLang.startsWith('ru');
    const isHy = currentLang.startsWith('hy');

    // Get correct name string
    let displayName = stone.name_en;
    if (isRu) displayName = stone.name_ru;
    if (isHy) displayName = stone.name_hy || stone.name_en;

    // DYNAMIC SEO STRINGS
    const dynamicTitle = t("seo.stones.details.title", { stone: displayName });
    const dynamicDescription = t("seo.stones.details.description", { stone: displayName });

    return (
        <>
            {/* SEO Component receiving dynamic overrides */}
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

                        <button className="w-full border-2 border-[#e54201] text-[#e54201] py-3 rounded-lg font-semibold hover:bg-[#e54201] hover:text-white transition uppercase">
                            {t("request_measurement")}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}