import React from 'react';
import { Package } from 'lucide-react';
import ProductCard from './ProductCard';

const CATEGORIES = ['All', 'Wires & Cables', 'Switchgear', 'Panel Accessories', 'Metals', 'Polymers'];

const AllProductsPage = ({ products, searchQuery, setSearchQuery, setView, getPrice, isLoggedIn, setActiveProductId, compareList, setCompareList }) => {
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filtered = products.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      (p.name || '').toLowerCase().includes(q) ||
      (p.brand || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q) ||
      Object.values(p.specs || {}).some(v => String(v).toLowerCase().includes(q));
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">All Products</h2>
        <p className="text-slate-500 text-sm">LME-linked contractor pricing · BIS verified</p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-brand-green text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-green hover:text-brand-green'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              getPrice={getPrice}
              isLoggedIn={isLoggedIn}
              setActiveProductId={setActiveProductId}
              setView={setView}
              compareList={compareList}
              setCompareList={setCompareList}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400">
          <Package size={44} className="mx-auto mb-4 opacity-20" />
          <p className="font-medium">No products found{searchQuery ? ` for "${searchQuery}"` : ''}</p>
          <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="mt-4 text-brand-green text-sm font-semibold hover:underline">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProductsPage;
