import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Truck, 
  Mail, 
  ShoppingBag,
  FileText, 
  Sliders, 
  PhoneCall, 
  MapPin, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  Zap,
  Package,
  Droplets,
  Layers
} from 'lucide-react';
import { STORE_INFO, CATEGORIES } from '../data/products';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuoteModal: () => void;
  onOpenCalculator: () => void;
  onOpenPumpSizer: () => void;
  onOpenContactModal: () => void;
  onOpenAIAdvisor: () => void;
  onOpenOrderLookup: () => void;
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenQuoteModal,
  onOpenCalculator,
  onOpenPumpSizer,
  onOpenContactModal,
  onOpenAIAdvisor,
  onSelectCategory,
  selectedCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const handleCategoryClick = (cat: string) => {
    onSelectCategory(cat);
    setCategoriesOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs" id="main-header">
      {/* Top Announcement Bar */}
      <div className="bg-[#132c66] text-white text-xs py-1.5 px-4 font-medium" id="top-announcement-bar">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left flex-wrap">
            <span className="text-blue-100 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-blue-300 shrink-0" />
              <strong className="text-white font-semibold">FREE Delivery in Nairobi CBD</strong> • Affordable Upcountry Dispatch • Utawala Jowin Business Arcade
            </span>
          </div>

          <div className="flex items-center gap-3 text-blue-100">
            <a 
              href={STORE_INFO.socialLinks.phone}
              className="flex items-center gap-1.5 bg-[#183d8a] hover:bg-[#1e49a3] px-3 py-1 rounded-full text-xs font-semibold text-white transition-colors"
              title="Direct Phone Call"
              id="header-phone-link"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-200" />
              <span className="font-bold text-white tracking-wide">+254713317582</span>
            </a>
            <a 
              href={STORE_INFO.socialLinks.email} 
              className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors text-xs text-blue-100"
              title="Send an Email"
              id="header-email-link"
            >
              <Mail className="w-3.5 h-3.5 text-blue-200" />
              <span>{STORE_INFO.email}</span>
            </a>
            <a 
              href={STORE_INFO.socialLinks.whatsapp}
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 bg-[#00a859] hover:bg-[#008f4c] text-white px-3 py-1 rounded-md text-xs font-bold transition-all shadow-xs"
              id="header-whatsapp-link"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header / Search Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => onSelectCategory('All')}
            className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
            id="header-logo-btn"
          >
            <div className="w-10 h-10 bg-[#1246c7] rounded-xl flex items-center justify-center shadow-md group-hover:bg-[#0e39a3] transition-colors border border-blue-500/30">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center text-xl sm:text-2xl font-black tracking-tight">
                <span className="text-[#0d2353]">Themes</span>
                <span className="text-[#dc2626] ml-1">Electricals</span>
              </div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider -mt-0.5">
                Solar & Electrical Hub • Nairobi
              </div>
            </div>
          </div>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search solar panels, lithium batteries, inverters, solar water pumps, UFO lights..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1246c7] focus:border-transparent transition-all placeholder:text-slate-400"
                id="main-search-input"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-16 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1"
                >
                  Clear
                </button>
              )}
              <button 
                onClick={() => {}}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#1246c7] hover:bg-[#0e39a3] text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
                id="header-search-btn"
              >
                Search
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Advisor Button */}
            <button
              onClick={onOpenAIAdvisor}
              className="flex items-center gap-2 bg-[#0e275d] hover:bg-[#0a1e4a] text-white px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-xs border border-blue-800"
              title="Interactive AI Solar Engineer"
              id="header-ai-btn"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              <div className="text-left hidden xl:block">
                <div className="text-[11px] leading-none text-white font-bold">Chat Bot</div>
                <div className="text-[9px] text-blue-200 font-normal">Advisor</div>
              </div>
            </button>

            {/* Instant Quotation Generator */}
            <button
              onClick={onOpenQuoteModal}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg text-xs font-bold transition-all border border-slate-300"
              title="Generate PDF Proforma Invoice"
              id="header-quote-btn"
            >
              <FileText className="w-4 h-4 text-red-600 shrink-0" />
              <div className="text-left hidden lg:block">
                <div className="text-[11px] leading-none font-bold">Proforma</div>
                <div className="text-[9px] text-slate-500 font-normal">Quote</div>
              </div>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-sm"
              id="header-cart-btn"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-[#dc2626] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold">Cart</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 md:hidden"
              id="mobile-menu-toggle"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar (Only shown on small screens) */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search solar panels, inverters, lights..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#1246c7]"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Bar (Blue Theme) */}
      <div className="bg-[#0e275d] border-t border-blue-900/60 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Category Dropdown Toggle + Quick Links */}
            <div className="flex items-center gap-1">
              
              {/* Product Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white px-4 py-2.5 font-bold text-xs uppercase tracking-wider transition-colors"
                  id="categories-dropdown-btn"
                >
                  <Menu className="w-4 h-4" />
                  <span>Product Categories</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {categoriesOpen && (
                  <div 
                    className="absolute top-full left-0 w-64 bg-white border border-slate-200 shadow-xl rounded-b-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setCategoriesOpen(false)}
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      Select Department
                    </div>
                    <button
                      onClick={() => handleCategoryClick('All')}
                      className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between hover:bg-blue-50 transition-colors ${
                        selectedCategory === 'All' ? 'text-[#1246c7] bg-blue-50/70 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>All Products & Systems</span>
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors ${
                          selectedCategory === cat ? 'text-[#1246c7] bg-blue-50/70 font-bold' : 'text-slate-700'
                        }`}
                      >
                        <span>{cat}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Direct Navigation Links */}
              <button
                onClick={() => onSelectCategory('All')}
                className={`px-3 py-2 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  selectedCategory === 'All' 
                    ? 'text-white bg-blue-900/80 font-bold' 
                    : 'text-slate-200 hover:text-white hover:bg-blue-900/50'
                }`}
                id="nav-all-products-btn"
              >
                <Layers className="w-4 h-4 text-blue-400" />
                <span>All Products</span>
              </button>

              <button
                onClick={onOpenCalculator}
                className="flex items-center gap-2 text-slate-200 hover:text-white hover:bg-blue-900/50 px-3 py-1.5 rounded-md transition-colors text-xs font-semibold whitespace-nowrap"
                id="nav-calc-btn"
              >
                <Sliders className="w-4 h-4 text-blue-400" />
                <span>Solar Sizing Calculator</span>
                <span className="bg-[#dc2626] text-white text-[10px] px-1.5 py-0.5 rounded font-black">
                  Free
                </span>
              </button>

              <button
                onClick={onOpenPumpSizer}
                className="flex items-center gap-2 text-slate-200 hover:text-white hover:bg-blue-900/50 px-3 py-1.5 rounded-md transition-colors text-xs font-semibold whitespace-nowrap"
                id="nav-pump-sizer-btn"
              >
                <Droplets className="w-4 h-4 text-blue-400" />
                <span>Solar Pump Sizer</span>
              </button>

              <button
                onClick={() => onSelectCategory('Solar Kits')}
                className="flex items-center gap-2 text-slate-200 hover:text-white hover:bg-blue-900/50 px-3 py-1.5 rounded-md transition-colors text-xs font-semibold whitespace-nowrap"
                id="nav-kits-btn"
              >
                <Package className="w-4 h-4 text-amber-400" />
                <span>Turnkey Systems</span>
              </button>

              <button
                onClick={onOpenContactModal}
                className="flex items-center gap-2 text-slate-200 hover:text-white hover:bg-blue-900/50 px-3 py-1.5 rounded-md transition-colors text-xs font-semibold whitespace-nowrap"
                id="nav-contact-btn"
              >
                <MapPin className="w-4 h-4 text-red-400" />
                <span>Showroom & Contact</span>
              </button>

            </div>

            {/* Right side helper info */}
            <div className="flex items-center gap-4 text-xs">
              <button
                onClick={onOpenAIAdvisor}
                className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold transition-colors"
                id="nav-ask-ai-quick-btn"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Need Technical Advice? Ask Chat Bot</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d2353] text-white border-t border-blue-900 px-4 py-4 space-y-3 animate-in fade-in duration-150">
          <div className="text-[10px] uppercase tracking-wider text-blue-300 font-bold">Quick Navigation</div>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onSelectCategory('All');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-blue-900/60 rounded-lg text-left text-xs font-bold flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-blue-400" />
              <span>All Products</span>
            </button>
            <button
              onClick={() => {
                onOpenCalculator();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-blue-900/60 rounded-lg text-left text-xs font-bold flex items-center gap-2"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Solar Calculator</span>
            </button>
            <button
              onClick={() => {
                onOpenPumpSizer();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-blue-900/60 rounded-lg text-left text-xs font-bold flex items-center gap-2"
            >
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span>Pump Sizer</span>
            </button>
            <button
              onClick={() => {
                onOpenQuoteModal();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-blue-900/60 rounded-lg text-left text-xs font-bold flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Instant Quote</span>
            </button>
          </div>

          <div className="pt-2 border-t border-blue-900/80">
            <div className="text-[10px] uppercase tracking-wider text-blue-300 font-bold mb-2">Departments</div>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors flex items-center justify-between ${
                    selectedCategory === cat ? 'bg-red-600 text-white font-bold' : 'text-slate-200 hover:bg-blue-900/50'
                  }`}
                >
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-blue-900/80 flex items-center justify-between text-xs">
            <a 
              href={`tel:${STORE_INFO.phone}`} 
              className="flex items-center gap-1 text-white font-bold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-green-400" />
              <span>{STORE_INFO.phone}</span>
            </a>
            <button
              onClick={() => {
                onOpenContactModal();
                setMobileMenuOpen(false);
              }}
              className="text-blue-300 underline"
            >
              Showroom Location
            </button>
          </div>
        </div>
      )}
    </header>
  );
};