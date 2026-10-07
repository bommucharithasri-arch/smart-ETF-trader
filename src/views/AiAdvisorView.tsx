import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Compass,
  CheckCircle2,
  RefreshCw,
  Zap,
  HelpCircle
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';

export const AiAdvisorView: React.FC = () => {
  const { openEtfDetails, setIsAiDrawerOpen, holdings, virtualCash } = useTrading();

  const topPicks = [
    {
      symbol: 'ITBEES',
      rationale: 'Generative AI enterprise workload migrations and rate easing cycles reviving discretionary IT capex.',
      horizon: '6–12 Months',
      risk: 'Moderate',
      allocationSuggestion: '20% Tactical Satellite'
    },
    {
      symbol: 'GOLDBEES',
      rationale: 'Structural central bank bullion accumulation and currency preservation amidst macro uncertainties.',
      horizon: '12–24 Months',
      risk: 'Low to Moderate',
      allocationSuggestion: '15% Defensive Hedge'
    },
    {
      symbol: 'NIFTYBEES',
      rationale: 'Core compounding anchor tracking India’s top 50 high-ROE corporate enterprises with ultra-low 0.04% expense.',
      horizon: '3+ Years',
      risk: 'Moderate',
      allocationSuggestion: '45% Foundational Core'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-100">
              SmartETF AI Advisor
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
              MACHINE REASONING
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Educational algorithmic market outlook, asset allocation suggestions, and portfolio diagnostics.
          </p>
        </div>

        <button
          onClick={() => setIsAiDrawerOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Bot className="w-4 h-4" />
          <span>Launch AI Chat Assistant</span>
        </button>
      </div>

      {/* Macro Outlook Card */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="font-bold text-base text-zinc-100">Macro Market Outlook</h3>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400">
            Algorithmic Confidence: 84%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Constructive Bullish
              </span>
              <span className="text-xs text-zinc-400">Macro Phase: Expansionary Transition</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Domestic retail systematic investment inflows remain at historic highs, cushioning equity corrections.
              Technology and metals are currently exhibiting accelerating momentum divergence, while banking consolidation provides favorable entry valuations.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs">
            <span className="font-bold text-zinc-200">Recommended Allocation Blueprint</span>
            <div className="space-y-1 text-zinc-300 font-mono text-[11px]">
              <div className="flex justify-between">
                <span>Core Equities (NIFTYBEES)</span>
                <span className="text-emerald-400">50%</span>
              </div>
              <div className="flex justify-between">
                <span>Thematic Sector (ITBEES)</span>
                <span className="text-emerald-400">20%</span>
              </div>
              <div className="flex justify-between">
                <span>Precious Metals (GOLDBEES)</span>
                <span className="text-amber-400">15%</span>
              </div>
              <div className="flex justify-between">
                <span>Liquid Buffer (LIQUIDBEES)</span>
                <span className="text-blue-400">15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Top ETF Picks of the Day */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-zinc-100 flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>Daily ETF High-Conviction Selections</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPicks.map((pick) => (
            <div
              key={pick.symbol}
              className="p-5 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 hover:border-emerald-500/30 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-black text-lg text-zinc-100">{pick.symbol}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {pick.risk} Risk
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mb-3">{pick.rationale}</p>

                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-850 space-y-1 text-[11px]">
                  <div className="flex justify-between text-zinc-400">
                    <span>Horizon:</span>
                    <span className="font-bold text-zinc-200">{pick.horizon}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Role:</span>
                    <span className="font-bold text-emerald-400">{pick.allocationSuggestion}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openEtfDetails(pick.symbol)}
                className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs transition-colors cursor-pointer text-center"
              >
                Inspect Details & Risk Radar →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Health Diagnostic */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
        <h4 className="font-bold text-sm text-zinc-100 flex items-center gap-2">
          <Bot className="w-4 h-4 text-purple-400" />
          <span>AI Diagnostic on Your Current Paper Portfolio</span>
        </h4>
        <p className="text-xs text-zinc-400 leading-relaxed">
          You currently hold {holdings.length} assets with ₹{virtualCash.toLocaleString('en-IN')} uninvested virtual cash.
          Your expense ratio drag is well-controlled (&lt;0.12% weighted average).
          Consider adding an allocation to <strong>GOLDBEES</strong> if you wish to buffer against upcoming quarterly volatility.
        </p>

        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={() => setIsAiDrawerOpen(true)}
            className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span>Ask AI: "Why did my portfolio P&L change?"</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Educational Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-850 text-[11px] text-zinc-400 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
        <span>
          <strong>Simulated Model Output:</strong> The AI Advisor uses statistical heuristics and educational LLM reasoning. It does not provide SEBI-registered individualized financial advice.
        </span>
      </div>
    </div>
  );
};
