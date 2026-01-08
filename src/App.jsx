import React, { useState, useEffect, useRef } from 'react';

// --- PRODUCTION MODE: STATIC IMPORT ---
// This forces the app to look for firebase-config.js immediately.
// If this line fails, verify src/firebase-config.js exists.
// Note: In this environment, we handle the missing file gracefully in the useEffect below.
// import { fetchProducts, auth } from './firebase-config'; 

import { 
  ShoppingCart, Search, Menu, X, Phone, FileText, CheckCircle, Zap, 
  ShieldCheck, Truck, ChevronRight, User, Lock, TrendingUp, Smartphone, 
  ArrowLeft, ArrowRight, CreditCard, BarChart3, PieChart, Info, MessageSquare, 
  Sparkles, Send, Loader2, Bot, Star, Share2, Heart, Filter,
  LayoutDashboard, ShoppingBag, Newspaper, Package, Users, Settings, 
  LogOut, MapPin, History, Plus, Trash2, Save, ClipboardList, Clock, 
  Facebook, Twitter, Linkedin, Instagram, Mail, Check, Home as HomeIcon,
  BrainCircuit, Lightbulb, Scale, Mic
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar, Legend
} from 'recharts';

// --- Configuration & Constants ---
const USD_TO_INR = 84.00;
const BASE_LME_COPPER_USD = 12000; 

// --- Mock Database (Fallback only used if DB returns empty) ---
const MOCK_DB_PRODUCTS = [
  {
    id: "prod_001",
    name: "Energon CMI FR Copper House Wire",
    brand: "CMI",
    category: "Wires & Cables",
    rating: 4.8,
    reviewCount: 124,
    isDynamic: true,
    baseMfgCost: 800,
    copperWeightKg: 1.0,
    retailMarkup: 1.35,
    wholesaleMarkup: 1.12,
    unit: "Coil (90m)",
    hasVariants: true,
    variants: [
      { id: "v1", name: "1.0 sqmm", color: "Red", modifier: 1.0 },
      { id: "v2", name: "1.5 sqmm", color: "Red", modifier: 1.4 },
    ],
    relatedProducts: ["prod_002", "prod_005"], 
    images: ["https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?auto=format&fit=crop&q=80&w=800"],
    description: "Premium CMI Brand Flame Retardant (FR) PVC insulated copper conductor wire.",
    specs: { "Conductor": "Multistrand", "Insulation": "FR PVC", "Voltage": "1100V" },
    reviews: [{ user: "Rajesh Elec.", rating: 5, date: "2 days ago", text: "Copper quality is genuine." }]
  }
];

const CHART_DATA = {
  copper: [{ name: 'Mon', price: 11800 }, { name: 'Tue', price: 11950 }, { name: 'Wed', price: 12100 }, { name: 'Thu', price: 12050 }, { name: 'Fri', price: 12200 }, { name: 'Sat', price: 12150 }, { name: 'Sun', price: 12300 }],
  steel: [{ name: 'Mon', price: 48000 }, { name: 'Tue', price: 48200 }, { name: 'Wed', price: 47900 }, { name: 'Thu', price: 48500 }, { name: 'Fri', price: 49000 }, { name: 'Sat', price: 48800 }, { name: 'Sun', price: 49200 }],
  aluminum: [{ name: 'Mon', price: 2200 }, { name: 'Tue', price: 2180 }, { name: 'Wed', price: 2250 }, { name: 'Thu', price: 2300 }, { name: 'Fri', price: 2280 }, { name: 'Sat', price: 2310 }, { name: 'Sun', price: 2350 }],
  pvc: [{ name: 'Mon', price: 92 }, { name: 'Tue', price: 94 }, { name: 'Wed', price: 93 }, { name: 'Thu', price: 95 }, { name: 'Fri', price: 95 }, { name: 'Sat', price: 96 }, { name: 'Sun', price: 98 }]
};

const NEWS_UPDATES = [
  { id: 1, title: "Copper hits 3-month high on supply concerns", source: "Global Metal", time: "2h ago" },
  { id: 2, title: "Steel prices stabilize as construction demand picks up", source: "Infra Daily", time: "5h ago" },
  { id: 3, title: "Government announces new PLI for Cable manufacturing", source: "Policy Watch", time: "1d ago" },
];

const TEAM_MEMBERS = [
  { name: "Arjun Mehta", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200", bio: "Ex-Infrastructure Engineer." },
  { name: "Priya Sharma", role: "Head of Operations", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200", bio: "Supply chain expert." },
  { name: "Vikram Singh", role: "Chief Technology Officer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200", bio: "Building the digital nervous system." }
];

// --- Gemini & AI Functions ---
const callGeminiAPI = async (userPrompt, products) => {
  return new Promise(resolve => setTimeout(() => resolve("I'm in Production Mode. Set up your Cloud Functions to connect me to real Gemini!"), 1500));
};

const compareProductsAI = async (p1, p2) => {
  return new Promise(resolve => setTimeout(() => resolve({ summary: "Comparison logic active.", specDifferences: ["Brand", "Price"], recommendation: "Check specs." }), 1500));
};

const generateProjectBOM = async (desc, products) => {
   return new Promise(resolve => setTimeout(() => resolve({ items: [{ id: products[0]?.id || "prod_001", qty: 10, reason: "Estimated" }] }), 1500));
};

const summarizeReviews = async (reviews) => {
  return new Promise(resolve => setTimeout(() => resolve("Customers generally love the build quality."), 1000));
};

// --- Helper Components ---

const AiAssistantWidget = ({ products, addToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', text: "Hi! I'm Volt ⚡. Try pasting your BOQ here!" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isOpen]);
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input; setInput(''); setMessages(prev => [...prev, { role: 'user', text: userMsg }]); setLoading(true);
    const responseText = await callGeminiAPI(userMsg, products);
    setMessages(prev => [...prev, { role: 'assistant', text: responseText }]); setLoading(false);
  };
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 group ring-4 ring-slate-900/20">
        {isOpen ? <X size={24} /> : <Sparkles size={24} className="text-orange-400"/>} <span className={`font-bold hidden group-hover:block whitespace-nowrap transition-all ${isOpen ? 'hidden' : ''}`}>Volt AI</span>
      </button>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-200">
          <div className="bg-slate-900 p-4 text-white flex items-center justify-between"><div className="flex items-center gap-2"><Bot size={20} className="text-orange-500"/><div><h3 className="font-bold text-sm">Volt AI Assistant</h3><span className="text-[10px] opacity-80">Powered by Gemini</span></div></div><button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded"><X size={16}/></button></div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.role === 'user' ? 'bg-orange-600 text-white rounded-tr-none' : 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-tl-none'}`}><p className="whitespace-pre-wrap">{msg.text}</p></div></div>
            ))}
            {loading && <div className="flex justify-start"><div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm"><Loader2 size={16} className="animate-spin text-orange-600"/></div></div>}
          </div>
          <div className="p-3 bg-white border-t border-gray-200"><form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2"><input className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Ask technical Qs or paste list..." value={input} onChange={(e) => setInput(e.target.value)}/><button type="submit" disabled={loading} className="bg-slate-900 text-white p-2 rounded-full hover:bg-slate-800 disabled:opacity-50"><Send size={18}/></button></form></div>
        </div>
      )}
    </>
  );
};

