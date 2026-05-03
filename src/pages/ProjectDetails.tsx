import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projectsData";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SEO from "../components/Seo";

export default function ProjectDetails() {
    const { id } = useParams();
    const { t } = useTranslation();

    const currentIndex = projects.findIndex((p) => p.id === id);
    const project = projects[currentIndex];

    if (!project) {
        return <div className="pt-20 text-center">{t("project_not_found")}</div>;
    }

    const prevProject = projects[currentIndex - 1];
    const nextProject = projects[currentIndex + 1];

    return (
        <>
            <SEO page="projects.details" />

            <div className="max-w-6xl mx-auto px-6  pt-18 md:pt-24 pb-16">

                {/* IMAGE CONTAINER */}
                <div className="rounded-2xl overflow-hidden shadow-xl mb-10 w-full bg-gray-50">
                    <img
                        src={project.image}
                        alt={project.title}
                        /*
                           h-[50vh]: Keeps that "fantastic" mobile feel you liked.
                           md:h-[550px]: Reduces the height on desktop so it's not too tall.
                           object-cover: Maintains the crop without distortion.
                        */
                        className="w-full h-[50vh] md:h-[550px] object-cover block"
                    />
                </div>

                {/* NAVIGATION BUTTONS */}
                <div className="flex justify-between items-center border-t border-gray-100 pt-8 mt-4">

                    {/* Previous Button */}
                    {prevProject ? (
                        <Link
                            to={`/projects/${prevProject.id}`}
                            className="group flex items-center gap-3 text-gray-500 hover:text-[#e54201] transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">{t("previous")}</span>
                                <span className="hidden md:block font-medium text-[#302c2b]">{prevProject.title}</span>
                            </div>
                        </Link>
                    ) : (
                        <div />
                    )}

                    {/* Next Button */}
                    {nextProject ? (
                        <Link
                            to={`/projects/${nextProject.id}`}
                            className="group flex items-center gap-3 text-right text-gray-500 hover:text-[#e54201] transition-colors"
                        >
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">{t("next")}</span>
                                <span className="hidden md:block font-medium text-[#302c2b]">{nextProject.title}</span>
                            </div>
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    ) : (
                        <div />
                    )}

                </div>
            </div>
        </>
    );
}