import React from 'react';
import { X, Sliders, ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { formatKES } from '../utils/formatters';

interface ProductComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemove: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductComparison: React.FC<ProductComparisonProps> = ({
  isOpen,
  onClose,
  products,
  onRemove,
  onAddToCart
}) => {
  if (!isOpen) return null;

  // Gather unique spec keys across compared products
  const allSpecKeys: string[] = Array.from(
    new Set(products.flatMap((p) => Object.keys(p.specs)))
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs cursor-pointer animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] shadow-2xl border border-slate-200 overflow-hidden flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 bg-blue-950 text-white flex items-center justify-between border-b border-blue-900 shrink-0">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-red-400" />
            <h2 className="font-extrabold text-sm">Product Specifications Comparison</h2>
            <span className="bg-red-600 text-white text-xs font-black px-2 py-0.5 rounded-full">
              {products.length} Items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="flex-1 overflow-auto p-6 text-xs text-slate-800">
          {products.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No products selected for comparison. Add products using the compare icon on product cards.
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-left font-bold text-slate-400 uppercase text-[10px] w-1/4">
                    Specification
                  </th>
                  {products.map((p) => (
                    <th key={p.id} className="p-3 text-left border-l border-slate-200 w-1/3">
                      <div className="space-y-2">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-20 h-20 object-cover rounded-lg border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="text-[10px] text-red-600 font-bold uppercase">{p.brand}</span>
                          <h4 className="font-bold text-slate-900 text-xs line-clamp-2">{p.name}</h4>
                          <span className="text-sm font-black text-red-600 font-mono block mt-1">
                            {formatKES(p.priceKES)}
                          </span>
                        </div>
                        <div className="flex gap-1.5 pt-1">
                          <button
                            onClick={() => onAddToCart(p)}
                            className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-[11px] flex items-center gap-1 shadow-sm"
                          >
                            <ShoppingCart className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                          <button
                            onClick={() => onRemove(p.id)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded"
                            title="Remove from comparison"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 border-t border-slate-200">
                <tr>
                  <td className="p-3 font-bold text-slate-600 bg-slate-50">Category</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3 border-l border-slate-200 capitalize font-medium">
                      {p.category.replace('_', ' ')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-600 bg-slate-50">Warranty</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3 border-l border-slate-200 font-semibold text-emerald-800">
                      {p.warranty}
                    </td>
                  ))}
                </tr>
                {allSpecKeys.map((key) => (
                  <tr key={key}>
                    <td className="p-3 font-medium text-slate-600 bg-slate-50">{key}</td>
                    {products.map((p) => (
                      <td key={p.id} className="p-3 border-l border-slate-200 font-mono text-slate-900">
                        {p.specs[key] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};
