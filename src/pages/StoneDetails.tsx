import { useParams } from "react-router-dom";
import { useState } from "react";
import { stones } from "../data/stonesData";

export default function StoneDetails() {
    const { id } = useParams();
    const stone = stones.find((s) => s.id.toString() === id);
    const [activeImage, setActiveImage] = useState(0);

    if (!stone) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg">
                Stone not found
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">

            {/* HEADER */}
            <div className="mb-10 border-b border-gray-100 pb-6">
                <h1 className="text-2xl md:text-4xl font-bold text-[#302c2b]">
                    {stone.name}
                </h1>
                <div className="w-16 h-1 bg-[#e54201] mt-4"></div>
            </div>

            {/* MAIN LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

                {/* LEFT: GALLERY */}
                <div className="space-y-4">

                    {/* MAIN IMAGE */}
                    <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                        <img
                            src={stone.images[activeImage]}
                            alt={stone.name}
                            className="w-full h-auto object-contain block"
                        />
                    </div>

                    {/* THUMBNAILS */}
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {stone.images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImage(i)}
                                className={`w-20 h-16 md:w-24 md:h-20 rounded border-2 shrink-0 transition ${
                                    activeImage === i
                                        ? "border-[#e54201]"
                                        : "border-transparent opacity-60"
                                }`}
                            >
                                <img
                                    src={img}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT: INFO */}
                <div className="flex flex-col gap-6">

                    {/* DESCRIPTION */}
                    <div>
                        <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold mb-2">
                            Description
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            High-quality {stone.name} slab, perfect for countertops and interior design.
                            Durable, elegant, and modern surface material.
                        </p>
                    </div>

                    {/* PRICE */}
                    {/*<div className="py-6 border-y border-gray-100">*/}
                    {/*    <span className="text-3xl font-bold text-[#302c2b]">*/}
                    {/*        9 200,00 ₽*/}
                    {/*    </span>*/}
                    {/*    <p className="text-green-600 text-sm font-medium mt-1">*/}
                    {/*        ✓ In Stock*/}
                    {/*    </p>*/}
                    {/*</div>*/}

                    {/* BUTTONS */}
                    {/*<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">*/}
                    {/*    <button className="bg-[#003399] text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition">*/}
                    {/*        ADD TO CART*/}
                    {/*    </button>*/}

                    {/*    <button className="bg-[#4caf50] text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition">*/}
                    {/*        QUICK BUY*/}
                    {/*    </button>*/}
                    {/*</div>*/}

                    <button className="w-full border-2 border-[#e54201] text-[#e54201] py-3 rounded-lg font-semibold hover:bg-[#e54201] hover:text-white transition">
                        REQUEST MEASUREMENT
                    </button>

                </div>

            </div>
        </div>
    );
}