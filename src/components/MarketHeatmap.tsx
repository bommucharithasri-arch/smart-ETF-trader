import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Layers, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MARKET_SECTORS } from '../data/mockData';
import { MarketSector } from '../types';

interface MarketHeatmapProps {
  onSectorClick?: (sectorName: string) => void;
}

export const MarketHeatmap: React.FC<MarketHeatmapProps> = ({ onSectorClick }) => {
  const [hoveredSector, setHoveredSector] = useState<MarketSector | null>(null);

  // Helper to get color intensity based on percentage
  const getBoxStyle = (change: number) => {
    if (change > 2.0) {
      return 'bg-emerald-600/30 border-emerald-500/50 hover:bg-emerald-600/40 text-emerald-300';
    }
    if (change > 0) {
      return 'bg-emerald-700/20 border-emerald-600/30 hover:bg-emerald-700/30 text-emerald-400';
    }
    if (change < -1.0) {
      return 'bg-rose-600/30 border-rose-500/50 hover:bg-rose-600/40 text-rose-300';
    }
    return 'bg-rose-700/20 border-rose-600/30 hover:bg-rose-700/30 text-rose-400';
  };

  return (
    <div className="relative">
      {/* Heatmap Grid (2 cols on small, 3 on md, 5 on lg) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {MARKET_SECTORS.map((sector) => {
          const isPositive = sector.changePercent >= 0;
          return (
            <div
              key={sector.name}
              onMouseEnter={() => setHoveredSector(sector)}
              onMouseLeave={() => setHoveredSector(null)}
              onClick={() => onSectorClick?.(sector.name)}
              className={`relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[110px] group shadow-sm ${getBoxStyle(
                sector.changePercent
              )}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs sm:text-sm text-zinc-100 tracking-wide">
                  {sector.name}
                </span>
                <span className="p-1 rounded-lg bg-zinc-950/40 text-current">
                  {isPositive ? (
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  )}
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg sm:text-xl font-black font-mono">
                    {isPositive ? '+' : ''}
                    {sector.changePercent.toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-1">
                  <span>Top: {sector.topEtf}</span>
                  <span className="text-[10px] opacity-80">{sector.trackedEtfsCount} ETFs</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Rich Tooltip */}
      {hoveredSector && (
        <div className="mt-3 p-3.5 rounded-2xl bg-zinc-900 border border-zinc-700 shadow-xl flex items-center justify-between animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                hoveredSector.changePercent >= 0
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              {hoveredSector.changePercent >= 0 ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h5 className="font-bold text-sm text-zinc-100">{hoveredSector.name} Sector</h5>
                <span
                  className={`text-xs font-mono font-bold ${
                    hoveredSector.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {hoveredSector.changePercent >= 0 ? '+' : ''}
                  {hoveredSector.changePercent.toFixed(2)}%
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-snug">{hoveredSector.description}</p>
            </div>
          </div>

          <div className="text-right pl-4 border-l border-zinc-800 hidden sm:block">
            <div className="text-[11px] text-zinc-400">Tracked ETFs</div>
            <div className="text-sm font-bold font-mono text-zinc-200">
              {hoveredSector.trackedEtfsCount} funds
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
