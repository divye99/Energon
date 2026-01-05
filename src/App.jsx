import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, Search, Menu, X, Phone, FileText, CheckCircle, Zap, 
  ShieldCheck, Truck, ChevronRight, User, Lock, TrendingUp, Smartphone, 
  ArrowLeft, CreditCard, BarChart3, PieChart, Info, MessageSquare, 
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

// --- Mock Database with Variants ---
const MOCK_DB_PRODUCTS = [
  {
    id: "prod_001",
    name: "Energon CMI FR Copper House Wire",
    brand: "CMI",
    category: "Wires & Cables",
    rating: 4.8,
    reviewCount: 124,
    ratingBreakdown: { 5: 100, 4: 20, 3: 2, 2: 1, 1: 1 },
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
      { id: "v3", name: "2.5 sqmm", color: "Red", modifier: 2.2 },
      { id: "v4", name: "4.0 sqmm", color: "Black", modifier: 3.5 },
    ],
    relatedProducts: ["prod_002", "prod_005"], 
    images: [
      "https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?auto=format&fit=crop&q=80&w=800",
      "https://plus.unsplash.com/premium_photo-1678823293883-a75d79907106?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Premium CMI Brand Flame Retardant (FR) PVC insulated copper conductor wire. 100% Electrolytic Grade Copper used for superior conductivity.",
    specs: { "Conductor": "Multistrand", "Insulation": "FR PVC", "Voltage": "1100V", "Certification": "IS:694" },
    reviews: [
      { user: "Rajesh Elec.", rating: 5, date: "2 days ago", text: "Copper quality is genuine. Weight is accurate. Best for concealed wiring." },
      { user: "BuildTech Infra", rating: 4, date: "1 week ago", text: "Good pricing, delivery took 2 days. Packaging could be better." },
      { user: "Vijay Kumar", rating: 5, date: "2 weeks ago", text: "Standard resistance and good flexibility. Electricians prefer this." }
    ]
  },
  {
    id: "prod_002",
    name: "Havells Euro-II 32A Double Pole Switch",
    brand: "Havells",
    category: "Switchgear",
    rating: 4.5,
    reviewCount: 89,
    ratingBreakdown: { 5: 60, 4: 20, 3: 5, 2: 2, 1: 2 },
    isDynamic: false,
    retailPrice: 450,
    wholesalePrice: 295,
    unit: "Piece",
    relatedProducts: ["prod_001"],
    images: ["https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&q=80&w=800"],
    description: "Heavy duty double pole switch with indicator. Ideal for Geysers and ACs up to 2 tons.",
    specs: { "Current": "32A", "Poles": "DP", "Material": "Polycarbonate", "Indicator": "Neon" },
    reviews: [
      { user: "Amit Contractors", rating: 5, date: "3 days ago", text: "Original Havells product. Box packing." },
      { user: "Suresh P.", rating: 4, date: "1 month ago", text: "Good switch but indicator light is a bit dim." }
    ]
  },
  {
    id: "prod_003",
    name: "Jindal Steel TMT Bar Fe550D (12mm)",
    brand: "Jindal Panther",
    category: "Steel",
    rating: 4.9,
    reviewCount: 200,
    ratingBreakdown: { 5: 180, 4: 15, 3: 5, 2: 0, 1: 0 },
    isDynamic: false,
    retailPrice: 580,
    wholesalePrice: 490,
    unit: "Piece (12m)",
    relatedProducts: [],
    images: ["https://images.unsplash.com/photo-1535063404286-da2a71067e1a?auto=format&fit=crop&q=80&w=800"],
    description: "High ductility Fe550D grade TMT bars for critical infrastructure projects.",
    specs: { "Grade": "Fe550D", "Diameter": "12mm", "Length": "12m", "Usage": "Infrastructure" },
    reviews: []
  },
  {
    id: "prod_004",
    name: "Polycab 4 Core Armoured Cable 16 Sqmm",
    brand: "Polycab",
    category: "Wires & Cables",
    rating: 4.7,
    reviewCount: 45,
    ratingBreakdown: { 5: 35, 4: 8, 3: 2, 2: 0, 1: 0 },
    isDynamic: false,
    retailPrice: 420,
    wholesalePrice: 310,
    unit: "Meter",
    relatedProducts: ["prod_005"],
    images: ["https://images.unsplash.com/photo-1612235967812-3269e8024227?auto=format&fit=crop&q=80&w=800"],
    description: "Aluminium armoured cable for underground power distribution.",
    specs: { "Cores": "4 Core", "Armour": "Strip/Wire", "Conductor": "Aluminium", "Sheath": "PVC Type ST2" },
    reviews: []
  },
  {
    id: "prod_005",
    name: "PVC Insulation Tape (Pack of 10)",
    brand: "SteelGrip",
    category: "Accessories",
    rating: 4.2,
    reviewCount: 20,
    isDynamic: false,
    retailPrice: 150,
    wholesalePrice: 90,
    unit: "Pack",
    relatedProducts: ["prod_001"],
    images: ["https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&q=80&w=800"], 
    description: "High quality PVC insulation tape for electrical joints.",
    specs: { "Length": "10m", "Color": "Multicolor", "Adhesion": "High" },
    reviews: []
  }
];

