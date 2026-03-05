import React from 'react';
import { X, Home as HomeIcon, ShoppingBag, BrainCircuit, BarChart3, ClipboardList, Info, User, LayoutDashboard } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'all_products', label: 'Products', icon: ShoppingBag },
  { id: 'smart_planner', label: 'Smart Planner', icon: BrainCircuit },
  { id: 'market_hub', label: 'Market Hub', icon: BarChart3 },
  { id: 'quick_order', label: 'Quick Order', icon: ClipboardList },
  { id: 'about_us', label: 'About Us', icon: Info },
];

export const Sidebar = ({ isOpen, setView, view, isLoggedIn, userRole }) => {
  const items = [...NAV_ITEMS];
  if (isLoggedIn) {
    items.push({ id: 'profile', label: 'Profile', icon: User });
    if (userRole === 'admin') items.push({ id: 'admin_dashboard', label: 'Admin', icon: LayoutDashboard });
  }

  return (
    <aside className={`bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex-col z-40 hidden md:flex ${isOpen ? 'w-56' : 'w-16'}`}>
      <div className="flex-1 py-4 space-y-1 overflow-y-auto px-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            title={!isOpen ? item.label : ''}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              view === item.id
                ? 'bg-brand-green-light text-brand-green-dark font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <item.icon size={19} className="shrink-0" />
            <span className={`text-sm whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
      {isOpen && (
        <div className="p-4 text-xs text-slate-400 border-t border-slate-100">
          <p className="font-semibold text-slate-500">© 2026 Energon</p>
        </div>
      )}
    </aside>
  );
};

export const MobileDrawer = ({ isOpen, setIsOpen, setView, view, isLoggedIn, userRole }) => {
  const items = [...NAV_ITEMS];
  if (isLoggedIn) {
    items.push({ id: 'profile', label: 'Profile', icon: User });
    if (userRole === 'admin') items.push({ id: 'admin_dashboard', label: 'Admin', icon: LayoutDashboard });
  }

  return (
    <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:hidden`}>
      <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)} />
      <div className="relative bg-white w-64 h-full shadow-2xl flex flex-col">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <span className="text-xl font-black text-brand-green-dark tracking-tight">
            Ener<span className="text-brand-green">gon</span>
          </span>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg">
            <X size={18} className="text-slate-500" />
          </button>
        </div>
        <div className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => { setView(item.id); setIsOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                view === item.id
                  ? 'bg-brand-green-light text-brand-green-dark'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
