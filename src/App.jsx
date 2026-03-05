import React, { useState, useEffect } from 'react';
import { X, Save, Loader2, Minus, Plus } from 'lucide-react';

import { MOCK_DB_PRODUCTS, BASE_LME_COPPER_USD, USD_TO_INR } from './data/constants';
import { fetchProducts } from './supabase-config';

import Navbar from './components/Navbar';
import { Sidebar, MobileDrawer } from './components/Sidebar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import VoltChatbot from './components/VoltChatbot';
import ComparisonWidget from './components/ComparisonWidget';

import HomePage from './components/HomePage';
import AllProductsPage from './components/AllProductsPage';
import MarketHub from './components/MarketHub';
import ProductDetailPage from './components/ProductDetailPage';
import SmartPlanner from './components/SmartPlanner';
import QuickOrder from './components/QuickOrder';
import ProfilePage from './components/ProfilePage';
import AdminDashboard from './components/AdminDashboard';
import AboutUs from './components/AboutUs';

const App = () => {
  // Navigation
  const [view, setView] = useState('home');
  const [activeProductId, setActiveProductId] = useState(null);

  // Data
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cart
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // UI
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [loginStep, setLoginStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Compare
  const [compareList, setCompareList] = useState([]);

  // Saved data
  const [savedProjects, setSavedProjects] = useState([
    { id: 1, name: 'Dwarka Sector 21 Site', date: '10 Jan 2025', items: 12 },
    { id: 2, name: 'Gurgaon Villa Wiring', date: '22 Feb 2025', items: 5 },
  ]);
  const [addresses, setAddresses] = useState([
    { id: 1, name: 'Main Warehouse', text: 'Plot 45, Udyog Vihar, Gurgaon, HR', type: 'Default' },
    { id: 2, name: 'Site Office', text: 'B-Block Construction Gate, Noida Sec 62, UP', type: 'Site' },
  ]);

  // LME pricing
  const [lmeUsd, setLmeUsd] = useState(BASE_LME_COPPER_USD);
  const [lmeInrKg, setLmeInrKg] = useState((BASE_LME_COPPER_USD * USD_TO_INR) / 1000);

  // --- Load Products ---
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const dbProducts = await fetchProducts();
        if (dbProducts && dbProducts.length > 0) {
          setProducts(dbProducts);
        } else {
          console.log('Supabase not configured or empty — using demo data.');
          setProducts(MOCK_DB_PRODUCTS);
        }
      } catch (e) {
        console.log('Running in demo mode:', e.message);
        setProducts(MOCK_DB_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // --- Persist auth across refresh ---
  useEffect(() => {
    try {
      const saved = localStorage.getItem('energon_auth');
      if (saved) {
        const { isLoggedIn: li, userRole: ur, mobileNumber: mn } = JSON.parse(saved);
        if (li) { setIsLoggedIn(li); setUserRole(ur || 'user'); setMobileNumber(mn || ''); }
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      if (isLoggedIn) {
        localStorage.setItem('energon_auth', JSON.stringify({ isLoggedIn, userRole, mobileNumber }));
      } else {
        localStorage.removeItem('energon_auth');
      }
    } catch { /* ignore */ }
  }, [isLoggedIn, userRole, mobileNumber]);

  // --- Persist cart across refresh ---
  useEffect(() => {
    try {
      const saved = localStorage.getItem('energon_cart');
      if (saved) setCart(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('energon_cart', JSON.stringify(cart));
    } catch { /* ignore */ }
  }, [cart]);

  // --- LME price simulation ---
  useEffect(() => {
    const interval = setInterval(() => {
      setLmeUsd(prev => {
        const fluctuation = (Math.random() - 0.5) * 50;
        const newUsd = Math.max(11000, prev + fluctuation);
        setLmeInrKg((newUsd * USD_TO_INR) / 1000);
        return newUsd;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // --- Pricing ---
  const getPrice = (product, type = 'wholesale', variant = null) => {
    if (!product) return 0;
    const modifier = variant?.modifier || 1;
    if (product.isDynamic) {
      const copperWeight = (product.copperWeightKg || 0) * modifier;
      const baseMfg = (product.baseMfgCost || 0) * modifier;
      const copperCost = copperWeight * lmeInrKg;
      const markup = type === 'wholesale' ? (product.wholesaleMarkup || 1.1) : (product.retailMarkup || 1.3);
      return Math.ceil((baseMfg + copperCost) * markup);
    }
    // Fixed-price products: compute from baseMfgCost × markup
    const base = (product.baseMfgCost || 0) * modifier;
    const markup = type === 'wholesale' ? (product.wholesaleMarkup || 1.2) : (product.retailMarkup || 1.4);
    return Math.ceil(base * markup);
  };

  // --- Cart ---
  const addToCart = (product, qty = 1, variant = null) => {
    const currentPrice = getPrice(product, isLoggedIn ? 'wholesale' : 'retail', variant);
    const cartItemId = variant ? `${product.id}-${variant.id}` : product.id;
    const name = variant ? `${product.name} (${variant.name})` : product.name;
    setCart(prev => {
      const existing = prev.find(item => item.cartId === cartItemId);
      if (existing) {
        return prev.map(item => item.cartId === cartItemId ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { ...product, cartId: cartItemId, name, qty, frozenPrice: currentPrice, variant }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateCartQty = (cartId, newQty) => {
    if (newQty < 1) { removeFromCart(cartId); return; }
    setCart(prev => prev.map(item => item.cartId === cartId ? { ...item, qty: newQty } : item));
  };

  const cartTotalQty = cart.reduce((a, b) => a + b.qty, 0);

  // --- Reviews ---
  const addReview = (productId, reviewData) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      const newReviews = [...(p.reviews || []), reviewData];
      const totalStars = newReviews.reduce((sum, r) => sum + r.rating, 0);
      return { ...p, reviews: newReviews, reviewCount: newReviews.length, rating: totalStars / newReviews.length };
    }));
  };

  // --- Auth ---
  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setTimeout(() => {
      setIsAuthLoading(false);
      if (loginStep === 1) {
        if (mobileNumber.length === 10) setLoginStep(2);
        else alert('Please enter a valid 10-digit number');
      } else {
        if (otp.length === 4) {
          setIsLoggedIn(true);
          setShowLoginModal(false);
          setLoginStep(1);
          setOtp('');
          setUserRole(mobileNumber === '9999999999' ? 'admin' : 'user');
        } else {
          alert('Invalid OTP (any 4 digits work in demo)');
        }
      }
    }, 1200);
  };

  // --- Search ---
  const performSearch = (query) => {
    setSearchQuery(query);
    setView('all_products');
  };

  // --- Save project ---
  const saveProject = () => {
    if (cart.length === 0) return alert('Cart is empty!');
    const name = prompt('Enter Project Name:');
    if (name) {
      setSavedProjects(prev => [...prev, { id: Date.now(), name, date: 'Just now', items: cart.length }]);
      alert('Project saved!');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
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
        cartTotalQty={cartTotalQty}
        setIsCartOpen={setIsCartOpen}
        setIsLoggedIn={setIsLoggedIn}
        products={products}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} setView={setView} view={view} isLoggedIn={isLoggedIn} userRole={userRole} />
        <MobileDrawer isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} setView={setView} view={view} isLoggedIn={isLoggedIn} userRole={userRole} />

        <main className="flex-1 overflow-y-auto relative">
          {showLoginModal && (
            <AuthModal
              handleLogin={handleLogin}
              loginStep={loginStep}
              mobileNumber={mobileNumber}
              setMobileNumber={setMobileNumber}
              otp={otp}
              setOtp={setOtp}
              isAuthLoading={isAuthLoading}
              setShowLoginModal={setShowLoginModal}
            />
          )}

          <div className="min-h-full flex flex-col">
            <div className="flex-grow">
              {view === 'home' && (
                <HomePage
                  setView={setView}
                  products={products}
                  loading={loading}
                  getPrice={getPrice}
                  isLoggedIn={isLoggedIn}
                  setActiveProductId={setActiveProductId}
                  lmeUsd={lmeUsd}
                  performSearch={performSearch}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  compareList={compareList}
                  setCompareList={setCompareList}
                  setShowLoginModal={setShowLoginModal}
                />
              )}
              {view === 'all_products' && (
                <AllProductsPage
                  products={products}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  setView={setView}
                  getPrice={getPrice}
                  isLoggedIn={isLoggedIn}
                  setActiveProductId={setActiveProductId}
                  compareList={compareList}
                  setCompareList={setCompareList}
                />
              )}
              {view === 'market_hub' && <MarketHub lmeUsd={lmeUsd} lmeInrKg={lmeInrKg} />}
              {view === 'product_detail' && (
                <ProductDetailPage
                  product={products.find(p => p.id === activeProductId)}
                  getPrice={getPrice}
                  isLoggedIn={isLoggedIn}
                  addToCart={addToCart}
                  setShowLoginModal={setShowLoginModal}
                  setView={setView}
                  setActiveProductId={setActiveProductId}
                  products={products}
                  lmeUsd={lmeUsd}
                  addReview={addReview}
                />
              )}
              {view === 'profile' && (
                <ProfilePage
                  savedProjects={savedProjects}
                  addresses={addresses}
                  setAddresses={setAddresses}
                  setView={setView}
                  userPhone={mobileNumber}
                />
              )}
              {view === 'admin_dashboard' && <AdminDashboard products={products} />}
              {view === 'about_us' && <AboutUs />}
              {view === 'quick_order' && (
                <QuickOrder
                  setCart={setCart}
                  setIsCartOpen={setIsCartOpen}
                  products={products}
                  getPrice={getPrice}
                />
              )}
              {view === 'smart_planner' && <SmartPlanner products={products} addToCart={addToCart} />}
            </div>
            <Footer setView={setView} />
          </div>
        </main>
      </div>

      {/* Floating widgets */}
      <VoltChatbot products={products} />
      <ComparisonWidget compareList={compareList} products={products} setCompareList={setCompareList} />

      {/* Cart drawer */}
      <div className={`fixed inset-0 z-[60] transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsCartOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-slate-900">Cart ({cartTotalQty} item{cartTotalQty !== 1 ? 's' : ''})</h3>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {cart.length === 0 ? (
              <div className="text-center text-slate-400 mt-16">
                <p>Your cart is empty</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartId} className="flex gap-3 border-b border-slate-100 pb-4">
                  <img
                    src={item.images?.[0] || ''}
                    className="w-14 h-14 object-contain border border-slate-200 rounded-lg bg-slate-50 p-1 shrink-0"
                    alt=""
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-slate-800 line-clamp-2">{item.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">₹{item.frozenPrice}/{item.unit || 'unit'}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateCartQty(item.cartId, item.qty - 1)}
                        className="w-7 h-7 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateCartQty(item.cartId, item.qty + 1)}
                        className="w-7 h-7 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-slate-300 hover:text-red-400 transition-colors p-1"
                    >
                      <X size={14} />
                    </button>
                    <div className="font-bold text-slate-900 text-sm">₹{(item.frozenPrice * item.qty).toLocaleString()}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-4 border-t border-slate-200 space-y-3 bg-slate-50">
              <div className="flex justify-between font-bold text-lg text-slate-900">
                <span>Total</span>
                <span>₹{cart.reduce((a, b) => a + (b.frozenPrice * b.qty), 0).toLocaleString()}</span>
              </div>
              <button
                onClick={saveProject}
                className="w-full flex items-center justify-center gap-2 border border-slate-300 text-slate-700 py-2.5 rounded-lg font-semibold hover:bg-white transition-colors text-sm"
              >
                <Save size={15} /> Save as Project
              </button>
              <button
                className="w-full btn-primary py-3 text-sm"
                onClick={() => {
                  if (!isLoggedIn) { setIsCartOpen(false); setShowLoginModal(true); return; }
                  alert(`Order placed! Total: ₹${cart.reduce((a, b) => a + (b.frozenPrice * b.qty), 0).toLocaleString()}\n\nOur team will confirm your order within 2 hours.`);
                  setCart([]);
                  setIsCartOpen(false);
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
