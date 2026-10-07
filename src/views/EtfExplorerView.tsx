import React, { useState } from 'react';
import {
  Compass,
  Search,
  Filter,
  ArrowRightLeft,
  X,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { RecentlyViewedBar } from '../components/RecentlyViewedBar';
import { SmartEmptyState } from '../components/SmartEmptyState';
import { ETFS_DATA } from '../data/mockData';
import { ETF } from '../types';

export const EtfExplorerView: React.FC = () => {
  const { openEtfDetails, openTradeModal, addToWatchlist, watchlist } = useTrading();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'volume' | 'price' | 'change' | 'expense'>('volume');

  // Comparison feature (Up to 3 ETFs)
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const categories = ['ALL', 'Equity Large Cap', 'Banking', 'Technology', 'Commodities', 'Thematic', 'Debt'];

  const filteredEtfs = ETFS_DATA.filter((etf) => {
    const matchesSearch =
      etf.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      etf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      etf.sector.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'ALL' ||
      etf.category.toLowerCase().includes(categoryFilter.toLowerCase());

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'price') return b.price - a.price;
    if (sortBy === 'change') return b.changePercent1D - a.changePercent1D;
    if (sortBy === 'expense') return a.expenseRatio - b.expenseRatio;
    return b.volume.localeCompare(a.volume);
  });

  const toggleCompare = (symbol: string) => {
    setCompareList((prev) => {
      if (prev.includes(symbol)) {
        return prev.filter((s) => s !== symbol);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], symbol];
      }
      return [...prev, symbol];
    });
  };

  const compareEtfs = compareList.map((s) => ETFS_DATA.find((e) => e.symbol === s)!).filter(Boolean);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-100">ETF Explorer & Screener</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              {filteredEtfs.length} Funds
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Search, filter, and benchmark Indian exchange traded funds across asset classes.
          </p>
        </div>

        {compareList.length > 0 && (
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-zinc-100 font-bold text-xs transition-all shadow-md shadow-purple-600/25 active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Compare ({compareList.length} / 3)</span>
          </button>
        )}
      </div>

      {/* Feature 11: Recently Viewed Bar */}
      <RecentlyViewedBar />

      {/* Search & Filter Controls */}
      <div className="p-4 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Global Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by symbol (e.g. NIFTYBEES, ITBEES) or index..."
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-400 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-zinc-400 whitespace-nowrap">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full md:w-auto bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="volume">Highest Liquidity / Volume</option>
              <option value="price">Market Price (High to Low)</option>
              <option value="change">1-Day Gainers</option>
              <option value="expense">Lowest Expense Ratio</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-emerald-500 text-zinc-950 shadow-sm shadow-emerald-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ETF Cards Grid */}
      {filteredEtfs.length === 0 ? (
        <SmartEmptyState
          title="No ETFs matched your search"
          description={`We couldn't find any ETFs matching "${searchQuery}". Try searching for popular symbols like NIFTYBEES, GOLDBEES, or ITBEES.`}
          actionText="Clear Search Filter"
          onAction={() => {
            setSearchQuery('');
            setCategoryFilter('ALL');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEtfs.map((etf) => {
            const isPos = etf.changePercent1D >= 0;
            const inWatchlist = watchlist.some((w) => w.symbol === etf.symbol);
            const inCompare = compareList.includes(etf.symbol);

            return (
              <div
                key={etf.symbol}
                className="p-5 rounded-3xl bg-zinc-950/80 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-emerald-500/30 transition-all space-y-4 flex flex-col justify-between group shadow-sm"
              >
                <div>
                  {/* Top Bar with Symbol, Sector and Watchlist toggle */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-zinc-700/60 flex items-center justify-center font-bold text-xs font-mono text-emerald-400">
                        {etf.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <button
                          onClick={() => openEtfDetails(etf.symbol)}
                          className="font-bold text-sm text-zinc-100 hover:text-emerald-400 transition-colors text-left cursor-pointer"
                        >
                          {etf.symbol}
                        </button>
                        <p className="text-[10px] text-zinc-400 font-mono uppercase">{etf.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleCompare(etf.symbol)}
                        className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                          inCompare
                            ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        }`}
                        title="Add to Compare"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => addToWatchlist(etf.symbol)}
                        className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                          inWatchlist
                            ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        }`}
                        title={inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                    {etf.description}
                  </p>

                  {/* Price & Change Stats */}
                  <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-850 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-zinc-400 font-medium">Market Price</div>
                      <div className="text-base font-bold font-mono text-zinc-100">
                        ₹{etf.price.toFixed(2)}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] text-zinc-400 font-medium">1D Return</div>
                      <div
                        className={`text-xs font-mono font-bold flex items-center justify-end gap-0.5 ${
                          isPos ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {isPos ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        <span>{isPos ? '+' : ''}{etf.changePercent1D.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Fund Specs Pills */}
                  <div className="grid grid-cols-3 gap-2 mt-3 text-center text-[10px] font-mono text-zinc-400">
                    <div className="p-1.5 rounded-xl bg-zinc-900/40 border border-zinc-850">
                      <div>AUM</div>
                      <div className="font-bold text-zinc-200 mt-0.5">{etf.aum}</div>
                    </div>
                    <div className="p-1.5 rounded-xl bg-zinc-900/40 border border-zinc-850">
                      <div>Expense</div>
                      <div className="font-bold text-emerald-400 mt-0.5">{etf.expenseRatio}%</div>
                    </div>
                    <div className="p-1.5 rounded-xl bg-zinc-900/40 border border-zinc-850">
                      <div>Tracking</div>
                      <div className="font-bold text-zinc-200 mt-0.5">{etf.trackingError}%</div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-zinc-900 flex items-center gap-2">
                  <button
                    onClick={() => openEtfDetails(etf.symbol)}
                    className="flex-1 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs transition-colors cursor-pointer text-center"
                  >
                    Details & Radar
                  </button>
                  <button
                    onClick={() => openTradeModal('BUY', etf.symbol)}
                    className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-sm active:scale-95 cursor-pointer text-center"
                  >
                    Paper Buy
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Side-by-Side ETF Comparison Modal (Feature from specification) */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-4xl rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-base text-zinc-100">
                  ETF Side-by-Side Comparison ({compareEtfs.length} Selected)
                </h3>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {compareEtfs.length < 2 ? (
              <div className="py-8 text-center text-xs text-zinc-400">
                Please select at least 2 ETFs from the explorer to compare them side by side.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-400">
                      <th className="pb-3 w-40">Metric</th>
                      {compareEtfs.map((e) => (
                        <th key={e.symbol} className="pb-3 font-bold text-zinc-100 text-sm">
                          {e.symbol}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 font-mono">
                    <tr>
                      <td className="py-2.5 text-zinc-400 font-sans">Full Name</td>
                      {compareEtfs.map((e) => (
                        <td key={e.symbol} className="py-2.5 text-zinc-200 font-sans">{e.name}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2.5 text-zinc-400 font-sans">Current Price</td>
                      {compareEtfs.map((e) => (
                        <td key={e.symbol} className="py-2.5 font-bold text-zinc-100">₹{e.price.toFixed(2)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2.5 text-zinc-400 font-sans">1D Return</td>
                      {compareEtfs.map((e) => (
                        <td key={e.symbol} className={`py-2.5 font-bold ${e.changePercent1D >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {e.changePercent1D >= 0 ? '+' : ''}{e.changePercent1D}%
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2.5 text-zinc-400 font-sans">Expense Ratio</td>
                      {compareEtfs.map((e) => (
                        <td key={e.symbol} className="py-2.5 text-emerald-400 font-bold">{e.expenseRatio}%</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2.5 text-zinc-400 font-sans">Tracking Error</td>
                      {compareEtfs.map((e) => (
                        <td key={e.symbol} className="py-2.5 text-zinc-300">{e.trackingError}%</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2.5 text-zinc-400 font-sans">AUM</td>
                      {compareEtfs.map((e) => (
                        <td key={e.symbol} className="py-2.5 text-zinc-300">{e.aum}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2.5 text-zinc-400 font-sans">Risk Volatility</td>
                      {compareEtfs.map((e) => (
                        <td key={e.symbol} className="py-2.5 text-amber-400">{e.riskRadar.volatility} / 100</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2.5 text-zinc-400 font-sans">Liquidity Score</td>
                      {compareEtfs.map((e) => (
                        <td key={e.symbol} className="py-2.5 text-emerald-400">{e.riskRadar.liquidity} / 100</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
