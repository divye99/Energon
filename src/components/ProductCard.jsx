import React from 'react';
import { Star, TrendingUp, Scale } from 'lucide-react';

const ProductCard = ({ product, getPrice, isLoggedIn, setActiveProductId, setView, compareList, setCompareList }) => {
  const price = getPrice ? getPrice(product, isLoggedIn ? 'wholesale' : 'retail') : 0;
  const retail = getPrice ? getPrice(product, 'retail') : 0;
  const isSelected = compareList ? compareList.includes(product.id) : false;

  const handleSelectCompare = (e) => {
    e.stopPropagation();
    if (!setCompareList) return;
    if (isSelected) {
      setCompareList(prev => prev.filter(id => id !== product.id));
    } else {
      if (compareList.length < 3) {
        setCompareList(prev => [...prev, product.id]);
      } else {
        alert('You can compare up to 3 products.');
      }
    }
  };

  return (
    <div
      onClick={() => { setActiveProductId(product.id); setView('product_detail'); window.scrollTo(0, 0); }}
      className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-brand-green/30 transition-all duration-200 flex flex-col h-full group cursor-pointer relative"
    >
      {/* Compare button */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleSelectCompare}
          className={`p-1.5 rounded-lg transition-colors shadow-sm ${isSelected ? 'bg-brand-green text-white' : 'bg-white text-slate-400 hover:text-brand-green border border-slate-200'}`}
          title="Compare"
        >
          <Scale size={15} />
        </button>
      </div>

      {/* Image */}
      <div className="h-52 relative overflow-hidden bg-slate-50 flex items-center justify-center border-b border-slate-100">
        <img
          src={product.images?.[0] || 'https://placehold.co/400?text=No+Image'}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 p-4"
        />
        {product.isDynamic && (
          <div className="absolute top-3 left-3 bg-brand-green text-white text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
            <TrendingUp size={10} /> LME Linked
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
            ))}
          </div>
          <span className="text-xs text-slate-400">({product.reviewCount})</span>
        </div>

        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
          {product.brand || 'Generic'}
        </div>

        <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 mb-3 group-hover:text-brand-green transition-colors leading-snug">
          {product.name || 'Unnamed Product'}
        </h3>

        <div className="mt-auto pt-3 border-t border-dashed border-slate-100">
          <div className="flex justify-between items-end">
            {isLoggedIn ? (
              <div>
                <div className="text-xs text-slate-400 line-through">₹{retail}</div>
                <div className="text-lg font-bold text-slate-900">₹{price}</div>
              </div>
            ) : (
              <div>
                <div className="text-lg font-bold text-slate-300 blur-sm select-none">₹{retail}</div>
              </div>
            )}
            {isLoggedIn ? (
              <span className="bg-brand-green-light text-brand-green-dark text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
                Contractor
              </span>
            ) : (
              <span className="text-[10px] text-brand-green font-semibold bg-brand-green-light px-2 py-1 rounded-full">
                Login to view
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
