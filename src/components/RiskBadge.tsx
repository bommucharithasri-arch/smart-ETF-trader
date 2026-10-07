import React from 'react';
import { Shield, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';
import { RiskLevel } from '../types';

interface RiskBadgeProps {
  level: RiskLevel;
  score?: number;
  explanation?: string;
  variant?: 'pill' | 'pill-with-score' | 'detailed' | 'compact';
  showDisclaimer?: boolean;
}

export const getRiskMeta = (level: RiskLevel) => {
  switch (level) {
    case 'LOW':
      return {
        label: 'Low',
        badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        textClass: 'text-emerald-400',
        bgClass: 'bg-emerald-500/20',
        borderClass: 'border-emerald-500/30',
        icon: ShieldCheck,
        defaultScore: 32,
        defaultExplanation: 'Lower historical price volatility and defensive asset cushioning.'
      };
    case 'HIGH':
      return {
        label: 'High',
        badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
        textClass: 'text-rose-400',
        bgClass: 'bg-rose-500/20',
        borderClass: 'border-rose-500/30',
        icon: ShieldAlert,
        defaultScore: 78,
        defaultExplanation: 'Elevated price movement variability, sector concentration or higher cyclical sensitivity.'
      };
    case 'MEDIUM':
    default:
      return {
        label: 'Medium',
        badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        textClass: 'text-amber-400',
        bgClass: 'bg-amber-500/20',
        borderClass: 'border-amber-500/30',
        icon: AlertTriangle,
        defaultScore: 68,
        defaultExplanation: 'Moderate volatility and market exposure based on the available project data.'
      };
  }
};

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  score,
  explanation,
  variant = 'pill',
  showDisclaimer = false
}) => {
  const meta = getRiskMeta(level);
  const Icon = meta.icon;
  const currentScore = score !== undefined ? score : meta.defaultScore;
  const currentExplanation = explanation || meta.defaultExplanation;

  if (variant === 'compact') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${meta.badgeClass}`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            level === 'LOW' ? 'bg-emerald-400' : level === 'HIGH' ? 'bg-rose-400' : 'bg-amber-400'
          }`}
        />
        {level}
      </span>
    );
  }

  if (variant === 'pill') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wide border ${meta.badgeClass}`}
      >
        <Icon className="w-3.5 h-3.5" />
        <span>Risk: {level}</span>
      </span>
    );
  }

  if (variant === 'pill-with-score') {
    return (
      <div className="inline-flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wide border ${meta.badgeClass}`}
        >
          <Icon className="w-3 h-3" />
          <span>{level}</span>
        </span>
        <span className="text-[11px] font-mono font-bold text-zinc-400">
          Score: <span className={meta.textClass}>{currentScore}</span>
          <span className="text-zinc-600">/100</span>
        </span>
      </div>
    );
  }

  // Detailed block for Trade Modal, Order Review, and ETF details
  return (
    <div
      className={`p-3.5 rounded-2xl border ${meta.bgClass} ${meta.borderClass} space-y-2`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${meta.textClass}`} />
          <span className="text-xs font-bold text-zinc-200">
            RISK LEVEL:{' '}
            <span className={`font-mono uppercase font-black ${meta.textClass}`}>{level}</span>
          </span>
        </div>
        <div className="text-xs font-mono font-bold text-zinc-300">
          RISK SCORE:{' '}
          <span className={`${meta.textClass}`}>{currentScore}</span>
          <span className="text-zinc-500"> / 100</span>
        </div>
      </div>

      <p className="text-xs text-zinc-300 leading-relaxed font-normal">
        "{currentExplanation}"
      </p>

      {showDisclaimer && (
        <p className="text-[10px] text-zinc-400 pt-1 border-t border-zinc-800/80 italic">
          *Informational demo indicator. Does not represent a regulated rating or guaranteed safety.
        </p>
      )}
    </div>
  );
};
