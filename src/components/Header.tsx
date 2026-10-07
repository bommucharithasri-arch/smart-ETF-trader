import React, { useState, useRef, useEffect } from 'react';
import {
  TrendingUp,
  Search,
  Bell,
  Wallet,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  User,
  LogOut,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';

interface HeaderProps {
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const {
    virtualCash,
    unreadNotifsCount,
    notifications,
    markAllNotifsRead,
    setIsCommandSearchOpen,
    openTradeModal,
    setActivePage,
    user,
    logout
  } = useTrading();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-3.5 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80">
      {/* Brand & Mobile title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActivePage('dashboard')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-zinc-950 font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-5 h-5 text-zinc-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-zinc-100 group-hover:text-emerald-400 transition-colors">
                Smart ETF Trader
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">AI Analysis & Paper Trading</p>
          </div>
        </button>

        {/* PAPER TRADING Status Badge */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>🟢 PAPER TRADING</span>
        </div>
      </div>

      {/* Center Search bar (Cmd+K) */}
      <div className="flex-1 max-w-md mx-4 hidden lg:block">
        <button
          onClick={() => setIsCommandSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-sm transition-all group shadow-inner cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
            <span className="text-zinc-400">Search ETFs, sectors, orders, pages...</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
            <span>⌘</span>
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Virtual Cash Display */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 shadow-sm">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Wallet className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] text-zinc-400 font-medium leading-none">Virtual Cash</div>
            <div className="text-xs sm:text-sm font-bold text-zinc-100 font-mono">
              ₹{virtualCash.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Quick Trade Button */}
        <button
          onClick={() => openTradeModal('BUY')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
          title="Shortcut: Press 'B' key"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Trade (B)</span>
        </button>

        {/* Search button for mobile */}
        <button
          onClick={() => setIsCommandSearchOpen(true)}
          className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-colors cursor-pointer"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-zinc-950 text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadNotifsCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-zinc-100">Notifications</h4>
                  {unreadNotifsCount > 0 && (
                    <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                      {unreadNotifsCount} new
                    </span>
                  )}
                </div>
                {unreadNotifsCount > 0 && (
                  <button
                    onClick={markAllNotifsRead}
                    className="text-xs text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-zinc-400">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-2.5 rounded-xl border text-xs transition-colors ${
                        notif.read
                          ? 'bg-zinc-950/40 border-zinc-800/60 text-zinc-400'
                          : 'bg-zinc-800/50 border-emerald-500/30 text-zinc-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                          {notif.type === 'ORDER' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : notif.type === 'AI' ? (
                            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                          ) : (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                          )}
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-zinc-400 leading-snug">{notif.message}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-3 mt-2 border-t border-zinc-800 text-center">
                <button
                  onClick={() => {
                    setIsNotifOpen(false);
                    setActivePage('orders');
                  }}
                  className="text-xs text-emerald-400 hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  View Paper Orders History <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-zinc-950 font-bold text-xs flex items-center justify-center">
              {user?.name ? user.name[0] : 'U'}
            </div>
            <span className="hidden sm:block text-xs font-medium text-zinc-200">
              {user?.name || 'Demo Trader'}
            </span>
            <ChevronDown className="w-3 h-3 text-zinc-400 hidden sm:block" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-zinc-800 mb-1">
                <p className="text-xs font-semibold text-zinc-200">{user?.name || 'Demo Trader'}</p>
                <p className="text-[11px] text-zinc-400 truncate">{user?.email || 'demo@smartetf.app'}</p>
                <div className="mt-1.5 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Paper Trading Mode
                </div>
              </div>

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  setActivePage('settings');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 rounded-xl transition-colors cursor-pointer text-left"
              >
                <User className="w-3.5 h-3.5 text-zinc-400" />
                <span>Account & Preferences</span>
              </button>

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer text-left"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>Sign Out / Switch User</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
