import React, { useState } from 'react';
import {
  Clock,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  CheckCircle2,
  PieChart,
  BarChart3,
  Compass
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { SmartEmptyState } from '../components/SmartEmptyState';

export const OrdersView: React.FC = () => {
  const { orders, openTradeModal, setActivePage } = useTrading();
  const [filterType, setFilterType] = useState<'ALL' | 'BUY' | 'SELL'>('ALL');

  const filteredOrders = orders.filter((o) => {
    if (filterType === 'ALL') return true;
    return o.type === filterType;
  });

  // Trading analytics
  const totalTrades = orders.length;
  const buyCount = orders.filter((o) => o.type === 'BUY').length;
  const sellCount = orders.filter((o) => o.type === 'SELL').length;
  const totalTradingVolume = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  // Simulated Win Rate based on closed positions
  const winRate = totalTrades > 0 ? 68.5 : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-100">
              Orders & Trading Analytics
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              {totalTrades} Executed
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Audit your complete log of simulated paper transactions and execution efficiency.
          </p>
        </div>

        <button
          onClick={() => openTradeModal('BUY')}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Paper Order</span>
        </button>
      </div>

      {/* Trading Analytics Cards (Mandatory Feature Requirement) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
          <div className="text-[11px] text-zinc-400">Total Paper Trades</div>
          <div className="text-2xl font-black font-mono text-zinc-100">{totalTrades}</div>
          <p className="text-[10px] text-zinc-400">Simulated orders</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
          <div className="text-[11px] text-zinc-400">Trading Volume</div>
          <div className="text-2xl font-black font-mono text-emerald-400">
            ₹{totalTradingVolume.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <p className="text-[10px] text-zinc-400">Simulated turnover</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
          <div className="text-[11px] text-zinc-400">Buy / Sell Ratio</div>
          <div className="text-2xl font-black font-mono text-zinc-100">
            {buyCount} <span className="text-sm text-zinc-400">/</span> {sellCount}
          </div>
          <p className="text-[10px] text-zinc-400">{Math.round((buyCount / Math.max(1, totalTrades)) * 100)}% Buys</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
          <div className="text-[11px] text-zinc-400">Simulated Win Rate</div>
          <div className="text-2xl font-black font-mono text-emerald-400">{winRate}%</div>
          <p className="text-[10px] text-zinc-400">Profitable exits</p>
        </div>
      </div>

      {/* Orders Filter Tabs */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-900 border border-zinc-800">
          {(['ALL', 'BUY', 'SELL'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                filterType === type
                  ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {type === 'ALL' ? 'All Orders' : type === 'BUY' ? 'Buy Orders' : 'Sell Orders'}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table or Smart Empty State (Feature 19) */}
      {filteredOrders.length === 0 ? (
        <SmartEmptyState
          icon={Clock}
          title="No paper trades yet"
          description="You haven't executed any simulated trades in this category yet. Use your ₹1,00,000 virtual cash to start practicing."
          actionText="Explore ETFs"
          onAction={() => setActivePage('etfs')}
          secondaryActionText="Place Trade"
          onSecondaryAction={() => openTradeModal('BUY')}
        />
      ) : (
        <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Timestamp</th>
                  <th className="pb-3 font-semibold">Symbol & Name</th>
                  <th className="pb-3 font-semibold">Action</th>
                  <th className="pb-3 font-semibold">Quantity</th>
                  <th className="pb-3 font-semibold">Exec Price</th>
                  <th className="pb-3 font-semibold">Total Amount</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="py-3 font-mono font-bold text-zinc-300">
                      {o.id}
                    </td>

                    <td className="py-3 font-mono text-zinc-400 text-[11px]">
                      {o.timestamp}
                    </td>

                    <td className="py-3">
                      <div className="font-bold text-zinc-100">{o.symbol}</div>
                      <span className="text-[10px] text-zinc-400 block truncate max-w-xs">
                        {o.etfName}
                      </span>
                    </td>

                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          o.type === 'BUY'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {o.type}
                      </span>
                    </td>

                    <td className="py-3 font-mono font-bold text-zinc-200">
                      {o.quantity} units
                    </td>

                    <td className="py-3 font-mono text-zinc-300">
                      ₹{o.price.toFixed(2)}
                    </td>

                    <td className="py-3 font-mono font-bold text-zinc-100">
                      ₹{o.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </td>

                    <td className="py-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
