import React from 'react';
import {
  TrendingUp,
  Wallet,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Bot,
  Compass,
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { MarketHeatmap } from '../components/MarketHeatmap';
import { TopGainersLosers } from '../components/TopGainersLosers';
import { RecentActivityTimeline } from '../components/RecentActivityTimeline';
import { RecentlyViewedBar } from '../components/RecentlyViewedBar';
import { ETFS_DATA, MARKET_INDICES } from '../data/mockData';

export const DashboardView: React.FC = () => {
  const {
    virtualCash,
    holdings,
    openTradeModal,
    setActivePage,
    openEtfDetails,
    setIsAiDrawerOpen
  } = useTrading();

  // Aggregate portfolio numbers
  const totalHoldingsValue = holdings.reduce((sum, h) => sum + h.quantity * h.currentPrice, 0);
  const totalInvested = holdings.reduce((sum, h) => sum + h.investedAmount, 0);
  const totalPnl = totalHoldingsValue - totalInvested;
  const totalPnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;
  const totalNetWorth = totalHoldingsValue + virtualCash;
  const dayPnl = holdings.reduce((sum, h) => {
    const etf = ETFS_DATA.find((e) => e.symbol === h.symbol);
    return sum + (etf ? h.quantity * etf.change1D : 0);
  }, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Paper Trading Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-xs uppercase tracking-wider text-emerald-400 font-mono">
              🟢 PAPER TRADING ACTIVE
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
              SIMULATED PORTFOLIO
            </span>
          </div>
          <h2 className="text-xl font-black text-zinc-100">Welcome to your ETF Command Center</h2>
          <p className="text-xs text-zinc-400">
            Practice strategic asset allocation and paper-trade Indian ETFs with zero risk.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openTradeModal('BUY')}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Place Paper Trade (B)</span>
          </button>
          <button
            onClick={() => setIsAiDrawerOpen(true)}
            className="px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs transition-all border border-zinc-700/60 cursor-pointer flex items-center gap-1.5"
          >
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>Ask AI</span>
          </button>
        </div>
      </div>

      {/* Recently Viewed ETFs Bar (Feature 11) */}
      <RecentlyViewedBar />

      {/* Portfolio Quick Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Total Net Worth */}
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Total Simulated Capital</span>
            <Wallet className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-zinc-100">
            ₹{totalNetWorth.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-[11px] text-zinc-400 flex items-center gap-1">
            <span>Holdings: ₹{totalHoldingsValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
          </div>
        </div>

        {/* Virtual Cash */}
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Virtual Cash Available</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
            ₹{virtualCash.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-[11px] text-zinc-400">
            Liquid margin ready to deploy
          </div>
        </div>

        {/* Total Overall P&L */}
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Total Unrealized P&L</span>
            {totalPnl >= 0 ? (
              <ArrowUpRight className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-rose-400 stroke-[2.5]" />
            )}
          </div>
          <div
            className={`text-xl sm:text-2xl font-black font-mono ${
              totalPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {totalPnl >= 0 ? '+' : ''}₹{totalPnl.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <div
            className={`text-[11px] font-mono font-semibold ${
              totalPnlPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {totalPnlPercent >= 0 ? '+' : ''}{totalPnlPercent.toFixed(2)}% Return
          </div>
        </div>

        {/* 1-Day P&L */}
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Today's Market P&L</span>
            <Clock className="w-4 h-4 text-zinc-400" />
          </div>
          <div
            className={`text-xl sm:text-2xl font-black font-mono ${
              dayPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {dayPnl >= 0 ? '+' : ''}₹{dayPnl.toFixed(0)}
          </div>
          <div className="text-[11px] text-zinc-400">Intraday movement</div>
        </div>
      </div>

      {/* Market Heatmap Preview (Feature 2) */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-zinc-100">Market Heatmap Snapshot</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                10 Sectors
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Real-time sector performance overview across all tracked segments.
            </p>
          </div>
          <button
            onClick={() => setActivePage('markets')}
            className="text-xs text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
          >
            <span>Full Heatmap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <MarketHeatmap onSectorClick={() => setActivePage('markets')} />
      </div>

      {/* Top Gainers & Losers (Feature 9) */}
      <TopGainersLosers />

      {/* Two Column Layout: Recent Activity (Feature 10) & Portfolio Quick Holdings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Activity Timeline (Col 6) */}
        <div className="lg:col-span-6">
          <RecentActivityTimeline />
        </div>

        {/* Portfolio Holdings Summary (Col 6) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
              <div>
                <h4 className="font-bold text-sm text-zinc-100">Active Positions</h4>
                <p className="text-[11px] text-zinc-400">{holdings.length} ETF holdings in simulator</p>
              </div>
              <button
                onClick={() => setActivePage('portfolio')}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
              >
                <span>View Portfolio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {holdings.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-400">
                  No active holdings yet. Start paper trading to build your portfolio!
                </div>
              ) : (
                holdings.map((h) => (
                  <div
                    key={h.symbol}
                    className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between hover:bg-zinc-900 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEtfDetails(h.symbol)}
                          className="font-bold text-xs text-zinc-100 hover:text-emerald-400 transition-colors cursor-pointer"
                        >
                          {h.symbol}
                        </button>
                        <span className="text-[10px] text-zinc-400 font-mono">
                          {h.quantity} units
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        Avg: ₹{h.avgBuyPrice.toFixed(2)} • Now: ₹{h.currentPrice.toFixed(2)}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-zinc-200">
                        ₹{h.currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </div>
                      <div
                        className={`text-[11px] font-mono font-semibold ${
                          h.totalPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {h.totalPnl >= 0 ? '+' : ''}₹{h.totalPnl.toFixed(0)} ({h.totalPnlPercent.toFixed(1)}%)
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
            <button
              onClick={() => setActivePage('portfolio')}
              className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              Analyze Rebalancing Simulator →
            </button>
            <button
              onClick={() => openTradeModal('BUY')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
            >
              + Buy More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
