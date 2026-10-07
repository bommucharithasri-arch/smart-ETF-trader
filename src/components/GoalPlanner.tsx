import React, { useState } from 'react';
import { Target, Sparkles, Calendar, DollarSign, ShieldAlert, ArrowRight } from 'lucide-react';

export const GoalPlanner: React.FC = () => {
  const [goalName, setGoalName] = useState('New Laptop / Tech Rig');
  const [targetAmount, setTargetAmount] = useState<number>(100000);
  const [currentAmount, setCurrentAmount] = useState<number>(35000);
  const [targetMonths, setTargetMonths] = useState<number>(12);
  const [expectedCagr, setExpectedCagr] = useState<number>(11); // 11% estimated ETF return

  // Calculations
  const progressPercent = targetAmount > 0 ? Math.min(100, Math.round((currentAmount / targetAmount) * 100)) : 0;
  const remainingAmount = Math.max(0, targetAmount - currentAmount);

  // Future Value monthly SIP formula:
  // With monthly return r = (expectedCagr / 100) / 12
  // If r > 0: Required Monthly = (FV - PV * (1+r)^n) / [ ((1+r)^n - 1) / r * (1+r) ]
  // Fallback linear: remainingAmount / targetMonths
  const r = (expectedCagr / 100) / 12;
  const n = Math.max(1, targetMonths);
  const futureCurrentValue = currentAmount * Math.pow(1 + r, n);
  const neededFromSip = Math.max(0, targetAmount - futureCurrentValue);

  let monthlyContribution = 0;
  if (neededFromSip <= 0) {
    monthlyContribution = 0;
  } else if (r > 0) {
    const annuityFactor = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    monthlyContribution = Math.round(neededFromSip / annuityFactor);
  } else {
    monthlyContribution = Math.round(neededFromSip / n);
  }

  // Linear baseline without compounding
  const linearMonthly = Math.round(remainingAmount / n);

  return (
    <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-base text-zinc-100">Smart Goal Planner</h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              Educational Model
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Calculate your disciplined monthly ETF accumulation pace towards personal financial milestones.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Goal Name</label>
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="e.g. Laptop, Emergency Cushion, Higher Ed"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-zinc-300 mb-1 font-semibold">
              <span>Target Amount (₹)</span>
              <span className="font-mono text-emerald-400">₹{targetAmount.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="number"
              min="5000"
              step="5000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Math.max(1000, parseInt(e.target.value) || 0))}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-zinc-300 mb-1 font-semibold">
              <span>Current Savings (₹)</span>
              <span className="font-mono text-zinc-300">₹{currentAmount.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="number"
              min="0"
              step="1000"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Timeline</label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={targetMonths}
                  onChange={(e) => setTargetMonths(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-100 focus:outline-none focus:border-emerald-500"
                />
                <span className="text-xs text-zinc-400 font-mono">mo</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Est. ETF Return</label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="0"
                  max="25"
                  value={expectedCagr}
                  onChange={(e) => setExpectedCagr(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-100 focus:outline-none focus:border-emerald-500"
                />
                <span className="text-xs text-zinc-400 font-mono">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress & Milestone Output Card */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-300">{goalName || 'Goal Milestone'}</span>
              <span className="text-xs font-mono font-bold text-emerald-400">{progressPercent}% Funded</span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-3 rounded-full bg-zinc-950 border border-zinc-800 p-0.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-850">
                <span className="text-[10px] text-zinc-400">Current Saved</span>
                <p className="font-mono font-bold text-xs sm:text-sm text-zinc-200 mt-0.5">
                  ₹{currentAmount.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-850">
                <span className="text-[10px] text-zinc-400">Remaining</span>
                <p className="font-mono font-bold text-xs sm:text-sm text-rose-300 mt-0.5">
                  ₹{remainingAmount.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-850">
                <span className="text-[10px] text-zinc-400">Time Left</span>
                <p className="font-mono font-bold text-xs sm:text-sm text-zinc-200 mt-0.5">
                  {targetMonths} Months
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Required Highlight */}
          <div className="p-4 rounded-2xl bg-zinc-950/90 border border-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-300">
                Estimated Monthly Contribution
              </span>
              <span className="text-lg font-black font-mono text-emerald-400">
                ₹{monthlyContribution.toLocaleString('en-IN')}{' '}
                <span className="text-xs text-zinc-400 font-normal">/ mo</span>
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Based on monthly compounding formula at an estimated {expectedCagr}% annual growth in diversified index ETFs (e.g. NIFTYBEES + GOLDBEES). (Without compounding: ₹{linearMonthly.toLocaleString('en-IN')}/mo).
            </p>
          </div>

          {/* Disclaimer */}
          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-850 text-[10px] text-zinc-400 flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>
              <strong>Educational planning tool only</strong> — returns are not guaranteed. Actual market returns fluctuate.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