const ComparisonWidget = ({ compareList, products, setCompareList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleCompare = async () => {
    setLoading(true); setIsOpen(true);
    const [p1, p2] = compareList.map(id => products.find(p => p.id === id));
    const result = await compareProductsAI(p1, p2);
    setComparisonData(result); setLoading(false);
  };
  if (compareList.length === 0) return null;
  return (
    <>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 fade-in ring-4 ring-slate-900/20">
        <span className="font-bold text-sm">{compareList.length} Items Selected</span>
        <button onClick={handleCompare} disabled={compareList.length < 2} className="bg-orange-600 hover:bg-orange-700 px-4 py-1.5 rounded-full text-xs font-bold disabled:opacity-50 flex items-center gap-2 transition-all"><Scale size={14}/> Compare with AI</button>
        <button onClick={() => setCompareList([])} className="bg-slate-800 hover:bg-slate-700 p-1.5 rounded-full"><X size={14}/></button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 shadow-2xl relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><X size={24}/></button>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2"><Sparkles className="text-orange-500"/> AI Product Comparison</h2>
            {loading ? <div className="py-20 flex flex-col items-center justify-center text-gray-500"><Loader2 size={40} className="animate-spin mb-4"/>Comparing...</div> : <div className="space-y-4"><p className="font-bold">Summary</p><p>{comparisonData?.summary}</p></div>}
          </div>
        </div>
      )}
    </>
  );
};

const Sidebar = ({ isOpen, setView, view, isLoggedIn, userRole }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'all_products', label: 'Products', icon: ShoppingBag },
    { id: 'smart_planner', label: 'Smart Planner', icon: BrainCircuit },
    { id: 'market_hub', label: 'Market Hub', icon: BarChart3 },
    { id: 'quick_order', label: 'Quick Order', icon: ClipboardList },
    { id: 'about_us', label: 'About Us', icon: Info },
  ];
  if (isLoggedIn) { navItems.push({ id: 'profile', label: 'Profile', icon: User }); if (userRole === 'admin') navItems.push({ id: 'admin_dashboard', label: 'Admin', icon: LayoutDashboard }); }
  return (
    <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col z-40 hidden md:flex ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex-1 py-6 space-y-2 overflow-y-auto px-3">
        {navItems.map((item) => (
          <button key={item.id} onClick={() => setView(item.id)} className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 relative group overflow-hidden ${view === item.id ? 'bg-slate-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`} title={!isOpen ? item.label : ''}>
            <item.icon size={20} className="shrink-0" />
            <span className={`font-medium whitespace-nowrap transition-all duration-300 origin-left ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0'}`}>{item.label}</span>
          </button>
        ))}
      </div>
      {isOpen && <div className="p-6 text-xs text-gray-400 border-t border-gray-100"><p className="font-semibold">© 2024 Energon</p><p className="mt-1 opacity-70">v2.3.0 Pro</p></div>}
    </aside>
  );
};

const MobileDrawer = ({ isOpen, setIsOpen, setView, view, isLoggedIn, userRole }) => {
  const navItems = [{ id: 'home', label: 'Home', icon: HomeIcon }, { id: 'all_products', label: 'Products', icon: ShoppingBag }, { id: 'smart_planner', label: 'Smart Planner', icon: BrainCircuit }, { id: 'market_hub', label: 'Market Hub', icon: BarChart3 }, { id: 'quick_order', label: 'Quick Order', icon: ClipboardList }, { id: 'about_us', label: 'About Us', icon: Info }];
  if (isLoggedIn) { navItems.push({ id: 'profile', label: 'Profile', icon: User }); if (userRole === 'admin') navItems.push({ id: 'admin_dashboard', label: 'Admin', icon: LayoutDashboard }); }
  return (
    <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:hidden`}>
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>
      <div className="relative bg-white w-72 h-full shadow-2xl flex flex-col">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center"><span className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Ener<span className="text-orange-600">gon</span></span><button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} className="text-gray-500"/></button></div>
        <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">{navItems.map((item) => (<button key={item.id} onClick={() => { setView(item.id); setIsOpen(false); }} className={`w-full flex items-center gap-4 px-6 py-3 rounded-lg transition-colors ${view === item.id ? 'bg-orange-50 text-orange-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}><item.icon size={20} /><span className="font-medium">{item.label}</span></button>))}</div>
      </div>
    </div>
  );
};

const Navbar = ({ lmeUsd, lmeInrKg, isSidebarOpen, setIsSidebarOpen, setIsMobileMenuOpen, setView, searchQuery, setSearchQuery, performSearch, isLoggedIn, userRole, setIsProfileOpen, isProfileOpen, setShowLoginModal, cart, setIsCartOpen, setIsLoggedIn }) => {
  const [showAiSearch, setShowAiSearch] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const handleAiSearch = () => { performSearch(aiQuery); setShowAiSearch(false); };
  
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-all">
      {/* Ticker Tape */}
      <div className="bg-slate-900 text-white text-[10px] md:text-xs py-2 px-4 flex justify-between items-center">
        <div className="flex gap-6 items-center">
             <span className="flex items-center gap-2 font-mono text-green-400 font-bold"><TrendingUp size={14} /> LME COPPER: ${lmeUsd.toFixed(2)}/MT</span>
             <span className="text-gray-400 hidden sm:inline">|</span>
             <span className="text-gray-300 hidden sm:inline">≈ ₹{lmeInrKg.toFixed(2)}/kg</span>
        </div>
        <div className="hidden md:flex gap-6 text-gray-400 font-medium items-center">
            <span className="flex items-center gap-1 hover:text-orange-400 transition-colors cursor-pointer"><Truck size={12}/> FREE Delivery &gt; ₹10k</span>
            <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"><ShieldCheck size={12}/> 100% Original</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-[1920px] mx-auto px-4 lg:px-6 h-18 py-3 flex justify-between items-center gap-4 lg:gap-8">
        
        {/* Logo & Menu */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button onClick={() => { if (window.innerWidth >= 768) { setIsSidebarOpen(!isSidebarOpen); } else { setIsMobileMenuOpen(true); } }} className="text-gray-500 hover:text-slate-900 p-2 hover:bg-gray-100 rounded-lg transition-all"><Menu size={24} /></button>
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setView('home')}>
             <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black italic text-xl group-hover:scale-110 transition-transform">E</div>
             <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic hidden sm:block group-hover:text-orange-600 transition-colors">Ener<span className="text-orange-600 group-hover:text-slate-900 transition-colors">gon</span></span>
          </div>
        </div>

        {/* Improved Center Search Bar */}
        <div className="flex-1 max-w-3xl relative hidden md:block">
           <div className="flex items-center w-full bg-gray-100 hover:bg-white border border-transparent hover:border-orange-300 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 rounded-full transition-all duration-300 overflow-hidden shadow-sm">
             <Search className="ml-4 text-gray-400 shrink-0" size={20} />
             <input 
               type="text" 
               placeholder="Search wires, cables, switchgear..." 
               className="w-full bg-transparent border-none focus:ring-0 px-3 py-3 text-sm text-gray-800 placeholder-gray-500"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && performSearch(searchQuery)}
             />
             <div className="pr-1 flex items-center gap-1">
                 <button onClick={() => setShowAiSearch(!showAiSearch)} className="p-2 rounded-full text-indigo-500 hover:bg-indigo-50 transition-colors" title="AI Search"><Sparkles size={18} /></button>
                 <button onClick={() => performSearch(searchQuery)} className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-orange-600 transition-colors">Search</button>
             </div>
           </div>
           {showAiSearch && <div className="absolute top-16 left-0 right-0 bg-white shadow-2xl rounded-2xl border border-gray-100 p-4 z-50 animate-in slide-in-from-top-2"><input autoFocus type="text" className="w-full border-b-2 border-indigo-500 p-2 text-lg outline-none" placeholder="Ask AI: 'Show me 4mm wires under ₹2000'..." value={aiQuery} onChange={e=>setAiQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleAiSearch()}/></div>}
        </div>

        {/* Mobile Search Icon Only */}
        <button className="md:hidden p-2 text-gray-600" onClick={() => performSearch('')}><Search size={24}/></button>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 text-sm font-bold bg-white hover:bg-gray-50 text-slate-900 px-1 py-1 pr-4 rounded-full border border-gray-200 shadow-sm transition-all"><div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-red-500 flex items-center justify-center text-white"><User size={16}/></div> <span className="hidden sm:inline">{userRole === 'admin' ? 'Admin' : 'Account'}</span></button>
              {isProfileOpen && (<><div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div><div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-100 overflow-hidden py-2"><button onClick={() => { setView('profile'); setIsProfileOpen(false); }} className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700 font-medium"><User size={16}/> My Profile</button>{userRole === 'admin' && (<button onClick={() => { setView('admin_dashboard'); setIsProfileOpen(false); }} className="block w-full text-left px-4 py-3 text-sm hover:bg-indigo-50 flex items-center gap-3 text-indigo-600 font-medium"><LayoutDashboard size={16}/> Admin Panel</button>)}<button onClick={() => { setIsLoggedIn(false); setIsProfileOpen(false); }} className="block w-full text-left px-4 py-3 text-sm hover:bg-red-50 text-red-600 flex items-center gap-3 border-t border-gray-100 font-medium"><LogOut size={16}/> Logout</button></div></>)}
            </div>
          ) : (
            <button onClick={() => setShowLoginModal(true)} className="flex items-center gap-2 text-sm font-bold bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-orange-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"><Smartphone size={18}/> <span className="hidden sm:inline">Login</span></button>
          )}
          <button onClick={() => setIsCartOpen(true)} className="relative text-gray-600 hover:text-orange-600 p-2.5 rounded-full hover:bg-orange-50 transition-colors"><ShoppingCart size={24} />{cart.length > 0 && (<span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm">{cart.length}</span>)}</button>
        </div>
      </div>
    </nav>
  );
};

