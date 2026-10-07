import React, { useState } from 'react';
import { Calculator, Target, TrendingUp, Sparkles, ShieldAlert, ArrowRight } from 'lucide-react';
import { GoalPlanner } from '../components/GoalPlanner';

export const CalculatorView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'SIP' | 'LUMP' | 'GOAL'>('SIP');

  // SIP Calculator State
  const [sipMonthly, setSipMonthly] = useState<number>(5000);
  const [sipCagr, setSipCagr] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);

  // Lump Sum Calculator State
  const [lumpPrincipal, setLumpPrincipal] = useState<number>(50000);
  const [lumpCagr, setLumpCagr] = useState<number>(12);
  const [lumpYears, setLumpYears] = useState<number>(10);

  // SIP Calculations
  // FV = P * [ ((1+i)^n - 1) / i ] * (1+i)
  const monthlyRate = sipCagr / 100 / 12;
  const totalMonths = sipYears * 12;
  const sipInvested = sipMonthly * totalMonths;
  let sipFutureValue = 0;
  if (monthlyRate > 0) {
    sipFutureValue = Math.round(
      sipMonthly * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate))
    );
  } else {
    sipFutureValue = sipInvested;
  }
  const sipReturns = sipFutureValue - sipInvested;

  // Lump Sum Calculations
  // FV = P * (1 + r)^n
  const lumpFutureValue = Math.round(lumpPrincipal * Math.pow(1 + lumpCagr / 100, lumpYears));
  const lumpReturns = lumpFutureValue - lumpPrincipal;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-100">
              Investment Calculators & Goals
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              COMPOUNDING
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Educational tools to model SIP compounding, lump-sum trajectories, and milestone goal plans.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-900 border border-zinc-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('SIP')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'SIP' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            SIP Calculator
          </button>
          <button
            onClick={() => setActiveTab('LUMP')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'LUMP' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Lump Sum
          </button>
          <button
            onClick={() => setActiveTab('GOAL')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'GOAL' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Goal Planner (New)
          </button>
        </div>
      </div>

      {/* Feature 8: Goal Planner Tab */}
      {activeTab === 'GOAL' && <GoalPlanner />}

      {/* SIP Calculator Tab */}
      {activeTab === 'SIP' && (
        <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold text-sm text-zinc-100">Systematic Investment Plan (SIP) Compounding</h4>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Input Sliders */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="flex justify-between text-xs text-zinc-300 mb-1.5 font-semibold">
                  <span>Monthly Investment</span>
                  <span className="font-mono text-emerald-400">₹{sipMonthly.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={sipMonthly}
                  onChange={(e) => setSipMonthly(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-300 mb-1.5 font-semibold">
                  <span>Expected Annual Return (CAGR)</span>
                  <span className="font-mono text-emerald-400">{sipCagr}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="0.5"
                  value={sipCagr}
                  onChange={(e) => setSipCagr(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-300 mb-1.5 font-semibold">
                  <span>Time Horizon</span>
                  <span className="font-mono text-emerald-400">{sipYears} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  step="1"
                  value={sipYears}
                  onChange={(e) => setSipYears(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Results Card */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="space-y-1">
                <span className="text-xs text-zinc-400">Projected Total Future Value</span>
                <div className="text-3xl font-black font-mono text-emerald-400">
                  ₹{sipFutureValue.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800 text-xs">
                <div>
                  <span className="text-zinc-400">Invested Capital</span>
                  <p className="font-mono font-bold text-zinc-200 text-base">
                    ₹{sipInvested.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <span className="text-zinc-400">Estimated Wealth Gain</span>
                  <p className="font-mono font-bold text-emerald-400 text-base">
                    +₹{sipReturns.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-850 text-[10px] text-zinc-400">
                Over {sipYears} years, regular compounding turns ₹{sipInvested.toLocaleString('en-IN')} into ₹{sipFutureValue.toLocaleString('en-IN')}.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lump Sum Calculator Tab */}
      {activeTab === 'LUMP' && (
        <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold text-sm text-zinc-100">One-Time Lump Sum Compounding</h4>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="flex justify-between text-xs text-zinc-300 mb-1.5 font-semibold">
                  <span>Total Investment Amount</span>
                  <span className="font-mono text-emerald-400">₹{lumpPrincipal.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="1000000"
                  step="5000"
                  value={lumpPrincipal}
                  onChange={(e) => setLumpPrincipal(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-300 mb-1.5 font-semibold">
                  <span>Expected Annual Return (CAGR)</span>
                  <span className="font-mono text-emerald-400">{lumpCagr}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="0.5"
                  value={lumpCagr}
                  onChange={(e) => setLumpCagr(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-300 mb-1.5 font-semibold">
                  <span>Time Horizon</span>
                  <span className="font-mono text-emerald-400">{lumpYears} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  step="1"
                  value={lumpYears}
                  onChange={(e) => setLumpYears(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="lg:col-span-6 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="space-y-1">
                <span className="text-xs text-zinc-400">Future Value</span>
                <div className="text-3xl font-black font-mono text-emerald-400">
                  ₹{lumpFutureValue.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800 text-xs">
                <div>
                  <span className="text-zinc-400">Initial Principal</span>
                  <p className="font-mono font-bold text-zinc-200 text-base">
                    ₹{lumpPrincipal.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <span className="text-zinc-400">Capital Growth</span>
                  <p className="font-mono font-bold text-emerald-400 text-base">
                    +₹{lumpReturns.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
