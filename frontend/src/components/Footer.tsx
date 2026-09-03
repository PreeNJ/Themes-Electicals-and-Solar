import React from 'react';
import { Zap, Phone, Mail, MapPin, ShieldCheck, ArrowUp, Truck, PhoneCall } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { STORE_INFO, CATEGORIES } from '../data/products';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onNavigateTab: (tab: 'catalog' | 'sizer' | 'pumps' | 'kits' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateTab
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-blue-950 text-sky-50 text-xs border-t border-blue-900" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 via-sky-600 to-sky-800 flex items-center justify-center text-white shadow-md">
                <Zap className="w-5 h-5 fill-amber-300 stroke-[2.5]" />
              </div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-xl tracking-tight text-white">Themes</span>
                <span className="font-bold text-xl tracking-tight text-sky-400">Electricals</span>
              </div>
            </div>

            <p className="text-sky-100 leading-relaxed text-xs max-w-sm">
              With over <strong>15 years of industry experience</strong>, Themes Electricals provides top-tier Solar Systems, Lighting Systems, Solar Water Pumps, Solar Street Lights, Power Backup Generators, and Energy-Saving Heat Pumps.
            </p>

            <div className="space-y-1.5 text-sky-50 text-xs">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{STORE_INFO.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={STORE_INFO.socialLinks.phone} className="hover:text-sky-300 font-bold">
                  {STORE_INFO.phone} (Hotline / Call)
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={STORE_INFO.socialLinks.email} className="hover:text-blue-300">
                  {STORE_INFO.email}
                </a>
              </p>
            </div>

            {/* Social Links Row */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-sky-100 block mb-2 uppercase tracking-wider">
                Follow & Contact Themes Electricals:
              </span>
              <div className="flex flex-wrap gap-2">
                <a
                  href={STORE_INFO.socialLinks.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 bg-slate-900 hover:bg-black text-white font-bold rounded text-[11px] border border-slate-700"
                  id="footer-social-tiktok"
                >
                  🎵 TikTok
                </a>
                <a
                  href={STORE_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 bg-gradient-to-r from-purple-700 to-pink-600 hover:opacity-90 text-white font-bold rounded text-[11px]"
                  id="footer-social-instagram"
                >
                  📸 Instagram
                </a>
                <a
                  href={STORE_INFO.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded text-[11px]"
                  id="footer-social-facebook"
                >
                  📘 Facebook
                </a>
                <a
                  href={STORE_INFO.socialLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded text-[11px] flex items-center gap-1"
                  id="footer-social-whatsapp"
                >
                  <WhatsAppIcon className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={STORE_INFO.socialLinks.email}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded text-[11px] border border-slate-700"
                  id="footer-social-email"
                >
                  ✉️ Email
                </a>
                <a
                  href={STORE_INFO.socialLinks.phone}
                  className="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded text-[11px] flex items-center gap-1"
                  id="footer-social-phone"
                >
                  <span>📞 {STORE_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Major Categories Requested */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider border-b border-slate-800 pb-1 text-sky-400">
              Major Specialties
            </h4>
            <ul className="space-y-2 text-sky-100">
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('catalog');
                    onSelectCategory('solar_systems');
                  }}
                  className="hover:text-sky-300 transition-colors text-left"
                >
                  Solar Systems & Inverters
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('catalog');
                    onSelectCategory('lighting_systems');
                  }}
                  className="hover:text-sky-300 transition-colors text-left"
                >
                  Lighting System (LED & Commercial)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('catalog');
                    onSelectCategory('solar_water_pumps');
                  }}
                  className="hover:text-sky-300 transition-colors text-left"
                >
                  Solar Water Pump (Borehole & Surface)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('catalog');
                    onSelectCategory('solar_street_lights');
                  }}
                  className="hover:text-sky-300 transition-colors text-left"
                >
                  Solar Street Light (All-in-One)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('catalog');
                    onSelectCategory('generators');
                  }}
                  className="hover:text-sky-300 transition-colors text-left"
                >
                  Power Back Up Generators & ATS
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('catalog');
                    onSelectCategory('heat_pumps');
                  }}
                  className="hover:text-sky-300 transition-colors text-left"
                >
                  Heat Pump (Water Heating)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Engineering Tools */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider border-b border-slate-800 pb-1 text-blue-400">
              Engineering & Sizing
            </h4>
            <ul className="space-y-2 text-sky-100">
              <li>
                <button
                  onClick={() => onNavigateTab('sizer')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Solar Sizing & Load Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('pumps')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Borehole Solar Pumping Sizer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('kits')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Turnkey Solar Kits & Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('contact')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Utawala Jowin Arcade Showroom
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Delivery & Trust */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider border-b border-slate-800 pb-1 text-emerald-400">
              Delivery Policy
            </h4>
            <div className="bg-sky-950/60 p-3.5 rounded-xl border border-sky-700 space-y-2 text-sky-100 text-[11px]">
              <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                <Truck className="w-4 h-4" />
                <span>Nairobi CBD: FREE Delivery</span>
              </div>
              <p className="text-sky-50">
                All deliveries within Nairobi CBD are completely FREE of charge.
              </p>
              <div className="pt-2 border-t border-slate-800 space-y-1">
                <p className="font-semibold text-blue-300">Outside Nairobi / Countrywide:</p>
                <p>A little affordable courier fee is charged with fast G4S / Fargo courier dispatch.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-sky-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-sky-200 text-xs">
          <div>
            © {new Date().getFullYear()} Themes Electricals (Utawala Jowin Business Arcade). 15 Years of Experience. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-sky-100 hover:text-white transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
