import React from 'react';
import { TEAM_MEMBERS } from '../data/constants';

const AboutUs = () => (
  <div className="animate-fade-in">
    {/* Hero */}
    <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white py-20 text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white,transparent)]" />
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
          Formalizing India's<br />
          <span className="text-green-300">Electrical Supply Chain</span>
        </h1>
        <p className="text-lg text-green-100 max-w-2xl mx-auto">
          Energon replaces the distributor–stockist–retailer chain with a direct procurement platform for panel builders and EPC contractors.
        </p>
      </div>
    </div>

    {/* Stats */}
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-8 relative z-20">
        {[
          { value: '₹2.4 Cr+', label: 'GMV Facilitated', color: 'border-brand-green' },
          { value: '320+', label: 'Active Contractors', color: 'border-blue-500' },
          { value: '24 Hrs', label: 'Avg Delivery Time', color: 'border-amber-500' },
        ].map(({ value, label, color }) => (
          <div key={label} className={`bg-white p-7 rounded-xl shadow-md border-b-4 ${color} text-center`}>
            <div className="text-4xl font-black text-slate-900 mb-1">{value}</div>
            <div className="text-slate-500 text-sm font-semibold uppercase tracking-wide">{label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Story */}
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=900"
            className="rounded-xl shadow-lg border-4 border-white w-full object-cover"
            alt="Construction site"
          />
        </div>
        <div>
          <span className="inline-block bg-brand-green-light text-brand-green-dark text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            Our Story
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Born from a real problem</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Founded in 2024, Energon was built after watching panel builders and EPC contractors lose 30–50% of their margin to opaque distributor pricing. Buying a coil of wire should not require three phone calls and two middlemen.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Today, Energon is a procurement platform and financial engine — letting small contractors bid for large government tenders with the confidence that their material costs are locked and their credit line is ready.
          </p>
        </div>
      </div>
    </div>

    {/* Team */}
    <div className="bg-slate-50 border-t border-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900">Team</h2>
          <p className="text-slate-500 mt-2">Built by operators who've been in the trenches</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="text-center group">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto mb-5 group-hover:scale-105 transition-transform duration-300">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
              <div className="text-brand-green font-semibold text-sm mb-2">{member.role}</div>
              <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AboutUs;
