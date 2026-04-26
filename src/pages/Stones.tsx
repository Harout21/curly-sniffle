import { Link } from "react-router-dom";
import { stones } from "../data/stonesData";
import {t} from "i18next";

export default function Stones() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-20">
            <h1 className="text-3xl font-bold mb-10">{t('stones')}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stones.map((stone) => (
                    <Link
                        key={stone.id}
                        to={`/stones/${stone.id}`}
                        className="border rounded-lg overflow-hidden hover:shadow-lg transition"
                    >
                        {/* first image */}
                        <img
                            src={stone.images[0]}
                            alt={stone.name}
                            className="h-48 w-full object-cover"
                        />

                        <div className="p-4">
                            <h2 className="font-semibold">{stone.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}