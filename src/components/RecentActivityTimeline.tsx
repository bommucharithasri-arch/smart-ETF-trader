import React from 'react';
import {
  Clock,
  Sparkles,
  Bookmark,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';

interface ActivityItem {
  id: string;
  time: string;
  dateGroup: 'Today' | 'Yesterday';
  title: string;
  type: 'BUY' | 'SELL' | 'WATCHLIST' | 'AI' | 'ACHIEVEMENT';
  details?: string;
}

export const RecentActivityTimeline: React.FC = () => {
  const { orders, watchlist, notifications, achievements } = useTrading();

  // Synthesize realistic activities from orders and watchlist
  const activities: ActivityItem[] = [];

  // Add recent orders
  orders.forEach((o) => {
    const isToday = o.timestamp.includes('Today');
    activities.push({
      id: `act-ord-${o.id}`,
      time: o.timestamp.replace('Today, ', '').replace('Yesterday, ', ''),
      dateGroup: isToday ? 'Today' : 'Yesterday',
      title: `${o.type === 'BUY' ? 'Bought' : 'Sold'} ${o.quantity} ${o.symbol}`,
      type: o.type,
      details: `@ ₹${o.price.toFixed(2)} (${o.id})`
    });
  });

  // Add watchlist items
  watchlist.slice(0, 2).forEach((w, idx) => {
    activities.push({
      id: `act-wl-${w.id}`,
      time: idx === 0 ? '09:20 AM' : 'Yesterday, 04:15 PM',
      dateGroup: idx === 0 ? 'Today' : 'Yesterday',
      title: `Added ${w.symbol} to Watchlist`,
      type: 'WATCHLIST',
      details: 'AI volatility tracking enabled'
    });
  });

  // Add an AI analysis event
  activities.push({
    id: 'act-ai-today',
    time: '08:50 AM',
    dateGroup: 'Today',
    title: 'AI Market Momentum updated',
    type: 'AI',
    details: 'IT & Metals relative strength flagged'
  });

  // Group by Today vs Yesterday
  const todayItems = activities.filter((a) => a.dateGroup === 'Today');
  const yesterdayItems = activities.filter((a) => a.dateGroup === 'Yesterday');

  const renderIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'BUY':
        return (
          <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        );
      case 'SELL':
        return (
          <div className="w-7 h-7 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center flex-shrink-0">
            <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        );
      case 'WATCHLIST':
        return (
          <div className="w-7 h-7 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
            <Bookmark className="w-3.5 h-3.5" />
          </div>
        );
      case 'AI':
        return (
          <div className="w-7 h-7 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        );
      default:
        return (
          <div className="w-7 h-7 rounded-xl bg-zinc-800 text-zinc-300 flex items-center justify-center flex-shrink-0">
            <Clock className="w-3.5 h-3.5" />
          </div>
        );
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-zinc-100">Recent Activity Timeline</h4>
            <p className="text-[11px] text-zinc-400">Chronological paper trading events</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* TODAY GROUP */}
        <div>
          <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-3">
            Today
          </div>
          <div className="space-y-3 relative pl-3 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-800">
            {todayItems.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                {renderIcon(item.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-zinc-200 truncate">{item.title}</p>
                    <span className="text-[10px] font-mono text-zinc-400 flex-shrink-0 ml-2">
                      {item.time}
                    </span>
                  </div>
                  {item.details && (
                    <p className="text-[11px] text-zinc-400 leading-snug">{item.details}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* YESTERDAY GROUP */}
        {yesterdayItems.length > 0 && (
          <div>
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-3">
              Yesterday
            </div>
            <div className="space-y-3 relative pl-3 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-800">
              {yesterdayItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  {renderIcon(item.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-zinc-200 truncate">{item.title}</p>
                      <span className="text-[10px] font-mono text-zinc-400 flex-shrink-0 ml-2">
                        {item.time}
                      </span>
                    </div>
                    {item.details && (
                      <p className="text-[11px] text-zinc-400 leading-snug">{item.details}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
