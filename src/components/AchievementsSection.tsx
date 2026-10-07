import React from 'react';
import { Trophy, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { useTrading } from '../context/TradingContext';

export const AchievementsSection: React.FC = () => {
  const { achievements } = useTrading();

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const progressRatio = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-base text-zinc-100">Trading Badges & Achievements</h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
              {unlockedCount} / {achievements.length} Unlocked
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Learn ETF investing habits and earn badges through simulated market activities.
          </p>
        </div>

        {/* Overall progress bar */}
        <div className="w-full sm:w-48 space-y-1">
          <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
            <span>Progress</span>
            <span className="font-bold text-amber-400">{progressRatio}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressRatio}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {achievements.map((ach) => {
          const isUnlocked = ach.unlocked;
          return (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all ${
                isUnlocked
                  ? 'bg-zinc-900/90 border-amber-500/30 shadow-md shadow-amber-500/5'
                  : 'bg-zinc-950/40 border-zinc-850 opacity-70'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-2xl shadow-inner">
                  {ach.icon}
                </div>
                {isUnlocked ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> Unlocked
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
              </div>

              <div>
                <h5 className="font-bold text-sm text-zinc-100 mb-1">{ach.title}</h5>
                <p className="text-xs text-zinc-400 leading-snug mb-3">{ach.description}</p>
              </div>

              {/* Progress counter */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                  <span>Progress</span>
                  <span>
                    {ach.progress} / {ach.maxProgress}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-zinc-950 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isUnlocked ? 'bg-amber-400' : 'bg-zinc-700'
                    }`}
                    style={{
                      width: `${Math.min(100, (ach.progress / ach.maxProgress) * 100)}%`
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
