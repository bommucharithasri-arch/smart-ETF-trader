import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

interface RiskScores {
  volatility: number;
  liquidity: number;
  diversification: number;
  tracking: number;
  marketRisk: number;
}

interface RiskRadarChartProps {
  scores: RiskScores;
  symbol: string;
}

export const RiskRadarChart: React.FC<RiskRadarChartProps> = ({ scores, symbol }) => {
  // Radar geometry
  const size = 260;
  const center = size / 2;
  const radius = size * 0.38;

  const categories = [
    { key: 'volatility', label: 'Volatility', value: scores.volatility },
    { key: 'liquidity', label: 'Liquidity', value: scores.liquidity },
    { key: 'diversification', label: 'Diversification', value: scores.diversification },
    { key: 'tracking', label: 'Tracking', value: scores.tracking },
    { key: 'marketRisk', label: 'Market Risk', value: scores.marketRisk },
  ];

  const totalAxes = categories.length;
  const angleStep = (Math.PI * 2) / totalAxes;

  // Compute coordinate for an axis at given percentage (0-100)
  const getCoordinates = (index: number, val: number) => {
    const angle = index * angleStep - Math.PI / 2; // start from top
    const r = (val / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Polygon points
  const polygonPoints = categories
    .map((cat, i) => {
      const { x, y } = getCoordinates(i, cat.value);
      return `${x},${y}`;
    })
    .join(' ');

  // Concentric grid rings: 25%, 50%, 75%, 100%
  const gridLevels = [25, 50, 75, 100];

  const explanations: Record<string, string> = {
    volatility: 'Measures price movement variability in the available demo data.',
    liquidity: 'Reflects daily trading turnover and market maker bid-ask tightness.',
    diversification: 'Evaluates constituent concentration across single firms and sectors.',
    tracking: 'Quantifies replication fidelity against the underlying index benchmark.',
    marketRisk: 'Indicates systemic sensitivity (beta) to macro market corrections.'
  };

  return (
    <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 shadow-inner space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
        <div>
          <h4 className="font-bold text-base text-zinc-100 flex items-center gap-2">
            <span>ETF Risk Radar</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              5-Factor Model
            </span>
          </h4>
          <p className="text-xs text-zinc-400">
            Multi-dimensional risk evaluation for {symbol} based on historical demo metrics.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
          <Info className="w-3.5 h-3.5 text-zinc-400" />
          <span>Scores are normalized from 0 to 100</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Radar Chart Visual */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <svg width={size} height={size} className="overflow-visible drop-shadow-md">
            {/* Concentric grid webs */}
            {gridLevels.map((lvl) => {
              const pts = categories
                .map((_, i) => {
                  const { x, y } = getCoordinates(i, lvl);
                  return `${x},${y}`;
                })
                .join(' ');
              return (
                <polygon
                  key={lvl}
                  points={pts}
                  fill="none"
                  stroke="#27272a"
                  strokeWidth="1"
                  strokeDasharray={lvl === 100 ? 'none' : '2,2'}
                />
              );
            })}

            {/* Radial Axis lines */}
            {categories.map((cat, i) => {
              const outer = getCoordinates(i, 100);
              const labelPos = getCoordinates(i, 118);
              return (
                <g key={cat.key}>
                  <line
                    x1={center}
                    y1={center}
                    x2={outer.x}
                    y2={outer.y}
                    stroke="#3f3f46"
                    strokeWidth="1"
                  />
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-[10px] font-bold fill-zinc-400 select-none"
                  >
                    {cat.label}
                  </text>
                </g>
              );
            })}

            {/* Data Polygon Fill */}
            <polygon
              points={polygonPoints}
              fill="rgba(16, 185, 129, 0.25)"
              stroke="#10b981"
              strokeWidth="2"
            />

            {/* Data Points */}
            {categories.map((cat, i) => {
              const { x, y } = getCoordinates(i, cat.value);
              return (
                <g key={cat.key}>
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#10b981"
                    stroke="#18181b"
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y={y - 8}
                    textAnchor="middle"
                    className="text-[9px] font-mono font-bold fill-emerald-300"
                  >
                    {cat.value}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Breakdown Metric Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-200">{cat.label}</span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {cat.value} <span className="text-zinc-400 text-[10px]">/ 100</span>
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                  style={{ width: `${cat.value}%` }}
                />
              </div>

              <p className="text-[11px] text-zinc-400 leading-snug">
                "{explanations[cat.key]}"
              </p>
            </div>
          ))}

          {/* Educational Disclaimer */}
          <div className="sm:col-span-2 p-3 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-300/80 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Educational Note:</strong> Scores are generated from available simulator demo data. They do not constitute regulated or guaranteed risk metrics.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
