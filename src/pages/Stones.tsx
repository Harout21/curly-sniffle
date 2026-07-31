import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../components/Seo";

// Import both data arrays
import { grandexStones } from "../data/grandexData";
import { corianStones } from "../data/corianData";

// Eagerly bundle local Grandex images inside src/images/
const grandexImageMap = import.meta.glob<{ default: string }>(
    '/src/images/**/*.{jpg,jpeg,png,webp,svg,JPG,JPEG,PNG,WEBP}',
    { eager: true }
);

export default function Stones() {
    const { t, i18n } = useTranslation();
    const { type, lang } = useParams<{ type: 'corian' | 'grandex'; lang: string }>();

    const currentLang = lang || i18n.language || "hy";
    const currentType = (type || "corian").toLowerCase();

    // Select dataset based on URL type parameter
    const isCorian = currentType === "corian";
    const brandTitle = isCorian ? "Corian" : "Grandex";

    const getStoneImage = (stone: any): string => {
        if (isCorian) {
            // Corian uses remote network URLs directly
            return stone.imageUrl || stone.localSwatchPath || "";
        }

        // Grandex uses local images from src/images/
        const rawPath = stone.images?.[0] || stone.localSwatchPath || "";
        if (!rawPath) return "";

        // Normalize string key format to match Vite's glob map: "/src/images/..."
        let globKey = rawPath.trim();
        if (globKey.startsWith("images/")) {
            globKey = `src/${globKey}`;
        }
        if (!globKey.startsWith("/")) {
            globKey = `/${globKey}`;
        }

        // Lookup bundled image module from Vite
        return grandexImageMap[globKey]?.default || "";
    };

    const getStoneName = (stone: any): string => {
        if (isCorian) {
            if (!stone.name) return "";
            // Capitalize Corian names (e.g., "travertine roma" -> "Travertine Roma")
            return stone.name
                .split(" ")
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(" ");
        }

        // Grandex multi-language formatting logic
        return currentLang.startsWith('ru')
            ? stone.name_ru
            : currentLang.startsWith('hy')
                ? `${stone.name_ru || ''} / ${stone.name_en || ''}`
                : stone.name_en;
    };

    const stonesList = isCorian ? corianStones : grandexStones;

    return (
        <>
            <SEO page="stones" />
            <div className="max-w-7xl mx-auto px-4 md:px-6 pt-14 md:pt-28 pb-24">

                {/* HEADER */}
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#302c2b]">
                        {t("stones")} - {brandTitle}
                    </h1>
                    <div className="w-20 h-1 bg-[#e54201] mt-4"></div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                    {stonesList.map((stone, index) => {
                        const image = getStoneImage(stone);
                        const displayName = getStoneName(stone);
                        const itemKey = `${stone.id}-${index}`;

                        return (
                            <Link
                                key={itemKey}
                                to={`/${currentLang}/stones/${currentType}/${stone.id}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                            >
                                {/* IMAGE CONTAINER */}
                                <div className="overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                                    <img
                                        src={image}
                                        alt={displayName}
                                        className="h-52 md:h-64 w-full object-contain group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                        onError={(e) => {
                                            // Fallback vector placeholder if image fails to load or is missing
                                            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23ccc' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21 15 16 10 5 21'/%3E%3C/svg%3E";
                                        }}
                                    />
                                </div>

                                {/* CONTENT */}
                                <div className="p-5 md:p-6 flex-1 flex items-center">
                                    <h2 className="font-semibold text-[#302c2b] group-hover:text-[#e54201] transition-colors text-base md:text-lg min-h-[3rem] flex items-center">
                                        {displayName}
                                    </h2>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* EMPTY STATE */}
                {stonesList.length === 0 && (
                    <div className="text-center py-16 text-gray-400">
                        No stone patterns found for {brandTitle}.
                    </div>
                )}
            </div>
        </>
    );
}