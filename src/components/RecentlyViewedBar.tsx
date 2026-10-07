import React from 'react';
import { Clock, ArrowUpRight, ArrowDownRight, Compass } from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { ETFS_DATA } from '../data/mockData';

export const RecentlyViewedBar: React.FC = () => {
  const { recentlyViewed, openEtfDetails } = useTrading();

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80">
      <div className="flex items-center gap-2 text-zinc-400 flex-shrink-0">
        <Clock className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-xs font-semibold text-zinc-300">Recently Viewed:</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {recentlyViewed.map((symbol) => {
          const etf = ETFS_DATA.find((e) => e.symbol === symbol);
          if (!etf) return null;
          const isPos = etf.changePercent1D >= 0;

          return (
            <button
              key={symbol}
              onClick={() => openEtfDetails(symbol)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-emerald-500/40 text-xs font-medium transition-all group flex-shrink-0 cursor-pointer shadow-sm"
            >
              <span className="font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">
                {symbol}
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                ₹{etf.price.toFixed(1)}
              </span>
              <span
                className={`text-[10px] font-mono font-bold flex items-center ${
                  isPos ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isPos ? '+' : ''}
                {etf.changePercent1D}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
