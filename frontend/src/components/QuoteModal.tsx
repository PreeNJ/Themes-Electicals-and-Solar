import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  FileText, 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Download,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { CartItem, SizingResult, SolarKit, Product } from '../types';
import { STORE_INFO, PRODUCTS } from '../data/products';
import { formatKES } from '../utils/formatters';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  customKit?: SolarKit | null;
  sizingResult?: SizingResult | null;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  cart,
  customKit,
  sizingResult
}) => {
  const [customerName, setCustomerName] = useState('Eng. David Mwangi');
  const [customerPhone, setCustomerPhone] = useState('+254 713 317 582');
  const [customerEmail, setCustomerEmail] = useState('themeselectricals@gmail.com');
  const [customerCounty, setCustomerCounty] = useState('Utawala / Nairobi CBD');
  const [deliveryOption, setDeliveryOption] = useState<'nairobi_cbd' | 'pickup' | 'outside_nairobi'>('nairobi_cbd');
  const [includeInstallation, setIncludeInstallation] = useState<boolean>(true);
  const [quoteSubmitted, setQuoteSubmitted] = useState<boolean>(false);
  const [quoteRef] = useState<string>(() => `TE-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`);

  if (!isOpen) return null;

  // Determine items to quote
  let quoteItems: Array<{ name: string; brand: string; qty: number; unitPriceKES: number; totalKES: number }> = [];

  if (cart.length > 0) {
    quoteItems = cart.map((item) => ({
      name: item.product.name,
      brand: item.product.brand,
      qty: item.quantity,
      unitPriceKES: item.product.priceKES,
      totalKES: item.product.priceKES * item.quantity
    }));
  } else if (customKit) {
    quoteItems = [
      {
        name: `${customKit.title} (${customKit.powerRating}) Complete System Package`,
        brand: 'Themes Electricals',
        qty: 1,
        unitPriceKES: customKit.priceKES,
        totalKES: customKit.priceKES
      }
    ];
  } else if (sizingResult) {
    quoteItems = [
      {
        name: sizingResult.recommendedInverterName,
        brand: 'Themes / Growatt / Deye',
        qty: 1,
        unitPriceKES: sizingResult.recommendedInverterKW >= 5 ? 88000 : 46000,
        totalKES: sizingResult.recommendedInverterKW >= 5 ? 88000 : 46000,
      },
      {
        name: sizingResult.recommendedPanelModel,
        brand: 'Jinko Solar',
        qty: sizingResult.recommendedPanelCount,
        unitPriceKES: 14500,
        totalKES: sizingResult.recommendedPanelCount * 14500,
      },
      {
        name: sizingResult.recommendedBatteryModel,
        brand: 'Themes / Felicity Solar',
        qty: sizingResult.recommendedBatteryKWh > 6 ? 2 : 1,
        unitPriceKES: 145000,
        totalKES: (sizingResult.recommendedBatteryKWh > 6 ? 2 : 1) * 145000,
      },
      {
        name: 'Pre-wired DC Combiner Box + 1000V Lightning Surge Arrestor + Mounting Rails',
        brand: 'Themes Electricals',
        qty: 1,
        unitPriceKES: 31000,
        totalKES: 31000,
      }
    ];
  } else {
    // Default featured quote if empty
    const defaultProduct = PRODUCTS[0];
    quoteItems = [
      {
        name: defaultProduct.name,
        brand: defaultProduct.brand,
        qty: 6,
        unitPriceKES: defaultProduct.priceKES,
        totalKES: defaultProduct.priceKES * 6
      }
    ];
  }

  const itemsSubtotal = quoteItems.reduce((sum, i) => sum + i.totalKES, 0);
  const deliveryFee = deliveryOption === 'pickup' || deliveryOption === 'nairobi_cbd' ? 0 : 2000;
  const installationFee = includeInstallation ? Math.round(itemsSubtotal * 0.10) : 0;
  const grandTotalKES = itemsSubtotal + deliveryFee + installationFee;

  const handlePrint = () => {
    window.print();
  };

  const handleSubmitQuoteInquiry = async () => {
    try {
      await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customerName,
          phone: customerPhone,
          email: customerEmail,
          location: customerCounty,
          items: quoteItems,
          totalKES: grandTotalKES,
          notes: 'Customer generated via Themes Electricals portal.'
        })
      });
      setQuoteSubmitted(true);
    } catch (e) {
      setQuoteSubmitted(true);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto cursor-pointer animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full my-6 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Modal Controls */}
        <div className="p-4 bg-blue-950 text-white flex items-center justify-between border-b border-blue-900 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
              <FileText className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-wide">
              Themes Electricals • Official Proforma Quotation
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-colors border border-blue-700"
            >
              <Printer className="w-3.5 h-3.5 text-red-400" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Quotation Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-800 printable-quote-area">
          
          {/* Header Letterhead */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b-2 border-blue-950">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
                  <Zap className="w-5 h-5 fill-amber-300 stroke-[2.5]" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-black text-2xl tracking-tight text-blue-950">Themes</span>
                  <span className="font-black text-2xl tracking-tight text-red-600">Electricals</span>
                </div>
              </div>
              <p className="text-xs text-blue-900 font-bold uppercase tracking-wider mt-1">
                15 Years Experience • Solar, Electrical & Power Engineering
              </p>
              <p className="text-xs text-slate-600 mt-1 max-w-sm">
                {STORE_INFO.location}
              </p>
              <div className="text-xs text-slate-700 mt-1 space-x-3">
                <span>📞 <a href={`tel:${STORE_INFO.phone}`} className="font-bold text-red-600">{STORE_INFO.phone}</a></span>
                <span>✉️ <a href={`mailto:${STORE_INFO.email}`} className="font-bold text-blue-800">{STORE_INFO.email}</a></span>
              </div>
            </div>

            {/* Quote Reference Details */}
            <div className="sm:text-right bg-slate-50 p-3.5 rounded-xl border border-slate-200 sm:min-w-56">
              <span className="text-[10px] uppercase font-bold text-red-600 tracking-wider block">
                Proforma Quotation #
              </span>
              <span className="text-base font-black font-mono text-blue-950 block">{quoteRef}</span>
              <div className="text-xs text-slate-500 mt-1">
                Date: {new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
              <div className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                FREE Delivery in Nairobi CBD
              </div>
            </div>
          </div>

          {/* Customer & Location Form / Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div className="space-y-2">
              <span className="font-bold text-blue-950 block uppercase tracking-wider text-[11px]">
                Customer Details:
              </span>
              <div className="grid grid-cols-1 gap-2">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full Name / Organization"
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                />
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Phone Number (0713...)"
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-blue-950 block uppercase tracking-wider text-[11px]">
                Delivery / Site Town:
              </span>
              <div className="grid grid-cols-1 gap-2">
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                />
                <input
                  type="text"
                  value={customerCounty}
                  onChange={(e) => setCustomerCounty(e.target.value)}
                  placeholder="Town / County (e.g. Utawala, Nairobi CBD, Machakos, Nakuru)"
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          {/* Bill of Materials (BOM) Table */}
          <div className="space-y-2">
            <span className="font-bold text-blue-950 text-sm block">Bill of Materials (BOM) & Equipment:</span>
            <div className="overflow-x-auto border border-slate-300 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 border-b border-slate-300 text-slate-800 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Description & Specifications</th>
                    <th className="p-3">Brand</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Price (KSh)</th>
                    <th className="p-3 text-right">Total (KSh)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {quoteItems.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50/60">
                      <td className="p-3 text-slate-400 font-mono">{index + 1}</td>
                      <td className="p-3 font-semibold text-slate-900">{item.name}</td>
                      <td className="p-3 text-slate-600">{item.brand}</td>
                      <td className="p-3 text-center font-bold font-mono">{item.qty}</td>
                      <td className="p-3 text-right font-mono text-slate-700">{formatKES(item.unitPriceKES)}</td>
                      <td className="p-3 text-right font-mono font-bold text-blue-950">{formatKES(item.totalKES)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Options & Calculations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Payment & Showroom Details */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-blue-950 block">Payment & Banking Details:</span>
              <div className="space-y-1 text-slate-700">
                <p><strong>Hotline:</strong> 0713317582 | <strong>Email:</strong> themeselectricals@gmail.com</p>
                <p><strong>Physical Store:</strong> Utawala Jowin Business Arcade, Nairobi</p>
                <p><strong>Payment:</strong> Safaricom M-Pesa / Bank Wire / Showroom POS</p>
                <p className="text-[11px] text-slate-500 pt-1">
                  * Prices inclusive of all applicable taxes. Delivery around Nairobi CBD is 100% FREE.
                </p>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs bg-blue-50/60 p-4 rounded-xl border border-blue-200">
              <div className="flex justify-between text-slate-700">
                <span>Equipment Subtotal:</span>
                <span className="font-mono font-bold text-blue-950">{formatKES(itemsSubtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Delivery (Nairobi CBD Free):</span>
                <span className={`font-mono ${deliveryFee === 0 ? 'text-emerald-700 font-bold' : ''}`}>
                  {deliveryFee === 0 ? 'FREE' : formatKES(deliveryFee)}
                </span>
              </div>
              {includeInstallation && (
                <div className="flex justify-between text-slate-700">
                  <span>Professional Installation & Commissioning:</span>
                  <span className="font-mono">{formatKES(installationFee)}</span>
                </div>
              )}
              <div className="pt-2 border-t-2 border-slate-300 flex justify-between items-center text-sm font-black text-slate-900">
                <span>Total Quotation (KSh):</span>
                <span className="text-red-600 font-mono text-base">{formatKES(grandTotalKES)}</span>
              </div>
            </div>

          </div>

          {/* Submission status */}
          {quoteSubmitted && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Quotation request #{quoteRef} has been dispatched to Themes Electricals. Our team will call you on {customerPhone}.
              </span>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>15 Years Experience • Utawala Jowin Business Arcade</span>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handleSubmitQuoteInquiry}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit for Official Review</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
