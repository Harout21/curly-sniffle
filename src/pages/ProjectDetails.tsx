import {useParams, Link} from "react-router-dom";
import {projects} from "../data/projectsData";
import {useTranslation} from "react-i18next";
import {ChevronLeft, ChevronRight} from "lucide-react";
import SEO from "../components/Seo";

export default function ProjectDetails() {
    const {id} = useParams();
    const {t} = useTranslation();

    const currentIndex = projects.findIndex((p) => p.id === id);
    const project = projects[currentIndex];

    if (!project) {
        return <div className="pt-20 text-center">{t("project_not_found")}</div>;
    }

    const prevProject = projects[currentIndex - 1];
    const nextProject = projects[currentIndex + 1];

    return (
        <>
            <SEO page="projects.details"/>

            <div className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-16">

                {/* MAIN IMAGE */}
                <div className="rounded-xl overflow-hidden shadow-md mb-10">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto max-h-[600px] object-cover block"
                    />
                </div>

                {/* PAGINATION BUTTONS */}
                <div className="flex justify-between items-center border-t border-gray-100 pt-8 mt-8">

                    {/* Previous Button */}
                    {prevProject ? (
                        <Link
                            to={`/projects/${prevProject.id}`}
                            className="group flex items-center gap-2 text-gray-500 hover:text-[#e54201] transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform"/>
                            <div className="flex flex-col items-start">
                                <span className="text-xs uppercase tracking-widest">{t("previous")}</span>
                                <span className="hidden md:block font-medium text-[#302c2b]">{prevProject.title}</span>
                            </div>
                        </Link>
                    ) : (
                        <div/> /* Empty div to keep the "Next" button on the right */
                    )}

                    {/* Next Button */}
                    {nextProject ? (
                        <Link
                            to={`/projects/${nextProject.id}`}
                            className="group flex items-center gap-2 text-right text-gray-500 hover:text-[#e54201] transition-colors"
                        >
                            <div className="flex flex-col items-end">
                                <span className="text-xs uppercase tracking-widest">{t("next")}</span>
                                <span className="hidden md:block font-medium text-[#302c2b]">{nextProject.title}</span>
                            </div>
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                        </Link>
                    ) : (
                        <div/>
                    )}

                </div>
            </div>
        </>
    );
}