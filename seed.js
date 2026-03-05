/**
 * Energon — Supabase Seed Script
 * Run: node seed.js
 *
 * Before running, execute this in Supabase SQL Editor to allow seed inserts:
 *   alter table suppliers disable row level security;
 *   alter table products disable row level security;
 *   alter table product_variants disable row level security;
 *   alter table market_prices disable row level security;
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ehiysqnagoumkxnphlbj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoaXlzcW5hZ291bWt4bnBobGJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MTUwNzYsImV4cCI6MjA4ODI5MTA3Nn0.GPvEX5W6fs4un6d27l0s8DemAhC9EHrwH1P-RtWy0YE';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Pre-defined UUIDs for suppliers so we can reference them in products
const SUP = {
  cmi:       'a1000000-0000-0000-0000-000000000001',
  polycab:   'a2000000-0000-0000-0000-000000000002',
  havells:   'a3000000-0000-0000-0000-000000000003',
  schneider: 'a4000000-0000-0000-0000-000000000004',
  lt:        'a5000000-0000-0000-0000-000000000005',
  finolex:   'a6000000-0000-0000-0000-000000000006',
};

// ── Suppliers ──────────────────────────────────────────────────────────────
const SUPPLIERS = [
  { id: SUP.cmi,       name: 'CMI Limited',         verified: true, certifications: ['ISI', 'BIS', 'ISO 9001'],              location: 'Delhi NCR' },
  { id: SUP.polycab,   name: 'Polycab India',        verified: true, certifications: ['ISI', 'BIS', 'ISO 9001', 'CPRI'],     location: 'Gujarat' },
  { id: SUP.havells,   name: 'Havells India',        verified: true, certifications: ['ISI', 'BIS', 'ISO 9001'],              location: 'Delhi NCR' },
  { id: SUP.schneider, name: 'Schneider Electric',   verified: true, certifications: ['IEC', 'CE', 'BIS'],                   location: 'Bangalore' },
  { id: SUP.lt,        name: 'L&T Electrical',       verified: true, certifications: ['IEC', 'BIS', 'ISO 9001'],              location: 'Mumbai' },
  { id: SUP.finolex,   name: 'Finolex Cables',       verified: true, certifications: ['ISI', 'BIS', 'ISO 9001'],              location: 'Pune' },
];

// ── Products ───────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'prod_001', name: 'CMI FR Copper House Wire', brand: 'CMI', category: 'Wires & Cables',
    description: 'Premium Flame Retardant (FR) PVC insulated copper conductor wire. ISI marked. Ideal for domestic wiring in residential and commercial projects.',
    is_dynamic: true, base_mfg_cost: 800, copper_weight_kg: 1.0, retail_markup: 1.35, wholesale_markup: 1.12,
    unit: 'Coil (90m)', supplier_id: SUP.cmi,
    images: ['https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?auto=format&fit=crop&q=80&w=800'],
    specs: { Conductor: 'Multistrand Copper', Insulation: 'FR PVC', 'Voltage Rating': '1100V', Standard: 'IS 694' },
    rating: 4.8, review_count: 124, has_variants: true, related_product_ids: ['prod_002', 'prod_005'],
  },
  {
    id: 'prod_002', name: 'Polycab FRLSH Copper Wire', brand: 'Polycab', category: 'Wires & Cables',
    description: 'Flame Retardant Low Smoke Halogen-free copper wire. Superior fire safety for commercial and industrial installations. CPRI tested.',
    is_dynamic: true, base_mfg_cost: 950, copper_weight_kg: 1.0, retail_markup: 1.38, wholesale_markup: 1.14,
    unit: 'Coil (90m)', supplier_id: SUP.polycab,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800'],
    specs: { Conductor: 'Multistrand Copper', Insulation: 'FRLSH PVC', 'Voltage Rating': '1100V', Standard: 'IS 694' },
    rating: 4.9, review_count: 218, has_variants: true, related_product_ids: ['prod_001', 'prod_003'],
  },
  {
    id: 'prod_003', name: 'Havells Life Line Plus Copper Wire', brand: 'Havells', category: 'Wires & Cables',
    description: 'Electrolytic grade copper with triple-layer insulation. 10-year performance warranty. Preferred by EPC contractors for panel wiring.',
    is_dynamic: true, base_mfg_cost: 880, copper_weight_kg: 1.0, retail_markup: 1.36, wholesale_markup: 1.13,
    unit: 'Coil (90m)', supplier_id: SUP.havells,
    images: ['https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=800'],
    specs: { Conductor: 'ETP Copper', Insulation: 'FR PVC', 'Voltage Rating': '1100V', Standard: 'IS 694', Warranty: '10 years' },
    rating: 4.7, review_count: 89, has_variants: true, related_product_ids: ['prod_001', 'prod_002'],
  },
  {
    id: 'prod_004', name: 'Finolex 4 Core Armoured Cable', brand: 'Finolex', category: 'Wires & Cables',
    description: 'XLPE insulated, PVC sheathed armoured cable for underground and heavy-duty industrial power distribution. Steel wire armoured.',
    is_dynamic: true, base_mfg_cost: 4200, copper_weight_kg: 4.8, retail_markup: 1.30, wholesale_markup: 1.10,
    unit: 'Drum (100m)', supplier_id: SUP.finolex,
    images: ['https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=800'],
    specs: { Conductor: 'Stranded Copper', Insulation: 'XLPE', Armour: 'Galvanized Steel Wire', Sheath: 'PVC', 'Voltage Rating': '1100V', Standard: 'IS 1554' },
    rating: 4.6, review_count: 47, has_variants: true, related_product_ids: ['prod_005'],
  },
  {
    id: 'prod_005', name: 'Polycab Control Cable (Multi-Core)', brand: 'Polycab', category: 'Wires & Cables',
    description: 'Multi-core PVC insulated control cable for industrial automation and panel wiring. Used in MCC and PCC panels.',
    is_dynamic: false, base_mfg_cost: 1800, copper_weight_kg: 2.1, retail_markup: 1.28, wholesale_markup: 1.09,
    unit: 'Drum (100m)', supplier_id: SUP.polycab,
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'],
    specs: { Conductor: 'Tinned Copper', Insulation: 'PVC', Cores: '12 Core', 'Cross Section': '1.5 sqmm', Standard: 'IS 1554' },
    rating: 4.5, review_count: 63, has_variants: false, related_product_ids: ['prod_004'],
  },
  {
    id: 'prod_006', name: 'Schneider Easy9 MCB (6kA)', brand: 'Schneider Electric', category: 'Switchgear',
    description: 'Easy9 series Miniature Circuit Breaker, 6kA breaking capacity. IEC 60898-1 certified. Standard for residential and light commercial panels.',
    is_dynamic: false, base_mfg_cost: 320, copper_weight_kg: 0, retail_markup: 1.45, wholesale_markup: 1.18,
    unit: 'Piece', supplier_id: SUP.schneider,
    images: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800'],
    specs: { Standard: 'IEC 60898-1', 'Breaking Capacity': '6kA', Poles: '1P / 2P / 3P', Mounting: 'DIN Rail', 'Op. Temp': '-25°C to +60°C' },
    rating: 4.7, review_count: 312, has_variants: true, related_product_ids: ['prod_007', 'prod_008'],
  },
  {
    id: 'prod_007', name: 'L&T DBN Series MCB (10kA)', brand: 'L&T', category: 'Switchgear',
    description: 'High performance 10kA MCB for industrial panel boards. Dual terminal design. Suitable for MCC, PCC, and distribution panels.',
    is_dynamic: false, base_mfg_cost: 480, copper_weight_kg: 0, retail_markup: 1.42, wholesale_markup: 1.16,
    unit: 'Piece', supplier_id: SUP.lt,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800'],
    specs: { Standard: 'IEC 60947-2', 'Breaking Capacity': '10kA', Poles: '3P / 4P', Mounting: 'DIN Rail', Tripping: 'B / C / D' },
    rating: 4.8, review_count: 156, has_variants: true, related_product_ids: ['prod_006', 'prod_008'],
  },
  {
    id: 'prod_008', name: 'Schneider Acti 9 RCCB (30mA)', brand: 'Schneider Electric', category: 'Switchgear',
    description: 'Residual Current Circuit Breaker for earth leakage protection. 30mA sensitivity for human protection in residential and commercial panels.',
    is_dynamic: false, base_mfg_cost: 850, copper_weight_kg: 0, retail_markup: 1.40, wholesale_markup: 1.15,
    unit: 'Piece', supplier_id: SUP.schneider,
    images: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800'],
    specs: { Standard: 'IEC 61008', Sensitivity: '30mA', Poles: '2P / 4P', 'Rated Current': '25A / 40A / 63A', Type: 'AC' },
    rating: 4.6, review_count: 94, has_variants: true, related_product_ids: ['prod_006', 'prod_007'],
  },
  {
    id: 'prod_009', name: 'Copper Bus Bar (Tinned)', brand: 'CMI', category: 'Panel Accessories',
    description: 'High conductivity electrolytic grade tinned copper bus bar for panel boards and distribution boxes. Drilled and chamfered ends.',
    is_dynamic: true, base_mfg_cost: 1200, copper_weight_kg: 2.8, retail_markup: 1.32, wholesale_markup: 1.10,
    unit: 'Piece (1m)', supplier_id: SUP.cmi,
    images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800'],
    specs: { Material: 'ETP Copper (99.9%)', Finish: 'Electro-Tinned', Dimensions: '50mm × 5mm', Standard: 'IS 613', Conductivity: '≥ 100% IACS' },
    rating: 4.9, review_count: 41, has_variants: true, related_product_ids: ['prod_010'],
  },
  {
    id: 'prod_010', name: 'DIN Rail (Steel, 35mm)', brand: 'L&T', category: 'Panel Accessories',
    description: 'Standard 35mm steel DIN rail (EN 50022) for mounting MCBs, RCCBs, contactors and other modular devices in distribution boards.',
    is_dynamic: false, base_mfg_cost: 95, copper_weight_kg: 0, retail_markup: 1.50, wholesale_markup: 1.20,
    unit: 'Piece (1m)', supplier_id: SUP.lt,
    images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800'],
    specs: { Material: 'Galvanized Steel', Width: '35mm', Height: '7.5mm', Standard: 'EN 50022 / IEC 60715', Finish: 'Zinc Passivated' },
    rating: 4.4, review_count: 78, has_variants: false, related_product_ids: ['prod_006', 'prod_007', 'prod_009'],
  },
  {
    id: 'prod_011', name: 'Electrolytic Copper Rod (8mm)', brand: 'Hindalco', category: 'Metals',
    description: 'Continuous cast electrolytic tough pitch copper rod. Primary feedstock for wire drawing. 99.9% purity, LME-linked pricing.',
    is_dynamic: true, base_mfg_cost: 0, copper_weight_kg: 100, retail_markup: 1.08, wholesale_markup: 1.03,
    unit: 'Coil (100kg)', supplier_id: SUP.cmi,
    images: ['https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=800'],
    specs: { Purity: '99.9% Cu', Diameter: '8mm ± 0.1mm', Standard: 'IS 613 / ASTM B49', Conductivity: '≥ 100% IACS', Origin: 'India' },
    rating: 4.7, review_count: 29, has_variants: false, related_product_ids: ['prod_001', 'prod_002'],
  },
];

// ── Variants ───────────────────────────────────────────────────────────────
const VARIANTS = [
  { id: 'v001_1', product_id: 'prod_001', name: '1.0 sqmm', color: 'Red',    modifier: 1.0 },
  { id: 'v001_2', product_id: 'prod_001', name: '1.5 sqmm', color: 'Red',    modifier: 1.4 },
  { id: 'v001_3', product_id: 'prod_001', name: '2.5 sqmm', color: 'Yellow', modifier: 2.1 },
  { id: 'v001_4', product_id: 'prod_001', name: '4.0 sqmm', color: 'Blue',   modifier: 3.2 },
  { id: 'v001_5', product_id: 'prod_001', name: '6.0 sqmm', color: 'Green',  modifier: 4.8 },
  { id: 'v002_1', product_id: 'prod_002', name: '1.5 sqmm', color: 'Red',    modifier: 1.0 },
  { id: 'v002_2', product_id: 'prod_002', name: '2.5 sqmm', color: 'Yellow', modifier: 1.55 },
  { id: 'v002_3', product_id: 'prod_002', name: '4.0 sqmm', color: 'Blue',   modifier: 2.4 },
  { id: 'v002_4', product_id: 'prod_002', name: '6.0 sqmm', color: 'Black',  modifier: 3.6 },
  { id: 'v003_1', product_id: 'prod_003', name: '1.0 sqmm', color: 'Red',    modifier: 1.0 },
  { id: 'v003_2', product_id: 'prod_003', name: '1.5 sqmm', color: 'Blue',   modifier: 1.42 },
  { id: 'v003_3', product_id: 'prod_003', name: '2.5 sqmm', color: 'Yellow', modifier: 2.15 },
  { id: 'v004_1', product_id: 'prod_004', name: '4C × 10 sqmm', color: 'Black', modifier: 1.0 },
  { id: 'v004_2', product_id: 'prod_004', name: '4C × 16 sqmm', color: 'Black', modifier: 1.55 },
  { id: 'v004_3', product_id: 'prod_004', name: '4C × 25 sqmm', color: 'Black', modifier: 2.3 },
  { id: 'v006_1', product_id: 'prod_006', name: '1P — 6A',  color: null, modifier: 1.0 },
  { id: 'v006_2', product_id: 'prod_006', name: '1P — 10A', color: null, modifier: 1.0 },
  { id: 'v006_3', product_id: 'prod_006', name: '1P — 16A', color: null, modifier: 1.05 },
  { id: 'v006_4', product_id: 'prod_006', name: '1P — 32A', color: null, modifier: 1.15 },
  { id: 'v006_5', product_id: 'prod_006', name: '3P — 16A', color: null, modifier: 2.8 },
  { id: 'v006_6', product_id: 'prod_006', name: '3P — 32A', color: null, modifier: 3.2 },
  { id: 'v007_1', product_id: 'prod_007', name: '3P — 16A', color: null, modifier: 1.0 },
  { id: 'v007_2', product_id: 'prod_007', name: '3P — 32A', color: null, modifier: 1.3 },
  { id: 'v007_3', product_id: 'prod_007', name: '3P — 63A', color: null, modifier: 2.1 },
  { id: 'v007_4', product_id: 'prod_007', name: '4P — 63A', color: null, modifier: 2.6 },
  { id: 'v008_1', product_id: 'prod_008', name: '2P — 25A', color: null, modifier: 1.0 },
  { id: 'v008_2', product_id: 'prod_008', name: '2P — 40A', color: null, modifier: 1.2 },
  { id: 'v008_3', product_id: 'prod_008', name: '4P — 40A', color: null, modifier: 1.9 },
  { id: 'v008_4', product_id: 'prod_008', name: '4P — 63A', color: null, modifier: 2.4 },
  { id: 'v009_1', product_id: 'prod_009', name: '25mm × 3mm',  color: null, modifier: 0.5 },
  { id: 'v009_2', product_id: 'prod_009', name: '50mm × 5mm',  color: null, modifier: 1.0 },
  { id: 'v009_3', product_id: 'prod_009', name: '63mm × 6mm',  color: null, modifier: 1.5 },
  { id: 'v009_4', product_id: 'prod_009', name: '100mm × 10mm', color: null, modifier: 4.0 },
];

// ── Market Prices ──────────────────────────────────────────────────────────
const MARKET_PRICES = [
  { commodity: 'Copper',   price_usd: 12107.80, price_inr: 1017055 },
  { commodity: 'Aluminum', price_usd: 2285.50,  price_inr: 191982 },
  { commodity: 'Steel',    price_usd: 548.00,   price_inr: 46032 },
  { commodity: 'PVC',      price_usd: 1050.00,  price_inr: 88200 },
  { commodity: 'Zinc',     price_usd: 2810.00,  price_inr: 236040 },
];

// ── Seed ───────────────────────────────────────────────────────────────────
async function seed() {
  console.log('🌱 Starting Energon seed...\n');

  const steps = [
    { label: 'suppliers',       table: 'suppliers',        data: SUPPLIERS,     conflict: 'id' },
    { label: 'products',        table: 'products',         data: PRODUCTS,      conflict: 'id' },
    { label: 'variants',        table: 'product_variants', data: VARIANTS,      conflict: 'id' },
    { label: 'market prices',   table: 'market_prices',    data: MARKET_PRICES, conflict: null },
  ];

  for (const step of steps) {
    process.stdout.write(`Inserting ${step.label}... `);
    const q = step.conflict
      ? supabase.from(step.table).upsert(step.data, { onConflict: step.conflict })
      : supabase.from(step.table).insert(step.data);
    const { error } = await q;
    if (error) {
      console.log(`✗\n  Error: ${error.message}`);
      if (error.message.includes('row-level security')) {
        console.log('\n  👉 RLS is blocking inserts. Run this in Supabase SQL Editor first:\n');
        console.log('  alter table suppliers disable row level security;');
        console.log('  alter table products disable row level security;');
        console.log('  alter table product_variants disable row level security;');
        console.log('  alter table market_prices disable row level security;\n');
      }
      process.exit(1);
    }
    console.log(`✓ (${step.data.length} records)`);
  }

  console.log('\n✅ Seed complete! Your Supabase database is ready.');
}

seed().catch(console.error);
