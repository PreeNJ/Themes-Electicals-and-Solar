import React, { useState } from 'react';
import {
  Zap,
  Search,
  ShoppingBag,
  FileText,
  Sliders,
  PhoneCall,
  MapPin,
  Menu,
  X,
  Layers,
  Droplets,
  HelpCircle,
  Package,
  Mail,
  Truck
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Product, CartItem } from '../types';
import { STORE_INFO, CATEGORIES } from '../data/products';

interface HeaderProps {
  cart: CartItem[];
  comparedProducts: Product[];
  onOpenCart: () => void;
  onOpenQuoteModal: () => void;
  onOpenComparison: () => void;
  onOpenAIAdvisor: () => void;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateTab: (tab: 'catalog' | 'sizer' | 'pumps' | 'kits' | 'contact') => void;
  activeTab: 'catalog' | 'sizer' | 'pumps' | 'kits' | 'contact';
}

export const Header: React.FC<HeaderProps> = ({
  cart,
  comparedProducts,
  onOpenCart,
  onOpenQuoteModal,
  onOpenComparison,
  onOpenAIAdvisor,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onNavigateTab,
  activeTab
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const cartItemCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs" id="main-header">
      {/* Top Announcement Bar */}
      <div className="bg-blue-900 text-white text-xs py-1.5 px-4 font-medium" id="top-announcement-bar">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left flex-wrap">
            <span className="text-blue-100 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-red-300 shrink-0" />
              <strong className="text-white font-semibold">FREE Delivery in Nairobi CBD</strong> • Affordable Upcountry Dispatch • Utawala Jowin Business Arcade
            </span>
          </div>

          <div className="flex items-center gap-3 text-blue-100">
            <a
              href={STORE_INFO.socialLinks.phone}
              className="flex items-center gap-1.5 hover:text-white transition-colors bg-blue-950/80 px-2 py-0.5 rounded"
              title="Direct Phone Call"
              id="header-phone-link"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-300" />
              <span className="font-bold text-white tracking-wide">{STORE_INFO.phone}</span>
            </a>
            <a
              href={STORE_INFO.socialLinks.email}
              className="hidden lg:flex items-center gap-1 hover:text-white transition-colors"
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
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-0.5 rounded-full text-[11px] font-bold transition-all shadow-xs"
              id="header-whatsapp-link"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onNavigateTab('catalog');
                onSelectCategory('all');
              }}
              className="flex items-center gap-3 text-left focus:outline-hidden group"
              id="brand-logo-btn"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-700 to-red-600 flex items-center justify-center text-white shadow-md ring-2 ring-blue-100 group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6 text-white fill-amber-300 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-blue-900 whitespace-nowrap">Themes <span className="text-red-600">Electricals</span></span>
                </div>
                <p className="text-[11px] text-slate-500 font-semibold tracking-wide">
                  Solar Systems • Lighting • Pumps • Generators • Heat Pumps
                </p>
              </div>
            </button>
          </div>

          {/* Search Box (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative" id="header-search-container">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search solar panels, lighting, borehole pumps, generators, heat pumps..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (activeTab !== 'catalog') onNavigateTab('catalog');
                }}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
                id="header-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Chat Bot Advisor Button */}
            <button
              onClick={onOpenAIAdvisor}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 bg-sky-700 text-white hover:bg-sky-800 rounded-lg text-xs font-semibold shadow-xs transition-colors border border-sky-600"
              id="ai-advisor-header-btn"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Chat Bot Advisor</span>
            </button>

            {/* Comparison Button */}
            {comparedProducts.length > 0 && (
              <button
                onClick={onOpenComparison}
                className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                id="compare-header-btn"
                title="Compare Selected Products"
              >
                <Sliders className="w-3.5 h-3.5 text-blue-600" />
                <span>Compare ({comparedProducts.length})</span>
              </button>
            )}

            {/* Instant Formal Quote */}
            <button
              onClick={onOpenQuoteModal}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 hover:bg-sky-50 text-sky-800 rounded-lg text-xs font-bold border border-sky-200 hover:border-sky-300 transition-colors"
              id="quote-header-btn"
            >
              <FileText className="w-3.5 h-3.5 text-sky-600" />
              <span>Proforma Quote</span>
            </button>

            {/* Cart Button with count */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs shadow-md hover:shadow-lg transition-all focus:outline-hidden"
              id="cart-header-btn"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-blue-950 text-white text-[10px] font-black rounded-full h-4 min-w-4 px-1 flex items-center justify-center shadow-xs ring-1 ring-white">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold">Cart</span>
                {cartItemCount > 0 && (
                  <span className="hidden sm:inline text-[11px] font-semibold text-sky-100 bg-sky-800/60 px-1.5 py-0.5 rounded">
                    {cartItemCount} {cartItemCount === 1 ? 'Product' : 'Products'}
                  </span>
                )}
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-blue-900 hover:bg-slate-100 rounded-lg"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 md:hidden">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search solar, lighting, water pumps, generators..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (activeTab !== 'catalog') onNavigateTab('catalog');
              }}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Navigation Sub-Bar */}
      <nav className="bg-slate-950 text-white text-xs font-medium border-t border-slate-800" id="main-nav-bar">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-1 scrollbar-none gap-2">

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">

              {/* Category Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-colors shadow-xs"
                  id="categories-dropdown-btn"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Product Categories</span>
                </button>

                {categoriesDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-72 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-50 text-slate-800">
                    <div className="px-4 py-1.5 text-[11px] font-bold text-blue-900 uppercase tracking-wider border-b border-slate-100">
                      Themes Core Specialties
                    </div>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.id);
                          onNavigateTab('catalog');
                          setCategoriesDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-xs font-medium flex items-center justify-between text-slate-700 hover:text-blue-900 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span>{cat.name}</span>
                          {cat.badge && (
                            <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.5 rounded font-bold">
                              {cat.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-slate-400 text-[10px]">→</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Main Tab Links */}
              <button
                onClick={() => {
                  onNavigateTab('catalog');
                  onSelectCategory('all');
                }}
                className={`px-3 py-2 rounded-md transition-colors ${activeTab === 'catalog'
                  ? 'text-white bg-blue-700 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                id="nav-catalog-btn"
              >
                All Products
              </button>

              <button
                onClick={() => onNavigateTab('sizer')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${activeTab === 'sizer'
                  ? 'text-white bg-blue-700 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                id="nav-sizer-btn"
              >
                <Sliders className="w-3.5 h-3.5 text-blue-400" />
                <span>Solar Sizing Calculator</span>
                <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded font-bold">
                  Free
                </span>
              </button>

              <button
                onClick={() => onNavigateTab('pumps')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${activeTab === 'pumps'
                  ? 'text-white bg-blue-700 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                id="nav-pumps-btn"
              >
                <Droplets className="w-3.5 h-3.5 text-blue-400" />
                <span>Solar Pump Sizer</span>
              </button>

              <button
                onClick={() => onNavigateTab('kits')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${activeTab === 'kits'
                  ? 'text-white bg-blue-700 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                id="nav-kits-btn"
              >
                <Package className="w-3.5 h-3.5 text-amber-400" />
                <span>Turnkey Systems</span>
              </button>

              <button
                onClick={() => onNavigateTab('contact')}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${activeTab === 'contact'
                  ? 'text-white bg-blue-700 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                id="nav-contact-btn"
              >
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Showroom & Contact</span>
              </button>

            </div>

            {/* Right side help chip */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenAIAdvisor}
                className="flex items-center gap-1 text-slate-400 hover:text-blue-300 transition-colors text-[11px]"
              >
                <HelpCircle className="w-3.5 h-3.5 text-red-400" />
                <span>Need Technical Advice? Ask Chat Bot</span>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-sky-700 border-b border-sky-600 px-4 py-4 space-y-2 text-white">
          <div className="font-bold text-xs text-red-400 uppercase tracking-wider px-2 py-1">
            Themes Quick Navigation
          </div>
          <button
            onClick={() => {
              onNavigateTab('catalog');
              onSelectCategory('all');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg bg-sky-600 text-white font-semibold text-xs flex items-between"
          >
            <span>All Products Catalog</span>
            <span className="text-red-400 font-bold">→</span>
          </button>
          <button
            onClick={() => {
              onNavigateTab('sizer');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg bg-sky-600 text-sky-50 font-medium text-xs flex items-center justify-between"
          >
            <span>Solar Sizing & Load Calculator</span>
            <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">FREE</span>
          </button>
          <button
            onClick={() => {
              onNavigateTab('pumps');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg bg-sky-600 text-sky-50 font-medium text-xs flex items-center justify-between"
          >
            <span>Solar Water Pump Sizer</span>
            <span>💧</span>
          </button>
          <button
            onClick={() => {
              onNavigateTab('kits');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg bg-sky-600 text-sky-50 font-medium text-xs flex items-center justify-between"
          >
            <span>Turnkey Solar Kits</span>
            <span>📦</span>
          </button>
          <button
            onClick={() => {
              onNavigateTab('contact');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg bg-sky-600 text-sky-50 font-medium text-xs flex items-center justify-between"
          >
            <span>Showroom & Contact (Utawala)</span>
            <span>📍</span>
          </button>

          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => {
                onOpenAIAdvisor();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-md"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>Chat Bot Advisor</span>
            </button>
            <button
              onClick={() => {
                onOpenQuoteModal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 shadow-md"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Get Quote</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
