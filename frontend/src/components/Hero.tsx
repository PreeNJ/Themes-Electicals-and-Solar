export interface BannerSlide {
  id: string;
  categoryTitle: string;
  headline: string;
  accentWord: string;
  description: string;
  badgeTag: string;
  featurePills: string[];
  image: string;
  bgGradient: string;
  accentColor: string;
}

export const slides: BannerSlide[] = [
  {
    id: 'lighting',
    categoryTitle: 'COMMERCIAL & HOME LIGHTING',
    headline: 'Brighter Spaces With',
    accentWord: 'High-Efficiency LEDs',
    description: 'Industrial UFO high bays, 60x60 ceiling panels, magnetic track lights & outdoor floodlights.',
    badgeTag: 'COMMERCIAL GRADE',
    featurePills: ['UFO High Bays', '60x60 Slim Panels', '50,000+ Hrs Lifespan'],
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#05112e] via-[#071942] to-[#05112e]',
    accentColor: 'text-[#f59e0b]'
  },
  {
    id: 'solar-power',
    categoryTitle: 'SOLAR ENERGY & BATTERY STORAGE',
    headline: 'Power Your Home With',
    accentWord: 'Tier-1 Solar Systems',
    description: 'Growatt & Deye hybrid inverters, Tier-1 solar panels & LiFePO4 batteries for 24/7 clean power.',
    badgeTag: 'POPULAR CHOICE',
    featurePills: ['Growatt & Deye Inverters', 'LiFePO4 Lithium', 'FREE Nairobi Delivery'],
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#05112e] via-[#081e4a] to-[#05112e]',
    accentColor: 'text-red-500'
  },
  {
    id: 'solar-pumps',
    categoryTitle: 'SOLAR WATER & IRRIGATION',
    headline: 'Deep Well & Borehole',
    accentWord: 'Solar Pumping Systems',
    description: 'Stainless steel submersible pumps and MPPT controllers engineered for farms and domestic boreholes up to 250m.',
    badgeTag: 'ZERO FUEL BILLS',
    featurePills: ['Depths to 250m', 'MPPT Controllers', 'Stainless Steel Body'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#05112e] via-[#07204c] to-[#05112e]',
    accentColor: 'text-emerald-400'
  },
  {
    id: 'street-lights',
    categoryTitle: 'OUTDOOR & SECURITY LIGHTING',
    headline: 'All-in-One Intelligent',
    accentWord: 'Solar Street Lights',
    description: 'Dusk-to-dawn radar motion sensors, integrated LiFePO4 batteries, and heavy-duty galvanized mounting.',
    badgeTag: 'ZERO POWER COST',
    featurePills: ['Radar Motion Sensor', 'IP67 Weatherproof', 'Dusk-to-Dawn Auto'],
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#05112e] via-[#081a42] to-[#05112e]',
    accentColor: 'text-red-400'
  },
  {
    id: 'generators-heaters',
    categoryTitle: 'BACKUP POWER & HEAT PUMPS',
    headline: 'Silent Generators &',
    accentWord: 'Energy-Saving Heat Pumps',
    description: 'Automatic transfer (ATS) diesel power backup paired with 75% energy-saving thermodynamic water heaters.',
    badgeTag: '75% POWER SAVING',
    featurePills: ['Silent Diesel ATS', '75% Energy Reduction', '2-Year Warranty'],
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#05112e] via-[#091e48] to-[#05112e]',
    accentColor: 'text-blue-300'
  }
];