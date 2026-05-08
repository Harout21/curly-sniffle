import React from 'react';

// Your array of 20 logos
const logos = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    img: `https://placehold.jp/30/ffffff/000000/150x150.png?text=LOGO+${i + 1}`
}));

export const BrandCarousel = () => {
    return (
        <section className="w-full py-16 overflow-hidden bg-[#f8f8f8]">
            <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">
                Մեր հաճախորդները մեզ ոգեշնչում են ամեն օր
            </h2>

            <div className="flex overflow-hidden group pause-hover">
                {/* We triple the array: [...logos, ...logos, ...logos] */}
                <div className="flex animate-scroll-left gap-8 flex-nowrap">
                    {[...logos, ...logos, ...logos].map((item, index) => (
                        <div
                            key={index}
                            className="relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24"
                        >
                            {/* The Yellow Shadow Effect */}
                            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-[#e54201] rounded-r-full" />

                            <div className="relative w-full h-full rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-sm transition-transform hover:scale-110">
                                <img
                                    src={item.img}
                                    alt="Client Logo"
                                    className="w-2/3 h-2/3 object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};