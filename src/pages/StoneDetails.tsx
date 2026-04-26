import { useParams } from "react-router-dom";

export default function StoneDetails() {
    const { id } = useParams();

    return (
        <div className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-3xl font-bold">Stone Details</h1>
            <p className="mt-4 text-gray-600">
                You are viewing stone with ID: <b>{id}</b>
            </p>
        </div>
    );
}