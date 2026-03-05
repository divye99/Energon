import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase client — will be null if env vars not set (app falls back to mock data)
export const supabase = supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Fetch all products from Supabase.
 * Returns null if Supabase is not configured (triggers mock data fallback).
 *
 * Expected table: products
 *   id, name, brand, category, description, is_dynamic, base_mfg_cost,
 *   copper_weight_kg, retail_markup, wholesale_markup, unit, supplier_id,
 *   images (jsonb array), specs (jsonb), rating, review_count, has_variants
 *
 * Expected table: product_variants
 *   id, product_id, name, color, modifier
 */
export async function fetchProducts() {
  if (!supabase) return null;

  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      product_variants (*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase fetchProducts error:', error);
    return null;
  }

  // Normalize to match the shape the app expects
  return (products || []).map(p => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    rating: p.rating || 4.5,
    reviewCount: p.review_count || 0,
    isDynamic: p.is_dynamic,
    baseMfgCost: p.base_mfg_cost,
    copperWeightKg: p.copper_weight_kg,
    retailMarkup: p.retail_markup,
    wholesaleMarkup: p.wholesale_markup,
    unit: p.unit,
    hasVariants: p.has_variants,
    variants: (p.product_variants || []).map(v => ({
      id: v.id,
      name: v.name,
      color: v.color,
      modifier: v.modifier,
    })),
    images: p.images || [],
    description: p.description,
    specs: p.specs || {},
    reviews: [],
    relatedProducts: p.related_product_ids || [],
  }));
}

/**
 * Supabase schema reference (run in Supabase SQL editor):
 *
 * create table profiles (
 *   id uuid references auth.users primary key,
 *   email text, phone text, company_name text,
 *   gstin text, role text default 'user', created_at timestamptz default now()
 * );
 *
 * create table suppliers (
 *   id uuid default gen_random_uuid() primary key,
 *   name text not null, verified boolean default false,
 *   certifications text[], location text, created_at timestamptz default now()
 * );
 *
 * create table products (
 *   id text primary key, name text not null, brand text, category text,
 *   description text, is_dynamic boolean default false,
 *   base_mfg_cost numeric, copper_weight_kg numeric,
 *   retail_markup numeric, wholesale_markup numeric, unit text,
 *   supplier_id uuid references suppliers(id),
 *   images jsonb, specs jsonb, rating numeric default 4.5,
 *   review_count int default 0, has_variants boolean default false,
 *   related_product_ids text[], created_at timestamptz default now()
 * );
 *
 * create table product_variants (
 *   id text primary key, product_id text references products(id),
 *   name text, color text, modifier numeric default 1.0
 * );
 *
 * create table orders (
 *   id uuid default gen_random_uuid() primary key,
 *   user_id uuid references profiles(id),
 *   status text default 'pending', total_amount numeric,
 *   created_at timestamptz default now()
 * );
 *
 * create table order_items (
 *   id uuid default gen_random_uuid() primary key,
 *   order_id uuid references orders(id),
 *   product_id text references products(id),
 *   variant_id text, quantity int, unit_price numeric
 * );
 *
 * create table market_prices (
 *   id uuid default gen_random_uuid() primary key,
 *   commodity text not null, price_usd numeric, price_inr numeric,
 *   recorded_at timestamptz default now()
 * );
 */
