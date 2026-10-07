import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Bookmark,
  Share2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  PieChart,
  Bot
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { RiskRadarChart } from '../components/RiskRadarChart';
import { ETFS_DATA } from '../data/mockData';

export const EtfDetailsView: React.FC = () => {
  const {
    selectedEtfSymbol,
    openTradeModal,
    addToWatchlist,
    watchlist,
    setActivePage,
    addRecentlyViewed
  } = useTrading();

  const [activeTimeframe, setActiveTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | '5Y'>('1D');

  const etf = ETFS_DATA.find((e) => e.symbol === selectedEtfSymbol) || ETFS_DATA[0];
  const isPos = etf.changePercent1D >= 0;
  const inWatchlist = watchlist.some((w) => w.symbol === etf.symbol);

  // Track in recently viewed on mount or symbol change (Feature 11)
  useEffect(() => {
    addRecentlyViewed(etf.symbol);
  }, [etf.symbol, addRecentlyViewed]);

  const chartPoints = etf.historicalPrices[activeTimeframe] || etf.historicalPrices['1D'];
  const minPrice = Math.min(...chartPoints.map((p) => p.price));
  const maxPrice = Math.max(...chartPoints.map((p) => p.price));
  const priceRange = maxPrice - minPrice || 1;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActivePage('etfs')}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to ETF Explorer</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => addToWatchlist(etf.symbol)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
              inWatchlist
                ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-zinc-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{inWatchlist ? 'Watchlisted' : 'Add to Watchlist'}</span>
          </button>
        </div>
      </div>

      {/* ETF Hero Card */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 shadow-inner flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-100">{etf.symbol}</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-zinc-900 text-zinc-300 border border-zinc-800">
              {etf.sector}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              NSE Live
            </span>
          </div>
          <p className="text-sm text-zinc-300 font-medium">{etf.name}</p>
          <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">{etf.description}</p>
        </div>

        {/* Live Price & Trade CTAs */}
        <div className="flex flex-col items-start md:items-end justify-between gap-3 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 min-w-[220px]">
          <div>
            <div className="text-[10px] text-zinc-400 uppercase font-mono">Market Price</div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-zinc-100">
              ₹{etf.price.toFixed(2)}
            </div>
            <div
              className={`text-xs font-mono font-bold flex items-center gap-0.5 ${
                isPos ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {isPos ? <ArrowUpRight className="w-4 h-4 stroke-[2.5]" /> : <ArrowDownRight className="w-4 h-4 stroke-[2.5]" />}
              <span>
                {isPos ? '+' : ''}{etf.changePercent1D.toFixed(2)}% (₹{isPos ? '+' : ''}{etf.change1D.toFixed(2)})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full pt-2">
            <button
              onClick={() => openTradeModal('BUY', etf.symbol)}
              className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer text-center"
            >
              Paper Buy
            </button>
            <button
              onClick={() => openTradeModal('SELL', etf.symbol)}
              className="flex-1 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-rose-500/20 active:scale-95 cursor-pointer text-center"
            >
              Paper Sell
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Price Chart with Timeframes */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div>
            <h4 className="font-bold text-sm text-zinc-100">Historical Price Trend</h4>
            <p className="text-[11px] text-zinc-400">High-fidelity secondary market quotes</p>
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
            {(['1D', '1W', '1M', '1Y', '5Y'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setActiveTimeframe(tf)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
                  activeTimeframe === tf
                    ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Sparkline / Area Chart */}
        <div className="h-56 w-full pt-4 relative">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 160">
            <defs>
              <linearGradient id="etfGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Render Area & Line */}
            {(() => {
              const count = chartPoints.length;
              const coords = chartPoints.map((pt, i) => {
                const x = (i / (count - 1)) * 500;
                const normalized = (pt.price - minPrice) / priceRange;
                const y = 140 - normalized * 110;
                return { x, y, pt };
              });

              const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
              const areaPath = `${linePath} L 500 160 L 0 160 Z`;

              return (
                <>
                  <path d={areaPath} fill="url(#etfGradient)" />
                  <path d={linePath} fill="none" stroke="#10b981" strokeWidth="2.5" />
                  {coords.map((c, i) => (
                    <circle
                      key={i}
                      cx={c.x}
                      cy={c.y}
                      r="3.5"
                      fill="#10b981"
                      stroke="#09090b"
                      strokeWidth="2"
                    />
                  ))}
                </>
              );
            })()}
          </svg>

          {/* Time axis labels */}
          <div className="flex justify-between text-[10px] font-mono text-zinc-400 pt-2 border-t border-zinc-900 mt-2">
            {chartPoints.map((p, i) => (
              <span key={i}>{p.date}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Feature 3: ETF Risk Radar Section (Mandatory Requirement) */}
      <RiskRadarChart scores={etf.riskRadar} symbol={etf.symbol} />

      {/* Two Column: "Why This ETF" and "AI Analysis" */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Why This ETF */}
        <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold text-sm text-zinc-100">Why This ETF?</h4>
          </div>

          <div className="space-y-3">
            {etf.whyThisETF.map((point, index) => (
              <div key={index} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span>{point}</span>
              </div>
            ))}
          </div>

          {/* Key Fundamentals Grid */}
          <div className="pt-4 border-t border-zinc-900 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
            <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-400 font-sans">Expense Ratio</span>
              <p className="font-bold text-emerald-400 mt-0.5">{etf.expenseRatio}%</p>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-400 font-sans">Tracking Error</span>
              <p className="font-bold text-zinc-200 mt-0.5">{etf.trackingError}%</p>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-400 font-sans">52W High</span>
              <p className="font-bold text-zinc-200 mt-0.5">₹{etf.high52W.toFixed(1)}</p>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-400 font-sans">52W Low</span>
              <p className="font-bold text-zinc-200 mt-0.5">₹{etf.low52W.toFixed(1)}</p>
            </div>
          </div>
        </div>

        {/* AI Analysis Card */}
        <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-400" />
                <h4 className="font-bold text-sm text-zinc-100">SmartETF AI Rating</h4>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {etf.aiInsight.rating}
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              {etf.aiInsight.summary}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                <span className="font-bold text-emerald-400 text-[11px]">Primary Catalysts:</span>
                <ul className="list-disc list-inside text-[11px] text-zinc-300 space-y-1">
                  {etf.aiInsight.pros.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-1">
                <span className="font-bold text-rose-400 text-[11px]">Monitored Risks:</span>
                <ul className="list-disc list-inside text-[11px] text-zinc-300 space-y-1">
                  {etf.aiInsight.risks.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-900 text-[10px] text-zinc-400 flex items-center justify-between">
            <span>Powered by SmartETF Machine Learning Pipeline</span>
            <span className="text-zinc-400">Educational Simulation</span>
          </div>
        </div>
      </div>

      {/* Top Holdings Breakdown */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold text-sm text-zinc-100">Top Constituent Holdings</h4>
          </div>
          <span className="text-xs text-zinc-400 font-mono">Portfolio Weight %</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {etf.topHoldings.map((holding) => (
            <div
              key={holding.name}
              className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between"
            >
              <span className="text-xs font-semibold text-zinc-200 truncate pr-2">
                {holding.name}
              </span>
              <span className="font-mono font-bold text-xs text-emerald-400">
                {holding.weight}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
