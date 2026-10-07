import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Wallet
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { ETFS_DATA } from '../data/mockData';

export const TradeModal: React.FC = () => {
  const {
    isTradeModalOpen,
    tradeModalConfig,
    closeTradeModal,
    virtualCash,
    holdings,
    executePaperTrade,
    setActivePage
  } = useTrading();

  const [mode, setMode] = useState<'BUY' | 'SELL'>('BUY');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('NIFTYBEES');
  const [quantity, setQuantity] = useState<number>(10);
  const [step, setStep] = useState<'FORM' | 'REVIEW' | 'SUCCESS'>('FORM');
  const [completedOrderId, setCompletedOrderId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Sync modal config
  useEffect(() => {
    if (tradeModalConfig) {
      setMode(tradeModalConfig.mode);
      if (tradeModalConfig.symbol) {
        setSelectedSymbol(tradeModalConfig.symbol);
      }
      setQuantity(10);
      setStep('FORM');
      setValidationError(null);
    }
  }, [tradeModalConfig]);

  if (!isTradeModalOpen) return null;

  const currentEtf = ETFS_DATA.find((e) => e.symbol === selectedSymbol) || ETFS_DATA[0];
  const execPrice = currentEtf.price;
  const estimatedAmount = quantity * execPrice;

  // Available holdings for current ETF
  const currentHolding = holdings.find((h) => h.symbol === currentEtf.symbol);
  const availableHoldingsQty = currentHolding ? currentHolding.quantity : 0;

  // Validate Step 1
  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (quantity <= 0) {
      setValidationError('Please enter a valid quantity greater than 0.');
      return;
    }

    if (mode === 'BUY') {
      if (estimatedAmount > virtualCash) {
        setValidationError(
          `Insufficient virtual cash. Needed: ₹${estimatedAmount.toLocaleString('en-IN')}, Available: ₹${virtualCash.toLocaleString('en-IN')}`
        );
        return;
      }
    } else {
      // SELL
      if (quantity > availableHoldingsQty) {
        setValidationError(
          `You only own ${availableHoldingsQty} shares of ${currentEtf.symbol}. Cannot sell ${quantity}.`
        );
        return;
      }
    }

    setStep('REVIEW');
  };

  // Confirm order execution in Step 2
  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    setValidationError(null);

    const res = await executePaperTrade(currentEtf.symbol, mode, quantity, execPrice);
    setIsSubmitting(false);

    if (res.success && res.orderId) {
      setCompletedOrderId(res.orderId);
      setStep('SUCCESS');
    } else {
      setValidationError(res.error || 'Failed to place order.');
      setStep('FORM');
    }
  };

  const handleResetForNewTrade = () => {
    setStep('FORM');
    setQuantity(10);
    setValidationError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-zinc-100">
                  {step === 'REVIEW' ? 'Review Order' : step === 'SUCCESS' ? 'Order Success' : 'Place Paper Trade'}
                </h3>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  Simulation
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Virtual currency • Educational execution</p>
            </div>
          </div>
          <button
            onClick={closeTradeModal}
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {validationError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{validationError}</span>
            </div>
          )}

          {/* STEP 1: TRADE FORM */}
          {step === 'FORM' && (
            <form onSubmit={handleProceedToReview} className="space-y-5">
              {/* Buy / Sell Mode Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-zinc-950 border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setMode('BUY')}
                  className={`py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    mode === 'BUY'
                      ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  BUY (Long)
                </button>
                <button
                  type="button"
                  onClick={() => setMode('SELL')}
                  className={`py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    mode === 'SELL'
                      ? 'bg-rose-500 text-zinc-950 shadow-md shadow-rose-500/20'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  SELL (Exit)
                </button>
              </div>

              {/* ETF Selector */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Select ETF
                </label>
                <select
                  value={selectedSymbol}
                  onChange={(e) => setSelectedSymbol(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                >
                  {ETFS_DATA.map((etf) => (
                    <option key={etf.symbol} value={etf.symbol}>
                      {etf.symbol} — {etf.name} (₹{etf.price.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              {/* ETF Quick Snapshot Card */}
              <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-400">Current Market Price</div>
                  <div className="text-base font-bold text-zinc-100 font-mono">
                    ₹{execPrice.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-400">1-Day Change</div>
                  <div
                    className={`text-xs font-bold font-mono ${
                      currentEtf.changePercent1D >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {currentEtf.changePercent1D >= 0 ? '+' : ''}
                    {currentEtf.changePercent1D}% (₹{currentEtf.change1D})
                  </div>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Quantity (Units)</label>
                  <span className="text-[11px] text-zinc-400">
                    {mode === 'BUY'
                      ? `Max Affordable: ~${Math.floor(virtualCash / execPrice)} units`
                      : `Available in Portfolio: ${availableHoldingsQty} units`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 5))}
                    className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-300 font-bold hover:bg-zinc-700 transition-colors flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-3 text-center text-sm font-bold text-zinc-100 font-mono focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 5)}
                    className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-300 font-bold hover:bg-zinc-700 transition-colors flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Quick Add Pills */}
                <div className="flex items-center gap-2 mt-2">
                  {[10, 25, 50, 100].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setQuantity(preset)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border font-mono transition-colors cursor-pointer ${
                        quantity === preset
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      +{preset}
                    </button>
                  ))}
                  {mode === 'SELL' && availableHoldingsQty > 0 && (
                    <button
                      type="button"
                      onClick={() => setQuantity(availableHoldingsQty)}
                      className="text-[11px] px-2.5 py-1 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 font-semibold font-mono hover:bg-amber-500/20 cursor-pointer ml-auto"
                    >
                      Sell All ({availableHoldingsQty})
                    </button>
                  )}
                </div>
              </div>

              {/* Order Cost Summary */}
              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Estimated Total Amount</span>
                  <span className="font-mono font-bold text-zinc-100 text-sm">
                    ₹{estimatedAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400 border-t border-zinc-900 pt-2">
                  <span>Available Virtual Cash</span>
                  <span className="font-mono text-zinc-300">
                    ₹{virtualCash.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-3 rounded-2xl font-bold text-sm text-zinc-950 transition-all shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2 ${
                  mode === 'BUY'
                    ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20'
                    : 'bg-rose-500 hover:bg-rose-400 shadow-rose-500/20'
                }`}
              >
                <span>Review Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: REVIEW ORDER (Requirement 5) */}
          {step === 'REVIEW' && (
            <div className="space-y-5 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div>
                    <h4 className="font-bold text-base text-zinc-100">{currentEtf.symbol}</h4>
                    <p className="text-xs text-zinc-400">{currentEtf.name}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      mode === 'BUY'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {mode}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-zinc-400">Order Quantity</span>
                    <p className="font-bold text-zinc-200 text-sm font-mono">{quantity} units</p>
                  </div>
                  <div>
                    <span className="text-zinc-400">Market Price</span>
                    <p className="font-bold text-zinc-200 text-sm font-mono">₹{execPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-zinc-400">Estimated Amount</span>
                    <p className="font-bold text-emerald-400 text-base font-mono">
                      ₹{estimatedAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <span className="text-zinc-400">Available Cash</span>
                    <p className="font-bold text-zinc-300 text-sm font-mono">
                      ₹{virtualCash.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Safety notice */}
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-[11px] text-zinc-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  Paper trading simulation. Virtual money only — no real financial debit occurs.
                </span>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStep('FORM')}
                  disabled={isSubmitting}
                  className="py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting}
                  className={`py-2.5 rounded-xl font-bold text-xs text-zinc-950 transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                    mode === 'BUY'
                      ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20'
                      : 'bg-rose-500 hover:bg-rose-400 shadow-rose-500/20'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Executing...</span>
                  ) : (
                    <span>Confirm {mode}</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION */}
          {step === 'SUCCESS' && (
            <div className="text-center py-4 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-zinc-100">Order Placed Successfully</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Your simulated {mode} order for {quantity} {currentEtf.symbol} was filled instantly.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs font-mono max-w-xs mx-auto space-y-1">
                <div className="text-zinc-400 text-[10px] uppercase tracking-wider">Order ID</div>
                <div className="text-sm font-bold text-emerald-400">{completedOrderId}</div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    closeTradeModal();
                    setActivePage('orders');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  View Order
                </button>
                <button
                  type="button"
                  onClick={handleResetForNewTrade}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  Trade Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
