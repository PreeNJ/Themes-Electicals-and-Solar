import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartModal } from './components/CartModal';
import { SolarCalculatorModal } from './components/SolarCalculatorModal';
import { SolarPumpSizerModal } from './components/SolarPumpSizerModal';
import { QuotationModal } from './components/QuotationModal';
import { ContactModal } from './components/ContactModal';
import { AIAdvisorModal } from './components/AIAdvisorModal';
import { OrderLookupModal } from './components/OrderLookupModal';
import { Footer } from './components/Footer';
import { PRODUCTS, CATEGORIES, STORE_INFO } from './data/products';
import { CartItem, Product } from './types';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { 
  ShieldCheck, 
  Truck, 
  Wrench, 
  Sliders, 
  HelpCircle,
  FileText,
  Sparkles,
  Phone,
  Zap,
  ShoppingBag
} from 'lucide-react';

export function App() {
  // Navigation & Catalog Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeBrand, setActiveBrand] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Interactive Modals State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isPumpSizerOpen, setIsPumpSizerOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isOrderLookupOpen, setIsOrderLookupOpen] = useState(false);
  
  // Context passed into modals
  const [aiContext, setAiContext] = useState<string | null>(null);

  // Cart Management State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('themes_electricals_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save Cart to LocalStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('themes_electricals_cart', JSON.stringify(newCart));
    } catch {
      // ignore
    }
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      saveCart(updated);
    } else {
      saveCart([...cart, { product, quantity }]);
    }
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      saveCart(cart.filter((item) => item.product.id !== productId));
    } else {
      saveCart(
        cart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    saveCart(cart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      // Search Query filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.specs.some((spec) => spec.toLowerCase().includes(query));

      // Brand filter
      const matchesBrand = activeBrand === 'All' || product.brand === activeBrand;

      return matchesCategory && matchesSearch && matchesBrand;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // Default order
    });
  }, [selectedCategory, searchQuery, activeBrand, sortBy]);

  // Unique brands available for the current category
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    PRODUCTS.forEach((p) => {
      if (selectedCategory === 'All' || p.category === selectedCategory) {
        brands.add(p.brand);
      }
    });
    return ['All', ...Array.from(brands)];
  }, [selectedCategory]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-red-500 selection:text-white" id="themes-electricals-root">
      
      {/* Global Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenPumpSizer={() => setIsPumpSizerOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        onOpenAIAdvisor={() => {
          setAiContext(null);
          setIsAIOpen(true);
        }}
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          setActiveBrand('All');
        }}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Carousel Component */}
      <Hero
        onExploreProducts={() => {
          setSelectedCategory('All');
          const element = document.getElementById('catalog-section');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenSizer={() => setIsCalculatorOpen(true)}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        onOpenAIAdvisor={() => {
          setAiContext('Please recommend an optimal complete solar backup system for my home in Kenya.');
          setIsAIOpen(true);
        }}
      />

      {/* Trust & Guarantee Banner */}
      <section className="bg-white border-b border-slate-200 py-6" id="trust-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1246c7] flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">CBD Free Delivery</h4>
                <p className="text-xs text-slate-500 mt-0.5">Same-day parcel dispatch across Kenya</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Official Warranties</h4>
                <p className="text-xs text-slate-500 mt-0.5">Up to 10-year factory performance backing</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">EPRA Certified</h4>
                <p className="text-xs text-slate-500 mt-0.5">Expert installation engineers available</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Instant Proforma</h4>
                <p className="text-xs text-slate-500 mt-0.5">Download official PDF quotation in 30s</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Catalog Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full" id="catalog-section">
        
        {/* Category Pills & Quick Filter Scroller */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {selectedCategory === 'All' ? 'Complete Engineering Catalog' : selectedCategory}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Showing {filteredProducts.length} verified products with real-time Nairobi stock
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#1246c7]"
                id="catalog-sort-select"
              >
                <option value="featured">Featured / Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Department Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => {
                setSelectedCategory('All');
                setActiveBrand('All');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                selectedCategory === 'All'
                  ? 'bg-[#1246c7] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Categories ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = PRODUCTS.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActiveBrand('All');
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                    selectedCategory === cat
                      ? 'bg-[#1246c7] text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Secondary Brand Filter Row (If brands exist) */}
          {availableBrands.length > 2 && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200 overflow-x-auto text-xs">
              <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider shrink-0">
                Filter Brand:
              </span>
              {availableBrands.map((b) => (
                <button
                  key={b}
                  onClick={() => setActiveBrand(b)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    activeBrand === b
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAskAI={(p) => {
                  setAiContext(`I need more technical details, sizing guidance, or compatibility advice regarding: ${p.name} (Price: KSh ${p.price.toLocaleString()}). Brand: ${p.brand}.`);
                  setIsAIOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No matching products found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
              We couldn&apos;t find products matching &ldquo;{searchQuery}&rdquo;. Try clearing your search filters or ask our technical assistant.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setActiveBrand('All');
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => {
                  setAiContext(`Can you source or recommend an alternative for "${searchQuery}" for solar installation in Kenya?`);
                  setIsAIOpen(true);
                }}
                className="px-4 py-2 bg-[#1246c7] hover:bg-[#0e39a3] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Ask AI Engineer
              </button>
            </div>
          </div>
        )}

        {/* Bottom Interactive Engineering Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#0d2353] to-[#1246c7] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-xs font-bold">
              <Sliders className="w-3.5 h-3.5 text-amber-300" />
              <span>Free Engineering Assistance</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Unsure which solar inverter or pump fits your setup?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl font-normal">
              Use our interactive calculators to accurately compute daily kilowatt-hours, battery bank size, borehole pump lift, or talk to our certified engineers directly.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center shrink-0">
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="px-5 py-2.5 bg-white hover:bg-blue-50 text-[#0d2353] font-bold text-xs rounded-xl shadow-md transition-all hover:scale-105"
            >
              Open Solar Calculator
            </button>
            <button
              onClick={() => setIsPumpSizerOpen(true)}
              className="px-5 py-2.5 bg-blue-900/80 hover:bg-blue-900 text-white font-bold text-xs rounded-xl border border-blue-400/40 transition-all hover:scale-105"
            >
              Solar Pump Sizer
            </button>
          </div>
        </div>

      </main>

      {/* Floating Quick Action Widget - Positioned mid-right matching reference design */}
      <div className="fixed right-3 sm:right-4 top-[56%] -translate-y-1/2 z-40 flex flex-col gap-3 items-center">
        {/* Floating Phone Call Direct */}
        <a
          href={`tel:${STORE_INFO.phone}`}
          className="w-11 h-11 sm:w-12 sm:h-12 bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95"
          title={`Call Themes Electricals (${STORE_INFO.phone})`}
          id="floating-call-btn"
        >
          <Phone className="w-5 h-5 text-white" />
        </a>

        {/* Floating WhatsApp Direct */}
        <a
          href={STORE_INFO.socialLinks.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="w-11 h-11 sm:w-12 sm:h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95"
          title="WhatsApp Themes Electricals"
          id="floating-whatsapp-btn"
        >
          <WhatsAppIcon className="w-5 h-5" />
        </a>

        {/* Floating AI Solar Advisor with pink/red lightning bolt */}
        <button
          onClick={() => {
            setAiContext(null);
            setIsAIOpen(true);
          }}
          className="w-11 h-11 sm:w-12 sm:h-12 bg-[#1a2d5e] hover:bg-[#14244c] text-white rounded-full flex items-center justify-center shadow-xl border border-blue-900/60 transition-transform hover:scale-110 active:scale-95"
          title="Ask Themes Electricals AI Engineer"
          id="floating-ai-btn"
        >
          <Zap className="w-5 h-5 text-[#f43f5e] fill-[#f43f5e]" />
        </button>
      </div>

      {/* Floating Cart Trigger when items present */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-full shadow-xl transition-transform hover:scale-105"
            id="floating-cart-btn"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1.5 -right-1.5 bg-white text-red-600 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totalCartCount}
              </span>
            </div>
            <span>Cart ({totalCartCount} {totalCartCount === 1 ? 'Product' : 'Products'})</span>
          </button>
        </div>
      )}

      {/* Global Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const element = document.getElementById('catalog-section');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenPumpSizer={() => setIsPumpSizerOpen(true)}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        onOpenAIAdvisor={() => {
          setAiContext(null);
          setIsAIOpen(true);
        }}
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
      />

      {/* Slide-over Cart Drawer */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOpenQuoteModal={() => {
          setIsCartOpen(false);
          setIsQuoteModalOpen(true);
        }}
      />

      {/* Solar Sizing Calculator Modal */}
      <SolarCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onApplyToCart={(recommendedProducts) => {
