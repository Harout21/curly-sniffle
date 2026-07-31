import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SEO from "../components/Seo";

// Import both datasets
import { grandexStones } from "../data/grandexData";
import { corianStones } from "../data/corianData";

// Glob import starting with '/src/' so the object keys match your grandexData paths exactly
const grandexImages = import.meta.glob<{ default: string }>(
    "/src/images/stones/*",
    { eager: true }
);

/**
 * Resolves static string paths like "/src/images/stones/c-809-angiari.jpg"
 * to Vite's hashed asset bundle URLs.
 */
function resolveGrandexImage(path: string): string {
    if (!path) return "";
    if (path.startsWith("http") || path.startsWith("data:")) return path;

    // Matches the exact key in the grandexImages object
    if (grandexImages[path]) {
        return grandexImages[path].default;
    }

    return path;
}

export default function StoneDetails() {
    const { id, type, lang } = useParams<{ id: string; type: 'corian' | 'grandex'; lang: string }>();
    const { t, i18n } = useTranslation();

    const [activeImage, setActiveImage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const currentType = (type || "corian").toLowerCase();
    const isCorian = currentType === "corian";

    // 1. Target dataset and find stone
    const stonesList = isCorian ? corianStones : grandexStones;
    const stone = stonesList.find((s: any) =>
        s.id?.toString() === id || s.slug === id
    );

    if (!stone) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg">
                {t("stone_not_found")}
            </div>
        );
    }

    // 2. Extract and resolve images
    const rawImagesList: string[] = isCorian
        ? [stone.imageUrl || stone.localSwatchPath].filter(Boolean)
        : stone.images || [];

    const imagesList = rawImagesList.map((img) =>
        isCorian ? img : resolveGrandexImage(img)
    );

    const activeImgSrc = imagesList[activeImage] || imagesList[0] || "";

    // 3. Extract display name
    const currentLang = lang || i18n.language || "hy";
    const isRu = currentLang.startsWith("ru");
    const isHy = currentLang.startsWith("hy");

    let displayName = "";
    if (isCorian) {
        displayName = stone.name
            .split(" ")
            .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
    } else {
        if (isRu) displayName = stone.name_ru;
        else if (isHy) displayName = stone.name_hy || `${stone.name_ru} / ${stone.name_en}`;
        else displayName = stone.name_en;
    }

    const brandTitle = isCorian ? "Corian" : "Grandex";
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
                    <p className="text-sm font-bold uppercase tracking-wider text-[#e54201] mb-1">
                        {brandTitle}
                    </p>
                    <h1 className="text-2xl md:text-4xl font-bold text-[#302c2b]">
                        {displayName}
                    </h1>
                    <div className="w-16 h-1 bg-[#e54201] mt-4"></div>
                </div>

                {/* MAIN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                    {/* LEFT: GALLERY */}
                    <div className="space-y-4">
                        <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm flex items-center justify-center p-4 min-h-[300px]">
                            <img
                                src={activeImgSrc}
                                alt={displayName}
                                className="w-full max-h-[450px] object-contain block"
                            />
                        </div>

                        {/* Thumbnails */}
                        {imagesList.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {imagesList.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`w-20 h-16 md:w-24 md:h-20 rounded border-2 shrink-0 transition overflow-hidden ${
                                            activeImage === i ? "border-[#e54201]" : "border-transparent opacity-60"
                                        }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT: INFO & TECH SPECS */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold mb-2">
                                {t("description")}
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                {displayName} ({brandTitle})
                            </p>
                        </div>

                        <div className="border-t border-b border-gray-100 py-4 space-y-3 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">{t("product_specs.brand", "Brand")}</span>
                                <span className="text-[#302c2b] font-semibold">{brandTitle}</span>
                            </div>
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
                            className="w-full border-2 border-[#e54201] text-[#e54201] py-3 rounded-lg font-semibold hover:bg-[#e54201] hover:text-white transition uppercase cursor-pointer"
                        >
                            {t("request_measurement")}
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div
                    onClick={() => setIsModalOpen(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs transition-all cursor-pointer"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl relative border border-gray-100 cursor-default"
                    >
                        <h3 className="text-xl font-bold text-[#302c2b] mb-2">
                            {t("modal.title")}
                        </h3>

                        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                            {t("modal.description")}
                        </p>

                        <a
                            href="tel:+374 77 44 45 96"
                            className="block w-full bg-[#e54201] text-white py-3 rounded-xl font-bold text-lg hover:bg-[#c83a00] transition shadow-md mb-3"
                        >
                            +374 77 44 45 96
                        </a>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 font-medium transition cursor-pointer"
                        >
                            {t("modal.close")}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}