import React from 'react';

// Replace the placeholder URLs with your actual image paths
const logos = [
    { id: 1, img: "https://placehold.jp/30/ffffff/000000/150x150.png?text=LOGO+1" },
    { id: 2, img: "https://placehold.jp/30/ffffff/000000/150x150.png?text=LOGO+2" },
    { id: 3, img: "https://placehold.jp/30/ffffff/000000/150x150.png?text=LOGO+3" },
    { id: 4, img: "https://placehold.jp/30/ffffff/000000/150x150.png?text=LOGO+4" },
    { id: 5, img: "https://placehold.jp/30/ffffff/000000/150x150.png?text=LOGO+5" },
    { id: 6, img: "https://placehold.jp/30/ffffff/000000/150x150.png?text=LOGO+6" },
    { id: 7, img: "https://placehold.jp/30/ffffff/000000/150x150.png?text=LOGO+7" },
    { id: 8, img: "https://placehold.jp/30/ffffff/000000/150x150.png?text=LOGO+8" },
    { id: 9, img: "https://placehold.jp/30/ffffff/000000/150x150.png?text=LOGO+9" },
    { id: 10, img: "https://placehold.jp/30/ffffff/000000/150x150.png?text=LOGO+10" },
];

export const BrandCarousel = () => {
    return (
        <>
            </>
        // <section className="w-full py-16 overflow-hidden bg-[#f8f8f8]">
        //     {/* Title with BestProject.am branding colors */}
        //     <h2 className="text-2xl md:text-3xl font-bold text-center mb-16 text-gray-500 hover:text-[#e54201] transition-colors duration-300 cursor-default">
        //         Մեր հաճախորդները մեզ ոգեշնչում են ամեն օր
        //     </h2>
        //
        //     <div className="relative flex overflow-hidden group pause-hover">
        //         {/* The track is tripled [...logos, ...logos, ...logos]
        //           to ensure the loop is invisible during the 33.33% shift.
        //         */}
        //         <div className="flex animate-scroll-left gap-10 md:gap-14 flex-nowrap items-center py-4">
        //             {[...logos, ...logos, ...logos].map((item, index) => (
        //                 <div
        //                     key={index}
        //                     className="relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 group/item"
        //                 >
        //                     {/* Layer 1: The Orange Accent (Static behind) */}
        //                     <div className="absolute inset-0 translate-x-1 translate-y-1 bg-[#e54201] rounded-full shadow-md transition-transform duration-300 group-hover/item:scale-105" />
        //
        //                     {/* Layer 2: The White Container (Clean circular frame) */}
        //                     <div className="relative w-full h-full rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-sm p-4 md:p-6 overflow-hidden transition-all duration-300 group-hover/item:scale-110 group-hover/item:shadow-xl">
        //                         <img
        //                             src={item.img}
        //                             alt={`Brand ${index}`}
        //                             className="w-full h-full object-contain grayscale group-hover/item:grayscale-0 transition-all duration-500"
        //                         />
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        // </section>
    );
};