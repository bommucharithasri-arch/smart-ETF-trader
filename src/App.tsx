import React from 'react';
import { TradingProvider, useTrading } from './context/TradingContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CommandSearchModal } from './components/CommandSearchModal';
import { TradeModal } from './components/TradeModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { OnboardingTour } from './components/OnboardingTour';
import { KeyboardShortcutHandler } from './components/KeyboardShortcutHandler';

// Views
import { LandingPage } from './views/LandingPage';
import { AuthView } from './views/AuthView';
import { DashboardView } from './views/DashboardView';
import { MarketsView } from './views/MarketsView';
import { EtfExplorerView } from './views/EtfExplorerView';
import { EtfDetailsView } from './views/EtfDetailsView';
import { WatchlistView } from './views/WatchlistView';
import { OrdersView } from './views/OrdersView';
import { PortfolioView } from './views/PortfolioView';
import { AiAdvisorView } from './views/AiAdvisorView';
import { CalculatorView } from './views/CalculatorView';
import { LearningView } from './views/LearningView';
import { SettingsView } from './views/SettingsView';
import { LoginRequiredModal } from './components/LoginRequiredModal';

const MainAppContent: React.FC = () => {
  const { isAuthenticated, isAuthPageOpen, activePage, toasts } = useTrading();

  if (!isAuthenticated) {
    if (isAuthPageOpen) {
      return <AuthView />;
    }
    return (
      <>
        <LandingPage />
        <LoginRequiredModal />
      </>
    );
  }

  const renderActiveView = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardView />;
      case 'markets':
        return <MarketsView />;
      case 'etfs':
        return <EtfExplorerView />;
      case 'etf-details':
        return <EtfDetailsView />;
      case 'watchlist':
        return <WatchlistView />;
      case 'orders':
        return <OrdersView />;
      case 'portfolio':
        return <PortfolioView />;
      case 'ai-advisor':
        return <AiAdvisorView />;
      case 'calculator':
        return <CalculatorView />;
      case 'learning':
        return <LearningView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-zinc-950">
      {/* Keyboard Shortcut Handler (B, S, P, O) */}
      <KeyboardShortcutHandler />

      {/* Top Application Header */}
      <Header />

      {/* Main Workspace Body */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Desktop Sidebar Navigation */}
        <Sidebar />

        {/* Dynamic Page Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Feature 13 - Hidden on Desktop) */}
      <MobileBottomNav />

      {/* Floating SmartETF AI Assistant Drawer (Feature 1) */}
      <AiAssistantDrawer />

      {/* 2-Step Paper Trading Execution Modal (Features 4 & 5) */}
      <TradeModal />

      {/* Command Search Ctrl+K Modal (Feature 14) */}
      <CommandSearchModal />

      {/* Interactive Onboarding Tour (Feature 18) */}
      <OnboardingTour />

      {/* Toast Notification Toaster */}
      <div className="fixed bottom-24 md:bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto px-4 py-2.5 rounded-2xl text-xs font-semibold shadow-2xl border transition-all animate-in slide-in-from-left duration-200 ${
              t.type === 'success'
                ? 'bg-emerald-950 border-emerald-500/40 text-emerald-200'
                : t.type === 'error'
                ? 'bg-rose-950 border-rose-500/40 text-rose-200'
                : 'bg-zinc-900 border-zinc-800 text-zinc-200'
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <TradingProvider>
      <MainAppContent />
    </TradingProvider>
  );
}