const CHART_DATA = {
  copper: [
    { name: 'Mon', price: 11800, forecast: 11850 }, { name: 'Tue', price: 11950, forecast: 11900 }, 
    { name: 'Wed', price: 12100, forecast: 12000 }, { name: 'Thu', price: 12050, forecast: 12100 }, 
    { name: 'Fri', price: 12200, forecast: 12150 }, { name: 'Sat', price: 12150, forecast: 12250 }, 
    { name: 'Sun', price: 12300, forecast: 12400 },
  ],
  steel: [
    { name: 'Mon', price: 48000 }, { name: 'Tue', price: 48200 }, { name: 'Wed', price: 47900 },
    { name: 'Thu', price: 48500 }, { name: 'Fri', price: 49000 }, { name: 'Sat', price: 48800 },
    { name: 'Sun', price: 49200 },
  ],
  aluminum: [
    { name: 'Mon', price: 2200 }, { name: 'Tue', price: 2180 }, { name: 'Wed', price: 2250 },
    { name: 'Thu', price: 2300 }, { name: 'Fri', price: 2280 }, { name: 'Sat', price: 2310 },
    { name: 'Sun', price: 2350 },
  ],
  pvc: [
    { name: 'Mon', price: 92 }, { name: 'Tue', price: 94 }, { name: 'Wed', price: 93 },
    { name: 'Thu', price: 95 }, { name: 'Fri', price: 95 }, { name: 'Sat', price: 96 },
    { name: 'Sun', price: 98 },
  ]
};

const NEWS_UPDATES = [
  { id: 1, title: "Copper hits 3-month high on supply concerns", source: "Global Metal", time: "2h ago" },
  { id: 2, title: "Steel prices stabilize as construction demand picks up", source: "Infra Daily", time: "5h ago" },
  { id: 3, title: "Government announces new PLI for Cable manufacturing", source: "Policy Watch", time: "1d ago" },
];

