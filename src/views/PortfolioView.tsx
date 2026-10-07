import React from 'react';
import {
  PieChart,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Sparkles,
  BarChart3,
  Compass,
  RotateCcw,
  HeartPulse
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { PortfolioBenchmark } from '../components/PortfolioBenchmark';
import { RebalancingSimulator } from '../components/RebalancingSimulator';
import { SmartEmptyState } from '../components/SmartEmptyState';
import { ETFS_DATA } from '../data/mockData';

export const PortfolioView: React.FC = () => {
  const {
    holdings,
    virtualCash,
    openTradeModal,
    openEtfDetails,
    setActivePage
  } = useTrading();

  const totalHoldingsValue = holdings.reduce((sum, h) => sum + h.quantity * h.currentPrice, 0);
  const totalInvested = holdings.reduce((sum, h) => sum + h.investedAmount, 0);
  const totalPnl = totalHoldingsValue - totalInvested;
  const totalPnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;
  const totalNetWorth = totalHoldingsValue + virtualCash;

  // Portfolio Health Score calculation
  // Factors: Diversification (multiple ETFs), Gold hedge presence, Cash buffer
  const hasGold = holdings.some((h) => h.symbol.includes('GOLD') || h.symbol.includes('SILVER'));
  const hasIndex = holdings.some((h) => h.symbol.includes('NIFTY') || h.symbol.includes('JUNIOR'));
  const positionCountScore = Math.min(30, holdings.length * 10);
  const hedgeScore = hasGold ? 25 : 10;
  const indexScore = hasIndex ? 25 : 10;
  const cashBufferScore = virtualCash > 10000 ? 20 : 10;
  const healthScore = Math.min(100, positionCountScore + hedgeScore + indexScore + cashBufferScore);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-100">
              Portfolio & Analytics
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              PAPER TRADING
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Real-time portfolio evaluation, asset class diversification, benchmark alpha, and rebalancing simulations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openTradeModal('BUY')}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Place Paper Trade</span>
          </button>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
          <div className="text-xs text-zinc-400">Total Portfolio Value</div>
          <div className="text-2xl font-black font-mono text-zinc-100">
            ₹{totalNetWorth.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <p className="text-[10px] text-zinc-400">
            Holdings + ₹{virtualCash.toLocaleString('en-IN')} Cash
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
          <div className="text-xs text-zinc-400">Total Invested Cost</div>
          <div className="text-2xl font-black font-mono text-zinc-300">
            ₹{totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <p className="text-[10px] text-zinc-400">Across {holdings.length} active positions</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
          <div className="text-xs text-zinc-400">Unrealized P&L</div>
          <div
            className={`text-2xl font-black font-mono ${
              totalPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {totalPnl >= 0 ? '+' : ''}₹{totalPnl.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <p
            className={`text-[10px] font-mono font-bold ${
              totalPnlPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {totalPnlPercent >= 0 ? '+' : ''}{totalPnlPercent.toFixed(2)}% ROI
          </p>
        </div>

        {/* Portfolio Health Score */}
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Portfolio Health</span>
            <HeartPulse className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400">
            {healthScore} <span className="text-xs text-zinc-400 font-normal">/ 100</span>
          </div>
          <p className="text-[10px] text-zinc-400">
            {healthScore >= 80 ? 'Optimal Asset Diversification' : 'Moderate Balance — Consider Gold hedge'}
          </p>
        </div>
      </div>

      {/* Active Holdings Table */}
      {holdings.length === 0 ? (
        <SmartEmptyState
          icon={PieChart}
          title="Your portfolio is currently empty"
          description="You haven't bought any ETFs yet. Use your ₹1,00,000 virtual balance to make your first trade."
          actionText="Explore ETFs"
          onAction={() => setActivePage('etfs')}
        />
      ) : (
        <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <h3 className="font-bold text-base text-zinc-100">Holdings Inventory</h3>
              <p className="text-xs text-zinc-400">Breakdown of active units and performance</p>
            </div>
            <span className="text-xs font-mono text-zinc-400 font-semibold">
              {holdings.length} Assets
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="pb-3 font-semibold">Asset Symbol & Name</th>
                  <th className="pb-3 font-semibold">Quantity</th>
                  <th className="pb-3 font-semibold">Avg Buy</th>
                  <th className="pb-3 font-semibold">Market NAV</th>
                  <th className="pb-3 font-semibold">Invested Value</th>
                  <th className="pb-3 font-semibold">Current Value</th>
                  <th className="pb-3 font-semibold">Total P&L</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {holdings.map((h) => {
                  const isPos = h.totalPnl >= 0;
                  return (
                    <tr
                      key={h.symbol}
                      className="group hover:bg-zinc-900/40 transition-colors cursor-pointer"
                      onClick={() => openEtfDetails(h.symbol)}
                    >
                      <td className="py-3.5">
                        <div className="font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                          {h.symbol}
                        </div>
                        <span className="text-[10px] text-zinc-400 font-normal truncate max-w-xs block">
                          {h.etfName}
                        </span>
                      </td>

                      <td className="py-3.5 font-mono font-bold text-zinc-200">
                        {h.quantity} units
                      </td>

                      <td className="py-3.5 font-mono text-zinc-400">
                        ₹{h.avgBuyPrice.toFixed(2)}
                      </td>

                      <td className="py-3.5 font-mono font-bold text-zinc-200">
                        ₹{h.currentPrice.toFixed(2)}
                      </td>

                      <td className="py-3.5 font-mono text-zinc-400">
                        ₹{h.investedAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </td>

                      <td className="py-3.5 font-mono font-bold text-zinc-100">
                        ₹{h.currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </td>

                      <td className="py-3.5 font-mono font-bold">
                        <div className={isPos ? 'text-emerald-400' : 'text-rose-400'}>
                          {isPos ? '+' : ''}₹{h.totalPnl.toFixed(0)}
                        </div>
                        <div
                          className={`text-[10px] ${
                            isPos ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isPos ? '+' : ''}{h.totalPnlPercent.toFixed(2)}%
                        </div>
                      </td>

                      <td className="py-3.5 text-right space-x-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => openTradeModal('BUY', h.symbol)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-[11px] transition-colors cursor-pointer"
                        >
                          Buy
                        </button>
                        <button
                          onClick={() => openTradeModal('SELL', h.symbol)}
                          className="px-2.5 py-1 rounded-lg bg-rose-500 hover:bg-rose-400 text-zinc-950 font-bold text-[11px] transition-colors cursor-pointer"
                        >
                          Sell
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Feature 6: Portfolio Benchmark vs Market (NIFTY 50 & Gold) */}
      <PortfolioBenchmark />

      {/* Feature 7: Portfolio Rebalancing Simulator */}
      <RebalancingSimulator />
    </div>
  );
};
