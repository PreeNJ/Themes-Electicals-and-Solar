import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Sun,
  Zap,
  BatteryCharging,
  RotateCcw,
  ShoppingCart,
  FileText,
  Info,
  Plus,
  Minus
} from 'lucide-react';
import { SIZING_APPLIANCES, PRODUCTS } from '../data/products';
import { SizingResult, Product } from '../types';
import { formatKES, formatNumber } from '../utils/formatters';

interface SolarSizerCalculatorProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  onOpenQuoteModalWithSizing: (result: SizingResult) => void;
}

export const SolarSizerCalculator: React.FC<SolarSizerCalculatorProps> = ({
  onAddToCart,
  onOpenQuoteModalWithSizing
}) => {
  const [calcMode, setCalcMode] = useState<'appliances' | 'bill'>('appliances');

  // Appliance Quantities and Hours state
  const [applianceState, setApplianceState] = useState<Record<string, { qty: number; hours: number }>>(() => {
    const initial: Record<string, { qty: number; hours: number }> = {};
    SIZING_APPLIANCES.forEach((app) => {
      initial[app.id] = { qty: app.defaultQty, hours: app.defaultHours };
    });
    return initial;
  });

  // Monthly Bill state
  const [monthlyBillKES, setMonthlyBillKES] = useState<number>(12000);
  const [backupHoursNight, setBackupHoursNight] = useState<number>(8);
  const [systemPreference, setSystemPreference] = useState<'hybrid' | 'offgrid' | 'gridtie'>('hybrid');
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setIsResetting(true);
    setFeedbackMessage(msg);
    setTimeout(() => setIsResetting(false), 500);
    setTimeout(() => setFeedbackMessage(null), 2500);
  };

  // Handle Appliance Changes
  const updateApplianceQty = (id: string, delta: number) => {
    setApplianceState((prev) => {
      const current = prev[id] || { qty: 0, hours: 4 };
      const newQty = Math.max(0, current.qty + delta);
      return { ...prev, [id]: { ...current, qty: newQty } };
    });
  };

  const updateApplianceHours = (id: string, hours: number) => {
    setApplianceState((prev) => {
      const current = prev[id] || { qty: 1, hours: 4 };
      return { ...prev, [id]: { ...current, hours: Math.max(0.5, Math.min(24, hours)) } };
    });
  };

  // Reset to default household profile
  const resetDefaults = () => {
    const initial: Record<string, { qty: number; hours: number }> = {};
    SIZING_APPLIANCES.forEach((app) => {
      initial[app.id] = { qty: app.defaultQty, hours: app.defaultHours };
    });
    setApplianceState(initial);
    setMonthlyBillKES(12000);
    setBackupHoursNight(8);
    setSystemPreference('hybrid');
    showFeedback('Default 3-bedroom profile restored');
  };

  // Clear all appliance quantities to 0
  const clearAllAppliances = () => {
    const blank: Record<string, { qty: number; hours: number }> = {};
    SIZING_APPLIANCES.forEach((app) => {
      blank[app.id] = { qty: 0, hours: app.defaultHours };
    });
    setApplianceState(blank);
    showFeedback('All appliances cleared to 0');
  };

  // Calculation Engine
  const sizingResult: SizingResult = useMemo(() => {
    let dailyWh = 0;
    let peakWatts = 0;

    if (calcMode === 'appliances') {
      SIZING_APPLIANCES.forEach((app) => {
        const item = applianceState[app.id] || { qty: 0, hours: 0 };
        if (item.qty > 0) {
          const itemDailyWh = app.wattage * item.qty * item.hours;
          dailyWh += itemDailyWh;
          peakWatts += app.wattage * item.qty * 0.75; // diversity factor for simultaneous load
        }
      });
    } else {
      // Kenya Power Tariff avg approx KES 32 per kWh
      const avgCostPerKWhKES = 32;
      const monthlyKWh = monthlyBillKES / avgCostPerKWhKES;
      dailyWh = (monthlyKWh / 30) * 1000;
      peakWatts = Math.max(1500, (dailyWh / 6) * 1.3);
    }

    // Safety margins and Kenya peak sun hours (avg 5.2 hrs/day)
    const dailyKWh = Math.max(1.5, dailyWh / 1000);
    const systemLossMultiplier = 1.25; // 25% allowance for inverter, cable and temperature losses
    const requiredDailyGenerationKWh = dailyKWh * systemLossMultiplier;

    // Peak Sun Hours in Nairobi / Kenya (~5.2 hours)
    const peakSunHours = 5.2;
    const requiredPanelWatts = (requiredDailyGenerationKWh * 1000) / peakSunHours;
    const panelUnitWattage = 550; // Jinko 550W TOPCon
    const recommendedPanelCount = Math.max(2, Math.ceil(requiredPanelWatts / panelUnitWattage));
    const recommendedPanelWatts = recommendedPanelCount * panelUnitWattage;

    // Inverter sizing with 25% surge safety margin
    const rawInverterKW = (peakWatts * 1.25) / 1000;
    let recommendedInverterKW = 3.0;
    let recommendedInverterName = 'Themes 3.2kVA / 3000W Pure Sine Wave 24V Inverter';

    if (rawInverterKW > 7.5) {
      recommendedInverterKW = 10.0;
      recommendedInverterName = 'Deye 10kW Three-Phase Hybrid Inverter 48V';
    } else if (rawInverterKW > 4.5) {
      recommendedInverterKW = 5.0;
      recommendedInverterName = 'Growatt 5000W / 5kVA SPF Off-Grid / Hybrid Inverter';
    } else if (rawInverterKW > 2.5) {
      recommendedInverterKW = 3.2;
      recommendedInverterName = 'Themes 3.2kVA / 3000W Pure Sine Wave 24V Inverter';
    } else {
      recommendedInverterKW = 1.5;
      recommendedInverterName = 'Themes 1.5kVA / 1200W Hybrid Inverter 12V';
    }

    // Battery storage calculation (Night energy required)
    const nightEnergyShare = calcMode === 'appliances' ? 0.65 : (backupHoursNight / 24) * 0.8;
    const requiredNightKWh = dailyKWh * nightEnergyShare;
    // LiFePO4 90% Depth of Discharge & 95% battery efficiency
    const recommendedBatteryKWh = Number(Math.max(2.5, (requiredNightKWh / 0.9)).toFixed(1));

    let recommendedBatteryModel = 'Themes 2.56kWh LiFePO4 Lithium Battery 24V';
    if (recommendedBatteryKWh > 8) {
      recommendedBatteryModel = '2x Felicity 5.12kWh LiFePO4 Lithium Bank (10.24kWh)';
    } else if (recommendedBatteryKWh > 4) {
      recommendedBatteryModel = 'Felicity 5.12kWh LiFePO4 Lithium Battery 48V';
    } else if (recommendedBatteryKWh > 2.5) {
      recommendedBatteryModel = 'Themes 2.56kWh LiFePO4 Lithium Battery 24V';
    }

    // Matched kit identifier
    let matchedKitId = 'kit-3kw';
    if (recommendedInverterKW >= 10) matchedKitId = 'kit-10kw';
    else if (recommendedInverterKW >= 5) matchedKitId = 'kit-5kw';
    else if (recommendedInverterKW <= 1.5) matchedKitId = 'kit-1kw';

    // Pricing & ROI Estimation in KES
    const equipmentCost = (recommendedPanelCount * 14500) + (recommendedInverterKW * 18000) + (recommendedBatteryKWh * 26000);
    const installationCost = Math.round(equipmentCost * 0.12);
    const totalCost = equipmentCost + installationCost;

    const monthlySavings = Math.round(dailyKWh * 30 * 32 * 0.92); // 92% offset capability
    const annualSavings = monthlySavings * 12;
    const paybackYears = Number((totalCost / (annualSavings || 1)).toFixed(1));

    return {
      dailyConsumptionKWh: Number(dailyKWh.toFixed(2)),
      peakPowerWatts: Math.round(peakWatts),
      recommendedInverterKW,
      recommendedInverterName,
      recommendedPanelWatts,
      recommendedPanelCount,
      recommendedPanelModel: `Jinko Tiger Pro 550W Mono (${recommendedPanelCount} panels)`,
      recommendedBatteryKWh,
      recommendedBatteryModel,
      estimatedEquipmentCostKES: equipmentCost,
      estimatedInstallationCostKES: installationCost,
      estimatedTotalKES: totalCost,
      monthlyBillSavingsKES: monthlySavings,
      paybackPeriodYears: Math.max(2.1, Math.min(4.8, paybackYears)),
      matchedKitId
    };
  }, [calcMode, applianceState, monthlyBillKES, systemPreference, backupHoursNight]);

  const handleAddSizedSystemToCart = () => {
    // Add the matching inverter, panels, and battery
    const panelProduct = PRODUCTS.find((p) => p.id === 'jinko-550w-mono') || PRODUCTS[0];
    onAddToCart(panelProduct, sizingResult.recommendedPanelCount);

    if (sizingResult.recommendedInverterKW >= 5.0) {
      const inv = PRODUCTS.find((p) => p.id === 'growatt-5kw-spf-hybrid') || PRODUCTS[0];
      onAddToCart(inv, 1);
    } else {
      const inv = PRODUCTS.find((p) => p.id === 'themes-3kw-24v-inverter') || PRODUCTS[0];
      onAddToCart(inv, 1);
    }

    const bat = PRODUCTS.find((p) => p.id === 'felicity-5.12kwh-lithium') || PRODUCTS[0];
    const batQty = sizingResult.recommendedBatteryKWh > 6 ? 2 : 1;
    onAddToCart(bat, batQty);
  };

  return (
    <section className="py-10 bg-slate-50 border-t border-slate-200" id="solar-sizer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Sliders className="w-3.5 h-3.5 text-red-600" />
            <span>Themes Electricals System Sizer & ROI Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Accurately Size Your Solar & Power Solution
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Engineered with <strong>15 years of technical expertise</strong>. Calculate your exact solar panels, inverter, and battery specs for Kenyan conditions.
          </p>
        </div>

        {/* Calculation Mode Selector Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-200 p-1 rounded-xl flex gap-1 max-w-md w-full">
            <button
              onClick={() => setCalcMode('appliances')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${calcMode === 'appliances'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
                }`}
            >
              1. Sizing by Appliances
            </button>
            <button
              onClick={() => setCalcMode('bill')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${calcMode === 'bill'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
                }`}
            >
              2. Sizing by KPLC Bill (KES)
            </button>
          </div>
        </div>

        {/* Main Grid: Inputs on Left, Real-Time Result Dashboard on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-5">

            {calcMode === 'appliances' ? (
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Select Your Daily Household & Office Appliances</h3>
                    <p className="text-xs text-slate-500">Adjust quantity and running hours per day</p>
                  </div>

                  {/* Reset Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearAllAppliances}
                      className="text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium px-2 py-1 rounded-md hover:bg-slate-100"
                      title="Set all appliance quantities to 0"
                      id="clear-all-appliances-btn"
                    >
                      Clear All (0)
                    </button>
                    <button
                      onClick={resetDefaults}
                      className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-all font-bold border border-red-200/60 shadow-2xs"
                      title="Reset to typical 3-bedroom home default settings"
                      id="reset-defaults-appliances-btn"
                    >
                      <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
                      <span>Reset Defaults</span>
                    </button>
                  </div>
                </div>

                {/* Feedback Toast Notification */}
                {feedbackMessage && (
                  <div className="mb-3 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2 animate-in fade-in duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                <div className="space-y-3 divide-y divide-slate-100">
                  {SIZING_APPLIANCES.map((app) => {
                    const current = applianceState[app.id] || { qty: 0, hours: app.defaultHours };
                    const isSelected = current.qty > 0;

                    return (
                      <div key={app.id} className={`pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${isSelected ? 'opacity-100' : 'opacity-70'}`}>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-800 text-sm">{app.name}</span>
                            <span className="text-[11px] text-slate-400 font-mono">({app.wattage}W each)</span>
                          </div>
                          {isSelected && (
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                              <span className="text-slate-400">Hours/day:</span>
                              <input
                                type="range"
                                min="0.5"
                                max="24"
                                step="0.5"
                                value={current.hours}
                                onChange={(e) => updateApplianceHours(app.id, parseFloat(e.target.value))}
                                className="w-24 sm:w-32 accent-red-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                              />
                              <span className="font-bold text-slate-800 text-xs w-12">{current.hours} hrs</span>
                            </div>
                          )}
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => updateApplianceQty(app.id, -1)}
                            disabled={current.qty === 0}
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 flex items-center justify-center text-slate-700 font-bold transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-bold text-slate-900 text-sm">
                            {current.qty}
                          </span>
                          <button
                            onClick={() => updateApplianceQty(app.id, 1)}
                            className="w-7 h-7 rounded-lg bg-red-100 hover:bg-red-200 text-red-900 flex items-center justify-center font-bold transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            ) : (
              /* Sizing by KPLC Bill */
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Current Monthly KPLC Electricity Bill</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      We use current Kenya Power tariffs (~KES 32/kWh) to estimate your power demand.
                    </p>
                  </div>
                  <button
                    onClick={resetDefaults}
                    className="self-start sm:self-center flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-all font-bold border border-red-200/60 shadow-2xs"
                    title="Reset to default KSh 12,000 monthly bill"
                    id="reset-kplc-bill-btn"
                  >
                    <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
                    <span>Reset Defaults</span>
                  </button>
                </div>

                {/* Feedback Toast Notification */}
                {feedbackMessage && (
                  <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2 animate-in fade-in duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {/* Preset Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[4000, 8000, 15000, 30000].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setMonthlyBillKES(preset)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${monthlyBillKES === preset
                          ? 'bg-blue-50 border-blue-600 text-blue-950 ring-1 ring-blue-600'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                      {formatKES(preset)} / mo
                    </button>
                  ))}
                </div>

                {/* Slider and Custom Input */}
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">Enter or Slide Monthly Bill:</label>
                    <span className="text-lg font-black text-red-600 font-mono">
                      {formatKES(monthlyBillKES)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="80000"
                    step="1000"
                    value={monthlyBillKES}
                    onChange={(e) => setMonthlyBillKES(parseInt(e.target.value))}
                    className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                    <span>KSh 2,000</span>
                    <span>KSh 40,000</span>
                    <span>KSh 80,000+</span>
                  </div>
                </div>

                {/* Night Backup Preference */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800">
                    Desired Battery Backup Autonomy During Night & Blackouts:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { hours: 6, label: '6 Hours (Essential)' },
                      { hours: 10, label: '10 Hours (Full Night)' },
                      { hours: 24, label: '24 Hours (Full Off-Grid)' },
                    ].map((opt) => (
                      <button
                        key={opt.hours}
                        onClick={() => setBackupHoursNight(opt.hours)}
                        className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${backupHoursNight === opt.hours
                            ? 'bg-blue-900 border-blue-900 text-white font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* System Type Preference */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-slate-900 block">System Architecture:</span>
                <span className="text-slate-500">Hybrid Inverter with Smart LiFePO4 Storage (Recommended for Kenya)</span>
              </div>
              <div className="flex gap-1.5">
                {(['hybrid', 'offgrid', 'gridtie'] as const).map((pref) => (
                  <button
                    key={pref}
                    onClick={() => setSystemPreference(pref)}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs uppercase transition-colors ${systemPreference === pref
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                  >
                    {pref === 'hybrid' ? 'Hybrid Solar' : pref === 'offgrid' ? 'Off-Grid' : 'Grid-Tie'}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Sizing Results Dashboard (Right Column) */}
          <div className="lg:col-span-5 space-y-4">

            <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">

              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-red-400">
                      Themes Engineered Solution
                    </span>
                    <button
                      onClick={resetDefaults}
                      className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                      title="Refresh & Reset Overview to defaults"
                      id="overview-refresh-btn"
                    >
                      <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin text-red-400' : ''}`} />
                    </button>
                  </div>
                  <h3 className="text-lg font-black text-white">Recommended Solar Kit</h3>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Daily Energy Need</span>
                  <span className="text-red-400 font-black text-base">{sizingResult.dailyConsumptionKWh} kWh/day</span>
                </div>
              </div>

              {/* Equipment Specifications Grid */}
              <div className="space-y-3 text-xs">

                {/* Inverter */}
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-red-600/20 text-red-400 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Recommended Inverter:</span>
                    <span className="font-bold text-slate-100 text-sm">{sizingResult.recommendedInverterName}</span>
                    <span className="text-[11px] text-blue-300 block mt-0.5 font-mono">
                      Rating: {sizingResult.recommendedInverterKW}kW • Pure Sine Wave MPPT
                    </span>
                  </div>
                </div>

                {/* Solar Panels */}
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 shrink-0">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Solar PV Array (Tier-1 Monocrystalline):</span>
                    <span className="font-bold text-slate-100 text-sm">
                      {sizingResult.recommendedPanelCount}x Jinko 550W N-Type TOPCon Panels
                    </span>
                    <span className="text-[11px] text-blue-300 block mt-0.5 font-mono">
                      Total Array Power: {formatNumber(sizingResult.recommendedPanelWatts)} Wp
                    </span>
                  </div>
                </div>

                {/* Battery Storage */}
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 shrink-0">
                    <BatteryCharging className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Energy Storage (LiFePO4 Lithium):</span>
                    <span className="font-bold text-slate-100 text-sm">{sizingResult.recommendedBatteryModel}</span>
                    <span className="text-[11px] text-emerald-300 block mt-0.5 font-mono">
                      Usable Capacity: {sizingResult.recommendedBatteryKWh} kWh (6000+ Cycles)
                    </span>
                  </div>
                </div>

              </div>

              {/* Financial & Cost Breakdown */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Hardware & Solar PV Equipment:</span>
                  <span className="font-mono font-semibold">{formatKES(sizingResult.estimatedEquipmentCostKES)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Combiner Box, Protection Breakers & Cables:</span>
                  <span className="font-mono font-semibold">{formatKES(sizingResult.estimatedInstallationCostKES)}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                  <span className="font-bold text-slate-100">Estimated Total Investment:</span>
                  <span className="text-lg font-black text-red-400 font-mono">
                    {formatKES(sizingResult.estimatedTotalKES)}
                  </span>
                </div>
              </div>

              {/* ROI & Payback Banner */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-emerald-950/60 border border-emerald-800/50 p-2.5 rounded-xl">
                  <span className="text-emerald-300 text-[11px] block">Est. Monthly Savings</span>
                  <span className="text-base font-black text-emerald-400">
                    ~{formatKES(sizingResult.monthlyBillSavingsKES)}/mo
                  </span>
                </div>
                <div className="bg-blue-950/60 border border-blue-800/50 p-2.5 rounded-xl">
                  <span className="text-blue-300 text-[11px] block">Estimated Payback</span>
                  <span className="text-base font-black text-blue-400">
                    {sizingResult.paybackPeriodYears} Years
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleAddSizedSystemToCart}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all"
                  id="add-sized-system-cart-btn"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Load Sized System to Cart</span>
                </button>

                <div>
                  <button
                    onClick={() => onOpenQuoteModalWithSizing(sizingResult)}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Get Proforma Quote</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Note info badge */}
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <span>
                All Themes Electricals systems feature genuine Tier-1 warranties (25-year panel linear output, 5-10 year inverters) & FREE Nairobi CBD delivery.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