const TEAM_MEMBERS = [
  { name: "Arjun Mehta", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200", bio: "Ex-Infrastructure Engineer with 15 years of experience in procurement." },
  { name: "Priya Sharma", role: "Head of Operations", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200", bio: "Supply chain expert ensuring your deliveries arrive on time, every time." },
  { name: "Vikram Singh", role: "Chief Technology Officer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200", bio: "Building the digital nervous system of India's construction sector." }
];

// --- Gemini API Functions ---

const interpretSearch = async (userQuery, products) => {
  const apiKey = ""; // Injected at runtime
  const catalogContext = products.map(p => `ID: ${p.id}, Name: ${p.name}, Tags: ${p.category} ${p.brand}`).join('\n');
  const systemInstruction = `You are a smart search engine for electrical products.
  CATALOG:
  ${catalogContext}
  
  TASK:
  Analyze the user's natural language query (e.g. "wire for submersible pump") and identify the most relevant Product IDs from the catalog.
  
  OUTPUT JSON ONLY:
  { "matchedIds": ["prod_001", "prod_004"] }
  
  If nothing matches, return empty array.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userQuery }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: { responseMimeType: "application/json" }
        }),
      }
    );
    const data = await response.json();
    return JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text);
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return { matchedIds: [] };
  }
};

const compareProductsAI = async (productA, productB) => {
  const apiKey = ""; // Injected at runtime
  const prompt = `Compare these two electrical products for a contractor:
  Product A: ${JSON.stringify(productA)}
  Product B: ${JSON.stringify(productB)}
  
  Create a concise comparison highlighting key differences in Specifications, Use Case, and Value. 
  Output as a JSON object with fields: "summary", "specDifferences" (array of strings), "recommendation".`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        }),
      }
    );
    const data = await response.json();
    return JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text);
  } catch (error) {
    console.error("Gemini Comparison Error:", error);
    return null;
  }
};

const generateProjectBOM = async (projectDescription, products) => {
  const apiKey = ""; // Injected at runtime
  const catalogContext = products.map(p => `ID: ${p.id}, Name: ${p.name}, Brand: ${p.brand}, Type: ${p.category}`).join('\n');
  const systemInstruction = `You are an expert electrical quantity surveyor for Energon. 
  Given a project description, estimate the materials needed and match them to the CATALOG.
  CATALOG CONTEXT:
  ${catalogContext}
  
  Instructions:
  1. Estimate reasonable quantities for the described project.
  2. Match to Catalog IDs strictly.
  3. Return ONLY a JSON object with the key "items" containing an array of {id, qty, reason}.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Project: ${projectDescription}` }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: { responseMimeType: "application/json" }
        }),
      }
    );
    const data = await response.json();
    return JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text);
  } catch (error) {
    console.error("Gemini BOM Error:", error);
    return null;
  }
};

const summarizeReviews = async (reviews) => {
  const apiKey = ""; // Injected at runtime
  const reviewsText = reviews.map(r => r.text).join("\n");
  const systemInstruction = "Summarize these product reviews into a concise 'Pros' and 'Cons' list. Be brief and professional.";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: reviewsText }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] }
        }),
      }
    );
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    console.error("Gemini Review Summary Error:", error);
    return "Could not generate summary.";
  }
};

const callGeminiAPI = async (userPrompt, products) => {
  const apiKey = ""; // Injected at runtime
  const catalogContext = products.map(p => `ID: ${p.id}, Name: ${p.name}, Brand: ${p.brand}, Type: ${p.category}`).join('\n');
  const systemInstruction = `You are Volt ⚡, the AI assistant for Energon. CATALOG CONTEXT: ${catalogContext}. PARSE ORDERS: If user lists items, match to IDs and output JSON at end: :::JSON_START::: [{"id": "...", "qty": 1}] :::JSON_END:::`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: userPrompt }] }], systemInstruction: { parts: [{ text: systemInstruction }] } }) }
    );
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I'm having trouble connecting.";
  } catch (error) { console.error("Gemini API Error:", error); return "Network error."; }
};

// --- Sub-Components ---

const AiAssistantWidget = ({ products, addToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', text: "Hi! I'm Volt ⚡. I can help you find products or create an order from a list. Try pasting your BOQ here!" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input; setInput(''); setMessages(prev => [...prev, { role: 'user', text: userMsg }]); setLoading(true);
    const responseText = await callGeminiAPI(userMsg, products);
    let cleanText = responseText; let orderSuggestions = [];
    if (responseText.includes(":::JSON_START:::")) {
      const parts = responseText.split(":::JSON_START:::"); cleanText = parts[0].trim();
      try { orderSuggestions = JSON.parse(parts[1].split(":::JSON_END:::")[0]); } catch (e) { console.error("JSON Parse Error", e); }
    }
    setMessages(prev => [...prev, { role: 'assistant', text: cleanText, suggestions: orderSuggestions }]); setLoading(false);
  };

  const handleAddSuggestions = (suggestions) => {
    suggestions.forEach(item => { const product = products.find(p => p.id === item.id); if (product) addToCart(product, item.qty); });
    setMessages(prev => [...prev, { role: 'system', text: `✅ Added ${suggestions.length} items to your cart.` }]);
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 group">
        {isOpen ? <X size={24} /> : <Sparkles size={24} className="animate-pulse"/>} <span className={`font-bold hidden group-hover:block whitespace-nowrap transition-all ${isOpen ? 'hidden' : ''}`}>Ask AI</span>
      </button>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-200">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex items-center justify-between"><div className="flex items-center gap-2"><Bot size={20}/><div><h3 className="font-bold text-sm">Volt AI Assistant</h3><span className="text-[10px] opacity-80">Powered by Gemini</span></div></div><button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded"><X size={16}/></button></div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : msg.role === 'system' ? 'bg-green-100 text-green-800 text-center w-full' : 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-tl-none'}`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-3 bg-indigo-50 border border-indigo-100 rounded-xl p-2">
                      <div className="text-xs font-bold text-indigo-700 mb-2">Detected Items:</div>
                      {msg.suggestions.map((s, i) => (<div key={i} className="flex justify-between text-xs bg-white p-1.5 rounded mb-1 border border-indigo-50"><span className="truncate max-w-[120px]">{s.name || s.id}</span><span className="font-mono">x{s.qty}</span></div>))}
                      <button onClick={() => handleAddSuggestions(msg.suggestions)} className="w-full mt-2 bg-indigo-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-1"><ShoppingCart size={12}/> Add All to Cart ✨</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && <div className="flex justify-start"><div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm"><Loader2 size={16} className="animate-spin text-indigo-600"/></div></div>}
          </div>
          <div className="p-3 bg-white border-t border-gray-200"><form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2"><input className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ask technical Qs or paste list..." value={input} onChange={(e) => setInput(e.target.value)}/><button type="submit" disabled={loading} className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 disabled:opacity-50"><Send size={18}/></button></form></div>
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
    setLoading(true);
    setIsOpen(true);
    const [p1, p2] = compareList.map(id => products.find(p => p.id === id));
    const result = await compareProductsAI(p1, p2);
    setComparisonData(result);
    setLoading(false);
  };

  if (compareList.length === 0) return null;

  return (
    <>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 fade-in">
        <span className="font-bold text-sm">{compareList.length} Items Selected</span>
        <button 
          onClick={handleCompare} 
          disabled={compareList.length < 2}
          className="bg-orange-600 hover:bg-orange-700 px-4 py-1.5 rounded-full text-xs font-bold disabled:opacity-50 flex items-center gap-2 transition-all"
        >
          <Scale size={14}/> Compare with AI
        </button>
        <button onClick={() => setCompareList([])} className="bg-slate-800 hover:bg-slate-700 p-1.5 rounded-full"><X size={14}/></button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 shadow-2xl relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><X size={24}/></button>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2"><Sparkles className="text-orange-500"/> AI Product Comparison</h2>
            
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-gray-500">
                <Loader2 size={40} className="animate-spin text-orange-600 mb-4"/>
                <p>Analyzing specifications & value...</p>
              </div>
            ) : comparisonData ? (
              <div className="space-y-6">
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <h3 className="font-bold text-orange-900 mb-2">Summary</h3>
                  <p className="text-orange-800 text-sm">{comparisonData.summary}</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Key Differences</h3>
                  <ul className="space-y-2">
                    {comparisonData.specDifferences?.map((diff, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-600"><Check size={16} className="text-green-500 shrink-0 mt-0.5"/> {diff}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-2">AI Recommendation</h3>
                  <p className="text-slate-700 text-sm">{comparisonData.recommendation}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-red-500">Failed to generate comparison. Try again.</div>
            )}
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
      <div className="flex-1 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button key={item.id} onClick={() => setView(item.id)} className={`w-full flex items-center gap-4 px-6 py-3 transition-colors relative group ${view === item.id ? 'bg-orange-50 text-orange-600 border-r-4 border-orange-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`} title={!isOpen ? item.label : ''}>
            <item.icon size={22} className="shrink-0" />
            <span className={`font-medium whitespace-nowrap transition-all duration-300 origin-left ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0 overflow-hidden'}`}>{item.label}</span>
          </button>
        ))}
      </div>
      {isOpen && <div className="p-4 text-xs text-gray-400 border-t border-gray-100"><p>© 2024 Energon</p><p>v2.2.0 (AI Enabled)</p></div>}
    </aside>
  );
};

