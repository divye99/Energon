import React, { useState } from 'react';
import { ArrowLeft, Star, TrendingUp, Sparkles, Loader2 } from 'lucide-react';
import { summarizeReviews } from '../data/constants';

const ProductDetailPage = ({ product, getPrice, isLoggedIn, addToCart, setShowLoginModal, setView, setActiveProductId, products, lmeUsd, addReview }) => {
  const [selectedVariant, setSelectedVariant] = useState(product?.hasVariants ? product.variants[0] : null);
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  if (!product) return (
    <div className="flex items-center justify-center py-24 text-slate-400">Product not found.</div>
  );

  const wholesale = getPrice ? getPrice(product, 'wholesale', selectedVariant) : 0;
  const retail = getPrice ? getPrice(product, 'retail', selectedVariant) : 0;

  const handleSummarize = async () => {
    setSummaryLoading(true);
    const result = await summarizeReviews(product.reviews || []);
    setSummary(result);
    setSummaryLoading(false);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (userRating === 0) return alert('Please select a rating');
    if (!userComment.trim()) return alert('Please write a comment');
    addReview(product.id, {
      user: isLoggedIn ? 'Verified Contractor' : 'Guest',
      rating: userRating,
      date: 'Just now',
      text: userComment,
    });
    setUserRating(0);
    setUserComment('');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12 animate-fade-in">
      {/* Back bar */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sticky top-16 z-40">
        <button onClick={() => setView('all_products')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors">
          <ArrowLeft size={15} /> Back to Products
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Images */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-slate-200 flex items-center justify-center h-96 mb-3 overflow-hidden">
              <img
                src={product.images?.[selectedImg] || 'https://placehold.co/600?text=No+Image'}
                alt={product.name}
                className="max-h-full max-w-full object-contain p-6"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {(product.images || []).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(idx)}
                  className={`w-16 h-16 border rounded-lg shrink-0 p-1 transition-colors ${selectedImg === idx ? 'border-brand-green' : 'border-slate-200'}`}
                >
                  <img src={img} className="w-full h-full object-contain" alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{product.brand}</div>
            <h1 className="text-xl font-bold text-slate-900 mb-2 leading-snug">{product.name}</h1>
            <div className="flex items-center gap-2 mb-5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="text-sm text-slate-500">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Variants */}
            {product.hasVariants && (
              <div className="mb-5">
                <h3 className="font-semibold text-sm text-slate-700 mb-2">Select Variant</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        selectedVariant?.id === v.id
                          ? 'bg-brand-green border-brand-green text-white'
                          : 'border-slate-200 text-slate-700 hover:border-brand-green'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-5">
              <h3 className="font-semibold text-sm text-slate-700 mb-2">Description</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{product.description}</p>
            </div>

            {/* Specs */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mb-5">
                <h3 className="font-semibold text-sm text-slate-700 mb-2">Specifications</h3>
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                  {Object.entries(product.specs).map(([key, val], i) => (
                    <div key={key} className={`flex text-sm px-4 py-2.5 ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                      <span className="w-40 text-slate-500 font-medium">{key}</span>
                      <span className="text-slate-800">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Review Summary */}
            <div className="mb-5 p-4 bg-brand-green-light rounded-xl border border-brand-green/20">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-brand-green-dark text-sm flex items-center gap-2">
                  <Sparkles size={15} /> AI Review Summary
                </h3>
                {!summary && (
                  <button
                    onClick={handleSummarize}
                    disabled={summaryLoading}
                    className="text-xs bg-brand-green text-white px-3 py-1 rounded-lg hover:bg-brand-green-mid disabled:opacity-50 transition-colors"
                  >
                    {summaryLoading ? 'Analyzing...' : 'Generate'}
                  </button>
                )}
              </div>
              {summary && <p className="text-xs text-green-800 leading-relaxed">{summary}</p>}
              {!summary && !summaryLoading && (
                <p className="text-xs text-green-700">Click Generate to get an AI summary of customer reviews.</p>
              )}
            </div>

            {/* Reviews */}
            <div className="mb-5 border-t border-slate-200 pt-5">
              <h3 className="font-semibold text-slate-800 mb-4">Customer Reviews</h3>
              <div className="space-y-3 mb-5">
                {(product.reviews || []).map((review, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-sm text-slate-800">{review.user}</div>
                        <div className="flex text-amber-400 mt-0.5">
                          {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < review.rating ? 'currentColor' : 'none'} />)}
                        </div>
                      </div>
                      <span className="text-xs text-slate-400">{review.date}</span>
                    </div>
                    <p className="text-sm text-slate-600">{review.text}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-sm text-slate-700 mb-3">Write a Review</h4>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} onClick={() => setUserRating(star)} className={`transition-colors ${userRating >= star ? 'text-amber-400' : 'text-slate-300 hover:text-amber-200'}`}>
                      <Star size={20} fill={userRating >= star ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
                <textarea
                  className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none mb-3 bg-white"
                  rows={3}
                  placeholder="Share your experience..."
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                />
                <button onClick={handleSubmitReview} className="btn-primary text-sm">Submit Review</button>
              </div>
            </div>

            {/* Related products */}
            {(product.relatedProducts || []).length > 0 && (
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="font-semibold text-blue-900 mb-3 text-sm">You Might Also Need</h3>
                <div className="space-y-2">
                  {product.relatedProducts.map(relId => {
                    const rel = products.find(p => p.id === relId);
                    if (!rel) return null;
                    return (
                      <div key={relId} className="flex items-center gap-3 bg-white p-2 rounded-lg border border-blue-100 cursor-pointer hover:shadow-sm transition" onClick={() => { setActiveProductId(relId); setView('product_detail'); }}>
                        <img src={rel.images?.[0] || ''} className="w-9 h-9 object-contain" alt="" />
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-slate-800 line-clamp-1">{rel.name}</div>
                          <div className="text-xs text-slate-400">₹{getPrice ? getPrice(rel, 'wholesale') : 0}</div>
                        </div>
                        <span className="text-brand-green text-xs font-semibold">View</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Buy box */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm sticky top-28">
              {product.isDynamic && (
                <div className="bg-brand-green-light border border-brand-green/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between text-xs text-brand-green-dark mb-1">
                    <span className="font-semibold flex items-center gap-1"><TrendingUp size={11} /> LME Linked</span>
                    <span>Copper @ ${lmeUsd.toFixed(0)}</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-1.5">
                    <div className="bg-brand-green h-1.5 rounded-full animate-pulse" style={{ width: '100%' }} />
                  </div>
                </div>
              )}

              <div className="mb-5">
                {isLoggedIn ? (
                  <div>
                    <div className="text-2xl font-bold text-slate-900">₹{wholesale}</div>
                    <div className="text-xs text-slate-400 line-through mt-0.5">MRP ₹{retail}</div>
                    <div className="text-xs text-brand-green font-semibold mt-1">Contractor rate · Save ₹{retail - wholesale}</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-2xl font-bold text-slate-300 blur-sm select-none">₹{retail}</div>
                    <div className="text-xs text-brand-green mt-1 font-medium">Login to unlock contractor pricing</div>
                  </div>
                )}
              </div>

              <div className="mb-4 flex items-center gap-1 text-xs text-brand-green font-semibold">
                <span className="w-2 h-2 bg-brand-green rounded-full" /> In Stock · Ships 24–48 hrs
              </div>

              {isLoggedIn && (
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-slate-600 shrink-0">Qty:</span>
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-base transition-colors"
                    >−</button>
                    <span className="px-4 py-2 text-sm font-semibold text-slate-900 min-w-[3rem] text-center border-x border-slate-200">{qty}</span>
                    <button
                      onClick={() => setQty(q => q + 1)}
                      className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-base transition-colors"
                    >+</button>
                  </div>
                  <span className="text-xs text-slate-400">{product.unit}</span>
                </div>
              )}

              <div className="space-y-3">
                {isLoggedIn ? (
                  <button onClick={() => addToCart(product, qty, selectedVariant)} className="w-full btn-primary py-3 text-sm">
                    Add {qty > 1 ? `${qty} × ` : ''}to Cart
                  </button>
                ) : (
                  <button onClick={() => setShowLoginModal(true)} className="w-full btn-primary py-3 text-sm">
                    Login to Purchase
                  </button>
                )}
                <button className="w-full btn-secondary py-3 text-sm" onClick={() => setView('quick_order')}>
                  Get Quote for Bulk Order
                </button>
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">✓ BIS / ISI Certified</div>
                <div className="flex items-center gap-2">✓ GST Invoice included</div>
                <div className="flex items-center gap-2">✓ 24–48 hr delivery</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
