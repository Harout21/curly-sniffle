import {useParams} from "react-router-dom";
import {useState} from "react";
import {stones} from "../data/stonesData";
import {useTranslation} from "react-i18next";
import SEO from "../components/Seo";

export default function StoneDetails() {
    const {id} = useParams();
    const {t, i18n} = useTranslation();
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

    // Decide what to show in the H1
    // Option A: Dynamic (shows only one lang)
    const displayName = isRu ? stone.name_ru : stone.name_en;

    // Option B: Both (as you had it) but safe
    const bothNames = `${stone.name_ru} / ${stone.name_en}`;

    return (
        <>
            <SEO page="stones.details"/>
            /* Added pt-28 to ensure it clears the header/navbar */
            <div className="max-w-7xl mx-auto px-4 md:px-6 pt-28 pb-10 md:pt-36 md:pb-20">

                {/* HEADER */}
                <div className="mb-10 border-b border-gray-100 pb-6">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#302c2b]">
                        {/* You can use displayName for single lang or bothNames for both */}
                        {displayName}
                    </h2>
                    <div className="w-16 h-1 bg-[#e54201] mt-4"></div>
                </div>

                {/* MAIN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

                    {/* LEFT: GALLERY */}
                    <div className="space-y-4">
                        {/* MAIN IMAGE */}
                        <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                            <img
                                src={stone.images[activeImage]}
                                alt={displayName}
                                className="w-full h-auto object-contain block"
                            />
                        </div>

                        {/* THUMBNAILS */}
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {stone.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`w-20 h-16 md:w-24 md:h-20 rounded border-2 shrink-0 transition ${
                                        activeImage === i
                                            ? "border-[#e54201]"
                                            : "border-transparent opacity-60"
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: INFO */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold mb-2">
                                {t("description")}
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                {/* Dynamic description using the correct name */}
                                {t("high_quality")} {displayName} {t("stone_desc_suffix")}
                            </p>
                        </div>

                        <button
                            className="w-full border-2 border-[#e54201] text-[#e54201] py-3 rounded-lg font-semibold hover:bg-[#e54201] hover:text-white transition uppercase">
                            {t("request_measurement")}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}