const LoginModal = ({ handleLogin, loginStep, setLoginStep, mobileNumber, setMobileNumber, otp, setOtp, isAuthLoading, setShowLoginModal }) => (
  <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
    <div className="bg-white rounded-2xl w-full max-w-sm p-8 shadow-2xl relative overflow-hidden">
      {isAuthLoading && <div className="absolute inset-0 bg-white/90 z-20 flex items-center justify-center flex-col gap-4"><Loader2 size={40} className="text-orange-600 animate-spin"/><p className="text-sm font-bold text-gray-500">Verifying...</p></div>}
      <div className="flex justify-between items-center mb-8"><h3 className="text-2xl font-black text-slate-900 tracking-tight">{loginStep === 1 ? 'Welcome Back' : 'Verify OTP'}</h3><button onClick={() => setShowLoginModal(false)} className="text-gray-400 hover:text-red-500 transition-colors"><X size={24} /></button></div>
      <form onSubmit={handleLogin} className="space-y-6">
        {loginStep === 1 ? (
          <><div className="space-y-2"><label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mobile Number</label><div className="flex border-2 border-gray-100 rounded-xl overflow-hidden focus-within:border-slate-900 transition-colors"><span className="bg-gray-50 text-gray-500 px-4 py-3 font-bold border-r border-gray-100 flex items-center">+91</span><input type="tel" className="w-full px-4 py-3 bg-transparent outline-none font-medium text-lg" placeholder="98765 43210" maxLength={10} value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g,''))} autoFocus/></div></div><button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30">Send OTP</button></>
        ) : (
          <><div className="space-y-4"><p className="text-sm text-gray-500 text-center">Enter the code sent to <br/><span className="font-bold text-slate-900">+91 {mobileNumber}</span></p><input type="text" className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-center text-3xl tracking-[1em] font-bold outline-none focus:border-green-500 transition-colors" placeholder="0000" maxLength={4} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g,''))} autoFocus/></div><button type="submit" className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-green-500/30">Verify & Login</button></>
        )}
      </form>
      <div className="mt-6 text-center text-xs text-gray-400 bg-gray-50 py-2 rounded-lg">Demo Admin: <b>9999999999</b></div>
    </div>
  </div>
);

const Footer = ({ setView }) => (
  <footer className="bg-slate-950 text-gray-400 py-16 border-t border-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div><div className="flex flex-col mb-6"><span className="text-3xl font-black text-white tracking-tighter uppercase italic">Ener<span className="text-orange-600">gon</span></span><p className="text-xs text-orange-500 mt-2 uppercase tracking-[0.2em] font-bold">Smart Procurement</p></div><p className="text-sm text-gray-500 mb-8 leading-relaxed">Empowering India's infrastructure with transparent, LME-linked pricing and embedded credit solutions.</p><div className="flex gap-4"><a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all hover:scale-110"><Facebook size={18}/></a><a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all hover:scale-110"><Twitter size={18}/></a><a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all hover:scale-110"><Linkedin size={18}/></a></div></div>
        <div><h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider border-b border-slate-900 pb-2 inline-block">Company</h4><ul className="space-y-4 text-sm"><li><button onClick={() => { setView('home'); window.scrollTo(0,0); }} className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={12} className="text-orange-600"/> Home</button></li><li><button onClick={() => { setView('about_us'); window.scrollTo(0,0); }} className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={12} className="text-orange-600"/> About Us</button></li><li><button onClick={() => { setView('all_products'); window.scrollTo(0,0); }} className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={12} className="text-orange-600"/> Products</button></li><li><button onClick={() => { setView('market_hub'); window.scrollTo(0,0); }} className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={12} className="text-orange-600"/> Market Intelligence</button></li></ul></div>
        <div><h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider border-b border-slate-900 pb-2 inline-block">Legal</h4><ul className="space-y-4 text-sm"><li><button className="hover:text-white transition-colors">Credit Policy</button></li><li><button className="hover:text-white transition-colors">Privacy Policy</button></li><li><button className="hover:text-white transition-colors">Terms of Service</button></li><li><button className="hover:text-white transition-colors">Return Policy</button></li></ul></div>
        <div><h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider border-b border-slate-900 pb-2 inline-block">Contact</h4><ul className="space-y-6 text-sm"><li className="flex items-start gap-4"><MapPin className="text-orange-600 shrink-0" size={20}/><span>Sector 18, Noida,<br/>Uttar Pradesh - 201301</span></li><li className="flex items-center gap-4"><Phone className="text-orange-600 shrink-0" size={20}/><span>+91 98765 43210</span></li><li className="flex items-center gap-4"><Mail className="text-orange-600 shrink-0" size={20}/><span>support@energon.in</span></li></ul></div>
      </div>
      <div className="mt-16 pt-8 border-t border-slate-900 text-center text-xs text-gray-600"><p>© 2024 Energon Technologies Pvt Ltd. All rights reserved.</p></div>
    </div>
  </footer>
);

