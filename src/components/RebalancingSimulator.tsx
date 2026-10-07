import React, { useState, useEffect } from 'react';
import { RefreshCw, AlertTriangle, CheckCircle2, RotateCcw, ShieldCheck, ArrowRightLeft } from 'lucide-react';
import { useTrading } from '../context/TradingContext';

export const RebalancingSimulator: React.FC = () => {
  const { holdings } = useTrading();

  // Compute total portfolio value
  const totalHoldingsValue = holdings.reduce((sum, h) => sum + h.quantity * h.currentPrice, 0);

  // Initial distribution based on actual holdings or defaults
  const initialAllocations = holdings.map((h) => {
    const curVal = h.quantity * h.currentPrice;
    const currentPercent = totalHoldingsValue > 0 ? (curVal / totalHoldingsValue) * 100 : 0;
    return {
      symbol: h.symbol,
      etfName: h.etfName,
      currentValue: curVal,
      currentPercent: Math.round(currentPercent),
      targetPercent: Math.round(currentPercent)
    };
  });

  // Fallback if user has no holdings yet
  const fallbackAllocations = [
    { symbol: 'NIFTYBEES', etfName: 'Nippon India ETF Nifty 50 BeES', currentValue: 30000, currentPercent: 45, targetPercent: 40 },
    { symbol: 'ITBEES', etfName: 'Nippon India ETF Nifty IT', currentValue: 20000, currentPercent: 30, targetPercent: 25 },
    { symbol: 'GOLDBEES', etfName: 'Nippon India ETF Gold BeES', currentValue: 10000, currentPercent: 15, targetPercent: 20 },
    { symbol: 'BANKBEES', etfName: 'Nippon India ETF Bank BeES', currentValue: 6666, currentPercent: 10, targetPercent: 15 }
  ];

  const [allocations, setAllocations] = useState(
    initialAllocations.length > 0 ? initialAllocations : fallbackAllocations
  );

  const [isCalculated, setIsCalculated] = useState(false);

  // Target sum validation
  const targetTotal = allocations.reduce((sum, a) => sum + (Number(a.targetPercent) || 0), 0);
  const isValid100 = targetTotal === 100;

  const handleTargetChange = (symbol: string, newTarget: number) => {
    setAllocations((prev) =>
      prev.map((item) =>
        item.symbol === symbol ? { ...item, targetPercent: isNaN(newTarget) ? 0 : newTarget } : item
      )
    );
    setIsCalculated(false);
  };

  const handleReset = () => {
    setAllocations(initialAllocations.length > 0 ? initialAllocations : fallbackAllocations);
    setIsCalculated(false);
  };

  const handleEqualWeight = () => {
    const count = allocations.length;
    if (count === 0) return;
    const baseWeight = Math.floor(100 / count);
    const remainder = 100 - baseWeight * count;

    setAllocations((prev) =>
      prev.map((item, idx) => ({
        ...item,
        targetPercent: baseWeight + (idx === 0 ? remainder : 0)
      }))
    );
    setIsCalculated(false);
  };

  const basePortfolioValue = totalHoldingsValue > 0 ? totalHoldingsValue : 66666;

  return (
    <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-base text-zinc-100">
              Portfolio Rebalancing Simulator
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold">
              Simulation Only
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Model target weight shifts without placing actual market orders.
          </p>
        </div>

        {/* Action button pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleEqualWeight}
            className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
          >
            Equal Weight
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Target Sum Banner */}
      <div
        className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between ${
          isValid100
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
        }`}
      >
        <div className="flex items-center gap-2">
          {isValid100 ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          )}
          <span>
            {isValid100
              ? 'Target allocation equals exactly 100%. Ready to simulate adjustment.'
              : `Total target allocation must equal exactly 100%. Currently: ${targetTotal}%.`}
          </span>
        </div>
        <span className="font-mono font-bold text-sm">{targetTotal}% / 100%</span>
      </div>

      {/* Allocation Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400">
              <th className="pb-3 font-semibold">ETF Symbol</th>
              <th className="pb-3 font-semibold">Current %</th>
              <th className="pb-3 font-semibold">Target %</th>
              <th className="pb-3 font-semibold">Difference</th>
              <th className="pb-3 font-semibold text-right">Estimated Adjustment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {allocations.map((item) => {
              const diff = Number(item.targetPercent) - item.currentPercent;
              const valueDiff = (diff / 100) * basePortfolioValue;
              const isPositive = diff > 0;
              const isZero = diff === 0;

              return (
                <tr key={item.symbol} className="group hover:bg-zinc-900/30 transition-colors">
                  <td className="py-3 font-bold text-zinc-100">
                    <div>{item.symbol}</div>
                    <span className="text-[10px] text-zinc-400 font-normal">{item.etfName}</span>
                  </td>

                  <td className="py-3 font-mono font-semibold text-zinc-300">
                    {item.currentPercent}%
                  </td>

                  <td className="py-3">
                    <div className="flex items-center gap-1.5 max-w-[100px]">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.targetPercent}
                        onChange={(e) => handleTargetChange(item.symbol, parseInt(e.target.value) || 0)}
                        className="w-16 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-center font-mono font-bold text-zinc-100 focus:outline-none focus:border-emerald-500"
                      />
                      <span className="text-zinc-400">%</span>
                    </div>
                  </td>

                  <td className="py-3 font-mono font-bold">
                    <span
                      className={
                        isZero
                          ? 'text-zinc-400'
                          : isPositive
                          ? 'text-emerald-400'
                          : 'text-rose-400'
                      }
                    >
                      {isPositive ? '+' : ''}
                      {diff}%
                    </span>
                  </td>

                  <td className="py-3 font-mono font-bold text-right">
                    <span
                      className={
                        isZero
                          ? 'text-zinc-400'
                          : isPositive
                          ? 'text-emerald-400'
                          : 'text-rose-400'
                      }
                    >
                      {isZero ? 'Hold' : isPositive ? `Buy ~₹${Math.abs(valueDiff).toLocaleString('en-IN', { maximumFractionDigits: 0 })}` : `Sell ~₹${Math.abs(valueDiff).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Simulated Results Banner (When calculated) */}
      {isCalculated && (
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 animate-in fade-in duration-150">
          <h5 className="font-bold text-xs text-zinc-200 flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
            <span>Rebalancing Execution Blueprint (Simulated)</span>
          </h5>
          <p className="text-xs text-zinc-400 leading-relaxed">
            To reach your desired target portfolio weights on total capital of ₹
            {basePortfolioValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}, you would need to:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {allocations.map((item) => {
              const diff = Number(item.targetPercent) - item.currentPercent;
              const val = (diff / 100) * basePortfolioValue;
              if (diff === 0) return null;
              return (
                <div key={item.symbol} className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between">
                  <span className="font-semibold text-zinc-300">{item.symbol}</span>
                  <span className={`font-mono font-bold ${diff > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {diff > 0 ? 'BUY' : 'SELL'} ₹{Math.abs(val).toLocaleString('en-IN', { maximumFractionDigits: 0 })} ({diff > 0 ? '+' : ''}{diff}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Disclaimer Banner (Required) */}
      <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            <strong>Simulation only</strong> — no actual trades or orders are executed.
          </span>
        </div>
        <button
          onClick={() => setIsCalculated(true)}
          disabled={!isValid100}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
        >
          Calculate Simulation
        </button>
      </div>
    </div>
  );
};
