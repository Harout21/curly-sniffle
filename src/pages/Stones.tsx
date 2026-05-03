import { Link } from "react-router-dom";
import { stones } from "../data/stonesData";
import { useTranslation } from "react-i18next";

export default function Stones() {
    const { t, i18n } = useTranslation();

    // Get current language once to keep it clean
    const currentLang = i18n.language;

    return (
        /* Added pt-28 pb-24 to ensure the grid doesn't hide under a sticky header */
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-28 pb-24">

            {/* HEADER */}
            <div className="mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-[#302c2b]">
                    {t("stones")}
                </h1>
                <div className="w-20 h-1 bg-[#e54201] mt-4"></div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {stones.map((stone) => {

                    // LANGUAGE LOGIC
                    // 1. If Russian -> name_ru
                    // 2. If Armenian -> name_ru + name_en
                    // 3. Default (English) -> name_en
                    const displayName = currentLang.startsWith('ru')
                        ? stone.name_ru
                        : currentLang.startsWith('hy')
                            ? `${stone.name_ru} / ${stone.name_en}`
                            : stone.name_en;

                    return (
                        <Link
                            key={stone.id}
                            to={`/stones/${stone.id}`}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            {/* IMAGE */}
                            <div className="overflow-hidden bg-gray-50">
                                <img
                                    src={stone.images[0]}
                                    alt={displayName}
                                    className="h-52 md:h-64 w-full object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* CONTENT */}
                            <div className="p-5 md:p-6">
                                <h2 className="font-semibold text-[#302c2b] group-hover:text-[#e54201] transition-colors text-base md:text-lg min-h-[3rem] flex items-center">
                                    {displayName}
                                </h2>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}