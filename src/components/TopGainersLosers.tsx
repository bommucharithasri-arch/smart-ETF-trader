import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Compass } from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { ETFS_DATA } from '../data/mockData';

export const TopGainersLosers: React.FC = () => {
  const { openEtfDetails } = useTrading();

  // Sort ETFs dynamically by 1-day change percent
  const sorted = [...ETFS_DATA].sort((a, b) => b.changePercent1D - a.changePercent1D);
  const gainers = sorted.filter((e) => e.changePercent1D > 0).slice(0, 4);
  const losers = [...sorted].reverse().filter((e) => e.changePercent1D < 0).slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Top Gainers */}
      <div className="p-5 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-zinc-100">Top Gainers</h4>
              <p className="text-[11px] text-zinc-400">Leading ETF price momentum</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            1-Day
          </span>
        </div>

        <div className="space-y-2">
          {gainers.map((etf) => (
            <button
              key={etf.symbol}
              onClick={() => openEtfDetails(etf.symbol)}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-emerald-500/30 transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs font-mono">
                  {etf.symbol.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-zinc-100 group-hover:text-emerald-400 transition-colors">
                      {etf.symbol}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">({etf.sector})</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate max-w-[140px] sm:max-w-[180px]">
                    {etf.name}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono font-bold text-xs text-zinc-100">
                  ₹{etf.price.toFixed(2)}
                </div>
                <div className="flex items-center justify-end gap-0.5 text-xs font-mono font-bold text-emerald-400">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+{etf.changePercent1D.toFixed(2)}%</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Top Losers */}
      <div className="p-5 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <TrendingDown className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-zinc-100">Top Losers</h4>
              <p className="text-[11px] text-zinc-400">Sectoral corrections & pullbacks</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
            1-Day
          </span>
        </div>

        <div className="space-y-2">
          {losers.map((etf) => (
            <button
              key={etf.symbol}
              onClick={() => openEtfDetails(etf.symbol)}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-rose-500/30 transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-xs font-mono">
                  {etf.symbol.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-zinc-100 group-hover:text-rose-400 transition-colors">
                      {etf.symbol}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">({etf.sector})</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate max-w-[140px] sm:max-w-[180px]">
                    {etf.name}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono font-bold text-xs text-zinc-100">
                  ₹{etf.price.toFixed(2)}
                </div>
                <div className="flex items-center justify-end gap-0.5 text-xs font-mono font-bold text-rose-400">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  <span>{etf.changePercent1D.toFixed(2)}%</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
