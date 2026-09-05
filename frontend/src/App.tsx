import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { SolarSizerCalculator } from './components/SolarSizerCalculator';
import { BoreholePumpSizer } from './components/BoreholePumpSizer';
import { SolarKitsSection } from './components/SolarKitsSection';
import { ContactAndShowroom } from './components/ContactAndShowroom';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { QuoteModal } from './components/QuoteModal';
import { ProductComparison } from './components/ProductComparison';
import { Product, CartItem, SolarKit, SizingResult } from './types';
import { Zap, ShoppingBag, ShoppingCart, Phone, ArrowLeft, Home, Sun, Droplets, Package, MapPin, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { formatKES } from './utils/formatters';
import { STORE_INFO, PRODUCTS } from './data/products';

type AppTab = 'catalog' | 'sizer' | 'pumps' | 'kits' | 'contact';

export default function App() {
  // Navigation & Filtering State
  const [activeTab, setActiveTab] = useState<AppTab>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dynamic Products Inventory State (Tracks and updates stock on purchases)
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  // Cart & Comparison State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);

  // Modals & Drawers State
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  // Specific Quote Context State
  const [quoteKit, setQuoteKit] = useState<SolarKit | null>(null);
  const [quoteSizingResult, setQuoteSizingResult] = useState<SizingResult | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize Browser History & Hash for seamless Back/Forward Navigation
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace('#', '') as AppTab;
      if (['catalog', 'sizer', 'pumps', 'kits', 'contact'].includes(hash)) {
        setActiveTab(hash);
      } else {
        setActiveTab('catalog');
      }
    };

    // Initial check on load
    handleHashSync();

    window.addEventListener('popstate', handleHashSync);
    window.addEventListener('hashchange', handleHashSync);
    return () => {
      window.removeEventListener('popstate', handleHashSync);
      window.removeEventListener('hashchange', handleHashSync);
    };
  }, []);

  const navigateToTab = useCallback((tab: AppTab) => {
    setActiveTab(tab);
    if (tab === 'catalog') {
      window.history.pushState({ tab }, '', window.location.pathname);
    } else {
      window.history.pushState({ tab }, '', `#${tab}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart Management with Stock Bounds Enforcement
  const handleAddToCart = (product: Product, quantity = 1) => {
    // Find current stock in live state
    const currentProduct = products.find(p => p.id === product.id) || product;
    const maxStock = currentProduct.stockCount;

    if (maxStock <= 0) {
      showToast(`Sorry, "${product.name.slice(0, 28)}..." is currently out of stock.`);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      const currentQty = existing ? existing.quantity : 0;
      const targetQty = currentQty + quantity;

      if (targetQty > maxStock) {
        const allowedAdd = Math.max(0, maxStock - currentQty);
        if (allowedAdd <= 0) {
          showToast(`Maximum stock limit (${maxStock} units) already in your cart.`);
          return prev;
        }
        showToast(`Added remaining ${allowedAdd} units (Max stock: ${maxStock}) to cart.`);
        if (existing) {
          return prev.map(item => item.product.id === product.id ? { ...item, quantity: maxStock } : item);
        }
        return [...prev, { product: currentProduct, quantity: maxStock }];
      }

      showToast(`Added ${quantity}x "${product.name.slice(0, 30)}..." to your cart!`);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: targetQty }
            : item
        );
      }
      return [...prev, { product: currentProduct, quantity }];
    });
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    const currentProduct = products.find(p => p.id === productId);
    const maxStock = currentProduct ? currentProduct.stockCount : 999;

    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            if (nextQty > maxStock) {
              showToast(`Cannot exceed available stock limit (${maxStock} units).`);
              return { ...item, quantity: maxStock };
            }
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Item removed from cart.");
  };

  const handleClearCart = () => {
    setCart([]);
    showToast("Cart cleared.");
  };

  // Decrements stock when an order is confirmed / placed
  const handleOrderSuccess = (purchasedItems: CartItem[]) => {
    setProducts((prev) =>
      prev.map((prod) => {
        const purchased = purchasedItems.find((i) => i.product.id === prod.id);
        if (purchased) {
          const updatedStock = Math.max(0, prod.stockCount - purchased.quantity);
          return {
            ...prod,
            stockCount: updatedStock,
            inStock: updatedStock > 0
          };
        }
        return prod;
      })
    );

    // Also update currently viewed product if open
    if (viewingProduct) {
      const matching = purchasedItems.find(i => i.product.id === viewingProduct.id);
      if (matching) {
        const newStock = Math.max(0, viewingProduct.stockCount - matching.quantity);
        setViewingProduct({
          ...viewingProduct,
          stockCount: newStock,
          inStock: newStock > 0
        });
      }
    }

    setCart([]);
    showToast("Order placed successfully! Stock inventory has been updated.");
  };

  // Comparison Management
  const handleToggleCompare = (product: Product) => {
    setComparedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        showToast('You can compare up to 3 products at a time.');
        return prev;
      }
      showToast(`Added "${product.name.slice(0, 24)}..." to comparison.`);
      return [...prev, product];
    });
  };

  const handleRemoveCompared = (productId: string) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  // Open Quote Modal Handlers
  const handleOpenQuoteGeneral = (kit?: SolarKit) => {
    setQuoteKit(kit || null);
    setQuoteSizingResult(null);
    setIsQuoteOpen(true);
  };

  const handleOpenQuoteWithSizing = (result: SizingResult) => {
    setQuoteSizingResult(result);
    setQuoteKit(null);
    setIsQuoteOpen(true);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartKES = cart.reduce((sum, item) => sum + item.product.priceKES * item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-sky-600 selection:text-white">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-950 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-800 flex items-center gap-3 text-xs font-semibold animate-in slide-in-from-bottom-5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header with embedded bag count */}
      <Header
        cart={cart}
        comparedProducts={comparedProducts}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuoteModal={() => handleOpenQuoteGeneral()}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateTab={navigateToTab}
        activeTab={activeTab}
      />

      {/* Main Content Sections Based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'catalog' && (
          <>
            <Hero
              onExploreProducts={() => {
                const el = document.getElementById('products-catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenSizer={() => navigateToTab('sizer')}
              onOpenQuoteModal={() => handleOpenQuoteGeneral()}
            />

            {/* Turnkey Kits Showcase Strip */}
            <SolarKitsSection
              onAddToCart={handleAddToCart}
              onOpenQuoteModal={(kit) => handleOpenQuoteGeneral(kit)}
              onOpenSizer={() => navigateToTab('sizer')}
            />

            {/* Product Catalog with Real-time Stock */}
            <Catalog
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onAddToCart={handleAddToCart}
              onViewProduct={(p) => {
                const latest = products.find(prod => prod.id === p.id) || p;
                setViewingProduct(latest);
              }}
              comparedProducts={comparedProducts}
              onToggleCompare={handleToggleCompare}
              allProducts={products}
            />

            {/* Solar Sizer Teaser */}
            <SolarSizerCalculator
              onAddToCart={handleAddToCart}
              onOpenQuoteModalWithSizing={handleOpenQuoteWithSizing}
            />

            {/* Borehole Pumping Calculator */}
            <BoreholePumpSizer
              onAddToCart={handleAddToCart}
              onOpenQuoteModal={() => handleOpenQuoteGeneral()}
            />

            {/* Contact & Showroom */}
            <ContactAndShowroom />
          </>
        )}

        {/* Subpage View: Solar Sizer Calculator */}
        {activeTab === 'sizer' && (
          <div className="py-4 sm:py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
                <button
                  onClick={() => navigateToTab('catalog')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-sky-50 hover:text-sky-600 text-slate-700 font-bold text-xs sm:text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home / Product Catalog</span>
                </button>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span>Home</span>
                  <span>/</span>
                  <span className="text-blue-900 font-bold">Solar Sizer Calculator</span>
                </div>
              </div>
            </div>

            <SolarSizerCalculator
              onAddToCart={handleAddToCart}
              onOpenQuoteModalWithSizing={handleOpenQuoteWithSizing}
            />
          </div>
        )}

        {/* Subpage View: Borehole Pump Sizer */}
        {activeTab === 'pumps' && (
          <div className="py-4 sm:py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
                <button
                  onClick={() => navigateToTab('catalog')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-sky-50 hover:text-sky-600 text-slate-700 font-bold text-xs sm:text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home / Product Catalog</span>
                </button>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span>Home</span>
                  <span>/</span>
                  <span className="text-blue-900 font-bold">Borehole & Solar Pump Sizer</span>
                </div>
              </div>
            </div>

            <BoreholePumpSizer
              onAddToCart={handleAddToCart}
              onOpenQuoteModal={() => handleOpenQuoteGeneral()}
            />
          </div>
        )}

        {/* Subpage View: Turnkey Solar Kits */}
        {activeTab === 'kits' && (
          <div className="py-4 sm:py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
                <button
                  onClick={() => navigateToTab('catalog')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-sky-50 hover:text-sky-600 text-slate-700 font-bold text-xs sm:text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home / Product Catalog</span>
                </button>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span>Home</span>
                  <span>/</span>
                  <span className="text-blue-900 font-bold">Turnkey Solar Power Packages</span>
                </div>
              </div>
            </div>

            <SolarKitsSection
              onAddToCart={handleAddToCart}
              onOpenQuoteModal={(kit) => handleOpenQuoteGeneral(kit)}
              onOpenSizer={() => navigateToTab('sizer')}
            />
          </div>
        )}

        {/* Subpage View: Contact & Showroom */}
        {activeTab === 'contact' && (
          <div className="py-4 sm:py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
                <button
                  onClick={() => navigateToTab('catalog')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-sky-50 hover:text-sky-600 text-slate-700 font-bold text-xs sm:text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home / Product Catalog</span>
                </button>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span>Home</span>
                  <span>/</span>
                  <span className="text-blue-900 font-bold">Showroom & Store Location</span>
                </div>
              </div>
            </div>

            <ContactAndShowroom />
          </div>
        )}
      </main>

      {/* Floating contact actions */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5 items-end">
        <a
          href={STORE_INFO.socialLinks.phone}
          className="w-12 h-12 bg-sky-500 hover:bg-sky-400 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          title={`Call Themes Electricals (${STORE_INFO.phone})`}
          aria-label={`Call Themes Electricals at ${STORE_INFO.phone}`}
          id="floating-call-btn"
        >
          <Phone className="w-5 h-5" />
        </a>

        <a
          href={STORE_INFO.socialLinks.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          title="WhatsApp Themes Electricals"
          aria-label="WhatsApp Themes Electricals"
          id="floating-whatsapp-btn"
        >
          <WhatsAppIcon className="w-6 h-6" />
        </a>

      </div>

      {/* Global Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          navigateToTab('catalog');
        }}
        onNavigateTab={navigateToTab}
      />

      {/* Modals and Drawers */}
      <ProductDetailModal
        product={viewingProduct}
        onClose={() => setViewingProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenQuoteModal={(p) => handleOpenQuoteGeneral()}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOpenQuoteModal={() => {
          setIsCartOpen(false);
          setIsQuoteOpen(true);
        }}
        onOrderSuccess={handleOrderSuccess}
        onNavigateToProducts={() => {
          setIsCartOpen(false);
          navigateToTab('catalog');
          setTimeout(() => {
            const el = document.getElementById('products-catalog-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }}
      />

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        cart={cart}
        customKit={quoteKit}
        sizingResult={quoteSizingResult}
      />

      <ProductComparison
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        products={comparedProducts}
        onRemove={handleRemoveCompared}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

    </div>
  );
}
