import React from 'react';
import { Download, FileSpreadsheet, FileJson, FileText, CheckCircle2 } from 'lucide-react';
import { useTrading } from '../context/TradingContext';

export const DataExportCenter: React.FC = () => {
  const { holdings, orders, watchlist, virtualCash, user, showToast } = useTrading();

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`, 'success');
  };

  // 1. Export Portfolio
  const exportPortfolio = (format: 'csv' | 'json') => {
    const filename = `smart_etf_portfolio_${Date.now()}.${format}`;
    if (format === 'json') {
      const data = {
        exportedAt: new Date().toISOString(),
        user: user?.name,
        virtualCash,
        holdings
      };
      downloadFile(JSON.stringify(data, null, 2), filename, 'application/json');
    } else {
      const headers = ['Symbol', 'ETF Name', 'Quantity', 'Avg Buy Price (INR)', 'Current Price (INR)', 'Invested Amount', 'Current Value', 'Total P&L', 'P&L %'];
      const rows = holdings.map((h) => [
        h.symbol,
        `"${h.etfName}"`,
        h.quantity,
        h.avgBuyPrice,
        h.currentPrice,
        h.investedAmount,
        h.currentValue,
        h.totalPnl,
        `${h.totalPnlPercent.toFixed(2)}%`
      ]);
      const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      downloadFile(csv, filename, 'text/csv');
    }
  };

  // 2. Export Orders
  const exportOrders = (format: 'csv' | 'json') => {
    const filename = `smart_etf_orders_${Date.now()}.${format}`;
    if (format === 'json') {
      downloadFile(JSON.stringify(orders, null, 2), filename, 'application/json');
    } else {
      const headers = ['Order ID', 'Symbol', 'Type', 'Quantity', 'Price (INR)', 'Total Amount (INR)', 'Timestamp', 'Status'];
      const rows = orders.map((o) => [
        o.id,
        o.symbol,
        o.type,
        o.quantity,
        o.price,
        o.totalAmount,
        `"${o.timestamp}"`,
        o.status
      ]);
      const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      downloadFile(csv, filename, 'text/csv');
    }
  };

  // 3. Export Watchlist
  const exportWatchlist = (format: 'csv' | 'json') => {
    const filename = `smart_etf_watchlist_${Date.now()}.${format}`;
    if (format === 'json') {
      downloadFile(JSON.stringify(watchlist, null, 2), filename, 'application/json');
    } else {
      const headers = ['Symbol', 'ETF Name', 'Current Price (INR)', '1D Change %', 'AI Alerts Enabled', 'Added At'];
      const rows = watchlist.map((w) => [
        w.symbol,
        `"${w.etfName}"`,
        w.price,
        `${w.changePercent}%`,
        w.aiAlertsEnabled ? 'Yes' : 'No',
        `"${w.addedAt}"`
      ]);
      const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      downloadFile(csv, filename, 'text/csv');
    }
  };

  // 4. Export Comprehensive Trading Report
  const exportTradingReport = (format: 'csv' | 'json') => {
    const filename = `smart_etf_trading_report_${Date.now()}.${format}`;
    const totalTrades = orders.length;
    const buyTrades = orders.filter((o) => o.type === 'BUY').length;
    const sellTrades = orders.filter((o) => o.type === 'SELL').length;
    const tradingValue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const holdingsVal = holdings.reduce((sum, h) => sum + h.currentValue, 0);
    const currentPortfolioValue = holdingsVal + virtualCash;
    const totalPnl = holdings.reduce((sum, h) => sum + h.totalPnl, 0);

    const reportObj = {
      reportTitle: 'Smart ETF Trader — Educational Trading Report',
      user: user?.name || 'Demo Investor',
      generatedDate: new Date().toLocaleString('en-IN'),
      totalTrades,
      buyTrades,
      sellTrades,
      tradingVolumeINR: tradingValue,
      currentPortfolioValueINR: currentPortfolioValue,
      virtualCashBalanceINR: virtualCash,
      totalPnlINR: totalPnl,
      activePositionsCount: holdings.length,
      disclaimer: 'Generated from Smart ETF Trader paper-trading simulation. Zero real-money value.'
    };

    if (format === 'json') {
      downloadFile(JSON.stringify(reportObj, null, 2), filename, 'application/json');
    } else {
      const lines = [
        'Report Field,Value',
        `User,${reportObj.user}`,
        `Generated Date,"${reportObj.generatedDate}"`,
        `Total Trades,${reportObj.totalTrades}`,
        `Buy Trades,${reportObj.buyTrades}`,
        `Sell Trades,${reportObj.sellTrades}`,
        `Trading Volume (INR),${reportObj.tradingVolumeINR}`,
        `Current Portfolio Value (INR),${reportObj.currentPortfolioValueINR}`,
        `Virtual Cash (INR),${reportObj.virtualCashBalanceINR}`,
        `Total P&L (INR),${reportObj.totalPnlINR}`,
        `Active Positions,${reportObj.activePositionsCount}`,
        `Disclaimer,"${reportObj.disclaimer}"`
      ];
      downloadFile(lines.join('\n'), filename, 'text/csv');
    }
  };

  const exportCards = [
    {
      title: 'Portfolio Holdings',
      desc: 'Active positions, purchase price, current NAV, and unrealized gains.',
      onCsv: () => exportPortfolio('csv'),
      onJson: () => exportPortfolio('json')
    },
    {
      title: 'Orders History',
      desc: 'Full log of simulated BUY and SELL orders with timestamps.',
      onCsv: () => exportOrders('csv'),
      onJson: () => exportOrders('json')
    },
    {
      title: 'Watchlist Items',
      desc: 'Tracked ETFs, alert thresholds, and current pricing data.',
      onCsv: () => exportWatchlist('csv'),
      onJson: () => exportWatchlist('json')
    },
    {
      title: 'Comprehensive Trading Report',
      desc: 'Executive summary with win rate, trading volume, portfolio valuation and P&L.',
      onCsv: () => exportTradingReport('csv'),
      onJson: () => exportTradingReport('json'),
      highlight: true
    }
  ];

  return (
    <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-base text-zinc-100">Data Export Center</h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              CSV & JSON
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Export all simulated records for external analysis, college project submissions, or record-keeping.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {exportCards.map((c) => (
          <div
            key={c.title}
            className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
              c.highlight
                ? 'bg-zinc-900/90 border-emerald-500/30 shadow-md shadow-emerald-500/5'
                : 'bg-zinc-900/50 border-zinc-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <h5 className="font-bold text-xs sm:text-sm text-zinc-100">{c.title}</h5>
                {c.highlight && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                    Executive
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 leading-snug">{c.desc}</p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-zinc-850">
              <button
                onClick={c.onCsv}
                className="flex-1 py-1.5 px-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>CSV</span>
              </button>
              <button
                onClick={c.onJson}
                className="flex-1 py-1.5 px-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileJson className="w-3.5 h-3.5 text-blue-400" />
                <span>JSON</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
