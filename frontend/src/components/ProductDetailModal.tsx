import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  ShoppingCart,
  FileText,
  Check,
  AlertCircle
} from 'lucide-react';
import { Product } from '../types';
import { formatKES } from '../utils/formatters';
import { STORE_INFO } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenQuoteModal: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenQuoteModal
}) => {
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const isOutOfStock = product.stockCount <= 0;
  const isAtMaxStock = qty >= product.stockCount;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
      id="product-detail-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative cursor-default"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors focus:outline-hidden"
          id="close-product-modal-btn"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

          {/* Left Column: Image & Badges */}
          <div className="space-y-4">
            <div className="relative h-64 sm:h-72 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shadow-2xs">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black uppercase px-2.5 py-1 rounded shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Trust highlights */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                <span className="font-semibold text-slate-900">{product.warranty} (15 Years Experience)</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-red-600 shrink-0" />
                <span><strong>FREE Delivery in Nairobi CBD</strong>. Physical showroom in Utawala Jowin Arcade.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Title, Specs & Purchasing */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold text-slate-800">{product.rating}</span>
                  <span className="text-slate-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {product.name}
              </h2>
            </div>

            {/* Price & Accurate Stock Display */}
            <div className="flex items-baseline gap-3 pb-3 border-b border-slate-200">
              <div>
                <span className="text-2xl font-black text-blue-950 font-mono">
                  {formatKES(product.priceKES)}
                </span>
                {product.originalPriceKES && (
                  <span className="text-sm text-slate-400 line-through font-mono block">
                    {formatKES(product.originalPriceKES)}
                  </span>
                )}
              </div>
              <div className="ml-auto text-right">
                {product.stockCount > 0 ? (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full inline-block">
                    ● In Stock: {product.stockCount} units available
                  </span>
                ) : (
                  <span className="text-xs font-bold text-red-700 bg-red-100 px-2.5 py-1 rounded-full inline-block">
                    Out of Stock
                  </span>
                )}
                <span className="block text-[10px] text-slate-500 mt-0.5">Utawala Showroom Stock</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Key Features Bullet List */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-800 block">Key Highlights:</span>
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Technical Specifications Table */}
            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-bold text-slate-800 block">Technical Specifications:</span>
              <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-200 text-xs">
                {Object.entries(product.specs).map(([specKey, specVal]) => (
                  <div key={specKey} className="flex justify-between p-2">
                    <span className="text-slate-500 font-medium">{specKey}</span>
                    <span className="text-blue-950 font-bold font-mono text-right">{specVal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="pt-3 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-700">Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50 shadow-2xs">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    disabled={qty <= 1}
                    className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 font-bold text-sm disabled:text-slate-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3.5 py-1 text-xs font-bold font-mono text-slate-900 bg-white border-x border-slate-200">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(Math.min(product.stockCount, qty + 1))}
                    disabled={isAtMaxStock || isOutOfStock}
                    className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 font-bold text-sm disabled:text-slate-300 transition-colors"
                  >
                    +
                  </button>
                </div>

                <span className="text-xs font-mono font-bold text-slate-900 ml-auto">
                  Total: {formatKES(product.priceKES * qty)}
                </span>
              </div>

              {isAtMaxStock && (
                <p className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Maximum stock limit ({product.stockCount} units) selected</span>
                </p>
              )}

              {/* Action Buttons: Add to Cart & Proforma Quote */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => {
                    onAddToCart(product, qty);
                    onClose();
                  }}
                  disabled={isOutOfStock}
                  className={`py-3.5 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors ${isOutOfStock
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-red-600/20'
                    }`}
                  id="add-to-cart-modal-btn"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenQuoteModal(product);
                  }}
                  className="py-3.5 bg-blue-950 hover:bg-blue-900 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  id="generate-quote-modal-btn"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Generate Quote</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
