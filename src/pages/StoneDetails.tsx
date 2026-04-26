import { useParams } from "react-router-dom";
import { stones } from "../data/stonesData";

export default function StoneDetails() {
    const { id } = useParams();

    const stone = stones.find((s) => s.id === id);

    if (!stone) {
        return <div className="p-10 text-center">Stone not found</div>;
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-20">

            {/* Title */}
            <h1 className="text-3xl font-bold mb-8">
                {stone.name}
            </h1>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stone.images.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={stone.name}
                        className="w-full h-[350px] object-cover rounded-lg"
                    />
                ))}
            </div>

        </div>
    );
}