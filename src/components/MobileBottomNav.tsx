import React, { useState } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Compass,
  PieChart,
  Menu,
  X,
  Bookmark,
  Clock,
  Bot,
  Calculator,
  GraduationCap,
  Settings,
  Sparkles
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';

export const MobileBottomNav: React.FC = () => {
  const { activePage, setActivePage, openTradeModal } = useTrading();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const primaryTabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'markets', label: 'Markets', icon: TrendingUp },
    { id: 'etfs', label: 'ETFs', icon: Compass },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
  ];

  const moreTabs = [
    { id: 'watchlist', label: 'Watchlist', icon: Bookmark },
    { id: 'orders', label: 'Orders & History', icon: Clock },
    { id: 'ai-advisor', label: 'AI Advisor', icon: Bot },
    { id: 'calculator', label: 'Calculator & Goals', icon: Calculator },
    { id: 'learning', label: 'Learning & Quiz', icon: GraduationCap },
    { id: 'settings', label: 'Settings & Health', icon: Settings },
  ];

  const handleSelect = (pageId: string) => {
    setActivePage(pageId);
    setIsMoreOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Slide-up "More" sheet on mobile */}
      {isMoreOpen && (
        <div className="fixed inset-0 z-40 bg-zinc-950/80 backdrop-blur-md md:hidden animate-in fade-in duration-200">
          <div className="absolute inset-x-0 bottom-16 bg-zinc-900 border-t border-zinc-800 rounded-t-3xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-200 max-h-[75vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="font-bold text-sm text-zinc-100">All Sections</span>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {moreTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activePage === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleSelect(tab.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      isActive
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-zinc-950/50 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-emerald-400" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                setIsMoreOpen(false);
                openTradeModal('BUY');
              }}
              className="w-full py-3 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>Place Paper Trade</span>
            </button>
          </div>
        </div>
      )}

      {/* Fixed bottom navigation bar (Hidden on desktop md and up) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/80 md:hidden flex items-center justify-around px-2 py-2 safe-area-bottom shadow-2xl">
        {primaryTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-emerald-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400"></span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}

        {/* More Tab */}
        <button
          onClick={() => setIsMoreOpen(!isMoreOpen)}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer ${
            isMoreOpen || moreTabs.some((t) => t.id === activePage)
              ? 'text-emerald-400 font-bold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">More</span>
        </button>
      </nav>
    </>
  );
};
