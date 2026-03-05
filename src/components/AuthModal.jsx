import React from 'react';
import { X, Loader2 } from 'lucide-react';

const AuthModal = ({ handleLogin, loginStep, mobileNumber, setMobileNumber, otp, setOtp, isAuthLoading, setShowLoginModal }) => (
  <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div className="bg-white rounded-2xl w-full max-w-sm p-8 shadow-2xl relative overflow-hidden">
      {isAuthLoading && (
        <div className="absolute inset-0 bg-white/90 z-20 flex items-center justify-center flex-col gap-3">
          <Loader2 size={36} className="text-brand-green animate-spin" />
          <p className="text-sm font-semibold text-slate-500">Verifying...</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-7">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            {loginStep === 1 ? 'Login to Energon' : 'Verify OTP'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {loginStep === 1 ? 'Enter your mobile number to continue' : `Code sent to +91 ${mobileNumber}`}
          </p>
        </div>
        <button onClick={() => setShowLoginModal(false)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        {loginStep === 1 ? (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Mobile Number</label>
              <div className="flex border border-slate-200 rounded-lg overflow-hidden focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green/20 transition-all">
                <span className="bg-slate-50 text-slate-500 px-4 py-3 font-semibold text-sm border-r border-slate-200">+91</span>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-transparent outline-none font-medium text-slate-800"
                  placeholder="98765 43210"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  autoFocus
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-brand-green text-white py-3.5 rounded-lg font-semibold hover:bg-brand-green-mid transition-colors shadow-sm">
              Send OTP
            </button>
          </>
        ) : (
          <>
            <div>
              <input
                type="text"
                className="w-full px-4 py-4 border border-slate-200 rounded-lg text-center text-3xl tracking-[1em] font-bold outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all text-slate-800"
                placeholder="0000"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                autoFocus
              />
            </div>
            <button type="submit" className="w-full bg-brand-green text-white py-3.5 rounded-lg font-semibold hover:bg-brand-green-mid transition-colors shadow-sm">
              Verify & Login
            </button>
          </>
        )}
      </form>

      <div className="mt-5 text-center text-xs text-slate-400 bg-slate-50 py-2 px-4 rounded-lg">
        Demo admin: <b className="text-slate-600">9999999999</b> · any 4-digit OTP
      </div>
    </div>
  </div>
);

export default AuthModal;
