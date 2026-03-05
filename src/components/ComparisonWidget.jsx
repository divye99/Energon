import React, { useState } from 'react';
import { X, Scale, Sparkles, Loader2 } from 'lucide-react';
import { compareProductsAI } from '../data/constants';

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
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-brand-green-dark text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-4 ring-4 ring-brand-green/20">
        <span className="font-semibold text-sm">{compareList.length} selected</span>
        <button
          onClick={handleCompare}
          disabled={compareList.length < 2}
          className="bg-white text-brand-green-dark px-4 py-1.5 rounded-full text-xs font-bold disabled:opacity-50 flex items-center gap-2 transition-all hover:bg-brand-green-light"
        >
          <Scale size={13} /> Compare with AI
        </button>
        <button onClick={() => setCompareList([])} className="hover:bg-white/20 p-1.5 rounded-full">
          <X size={14} />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[80vh] overflow-y-auto p-6 shadow-2xl relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
              <Sparkles className="text-brand-green" size={20} /> AI Product Comparison
            </h2>
            {loading ? (
              <div className="py-16 flex flex-col items-center justify-center text-slate-400 gap-3">
                <Loader2 size={36} className="animate-spin text-brand-green" />
                <p className="text-sm">Comparing products...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-brand-green-light rounded-xl border border-brand-green/20">
                  <p className="text-sm text-slate-700 font-medium">{comparisonData?.summary}</p>
                </div>
                {comparisonData?.specDifferences?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2 text-sm">Key Differences</h3>
                    <ul className="space-y-1">
                      {comparisonData.specDifferences.map((diff, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-brand-green rounded-full" /> {diff}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {comparisonData?.recommendation && (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Recommendation</p>
                    <p className="text-sm text-slate-700">{comparisonData.recommendation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ComparisonWidget;
