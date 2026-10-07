import React from 'react';
import { ShieldAlert, LogIn, X } from 'lucide-react';
import { useTrading } from '../context/TradingContext';

export const LoginRequiredModal: React.FC = () => {
  const { isLoginRequiredOpen, setIsLoginRequiredOpen, openAuthPage } = useTrading();

  if (!isLoginRequiredOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-sm rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 space-y-5 text-center animate-in zoom-in-95 duration-150">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-lg text-zinc-100">Login Required</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Please sign in to continue with paper trading, manage watchlists, and save your simulated orders.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => setIsLoginRequiredOpen(false)}
            className="py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setIsLoginRequiredOpen(false);
              openAuthPage('login');
            }}
            className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};
