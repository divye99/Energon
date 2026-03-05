import React, { useState } from 'react';
import { MapPin, History, Save, User } from 'lucide-react';

const ProfilePage = ({ savedProjects, addresses, setAddresses, setView, userPhone }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrText, setNewAddrText] = useState('');

  const tabs = [
    { id: 'orders', label: 'Order History', icon: History },
    { id: 'projects', label: 'Saved Projects', icon: Save },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
  ];

  const handleAddAddress = () => {
    if (!newAddrName.trim() || !newAddrText.trim()) return;
    if (setAddresses) {
      setAddresses(prev => [...prev, {
        id: Date.now(),
        name: newAddrName.trim(),
        text: newAddrText.trim(),
        type: 'Site',
      }]);
    }
    setNewAddrName('');
    setNewAddrText('');
    setShowAddressForm(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">My Account</h2>

      {/* User info card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8 flex items-center gap-4 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-brand-green flex items-center justify-center text-white shrink-0">
          <User size={24} />
        </div>
        <div>
          <div className="font-bold text-slate-900">Verified Contractor</div>
          <div className="text-slate-500 text-sm mt-0.5">+91 {userPhone || '—'}</div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="inline-block text-xs font-semibold text-brand-green bg-brand-green-light px-2 py-0.5 rounded-full">Active</span>
            <span className="text-xs text-slate-400">· BIS Verified Contractor</span>
          </div>
        </div>
      </div>

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
              <p className="text-xs text-slate-400 text-center pt-2">Orders placed in this session appear here after checkout.</p>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-3">
              {(savedProjects || []).map(p => (
                <div key={p.id} className="bg-white p-5 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{p.name}</div>
                    <div className="text-xs text-slate-500 mt-1">{p.items} items · {p.date}</div>
                  </div>
                  <button
                    className="btn-ghost text-sm py-2 px-4"
                    onClick={() => setView && setView('smart_planner')}
                  >
                    Load
                  </button>
                </div>
              ))}
              {(!savedProjects || savedProjects.length === 0) && (
                <div className="text-center py-10 text-slate-400 text-sm">No saved projects yet.</div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-3">
              {(addresses || []).map(a => (
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

              {showAddressForm ? (
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
                  <h4 className="text-sm font-semibold text-slate-700">New Address</h4>
                  <input
                    type="text"
                    placeholder="Label (e.g. Site Office, Warehouse)"
                    value={newAddrName}
                    onChange={e => setNewAddrName(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none bg-white"
                  />
                  <textarea
                    placeholder="Full address"
                    value={newAddrText}
                    onChange={e => setNewAddrText(e.target.value)}
                    rows={2}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none resize-none bg-white"
                  />
                  <div className="flex gap-2">
                    <button onClick={handleAddAddress} className="btn-primary text-sm flex-1 py-2.5">Save Address</button>
                    <button onClick={() => setShowAddressForm(false)} className="btn-secondary text-sm px-5 py-2.5">Cancel</button>
                  </div>
                </div>
              ) : (
                <button
                  className="btn-secondary text-sm w-full py-3"
                  onClick={() => setShowAddressForm(true)}
                >
                  + Add New Address
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
