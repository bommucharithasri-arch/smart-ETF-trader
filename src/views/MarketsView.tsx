import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { MarketHeatmap } from '../components/MarketHeatmap';
import { TopGainersLosers } from '../components/TopGainersLosers';
import { useTrading } from '../context/TradingContext';
import { MARKET_INDICES, MARKET_SECTORS, ETFS_DATA } from '../data/mockData';

export const MarketsView: React.FC = () => {
  const { openEtfDetails, openTradeModal } = useTrading();
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>('ALL');

  const filteredEtfs = selectedSectorFilter === 'ALL'
    ? ETFS_DATA
    : ETFS_DATA.filter((e) => e.sector.toUpperCase() === selectedSectorFilter.toUpperCase());

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-100">
              Markets & Sector Heatmap
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              LIVE SIMULATION
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Real-time sector breadth across all 10 tracked segments and top momentum drivers.
          </p>
        </div>

        <button
          onClick={() => openTradeModal('BUY')}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          + Quick Trade
        </button>
      </div>

      {/* Major Indices Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {MARKET_INDICES.map((idx) => {
          const isPos = idx.changePercent >= 0;
          return (
            <div
              key={idx.name}
              className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1"
            >
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span className="font-semibold">{idx.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <div className="text-lg font-bold font-mono text-zinc-100">
                {idx.value.toLocaleString('en-IN', { maximumFractionDigits: 1 })}
              </div>
              <div
                className={`text-[11px] font-mono font-bold flex items-center gap-0.5 ${
                  isPos ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isPos ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                <span>
                  {isPos ? '+' : ''}
                  {idx.changePercent}% ({isPos ? '+' : ''}{idx.change})
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature 2: Full Responsive Market Heatmap (10 Sectors) */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800">
          <div>
            <h3 className="font-bold text-base text-zinc-100">10-Sector Market Heatmap</h3>
            <p className="text-xs text-zinc-400">
              Hover over any sector box to inspect change percentage and tracked funds.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-emerald-600/40 border border-emerald-500/50"></span>
              <span>Bullish (&gt;0%)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-rose-600/40 border border-rose-500/50"></span>
              <span>Bearish (&lt;0%)</span>
            </span>
          </div>
        </div>

        <MarketHeatmap onSectorClick={(sec) => setSelectedSectorFilter(sec)} />
      </div>

      {/* Feature 9: Top Gainers & Top Losers */}
      <TopGainersLosers />

      {/* Sector ETFs Table & Filter */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
          <div>
            <h3 className="font-bold text-base text-zinc-100">Constituent ETFs by Sector</h3>
            <p className="text-xs text-zinc-400">Filter and view individual fund metrics.</p>
          </div>

          {/* Sector Filter Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Sector:</span>
            <select
              value={selectedSectorFilter}
              onChange={(e) => setSelectedSectorFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="ALL">All Sectors ({ETFS_DATA.length})</option>
              {MARKET_SECTORS.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} ({s.changePercent >= 0 ? '+' : ''}{s.changePercent}%)
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400">
                <th className="pb-3 font-semibold">ETF Symbol & Name</th>
                <th className="pb-3 font-semibold">Sector</th>
                <th className="pb-3 font-semibold">Market Price</th>
                <th className="pb-3 font-semibold">1-Day Change</th>
                <th className="pb-3 font-semibold">Expense Ratio</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {filteredEtfs.map((etf) => {
                const isPos = etf.changePercent1D >= 0;
                return (
                  <tr
                    key={etf.symbol}
                    className="group hover:bg-zinc-900/40 transition-colors cursor-pointer"
                    onClick={() => openEtfDetails(etf.symbol)}
                  >
                    <td className="py-3">
                      <div className="font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                        {etf.symbol}
                      </div>
                      <span className="text-[10px] text-zinc-400 font-normal truncate max-w-xs block">
                        {etf.name}
                      </span>
                    </td>

                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300">
                        {etf.sector}
                      </span>
                    </td>

                    <td className="py-3 font-mono font-bold text-zinc-200">
                      ₹{etf.price.toFixed(2)}
                    </td>

                    <td className="py-3 font-mono font-bold">
                      <span
                        className={`flex items-center gap-0.5 ${
                          isPos ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {isPos ? '+' : ''}
                        {etf.changePercent1D.toFixed(2)}%
                      </span>
                    </td>

                    <td className="py-3 font-mono text-zinc-400">
                      {etf.expenseRatio}%
                    </td>

                    <td className="py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => openTradeModal('BUY', etf.symbol)}
                        className="px-3 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer shadow-sm"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
