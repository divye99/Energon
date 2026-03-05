import React from 'react';
import { ChevronRight, MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = ({ setView }) => (
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
              <a key={i} href="#" className="w-9 h-9 rounded-lg bg-green-800 flex items-center justify-center hover:bg-brand-green transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
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
            {['Credit Policy', 'Privacy Policy', 'Terms of Service', 'Return Policy', 'Supplier Agreement'].map(item => (
              <li key={item}>
                <button className="text-green-200 hover:text-white transition-colors">{item}</button>
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
              <span className="text-green-200">+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-green-300 shrink-0" size={16} />
              <span className="text-green-200">support@energon.in</span>
            </li>
          </ul>
        </div>

      </div>
      <div className="mt-12 pt-6 border-t border-green-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-green-400">
        <p>© 2025 Energon Technologies Pvt Ltd. All rights reserved.</p>
        <p>CIN: U74999DL2025PTC000000 · GST: 09AAAAA0000A1Z5</p>
      </div>
    </div>
  </footer>
);

export default Footer;
