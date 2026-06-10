import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projectsData";
import { useTranslation } from "react-i18next";
import SEO from "../components/Seo";

export default function Projects() {
    const { t, i18n } = useTranslation();

    // 1. Grab the active language path parameter safely from your router context
    const { lang } = useParams<{ lang: string }>();

    // Fallback safe value matching your global router architecture default
    const currentLang = lang || i18n.language || "hy";

    return (
        <>
            <SEO page="projects" />
            <div className="max-w-7xl mx-auto px-6 pt-14 md:pt-28 pb-20">

                {/* HEADER WITH DIVIDER */}
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#302c2b]">
                        {t("projects-all")}
                    </h1>
                    {/* The Orange Divider */}
                    <div className="w-20 h-1 bg-[#e54201] mt-4"></div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {projects.map((p) => (
                        <Link
                            key={p.id}
                            // 2. Prepend the active language token parameter dynamically
                            to={`/${currentLang}/projects/${p.id}`}
                            className="group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={p.image}
                                    alt={p.title || "Project"}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}