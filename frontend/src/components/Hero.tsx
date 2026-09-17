import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  CircleDot,
  Sparkles,
  Zap,
} from 'lucide-react';

interface HeroProps {
  onExploreProducts: () => void;
  onOpenSizer: () => void;
  onOpenQuoteModal: () => void;
  onOpenAIAdvisor: () => void;
}

interface BannerSlide {
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

export const Hero: React.FC<HeroProps> = ({
  onExploreProducts,
  onOpenSizer,
  onOpenQuoteModal,
  onOpenAIAdvisor
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const slides: BannerSlide[] = [
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

  const totalSlides = slides.length;

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const deltaX = touchStartXRef.current - touchEndXRef.current;
      if (deltaX > 50) handleNext();
      if (deltaX < -50) handlePrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const activeSlide = slides[currentSlide];

  return (
    <div 
      className="relative bg-[#06112d] overflow-hidden text-white select-none border-b border-blue-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      id="hero-banner-section"
      role="region"
      aria-label="Interactive Product Highlights Carousel"
    >
      {/* Visual Slide Stage */}
      <div className="relative min-h-[360px] sm:min-h-[400px] lg:min-h-[440px] flex items-center">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-95`} />
              
              {/* Subtle spotlight glow behind hero */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(29,78,216,0.18),transparent_65%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06112d] via-transparent to-transparent" />
            </div>
          );
        })}

        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Copy */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-3.5 sm:space-y-4 text-left">
              
              {/* Clean Badge: 15 Years of Engineering Excellence */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d1e44] border border-blue-500/40 text-xs font-semibold shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0"></span>
                <span className="text-white font-bold tracking-wide">15 Years of Engineering Excellence</span>
              </div>

              {/* Category Subtitle */}
              <div className="text-xs font-extrabold uppercase tracking-widest text-[#f43f5e] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#f43f5e]" />
                <span>{activeSlide.categoryTitle}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {activeSlide.headline}{' '}
                <span className={`${activeSlide.accentColor} block mt-1`}>{activeSlide.accentWord}</span>
              </h1>

              {/* Concise Description */}
              <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed font-normal">
                {activeSlide.description}
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {activeSlide.featurePills.map((pill, idx) => (
                  <span 
                    key={idx}
                    className="bg-[#0a1736] border border-slate-700/60 px-3 py-1.5 rounded-lg text-xs text-slate-200 flex items-center gap-1.5 shadow-xs whitespace-nowrap"
                  >
                    <CircleDot className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>

            </div>

            {/* Right Column: Spotlight Card */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
              <div className="bg-[#0a1736] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden group">
                
                {/* Top Header Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#f43f5e] fill-[#f43f5e]" />
                    Featured Spotlight
                  </span>
                  <span className="bg-[#dc2626] text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                    {activeSlide.badgeTag}
                  </span>
                </div>

                {/* Card Image Container */}
                <div className="h-44 rounded-xl overflow-hidden mb-3 border border-slate-800 relative bg-gradient-to-b from-[#183944] via-[#122c36] to-[#0d2027] flex items-center justify-center">
                  
                  {activeSlide.id === 'lighting' ? (
                    /* High-fidelity Vector Render of the Hanging Concrete Cone Pendant Light */
                    <svg viewBox="0 0 320 180" className="w-full h-full object-cover">
                      <defs>
                        <radialGradient id="lampLightGlow" cx="50%" cy="40%" r="60%">
                          <stop offset="0%" stopColor="#2a5867" stopOpacity="0.6" />
                          <stop offset="60%" stopColor="#14323c" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#0b1b22" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="concreteShade" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8d99a6" />
                          <stop offset="25%" stopColor="#b0bcc9" />
                          <stop offset="45%" stopColor="#c5d1de" />
                          <stop offset="70%" stopColor="#8795a3" />
                          <stop offset="100%" stopColor="#5d6975" />
                        </linearGradient>
                        <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#475569" />
                          <stop offset="50%" stopColor="#94a3b8" />
                          <stop offset="100%" stopColor="#334155" />
                        </linearGradient>
                        <radialGradient id="shadeShadow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#000000" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                        </radialGradient>
                      </defs>

                      {/* Backdrop Glow */}
                      <rect width="320" height="180" fill="url(#lampLightGlow)" />

                      {/* Hanging Wire */}
                      <line x1="160" y1="0" x2="160" y2="44" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />

                      {/* Top socket / collar */}
                      <rect x="156.5" y="44" width="7" height="7" rx="1.5" fill="#475569" />

                      {/* Pendant Cone Shade */}
                      <path 
                        d="M 156.5 51 C 158 75, 172 105, 208 128 C 185 133, 135 133, 112 128 C 148 105, 162 75, 163.5 51 Z" 
                        fill="url(#concreteShade)" 
                      />

                      {/* Bottom Rim of Cone */}
                      <ellipse cx="160" cy="128" rx="48" ry="7.5" fill="url(#rimGrad)" />
                      <ellipse cx="160" cy="128.5" rx="45" ry="5.5" fill="#1e293b" opacity="0.85" />

                      {/* Ambient downward light glow */}
                      <ellipse cx="160" cy="142" rx="42" ry="8" fill="url(#shadeShadow)" />
                    </svg>
                  ) : (
                    <img
                      src={activeSlide.image}
                      alt={activeSlide.headline}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#061024]/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 text-left">
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block">CATEGORY</span>
                    <span className="text-xs font-bold text-white block mt-0.5">{activeSlide.categoryTitle}</span>
                  </div>
                </div>

                {/* Key Spec Highlights */}
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Engineering:</span>
                    <span className="font-bold text-white">15 Years Certified Support</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">CBD Delivery:</span>
                    <span className="font-bold text-[#00c950]">FREE & Direct</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Left Side Control Chevron */}
        <div className="absolute inset-y-0 left-2 sm:left-4 pointer-events-none flex items-center z-20">
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            title="Previous Slide"
            className="pointer-events-auto w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700/80 backdrop-blur-xs transition-all hover:scale-105 shadow-md active:scale-95 focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};