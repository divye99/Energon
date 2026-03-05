import React from 'react';
import {
  ArrowRight, CheckCircle, Zap, TrendingUp, Loader2,
  ShieldCheck, Truck, CreditCard, BarChart3, Users, Package,
} from 'lucide-react';
import ProductCard from './ProductCard';

const STATS = [
  { label: 'SKUs Available', value: '10,000+' },
  { label: 'Verified Suppliers', value: '120+' },
  { label: 'Cities Covered', value: '25+' },
  { label: 'Avg Savings vs Retail', value: '22%' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Browse & Search', desc: 'Find wires, cables, switchgear, and metals at LME-linked prices. No hidden markups.' },
  { step: '02', title: 'Lock Your Price', desc: 'Price-lock for 48 hours protects your tender margin against copper fluctuations.' },
  { step: '03', title: 'Order & Finance', desc: 'Place bulk orders with procurement credit tailored to your business — coming soon.' },
  { step: '04', title: 'Get Delivered', desc: 'Verified products with BIS certifications delivered in 24–48 hours to your site.' },
];

const VALUE_PROPS = [
  {
    icon: TrendingUp,
    title: 'LME-Linked Pricing',
    desc: 'Prices update in real time with London Metal Exchange copper rates. No surprise markups. No negotiation needed.',
    color: 'text-brand-green bg-brand-green-light',
  },
  {
    icon: CreditCard,
    title: 'Procurement Credit',
    desc: 'Energon credit lines tailored to your order history — no collateral, no NBFC middlemen. Coming soon.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Suppliers',
    desc: 'Every supplier is BIS-certified and quality-audited. ISI-marked products with test certificates on every order.',
    color: 'text-amber-600 bg-amber-50',
  },
];

const HomePage = ({ setView, products, loading, getPrice, isLoggedIn, setActiveProductId, lmeUsd, compareList, setCompareList, setShowLoginModal }) => (
  <div className="animate-fade-in">

    {/* Hero */}
    <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_70%_50%,white,transparent)]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-6 text-green-200">
            Built for Panel Builders &amp; EPC Contractors
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-5 leading-tight">
            Source Electrical<br />
            <span className="text-green-300">at Manufacturer Prices.</span>
          </h1>
          <p className="text-lg text-green-100 mb-8 leading-relaxed max-w-xl">
            Cut out distributors, stockists, and retailers. LME-linked live pricing on wires, cables, switchgear, and metals — with embedded credit to unlock bigger tenders.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setView('all_products')}
              className="flex items-center gap-2 bg-white text-brand-green-dark px-7 py-3.5 rounded-lg font-bold hover:bg-green-50 transition-colors shadow-lg text-sm group"
            >
              Browse Catalog
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setView('market_hub')}
              className="flex items-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition-colors text-sm"
            >
              <BarChart3 size={17} /> Live Market Prices
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14">
          {STATS.map(({ label, value }) => (
            <div key={label} className="bg-white/10 border border-white/15 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-black text-white">{value}</div>
              <div className="text-xs text-green-200 mt-1 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Trust badges */}
    <section className="bg-white border-b border-slate-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-6 items-center justify-center text-sm text-slate-600">
        {[
          [ShieldCheck, 'BIS Certified Products'],
          [Truck, 'Free Delivery above ₹10,000'],
          [CheckCircle, 'GST-Compliant Invoices'],
          [Users, '5,000+ Active Contractors'],
        ].map(([Icon, label]) => (
          <span key={label} className="flex items-center gap-2 text-slate-500">
            <Icon size={15} className="text-brand-green" />
            <span className="font-medium">{label}</span>
          </span>
        ))}
      </div>
    </section>

    {/* Featured Products */}
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
            <p className="text-slate-500 text-sm mt-1">Live pricing · Bulk contractor rates</p>
          </div>
          <button
            onClick={() => setView('all_products')}
            className="flex items-center gap-1 text-brand-green font-semibold text-sm hover:text-brand-green-dark transition-colors group"
          >
            View all <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-brand-green" size={36} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map(product => (
              <ProductCard
                key={product.id}
                product={product}
                getPrice={getPrice}
                isLoggedIn={isLoggedIn}
                setActiveProductId={setActiveProductId}
                setView={setView}
                compareList={compareList}
                setCompareList={setCompareList}
              />
            ))}
          </div>
        )}
      </div>
    </section>

    {/* Why Energon */}
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block bg-brand-green-light text-brand-green-dark text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-4 border border-brand-green/20">
            Why Energon
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            The procurement stack India's contractors deserve
          </h2>
          <p className="text-slate-500 leading-relaxed">
            Today's electrical procurement goes through 4–5 layers of middlemen adding 30–50% to the price. Energon cuts them out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUE_PROPS.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="bg-white rounded-xl p-7 border border-slate-200 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${color}`}>
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">How It Works</h2>
          <p className="text-slate-500">From search to delivery in 4 steps</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div key={step} className="relative">
              <div className="bg-white rounded-xl p-6 border border-slate-200 h-full">
                <div className="text-4xl font-black text-brand-green-light mb-4 leading-none">{step}</div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Traction / Social Proof */}
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-green-dark text-white">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-6 text-green-300">
          Early Traction
        </div>
        <h2 className="text-3xl font-bold mb-10">Energon is live in Delhi NCR</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { value: '₹2.4 Cr+', label: 'GMV Facilitated' },
            { value: '320+', label: 'Active Contractors' },
            { value: '24 hrs', label: 'Avg Delivery Time' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white/10 border border-white/15 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-black text-green-300 mb-2">{value}</div>
              <div className="text-sm text-green-100 font-medium">{label}</div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <button
            onClick={() => setView('all_products')}
            className="bg-white text-brand-green-dark px-8 py-3.5 rounded-lg font-bold hover:bg-green-50 transition-colors shadow-lg text-sm"
          >
            Start Sourcing Today
          </button>
        </div>
      </div>
    </section>

    {/* Embedded Finance / Supplier CTA */}
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200">Coming Soon</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-5">
              <CreditCard size={22} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Energon Procurement Credit</h3>
            <p className="text-slate-500 text-sm mb-5 leading-relaxed">
              Credit lines built on your Energon order history — not blanket NBFC partnerships. No collateral. Rates tied to your track record.
            </p>
            <button
              className="btn-secondary text-sm opacity-70 cursor-not-allowed"
              disabled
            >
              Notify Me When Live
            </button>
          </div>

          <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-brand-green-light flex items-center justify-center text-brand-green mb-5">
              <Package size={22} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Are you a supplier?</h3>
            <p className="text-slate-500 text-sm mb-5 leading-relaxed">
              Join our Verified Supplier Program. Reach 5,000+ contractors across Delhi NCR and Mumbai. ISI/BIS certification required.
            </p>
            <a href="mailto:suppliers@energon.in?subject=Supplier%20Application" className="btn-secondary text-sm inline-block">Apply to Sell →</a>
          </div>
        </div>
      </div>
    </section>

  </div>
);

export default HomePage;