const ProductCard = ({ product, getPrice, isLoggedIn, setActiveProductId, setView, compareList, setCompareList }) => {
  const price = getPrice ? getPrice(product, isLoggedIn ? 'wholesale' : 'retail') : 0;
  // Fix: Explicitly define retail price for the blur effect
  const retail = getPrice ? getPrice(product, 'retail') : 0;
  const isSelected = compareList ? compareList.includes(product.id) : false;
  const handleSelectCompare = (e) => { e.stopPropagation(); if (setCompareList) { if (isSelected) { setCompareList(prev => prev.filter(id => id !== product.id)); } else { if (compareList.length < 3) { setCompareList(prev => [...prev, product.id]); } else { alert("You can compare up to 3 products."); } } } };
  
  return (
    <div onClick={() => { setActiveProductId(product.id); setView('product_detail'); window.scrollTo(0,0); }} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full group cursor-pointer relative hover:-translate-y-1">
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={handleSelectCompare} className={`p-2 rounded-full transition-colors ${isSelected ? 'bg-orange-600 text-white shadow-lg' : 'bg-white text-gray-400 hover:text-orange-600 shadow-md'}`} title="Compare"><Scale size={16} /></button></div>
      <div className="h-64 relative overflow-hidden bg-white p-6 flex items-center justify-center border-b border-gray-50">
        <img src={product.images && product.images[0] ? product.images[0] : "https://placehold.co/400?text=No+Image"} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" />
        {product.isDynamic && <div className="absolute top-3 left-3 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-md shadow-lg flex items-center gap-1.5"><TrendingUp size={12} className="text-orange-400"/> LME Linked</div>}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2"><div className="flex text-yellow-400">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />)}</div><span className="text-xs text-gray-400 font-medium">({product.reviewCount} Reviews)</span></div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{(product.brand || "Generic")}</div>
        <h3 className="text-base font-bold text-slate-900 line-clamp-2 mb-3 group-hover:text-orange-600 transition-colors">{(product.name || "Unnamed Product")}</h3>
        <div className="mt-auto pt-4 border-t border-dashed border-gray-100">
          <div className="flex justify-between items-end">
             {isLoggedIn ? <div><div className="text-xs text-gray-400 line-through mb-0.5">₹{getPrice ? getPrice(product, 'retail') : 0}</div><div className="text-xl font-black text-slate-900">₹{price}</div></div> : <div><div className="text-xl font-black text-gray-300 blur-[2px] select-none">₹{retail}</div></div>}
             {isLoggedIn ? <div className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Bulk Price</div> : <div className="text-[10px] text-red-500 font-bold bg-red-50 px-2 py-1 rounded-full">Login to Unlock</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 2. Page Components ---

const EmbeddedFinanceSection = () => (
  <section className="py-20 bg-white border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16"><span className="bg-orange-50 text-orange-600 font-bold text-xs px-3 py-1 rounded-full tracking-widest uppercase border border-orange-100">The Energon Advantage</span><h2 className="text-4xl font-black text-slate-900 mt-4 mb-4 tracking-tight">Procurement + Finance = Speed</h2><p className="text-lg text-gray-500 leading-relaxed">We don't just sell wires. We provide the financial infrastructure to help you bid for bigger tenders and execute faster.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden group"><div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform"><Zap size={28} /></div><h3 className="text-2xl font-bold text-slate-900 mb-3">Buy Now, Pay Later</h3><p className="text-gray-500 text-sm mb-6 leading-relaxed">Get up to ₹25 Lakhs instant credit line via our partner Rupifi. 14 Days interest-free period for verified contractors.</p><button className="text-blue-600 text-sm font-bold flex items-center gap-2 cursor-pointer hover:gap-3 transition-all">Check Eligibility <ArrowRight size={16}/></button></div>
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 relative overflow-hidden group"><div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform"><TrendingUp size={28} /></div><h3 className="text-2xl font-bold text-slate-900 mb-3">Smart Procurement</h3><p className="text-gray-500 text-sm mb-6 leading-relaxed">Our AI monitors LME copper trends to advise the best time to buy. Lock prices for 48 hours to protect your tender margins.</p><button className="text-orange-600 text-sm font-bold flex items-center gap-2 cursor-pointer hover:gap-3 transition-all">View Live Charts <ArrowRight size={16}/></button></div>
         <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 relative overflow-hidden group"><div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform"><CheckCircle size={28} /></div><h3 className="text-2xl font-bold text-slate-900 mb-3">GST Compliant</h3><p className="text-gray-500 text-sm mb-6 leading-relaxed">Automated B2B invoices with input tax credit. Download reports for all your projects in one click for easy filing.</p><button className="text-green-600 text-sm font-bold flex items-center gap-2 cursor-pointer hover:gap-3 transition-all">View Sample Invoice <ArrowRight size={16}/></button></div>
      </div>
    </div>
  </section>
);

const SmartPlannerPage = ({ products, addToCart }) => {
  const [description, setDescription] = useState('');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setLoading(true);
    // Mocking generation for now as per instructions to ensure stability first
    setTimeout(() => {
        setPlan({ items: [{ id: products[0]?.id || "prod_001", qty: 10, reason: "Estimated" }] });
        setLoading(false);
    }, 1500);
  };

  const handleAddAll = () => {
    if (plan && plan.items) {
      plan.items.forEach(item => { const product = products.find(p => p.id === item.id); if (product) addToCart(product, item.qty); });
      alert(`Added ${plan.items.length} items to cart!`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in">
      <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full font-bold text-sm mb-4 border border-purple-200"><Sparkles size={16}/> AI Powered</div>
          <h1 className="text-4xl font-black text-slate-900 mb-4">Smart Project Planner</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">Don't have a BOQ? Just describe your project (e.g., "Full wiring for a 1200 sqft 2BHK apartment") and our AI will estimate the Bill of Materials.</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl shadow-purple-900/5 border border-purple-50 p-8 mb-8 relative overflow-hidden">
        <textarea className="w-full border border-gray-200 rounded-xl p-5 h-40 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none resize-none text-lg transition-all" placeholder="Enter project details here..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <button onClick={handleGenerate} disabled={loading || !description.trim()} className="mt-6 w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-purple-600 disabled:opacity-50 flex items-center justify-center gap-3 transition-colors shadow-lg shadow-purple-600/20">{loading ? <Loader2 className="animate-spin"/> : <Sparkles size={18}/>} Generate Material List</button>
      </div>
      {plan && plan.items && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-in slide-in-from-bottom-4">
          <h3 className="font-bold text-xl mb-6 text-slate-900">Estimated Bill of Materials</h3>
          <div className="space-y-4 mb-8">
            {plan.items.map((item, i) => {
              const product = products.find(p => p.id === item.id);
              return (
                <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-orange-200 transition-colors"><div><div className="font-bold text-slate-900">{product ? product.name : item.id}</div><div className="text-sm text-gray-500 mt-1">{item.reason}</div></div><div className="text-sm font-bold bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">Qty: {item.qty}</div></div>
              );
            })}
          </div>
          <button onClick={handleAddAll} className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 shadow-lg shadow-orange-600/20 transition-all">Add All to Cart</button>
        </div>
      )}
    </div>
  );
};

const AboutUsPage = () => (
  <div className="animate-in fade-in">
    <div className="bg-slate-950 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950 opacity-50"></div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 relative z-10">Building India's <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Infrastructure</span></h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto relative z-10">Energon empowers contractors with tech & credit.</p>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-16 relative z-20"><div className="grid grid-cols-1 md:grid-cols-3 gap-8"><div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-900/10 border-b-4 border-orange-500 text-center"><div className="text-5xl font-black text-slate-900 mb-2">₹500 Cr+</div><div className="text-gray-500 text-sm font-bold uppercase tracking-widest">GMV Processed</div></div><div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-900/10 border-b-4 border-blue-500 text-center"><div className="text-5xl font-black text-slate-900 mb-2">5,000+</div><div className="text-gray-500 text-sm font-bold uppercase tracking-widest">Contractors</div></div><div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-900/10 border-b-4 border-green-500 text-center"><div className="text-5xl font-black text-slate-900 mb-2">24 Hrs</div><div className="text-gray-500 text-sm font-bold uppercase tracking-widest">Avg Delivery</div></div></div></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
       <div className="flex flex-col md:flex-row items-center gap-16"><div className="md:w-1/2"><img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000" className="rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700 border-4 border-white"/></div><div className="md:w-1/2"><h2 className="text-4xl font-black text-slate-900 mb-6">Our Story</h2><p className="text-gray-600 mb-6 leading-relaxed text-lg">Founded in 2023, Energon was born from a simple observation: Buying wires and switches for large projects was harder than it should be. Contractors dealt with opaque pricing, unreliable middlemen, and lack of credit.</p><p className="text-gray-600 leading-relaxed text-lg">Today, Energon is more than a marketplace. It's a financial engine that helps small contractors bid for big government tenders.</p></div></div>
    </div>
    <div className="bg-gray-50 py-24 border-t border-gray-200">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center mb-16"><h2 className="text-3xl font-bold text-slate-900">Meet the Minds Behind Energon</h2></div><div className="grid grid-cols-1 md:grid-cols-3 gap-12">{TEAM_MEMBERS.map((member, idx) => (<div key={idx} className="group text-center"><div className="relative inline-block mb-6"><div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300"><img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"/></div></div><h3 className="text-2xl font-bold text-slate-900">{member.name}</h3><div className="text-orange-600 font-bold text-sm mb-4 uppercase tracking-wide">{member.role}</div><p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">{member.bio}</p></div>))}</div></div>
    </div>
  </div>
);

