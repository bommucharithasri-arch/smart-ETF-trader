import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Holding, Order, WatchlistItem, NotificationItem, Achievement, UserProfile, RiskLevel } from '../types';
import {
  INITIAL_HOLDINGS,
  INITIAL_ORDERS,
  INITIAL_WATCHLIST,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_CASH,
  ETFS_DATA
} from '../data/mockData';

interface TradeModalConfig {
  mode: 'BUY' | 'SELL';
  symbol?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface TradingContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthPageOpen: boolean;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
  openAuthPage: (mode?: 'login' | 'signup') => void;
  closeAuthPage: () => void;
  loginUser: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signupUser: (name: string, email: string, password: string, confirmPassword: string) => Promise<{ success: boolean; error?: string }>;
  socialLogin: (provider: 'google' | 'microsoft') => Promise<{ success: boolean; error?: string }>;
  loginDemo: (name?: string, email?: string) => void;
  logout: () => void;
  isLoginRequiredOpen: boolean;
  setIsLoginRequiredOpen: (open: boolean) => void;
  virtualCash: number;
  initialCash: number;
  holdings: Holding[];
  orders: Order[];
  watchlist: WatchlistItem[];
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  markAllNotifsRead: () => void;
  recentlyViewed: string[];
  addRecentlyViewed: (symbol: string) => void;
  achievements: Achievement[];
  activePage: string;
  setActivePage: (page: string) => void;
  selectedEtfSymbol: string;
  setSelectedEtfSymbol: (symbol: string) => void;
  openEtfDetails: (symbol: string) => void;
  isTradeModalOpen: boolean;
  tradeModalConfig: TradeModalConfig | null;
  openTradeModal: (mode: 'BUY' | 'SELL', symbol?: string) => void;
  closeTradeModal: () => void;
  isCommandSearchOpen: boolean;
  setIsCommandSearchOpen: (open: boolean) => void;
  isAiDrawerOpen: boolean;
  setIsAiDrawerOpen: (open: boolean) => void;
  executePaperTrade: (symbol: string, type: 'BUY' | 'SELL', quantity: number, price?: number) => Promise<{ success: boolean; orderId?: string; error?: string }>;
  addToWatchlist: (symbol: string) => Promise<boolean>;
  removeFromWatchlist: (idOrSymbol: string) => Promise<boolean>;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  completeOnboarding: () => void;
  restartOnboarding: () => void;
  refreshState: () => Promise<void>;
  updateQuizScore: (scorePercent: number) => void;
  markAchievementUnlocked: (achId: string) => void;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'smart_etf_session_user';
const LOCAL_STORAGE_USERS_REGISTRY_KEY = 'smart_etf_registered_users';
const LOCAL_STORAGE_VIEWED_KEY = 'smart_etf_recently_viewed';
const LOCAL_STORAGE_TOUR_KEY = 'smart_etf_tour_completed';
const LOCAL_STORAGE_ACHIEVEMENTS_KEY = 'smart_etf_achievements';

export const TradingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Session persistence
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    } catch {
      return false;
    }
  });

  const [isAuthPageOpen, setIsAuthPageOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isLoginRequiredOpen, setIsLoginRequiredOpen] = useState<boolean>(false);

  const [virtualCash, setVirtualCash] = useState<number>(INITIAL_CASH);
  const [holdings, setHoldings] = useState<Holding[]>(INITIAL_HOLDINGS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(INITIAL_WATCHLIST);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [selectedEtfSymbol, setSelectedEtfSymbol] = useState<string>('NIFTYBEES');

  const [isTradeModalOpen, setIsTradeModalOpen] = useState<boolean>(false);
  const [tradeModalConfig, setTradeModalConfig] = useState<TradeModalConfig | null>(null);
  const [isCommandSearchOpen, setIsCommandSearchOpen] = useState<boolean>(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Recently Viewed ETFs
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_VIEWED_KEY);
      return stored ? JSON.parse(stored) : ['NIFTYBEES', 'ITBEES', 'GOLDBEES'];
    } catch {
      return ['NIFTYBEES', 'ITBEES', 'GOLDBEES'];
    }
  });

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_ACHIEVEMENTS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_ACHIEVEMENTS;
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  });

  // Onboarding Tour (shown only once)
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);

  // Toast helper
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  // Sync with backend API on mount
  const refreshState = useCallback(async () => {
    try {
      const [holdingsRes, ordersRes, watchlistRes, notifsRes] = await Promise.all([
        fetch('/api/holdings'),
        fetch('/api/orders'),
        fetch('/api/watchlist'),
        fetch('/api/notifications')
      ]);

      if (holdingsRes.ok) {
        const data = await holdingsRes.json();
        setHoldings(data.holdings);
        setVirtualCash(data.virtualCash);
      }

      if (ordersRes.ok) {
        const data = await ordersRes.json();
        setOrders(data);
      }

      if (watchlistRes.ok) {
        const data = await watchlistRes.json();
        setWatchlist(data);
      }

      if (notifsRes.ok) {
        const data = await notifsRes.json();
        setNotifications(data);
      }
    } catch (err) {
      console.warn('API sync warning (using in-memory state):', err);
    }
  }, []);

  useEffect(() => {
    refreshState();
  }, [refreshState]);

  // Auth Dialog Openers
  const openAuthPage = useCallback((mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setIsAuthPageOpen(true);
  }, []);

  const closeAuthPage = useCallback(() => {
    setIsAuthPageOpen(false);
  }, []);

  // Login handler
  const loginUser = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: 'Please enter your email.' };
    }
    if (!password) {
      return { success: false, error: 'Please enter your password.' };
    }

    // Check registered accounts in localStorage or fallback demo
    let accounts: Record<string, { name: string; email: string; passwordHash: string }> = {};
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_USERS_REGISTRY_KEY);
      if (raw) accounts = JSON.parse(raw);
    } catch (e) {
      console.error(e);
    }

    // Support default demo user
    const isDemoUser = cleanEmail === 'arjun.demo@smartetf.app' || cleanEmail === 'demo@smartetf.app';
    const found = accounts[cleanEmail];

    if (!isDemoUser && !found) {
      return { success: false, error: 'Invalid email or password. You can also click "Quick Demo Login".' };
    }

    if (found && found.passwordHash !== password && !isDemoUser) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const userName = found ? found.name : isDemoUser ? 'Arjun Mehta' : cleanEmail.split('@')[0];

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: userName,
      displayName: userName,
      email: cleanEmail,
      role: 'Paper Trader',
      virtualCash,
      initialCash: INITIAL_CASH,
      authProvider: 'email',
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    setIsAuthenticated(true);
    setIsAuthPageOpen(false);
    setIsLoginRequiredOpen(false);

    try {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUser));
    } catch (e) {
      console.error(e);
    }

    showToast(`✓ Welcome to Smart ETF Trader, ${userName}!`, 'success');

    // Trigger onboarding tour if not completed
    try {
      if (localStorage.getItem(LOCAL_STORAGE_TOUR_KEY) !== 'true') {
        setIsOnboardingOpen(true);
      }
    } catch {
      // ignore
    }

    return { success: true };
  }, [virtualCash, showToast]);

  // Signup handler
  const signupUser = useCallback(async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      return { success: false, error: 'Full name is required.' };
    }
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!password) {
      return { success: false, error: 'Please enter a password.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }
    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match.' };
    }

    // Check duplicate accounts
    let accounts: Record<string, { name: string; email: string; passwordHash: string }> = {};
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_USERS_REGISTRY_KEY);
      if (raw) accounts = JSON.parse(raw);
    } catch (e) {
      console.error(e);
    }

    if (accounts[cleanEmail]) {
      return { success: false, error: 'Account already exists with this email. Please sign in.' };
    }

    // Save account
    accounts[cleanEmail] = {
      name: cleanName,
      email: cleanEmail,
      passwordHash: password
    };

    try {
      localStorage.setItem(LOCAL_STORAGE_USERS_REGISTRY_KEY, JSON.stringify(accounts));
    } catch (e) {
      console.error(e);
    }

    // Log the user in
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: cleanName,
      displayName: cleanName,
      email: cleanEmail,
      role: 'Paper Trader',
      virtualCash: INITIAL_CASH,
      initialCash: INITIAL_CASH,
      authProvider: 'email',
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    setIsAuthenticated(true);
    setIsAuthPageOpen(false);
    setIsLoginRequiredOpen(false);

    try {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUser));
    } catch (e) {
      console.error(e);
    }

    showToast(`✓ Account created successfully! Welcome, ${cleanName}!`, 'success');
    setIsOnboardingOpen(true);

    return { success: true };
  }, [showToast]);

  // Social Login handler (Google / Microsoft)
  const socialLogin = useCallback(async (provider: 'google' | 'microsoft'): Promise<{ success: boolean; error?: string }> => {
    const isGoogle = provider === 'google';
    const providerName = isGoogle ? 'Google' : 'Microsoft';
    const sampleEmail = isGoogle ? 'investor@gmail.com' : 'investor@outlook.com';
    const sampleName = isGoogle ? 'Google Investor' : 'Microsoft Investor';

    const newUser: UserProfile = {
      id: `usr-${provider}-${Date.now()}`,
      name: sampleName,
      displayName: sampleName,
      email: sampleEmail,
      role: 'Paper Trader',
      virtualCash,
      initialCash: INITIAL_CASH,
      authProvider: provider,
      avatar: isGoogle
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
        : undefined,
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    setIsAuthenticated(true);
    setIsAuthPageOpen(false);
    setIsLoginRequiredOpen(false);

    try {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUser));
    } catch (e) {
      console.error(e);
    }

    showToast(`✓ Authenticated via ${providerName} Workspace!`, 'success');
    return { success: true };
  }, [virtualCash, showToast]);

  // Quick Demo Login
  const loginDemo = useCallback((name = 'Arjun Mehta', email = 'arjun.demo@smartetf.app') => {
    const newUser: UserProfile = {
      id: 'demo-user-1',
      name,
      displayName: name,
      email,
      role: 'Paper Trader',
      virtualCash,
      initialCash: INITIAL_CASH,
      authProvider: 'demo',
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    setIsAuthenticated(true);
    setIsAuthPageOpen(false);
    setIsLoginRequiredOpen(false);

    try {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUser));
    } catch (e) {
      console.error(e);
    }

    showToast(`✓ Welcome to Smart ETF Trader, ${name}! Demo session active.`, 'success');
  }, [virtualCash, showToast]);

  // Sign out / Logout
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    } catch (e) {
      console.error(e);
    }
    setActivePage('dashboard');
    showToast('Signed out of Smart ETF Trader.', 'info');
  }, [showToast]);

  // Save recently viewed
  const addRecentlyViewed = useCallback((symbol: string) => {
    const cleanSym = symbol.toUpperCase();
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((s) => s !== cleanSym);
      const updated = [cleanSym, ...filtered].slice(0, 5);
      try {
        localStorage.setItem(LOCAL_STORAGE_VIEWED_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    // Check ETF Explorer achievement
    setAchievements((prev) => {
      const ach = prev.find((a) => a.id === 'ach-1');
      if (ach && !ach.unlocked) {
        const nextProgress = Math.min(ach.progress + 1, ach.maxProgress);
        const unlocked = nextProgress >= ach.maxProgress;
        const updated = prev.map((a) => (a.id === 'ach-1' ? { ...a, progress: nextProgress, unlocked, unlockedAt: unlocked ? 'Just now' : undefined } : a));
        try {
          localStorage.setItem(LOCAL_STORAGE_ACHIEVEMENTS_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
        if (unlocked) {
          showToast('🏅 Achievement Unlocked: ETF Explorer!', 'success');
        }
        return updated;
      }
      return prev;
    });
  }, [showToast]);

  const markAchievementUnlocked = useCallback((achId: string) => {
    setAchievements((prev) => {
      const ach = prev.find((a) => a.id === achId);
      if (ach && !ach.unlocked) {
        const updated = prev.map((a) => (a.id === achId ? { ...a, unlocked: true, progress: a.maxProgress, unlockedAt: 'Just now' } : a));
        try {
          localStorage.setItem(LOCAL_STORAGE_ACHIEVEMENTS_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
        showToast(`🏅 Achievement Unlocked: ${ach.title}!`, 'success');
        return updated;
      }
      return prev;
    });
  }, [showToast]);

  const updateQuizScore = useCallback((scorePercent: number) => {
    if (scorePercent >= 80) {
      markAchievementUnlocked('ach-5'); // Quiz Master
    }
  }, [markAchievementUnlocked]);

  const openEtfDetails = useCallback((symbol: string) => {
    setSelectedEtfSymbol(symbol);
    addRecentlyViewed(symbol);
    setActivePage('etf-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [addRecentlyViewed]);

  const openTradeModal = useCallback((mode: 'BUY' | 'SELL', symbol?: string) => {
    // If not authenticated, require login first
    if (!isAuthenticated) {
      setIsLoginRequiredOpen(true);
      return;
    }
    setTradeModalConfig({ mode, symbol: symbol || selectedEtfSymbol });
    setIsTradeModalOpen(true);
  }, [isAuthenticated, selectedEtfSymbol]);

  const closeTradeModal = useCallback(() => {
    setIsTradeModalOpen(false);
    setTradeModalConfig(null);
  }, []);

  // Execute Paper Trade
  const executePaperTrade = useCallback(async (
    symbol: string,
    type: 'BUY' | 'SELL',
    quantity: number,
    price?: number
  ): Promise<{ success: boolean; orderId?: string; error?: string }> => {
    if (!isAuthenticated) {
      setIsLoginRequiredOpen(true);
      return { success: false, error: 'Please sign in to place paper trades.' };
    }

    const targetSymbol = symbol.toUpperCase();
    const etf = ETFS_DATA.find((e) => e.symbol === targetSymbol);

    if (!etf) {
      return { success: false, error: `ETF ${targetSymbol} not found.` };
    }

    const execPrice = price && price > 0 ? price : etf.price;
    const totalAmount = quantity * execPrice;

    // Check virtual cash for BUY
    if (type === 'BUY' && totalAmount > virtualCash) {
      const msg = `Insufficient virtual cash. Needed: ₹${totalAmount.toLocaleString('en-IN')}, Available: ₹${virtualCash.toLocaleString('en-IN')}`;
      showToast(msg, 'error');
      return { success: false, error: msg };
    }

    // Check holdings for SELL
    if (type === 'SELL') {
      const held = holdings.find((h) => h.symbol === targetSymbol);
      if (!held || held.quantity < quantity) {
        const msg = `Insufficient holdings. You own ${held ? held.quantity : 0} units.`;
        showToast(msg, 'error');
        return { success: false, error: msg };
      }
    }

    // Try server call first
    let createdOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: targetSymbol, type, quantity, price: execPrice })
      });

      if (res.ok) {
        const data = await res.json();
        createdOrderId = data.order.id;
        setVirtualCash(data.virtualCash);
        await refreshState();
      } else {
        const errData = await res.json();
        throw new Error(errData.error || 'Server order rejected');
      }
    } catch {
      // In-memory fallback
      const now = new Date();
      const timeString = `Today, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

      const newOrder: Order = {
        id: createdOrderId,
        symbol: targetSymbol,
        etfName: etf.name,
        type,
        quantity,
        price: execPrice,
        totalAmount,
        timestamp: timeString,
        status: 'FILLED',
        riskLevel: etf.riskLevel,
        riskScore: etf.riskScore
      };

      setOrders((prev) => [newOrder, ...prev]);

      if (type === 'BUY') {
        setVirtualCash((prev) => prev - totalAmount);
        setHoldings((prev) => {
          const idx = prev.findIndex((h) => h.symbol === targetSymbol);
          if (idx >= 0) {
            const existing = prev[idx];
            const newQty = existing.quantity + quantity;
            const newInvested = existing.investedAmount + totalAmount;
            const newAvg = newInvested / newQty;
            const copy = [...prev];
            copy[idx] = {
              ...existing,
              quantity: newQty,
              avgBuyPrice: Number(newAvg.toFixed(2)),
              investedAmount: newInvested,
              currentPrice: execPrice,
              currentValue: newQty * execPrice,
              totalPnl: newQty * execPrice - newInvested,
              totalPnlPercent: ((newQty * execPrice - newInvested) / newInvested) * 100,
              riskLevel: etf.riskLevel
            };
            return copy;
          } else {
            return [
              ...prev,
              {
                symbol: targetSymbol,
                etfName: etf.name,
                quantity,
                avgBuyPrice: execPrice,
                currentPrice: execPrice,
                investedAmount: totalAmount,
                currentValue: totalAmount,
                totalPnl: 0,
                totalPnlPercent: 0,
                dayPnl: 0,
                dayPnlPercent: 0,
                riskLevel: etf.riskLevel
              }
            ];
          }
        });
      } else {
        // SELL
        setVirtualCash((prev) => prev + totalAmount);
        setHoldings((prev) => {
          const idx = prev.findIndex((h) => h.symbol === targetSymbol);
          if (idx < 0) return prev;
          const existing = prev[idx];
          const newQty = existing.quantity - quantity;
          if (newQty <= 0) {
            return prev.filter((h) => h.symbol !== targetSymbol);
          }
          const remainingInvested = newQty * existing.avgBuyPrice;
          const copy = [...prev];
          copy[idx] = {
            ...existing,
            quantity: newQty,
            investedAmount: remainingInvested,
            currentValue: newQty * execPrice,
            totalPnl: newQty * execPrice - remainingInvested,
            totalPnlPercent: ((newQty * execPrice - remainingInvested) / remainingInvested) * 100
          };
          return copy;
        });
      }

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: `Paper Trade Executed (${type})`,
          message: `${type === 'BUY' ? 'Bought' : 'Sold'} ${quantity} ${targetSymbol} at ₹${execPrice.toFixed(2)} (${createdOrderId}). Risk: ${etf.riskLevel}.`,
          type: 'ORDER',
          timestamp: timeString,
          read: false
        },
        ...prev
      ]);
    }

    markAchievementUnlocked('ach-2'); // First Paper Trade

    setAchievements((prev) => {
      const ach10 = prev.find((a) => a.id === 'ach-3');
      if (ach10 && !ach10.unlocked) {
        const next = Math.min(ach10.progress + 1, ach10.maxProgress);
        const unlocked = next >= ach10.maxProgress;
        const updated = prev.map((a) => (a.id === 'ach-3' ? { ...a, progress: next, unlocked, unlockedAt: unlocked ? 'Just now' : undefined } : a));
        try {
          localStorage.setItem(LOCAL_STORAGE_ACHIEVEMENTS_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
        if (unlocked) {
          showToast('🎯 Achievement Unlocked: 10 Paper Trades!', 'success');
        }
        return updated;
      }
      return prev;
    });

    showToast(`✓ Order placed successfully! ID: ${createdOrderId}`, 'success');
    return { success: true, orderId: createdOrderId };
  }, [isAuthenticated, virtualCash, holdings, showToast, refreshState, markAchievementUnlocked]);

  // Watchlist Actions
  const addToWatchlist = useCallback(async (symbol: string): Promise<boolean> => {
    if (!isAuthenticated) {
      setIsLoginRequiredOpen(true);
      return false;
    }

    const cleanSym = symbol.toUpperCase();
    const etf = ETFS_DATA.find((e) => e.symbol === cleanSym);
    if (!etf) return false;

    if (watchlist.some((w) => w.symbol === cleanSym)) {
      showToast(`${cleanSym} is already in your watchlist.`, 'info');
      return true;
    }

    try {
      const res = await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: cleanSym, aiAlertsEnabled: true })
      });
      if (res.ok) {
        await refreshState();
      }
    } catch {
      // client fallback
      const newItem: WatchlistItem = {
        id: `wl-${Date.now()}`,
        symbol: cleanSym,
        etfName: etf.name,
        price: etf.price,
        changePercent: etf.changePercent1D,
        aiAlertsEnabled: true,
        addedAt: 'Just now',
        riskLevel: etf.riskLevel,
        riskScore: etf.riskScore,
        aiScore: etf.aiScore
      };
      setWatchlist((prev) => [...prev, newItem]);
    }

    markAchievementUnlocked('ach-4'); // Watchlist starter
    showToast(`Added ${cleanSym} to Watchlist`, 'success');
    return true;
  }, [isAuthenticated, watchlist, showToast, refreshState, markAchievementUnlocked]);

  const removeFromWatchlist = useCallback(async (idOrSymbol: string): Promise<boolean> => {
    try {
      await fetch(`/api/watchlist/${idOrSymbol}`, { method: 'DELETE' });
      await refreshState();
    } catch {
      setWatchlist((prev) => prev.filter((w) => w.id !== idOrSymbol && w.symbol !== idOrSymbol));
    }
    showToast('Removed from Watchlist', 'info');
    return true;
  }, [showToast, refreshState]);

  const markAllNotifsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  }, [showToast]);

  const completeOnboarding = useCallback(() => {
    setIsOnboardingOpen(false);
    try {
      localStorage.setItem(LOCAL_STORAGE_TOUR_KEY, 'true');
    } catch (e) {
      console.error(e);
    }
    showToast('Welcome to Smart ETF Trader! You have ₹1,00,000 virtual cash to start.', 'success');
  }, [showToast]);

  const restartOnboarding = useCallback(() => {
    setIsOnboardingOpen(true);
  }, []);

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <TradingContext.Provider
      value={{
        user,
        isAuthenticated,
        isAuthPageOpen,
        authMode,
        setAuthMode,
        openAuthPage,
        closeAuthPage,
        loginUser,
        signupUser,
        socialLogin,
        loginDemo,
        logout,
        isLoginRequiredOpen,
        setIsLoginRequiredOpen,
        virtualCash,
        initialCash: INITIAL_CASH,
        holdings,
        orders,
        watchlist,
        notifications,
        unreadNotifsCount,
        markAllNotifsRead,
        recentlyViewed,
        addRecentlyViewed,
        achievements,
        activePage,
        setActivePage,
        selectedEtfSymbol,
        setSelectedEtfSymbol,
        openEtfDetails,
        isTradeModalOpen,
        tradeModalConfig,
        openTradeModal,
        closeTradeModal,
        isCommandSearchOpen,
        setIsCommandSearchOpen,
        isAiDrawerOpen,
        setIsAiDrawerOpen,
        executePaperTrade,
        addToWatchlist,
        removeFromWatchlist,
        toasts,
        showToast,
        isOnboardingOpen,
        setIsOnboardingOpen,
        completeOnboarding,
        restartOnboarding,
        refreshState,
        updateQuizScore,
        markAchievementUnlocked
      }}
    >
      {children}
    </TradingContext.Provider>
  );
};

export const useTrading = (): TradingContextType => {
  const context = useContext(TradingContext);
  if (!context) {
    throw new Error('useTrading must be used within a TradingProvider');
  }
  return context;
};
