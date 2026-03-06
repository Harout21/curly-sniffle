import {useState} from 'react';
import {Calculator, Check} from 'lucide-react';

type Material = 'mdf' | 'solid-wood' | 'premium';

interface Addon {
    id: string;
    label: string;
    price: number;
}

const addons: Addon[] = [
    {id: 'led', label: 'LED Lighting', price: 250},
    {id: 'soft-close', label: 'Soft Close Hinges', price: 180},
    {id: 'custom-color', label: 'Custom Color Finish', price: 320},
];

const materialPrices: Record<Material, number> = {
    mdf: 80,
    'solid-wood': 150,
    premium: 220,
};

const materialLabels: Record<Material, string> = {
    mdf: 'MDF (Most Affordable)',
    'solid-wood': 'Solid Wood',
    premium: 'Premium Hardwood',
};

export function PriceCalculator() {
    const [material, setMaterial] = useState<Material>('solid-wood');
    const [width, setWidth] = useState<number>(120);
    const [height, setHeight] = useState<number>(200);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    const toggleAddon = (addonId: string) => {
        setSelectedAddons((prev) =>
            prev.includes(addonId)
                ? prev.filter((id) => id !== addonId)
                : [...prev, addonId]
        );
    };

    // Calculate total
    const basePrice = materialPrices[material];
    const area = (width * height) / 10000; // Convert cm² to m²
    const materialCost = basePrice * area;
    const addonsCost = selectedAddons.reduce((sum, addonId) => {
        const addon = addons.find((a) => a.id === addonId);
        return sum + (addon?.price || 0);
    }, 0);
    const totalPrice = Math.round(materialCost + addonsCost);

    return (
        <section id="calculator" className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F5F0E8] mb-4">
                        <Calculator className="text-[#A67C52]" size={28}/>
                    </div>
                    <h2 className="text-4xl md:text-5xl text-[#1A1A1A] mb-4">
                        Price Calculator
                    </h2>
                    <p className="text-lg text-gray-600">
                        Get an instant estimate for your custom furniture project.
                    </p>
                </div>

                <div className="bg-[#F5F0E8] rounded-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Material Selection */}
                        <div>
                            <label className="block text-[#1A1A1A] mb-3">
                                Select Material
                            </label>
                            <select
                                value={material}
                                onChange={(e) => setMaterial(e.target.value as Material)}
                                className="w-full px-4 py-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67C52] text-[#1A1A1A]"
                            >
                                {Object.entries(materialLabels).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Width Input */}
                        <div>
                            <label className="block text-[#1A1A1A] mb-3">
                                Width (cm)
                            </label>
                            <input
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(Number(e.target.value))}
                                min="50"
                                max="500"
                                className="w-full px-4 py-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67C52] text-[#1A1A1A]"
                            />
                        </div>

                        {/* Height Input */}
                        <div>
                            <label className="block text-[#1A1A1A] mb-3">
                                Height (cm)
                            </label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(Number(e.target.value))}
                                min="50"
                                max="300"
                                className="w-full px-4 py-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67C52] text-[#1A1A1A]"
                            />
                        </div>
                    </div>

                    {/* Addons */}
                    <div className="mb-8">
                        <label className="block text-[#1A1A1A] mb-4">
                            Additional Features
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {addons.map((addon) => (
                                <button
                                    key={addon.id}
                                    onClick={() => toggleAddon(addon.id)}
                                    className={`p-4 rounded border-2 transition-all text-left ${
                                        selectedAddons.includes(addon.id)
                                            ? 'border-[#A67C52] bg-white'
                                            : 'border-gray-300 bg-white hover:border-[#A67C52]'
                                    }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="text-[#1A1A1A]">{addon.label}</span>
                                        {selectedAddons.includes(addon.id) && (
                                            <Check className="text-[#A67C52]" size={20}/>
                                        )}
                                    </div>
                                    <span className="text-gray-600 text-sm">
                    +${addon.price}
                  </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="bg-white rounded-lg p-6 mb-6">
                        <h3 className="text-xl text-[#1A1A1A] mb-4">
                            Price Breakdown
                        </h3>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-gray-600">
                                <span>Material ({area.toFixed(2)} m²)</span>
                                <span>${Math.round(materialCost)}</span>
                            </div>
                            {selectedAddons.map((addonId) => {
                                const addon = addons.find((a) => a.id === addonId);
                                return addon ? (
                                    <div key={addonId} className="flex justify-between text-gray-600">
                                        <span>{addon.label}</span>
                                        <span>${addon.price}</span>
                                    </div>
                                ) : null;
                            })}
                        </div>
                        <div className="border-t border-gray-200 pt-4">
                            <div className="flex justify-between items-center">
                                     <span className="text-2xl text-[#1A1A1A]">
                          Total Estimate
                        </span>
                                <span className="text-3xl text-[#A67C52]">
                  ${totalPrice}
                </span>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        className="w-full bg-[#A67C52] text-white px-8 py-4 rounded hover:bg-[#8B6F47] transition-colors">
                        Request This Estimate
                    </button>
                </div>
            </div>
        </section>
    );
}