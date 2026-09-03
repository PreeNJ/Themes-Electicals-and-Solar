import React from 'react';
import { Package, Zap, Sun, BatteryCharging, Check, ShoppingCart, FileText, ArrowRight, Truck } from 'lucide-react';
import { SOLAR_KITS } from '../data/products';
import { SolarKit, Product } from '../types';
import { formatKES } from '../utils/formatters';

interface SolarKitsSectionProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  onOpenQuoteModal: (kit?: SolarKit) => void;
  onOpenSizer: () => void;
}

export const SolarKitsSection: React.FC<SolarKitsSectionProps> = ({
  onAddToCart,
  onOpenQuoteModal,
  onOpenSizer
}) => {
  const handleAddKitToCart = (kit: SolarKit) => {
    // Add kit as bundled representative product
    const kitProduct: Product = {
      id: kit.id,
      name: kit.title,
      brand: 'Themes Electricals',
      category: 'kits',
      priceKES: kit.priceKES,
      originalPriceKES: kit.originalPriceKES,
      rating: 5.0,
      reviewCount: 36,
      inStock: true,
      stockCount: 15,
      image: kit.image,
      badge: kit.badge,
      shortDesc: `Complete solar package (${kit.powerRating}) with Inverter, Tier-1 Panels, Lithium Battery, Combiner Box, and Rails.`,
      description: `Full turnkey solar kit including ${kit.components.inverter}, ${kit.components.panels}, ${kit.components.battery}, and ${kit.components.accessories}. Backed by 15 years experience.`,
      specs: {
        'System Rating': kit.powerRating,
        'Inverter': kit.components.inverter,
        'Solar Array': kit.components.panels,
        'Battery Storage': kit.components.battery,
        'Estimated Daily Yield': `${kit.estimatedDailyYieldKWh} kWh/day`,
        'Warranty': kit.warranty
      },
      warranty: kit.warranty,
      features: kit.powers
    };

    onAddToCart(kitProduct, 1);
  };

  return (
    <section className="py-12 bg-sky-950 text-white" id="turnkey-solar-kits-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Package className="w-3.5 h-3.5" />
              <span>Turnkey Pre-Engineered Packages</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready-to-Install Home & Commercial Solar Kits
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Engineered by Themes Electricals (15+ Years Experience). Complete pre-matched systems with hybrid inverters, Tier-1 solar panels, LiFePO4 batteries, and pre-wired DC protection.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSizer}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold border border-blue-700 transition-colors shrink-0"
            >
              <span>Custom Sizer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Kits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLAR_KITS.map((kit) => (
            <div
              key={kit.id}
              className="bg-sky-900 rounded-2xl border border-sky-800 flex flex-col justify-between overflow-hidden hover:border-red-500/50 transition-all hover:shadow-xl group"
            >
              <div>
                {/* Header image & badge */}
                <div className="relative h-44 w-full bg-sky-950 overflow-hidden">
                  <img
                    src={kit.image}
                    alt={kit.title}
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md shadow-md">
                    {kit.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-blue-950/90 px-2.5 py-1 rounded text-[11px] font-mono font-bold text-red-400 border border-blue-800">
                    ~{kit.estimatedDailyYieldKWh} kWh/day
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-extrabold text-white text-base leading-snug">
                      {kit.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {kit.idealFor}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-red-400 font-mono">
                      {formatKES(kit.priceKES)}
                    </span>
                    {kit.originalPriceKES && (
                      <span className="text-xs text-slate-500 line-through font-mono">
                        {formatKES(kit.originalPriceKES)}
                      </span>
                    )}
                  </div>

                  {/* Bill of Materials list */}
                  <div className="bg-[#062f48] p-3 rounded-xl border border-sky-800 space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <Zap className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300 line-clamp-1">{kit.components.inverter}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sun className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300 line-clamp-1">{kit.components.panels}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <BatteryCharging className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300 line-clamp-1">{kit.components.battery}</span>
                    </div>
                  </div>

                  {/* Powers checklist */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block">
                      Appliances Powered:
                    </span>
                    {kit.powers.slice(0, 4).map((p, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="line-clamp-1">{p}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => handleAddKitToCart(kit)}
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Order Full Kit</span>
                </button>

                <button
                  onClick={() => onOpenQuoteModal(kit)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                >
                  <FileText className="w-3 h-3 text-blue-400" />
                  <span>Get Quotation</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
