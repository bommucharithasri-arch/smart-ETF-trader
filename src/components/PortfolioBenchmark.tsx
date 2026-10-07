import React, { useState } from 'react';
import { TrendingUp, BarChart3, Info } from 'lucide-react';
import { BENCHMARK_COMPARISON } from '../data/mockData';

export const PortfolioBenchmark: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('YTD');
  const data = BENCHMARK_COMPARISON;

  return (
    <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-base text-zinc-100">Portfolio vs Market</h4>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              Benchmark
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Objective return comparison against standard broader market indices.
          </p>
        </div>

        {/* Timeframe pill selector */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800 self-start sm:self-auto">
          {data.timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
                selectedTimeframe === tf
                  ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Return Comparison Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* My Portfolio */}
        <div className="p-4 rounded-2xl bg-zinc-900/90 border border-emerald-500/30 space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>My Paper Portfolio</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400">
            +{data.portfolioReturn}%
          </div>
          <p className="text-[11px] text-zinc-400">Weighted asset performance</p>
        </div>

        {/* NIFTY 50 Benchmark */}
        <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>NIFTY 50 Index</span>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
          </div>
          <div className="text-2xl font-black font-mono text-blue-400">
            +{data.nifty50Return}%
          </div>
          <p className="text-[11px] text-zinc-400">Large-cap market benchmark</p>
        </div>

        {/* Gold Benchmark */}
        <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Gold (Domestic)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          </div>
          <div className="text-2xl font-black font-mono text-amber-400">
            +{data.goldReturn}%
          </div>
          <p className="text-[11px] text-zinc-400">Safe haven commodity benchmark</p>
        </div>
      </div>

      {/* Visual Relative Return Bar Chart */}
      <div className="space-y-4 pt-2">
        <div className="text-xs font-semibold text-zinc-300">
          Monthly Cumulative Progress ({selectedTimeframe})
        </div>

        {/* Bar chart representation */}
        <div className="h-48 flex items-end gap-2 sm:gap-4 pt-6 pb-2 px-2 bg-zinc-900/40 rounded-2xl border border-zinc-800/60 overflow-x-auto">
          {data.chartData.map((item) => {
            const maxVal = 14;
            const pHeight = (item.portfolio / maxVal) * 100;
            const nHeight = (item.nifty50 / maxVal) * 100;
            const gHeight = (item.gold / maxVal) * 100;

            return (
              <div key={item.period} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end min-w-[32px]">
                <div className="w-full flex items-end justify-center gap-1 h-32">
                  {/* Portfolio Bar */}
                  <div
                    style={{ height: `${pHeight}%` }}
                    className="w-2 sm:w-2.5 bg-emerald-400 rounded-t-sm transition-all duration-300 hover:brightness-125"
                    title={`Portfolio: +${item.portfolio}%`}
                  />
                  {/* NIFTY 50 Bar */}
                  <div
                    style={{ height: `${nHeight}%` }}
                    className="w-2 sm:w-2.5 bg-blue-400 rounded-t-sm transition-all duration-300 hover:brightness-125"
                    title={`NIFTY 50: +${item.nifty50}%`}
                  />
                  {/* Gold Bar */}
                  <div
                    style={{ height: `${gHeight}%` }}
                    className="w-2 sm:w-2.5 bg-amber-400 rounded-t-sm transition-all duration-300 hover:brightness-125"
                    title={`Gold: +${item.gold}%`}
                  />
                </div>
                <span className="text-[10px] font-mono text-zinc-400">{item.period}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-900">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-400"></span>
              <span className="text-zinc-300 font-medium">My Portfolio</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-blue-400"></span>
              <span className="text-zinc-300 font-medium">NIFTY 50</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-amber-400"></span>
              <span className="text-zinc-300 font-medium">Gold Spot</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-zinc-400 mt-2 sm:mt-0">
            <Info className="w-3.5 h-3.5" />
            <span>Comparison reflects objective historical simulation data.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
