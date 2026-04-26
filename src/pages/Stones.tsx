import { Link } from "react-router-dom";

const stones = [
    { id: 1, name: "Stone 1" },
    { id: 2, name: "Stone 2" },
    { id: 3, name: "Stone 3" },
];

export default function Stones() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-20">
            <h1 className="text-3xl font-bold mb-10">Stones Page</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stones.map((stone) => (
                    <Link
                        key={stone.id}
                        to={`/stones/${stone.id}`}
                        className="p-6 border rounded-lg hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold">{stone.name}</h2>
                        <p className="text-gray-500">Click to view details</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}