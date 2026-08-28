import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Truck,
  Building,
  Send,
  CheckCircle2,
  ShieldCheck,
  PhoneCall,
  Share2,
  Navigation
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { STORE_INFO } from '../data/products';

export const ContactAndShowroom: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryCategory, setInquiryCategory] = useState('solar_systems');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setSubmitted(true);
  };

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200" id="showroom-contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            <span>Utawala Showroom & Countrywide Logistics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Visit Our Store or Order for FREE Nairobi CBD Delivery
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Backed by <strong>15 years of industry experience</strong>. Available online and physically at <strong>Utawala, Jowin Business Arcade</strong>, Nairobi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Showroom & Logistics Information */}
          <div className="lg:col-span-7 space-y-6">

            {/* Showroom Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 text-xs text-slate-700">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-md">
                    <Building className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-blue-950 text-lg">{STORE_INFO.name}</h3>
                    <p className="text-slate-500 text-xs">{STORE_INFO.experience} • Solar, Electrical & Power Specialists</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    FREE Delivery in Nairobi CBD
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-blue-950 flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-red-600" />
                    <span>Physical Location:</span>
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {STORE_INFO.location}
                  </p>
                  <span className="text-[11px] text-slate-500 block">Jowin Business Arcade, Utawala, Nairobi</span>
                </div>

                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-blue-950 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Working Hours:</span>
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {STORE_INFO.hours}
                  </p>
                  <span className="text-[11px] text-emerald-600 font-semibold block">Open 7 Days a Week for Orders</span>
                </div>
              </div>

              {/* Contact direct lines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={STORE_INFO.socialLinks.phone}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group"
                  id="contact-card-phone"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Direct Phone Call</span>
                    <span className="font-black text-blue-950 text-sm">{STORE_INFO.phone}</span>
                  </div>
                </a>

                <a
                  href={STORE_INFO.socialLinks.email}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors group"
                  id="contact-card-email"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-blue-300 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Direct Email</span>
                    <span className="font-bold text-slate-800 text-xs break-all">{STORE_INFO.email}</span>
                  </div>
                </a>
              </div>

              {/* Direct Social Media Links (TikTok, Instagram, Facebook, WhatsApp, Email, Phone) */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                  <Share2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Connect with Themes Electricals on Social Media:</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {/* TikTok */}
                  <a
                    href={STORE_INFO.socialLinks.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-900 hover:bg-black text-white font-bold rounded-lg transition-colors text-xs"
                    id="social-link-tiktok"
                  >
                    <span>🎵 TikTok</span>
                  </a>

                  {/* Instagram */}
                  <a
                    href={STORE_INFO.socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-bold rounded-lg transition-all text-xs"
                    id="social-link-instagram"
                  >
                    <span>📸 Instagram</span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={STORE_INFO.socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors text-xs"
                    id="social-link-facebook"
                  >
                    <span>📘 Facebook</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={STORE_INFO.socialLinks.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-lg transition-colors text-xs shadow-xs"
                    id="social-link-whatsapp"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  {/* Phone Call */}
                  <a
                    href={STORE_INFO.socialLinks.phone}
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors text-xs"
                    id="social-link-phone"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Hotline</span>
                  </a>

                  {/* Email */}
                  <a
                    href={STORE_INFO.socialLinks.email}
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors text-xs"
                    id="social-link-email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Us</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Delivery & Dispatch Coverage Policy */}
            <div className="bg-blue-950 text-white p-6 rounded-2xl border border-blue-900 space-y-3 text-xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 font-extrabold text-red-400 text-sm">
                  <Truck className="w-5 h-5" />
                  <span>Delivery & Dispatch Policy</span>
                </div>
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  Fast Dispatch
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong>Nairobi CBD Delivery:</strong> 100% FREE delivery for all orders inside Nairobi CBD. <br />
                <strong>Outside Nairobi / Countrywide:</strong> A little affordable courier fee is charged via reliable logistics partners (G4S, Fargo, North Rift, EasyCoach) direct to your town.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-slate-300 border-t border-blue-900">
                {STORE_INFO.deliveryRegions.map((region, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <span>{region}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Technical Consultation Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <div>
              <div className="flex items-center gap-1.5 text-red-600 font-bold uppercase tracking-wider text-[10px] mb-1">
                <span>Direct Inquiry</span>
              </div>
              <h3 className="font-extrabold text-blue-950 text-base">Request Quotation & Site Assessment</h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Our experienced engineers from Utawala will evaluate your electrical/solar load and offer the best deal.
              </p>
            </div>

            {submitted ? (
              <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-950 space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm">Consultation Request Received!</h4>
                <p className="text-xs text-emerald-800">
                  Thank you, <strong>{inquiryName}</strong>. Our team from Utawala Jowin Business Arcade will call you on <strong>{inquiryPhone}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Your Full Name:</label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Samuel Kariuki"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Phone Number (Call / WhatsApp):</label>
                  <input
                    type="tel"
                    required
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder="e.g. +254742844354"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Product / System Category of Interest:</label>
                  <select
                    value={inquiryCategory}
                    onChange={(e) => setInquiryCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="solar_systems">Solar Systems (Panels, Inverters, Lithium Batteries)</option>
                    <option value="lighting_systems">Lighting System (High Bay, Panel, Floodlights)</option>
                    <option value="solar_water_pumps">Solar Water Pump (Borehole Submersible / Surface)</option>
                    <option value="solar_street_lights">Solar Street Light (All-in-One / Split Poles)</option>
                    <option value="generators">Power Back Up Generators (Diesel / Inverter)</option>
                    <option value="heat_pumps">Heat Pump (Thermodynamic Energy Saving)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Your Location & Details:</label>
                  <textarea
                    rows={3}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="e.g. Need solar lighting & 5kW inverter backup for my clinic in Utawala / Machakos..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry (Themes Electricals)</span>
                </button>
              </form>
            )}

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-slate-500 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>15 Years Experience • EPRA Certified Technicians • Guaranteed Quality</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
