import React, { useState } from 'react';
import { MapPin, History, Save } from 'lucide-react';

const ProfilePage = ({ savedProjects, addresses }) => {
  const [activeTab, setActiveTab] = useState('orders');

  const tabs = [
    { id: 'orders', label: 'Order History', icon: History },
    { id: 'projects', label: 'Saved Projects', icon: Save },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-900 mb-8">My Account</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Tab nav */}
        <div className="space-y-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                activeTab === id
                  ? 'bg-brand-green-light text-brand-green-dark'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          {activeTab === 'orders' && (
            <div className="space-y-3">
              {[
                { id: 'ORD-2025-001', items: 'CMI 1.5sqmm Wire (10 coils)', status: 'Delivered', date: '12 Jan 2025', amount: '₹18,400' },
              ].map(order => (
                <div key={order.id} className="bg-white p-5 rounded-xl border border-slate-200 flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{order.id}</div>
                    <div className="text-xs text-slate-500 mt-1">{order.items}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{order.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800 text-sm">{order.amount}</div>
                    <span className="inline-block mt-1 text-xs font-semibold text-brand-green bg-brand-green-light px-2 py-0.5 rounded-full">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-3">
              {savedProjects.map(p => (
                <div key={p.id} className="bg-white p-5 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{p.name}</div>
                    <div className="text-xs text-slate-500 mt-1">{p.items} items · {p.date}</div>
                  </div>
                  <button className="btn-ghost text-sm py-2 px-4">Load</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-3">
              {addresses.map(a => (
                <div key={a.id} className="bg-white p-5 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{a.name}</div>
                      <div className="text-sm text-slate-500 mt-1">{a.text}</div>
                    </div>
                    <span className="text-xs font-semibold text-brand-green bg-brand-green-light px-2 py-0.5 rounded-full">
                      {a.type}
                    </span>
                  </div>
                </div>
              ))}
              <button className="btn-secondary text-sm w-full py-3">+ Add New Address</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
