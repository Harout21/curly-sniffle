import { useParams } from "react-router-dom";
import { projects } from "../data/projectsData";

export default function ProjectDetails() {
    const { id } = useParams();

    const project = projects.find((p) => p.id === id);

    if (!project) {
        return <div className="p-10 text-center">Project not found</div>;
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-20">
            <img
                src={project.image}
                className="w-full h-[500px] object-cover rounded-xl"
            />
        </div>
    );
}