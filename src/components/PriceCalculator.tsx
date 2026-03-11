import { useState } from 'react';
import { Calculator, Check } from 'lucide-react';

type Material = 'mdf' | 'solid-wood' | 'premium';

interface Addon {
    id: string;
    label: string;
    price: number;
}

const addons: Addon[] = [
    { id: 'led', label: 'LED Lighting', price: 250 },
    { id: 'soft-close', label: 'Soft Close Hinges', price: 180 },
    { id: 'custom-color', label: 'Custom Color Finish', price: 320 },
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
        <section id="calculator" className="py-24 bg-white" aria-labelledby="calc-heading">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f5f5f5] mb-4">
                        <Calculator className="text-[#e54201]" size={28} aria-hidden="true" />
                    </div>

                    <h2 id="calc-heading" className="text-4xl md:text-5xl text-[#302c2b] mb-4 font-semibold">
                        Custom Furniture Price Calculator
                    </h2>

                    <p className="text-lg text-gray-600">
                        Get an instant cost estimate for your premium custom furniture project.
                    </p>
                </div>

                <div className="bg-[#f5f5f5] rounded-lg p-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

                        <div>
                            <label htmlFor="material-select" className="block text-[#302c2b] mb-3 font-medium">
                                Select Material Type
                            </label>

                            <select
                                id="material-select"
                                value={material}
                                onChange={(e) => setMaterial(e.target.value as Material)}
                                className="w-full px-4 py-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e54201] text-[#302c2b]"
                            >
                                {Object.entries(materialLabels).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="width-input" className="block text-[#302c2b] mb-3 font-medium">
                                Project Width (cm)
                            </label>

                            <input
                                id="width-input"
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(Number(e.target.value))}
                                min="50"
                                max="500"
                                className="w-full px-4 py-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e54201] text-[#302c2b]"
                            />
                        </div>

                        <div>
                            <label htmlFor="height-input" className="block text-[#302c2b] mb-3 font-medium">
                                Project Height (cm)
                            </label>

                            <input
                                id="height-input"
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(Number(e.target.value))}
                                min="50"
                                max="300"
                                className="w-full px-4 py-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e54201] text-[#302c2b]"
                            />
                        </div>
                    </div>

                    <fieldset className="mb-8">
                        <legend className="block text-[#302c2b] mb-4 font-medium">
                            Additional Custom Features
                        </legend>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                            {addons.map((addon) => (
                                <button
                                    key={addon.id}
                                    type="button"
                                    onClick={() => toggleAddon(addon.id)}
                                    aria-pressed={selectedAddons.includes(addon.id)}
                                    className={`p-4 rounded border-2 transition-all text-left ${
                                        selectedAddons.includes(addon.id)
                                            ? 'border-[#e54201] bg-white'
                                            : 'border-gray-300 bg-white hover:border-[#e54201]'
                                    }`}
                                >

                                    <div className="flex items-start justify-between mb-2">
                                        <span className="text-[#302c2b] font-medium">
                                            {addon.label}
                                        </span>

                                        {selectedAddons.includes(addon.id) && (
                                            <Check className="text-[#e54201]" size={20} aria-hidden="true" />
                                        )}
                                    </div>

                                    <span className="text-gray-600 text-sm">
                                        +${addon.price}
                                    </span>

                                </button>
                            ))}

                        </div>
                    </fieldset>

                    <article className="bg-white rounded-lg p-6 mb-6" aria-label="Quote Summary">

                        <h3 className="text-xl text-[#302c2b] mb-4 font-semibold">
                            Project Price Breakdown
                        </h3>

                        <div className="space-y-2 mb-4">

                            <div className="flex justify-between text-gray-600">
                                <span>Material Cost ({area.toFixed(2)} m²)</span>
                                <span>${Math.round(materialCost)}</span>
                            </div>

                            {selectedAddons.map((addonId) => {
                                const addon = addons.find((a) => a.id === addonId);

                                return addon ? (
                                    <div key={addonId} className="flex justify-between text-gray-600">
                                        <span>{addon.label} upgrade</span>
                                        <span>${addon.price}</span>
                                    </div>
                                ) : null;
                            })}
                        </div>

                        <div className="border-t border-gray-200 pt-4">

                            <div className="flex justify-between items-center">

                                <span className="text-2xl text-[#302c2b] font-bold">
                                    Total Project Estimate
                                </span>

                                <span className="text-3xl text-[#e54201] font-bold">
                                    ${totalPrice}
                                </span>

                            </div>

                        </div>
                    </article>

                    <button
                        type="button"
                        className="w-full bg-[#e54201] text-white px-8 py-4 rounded font-bold hover:bg-[#c83a00] transition-colors shadow-sm"
                    >
                        Request This Official Quote
                    </button>

                </div>
            </div>
        </section>
    );
}