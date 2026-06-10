import { useState } from 'react';
import { Calculator, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Material = 'mdf' | 'solid-wood' | 'premium';
type FurnitureStyle = 'rectangle' | 'v-shape' | 'u-shape';

interface Addon {
    id: string;
    label: string;
    priceAMD: number;
}

export function PriceCalculator() {
    const { t } = useTranslation();

    // Adjusted pricing values to baseline Armenian Dram (AMD)
    const addons: Addon[] = [
        { id: 'led', label: t('calculator.addons.led'), priceAMD: 100000 },
        { id: 'soft-close', label: t('calculator.addons.softClose'), priceAMD: 72000 },
        { id: 'custom-color', label: t('calculator.addons.customColor'), priceAMD: 128000 },
    ];

    const materialPricesAMD: Record<Material, number> = {
        mdf: 32000,
        'solid-wood': 60000,
        premium: 88000,
    };

    const materialLabels: Record<Material, string> = {
        mdf: t('calculator.materials.mdf'),
        'solid-wood': t('calculator.materials.solidWood'),
        premium: t('calculator.materials.premium'),
    };

    // States
    const [style, setStyle] = useState<FurnitureStyle>('rectangle');
    const [material, setMaterial] = useState<Material>('solid-wood');
    const [height, setHeight] = useState<number>(200);

    // Dimension States
    const [width, setWidth] = useState<number>(120);
    const [sideWidthA, setSideWidthA] = useState<number>(60);
    const [sideWidthB, setSideWidthB] = useState<number>(120);
    const [sideWidthC, setSideWidthC] = useState<number>(60);

    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    const toggleAddon = (addonId: string) => {
        setSelectedAddons((prev) =>
            prev.includes(addonId)
                ? prev.filter((id) => id !== addonId)
                : [...prev, addonId]
        );
    };

    // Dynamic Area Calculation (outputting in m²)
    const calculateArea = (): number => {
        switch (style) {
            case 'v-shape':
                return (width * height) / 2 / 10000;
            case 'u-shape':
                const totalUWidth = sideWidthA + sideWidthB + sideWidthC;
                return (totalUWidth * height) / 10000;
            case 'rectangle':
            default:
                return (width * height) / 10000;
        }
    };

    const basePrice = materialPricesAMD[material];
    const area = calculateArea();
    const materialCost = basePrice * area;
    const addonsCost = selectedAddons.reduce((sum, addonId) => {
        const addon = addons.find((a) => a.id === addonId);
        return sum + (addon?.priceAMD || 0);
    }, 0);
    const totalPrice = Math.round(materialCost + addonsCost);

    // Armenian Dram Formatting Helper
    const formatAMD = (val: number) => {
        return new Intl.NumberFormat('hy-AM', {
            style: 'currency',
            currency: 'AMD',
            maximumFractionDigits: 0
        }).format(val).replace('AMD', '֏');
    };

    // Reusable styling for perfectly centered dropdown arrows
    const selectDropdownClass = "w-full pl-4 pr-10 py-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e54201] text-[#302c2b] appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23302c2b%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[position:right_16px_center] bg-no-repeat";

    return (
        <section id="calculator" className="py-24 bg-white" aria-labelledby="calc-heading">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f5f5f5] mb-4">
                        <Calculator className="text-[#e54201]" size={28} aria-hidden="true" />
                    </div>
                    <h2 id="calc-heading" className="text-4xl md:text-5xl text-[#302c2b] mb-4 font-semibold">
                        {t('calculator.heading', 'Custom Furniture Calculator')}
                    </h2>
                    <p className="text-lg text-gray-600">
                        {t('calculator.description', 'Select your build layout, sizing configurations, and premium additions.')}
                    </p>
                </div>

                <div className="bg-[#f5f5f5] rounded-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

                        {/* Style Selector */}
                        <div>
                            <label htmlFor="style-select" className="block text-[#302c2b] mb-3 font-medium">
                                {t('calculator.selectStyle', 'Furniture Layout Style')}
                            </label>
                            <div className="relative">
                                <select
                                    id="style-select"
                                    value={style}
                                    onChange={(e) => setStyle(e.target.value as FurnitureStyle)}
                                    className={selectDropdownClass}
                                >
                                    <option value="rectangle">{t('calculator.styles.rectangle', 'Square / Rectangle')}</option>
                                    <option value="v-shape">{t('calculator.styles.vshape', 'V-Shape / Triangle')}</option>
                                    <option value="u-shape">{t('calculator.styles.ushape', 'U-Shape Structure')}</option>
                                </select>
                            </div>
                        </div>

                        {/* Material Selector */}
                        <div>
                            <label htmlFor="material-select" className="block text-[#302c2b] mb-3 font-medium">
                                {t('calculator.selectMaterial')}
                            </label>
                            <div className="relative">
                                <select
                                    id="material-select"
                                    value={material}
                                    onChange={(e) => setMaterial(e.target.value as Material)}
                                    className={selectDropdownClass}
                                >
                                    {Object.entries(materialLabels).map(([value, label]) => (
                                        <option key={value} value={value}>
                                            {label} ({formatAMD(materialPricesAMD[value as Material])}/m²)
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Condition-based Inputs depending on Style */}
                        {style !== 'u-shape' ? (
                            <div>
                                <label htmlFor="width-input" className="block text-[#302c2b] mb-3 font-medium">
                                    {style === 'v-shape' ? t('calculator.baseWidth', 'Base Width (cm)') : t('calculator.width')}
                                </label>
                                <input
                                    id="width-input"
                                    type="number"
                                    value={width}
                                    onChange={(e) => setWidth(Number(e.target.value))}
                                    min={50}
                                    max={500}
                                    className="w-full px-4 py-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e54201] text-[#302c2b]"
                                />
                            </div>
                        ) : (
                            <>
                                <div>
                                    <label htmlFor="u-left-input" className="block text-[#302c2b] mb-3 font-medium">
                                        {t('calculator.uLeft', 'Left Wing Depth (cm)')}
                                    </label>
                                    <input
                                        id="u-left-input"
                                        type="number"
                                        value={sideWidthA}
                                        onChange={(e) => setSideWidthA(Number(e.target.value))}
                                        min={30}
                                        className="w-full px-4 py-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e54201] text-[#302c2b]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="u-back-input" className="block text-[#302c2b] mb-3 font-medium">
                                        {t('calculator.uBack', 'Back Wall Width (cm)')}
                                    </label>
                                    <input
                                        id="u-back-input"
                                        type="number"
                                        value={sideWidthB}
                                        onChange={(e) => setSideWidthB(Number(e.target.value))}
                                        min={50}
                                        className="w-full px-4 py-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e54201] text-[#302c2b]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="u-right-input" className="block text-[#302c2b] mb-3 font-medium">
                                        {t('calculator.uRight', 'Right Wing Depth (cm)')}
                                    </label>
                                    <input
                                        id="u-right-input"
                                        type="number"
                                        value={sideWidthC}
                                        onChange={(e) => setSideWidthC(Number(e.target.value))}
                                        min={30}
                                        className="w-full px-4 py-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e54201] text-[#302c2b]"
                                    />
                                </div>
                            </>
                        )}

                        {/* Unified Height Field */}
                        <div>
                            <label htmlFor="height-input" className="block text-[#302c2b] mb-3 font-medium">
                                {t('calculator.height')}
                            </label>
                            <input
                                id="height-input"
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(Number(e.target.value))}
                                min={50}
                                max={300}
                                className="w-full px-4 py-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e54201] text-[#302c2b]"
                            />
                        </div>
                    </div>

                    {/* Features checklist */}
                    <fieldset className="mb-8">
                        <legend className="block text-[#302c2b] mb-4 font-medium">
                            {t('calculator.additionalFeatures')}
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
                                        <span className="text-[#302c2b] font-medium">{addon.label}</span>
                                        {selectedAddons.includes(addon.id) && (
                                            <Check className="text-[#e54201]" size={20} aria-hidden="true" />
                                        )}
                                    </div>
                                    <span className="text-[#e54201] font-semibold text-sm">+{formatAMD(addon.priceAMD)}</span>
                                </button>
                            ))}
                        </div>
                    </fieldset>

                    {/* Total Price breakdown block */}
                    <article className="bg-white rounded-lg p-6 mb-6" aria-label={t('calculator.priceSummary')}>
                        <h3 className="text-xl text-[#302c2b] mb-4 font-semibold">
                            {t('calculator.priceBreakdown')}
                        </h3>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-gray-600">
                                <span>{t('calculator.materialCost', { area: area.toFixed(2) })}</span>
                                <span>{formatAMD(materialCost)}</span>
                            </div>
                            {selectedAddons.map((addonId) => {
                                const addon = addons.find((a) => a.id === addonId);
                                return addon ? (
                                    <div key={addonId} className="flex justify-between text-gray-600">
                                        <span>{t('calculator.upgrade', { addon: addon.label })}</span>
                                        <span>{formatAMD(addon.priceAMD)}</span>
                                    </div>
                                ) : null;
                            })}
                        </div>
                        <div className="border-t border-gray-200 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-2xl text-[#302c2b] font-bold">{t('calculator.totalEstimate')}</span>
                                <span className="text-3xl text-[#e54201] font-bold">{formatAMD(totalPrice)}</span>
                            </div>
                        </div>
                    </article>

                    <button
                        type="button"
                        className="w-full bg-[#e54201] text-white px-8 py-4 rounded font-bold hover:bg-[#c83a00] transition-colors shadow-sm"
                    >
                        {t('calculator.requestQuote')}
                    </button>
                </div>
            </div>
        </section>
    );
}