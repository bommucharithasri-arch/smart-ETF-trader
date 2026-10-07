import React, { useState } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  Bot,
  Compass,
  Sparkles,
  ArrowRight,
  PieChart,
  BarChart3,
  CheckCircle2,
  Lock,
  Layers,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { MARKET_INDICES, MARKET_SECTORS, ETFS_DATA } from '../data/mockData';
import { HeroCinematicAnimation } from '../components/HeroCinematicAnimation';

export const LandingPage: React.FC = () => {
  const { openAuthPage, loginDemo, setActivePage, openEtfDetails } = useTrading();

  // Interactive Explorer preview state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // Filtered preview ETFs
  const previewEtfs = ETFS_DATA.filter((etf) => {
    const matchSearch =
      etf.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      etf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      etf.sector.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory =
      selectedCategory === 'ALL' || etf.category.toUpperCase() === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleLaunchTerminal = () => {
    loginDemo('Arjun Mehta', 'arjun.demo@smartetf.app');
  };

  const handleExploreEtfsClick = () => {
    const previewEl = document.getElementById('etf-preview-section');
    if (previewEl) {
      previewEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      loginDemo('Guest Investor', 'guest@smartetf.app');
      setActivePage('etfs');
    }
  };

  const faqs = [
    {
      q: 'Is Smart ETF Trader a real brokerage or connected to real money?',
      a: 'No. Smart ETF Trader is strictly an educational paper-trading and ETF analysis simulation platform. It uses virtual capital (₹1,00,000) so students and investors can practice asset allocation, risk management, and ETF analysis with zero financial risk.'
    },
    {
      q: 'How does the ETF Risk Radar calculate fund risk?',
      a: 'The Risk Radar evaluates 5 objective quantitative dimensions: 1-Year Volatility, Bid-Ask Spread Liquidity, Portfolio Diversification, Benchmark Tracking Error, and Sector Market Beta to produce an actionable 0-100 factor score.'
    },
    {
      q: 'What is the Portfolio Rebalancing Simulator?',
      a: 'The Rebalancing Simulator lets you set target allocation weights (e.g. 50% NIFTYBEES, 20% BANKBEES, 15% GOLDBEES, 15% ITBEES) and automatically calculates exact units to buy or sell to restore balance without guessing.'
    },
    {
      q: 'How does the SmartETF AI Assistant work if no API key is provided?',
      a: 'Smart ETF Trader has an intelligent hybrid architecture. If an official Gemini API key is configured, it provides live conversational model generation. If not, it gracefully switches to an in-memory financial reasoning engine with zero downtime.'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-zinc-950">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 px-4 sm:px-6 py-3.5 bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-zinc-950 font-black shadow-lg shadow-emerald-500/20">
            <TrendingUp className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-zinc-100">
                SMART ETF TRADER
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold hidden sm:inline-block">
                🟢 PAPER TRADING
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono hidden md:block">
              AI-Powered ETF Analysis & Paper Trading
            </p>
          </div>
        </div>

        {/* Center Nav Links (Hidden on small mobile) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-zinc-400">
          <a href="#hero-section" className="hover:text-emerald-400 transition-colors">
            Terminal
          </a>
          <a href="#heatmap-preview" className="hover:text-emerald-400 transition-colors">
            Market Heatmap
          </a>
          <a href="#etf-preview-section" className="hover:text-emerald-400 transition-colors">
            Explore Funds
          </a>
          <a href="#features-section" className="hover:text-emerald-400 transition-colors">
            Risk Radar & AI
          </a>
          <a href="#faq-section" className="hover:text-emerald-400 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Auth CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => openAuthPage('login')}
            className="px-3 sm:px-4 py-2 rounded-xl text-zinc-300 hover:text-zinc-100 hover:bg-zinc-900 font-bold text-xs transition-colors cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={() => openAuthPage('signup')}
            className="px-4 sm:px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Live Market Indices Ticker Bar */}
      <div className="bg-zinc-900/60 border-b border-zinc-800/80 px-4 py-2 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-6 text-xs font-mono">
        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          NSE Real-Time Feed:
        </span>
        {MARKET_INDICES.map((idx) => (
          <div key={idx.name} className="flex items-center gap-2 shrink-0">
            <span className="font-semibold text-zinc-300">{idx.name}</span>
            <span className="text-zinc-100 font-bold">{idx.value.toLocaleString('en-IN')}</span>
            <span
              className={`text-[11px] font-bold flex items-center ${
                idx.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {idx.changePercent >= 0 ? '+' : ''}
              {idx.changePercent}%
            </span>
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section id="hero-section" className="px-4 sm:px-6 pt-12 pb-16 max-w-7xl mx-auto w-full space-y-10">
        {/* Hero Heading Content */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>🟢 PAPER TRADING • Virtual Money Only</span>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
              SMART ETF TRADER &bull; AI-Powered ETF Analysis & Paper Trading
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-100 leading-[1.15]">
              Trade Smarter.{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent block sm:inline">
                Understand Your ETFs Better.
              </span>
            </h1>
          </div>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Explore markets, analyze ETF risk, compare funds, practice paper trading and understand portfolio performance in one intelligent platform.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => openAuthPage('signup')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all shadow-xl shadow-emerald-500/25 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleExploreEtfsClick}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold text-sm transition-all border border-zinc-700/80 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Explore ETFs</span>
            </button>

            <button
              onClick={handleLaunchTerminal}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 font-semibold text-xs transition-colors border border-zinc-800 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Instant Demo (Arjun Mehta)</span>
            </button>
          </div>

          {/* Feature Badges Grid */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-zinc-400 max-w-3xl mx-auto">
            <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>10-Sector Heatmap</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>5-Metric Risk Radar</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Rebalancing Simulator</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>🤖 Ask SmartETF AI</span>
            </div>
          </div>
        </div>

        {/* Cinematic Animated Hero Terminal Canvas */}
        <HeroCinematicAnimation />
      </section>

      {/* 10-Sector Market Heatmap Preview Section */}
      <section id="heatmap-preview" className="px-4 sm:px-6 py-12 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>FEATURE 2 PREVIEW</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-100">
              10-Sector Market Heatmap
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Live sector breadth indicators for IT, Banking, Auto, Pharma, Energy, Metals, FMCG, and more.
            </p>
          </div>

          <button
            onClick={() => {
              loginDemo();
              setActivePage('markets');
            }}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 text-xs font-bold border border-zinc-800 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>Open Markets View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {MARKET_SECTORS.map((sec) => (
            <div
              key={sec.name}
              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                sec.changePercent >= 0
                  ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/60'
                  : 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-zinc-200">{sec.name}</span>
                {sec.changePercent >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-rose-400" />
                )}
              </div>
              <div
                className={`text-lg font-black font-mono ${
                  sec.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {sec.changePercent >= 0 ? '+' : ''}
                {sec.changePercent}%
              </div>
              <div className="text-[10px] text-zinc-400 mt-1 flex items-center justify-between">
                <span>{sec.trackedEtfsCount} ETFs</span>
                <span className="font-mono">{sec.topEtf}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive ETF Explorer Preview Section */}
      <section id="etf-preview-section" className="px-4 sm:px-6 py-12 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>ETF EXPLORER PREVIEW</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-100">
              Discover & Compare Indian ETFs
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Search funds, inspect expense ratios, and simulate positions directly.
            </p>
          </div>

          <button
            onClick={() => {
              loginDemo();
              setActivePage('etfs');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-md shadow-emerald-500/20"
          >
            <span>Full ETF Explorer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by symbol, name, or sector (e.g. NIFTYBEES, IT, Gold)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs focus:outline-none focus:border-emerald-500/80 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {['ALL', 'EQUITY', 'SECTORAL', 'DEBT', 'COMMODITY'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-zinc-950 font-bold shadow-xs'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ETF Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {previewEtfs.slice(0, 6).map((etf) => (
            <div
              key={etf.symbol}
              className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-base text-zinc-100">
                      {etf.symbol}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {etf.category}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{etf.name}</p>
                </div>

                <div className="text-right">
                  <div className="font-mono font-black text-base text-zinc-100">
                    ₹{etf.price.toFixed(2)}
                  </div>
                  <div
                    className={`text-xs font-mono font-bold flex items-center justify-end gap-0.5 ${
                      etf.changePercent1D >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {etf.changePercent1D >= 0 ? '+' : ''}
                    {etf.changePercent1D}%
                  </div>
                </div>
              </div>

              {/* Fund Stats Mini-table */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-zinc-800/80 text-[11px]">
                <div>
                  <span className="text-zinc-400 block text-[10px]">EXPENSE</span>
                  <span className="font-mono font-bold text-zinc-200">{etf.expenseRatio}%</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">AUM</span>
                  <span className="font-mono font-bold text-zinc-200">{etf.aum}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">TRACK ERROR</span>
                  <span className="font-mono font-bold text-emerald-400">{etf.trackingError}%</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    loginDemo();
                    openEtfDetails(etf.symbol);
                  }}
                  className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  View Details & Radar
                </button>
                <button
                  onClick={() => {
                    loginDemo();
                    openEtfDetails(etf.symbol);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-zinc-950 border border-emerald-500/30 text-xs font-bold transition-all cursor-pointer"
                >
                  Paper Trade
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Showcase Grid (Features 3, 7, 1) */}
      <section id="features-section" className="px-4 sm:px-6 py-12 max-w-7xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FINTECH INTELLIGENCE</span>
          </div>
          <h2 className="text-3xl font-black text-zinc-100">
            Engineered for Modern ETF Allocation
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Smart tools that transform complex fund factsheets into actionable insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Risk Radar */}
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <PieChart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-zinc-100">5-Metric ETF Risk Radar</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Evaluates Volatility, Liquidity, Diversification, Tracking Precision, and Market Risk with dynamic radar charts and factor grades.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800 text-[11px] font-mono text-zinc-300 space-y-1">
              <div className="flex justify-between">
                <span>Volatility Score:</span>
                <span className="text-blue-400 font-bold">68 / 100</span>
              </div>
              <div className="flex justify-between">
                <span>Liquidity Score:</span>
                <span className="text-emerald-400 font-bold">82 / 100</span>
              </div>
              <div className="flex justify-between">
                <span>Diversification:</span>
                <span className="text-emerald-400 font-bold">88 / 100</span>
              </div>
            </div>
          </div>

          {/* Rebalancing Simulator */}
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-zinc-100">Rebalancing Simulator</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Input your target asset weights (e.g. 50% NIFTYBEES, 20% GOLDBEES). The engine computes exact buy/sell orders to eliminate portfolio drift.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800 text-[11px] font-mono text-zinc-300 space-y-1">
              <div className="flex justify-between">
                <span>Target vs Actual Drift:</span>
                <span className="text-amber-400 font-bold">4.2% Rebalance Needed</span>
              </div>
              <div className="flex justify-between">
                <span>Action:</span>
                <span className="text-emerald-400 font-bold">Buy 12 GOLDBEES</span>
              </div>
            </div>
          </div>

          {/* AI Assistant */}
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-zinc-100">SmartETF AI Assistant</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Ask about expense ratios, tracking errors, portfolio changes, and asset allocation concepts in beginner-friendly language with live context.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800 text-[11px] text-zinc-300 space-y-1">
              <span className="text-purple-400 font-bold block text-[10px]">SAMPLE QUERY:</span>
              <p className="italic text-zinc-400">
                &ldquo;Why did my portfolio P&L change and what is tracking error in NIFTYBEES?&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="px-4 sm:px-6 py-12 max-w-4xl mx-auto w-full space-y-6">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>ACADEMIC & DEMO FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-100">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-zinc-900/70 border border-zinc-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-900/90 transition-colors"
              >
                <span className="text-xs sm:text-sm font-bold text-zinc-200">{faq.q}</span>
                {faqOpenIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                )}
              </button>
              {faqOpenIndex === idx && (
                <div className="px-4 sm:px-5 pb-5 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="px-4 sm:px-6 py-12 max-w-5xl mx-auto w-full text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-teal-950/40 border border-emerald-500/30 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-100">
            Ready to test your ETF trading strategies?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Get instant access to ₹1,00,000 simulated capital, live analytics, and AI assistance.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => openAuthPage('signup')}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center gap-1.5"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleLaunchTerminal}
              className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs transition-colors border border-zinc-700 cursor-pointer"
            >
              Instant 1-Click Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 px-6 border-t border-zinc-900 text-center text-xs text-zinc-400 space-y-2">
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-md bg-emerald-500 flex items-center justify-center text-zinc-950 font-black text-[10px]">
            <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="font-bold text-zinc-300">Smart ETF Trader</span>
          <span>&bull;</span>
          <span>AI-Powered Educational ETF Analysis & Paper Trading</span>
        </div>
        <p className="text-[11px] text-zinc-400 max-w-xl mx-auto">
          Notice: For educational simulation, demonstration, and college project evaluation only. No real money, brokerage integrations, or guaranteed returns.
        </p>
      </footer>
    </div>
  );
};
