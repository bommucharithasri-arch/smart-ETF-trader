import React from 'react';
import {
  Settings,
  User,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Download,
  Activity,
  Palette,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { ApiHealthMonitor } from '../components/ApiHealthMonitor';
import { DataExportCenter } from '../components/DataExportCenter';

export const SettingsView: React.FC = () => {
  const {
    user,
    virtualCash,
    initialCash,
    restartOnboarding,
    showToast
  } = useTrading();

  const handleResetPaperCash = () => {
    showToast('Simulated portfolio reset to ₹1,00,000 virtual balance.', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-100">
              Settings & Preferences
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              CONTROL PANEL
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Manage your paper trading preferences, run health diagnostics, and export analytical data.
          </p>
        </div>

        <button
          onClick={restartOnboarding}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Restart Guided Tour</span>
        </button>
      </div>

      {/* User & Sandbox Profile Card */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-zinc-950 font-black text-base flex items-center justify-center">
              {user?.name ? user.name[0] : 'A'}
            </div>
            <div>
              <h4 className="font-bold text-sm text-zinc-100">{user?.name || 'Arjun Mehta'}</h4>
              <p className="text-xs text-zinc-400">{user?.email || 'arjun.demo@smartetf.app'}</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Paper Trader Pro
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
            <span className="text-zinc-400 text-[10px]">Virtual Margin Balance</span>
            <p className="font-mono font-bold text-base text-emerald-400 mt-0.5">
              ₹{virtualCash.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
            <span className="text-zinc-400 text-[10px]">Execution Mode</span>
            <p className="font-bold text-zinc-200 mt-0.5">Simulated / Zero Risk</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
            <span className="text-zinc-400 text-[10px]">Theme Engine</span>
            <p className="font-bold text-zinc-200 mt-0.5">Fintech Dark Onyx</p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs">
          <span className="text-zinc-400 text-[11px]">
            Need a fresh start? Reset your virtual balance back to ₹1,00,000 anytime.
          </span>
          <button
            onClick={handleResetPaperCash}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
            <span>Reset Demo Cash</span>
          </button>
        </div>
      </div>

      {/* Feature 17: Data Export Center (CSV & JSON) */}
      <DataExportCenter />

      {/* Feature 16: API Health Monitor */}
      <ApiHealthMonitor />
    </div>
  );
};