const AdminDashboard = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in">
    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2"><LayoutDashboard className="text-blue-600"/> Admin Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="text-gray-500 text-sm mb-1">Total Orders</div><div className="text-3xl font-bold">1,245</div></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="text-gray-500 text-sm mb-1">Revenue</div><div className="text-3xl font-bold">₹8.4 Cr</div></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="text-gray-500 text-sm mb-1">Pending Approvals</div><div className="text-3xl font-bold text-orange-600">8</div></div><div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="text-gray-500 text-sm mb-1">Active Users</div><div className="text-3xl font-bold">450</div></div></div>
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center text-gray-500">Product Management Table Placeholder</div>
  </div>
);

const HomePage = ({ setView, products, loading, getPrice, isLoggedIn, setActiveProductId, performSearch, searchQuery, setSearchQuery, compareList, setCompareList }) => (
  <main className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
    {/* Hero Banner with Search */}
    <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-white mb-16 relative overflow-hidden shadow-2xl shadow-slate-900/20">
      <div className="absolute top-0 right-0 w-2/3 h-full opacity-10 pointer-events-none bg-gradient-to-l from-orange-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full opacity-10 pointer-events-none bg-gradient-to-tr from-blue-500 to-transparent"></div>
      
      <div className="relative z-10 max-w-2xl">
        <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6 text-orange-300">Procurement OS for India</div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">Procure <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Smarter.</span></h1>
        <p className="text-xl text-gray-400 mb-10 leading-relaxed">Get LME-linked pricing on wires and factory-direct rates on switchgear. 14-Day Interest Free Credit included.</p>
        
        <div className="flex gap-4">
          <button onClick={() => setView('all_products')} className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-600/30 flex items-center gap-2 group">Browse Catalog <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20}/></button>
          <button onClick={() => setView('about_us')} className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-sm">Learn More</button>
        </div>
      </div>
    </div>
    
    <div className="mb-20">
      <div className="flex justify-between items-end mb-8"><div className="space-y-1"><h2 className="text-3xl font-black text-slate-900">Featured Products</h2><p className="text-gray-500">Top picks for your next project</p></div><button onClick={() => setView('all_products')} className="text-orange-600 font-bold hover:text-slate-900 transition-colors flex items-center gap-1 group">View All <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18}/></button></div>
      {loading ? (<div className="flex justify-center py-20"><Loader2 className="animate-spin text-orange-600" size={40}/></div>) : (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{products.slice(0, 4).map(product => <ProductCard key={product.id} product={product} getPrice={getPrice} isLoggedIn={isLoggedIn} setActiveProductId={setActiveProductId} setView={setView} compareList={compareList} setCompareList={setCompareList} />)}</div>)}
    </div>

    <EmbeddedFinanceSection />
  </main>
);

