import React, { useState } from 'react';
import {
  ShoppingCart, Search, Menu, X, Phone, TrendingUp, Smartphone,
  User, LogOut, LayoutDashboard, Sparkles, ShieldCheck, Truck,
} from 'lucide-react';

const Navbar = ({
  lmeUsd, lmeInrKg, isSidebarOpen, setIsSidebarOpen, setIsMobileMenuOpen,
  setView, searchQuery, setSearchQuery, performSearch, isLoggedIn, userRole,
  setIsProfileOpen, isProfileOpen, setShowLoginModal, cart, setIsCartOpen, setIsLoggedIn,
}) => {
  const [showAiSearch, setShowAiSearch] = useState(false);
  const [aiQuery, setAiQuery] = useState('');

  const handleAiSearch = () => {
    performSearch(aiQuery);
    setShowAiSearch(false);
    setAiQuery('');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Ticker Tape */}
      <div className="bg-brand-green-dark text-white text-xs py-2 px-4 flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-2 font-mono text-emerald-300 font-bold">
            <TrendingUp size={13} /> LME COPPER: ${lmeUsd.toFixed(2)}/MT
          </span>
          <span className="text-green-200 hidden sm:inline">|</span>
          <span className="text-green-100 hidden sm:inline">≈ ₹{lmeInrKg.toFixed(2)}/kg</span>
        </div>
        <div className="hidden md:flex gap-6 text-green-200 font-medium items-center">
          <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
            <Truck size={12} /> FREE Delivery &gt; ₹10k
          </span>
          <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
            <ShieldCheck size={12} /> BIS Certified
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-[1920px] mx-auto px-4 lg:px-6 py-3 flex justify-between items-center gap-4 lg:gap-8">

        {/* Logo & Hamburger */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => {
              if (window.innerWidth >= 768) setIsSidebarOpen(!isSidebarOpen);
              else setIsMobileMenuOpen(true);
            }}
            className="text-slate-500 hover:text-brand-green-dark p-2 hover:bg-brand-green-light rounded-lg transition-all"
          >
            <Menu size={22} />
          </button>
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setView('home')}
          >
            <div className="w-9 h-9 bg-brand-green-dark rounded-lg flex items-center justify-center text-white font-black text-lg group-hover:bg-brand-green transition-colors">
              E
            </div>
            <span className="text-xl font-black text-brand-green-dark tracking-tight hidden sm:block group-hover:text-brand-green transition-colors">
              Ener<span className="text-brand-green group-hover:text-brand-green-dark transition-colors">gon</span>
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-3xl relative hidden md:block">
          <div className="flex items-center w-full bg-slate-50 hover:bg-white border border-slate-200 hover:border-brand-green focus-within:bg-white focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green/20 rounded-lg transition-all overflow-hidden">
            <Search className="ml-3 text-slate-400 shrink-0" size={18} />
            <input
              type="text"
              placeholder="Search wires, cables, switchgear, metals..."
              className="w-full bg-transparent border-none focus:ring-0 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && performSearch(searchQuery)}
            />
            <div className="pr-1 flex items-center gap-1">
              <button
                onClick={() => setShowAiSearch(!showAiSearch)}
                className="p-2 rounded text-brand-green hover:bg-brand-green-light transition-colors"
                title="AI Search"
              >
                <Sparkles size={17} />
              </button>
              <button
                onClick={() => performSearch(searchQuery)}
                className="bg-brand-green text-white px-5 py-2 rounded text-sm font-semibold hover:bg-brand-green-mid transition-colors"
              >
                Search
              </button>
            </div>
          </div>
          {showAiSearch && (
            <div className="absolute top-14 left-0 right-0 bg-white shadow-xl rounded-xl border border-slate-200 p-4 z-50">
              <input
                autoFocus
                type="text"
                className="w-full border-b-2 border-brand-green p-2 text-base outline-none text-slate-800"
                placeholder="e.g. '4mm copper wire for 50 kW panel, need 200m'..."
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
              />
              <p className="text-xs text-slate-400 mt-2">Powered by Volt AI · Press Enter to search</p>
            </div>
          )}
        </div>

        {/* Mobile search icon */}
        <button className="md:hidden p-2 text-slate-600" onClick={() => performSearch('')}>
          <Search size={22} />
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 text-sm font-semibold bg-white hover:bg-slate-50 text-slate-800 px-3 py-2 rounded-lg border border-slate-200 transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center text-white">
                  <User size={14} />
                </div>
                <span className="hidden sm:inline">{userRole === 'admin' ? 'Admin' : 'Account'}</span>
              </button>
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden py-1">
                    <button
                      onClick={() => { setView('profile'); setIsProfileOpen(false); }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <User size={15} /> My Profile
                    </button>
                    {userRole === 'admin' && (
                      <button
                        onClick={() => { setView('admin_dashboard'); setIsProfileOpen(false); }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-brand-green hover:bg-brand-green-light font-medium"
                      >
                        <LayoutDashboard size={15} /> Admin Panel
                      </button>
                    )}
                    <button
                      onClick={() => { setIsLoggedIn(false); setIsProfileOpen(false); }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 border-t border-slate-100 font-medium"
                    >
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="flex items-center gap-2 text-sm font-semibold bg-brand-green text-white px-4 py-2.5 rounded-lg hover:bg-brand-green-mid transition-colors shadow-sm"
            >
              <Smartphone size={16} />
              <span className="hidden sm:inline">Login</span>
            </button>
          )}

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-slate-600 hover:text-brand-green p-2.5 rounded-lg hover:bg-brand-green-light transition-colors"
          >
            <ShoppingCart size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-green text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
