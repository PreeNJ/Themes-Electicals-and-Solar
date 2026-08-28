import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ShieldCheck,
  Truck,
  Award,
  ArrowRight,
  Sliders,
  FileCheck2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Zap,
  RotateCcw
} from 'lucide-react';
import { STORE_INFO } from '../data/products';

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
  primaryActionLabel: string;
  onPrimaryAction: 'sizer' | 'explore' | 'quote' | 'ai';
  secondaryActionLabel: string;
  onSecondaryAction: 'sizer' | 'explore' | 'quote' | 'ai';
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
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const slides: BannerSlide[] = [
    {
      id: 'solar-power',
      categoryTitle: 'Solar Energy & Battery Storage',
      headline: 'Power Your Home With',
      accentWord: 'Tier-1 Solar Systems',
      description: 'Growatt & Deye hybrid inverters, Tier-1 solar panels & LiFePO4 batteries for 24/7 clean power.',
      primaryActionLabel: 'Size Solar System',
      onPrimaryAction: 'sizer',
      secondaryActionLabel: 'Explore Solar Kits',
      onSecondaryAction: 'explore',
      badgeTag: 'Popular Choice',
      featurePills: ['Growatt & Deye Inverters', 'LiFePO4 Lithium', 'FREE Nairobi Delivery'],
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
      bgGradient: 'from-sky-800 via-sky-700 to-sky-600',
      accentColor: 'text-sky-300'
    },
    {
      id: 'lighting',
      categoryTitle: 'Commercial & Home Lighting',
      headline: 'Brighter Spaces With',
      accentWord: 'High-Efficiency LEDs',
      description: 'Industrial UFO high bays, 60x60 ceiling panels, magnetic track lights & outdoor floodlights.',
      primaryActionLabel: 'Shop Lighting Systems',
      onPrimaryAction: 'explore',
      secondaryActionLabel: 'Get Instant Quote',
      onSecondaryAction: 'quote',
      badgeTag: 'Commercial Grade',
      featurePills: ['UFO High Bays', '60x60 Slim Panels', '50,000+ Hrs Lifespan'],
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
      bgGradient: 'from-sky-800 via-sky-700 to-sky-600',
      accentColor: 'text-amber-400'
    },
    {
      id: 'solar-pumps',
      categoryTitle: 'Solar Water & Irrigation',
      headline: 'Deep Well & Borehole',
      accentWord: 'Solar Pumping Systems',
      description: 'Stainless steel submersible pumps and MPPT controllers engineered for farms and domestic boreholes up to 250m.',
      primaryActionLabel: 'Explore Water Pumps',
      onPrimaryAction: 'explore',
      secondaryActionLabel: 'Get Proforma Quote',
      onSecondaryAction: 'quote',
      badgeTag: 'Zero Fuel Bills',
      featurePills: ['Depths to 250m', 'MPPT Controllers', 'Stainless Steel Body'],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      bgGradient: 'from-sky-800 via-sky-700 to-sky-600',
      accentColor: 'text-emerald-400'
    },
    {
      id: 'street-lights',
      categoryTitle: 'Outdoor & Security Lighting',
      headline: 'All-in-One Intelligent',
      accentWord: 'Solar Street Lights',
      description: 'Dusk-to-dawn radar motion sensors, integrated LiFePO4 batteries, and heavy-duty galvanized mounting.',
      primaryActionLabel: 'View Street Lights',
      onPrimaryAction: 'explore',
      secondaryActionLabel: 'Ask AI Advisor',
      onSecondaryAction: 'ai',
      badgeTag: 'Zero Power Cost',
      featurePills: ['Radar Motion Sensor', 'IP67 Weatherproof', 'Dusk-to-Dawn Auto'],
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80',
      bgGradient: 'from-sky-800 via-sky-700 to-sky-600',
      accentColor: 'text-sky-300'
    },
    {
      id: 'generators-heaters',
      categoryTitle: 'Backup Power & Heat Pumps',
      headline: 'Silent Generators &',
      accentWord: 'Energy-Saving Heat Pumps',
      description: 'Automatic transfer (ATS) diesel power backup paired with 75% energy-saving thermodynamic water heaters.',
      primaryActionLabel: 'Explore Generators',
      onPrimaryAction: 'explore',
      secondaryActionLabel: 'Request Official Quote',
      onSecondaryAction: 'quote',
      badgeTag: '75% Power Saving',
      featurePills: ['Silent Diesel ATS', '75% Energy Reduction', '2-Year Warranty'],
      image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80',
      bgGradient: 'from-sky-800 via-sky-700 to-sky-600',
      accentColor: 'text-blue-400'
    }
  ];

  const totalSlides = slides.length;

  // Infinite Forward Loop: advances from last slide back to first slide smoothly
  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // Infinite Backward Loop: reverses from first slide to last slide smoothly
  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto slide effect that loops indefinitely
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch Swipe Handlers for Mobile Users
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      handleNext(); // swipe left -> go next
    } else if (distance < -minSwipeDistance) {
      handlePrev(); // swipe right -> go prev
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const triggerAction = (actionType: 'sizer' | 'explore' | 'quote' | 'ai') => {
    switch (actionType) {
      case 'sizer':
        onOpenSizer();
        break;
      case 'explore':
        onExploreProducts();
        break;
      case 'quote':
        onOpenQuoteModal();
        break;
      case 'ai':
        onOpenAIAdvisor();
        break;
    }
  };

  const activeSlide = slides[currentSlide];

  return (
    <div
      className="relative bg-sky-800 text-white overflow-hidden select-none"
      id="hero-banner-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Featured Categories Carousel"
    >
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Dynamic Slide Background with Smooth Fade */}
      <div className="relative min-h-[380px] sm:min-h-[440px] lg:min-h-[470px] flex items-center">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          const hasError = imageErrorMap[slide.id];
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
            >
              {/* Background gradient & Image Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-70`} />
              {!hasError ? (
                <img
                  src={slide.image}
                  alt={slide.categoryTitle}
                  onError={() => setImageErrorMap((prev) => ({ ...prev, [slide.id]: true }))}
                  className="absolute inset-0 w-full h-full object-cover opacity-55 sm:opacity-65"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 bg-radial from-blue-600/20 to-transparent opacity-40" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/25 to-transparent" />
            </div>
          );
        })}

        {/* Content Container with Responsive Typography */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-3 sm:space-y-4 text-left">

              {/* Clean Badge: 15 Years of Engineering Excellence (No location) */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/80 border border-blue-500/40 text-xs font-semibold shadow-inner">
                <span className="flex h-2 w-2 rounded-full bg-sky-300 animate-pulse"></span>
                <span className="text-white font-bold tracking-wide">15 Years of Engineering Excellence</span>
              </div>

              {/* Category Subtitle */}
              <div className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-sky-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeSlide.categoryTitle}</span>
              </div>

              {/* Main Headline - Adaptable Font Size Across All Screens */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight sm:leading-tight">
                {activeSlide.headline}{' '}
                <span className={`${activeSlide.accentColor} inline-block`}>{activeSlide.accentWord}</span>
              </h1>

              {/* Concise Description */}
              <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed font-normal">
                {activeSlide.description}
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5">
                {activeSlide.featurePills.map((pill, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-900/90 border border-slate-700/80 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs text-slate-300 flex items-center gap-1 shadow-xs whitespace-nowrap"
                  >
                    <CheckCircle2 className="w-3 h-3 text-sky-300 shrink-0" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>

              {/* Action Buttons - Mobile-Friendly 44px Minimum Touch Targets */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 sm:pt-3">
                <button
                  onClick={() => triggerAction(activeSlide.onPrimaryAction)}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-sky-500/30 transition-all transform active:scale-95 min-h-[44px]"
                  id={`hero-slide-primary-${activeSlide.id}`}
                >
                  <Sliders className="w-4 h-4 text-white stroke-[2.5]" />
                  <span>{activeSlide.primaryActionLabel}</span>
                </button>

                <button
                  onClick={() => triggerAction(activeSlide.onSecondaryAction)}
                  className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 min-h-[44px]"
                  id={`hero-slide-secondary-${activeSlide.id}`}
                >
                  <span>{activeSlide.secondaryActionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Right Column: Clean Non-Overlapping Snapshot Card (Desktop & Tablet) */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden group">

                {/* Clean Non-Overlapping Top Header Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-sky-300" />
                    Featured Spotlight
                  </span>
                  <span className="bg-sky-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                    {activeSlide.badgeTag}
                  </span>
                </div>

                {/* Card Image Container */}
                <div className="h-36 sm:h-40 rounded-xl overflow-hidden mb-3 border border-slate-700/90 relative bg-slate-950">
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.headline}
                    onError={(e) => {
                      // Graceful fallback to avoid broken image icon
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-3 right-3 text-left">
                    <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider block">Category</span>
                    <span className="text-xs font-bold text-white line-clamp-1">{activeSlide.categoryTitle}</span>
                  </div>
                </div>

                {/* Key Spec Highlights */}
                <div className="space-y-1.5 text-[11px] text-slate-300 mb-3.5 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Engineering:</span>
                    <span className="font-bold text-white">15 Years Certified Support</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">CBD Delivery:</span>
                    <span className="font-bold text-emerald-400">FREE & Direct</span>
                  </div>
                </div>

                {/* Instant Quote Button */}
                <button
                  onClick={() => triggerAction('quote')}
                  className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Request Official Proforma</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* In-banner Subtle Side Controls */}
        <div className="absolute inset-y-0 left-0 right-0 pointer-events-none flex items-center justify-between px-2 sm:px-4 z-20">
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            title="Previous Slide"
            className="pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-sky-900/80 hover:bg-sky-500 text-white flex items-center justify-center border border-sky-300/40 backdrop-blur-xs transition-all hover:scale-105 shadow-md active:scale-95 focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Slide"
            title="Next Slide"
            className="pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-sky-900/80 hover:bg-sky-500 text-white flex items-center justify-center border border-sky-300/40 backdrop-blur-xs transition-all hover:scale-105 shadow-md active:scale-95 focus:outline-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sliding Indicators & Continuous Loop Status */}
      <div className="relative z-20 bg-slate-950/95 border-t border-slate-800/80 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">

          {/* Pagination Indicators, Next/Prev & Slide Counter */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                title="Previous Slide"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                title="Next Slide"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Jump to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${isActive
                      ? 'w-7 sm:w-8 bg-sky-400 shadow-xs'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                  />
                );
              })}
            </div>
            <span className="text-[11px] text-slate-400 font-mono ml-1">
              {currentSlide + 1} / {totalSlides}
            </span>
          </div>

          {/* Quick Trust Highlights */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-slate-300 flex-wrap justify-center">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-300 shrink-0" />
              <span>15 Years Experience</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>FREE CBD Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Direct Hotline: {STORE_INFO.phone}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
