// --- Pricing Constants ---
export const USD_TO_INR = 84.00;
export const BASE_LME_COPPER_USD = 12000;

// --- Mock Product Database ---
export const MOCK_DB_PRODUCTS = [
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
    description: "Premium CMI Brand Flame Retardant (FR) PVC insulated copper conductor wire. ISI marked. Ideal for domestic wiring in residential and commercial projects.",
    specs: { "Conductor": "Multistrand Copper", "Insulation": "FR PVC", "Voltage Rating": "1100V", "Standard": "IS 694" },
    reviews: [{ user: "Rajesh Elec.", rating: 5, date: "2 days ago", text: "Copper quality is genuine, weight verified." }]
  },
];

// --- Market Chart Data ---
export const CHART_DATA = {
  copper: [
    { name: 'Mon', price: 11800 }, { name: 'Tue', price: 11950 },
    { name: 'Wed', price: 12100 }, { name: 'Thu', price: 12050 },
    { name: 'Fri', price: 12200 }, { name: 'Sat', price: 12150 },
    { name: 'Sun', price: 12300 },
  ],
  steel: [
    { name: 'Mon', price: 48000 }, { name: 'Tue', price: 48200 },
    { name: 'Wed', price: 47900 }, { name: 'Thu', price: 48500 },
    { name: 'Fri', price: 49000 }, { name: 'Sat', price: 48800 },
    { name: 'Sun', price: 49200 },
  ],
  aluminum: [
    { name: 'Mon', price: 2200 }, { name: 'Tue', price: 2180 },
    { name: 'Wed', price: 2250 }, { name: 'Thu', price: 2300 },
    { name: 'Fri', price: 2280 }, { name: 'Sat', price: 2310 },
    { name: 'Sun', price: 2350 },
  ],
  pvc: [
    { name: 'Mon', price: 92 }, { name: 'Tue', price: 94 },
    { name: 'Wed', price: 93 }, { name: 'Thu', price: 95 },
    { name: 'Fri', price: 95 }, { name: 'Sat', price: 96 },
    { name: 'Sun', price: 98 },
  ],
};

// --- Market News ---
export const NEWS_UPDATES = [
  { id: 1, title: "Copper hits 3-month high on supply concerns from Chile", source: "Global Metal", time: "2h ago" },
  { id: 2, title: "Steel prices stabilize as infrastructure demand picks up", source: "Infra Daily", time: "5h ago" },
  { id: 3, title: "Govt announces new PLI scheme for cable manufacturing", source: "Policy Watch", time: "1d ago" },
  { id: 4, title: "BIS tightens quality norms for electrical wires", source: "Bureau of Standards", time: "2d ago" },
];

// --- Team ---
export const TEAM_MEMBERS = [
  {
    name: "Arjun Mehta",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    bio: "Ex-Infrastructure Engineer with 8 years in EPC project procurement."
  },
  {
    name: "Priya Sharma",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    bio: "Supply chain expert, previously at Tata Projects."
  },
  {
    name: "Vikram Singh",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    bio: "Built procurement platforms at scale. Ex-Amazon, ex-Udaan."
  },
];

// --- AI Stubs ---
export const callGeminiAPI = async (userPrompt) => {
  return new Promise(resolve =>
    setTimeout(() => resolve("Connect Gemini API via VITE_GEMINI_API_KEY to unlock live AI responses. For now, I can help you search our catalog or check live LME prices!"), 1500)
  );
};

export const compareProductsAI = async () => {
  return new Promise(resolve =>
    setTimeout(() => resolve({
      summary: "Both products meet ISI standards. The key difference is copper weight per metre and insulation grade.",
      specDifferences: ["Copper purity", "Insulation thickness", "Price per metre"],
      recommendation: "Choose based on your application voltage and run length."
    }), 1500)
  );
};

export const summarizeReviews = async () => {
  return new Promise(resolve =>
    setTimeout(() => resolve("Customers consistently praise the copper purity and build quality. Delivery speed rated highly. Minor feedback on packaging."), 1000)
  );
};
