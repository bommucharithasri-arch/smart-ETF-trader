import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Compass,
  Bookmark,
  Clock,
  PieChart,
  Bot,
  Calculator,
  GraduationCap,
  Settings,
  Sparkles,
  Trophy,
  ShieldCheck
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    openTradeModal,
    virtualCash,
    achievements
  } = useTrading();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'markets', label: 'Markets & Heatmap', icon: TrendingUp, badge: 'Live' },
    { id: 'etfs', label: 'ETF Explorer', icon: Compass },
    { id: 'watchlist', label: 'Watchlist', icon: Bookmark },
    { id: 'orders', label: 'Orders & Analytics', icon: Clock },
    { id: 'portfolio', label: 'Portfolio & Benchmark', icon: PieChart },
    { id: 'ai-advisor', label: 'AI Advisor', icon: Bot, badge: 'AI' },
    { id: 'calculator', label: 'Calculator & Goals', icon: Calculator },
    { id: 'learning', label: 'Learning & Quiz', icon: GraduationCap },
    { id: 'settings', label: 'Settings & Health', icon: Settings },
  ];

  const unlockedBadges = achievements.filter((a) => a.unlocked).length;

  return (
    <aside className="w-64 bg-zinc-950/70 border-r border-zinc-800/80 hidden md:flex flex-col justify-between p-4 flex-shrink-0 min-h-[calc(100vh-61px)]">
      {/* Navigation links */}
      <div className="space-y-6">
        <div>
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-3 mb-2">
            Main Platform
          </div>
          <nav className="space-y-1">
            {navItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-zinc-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        item.badge === 'AI'
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div>
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-3 mb-2">
            Intelligence & Tools
          </div>
          <nav className="space-y-1">
            {navItems.slice(6).map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-zinc-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        item.badge === 'AI'
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Sandbox Card */}
      <div className="space-y-3 pt-4 border-t border-zinc-900">
        {/* Achievements pill */}
        <button
          onClick={() => setActivePage('learning')}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 text-left hover:border-zinc-700 transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-[11px] font-semibold text-zinc-200">Achievements</div>
              <div className="text-[10px] text-zinc-400">{unlockedBadges} of 6 badges earned</div>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400 font-mono">
            {Math.round((unlockedBadges / 6) * 100)}%
          </span>
        </button>

        {/* Paper Trading Sandbox Box */}
        <div className="p-3 rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-emerald-500/20 shadow-inner">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Simulation Safe</span>
            </div>
            <span className="text-[10px] text-zinc-400 uppercase font-mono">Zero Risk</span>
          </div>

          <p className="text-[11px] text-zinc-400 mb-2 leading-relaxed">
            Educational sandbox mode with zero real-money exposure.
          </p>

          <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-200 mb-3 bg-zinc-950/60 p-2 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-400 font-sans">Cash:</span>
            <span className="text-emerald-400">₹{virtualCash.toLocaleString('en-IN')}</span>
          </div>

          <button
            onClick={() => openTradeModal('BUY')}
            className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Place Paper Trade</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