const MobileDrawer = ({ isOpen, setIsOpen, setView, view, isLoggedIn, userRole }) => {
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
    <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:hidden`}>
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>
      <div className="relative bg-white w-64 h-full shadow-xl flex flex-col">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center"><span className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Ener<span className="text-orange-600">gon</span></span><button onClick={() => setIsOpen(false)}><X size={20} className="text-gray-500"/></button></div>
        <div className="flex-1 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => { setView(item.id); setIsOpen(false); }} className={`w-full flex items-center gap-4 px-6 py-3 transition-colors ${view === item.id ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'}`}><item.icon size={20} /><span className="font-medium">{item.label}</span></button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ lmeUsd, lmeInrKg, isSidebarOpen, setIsSidebarOpen, setIsMobileMenuOpen, setView, searchQuery, setSearchQuery, performSearch, isLoggedIn, userRole, setIsProfileOpen, isProfileOpen, setShowLoginModal, cart, setIsCartOpen, setIsLoggedIn, products }) => {
  const [showAiSearch, setShowAiSearch] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const handleAiSearch = async () => {
    if(!aiQuery.trim()) return;
    setAiLoading(true);
    const result = await interpretSearch(aiQuery, products);
    setAiLoading(false);
    setShowAiSearch(false);
    if(result.matchedIds && result.matchedIds.length > 0) {
      const match = products.find(p => p.id === result.matchedIds[0]);
      if(match) {
        setSearchQuery(match.name); // Simple fallback
        performSearch(match.name);
      }
    } else {
      alert("AI couldn't find a direct match. Try broad keywords.");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="bg-slate-900 text-white text-[10px] md:text-xs py-2 px-4 flex justify-between items-center transition-all duration-300">
        <div className="flex gap-4 items-center animate-pulse"><span className="flex items-center gap-1 font-mono text-green-400"><TrendingUp size={14} /> LME COPPER: ${lmeUsd.toFixed(2)}/MT</span><span className="text-gray-400">≈ ₹{lmeInrKg.toFixed(2)}/kg</span></div>
        <div className="hidden md:flex gap-4 text-gray-400 font-bold items-center"><span className="flex items-center gap-1 text-orange-400"><Truck size={12}/> FREE Delivery above ₹10,000</span><span>|</span><span>USD 1 = ₹{USD_TO_INR}</span></div>
      </div>
      <div className="max-w-[1920px] mx-auto px-4 h-16 flex justify-between items-center gap-4 lg:gap-8">
        <div className="flex items-center gap-4 flex-shrink-0">
          <button onClick={() => { if (window.innerWidth >= 768) { setIsSidebarOpen(!isSidebarOpen); } else { setIsMobileMenuOpen(true); } }} className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"><Menu size={24} /></button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}><span className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic hidden sm:block">Ener<span className="text-orange-600">gon</span></span><span className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic sm:hidden">E<span className="text-orange-600">G</span></span></div>
        </div>
        <div className="flex-1 max-w-3xl relative flex items-center gap-2">
          <div className="relative flex-1">
            <input type="text" placeholder="Search catalog by name, brand or SKU..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && performSearch(searchQuery)} className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-full bg-gray-50/50 text-sm focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all shadow-sm"/>
            <button onClick={() => performSearch(searchQuery)} className="absolute left-4 top-2.5 text-gray-400 hover:text-orange-600"><Search size={18} /></button>
          </div>
          <button onClick={() => setShowAiSearch(!showAiSearch)} className={`p-2.5 rounded-full transition-all ${showAiSearch ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'}`} title="AI Smart Search">
            <Sparkles size={18} />
          </button>
          
          {showAiSearch && (
            <div className="absolute top-16 left-0 right-0 bg-white shadow-xl rounded-xl border border-gray-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <h3 className="text-xs font-bold text-indigo-600 mb-2 flex items-center gap-1"><Bot size={12}/> Describe what you need...</h3>
              <div className="flex gap-2">
                <input autoFocus type="text" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" placeholder="e.g. 'I need 2 coils of red wire for AC'" value={aiQuery} onChange={(e) => setAiQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}/>
                <button onClick={handleAiSearch} disabled={aiLoading} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700 disabled:opacity-50">{aiLoading ? <Loader2 className="animate-spin" size={16}/> : 'Find'}</button>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 text-sm font-bold bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200"><User size={16}/> <span className="hidden sm:inline">{userRole === 'admin' ? 'Admin' : 'Account'}</span></button>
              {isProfileOpen && (<><div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div><div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-in fade-in zoom-in-95 duration-100 overflow-hidden"><button onClick={() => { setView('profile'); setIsProfileOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"><User size={14}/> Profile</button>{userRole === 'admin' && (<button onClick={() => { setView('admin_dashboard'); setIsProfileOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-blue-600"><LayoutDashboard size={14}/> Admin Panel</button>)}<button onClick={() => { setIsLoggedIn(false); setIsProfileOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2 border-t border-gray-100"><LogOut size={14}/> Logout</button></div></>)}
            </div>
          ) : (
            <button onClick={() => setShowLoginModal(true)} className="flex items-center gap-2 text-sm font-bold bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-all shadow-md hover:shadow-lg"><Smartphone size={16}/> <span className="hidden sm:inline">Login</span></button>
          )}
          <button onClick={() => setIsCartOpen(true)} className="relative text-gray-600 hover:text-orange-600 p-2 rounded-full hover:bg-gray-100 transition-colors"><ShoppingCart size={24} />{cart.length > 0 && (<span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">{cart.length}</span>)}</button>
        </div>
      </div>
    </nav>
  );
};

const LoginModal = ({ handleLogin, loginStep, setLoginStep, mobileNumber, setMobileNumber, otp, setOtp, isAuthLoading, setShowLoginModal }) => (
  <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
    <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl relative overflow-hidden">
      {isAuthLoading && <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div></div>}
      <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold text-gray-900">{loginStep === 1 ? 'Contractor Login' : 'Verify OTP'}</h3><button onClick={() => setShowLoginModal(false)} className="text-gray-400 hover:text-red-500"><X size={24} /></button></div>
      <form onSubmit={handleLogin} className="space-y-4">
        {loginStep === 1 ? (
          <><div className="space-y-1"><label className="text-xs font-semibold text-gray-500 uppercase">Mobile Number</label><div className="flex border border-gray-300 rounded-lg overflow-hidden bg-gray-50"><span className="bg-gray-100 text-gray-600 px-3 py-3 font-medium border-r border-gray-300 flex items-center">+91</span><input type="tel" className="w-full px-4 py-3 bg-transparent outline-none" placeholder="98765 43210" maxLength={10} value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g,''))} autoFocus/></div></div><button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition">Send OTP via SMS</button></>
        ) : (
          <><div className="space-y-1"><p className="text-sm text-gray-500 mb-2">Enter code sent to +91 {mobileNumber}</p><input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest font-bold outline-none" placeholder="0 0 0 0" maxLength={4} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g,''))} autoFocus/></div><button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">Verify & Login</button></>
        )}
      </form>
      <div className="mt-4 text-center text-[10px] text-gray-400">Use <b>9999999999</b> for Admin Demo</div>
    </div>
  </div>
);

const Footer = ({ setView }) => (
  <footer className="bg-slate-900 text-gray-300 py-12 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div><div className="flex flex-col mb-4"><span className="text-2xl font-black text-white tracking-tighter uppercase italic">Ener<span className="text-orange-600">gon</span></span><p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Tech Enabled Procurement</p></div><p className="text-sm text-gray-400 mb-6 leading-relaxed">Empowering India's infrastructure with transparent, LME-linked pricing and embedded credit solutions.</p><div className="flex gap-4"><a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition"><Facebook size={16}/></a><a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition"><Twitter size={16}/></a><a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition"><Linkedin size={16}/></a></div></div>
        <div><h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Company</h4><ul className="space-y-3 text-sm"><li><button onClick={() => { setView('home'); window.scrollTo(0,0); }} className="hover:text-orange-500 transition">Home</button></li><li><button onClick={() => { setView('about_us'); window.scrollTo(0,0); }} className="hover:text-orange-500 transition">About Us</button></li><li><button onClick={() => { setView('all_products'); window.scrollTo(0,0); }} className="hover:text-orange-500 transition">Products</button></li><li><button onClick={() => { setView('market_hub'); window.scrollTo(0,0); }} className="hover:text-orange-500 transition">Market Intelligence</button></li></ul></div>
        <div><h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Support</h4><ul className="space-y-3 text-sm"><li><button className="hover:text-orange-500 transition">Contact Us</button></li><li><button className="hover:text-orange-500 transition">Credit Policy</button></li><li><button className="hover:text-orange-500 transition">Privacy Policy</button></li><li><button className="hover:text-orange-500 transition">Terms of Service</button></li></ul></div>
        <div><h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Contact Us</h4><ul className="space-y-4 text-sm"><li className="flex items-start gap-3"><MapPin className="text-orange-600 shrink-0" size={18}/><span>Sector 18, Noida,<br/>Uttar Pradesh - 201301</span></li><li className="flex items-center gap-3"><Phone className="text-orange-600 shrink-0" size={18}/><span>+91 98765 43210</span></li><li className="flex items-center gap-3"><Mail className="text-orange-600 shrink-0" size={18}/><span>support@energon.in</span></li></ul></div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-gray-500"><p>© 2024 Energon Technologies Pvt Ltd. All rights reserved.</p></div>
    </div>
  </footer>
);

const ProductCard = ({ product, getPrice, isLoggedIn, setActiveProductId, setView, compareList, setCompareList }) => {
  const price = getPrice ? getPrice(product, isLoggedIn ? 'wholesale' : 'retail') : 0;
  const isSelected = compareList ? compareList.includes(product.id) : false;

  const handleSelectCompare = (e) => {
    e.stopPropagation();
    if (setCompareList) {
      if (isSelected) {
        setCompareList(prev => prev.filter(id => id !== product.id));
      } else {
        if (compareList.length < 3) {
          setCompareList(prev => [...prev, product.id]);
        } else {
          alert("You can compare up to 3 products.");
        }
      }
    }
  };

  return (
    <div onClick={() => { setActiveProductId(product.id); setView('product_detail'); window.scrollTo(0,0); }} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group cursor-pointer relative">
      <div className="absolute top-2 right-2 z-10">
        <button 
          onClick={handleSelectCompare}
          className={`p-1.5 rounded-full transition-colors ${isSelected ? 'bg-orange-600 text-white shadow-md' : 'bg-white/80 text-gray-400 hover:bg-white hover:text-orange-600'}`}
          title="Compare"
        >
          <Scale size={16} />
        </button>
      </div>
      <div className="h-56 relative overflow-hidden bg-gray-100 p-4 flex items-center justify-center">
        <img src={product.images[0]} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
        {product.isDynamic && <div className="absolute top-2 left-2 bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1"><TrendingUp size={10}/> LME Linked</div>}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-1 mb-2"><div className="flex text-yellow-400">{[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />)}</div><span className="text-xs text-blue-600 hover:underline">({product.reviewCount})</span></div>
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-orange-600">{product.name}</h3>
        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex justify-between items-baseline">
             {isLoggedIn ? <div><span className="text-xs text-gray-400 line-through mr-2">₹{getPrice ? getPrice(product, 'retail') : 0}</span><span className="text-lg font-bold text-gray-900">₹{price}</span></div> : <div className="text-gray-500 italic text-sm blur-[1px]">Login for Price</div>}
          </div>
          {isLoggedIn && <span className="text-[10px] text-green-600 font-medium">Bulk Rate Applied</span>}
        </div>
      </div>
    </div>
  );
};

// --- 2. Page Components ---

const EmbeddedFinanceSection = () => (
  <section className="py-16 bg-white border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12"><span className="text-orange-600 font-bold text-sm tracking-widest uppercase">The Energon Advantage</span><h2 className="text-3xl font-black text-gray-900 mt-2 mb-4">Procurement + Finance = Speed</h2><p className="text-gray-500">We don't just sell wires. We provide the financial infrastructure to help you bid for bigger tenders and execute faster.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow relative overflow-hidden group"><div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6"><Zap size={24} /></div><h3 className="text-xl font-bold text-gray-900 mb-2">Buy Now, Pay Later</h3><p className="text-gray-600 text-sm mb-4">Get up to ₹25 Lakhs instant credit line via our partner Rupifi. 14 Days interest-free period for verified contractors.</p><span className="text-blue-600 text-sm font-bold flex items-center gap-1 cursor-pointer hover:underline">Check Eligibility <ChevronRight size={14}/></span></div>
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow relative overflow-hidden group"><div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-6"><TrendingUp size={24} /></div><h3 className="text-xl font-bold text-gray-900 mb-2">Smart Procurement</h3><p className="text-gray-600 text-sm mb-4">Our AI monitors LME copper trends to advise the best time to buy. Lock prices for 48 hours to protect your tender margins.</p><span className="text-orange-600 text-sm font-bold flex items-center gap-1 cursor-pointer hover:underline">View Live Charts <ChevronRight size={14}/></span></div>
         <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow relative overflow-hidden group"><div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-6"><CheckCircle size={24} /></div><h3 className="text-xl font-bold text-gray-900 mb-2">GST Compliant Invoicing</h3><p className="text-gray-600 text-sm mb-4">Automated B2B invoices with input tax credit. Download reports for all your projects in one click for easy filing.</p><span className="text-green-600 text-sm font-bold flex items-center gap-1 cursor-pointer hover:underline">View Sample Invoice <ChevronRight size={14}/></span></div>
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
    const result = await generateProjectBOM(description, products);
    setPlan(result);
    setLoading(false);
  };

  const handleAddAll = () => {
    if (plan && plan.items) {
      plan.items.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) addToCart(product, item.qty);
      });
      alert(`Added ${plan.items.length} items to cart!`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-in fade-in">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2"><BrainCircuit className="text-orange-600"/> Smart Project Planner</h1>
      <p className="text-gray-500 mb-8">Describe your project (e.g., "Full wiring for a 1200 sqft 2BHK apartment") and our AI will estimate the Bill of Materials.</p>
      
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <textarea 
          className="w-full border border-gray-300 rounded-lg p-4 h-32 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
          placeholder="Enter project details here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button 
          onClick={handleGenerate} 
          disabled={loading || !description.trim()}
          className="mt-4 w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin"/> : <Sparkles size={18}/>} Generate Material List
        </button>
      </div>

      {plan && plan.items && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-bold text-lg mb-4">Estimated Bill of Materials</h3>
          <div className="space-y-3 mb-6">
            {plan.items.map((item, i) => {
              const product = products.find(p => p.id === item.id);
              return (
                <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <div className="font-bold text-sm">{product ? product.name : item.id}</div>
                    <div className="text-xs text-gray-500">{item.reason}</div>
                  </div>
                  <div className="text-sm font-bold bg-white px-3 py-1 rounded border">Qty: {item.qty}</div>
                </div>
              );
            })}
          </div>
          <button onClick={handleAddAll} className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700">Add All to Cart</button>
        </div>
      )}
    </div>
  );
};

const AboutUsPage = () => (
  <div className="animate-in fade-in">
    <div className="bg-slate-900 text-white py-20 text-center"><h1 className="text-4xl md:text-6xl font-black mb-6">Building India's <span className="text-orange-500">Infrastructure</span></h1><p className="text-xl text-gray-400 max-w-3xl mx-auto">Energon empowers contractors with tech & credit.</p></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="bg-white p-8 rounded-xl shadow-lg border-b-4 border-orange-500 text-center"><div className="text-4xl font-black text-slate-900 mb-2">₹500 Cr+</div><div className="text-gray-500 text-xs font-bold">GMV</div></div><div className="bg-white p-8 rounded-xl shadow-lg border-b-4 border-blue-500 text-center"><div className="text-4xl font-black text-slate-900 mb-2">5,000+</div><div className="text-gray-500 text-xs font-bold">Contractors</div></div><div className="bg-white p-8 rounded-xl shadow-lg border-b-4 border-green-500 text-center"><div className="text-4xl font-black text-slate-900 mb-2">24 Hrs</div><div className="text-gray-500 text-xs font-bold">Delivery</div></div></div></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="flex flex-col md:flex-row items-center gap-12"><div className="md:w-1/2"><img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000" className="rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500"/></div><div className="md:w-1/2"><h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2><p className="text-gray-600 mb-4 leading-relaxed">Founded in 2023, Energon was born from a simple observation: Buying wires and switches for large projects was harder than it should be. Contractors dealt with opaque pricing, unreliable middlemen, and lack of credit.</p><p className="text-gray-600 leading-relaxed">Today, Energon is more than a marketplace. It's a financial engine that helps small contractors bid for big government tenders.</p></div></div>
    </div>
    <div className="bg-white py-20">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center mb-16"><h2 className="text-3xl font-bold text-slate-900">Meet the Minds Behind Energon</h2></div><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{TEAM_MEMBERS.map((member, idx) => (<div key={idx} className="group text-center"><div className="relative inline-block mb-4"><div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300"><img src={member.image} alt={member.name} className="w-full h-full object-cover"/></div></div><h3 className="text-xl font-bold text-slate-900">{member.name}</h3><div className="text-orange-600 font-medium text-sm mb-3">{member.role}</div><p className="text-gray-500 text-sm max-w-xs mx-auto">{member.bio}</p></div>))}</div></div>
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
    <div className="bg-slate-900 rounded-2xl p-12 text-white mb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none bg-orange-500 transform rotate-12 translate-x-20"></div>
      <div className="relative z-10">
        <h1 className="text-5xl font-black mb-6">Procure Smarter.</h1>
        <p className="text-xl text-gray-400 mb-8 max-w-lg">Get LME-linked pricing on wires and factory-direct rates on switchgear. 14-Day Interest Free Credit included.</p>
        
        {/* Homepage Search Bar */}
        <div className="bg-white p-2 rounded-full flex items-center gap-2 max-w-lg shadow-2xl mb-8">
           <input 
             type="text" 
             placeholder="Search e.g. '1.5mm wire' or 'Havells Switch'" 
             className="flex-1 px-4 py-2 bg-transparent text-gray-800 outline-none text-sm font-medium"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && performSearch(searchQuery)}
           />
           <button onClick={() => performSearch(searchQuery)} className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-orange-700 transition">
             <Search size={22}/>
           </button>
        </div>

        <div className="flex gap-4">
          <button onClick={() => setView('all_products')} className="text-white font-bold hover:underline">Browse Full Catalog</button>
        </div>
      </div>
    </div>
    
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-slate-900">Featured Products</h2><button onClick={() => setView('all_products')} className="text-orange-600 font-bold hover:underline text-sm">View All</button></div>
      {loading ? (<div className="flex justify-center py-20"><Loader2 className="animate-spin text-orange-600" size={40}/></div>) : (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{products.slice(0, 4).map(product => <ProductCard key={product.id} product={product} getPrice={getPrice} isLoggedIn={isLoggedIn} setActiveProductId={setActiveProductId} setView={setView} compareList={compareList} setCompareList={setCompareList} />)}</div>)}
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
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
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

