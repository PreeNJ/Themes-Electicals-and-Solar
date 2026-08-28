import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingCart, 
  ShoppingBag,
  FileText, 
  Smartphone, 
  CheckCircle2, 
  Truck, 
  Wrench, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CartItem } from '../types';
import { formatKES } from '../utils/formatters';
import { STORE_INFO } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOpenQuoteModal: () => void;
  onOrderSuccess?: (purchasedItems: CartItem[]) => void;
  onNavigateToProducts?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onOpenQuoteModal,
  onOrderSuccess,
  onNavigateToProducts
}) => {
  const [deliveryType, setDeliveryType] = useState<'nairobi_cbd' | 'pickup' | 'nairobi_metro' | 'outside_nairobi'>('nairobi_cbd');
  const [includeInstallation, setIncludeInstallation] = useState<boolean>(false);
  const [isCheckingOutMPesa, setIsCheckingOutMPesa] = useState<boolean>(false);
  const [mpesaPhone, setMpesaPhone] = useState<string>('+254713317582');
  const [mpesaStatus, setMpesaStatus] = useState<'idle' | 'prompting' | 'success'>('idle');

  if (!isOpen) return null;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const itemsSubtotal = cart.reduce((sum, item) => sum + item.product.priceKES * item.quantity, 0);
  
  // Delivery fee logic with requested placeholders for Nairobi Metro and Outside Nairobi
  const deliveryOptions = [
    { 
      id: 'nairobi_cbd', 
      label: 'Nairobi CBD Delivery', 
      badge: 'FREE', 
      fee: 0, 
      note: 'Same-day fast dispatch' 
    },
    { 
      id: 'pickup', 
      label: 'Store Pickup (Utawala Showroom)', 
      badge: 'FREE', 
      fee: 0, 
      note: 'Jowin Business Arcade, Utawala' 
    },
    { 
      id: 'nairobi_metro', 
      label: 'Nairobi Metro (Utawala, Ruai, Westlands, Karen, etc.)', 
      badge: 'KSh 500 (Est. Placeholder)', 
      fee: 500, 
      note: 'Delivery fee estimate' 
    },
    { 
      id: 'outside_nairobi', 
      label: 'Outside Nairobi / Upcountry Dispatch', 
      badge: 'KSh 1,200 (Est. Placeholder)', 
      fee: 1200, 
      note: 'Countrywide parcel courier' 
    },
  ];

  const selectedDeliveryObj = deliveryOptions.find(d => d.id === deliveryType) || deliveryOptions[0];
  const deliveryFee = selectedDeliveryObj.fee;
  const installationFee = includeInstallation ? (itemsSubtotal > 200000 ? 25000 : 15000) : 0;
  const grandTotal = itemsSubtotal + deliveryFee + installationFee;

  const handleSimulateMPesa = () => {
    if (!mpesaPhone || mpesaPhone.length < 10) {
      alert('Please enter a valid Safaricom M-Pesa phone number (e.g. 0713317582)');
      return;
    }

    setMpesaStatus('prompting');
    setTimeout(() => {
      setMpesaStatus('success');
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      if (onOrderSuccess) {
        onOrderSuccess(cart);
      }
    }, 2000);
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    const itemsSummary = cart.map(i => `• ${i.quantity}x ${i.product.name} (${formatKES(i.product.priceKES * i.quantity)})`).join('\n');
    
    const message = `Hello Themes Electricals (Utawala),\n\nI would like to place an order for the following equipment:\n\n📦 *Order Items:*\n${itemsSummary}\n\n*Equipment Subtotal:* ${formatKES(itemsSubtotal)}\n*Delivery Option:* ${selectedDeliveryObj.label} (${selectedDeliveryObj.badge})\n${includeInstallation ? `*Professional Installation:* ${formatKES(installationFee)}\n` : ''}*Estimated Total:* ${formatKES(grandTotal)}\n\nPlease confirm availability and payment details. Thank you!`;

    const waUrl = `https://wa.me/254713317582?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    if (onOrderSuccess) {
      onOrderSuccess(cart);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer" 
      id="cart-drawer-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div 
          className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Drawer Header: Clean, modern, with item count inside cart/bag icon and without 15-yr/showroom clutter */}
          <div className="p-4 sm:p-5 bg-blue-950 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              {/* Bag icon with the number of items inside */}
              <div className="relative flex items-center justify-center">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-sm ring-2 ring-red-500/40">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-blue-950 text-[11px] font-black rounded-full h-5 min-w-5 px-1 flex items-center justify-center shadow-md ring-2 ring-blue-950">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <div>
                <h2 className="font-extrabold text-base sm:text-lg tracking-tight text-white">Themes Order Cart</h2>
                <p className="text-[11px] text-slate-300 font-medium">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item selected' : 'items selected'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-blue-900 transition-colors focus:outline-hidden"
              id="close-cart-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4 px-4">
                <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 mx-auto flex items-center justify-center shadow-xs border border-red-100">
                  <ShoppingBag className="w-8 h-8 text-red-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-base">Your cart is currently empty</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Browse our high-yield Solar Systems, Commercial Lighting, Solar Water Pumps, Generators, and Heat Pumps to start an order.
                  </p>
                </div>

                {/* Order Now Badge Button */}
                <div className="pt-3">
                  <button
                    onClick={() => {
                      onClose();
                      if (onNavigateToProducts) {
                        onNavigateToProducts();
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
                    id="cart-empty-order-now-btn"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                  <span className="font-bold text-slate-700">Selected Items ({totalItemsCount}):</span>
                </div>

                {/* Items List */}
                <div className="space-y-3 divide-y divide-slate-100">
                  {cart.map((item) => {
                    const isAtMaxStock = item.quantity >= item.product.stockCount;
                    return (
                      <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3 items-center group">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0 bg-slate-100"
                          referrerPolicy="no-referrer"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center justify-between gap-1 mt-0.5">
                            <span className="text-[11px] font-mono text-blue-900 font-bold">
                              {formatKES(item.product.priceKES)} each
                            </span>
                            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                              {item.product.stockCount} in stock
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity Controls with Stock Bound Enforcement */}
                            <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50 shadow-2xs">
                              <button
                                onClick={() => onUpdateQty(item.product.id, -1)}
                                className="px-2.5 py-1 text-slate-700 hover:bg-slate-200 active:bg-slate-300 text-xs font-bold transition-colors rounded-l-lg"
                                title="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 text-xs font-black font-mono text-slate-900 bg-white border-x border-slate-200">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => {
                                  if (!isAtMaxStock) {
                                    onUpdateQty(item.product.id, 1);
                                  }
                                }}
                                disabled={isAtMaxStock}
                                className={`px-2.5 py-1 text-xs font-bold transition-colors rounded-r-lg ${
                                  isAtMaxStock 
                                    ? 'text-slate-300 cursor-not-allowed bg-slate-100' 
                                    : 'text-slate-700 hover:bg-slate-200 active:bg-slate-300'
                                }`}
                                title={isAtMaxStock ? `Max stock (${item.product.stockCount}) reached` : 'Increase quantity'}
                              >
                                +
                              </button>
                            </div>

                            <span className="font-black text-blue-950 text-xs font-mono">
                              {formatKES(item.product.priceKES * item.quantity)}
                            </span>
                          </div>

                          {isAtMaxStock && (
                            <p className="text-[10px] text-amber-700 font-medium mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              <span>Maximum stock limit ({item.product.stockCount} units) reached</span>
                            </p>
                          )}
                        </div>

                        {/* Individual Product Delete Trashcan Button */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 shrink-0"
                          title="Delete this item from cart"
                          id={`delete-product-${item.product.id}`}
                        >
                          <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-600" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery Option Selector with placeholders */}
                <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-red-600" />
                      <span>Select Delivery Destination:</span>
                    </span>
                  </div>
                  
                  <div className="space-y-1.5">
                    {deliveryOptions.map((d) => (
                      <label
                        key={d.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                          deliveryType === d.id
                            ? 'bg-blue-50/90 border-blue-600 text-blue-950 font-bold shadow-2xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="delivery"
                            checked={deliveryType === d.id}
                            onChange={() => setDeliveryType(d.id as any)}
                            className="accent-red-600 w-3.5 h-3.5"
                          />
                          <div>
                            <span className="text-xs font-semibold block">{d.label}</span>
                            <span className="text-[10px] text-slate-500 font-normal">{d.note}</span>
                          </div>
                        </div>
                        <span className={`font-mono text-[11px] font-bold text-right ${
                          d.fee === 0 
                            ? 'text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded' 
                            : 'text-slate-900 bg-slate-200/80 px-2 py-0.5 rounded'
                        }`}>
                          {d.badge}
                        </span>
                      </label>
                    ))}
                  </div>

                  <p className="text-[10px] text-slate-500 leading-tight pt-1">
                    * Nairobi Metro & Upcountry courier fees are estimates and will be finalized based on parcel weight upon dispatch.
                  </p>
                </div>

                {/* Professional Installation Addon */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/60 border border-blue-200 cursor-pointer hover:bg-blue-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeInstallation}
                      onChange={(e) => setIncludeInstallation(e.target.checked)}
                      className="accent-red-600 mt-0.5 w-4 h-4"
                    />
                    <div className="text-xs flex-1">
                      <div className="flex items-center justify-between gap-2 font-bold text-slate-900">
                        <span className="flex items-center gap-1.5 text-blue-950 font-bold">
                          <Wrench className="w-3.5 h-3.5 text-red-600 shrink-0" />
                          <span>Include Professional Installation</span>
                        </span>
                        <span className="text-red-600 font-mono font-bold">
                          +{formatKES(itemsSubtotal > 200000 ? 25000 : 15000)}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-tight">
                        Complete mounting, DB switchgear protection, wiring & commissioning by Themes engineers.
                      </p>
                    </div>
                  </label>
                </div>

              </>
            )}
          </div>

          {/* Drawer Footer & Checkout / Quote / WhatsApp Actions */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
              
              {/* Cost Summary Breakdown */}
              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Equipment Subtotal:</span>
                  <span className="font-mono font-semibold text-slate-900">{formatKES(itemsSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery ({selectedDeliveryObj.label.split(' ')[0]}):</span>
                  <span className={`font-mono font-semibold ${deliveryFee === 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
                    {deliveryFee === 0 ? 'FREE' : formatKES(deliveryFee)}
                  </span>
                </div>
                {installationFee > 0 && (
                  <div className="flex justify-between">
                    <span>Professional Installation:</span>
                    <span className="font-mono text-slate-900">{formatKES(installationFee)}</span>
                  </div>
                )}
                <div className="pt-1.5 border-t border-slate-200 flex justify-between items-center text-sm font-black text-slate-950">
                  <span>Grand Total:</span>
                  <span className="text-red-600 font-mono text-base font-black">{formatKES(grandTotal)}</span>
                </div>
              </div>

              {/* M-Pesa Checkout Flow */}
              {isCheckingOutMPesa ? (
                <div className="bg-emerald-950 text-white p-3.5 rounded-xl space-y-3 text-xs animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                      <Smartphone className="w-4 h-4" />
                      <span>Safaricom M-Pesa Express</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsCheckingOutMPesa(false);
                        setMpesaStatus('idle');
                      }}
                      className="text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  {mpesaStatus === 'idle' && (
                    <div className="space-y-2">
                      <label className="text-[11px] text-slate-300 block">
                        Enter M-Pesa Phone Number:
                      </label>
                      <input
                        type="tel"
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value)}
                        placeholder="e.g. 0713317582"
                        className="w-full px-3 py-2 bg-slate-900 border border-emerald-500/50 rounded-lg text-xs text-white font-mono"
                      />
                      <button
                        onClick={handleSimulateMPesa}
                        className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors"
                      >
                        Send M-Pesa STK Prompt ({formatKES(grandTotal)})
                      </button>
                    </div>
                  )}

                  {mpesaStatus === 'prompting' && (
                    <div className="text-center py-3 space-y-2">
                      <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="font-semibold text-emerald-300">Prompting PIN on {mpesaPhone}...</p>
                      <p className="text-[11px] text-slate-400">Please enter your M-Pesa PIN on your phone to complete order.</p>
                    </div>
                  )}

                  {mpesaStatus === 'success' && (
                    <div className="text-center py-2 space-y-1">
                      <CheckCircle2 className="w-7 h-7 text-emerald-400 mx-auto" />
                      <p className="font-bold text-white text-sm">Payment Confirmed!</p>
                      <p className="text-[11px] text-slate-300">
                        Themes Electricals dispatch team will contact you on {mpesaPhone} immediately!
                      </p>
                    </div>
                  )}

                </div>
              ) : (
                <div className="space-y-2">
                  {/* WhatsApp Order Button (High Priority User Request) */}
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                    id="whatsapp-order-btn"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Order via WhatsApp Direct</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setIsCheckingOutMPesa(true)}
                      className="py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                      id="mpesa-checkout-btn"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>M-Pesa Express</span>
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        onOpenQuoteModal();
                      }}
                      className="py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                      id="proforma-quote-btn"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Proforma Invoice</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
