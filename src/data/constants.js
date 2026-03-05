// --- Pricing Constants ---
export const USD_TO_INR = 84.00;
export const BASE_LME_COPPER_USD = 12000;

// --- Mock Product Database (mirrors Supabase seed — used as fallback) ---
export const MOCK_DB_PRODUCTS = [
  {
    id: "prod_001", name: "CMI FR Copper House Wire", brand: "CMI", category: "Wires & Cables",
    rating: 4.8, reviewCount: 124, isDynamic: true, baseMfgCost: 800, copperWeightKg: 1.0,
    retailMarkup: 1.35, wholesaleMarkup: 1.12, unit: "Coil (90m)", hasVariants: true,
    variants: [
      { id: "v001_1", name: "1.0 sqmm", color: "Red", modifier: 1.0 },
      { id: "v001_2", name: "1.5 sqmm", color: "Red", modifier: 1.4 },
      { id: "v001_3", name: "2.5 sqmm", color: "Yellow", modifier: 2.1 },
      { id: "v001_4", name: "4.0 sqmm", color: "Blue", modifier: 3.2 },
      { id: "v001_5", name: "6.0 sqmm", color: "Green", modifier: 4.8 },
    ],
    relatedProducts: ["prod_002", "prod_005"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800&crop=center"],
    description: "Premium Flame Retardant (FR) PVC insulated copper conductor wire. ISI marked. Ideal for domestic wiring in residential and commercial projects.",
    specs: { Conductor: "Multistrand Copper", Insulation: "FR PVC", "Voltage Rating": "1100V", Standard: "IS 694" },
    reviews: [{ user: "Rajesh Elec.", rating: 5, date: "2 days ago", text: "Copper quality is genuine, weight verified." }],
  },
  {
    id: "prod_002", name: "Polycab FRLSH Copper Wire", brand: "Polycab", category: "Wires & Cables",
    rating: 4.9, reviewCount: 218, isDynamic: true, baseMfgCost: 950, copperWeightKg: 1.0,
    retailMarkup: 1.38, wholesaleMarkup: 1.14, unit: "Coil (90m)", hasVariants: true,
    variants: [
      { id: "v002_1", name: "1.5 sqmm", color: "Red", modifier: 1.0 },
      { id: "v002_2", name: "2.5 sqmm", color: "Yellow", modifier: 1.55 },
      { id: "v002_3", name: "4.0 sqmm", color: "Blue", modifier: 2.4 },
      { id: "v002_4", name: "6.0 sqmm", color: "Black", modifier: 3.6 },
    ],
    relatedProducts: ["prod_001", "prod_003"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800"],
    description: "Flame Retardant Low Smoke Halogen-free copper wire. Superior fire safety for commercial and industrial installations. CPRI tested.",
    specs: { Conductor: "Multistrand Copper", Insulation: "FRLSH PVC", "Voltage Rating": "1100V", Standard: "IS 694" },
    reviews: [],
  },
  {
    id: "prod_003", name: "Havells Life Line Plus Copper Wire", brand: "Havells", category: "Wires & Cables",
    rating: 4.7, reviewCount: 89, isDynamic: true, baseMfgCost: 880, copperWeightKg: 1.0,
    retailMarkup: 1.36, wholesaleMarkup: 1.13, unit: "Coil (90m)", hasVariants: true,
    variants: [
      { id: "v003_1", name: "1.0 sqmm", color: "Red", modifier: 1.0 },
      { id: "v003_2", name: "1.5 sqmm", color: "Blue", modifier: 1.42 },
      { id: "v003_3", name: "2.5 sqmm", color: "Yellow", modifier: 2.15 },
    ],
    relatedProducts: ["prod_001", "prod_002"],
    images: ["https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=800"],
    description: "Electrolytic grade copper with triple-layer insulation. 10-year performance warranty. Preferred by EPC contractors for panel wiring.",
    specs: { Conductor: "ETP Copper", Insulation: "FR PVC", "Voltage Rating": "1100V", Standard: "IS 694", Warranty: "10 years" },
    reviews: [],
  },
  {
    id: "prod_004", name: "Finolex 4 Core Armoured Cable", brand: "Finolex", category: "Wires & Cables",
    rating: 4.6, reviewCount: 47, isDynamic: true, baseMfgCost: 4200, copperWeightKg: 4.8,
    retailMarkup: 1.30, wholesaleMarkup: 1.10, unit: "Drum (100m)", hasVariants: true,
    variants: [
      { id: "v004_1", name: "4C × 10 sqmm", color: "Black", modifier: 1.0 },
      { id: "v004_2", name: "4C × 16 sqmm", color: "Black", modifier: 1.55 },
      { id: "v004_3", name: "4C × 25 sqmm", color: "Black", modifier: 2.3 },
    ],
    relatedProducts: ["prod_005"],
    images: ["https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=800"],
    description: "XLPE insulated, PVC sheathed armoured cable for underground and heavy-duty industrial power distribution. Steel wire armoured.",
    specs: { Conductor: "Stranded Copper", Insulation: "XLPE", Armour: "Galvanized Steel Wire", Sheath: "PVC", "Voltage Rating": "1100V", Standard: "IS 1554" },
    reviews: [],
  },
  {
    id: "prod_005", name: "Polycab Control Cable (Multi-Core)", brand: "Polycab", category: "Wires & Cables",
    rating: 4.5, reviewCount: 63, isDynamic: false, baseMfgCost: 1800, copperWeightKg: 2.1,
    retailMarkup: 1.28, wholesaleMarkup: 1.09, unit: "Drum (100m)", hasVariants: false,
    variants: [],
    relatedProducts: ["prod_004"],
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"],
    description: "Multi-core PVC insulated control cable for industrial automation and panel wiring. Used in MCC and PCC panels.",
    specs: { Conductor: "Tinned Copper", Insulation: "PVC", Cores: "12 Core", "Cross Section": "1.5 sqmm", Standard: "IS 1554" },
    reviews: [],
  },
  {
    id: "prod_006", name: "Schneider Easy9 MCB (6kA)", brand: "Schneider Electric", category: "Switchgear",
    rating: 4.7, reviewCount: 312, isDynamic: false, baseMfgCost: 320, copperWeightKg: 0,
    retailMarkup: 1.45, wholesaleMarkup: 1.18, unit: "Piece", hasVariants: true,
    variants: [
      { id: "v006_1", name: "1P — 6A", color: null, modifier: 1.0 },
      { id: "v006_2", name: "1P — 10A", color: null, modifier: 1.0 },
      { id: "v006_3", name: "1P — 16A", color: null, modifier: 1.05 },
      { id: "v006_4", name: "1P — 32A", color: null, modifier: 1.15 },
      { id: "v006_5", name: "3P — 16A", color: null, modifier: 2.8 },
      { id: "v006_6", name: "3P — 32A", color: null, modifier: 3.2 },
    ],
    relatedProducts: ["prod_007", "prod_008"],
    images: ["https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"],
    description: "Easy9 series Miniature Circuit Breaker, 6kA breaking capacity. IEC 60898-1 certified. Standard for residential and light commercial panels.",
    specs: { Standard: "IEC 60898-1", "Breaking Capacity": "6kA", Poles: "1P / 2P / 3P", Mounting: "DIN Rail", "Op. Temp": "-25°C to +60°C" },
    reviews: [],
  },
  {
    id: "prod_007", name: "L&T DBN Series MCB (10kA)", brand: "L&T", category: "Switchgear",
    rating: 4.8, reviewCount: 156, isDynamic: false, baseMfgCost: 480, copperWeightKg: 0,
    retailMarkup: 1.42, wholesaleMarkup: 1.16, unit: "Piece", hasVariants: true,
    variants: [
      { id: "v007_1", name: "3P — 16A", color: null, modifier: 1.0 },
      { id: "v007_2", name: "3P — 32A", color: null, modifier: 1.3 },
      { id: "v007_3", name: "3P — 63A", color: null, modifier: 2.1 },
      { id: "v007_4", name: "4P — 63A", color: null, modifier: 2.6 },
    ],
    relatedProducts: ["prod_006", "prod_008"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800"],
    description: "High performance 10kA MCB for industrial panel boards. Dual terminal design. Suitable for MCC, PCC, and distribution panels.",
    specs: { Standard: "IEC 60947-2", "Breaking Capacity": "10kA", Poles: "3P / 4P", Mounting: "DIN Rail", Tripping: "B / C / D" },
    reviews: [],
  },
  {
    id: "prod_008", name: "Schneider Acti 9 RCCB (30mA)", brand: "Schneider Electric", category: "Switchgear",
    rating: 4.6, reviewCount: 94, isDynamic: false, baseMfgCost: 850, copperWeightKg: 0,
    retailMarkup: 1.40, wholesaleMarkup: 1.15, unit: "Piece", hasVariants: true,
    variants: [
      { id: "v008_1", name: "2P — 25A", color: null, modifier: 1.0 },
      { id: "v008_2", name: "2P — 40A", color: null, modifier: 1.2 },
      { id: "v008_3", name: "4P — 40A", color: null, modifier: 1.9 },
      { id: "v008_4", name: "4P — 63A", color: null, modifier: 2.4 },
    ],
    relatedProducts: ["prod_006", "prod_007"],
    images: ["https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"],
    description: "Residual Current Circuit Breaker for earth leakage protection. 30mA sensitivity for human protection in residential and commercial panels.",
    specs: { Standard: "IEC 61008", Sensitivity: "30mA", Poles: "2P / 4P", "Rated Current": "25A / 40A / 63A", Type: "AC" },
    reviews: [],
  },
  {
    id: "prod_009", name: "Copper Bus Bar (Tinned)", brand: "CMI", category: "Panel Accessories",
    rating: 4.9, reviewCount: 41, isDynamic: true, baseMfgCost: 1200, copperWeightKg: 2.8,
    retailMarkup: 1.32, wholesaleMarkup: 1.10, unit: "Piece (1m)", hasVariants: true,
    variants: [
      { id: "v009_1", name: "25mm × 3mm", color: null, modifier: 0.5 },
      { id: "v009_2", name: "50mm × 5mm", color: null, modifier: 1.0 },
      { id: "v009_3", name: "63mm × 6mm", color: null, modifier: 1.5 },
      { id: "v009_4", name: "100mm × 10mm", color: null, modifier: 4.0 },
    ],
    relatedProducts: ["prod_010"],
    images: ["https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800"],
    description: "High conductivity electrolytic grade tinned copper bus bar for panel boards and distribution boxes. Drilled and chamfered ends.",
    specs: { Material: "ETP Copper (99.9%)", Finish: "Electro-Tinned", Dimensions: "50mm × 5mm", Standard: "IS 613", Conductivity: "≥ 100% IACS" },
    reviews: [],
  },
  {
    id: "prod_010", name: "DIN Rail (Steel, 35mm)", brand: "L&T", category: "Panel Accessories",
    rating: 4.4, reviewCount: 78, isDynamic: false, baseMfgCost: 95, copperWeightKg: 0,
    retailMarkup: 1.50, wholesaleMarkup: 1.20, unit: "Piece (1m)", hasVariants: false,
    variants: [],
    relatedProducts: ["prod_006", "prod_007", "prod_009"],
    images: ["https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800"],
    description: "Standard 35mm steel DIN rail (EN 50022) for mounting MCBs, RCCBs, contactors and other modular devices in distribution boards.",
    specs: { Material: "Galvanized Steel", Width: "35mm", Height: "7.5mm", Standard: "EN 50022 / IEC 60715", Finish: "Zinc Passivated" },
    reviews: [],
  },
  {
    id: "prod_011", name: "Electrolytic Copper Rod (8mm)", brand: "Hindalco", category: "Metals",
    rating: 4.7, reviewCount: 29, isDynamic: true, baseMfgCost: 0, copperWeightKg: 100,
    retailMarkup: 1.08, wholesaleMarkup: 1.03, unit: "Coil (100kg)", hasVariants: false,
    variants: [],
    relatedProducts: ["prod_001", "prod_002"],
    images: ["https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=800"],
    description: "Continuous cast electrolytic tough pitch copper rod. Primary feedstock for wire drawing. 99.9% purity, LME-linked pricing.",
    specs: { Purity: "99.9% Cu", Diameter: "8mm ± 0.1mm", Standard: "IS 613 / ASTM B49", Conductivity: "≥ 100% IACS", Origin: "India" },
    reviews: [],
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
