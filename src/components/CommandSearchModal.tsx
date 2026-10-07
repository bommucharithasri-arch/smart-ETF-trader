import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Compass,
  LayoutDashboard,
  TrendingUp,
  Bookmark,
  Clock,
  PieChart,
  Bot,
  Calculator,
  GraduationCap,
  Settings,
  X,
  ArrowRight
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { ETFS_DATA } from '../data/mockData';

interface SearchResultItem {
  id: string;
  type: 'PAGE' | 'ETF' | 'ORDER';
  title: string;
  subtitle: string;
  badge?: string;
  target: string;
}

export const CommandSearchModal: React.FC = () => {
  const {
    isCommandSearchOpen,
    setIsCommandSearchOpen,
    setActivePage,
    openEtfDetails,
    orders
  } = useTrading();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on open
  useEffect(() => {
    if (isCommandSearchOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandSearchOpen]);

  // Global key listener for Ctrl+K / Cmd+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandSearchOpen(!isCommandSearchOpen);
      }
      if (e.key === 'Escape' && isCommandSearchOpen) {
        setIsCommandSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandSearchOpen, setIsCommandSearchOpen]);

  // Aggregate search items
  const pages: SearchResultItem[] = [
    { id: 'p-dashboard', type: 'PAGE', title: 'Dashboard', subtitle: 'Overview, portfolio summary & quick metrics', target: 'dashboard' },
    { id: 'p-markets', type: 'PAGE', title: 'Markets & Heatmap', subtitle: '10 Sector heatmap, gainers, losers', target: 'markets' },
    { id: 'p-etfs', type: 'PAGE', title: 'ETF Explorer', subtitle: 'Search, filter, and compare all Indian ETFs', target: 'etfs' },
    { id: 'p-portfolio', type: 'PAGE', title: 'Portfolio & Benchmark', subtitle: 'Holdings, P&L, benchmark comparison, rebalancing simulator', target: 'portfolio' },
    { id: 'p-orders', type: 'PAGE', title: 'Orders & Analytics', subtitle: 'Paper trades history and win rate analytics', target: 'orders' },
    { id: 'p-watchlist', type: 'PAGE', title: 'Watchlist', subtitle: 'Tracked ETFs and custom price alerts', target: 'watchlist' },
    { id: 'p-ai-advisor', type: 'PAGE', title: 'AI Advisor', subtitle: 'Market outlook, daily picks and health insights', target: 'ai-advisor' },
    { id: 'p-calculator', type: 'PAGE', title: 'Calculator & Goal Planner', subtitle: 'SIP compounding and educational goal planning', target: 'calculator' },
    { id: 'p-learning', type: 'PAGE', title: 'Learning & Quiz', subtitle: 'Interactive ETF courses and knowledge badges', target: 'learning' },
    { id: 'p-settings', type: 'PAGE', title: 'Settings & Health', subtitle: 'Data export center and system health monitor', target: 'settings' }
  ];

  const etfs: SearchResultItem[] = ETFS_DATA.map((e) => ({
    id: `etf-${e.symbol}`,
    type: 'ETF',
    title: `${e.symbol} — ${e.name}`,
    subtitle: `₹${e.price.toFixed(2)} (${e.changePercent1D >= 0 ? '+' : ''}${e.changePercent1D}%) • ${e.category}`,
    badge: e.sector,
    target: e.symbol
  }));

  const orderItems: SearchResultItem[] = orders.slice(0, 5).map((o) => ({
    id: `ord-${o.id}`,
    type: 'ORDER',
    title: `${o.id}: ${o.type} ${o.quantity} ${o.symbol}`,
    subtitle: `₹${o.price.toFixed(2)} (${o.timestamp}) • Status: ${o.status}`,
    target: 'orders'
  }));

  const allItems = [...pages, ...etfs, ...orderItems];

  const filteredItems = query.trim() === ''
    ? allItems.slice(0, 10)
    : allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          (item.badge && item.badge.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 12);

  const handleSelect = (item: SearchResultItem) => {
    setIsCommandSearchOpen(false);
    if (item.type === 'ETF') {
      openEtfDetails(item.target);
    } else {
      setActivePage(item.target);
    }
  };

  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  if (!isCommandSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150">
        {/* Search Input bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800">
          <Search className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyNav}
            placeholder="Search pages, ETFs (e.g. NIFTYBEES, ITBEES), orders..."
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-zinc-400 hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-zinc-400">
              No matching pages or ETFs found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-800/90 text-zinc-100 border border-zinc-700/80'
                      : 'text-zinc-300 hover:bg-zinc-800/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        item.type === 'ETF'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : item.type === 'ORDER'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {item.type === 'ETF' ? (
                        <Compass className="w-4 h-4" />
                      ) : item.type === 'ORDER' ? (
                        <Clock className="w-4 h-4" />
                      ) : (
                        <LayoutDashboard className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-zinc-100 truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate">{item.subtitle}</p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 text-zinc-400 flex-shrink-0 ml-2 ${
                      isSelected ? 'text-emerald-400 translate-x-0.5' : ''
                    } transition-transform`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-zinc-950/80 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-mono mr-1">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-mono mr-1">↓</kbd>
              to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-mono mr-1">↵</kbd>
              to select
            </span>
          </div>
          <span className="text-emerald-400/80 font-medium">Smart ETF Quick Navigator</span>
        </div>
      </div>
    </div>
  );
};
