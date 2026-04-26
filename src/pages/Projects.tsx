import { Link } from "react-router-dom";
import { projects } from "../data/projectsData";
import {t} from "i18next";

export default function Projects() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <h1 className="text-3xl font-bold mb-10">{t("projects-all")}</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {projects.map((p) => (
                    <Link
                        key={p.id}
                        to={`/projects/${p.id}`}
                        className="overflow-hidden rounded-lg"
                    >
                        <img
                            src={p.image}
                            className="w-full h-48 object-cover hover:scale-105 transition"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}