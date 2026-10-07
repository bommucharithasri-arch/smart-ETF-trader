import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Compass,
  Bookmark,
  ShieldCheck,
  PieChart,
  Bot,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';

export const OnboardingTour: React.FC = () => {
  const { isOnboardingOpen, completeOnboarding, setActivePage } = useTrading();
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOnboardingOpen) return null;

  const steps = [
    {
      title: 'Welcome to Smart ETF Trader',
      icon: Sparkles,
      color: 'text-emerald-400',
      badge: 'Step 1 of 7',
      description:
        'Your AI-powered paper-trading and educational ETF terminal. You start with ₹1,00,000 in virtual cash to learn market mechanics with zero capital risk.',
      targetPage: 'dashboard'
    },
    {
      title: 'Explore Real-Time Markets',
      icon: TrendingUp,
      color: 'text-blue-400',
      badge: 'Step 2 of 7',
      description:
        'Inspect the interactive 10-Sector Market Heatmap (IT, Banking, Auto, Metals, Pharma...) and track leading gainers and losers in real time.',
      targetPage: 'markets'
    },
    {
      title: 'Discover & Compare ETFs',
      icon: Compass,
      color: 'text-teal-400',
      badge: 'Step 3 of 7',
      description:
        'Search our comprehensive Indian ETF catalog. Filter by asset class, compare up to 3 ETFs side-by-side, and inspect 5-factor ETF Risk Radars.',
      targetPage: 'etfs'
    },
    {
      title: 'Add ETFs to Your Watchlist',
      icon: Bookmark,
      color: 'text-amber-400',
      badge: 'Step 4 of 7',
      description:
        'Save your favorite ETFs to personal watchlists, configure high/low price breakout alerts, and receive automated AI momentum notifications.',
      targetPage: 'watchlist'
    },
    {
      title: 'Practice Paper Trading (2-Step Execution)',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      badge: 'Step 5 of 7',
      description:
        'Practice placing simulated BUY and SELL orders with our transparent 2-step Review Order flow. Watch your virtual cash and P&L update instantly.',
      targetPage: 'orders'
    },
    {
      title: 'Analyze Portfolio & Rebalance',
      icon: PieChart,
      color: 'text-purple-400',
      badge: 'Step 6 of 7',
      description:
        'Benchmark your portfolio return against NIFTY 50 and simulate custom target weight adjustments using the Portfolio Rebalancing Simulator.',
      targetPage: 'portfolio'
    },
    {
      title: 'Get Guidance from SmartETF AI',
      icon: Bot,
      color: 'text-pink-400',
      badge: 'Step 7 of 7',
      description:
        'Use the floating 🤖 Ask SmartETF assistant anytime to explain expense ratios, evaluate risk metrics, or summarize why your portfolio moved.',
      targetPage: 'ai-advisor'
    }
  ];

  const current = steps[currentStep];
  const Icon = current.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setActivePage(steps[currentStep + 1].targetPage);
    } else {
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setActivePage(steps[currentStep - 1].targetPage);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 sm:p-7 space-y-6 animate-in zoom-in-95 duration-150">
        {/* Top step badge & close */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {current.badge}
            </span>
            <span className="text-xs text-zinc-400">Onboarding Guide</span>
          </div>
          <button
            onClick={completeOnboarding}
            className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1 cursor-pointer"
          >
            <span>Skip Tour</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step Visual */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center flex-shrink-0 shadow-inner">
            <Icon className={`w-7 h-7 ${current.color}`} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-zinc-100">{current.title}</h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{current.description}</p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentStep(idx);
                setActivePage(steps[idx].targetPage);
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentStep
                  ? 'w-6 bg-emerald-400'
                  : idx < currentStep
                  ? 'w-2 bg-emerald-500/50'
                  : 'w-2 bg-zinc-800'
              }`}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
          >
            <span>{currentStep === steps.length - 1 ? 'Start Trading' : 'Next'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
