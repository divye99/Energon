import React, { useState } from 'react';
import { ChevronRight, MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, X } from 'lucide-react';

const LEGAL_CONTENT = {
  'Privacy Policy': 'Energon Technologies Pvt Ltd collects your mobile number and company GSTIN for verification and invoicing purposes only. Your data is never sold to third parties. Data is stored securely on Supabase (AWS infrastructure, Mumbai region). Contact dpo@energon.in for data deletion requests.',
  'Terms of Service': 'By using Energon, contractors agree to: (1) Provide accurate company and GSTIN details, (2) Pay for orders within agreed credit terms, (3) Not resell goods purchased at contractor rates to end consumers. Orders are binding upon confirmation. Energon reserves the right to cancel orders with pricing errors.',
  'Credit Policy': 'Credit lines up to ₹25 Lakhs are available via our NBFC partner Rupifi. Eligibility is based on GST turnover, ITR filings, and trade history. 14-day interest-free period on approved credit. Late payment: 24% p.a. Contact credit@energon.in to apply.',
  'Return Policy': 'Defective or damaged goods may be returned within 48 hours of delivery with photographic evidence. Quality disputes are resolved via BIS-certified third-party testing. No returns for custom cut cables or opened drum seals. Refunds processed within 7 working days.',
  'Supplier Agreement': 'Suppliers must hold valid BIS/ISI certification for all listed products. Delivery SLA: 48 hours within Delhi NCR, 72 hours outside. Suppliers are liable for quality failures and must maintain product liability insurance. Pricing updates require 24-hour notice. Contact suppliers@energon.in to apply.',
};

const Footer = ({ setView }) => {
  const [legalModal, setLegalModal] = useState(null);

  return (
    <>
      {/* Legal modal */}
      {legalModal && (
        <div className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-4">{legalModal}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{LEGAL_CONTENT[legalModal]}</p>
            <p className="text-xs text-slate-400 mt-4">Last updated: January 2026 · Contact support@energon.in for queries.</p>
          </div>
        </div>
      )}

      <footer className="bg-brand-green-dark text-green-100 py-14 border-t border-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* Brand */}
            <div>
              <div className="mb-5">
                <span className="text-2xl font-black text-white tracking-tight">
                  Ener<span className="text-green-300">gon</span>
                </span>
                <p className="text-xs text-green-400 mt-1 uppercase tracking-widest font-semibold">B2B Procurement Platform</p>
              </div>
              <p className="text-sm text-green-200 mb-6 leading-relaxed">
                Helping panel builders and EPC contractors source electrical goods at manufacturer prices. LME-linked pricing. Verified suppliers.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <a key={i} href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-green-800 flex items-center justify-center hover:bg-brand-green transition-colors">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h4>
              <ul className="space-y-3 text-sm">
                {[
                  ['home', 'Home'],
                  ['all_products', 'Products'],
                  ['market_hub', 'Market Intelligence'],
                  ['smart_planner', 'Smart Planner'],
                  ['about_us', 'About Us'],
                ].map(([id, label]) => (
                  <li key={id}>
                    <button
                      onClick={() => { setView(id); window.scrollTo(0, 0); }}
                      className="flex items-center gap-2 text-green-200 hover:text-white transition-colors"
                    >
                      <ChevronRight size={12} className="text-brand-green" />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3 text-sm">
                {Object.keys(LEGAL_CONTENT).map(item => (
                  <li key={item}>
                    <button
                      onClick={() => setLegalModal(item)}
                      className="text-green-200 hover:text-white transition-colors text-left"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="text-green-300 shrink-0 mt-0.5" size={16} />
                  <span className="text-green-200">Sector 18, Noida,<br />Uttar Pradesh – 201301</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-green-300 shrink-0" size={16} />
                  <a href="tel:+919876543210" className="text-green-200 hover:text-white transition-colors">+91 98765 43210</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-green-300 shrink-0" size={16} />
                  <a href="mailto:support@energon.in" className="text-green-200 hover:text-white transition-colors">support@energon.in</a>
                </li>
              </ul>
            </div>

          </div>
          <div className="mt-12 pt-6 border-t border-green-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-green-400">
            <p>© 2026 Energon Technologies Pvt Ltd. All rights reserved.</p>
            <p>CIN: U74999DL2025PTC000000 · GST: 09AAAAA0000A1Z5</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
