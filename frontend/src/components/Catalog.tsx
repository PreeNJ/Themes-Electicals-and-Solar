import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Star,
  ShoppingCart,
  Eye,
  ShieldCheck,
  Sliders,
  Truck,
  PackageCheck
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Product } from '../types';
import { PRODUCTS, POPULAR_BRANDS, CATEGORIES, STORE_INFO } from '../data/products';
import { formatKES } from '../utils/formatters';

interface CatalogProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewProduct: (product: Product) => void;
  comparedProducts: Product[];
  onToggleCompare: (product: Product) => void;
  allProducts?: Product[];
}

export const Catalog: React.FC<CatalogProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onAddToCart,
  onViewProduct,
  comparedProducts,
  onToggleCompare,
  allProducts = PRODUCTS
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(700000);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'all' && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }
      // In stock filter
      if (inStockOnly && product.stockCount <= 0) {
        return false;
      }
      // Price limit
      if (product.priceKES > maxPrice) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesShort = product.shortDesc.toLowerCase().includes(q);
        const matchesSpecs = Object.entries(product.specs).some(([k, v]) =>
          k.toLowerCase().includes(q) || v.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesShort && !matchesSpecs) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceKES - b.priceKES;
      if (sortBy === 'price-desc') return b.priceKES - a.priceKES;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [allProducts, selectedCategory, selectedBrand, inStockOnly, maxPrice, searchQuery, sortBy]);

  return (
    <section className="py-8 sm:py-12 bg-slate-50/50" id="products-catalog-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
              <span>Themes Electricals Inventory</span>
              <span>•</span>
              <span className="text-blue-900 font-bold">Utawala Showroom Stock</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight">
              Featured Systems & Equipment
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Top quality Solar Systems, Commercial Lighting, Borehole Solar Pumps, Power Backup Generators & Heat Pumps.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-white border border-slate-200 text-slate-800 px-3.5 py-2 rounded-xl shadow-2xs">
            <Truck className="w-4 h-4 text-red-600 shrink-0" />
            <span><strong>Nairobi CBD:</strong> FREE Delivery • <strong>Upcountry:</strong> Subsidized Dispatch</span>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 shadow-2xs ${selectedCategory === cat.id
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-900 border border-slate-200'
                }`}
            >
              <span>{cat.name}</span>
              {cat.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700'
                  }`}>
                  {cat.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Left Sidebar Filter Controls */}
          <div className="lg:col-span-3 space-y-6 bg-white p-5 rounded-2xl border border-slate-200 text-xs text-slate-800 shadow-2xs">

            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-1.5 font-bold text-sm text-blue-950">
                <Filter className="w-4 h-4 text-red-600" />
                <span>Filter Equipment</span>
              </div>
              {(selectedBrand !== 'all' || inStockOnly || maxPrice < 700000 || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedBrand('all');
                    setInStockOnly(false);
                    setMaxPrice(700000);
                    onSearchChange('');
                  }}
                  className="text-red-600 hover:underline text-[11px] font-semibold"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="font-bold text-slate-900 block">Manufacturer / Brand:</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-blue-600 focus:bg-white"
              >
                <option value="all">All Brands (Jinko, Growatt, Deye, Perkins...)</option>
                {POPULAR_BRANDS.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center font-bold">
                <span className="text-slate-900">Max Budget:</span>
                <span className="text-red-600 font-mono">{formatKES(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="700000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>KSh 5,000</span>
                <span>KSh 700,000+</span>
              </div>
            </div>

            {/* In Stock Only Checkbox */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-red-600 rounded"
                />
                <span className="font-semibold text-slate-800">In Stock Items Only</span>
              </label>
            </div>

            {/* Sort Dropdown */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="font-bold text-slate-900 block">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-blue-600 focus:bg-white"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>

            {/* Quick Showroom Help Card */}
            <div className="bg-blue-950 text-white p-3.5 rounded-xl space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-amber-400">
                <PackageCheck className="w-4 h-4" />
                <span>Physical Showroom</span>
              </div>
              <p className="text-[11px] text-slate-200 leading-tight">
                Visit us at Utawala, Jowin Business Arcade to inspect systems in person.
              </p>
              <a
                href={STORE_INFO.socialLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp: {STORE_INFO.phone}</span>
              </a>
            </div>

          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-9 space-y-4">

            {/* Results count & Active search notice */}
            <div className="flex items-center justify-between text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
              <span>
                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> equipment systems
                {selectedCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === selectedCategory)?.name}`}
              </span>
              {searchQuery && (
                <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded font-medium">
                  Search: &quot;{searchQuery}&quot;
                </span>
              )}
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3 shadow-2xs">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">No matching products found</h3>
                <p className="text-slate-500 text-xs max-w-sm mx-auto">
                  Try clearing your search query or adjusting your filters to see available inventory.
                </p>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    setSelectedBrand('all');
                    onSearchChange('');
                    setMaxPrice(700000);
                  }}
                  className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg text-xs hover:bg-red-700 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
                {filteredProducts.map((product) => {
                  const isCompared = comparedProducts.some((p) => p.id === product.id);
                  const isOutOfStock = product.stockCount <= 0;

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-blue-300 transition-all group shadow-2xs"
                    >
                      <div>
                        {/* Image Container with high-quality visual framing */}
                        <div className="relative aspect-square sm:aspect-auto sm:h-48 bg-slate-100 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          {product.badge && (
                            <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-red-600 text-white text-[9px] sm:text-[10px] font-black uppercase px-1.5 sm:px-2 py-0.5 rounded shadow-xs">
                              {product.badge}
                            </span>
                          )}
                          <span className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 bg-slate-900/90 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded border border-slate-700 backdrop-blur-2xs max-w-[calc(100%-1rem)] truncate">
                            {product.brand}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="p-2.5 sm:p-4 space-y-2 sm:space-y-2.5">
                          {/* Rating & Accurate Stock Counter */}
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              <span className="font-bold text-slate-800 text-[10px] sm:text-[11px]">{product.rating}</span>
                              <span className="text-slate-400 text-[9px] sm:text-[10px]">({product.reviewCount})</span>
                            </div>

                            {product.stockCount > 0 ? (
                              <span className="text-emerald-800 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded font-bold text-[9px] sm:text-[10px] border border-emerald-200 truncate max-w-full">
                                ● In Stock ({product.stockCount} left)
                              </span>
                            ) : (
                              <span className="text-red-700 bg-red-50 px-1.5 sm:px-2 py-0.5 rounded font-bold text-[9px] sm:text-[10px] border border-red-200">
                                Out of Stock
                              </span>
                            )}
                          </div>

                          {/* Product Title */}
                          <h3
                            onClick={() => onViewProduct(product)}
                            className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 hover:text-blue-700 cursor-pointer transition-colors"
                          >
                            {product.name}
                          </h3>

                          <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {product.shortDesc}
                          </p>

                          {/* Key Specs tags */}
                          <div className="flex flex-wrap gap-1 pt-1">
                            {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
                              <span key={key} className="bg-slate-100 text-slate-700 text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded font-mono font-medium truncate max-w-full">
                                {val}
                              </span>
                            ))}
                          </div>

                        </div>
                      </div>

                      {/* Pricing and Action Footer */}
                      <div className="p-2.5 sm:p-4 pt-0 space-y-2 sm:space-y-3">
                        <div className="flex items-baseline justify-between gap-1 pt-2 border-t border-slate-100">
                          <div>
                            <span className="text-xs sm:text-lg font-black text-blue-950 font-mono">
                              {formatKES(product.priceKES)}
                            </span>
                            {product.originalPriceKES && (
                              <span className="text-[11px] text-slate-400 line-through block font-mono">
                                {formatKES(product.originalPriceKES)}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => onViewProduct(product)}
                            className="text-blue-700 hover:text-blue-900 text-[10px] sm:text-xs font-bold flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Specs</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <button
                            onClick={() => onAddToCart(product, 1)}
                            disabled={isOutOfStock}
                            className={`flex-1 py-2 sm:py-2.5 font-bold rounded-xl text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 transition-colors shadow-xs ${isOutOfStock
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-700 text-white'
                              }`}
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span className="truncate">{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
                          </button>

                          {/* Compare toggle */}
                          <button
                            onClick={() => onToggleCompare(product)}
                            className={`p-2 sm:p-2.5 rounded-xl border text-xs font-semibold transition-colors shrink-0 ${isCompared
                                ? 'bg-blue-950 border-blue-950 text-white'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                              }`}
                            title={isCompared ? 'Remove from comparison' : 'Compare product'}
                          >
                            <Sliders className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