const MarketHubPage = () => {
  const [activeMetal, setActiveMetal] = useState('copper');
  const chartConfig = {
    copper: { title: "Copper (LME)", unit: "USD/MT", color: "#f97316", data: CHART_DATA.copper, change: "+2.4%" },
    steel: { title: "Steel (TMT)", unit: "INR/Ton", color: "#64748b", data: CHART_DATA.steel, change: "-0.5%" },
    aluminum: { title: "Aluminum", unit: "USD/MT", color: "#3b82f6", data: CHART_DATA.aluminum, change: "+1.1%" },
    pvc: { title: "PVC Resin", unit: "INR/Kg", color: "#10b981", data: CHART_DATA.pvc, change: "+0.2%" },
  };
  const current = chartConfig[activeMetal];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in">
      <div className="mb-8"><h1 className="text-3xl font-bold text-slate-900">Market Intelligence Hub</h1></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
           <div className="flex flex-wrap gap-2 mb-6">{Object.keys(chartConfig).map(key => (<button key={key} onClick={() => setActiveMetal(key)} className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition-colors ${activeMetal === key ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{key}</button>))}</div>
           <div className="h-[300px] w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={current.data}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0"/><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize:12}}/><YAxis axisLine={false} tickLine={false} tick={{fontSize:12}} domain={['auto', 'auto']}/><Tooltip/><Area type="monotone" dataKey="price" stroke={current.color} strokeWidth={3} fillOpacity={0.2} fill={current.color} /></AreaChart></ResponsiveContainer></div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"><h3 className="font-bold mb-4">Market News</h3><div className="space-y-4">{NEWS_UPDATES.map(news => <div key={news.id} className="border-b pb-2"><div className="font-bold text-sm">{news.title}</div><div className="text-xs text-gray-400">{news.source}</div></div>)}</div></div>
      </div>
    </div>
  );
};

const QuickOrderPage = ({ setCart, setIsCartOpen }) => {
  const [rows, setRows] = useState([{ id: 1, sku: '', qty: 1 }]);
  const addRow = () => setRows([...rows, { id: Date.now(), sku: '', qty: 1 }]);
  const updateRow = (id, field, value) => setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  const handleQuickAdd = () => {
    alert(`Added ${rows.length} items to cart!`);
    setCart(prev => [...prev, ...rows.filter(r => r.sku).map(r => ({ id: "quick_" + r.id, name: "Quick Add (" + r.sku + ")", qty: parseInt(r.qty), frozenPrice: 1000, images: [""] }))]);
    setIsCartOpen(true);
  };
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-in fade-in">
      <h1 className="text-2xl font-bold mb-4">Quick Order Pad</h1>
      <div className="bg-white rounded-xl shadow-sm border p-4">
        {rows.map((row, index) => (
          <div key={row.id} className="grid grid-cols-12 gap-4 mb-3">
            <div className="col-span-8"><input type="text" placeholder="SKU" className="w-full border rounded px-3 py-2" value={row.sku} onChange={(e) => updateRow(row.id, 'sku', e.target.value)}/></div>
            <div className="col-span-3"><input type="number" className="w-full border rounded px-3 py-2" value={row.qty} onChange={(e) => updateRow(row.id, 'qty', e.target.value)}/></div>
            <div className="col-span-1">{index > 0 && <button onClick={() => setRows(rows.filter(r => r.id !== row.id))} className="text-red-500"><Trash2 size={16}/></button>}</div>
          </div>
        ))}
        <div className="flex justify-between mt-4"><button onClick={addRow} className="text-blue-600 font-bold flex items-center gap-1"><Plus size={16}/> Add Row</button><button onClick={handleQuickAdd} className="bg-slate-900 text-white px-4 py-2 rounded font-bold">Add to Cart</button></div>
      </div>
    </div>
  );
};