const ProductDetailPage = ({ product, getPrice, isLoggedIn, addToCart, setShowLoginModal, setView, setActiveProductId, products, lmeUsd }) => {
  if (!product) return <div>Product not found</div>;
  const [selectedVariant, setSelectedVariant] = useState(product.hasVariants ? product.variants[0] : null);
  const wholesale = getPrice ? getPrice(product, 'wholesale', selectedVariant) : 0;
  const retail = getPrice ? getPrice(product, 'retail', selectedVariant) : 0;
  const [selectedImg, setSelectedImg] = useState(0);
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  const handleSummarize = async () => {
    setSummaryLoading(true);
    const result = await summarizeReviews(product.reviews || []);
    setSummary(result);
    setSummaryLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-in fade-in">
      <div className="bg-white border-b py-3 px-4 sticky top-16 z-40"><button onClick={() => setView('all_products')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-slate-900"><ArrowLeft size={16}/> Back</button></div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
             <div className="bg-white p-4 border rounded-xl flex items-center justify-center h-[400px] mb-4"><img src={product.images[selectedImg]} className="max-h-full max-w-full object-contain"/></div>
             <div className="flex gap-2 overflow-x-auto">{product.images.map((img, idx) => <div key={idx} onClick={() => setSelectedImg(idx)} className="w-20 h-20 border rounded cursor-pointer p-1"><img src={img} className="w-full h-full object-contain"/></div>)}</div>
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

            {product.relatedProducts && product.relatedProducts.length > 0 && (
              <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-3 text-sm">You Might Also Need</h3>
                <div className="space-y-3">
                  {product.relatedProducts.map(relId => {
                    const relProd = products.find(p => p.id === relId);
                    if(!relProd) return null;
                    return (
                      <div key={relId} className="flex items-center gap-3 bg-white p-2 rounded-lg border border-blue-100 cursor-pointer hover:shadow-md transition" onClick={() => setActiveProductId(relId)}>
                         <img src={relProd.images[0]} className="w-10 h-10 object-contain"/>
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

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setTimeout(() => {
        setProducts(MOCK_DB_PRODUCTS);
        setLoading(false);
      }, 800);
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
              {view === 'product_detail' && <ProductDetailPage product={products.find(p => p.id === activeProductId)} getPrice={getPrice} isLoggedIn={isLoggedIn} addToCart={addToCart} setShowLoginModal={setShowLoginModal} setView={setView} setActiveProductId={setActiveProductId} products={products} lmeUsd={lmeUsd}/>}
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