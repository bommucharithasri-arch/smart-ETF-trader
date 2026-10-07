import React, { useState } from 'react';
import {
  Bookmark,
  Bell,
  BellRing,
  Trash2,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Compass,
  AlertCircle
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { SmartEmptyState } from '../components/SmartEmptyState';
import { ETFS_DATA } from '../data/mockData';

export const WatchlistView: React.FC = () => {
  const {
    watchlist,
    removeFromWatchlist,
    openTradeModal,
    openEtfDetails,
    setActivePage,
    showToast
  } = useTrading();

  const [editingAlertId, setEditingAlertId] = useState<string | null>(null);
  const [alertAbove, setAlertAbove] = useState<number>(0);
  const [alertBelow, setAlertBelow] = useState<number>(0);

  const handleOpenAlertModal = (item: any) => {
    setEditingAlertId(item.id);
    setAlertAbove(item.priceAlertAbove || Math.round(item.price * 1.05));
    setAlertBelow(item.priceAlertBelow || Math.round(item.price * 0.95));
  };

  const handleSaveAlert = () => {
    showToast('Price alert thresholds saved successfully.', 'success');
    setEditingAlertId(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-100">Tracking Watchlist</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              {watchlist.length} Items
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Monitor real-time prices, establish automated high/low alerts, and execute instant paper trades.
          </p>
        </div>

        <button
          onClick={() => setActivePage('etfs')}
          className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs transition-colors cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
        >
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>Discover More ETFs</span>
        </button>
      </div>

      {watchlist.length === 0 ? (
        <SmartEmptyState
          icon={Bookmark}
          title="Add ETFs to track them here"
          description="Your watchlist is currently empty. Explore the catalog and star ETFs like NIFTYBEES, ITBEES, or GOLDBEES to monitor price breakouts and receive AI alerts."
          actionText="Explore ETFs"
          onAction={() => setActivePage('etfs')}
        />
      ) : (
        <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="pb-3 font-semibold">ETF Symbol & Name</th>
                  <th className="pb-3 font-semibold">Market Price</th>
                  <th className="pb-3 font-semibold">1-Day Change</th>
                  <th className="pb-3 font-semibold">Price Alerts</th>
                  <th className="pb-3 font-semibold">AI Alerts</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {watchlist.map((item) => {
                  const isPos = item.changePercent >= 0;
                  return (
                    <tr
                      key={item.id}
                      className="group hover:bg-zinc-900/40 transition-colors cursor-pointer"
                      onClick={() => openEtfDetails(item.symbol)}
                    >
                      <td className="py-3.5">
                        <div className="font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                          {item.symbol}
                        </div>
                        <span className="text-[10px] text-zinc-400 font-normal truncate max-w-xs block">
                          {item.etfName}
                        </span>
                      </td>

                      <td className="py-3.5 font-mono font-bold text-zinc-100 text-sm">
                        ₹{item.price.toFixed(2)}
                      </td>

                      <td className="py-3.5 font-mono font-bold">
                        <span
                          className={`flex items-center gap-0.5 ${
                            isPos ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isPos ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                          <span>{isPos ? '+' : ''}{item.changePercent.toFixed(2)}%</span>
                        </span>
                      </td>

                      <td className="py-3.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleOpenAlertModal(item)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-zinc-100 transition-colors cursor-pointer"
                        >
                          <BellRing className="w-3 h-3 text-amber-400" />
                          <span>
                            {item.priceAlertAbove ? `>₹${item.priceAlertAbove}` : 'Set Alert'}
                          </span>
                        </button>
                      </td>

                      <td className="py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                            item.aiAlertsEnabled
                              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {item.aiAlertsEnabled ? 'Active' : 'Off'}
                        </span>
                      </td>

                      <td className="py-3.5 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => openTradeModal('BUY', item.symbol)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer shadow-sm"
                        >
                          Trade
                        </button>
                        <button
                          onClick={() => removeFromWatchlist(item.id)}
                          className="p-1.5 rounded-xl bg-zinc-900 hover:bg-rose-500/10 hover:text-rose-400 text-zinc-400 border border-zinc-800 transition-colors cursor-pointer"
                          title="Remove from Watchlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Price Alert Settings Modal */}
      {editingAlertId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 space-y-4">
            <h4 className="font-bold text-sm text-zinc-100 flex items-center gap-2">
              <BellRing className="w-4 h-4 text-amber-400" />
              <span>Configure Price Alerts</span>
            </h4>
            <p className="text-xs text-zinc-400">
              Receive simulated alerts when the market cross above or below these thresholds.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Alert if price goes ABOVE (₹)
                </label>
                <input
                  type="number"
                  value={alertAbove}
                  onChange={(e) => setAlertAbove(parseFloat(e.target.value) || 0)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Alert if price drops BELOW (₹)
                </label>
                <input
                  type="number"
                  value={alertBelow}
                  onChange={(e) => setAlertBelow(parseFloat(e.target.value) || 0)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingAlertId(null)}
                className="px-3.5 py-1.5 rounded-xl bg-zinc-800 text-zinc-300 font-semibold text-xs hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAlert}
                className="px-4 py-1.5 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs hover:bg-emerald-400 transition-colors cursor-pointer"
              >
                Save Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