const ProfilePage = ({ savedProjects, addresses }) => {
  const [activeTab, setActiveTab] = useState('orders');
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-2">
          {['orders', 'projects', 'addresses'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left px-4 py-2 rounded-lg capitalize ${activeTab === tab ? 'bg-orange-50 text-orange-700' : 'hover:bg-gray-50'}`}>{tab}</button>
          ))}
        </div>
        <div className="md:col-span-3">
          {activeTab === 'orders' && <div className="bg-white p-6 rounded-xl border"><div className="font-bold">Order #ORD-2024-001</div><div className="text-sm text-gray-500">Shipped via BlueDart</div></div>}
          {activeTab === 'projects' && savedProjects.map(p => <div key={p.id} className="bg-white p-4 border rounded-xl mb-3 flex justify-between"><div><div className="font-bold">{p.name}</div><div className="text-xs text-gray-500">{p.items} items</div></div><button className="text-blue-600 text-sm">Load</button></div>)}
          {activeTab === 'addresses' && addresses.map(a => <div key={a.id} className="bg-white p-4 border rounded-xl mb-3"><div className="font-bold text-sm">{a.name}</div><div className="text-sm text-gray-600">{a.text}</div></div>)}
        </div>
      </div>
    </div>
  );
};

const AllProductsPage = ({ products, searchQuery, setSearchQuery, setView, getPrice, isLoggedIn, setActiveProductId, compareList, setCompareList }) => {
  const filteredProducts = products.filter(p => 
    (p.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p.brand || "").toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">All Products</h2>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => <ProductCard key={product.id} product={product} getPrice={getPrice} isLoggedIn={isLoggedIn} setActiveProductId={setActiveProductId} setView={setView} compareList={compareList} setCompareList={setCompareList} />)}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500"><Package size={48} className="mx-auto mb-4 opacity-20"/><p>No products found matching "{searchQuery}"</p></div>
      )}
    </div>
  );
};

const ProductDetailPage = ({ product, getPrice, isLoggedIn, addToCart, setShowLoginModal, setView, setActiveProductId, products, lmeUsd, addReview }) => {
  if (!product) return <div>Product not found</div>;
  const [selectedVariant, setSelectedVariant] = useState(product.hasVariants ? product.variants[0] : null);
  const wholesale = getPrice ? getPrice(product, 'wholesale', selectedVariant) : 0;
  const retail = getPrice ? getPrice(product, 'retail', selectedVariant) : 0;
  const [selectedImg, setSelectedImg] = useState(0);
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  const handleSummarize = async () => {
    setSummaryLoading(true);
    const result = await summarizeReviews(product.reviews || []);
    setSummary(result);
    setSummaryLoading(false);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (userRating === 0) return alert("Please select a rating");
    if (!userComment.trim()) return alert("Please write a comment");
    
    const newReview = {
      user: isLoggedIn ? "Verified User" : "Guest User",
      rating: userRating,
      date: "Just now",
      text: userComment
    };
    
    addReview(product.id, newReview);
    setUserRating(0);
    setUserComment('');
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-in fade-in">
      <div className="bg-white border-b py-3 px-4 sticky top-16 z-40"><button onClick={() => setView('all_products')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-slate-900"><ArrowLeft size={16}/> Back</button></div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
             <div className="bg-white p-4 border rounded-xl flex items-center justify-center h-[400px] mb-4">
               <img 
                 src={product.images && product.images[selectedImg] ? product.images[selectedImg] : "https://placehold.co/600?text=No+Image"} 
                 className="max-h-full max-w-full object-contain"
               />
             </div>
             <div className="flex gap-2 overflow-x-auto">{(product.images || []).map((img, idx) => <div key={idx} onClick={() => setSelectedImg(idx)} className="w-20 h-20 border rounded cursor-pointer p-1"><img src={img} className="w-full h-full object-contain"/></div>)}</div>
          </div>
          <div className="lg:col-span-4">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="text-sm text-gray-500 mb-6">Brand: {product.brand}</div>
            {product.hasVariants && <div className="mb-6"><h3 className="font-bold text-sm mb-2">Select Variant</h3><div className="flex gap-2">{product.variants.map(v => <button key={v.id} onClick={() => setSelectedVariant(v)} className={`px-4 py-2 border rounded ${selectedVariant.id === v.id ? 'bg-slate-900 text-white' : 'bg-white'}`}>{v.name}</button>)}</div></div>}
            <div className="mb-6"><h3 className="font-bold text-sm mb-2">Description</h3><p className="text-sm text-gray-600">{product.description}</p></div>
            
            {/* AI Review Summary */}
            <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-purple-900 text-sm flex items-center gap-2"><Sparkles size={16}/> AI Review Summary</h3>
                {!summary && <button onClick={handleSummarize} disabled={summaryLoading} className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700">{summaryLoading ? "Analyzing..." : "Generate"}</button>}
              </div>
              {summary && <p className="text-xs text-purple-800 leading-relaxed">{summary}</p>}
            </div>

            {/* Customer Reviews Section */}
            <div className="mb-8 border-t border-gray-100 pt-6">
              <h3 className="font-bold text-lg mb-4 text-slate-900">Customer Reviews</h3>
              <div className="space-y-4 mb-6">
                {(product.reviews || []).map((review, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-bold text-sm text-slate-800">{review.user}</div>
                        <div className="flex text-yellow-400 text-xs mt-0.5">
                          {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} />)}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">{review.date}</div>
                    </div>
                    <p className="text-sm text-gray-600">{review.text}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="font-bold text-sm mb-3">Write a Review</h4>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setUserRating(star)} className={`transition-colors ${userRating >= star ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'}`}>
                      <Star size={20} fill={userRating >= star ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none mb-3" 
                  rows="3" 
                  placeholder="Share your experience with this product..."
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                ></textarea>
                <button onClick={handleSubmitReview} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">Submit Review</button>
              </div>
            </div>

            {product.relatedProducts && product.relatedProducts.length > 0 && (
              <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-3 text-sm">You Might Also Need</h3>
                <div className="space-y-3">
                  {product.relatedProducts.map(relId => {
                    const relProd = products.find(p => p.id === relId);
                    if(!relProd) return null;
                    return (
                      <div key={relId} className="flex items-center gap-3 bg-white p-2 rounded-lg border border-blue-100 cursor-pointer hover:shadow-md transition" onClick={() => setActiveProductId(relId)}>
                          <img src={relProd.images && relProd.images[0] ? relProd.images[0] : ""} className="w-10 h-10 object-contain"/>
                          <div className="flex-1">
                            <div className="text-xs font-bold text-gray-800 line-clamp-1">{relProd.name}</div>
                            <div className="text-xs text-gray-500">₹{getPrice ? getPrice(relProd, 'wholesale') : 0}</div>
                          </div>
                          <button className="text-blue-600 text-xs font-bold px-2">View</button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-3">
            <div className="bg-white p-6 border rounded-xl shadow-lg sticky top-28">
               {product.isDynamic && <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 mb-4"><div className="flex items-center justify-between text-xs text-orange-800 mb-1"><span className="font-bold flex items-center gap-1"><TrendingUp size={12}/> Market Linked</span><span>Copper @ ${lmeUsd.toFixed(0)}</span></div><div className="w-full bg-gray-200 rounded-full h-1.5 mb-1"><div className="bg-orange-500 h-1.5 rounded-full animate-pulse" style={{width: '100%'}}></div></div></div>}
               <div className="mb-6">
                  {isLoggedIn ? <div><span className="text-3xl font-bold">₹{wholesale}</span><div className="text-xs text-green-600">Contractor Price</div></div> : <div><span className="text-2xl blur-sm text-gray-400">₹{retail}</span><div className="text-red-500 text-xs">Login to view price</div></div>}
               </div>
               {isLoggedIn ? <button onClick={() => addToCart(product, 1, selectedVariant)} className="w-full bg-slate-900 text-white py-3 rounded font-bold">Add to Cart</button> : <button onClick={() => setShowLoginModal(true)} className="w-full bg-orange-600 text-white py-3 rounded font-bold">Login</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---
const App = () => {
  const [view, setView] = useState('home'); 
  const [activeProductId, setActiveProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('user'); 
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [loginStep, setLoginStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [savedProjects, setSavedProjects] = useState([
    { id: 1, name: "Dwarka Sector 21 Site", date: "10 Oct 2024", items: 12 },
    { id: 2, name: "Gurgaon Villa Wiring", date: "22 Sep 2024", items: 5 }
  ]);
  const [addresses, setAddresses] = useState([
    { id: 1, name: "Main Warehouse", text: "Plot 45, Udyog Vihar, Gurgaon, HR", type: "Default" },
    { id: 2, name: "Site Office", text: "B-Block Construction Gate, Noida Sec 62, UP", type: "Site" }
  ]);
  const [lmeUsd, setLmeUsd] = useState(BASE_LME_COPPER_USD);
  const [lmeInrKg, setLmeInrKg] = useState(0);

  // --- Real DB Fetch Logic ---
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        console.log("Attempting to fetch from Firebase..."); 
        // Dynamic import with robust error handling
        // We use a try-catch block to gracefully handle missing firebase config locally
        let module;
        try {
            module = await import('./firebase-config.js');
        } catch (e) {
            console.warn("Could not load firebase-config.js. Ensure it exists in src/ folder.");
            throw e;
        }
        
        if (module && module.fetchProducts) {
           const dbProducts = await module.fetchProducts();
           if (dbProducts && dbProducts.length > 0) {
             console.log("Successfully loaded from Firebase:", dbProducts);
             setProducts(dbProducts);
           } else {
             // If DB is empty, user might be setting it up. 
             // We show empty state or mock data depending on preference.
             // Here we default to mock so the UI isn't blank for testing.
             console.warn("Firebase connected but returned 0 products. Using Mock Data for visibility.");
             setProducts(MOCK_DB_PRODUCTS);
           }
        } else {
           throw new Error("Module loaded but fetchProducts missing");
        }
      } catch (e) {
        console.log("Running in Demo Mode (Firebase config not found). Using Mock Data.");
        setProducts(MOCK_DB_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    setLmeInrKg((BASE_LME_COPPER_USD * USD_TO_INR) / 1000);
    const interval = setInterval(() => {
      const fluctuation = (Math.random() - 0.5) * 50; 
      const newUsd = Math.max(11000, lmeUsd + fluctuation);
      setLmeUsd(newUsd);
      setLmeInrKg((newUsd * USD_TO_INR) / 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, [lmeUsd]);

  const getPrice = (product, type = 'wholesale', variant = null) => {
    if (!product) return 0;
    let basePrice = 0;
    if (product.isDynamic) {
      let copperWeight = product.copperWeightKg;
      let baseMfg = product.baseMfgCost;
      if (variant) {
        copperWeight *= variant.modifier;
        baseMfg *= variant.modifier;
      }
      const copperCost = copperWeight * lmeInrKg;
      const totalCost = baseMfg + copperCost;
      const markup = type === 'wholesale' ? product.wholesaleMarkup : product.retailMarkup;
      basePrice = Math.ceil(totalCost * markup);
    } else {
      basePrice = type === 'wholesale' ? product.wholesalePrice : product.retailPrice;
    }
    return basePrice;
  };

  const addToCart = (product, qty = 1, variant = null) => {
    const currentPrice = getPrice(product, isLoggedIn ? 'wholesale' : 'retail', variant);
    const cartItemId = variant ? `${product.id}-${variant.id}` : product.id;
    const name = variant ? `${product.name} (${variant.name})` : product.name;
    setCart(prev => {
      const existing = prev.find(item => item.cartId === cartItemId);
      if (existing) {
        return prev.map(item => item.cartId === cartItemId ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { ...product, cartId: cartItemId, name: name, qty, frozenPrice: currentPrice, variant }];
    });
    setIsCartOpen(true);
  };

  // --- New Review Logic ---
  const addReview = (productId, reviewData) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const currentReviews = p.reviews || [];
        const newReviews = [...currentReviews, reviewData];
        const newCount = (p.reviewCount || 0) + 1;
        // Simple average calculation
        const totalStars = currentReviews.reduce((sum, r) => sum + r.rating, 0) + reviewData.rating;
        const newRating = totalStars / newCount;
        
        return {
          ...p,
          reviews: newReviews,
          reviewCount: newCount,
          rating: newRating
        };
      }
      return p;
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setTimeout(() => {
      setIsAuthLoading(false);
      if (loginStep === 1) {
        if (mobileNumber.length === 10) setLoginStep(2);
        else alert("Please enter a valid 10-digit number");
      } else {
        if (otp.length === 4) {
          setIsLoggedIn(true);
          setShowLoginModal(false);
          setLoginStep(1);
          setMobileNumber('');
          setOtp('');
          if (mobileNumber === '9999999999') {
            setUserRole('admin');
            alert("Logged in as Admin");
          } else {
            setUserRole('user');
          }
        } else {
          alert("Invalid OTP (Use any 4 digits)");
        }
      }
    }, 1500);
  };

  const performSearch = (query) => {
    setSearchQuery(query);
    setView('all_products');
  };

  const saveProject = () => {
    if(cart.length === 0) return alert("Cart is empty!");
    const name = prompt("Enter Project Name:");
    if(name) {
      setSavedProjects([...savedProjects, { id: Date.now(), name, date: "Just now", items: cart.length }]);
      alert("Project Saved Successfully!");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-800 overflow-hidden">
      <Navbar 
        lmeUsd={lmeUsd} 
        lmeInrKg={lmeInrKg} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        setView={setView} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        performSearch={performSearch} 
        isLoggedIn={isLoggedIn} 
        userRole={userRole} 
        setIsProfileOpen={setIsProfileOpen} 
        isProfileOpen={isProfileOpen} 
        setShowLoginModal={setShowLoginModal} 
        cart={cart} 
        setIsCartOpen={setIsCartOpen} 
        setIsLoggedIn={setIsLoggedIn}
        products={products}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} setView={setView} view={view} isLoggedIn={isLoggedIn} userRole={userRole} />
        <MobileDrawer isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} setView={setView} view={view} isLoggedIn={isLoggedIn} userRole={userRole} />
        <main className="flex-1 overflow-y-auto relative">
          {showLoginModal && <LoginModal handleLogin={handleLogin} loginStep={loginStep} setLoginStep={setLoginStep} mobileNumber={mobileNumber} setMobileNumber={setMobileNumber} otp={otp} setOtp={setOtp} isAuthLoading={isAuthLoading} setShowLoginModal={setShowLoginModal} />}
          <div className="min-h-full flex flex-col">
            <div className="flex-grow">
              {view === 'home' && <HomePage setView={setView} products={products} loading={loading} getPrice={getPrice} isLoggedIn={isLoggedIn} setActiveProductId={setActiveProductId} lmeUsd={lmeUsd} lmeInrKg={lmeInrKg} performSearch={performSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} compareList={compareList} setCompareList={setCompareList} />}
              {view === 'all_products' && <AllProductsPage products={products} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setView={setView} getPrice={getPrice} isLoggedIn={isLoggedIn} setActiveProductId={setActiveProductId} compareList={compareList} setCompareList={setCompareList} />}
              {view === 'market_hub' && <MarketHubPage />}
              {view === 'product_detail' && <ProductDetailPage product={products.find(p => p.id === activeProductId)} getPrice={getPrice} isLoggedIn={isLoggedIn} addToCart={addToCart} setShowLoginModal={setShowLoginModal} setView={setView} setActiveProductId={setActiveProductId} products={products} lmeUsd={lmeUsd} addReview={addReview}/>}
              {view === 'profile' && <ProfilePage savedProjects={savedProjects} addresses={addresses} />}
              {view === 'admin_dashboard' && <AdminDashboard />}
              {view === 'about_us' && <AboutUsPage />}
              {view === 'quick_order' && <QuickOrderPage setCart={setCart} setIsCartOpen={setIsCartOpen} />}
              {view === 'smart_planner' && <SmartPlannerPage products={products} addToCart={addToCart} />}
            </div>
            <Footer setView={setView} />
          </div>
        </main>
      </div>
      
      <AiAssistantWidget products={products} addToCart={addToCart} />
      <ComparisonWidget compareList={compareList} products={products} setCompareList={setCompareList} />

      <div className={`fixed inset-0 z-[60] transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
           <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50"><h3 className="font-bold text-lg">Your Cart</h3><button onClick={() => setIsCartOpen(false)}><X size={20}/></button></div>
           <div className="flex-1 p-4 overflow-y-auto">
             {cart.map((item, i) => (
               <div key={i} className="flex gap-4 border-b border-gray-100 pb-4 mb-4"><img src={item.images[0]} className="w-16 h-16 object-contain border rounded bg-gray-50"/><div><div className="font-bold text-sm line-clamp-1">{item.name}</div><div className="text-xs text-gray-500">Qty: {item.qty} x ₹{item.frozenPrice}</div><div className="font-bold mt-1">₹{item.frozenPrice * item.qty}</div></div></div>
             ))}
             {cart.length === 0 && <div className="text-center text-gray-400 mt-10">Cart is empty</div>}
           </div>
           <div className="p-4 border-t border-gray-200 space-y-3"><div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{cart.reduce((a,b) => a + (b.frozenPrice * b.qty), 0)}</span></div><button onClick={saveProject} className="w-full border border-slate-900 text-slate-900 py-3 rounded-lg font-bold hover:bg-gray-50 flex justify-center items-center gap-2"><Save size={16}/> Save as Project</button><button className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold">Checkout</button></div>
        </div>
      </div>
    </div>
  );
};

export default App;