import React, { useState } from 'react';
import { Sparkles, Loader2, BrainCircuit } from 'lucide-react';

const SmartPlanner = ({ products, addToCart }) => {
  const [description, setDescription] = useState('');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!description.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setPlan({ items: [{ id: products[0]?.id || 'prod_001', qty: 10, reason: 'Estimated based on project description' }] });
      setLoading(false);
    }, 1500);
  };

  const handleAddAll = () => {
    if (!plan?.items) return;
    plan.items.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (product) addToCart(product, item.qty);
    });
    alert(`Added ${plan.items.length} items to cart!`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full font-semibold text-sm mb-4 border border-purple-200">
          <BrainCircuit size={15} /> AI Powered
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Smart Project Planner</h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Don't have a BOQ? Describe your project and our AI will generate a Bill of Materials — quantities, specs, and all.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Project Description</label>
        <textarea
          className="w-full border border-slate-200 rounded-lg p-4 h-36 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none resize-none text-slate-800 placeholder-slate-400 text-sm"
          placeholder="e.g. Full wiring for a 1,200 sqft 2BHK apartment in Noida. 3 bedrooms, 2 bathrooms, kitchen, living room. Standard loading."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !description.trim()}
          className="mt-4 w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 size={17} className="animate-spin" /> : <Sparkles size={17} />}
          Generate Bill of Materials
        </button>
      </div>

      {plan?.items && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-slide-up">
          <h3 className="font-bold text-lg text-slate-900 mb-5">Estimated Bill of Materials</h3>
          <div className="space-y-3 mb-6">
            {plan.items.map((item, i) => {
              const product = products.find(p => p.id === item.id);
              return (
                <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{product?.name || item.id}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.reason}</div>
                  </div>
                  <div className="text-sm font-semibold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                    Qty: {item.qty}
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={handleAddAll} className="w-full btn-primary py-3">
            Add All to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default SmartPlanner;
