import React, { useState, useMemo } from 'react';
import { Droplets, ShoppingCart, FileText, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { formatKES, formatNumber } from '../utils/formatters';
import { PRODUCTS, STORE_INFO } from '../data/products';
import { Product } from '../types';

interface BoreholePumpSizerProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  onOpenQuoteModal: () => void;
}

export const BoreholePumpSizer: React.FC<BoreholePumpSizerProps> = ({
  onAddToCart,
  onOpenQuoteModal,
}) => {
  const [boreholeDepthMeters, setBoreholeDepthMeters] = useState<number>(80);
  const [dailyWaterDemandLiters, setDailyWaterDemandLiters] = useState<number>(15000);
  const [pipeDistanceMeters, setPipeDistanceMeters] = useState<number>(50);
  const [waterApplication, setWaterApplication] = useState<'irrigation' | 'domestic' | 'livestock' | 'commercial'>('irrigation');

  // Hydraulic Calculations
  const pumpCalculation = useMemo(() => {
    // Total Dynamic Head (TDH) = Static Water Level Depth + Pipe Friction (approx 8%) + Elevation to tank (e.g. 6m)
    const frictionLoss = (boreholeDepthMeters + pipeDistanceMeters) * 0.08;
    const tankElevation = 6;
    const totalHeadMeters = Math.round(boreholeDepthMeters + frictionLoss + tankElevation);

    // Flow rate required (based on 6 effective solar pumping hours per day in Kenya)
    const dailyHours = 6.0;
    const requiredFlowRateM3PerHour = Number((dailyWaterDemandLiters / 1000 / dailyHours).toFixed(1));

    // Determine Inverter & Pump Model
    let recommendedPumpHP = 1.0;
    let recommendedInverterModel = 'Themes 1.5kW (2HP) MPPT Solar Pump Inverter';
    let inverterPriceKES = 52000;
    let pumpModelName = 'Themes 1.0HP Submersible Stainless Borehole Pump';
    let pumpPriceKES = 65000;
    let panelCount = 4;

    if (totalHeadMeters > 150 || requiredFlowRateM3PerHour > 8) {
      recommendedPumpHP = 5.5;
      recommendedInverterModel = 'Themes 4.0kW (5.5HP) 3-Phase Solar Water Pump Inverter MPPT';
      inverterPriceKES = 72000;
      pumpModelName = 'Themes 5.5HP Deep Borehole Heavy Submersible Pump';
      pumpPriceKES = 125000;
      panelCount = 10;
    } else if (totalHeadMeters > 90 || requiredFlowRateM3PerHour > 4) {
      recommendedPumpHP = 3.0;
      recommendedInverterModel = 'Themes 2.2kW (3HP) Solar Water Pump Inverter MPPT';
      inverterPriceKES = 62000;
      pumpModelName = 'Themes 3.0HP Submersible Borehole Pump';
      pumpPriceKES = 88000;
      panelCount = 6;
    } else if (totalHeadMeters > 50 || requiredFlowRateM3PerHour > 2) {
      recommendedPumpHP = 1.5;
      recommendedInverterModel = 'Themes 1.5kW (2HP) Solar Pump Inverter MPPT';
      inverterPriceKES = 52000;
      pumpModelName = 'Themes 1.5HP Submersible Borehole Pump';
      pumpPriceKES = 75000;
      panelCount = 4;
    }

    const panelTotalWatts = panelCount * 550;
    const panelsPriceKES = panelCount * 14500;
    const accessoriesPriceKES = 32000; // Submersible cable, safety rope, wellhead, lightning surge protector
    const totalPackagePriceKES = inverterPriceKES + pumpPriceKES + panelsPriceKES + accessoriesPriceKES;

    return {
      totalHeadMeters,
      flowRateM3PerHour: requiredFlowRateM3PerHour,
      flowRateLitersPerHour: Math.round(requiredFlowRateM3PerHour * 1000),
      pumpHP: Math.max(1.0, recommendedPumpHP),
      inverterModel: recommendedInverterModel,
      pumpModel: pumpModelName,
      panelCount,
      panelTotalWatts,
      inverterPriceKES,
      pumpPriceKES,
      panelsPriceKES,
      accessoriesPriceKES,
      totalPackagePriceKES,
    };
  }, [boreholeDepthMeters, dailyWaterDemandLiters, pipeDistanceMeters]);

  const handleAddPumpKitToCart = () => {
    // Add Solar Panels
    const panels = PRODUCTS.find((p) => p.id === 'jinko-550w-mono') || PRODUCTS[0];
    onAddToCart(panels, pumpCalculation.panelCount);
  };

  return (
    <section className="py-10 bg-white border-t border-slate-200" id="borehole-pump-sizer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Droplets className="w-3.5 h-3.5 text-red-600" />
            <span>Themes Solar Water Pumping & Borehole Sizer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Direct Solar Borehole & Agricultural Pumping
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Zero generator fuel, zero electricity bills. Sized with MPPT inverters and heavy duty stainless steel submersible pumps.
          </p>
        </div>

        {/* Input Parameters & Real-Time Pump Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls */}
          <div className="lg:col-span-6 space-y-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base pb-2 border-b border-slate-200">
              Borehole & Water Parameters
            </h3>

            {/* Application */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Water Application Purpose:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'irrigation', label: 'Drip / Farming' },
                  { id: 'domestic', label: 'Estate / Home' },
                  { id: 'livestock', label: 'Cattle / Ranch' },
                  { id: 'commercial', label: 'Water Bottling' },
                ].map((app) => (
                  <button
                    key={app.id}
                    onClick={() => setWaterApplication(app.id as any)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      waterApplication === app.id
                        ? 'bg-blue-900 border-blue-900 text-white font-bold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {app.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Borehole Depth Slider */}
            <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">Borehole Depth / Pumping Level:</span>
                <span className="text-sm font-black text-blue-900 font-mono">{boreholeDepthMeters} meters</span>
              </div>
              <input
                type="range"
                min="20"
                max="250"
                step="5"
                value={boreholeDepthMeters}
                onChange={(e) => setBoreholeDepthMeters(parseInt(e.target.value))}
                className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Shallow (20m)</span>
                <span>Medium (120m)</span>
                <span>Deep (250m)</span>
              </div>
            </div>

            {/* Daily Water Demand */}
            <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">Daily Water Needed:</span>
                <span className="text-sm font-black text-blue-900 font-mono">
                  {formatNumber(dailyWaterDemandLiters)} Litres / day
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="60000"
                step="2000"
                value={dailyWaterDemandLiters}
                onChange={(e) => setDailyWaterDemandLiters(parseInt(e.target.value))}
                className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>2,000 L (Home)</span>
                <span>20,000 L (Farming)</span>
                <span>60,000 L+ (Commercial)</span>
              </div>
            </div>

            {/* Pipe Distance to Storage Tank */}
            <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">Horizontal Pipe Distance to Tank:</span>
                <span className="text-sm font-black text-blue-900 font-mono">{pipeDistanceMeters} meters</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={pipeDistanceMeters}
                onChange={(e) => setPipeDistanceMeters(parseInt(e.target.value))}
                className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900">
              <Truck className="w-4 h-4 text-red-600 shrink-0" />
              <span><strong>FREE Nairobi CBD Delivery</strong> on all pumping systems. Affordable upcountry courier dispatch.</span>
            </div>

          </div>

          {/* Sizing Output Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-red-400">
                    Solar Pumping Output
                  </span>
                  <h3 className="text-lg font-black text-white">Themes Recommended Kit</h3>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Total Dynamic Head</span>
                  <span className="text-red-400 font-black text-base">~{pumpCalculation.totalHeadMeters} Meters</span>
                </div>
              </div>

              {/* Pump Metrics */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Required Flow Rate:</span>
                  <span className="font-extrabold text-blue-300 text-sm">
                    {pumpCalculation.flowRateM3PerHour} m³/hr ({pumpCalculation.flowRateLitersPerHour} L/hr)
                  </span>
                </div>
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Pump Power Rating:</span>
                  <span className="font-extrabold text-red-400 text-sm">
                    {pumpCalculation.pumpHP} HP Motor (Submersible)
                  </span>
                </div>
              </div>

              {/* Bill of Materials */}
              <div className="space-y-2 text-xs">
                <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Inverter:</span>
                    <span className="font-semibold text-slate-100">{pumpCalculation.inverterModel}</span>
                  </div>
                  <span className="font-mono text-slate-300">{formatKES(pumpCalculation.inverterPriceKES)}</span>
                </div>

                <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Submersible Pump:</span>
                    <span className="font-semibold text-slate-100">{pumpCalculation.pumpModel}</span>
                  </div>
                  <span className="font-mono text-slate-300">{formatKES(pumpCalculation.pumpPriceKES)}</span>
                </div>

                <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Solar PV Array:</span>
                    <span className="font-semibold text-slate-100">
                      {pumpCalculation.panelCount}x Jinko 550W Panels ({pumpCalculation.panelTotalWatts} Wp)
                    </span>
                  </div>
                  <span className="font-mono text-slate-300">{formatKES(pumpCalculation.panelsPriceKES)}</span>
                </div>

                <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Accessories & Cable:</span>
                    <span className="font-semibold text-slate-100">Drop Cable, Safety Rope, Sensor, Lightning Box</span>
                  </div>
                  <span className="font-mono text-slate-300">{formatKES(pumpCalculation.accessoriesPriceKES)}</span>
                </div>
              </div>

              {/* Total Package Investment */}
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-xs text-slate-400 block">Complete Pumping Package (BOM):</span>
                  <span className="text-xs text-emerald-400">Zero Monthly Fuel / Grid Bills</span>
                </div>
                <span className="text-xl font-black text-red-400 font-mono">
                  {formatKES(pumpCalculation.totalPackagePriceKES)}
                </span>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={handleAddPumpKitToCart}
                  className="py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add Pump Kit to Cart</span>
                </button>
                <button
                  onClick={onOpenQuoteModal}
                  className="py-3 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-blue-700 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Request Official Quote</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
