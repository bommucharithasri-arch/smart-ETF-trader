import React, { useEffect, useRef, useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  Bot,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  CheckCircle2,
  Zap
} from 'lucide-react';

interface FloatingEtfCard {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  badge: string;
  badgeColor: string;
}

const FLOATING_ETFS: FloatingEtfCard[] = [
  {
    symbol: 'NIFTYBEES',
    name: 'Nippon India Nifty 50 ETF',
    price: 268.45,
    changePercent: 1.42,
    badge: 'Core Broad Index',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
  },
  {
    symbol: 'ITBEES',
    name: 'Nippon India ETF Nifty IT',
    price: 42.85,
    changePercent: 2.38,
    badge: 'Momentum Leader',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
  },
  {
    symbol: 'GOLDBEES',
    name: 'Nippon India ETF Gold BeES',
    price: 68.30,
    changePercent: 0.78,
    badge: 'Hedge Asset',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
  },
  {
    symbol: 'BANKBEES',
    name: 'Nippon India ETF Bank BeES',
    price: 532.10,
    changePercent: -0.45,
    badge: 'Financial Anchor',
    badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
  }
];

export const HeroCinematicAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeSignalIndex, setActiveSignalIndex] = useState(0);
  const [livePriceOffset, setLivePriceOffset] = useState(0);

  const aiSignals = [
    { title: 'Bullish Sector Rotation', detail: 'Capital flow into IT & Auto ETFs (+2.4% avg)' },
    { title: 'Low Tracking Error Alert', detail: 'NIFTYBEES tracking difference is optimal at 0.04%' },
    { title: 'Portfolio Hedging Signal', detail: 'Gold allocation provides stability against equity drawdown' },
    { title: 'Smart ETF Score: 92/100', detail: 'NIFTYBEES liquidity index in top 98th percentile' }
  ];

  // Rotate AI signal pill smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSignalIndex((prev) => (prev + 1) % aiSignals.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [aiSignals.length]);

  // Subtle live price jitter to simulate live market ticks
  useEffect(() => {
    const jitter = setInterval(() => {
      setLivePriceOffset((Math.random() - 0.5) * 0.4);
    }, 1800);
    return () => clearInterval(jitter);
  }, []);

  // Canvas particle and glowing grid network animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const nodeCount = Math.min(30, Math.floor(width / 30));
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1,
        alpha: Math.random() * 0.4 + 0.2
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid
      ctx.strokeStyle = 'rgba(39, 39, 42, 0.35)';
      ctx.lineWidth = 1;
      const gridSize = 48;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw flowing glowing spline wave across canvas
      ctx.beginPath();
      ctx.moveTo(0, height * 0.65);
      for (let x = 0; x <= width; x += 12) {
        const y =
          height * 0.6 +
          Math.sin(x * 0.008 + time) * 35 +
          Math.cos(x * 0.015 - time * 0.8) * 20;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = 'rgba(16, 185, 129, 0.6)';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw secondary cyan trend wave
      ctx.beginPath();
      ctx.moveTo(0, height * 0.72);
      for (let x = 0; x <= width; x += 12) {
        const y =
          height * 0.68 +
          Math.sin(x * 0.006 - time * 0.7) * 25 +
          Math.cos(x * 0.012 + time) * 15;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Update and draw particles with connection lines
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${n.alpha})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - dist / 110) * 0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950/70 shadow-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl">
      {/* Background Interactive Animation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      />

      {/* Main Terminal Overlay Content */}
      <div className="relative z-10 space-y-6">
        {/* Terminal Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="h-4 w-px bg-zinc-800" />
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-bold text-zinc-200">
                LIVE SIMULATION FEED // NSE INDIA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PAPER TRADING ACTIVE</span>
            </div>
            <span className="text-zinc-400 hidden sm:inline">12 ETFs TRACKED</span>
          </div>
        </div>

        {/* Central Terminal Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Main Chart Card (Left 8 cols) */}
          <div className="lg:col-span-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-black font-mono text-zinc-100">
                    NIFTYBEES
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Nifty 50 Benchmark
                  </span>
                </div>
                <p className="text-xs text-zinc-400">Nippon India Nifty 50 BeES ETF</p>
              </div>

              <div className="text-right">
                <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400 flex items-center justify-end gap-1">
                  <span>₹{(268.45 + livePriceOffset).toFixed(2)}</span>
                  <ArrowUpRight className="w-5 h-5 text-emerald-400 animate-bounce" />
                </div>
                <div className="text-xs font-semibold text-emerald-400 font-mono">
                  +3.80 (+1.42%) Today
                </div>
              </div>
            </div>

            {/* Simulated Live Candlestick & Sparkline Canvas Area */}
            <div className="h-40 sm:h-48 w-full relative rounded-xl bg-zinc-950/60 border border-zinc-800/60 p-3 flex flex-col justify-between overflow-hidden">
              {/* Candlesticks Mini-bar Display */}
              <div className="flex items-end justify-between h-28 pt-2 px-2 gap-1.5 sm:gap-2">
                {[
                  { open: 40, close: 65, high: 75, low: 35, up: true },
                  { open: 65, close: 55, high: 70, low: 50, up: false },
                  { open: 55, close: 72, high: 80, low: 52, up: true },
                  { open: 72, close: 85, high: 90, low: 68, up: true },
                  { open: 85, close: 78, high: 88, low: 74, up: false },
                  { open: 78, close: 92, high: 96, low: 76, up: true },
                  { open: 92, close: 88, high: 95, low: 84, up: false },
                  { open: 88, close: 104, high: 110, low: 86, up: true },
                  { open: 104, close: 118, high: 122, low: 100, up: true },
                  { open: 118, close: 112, high: 124, low: 108, up: false },
                  { open: 112, close: 126, high: 132, low: 110, up: true },
                  { open: 126, close: 138, high: 142, low: 122, up: true }
                ].map((bar, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                    {/* Upper wick */}
                    <div
                      className={`w-0.5 ${bar.up ? 'bg-emerald-400' : 'bg-rose-400'}`}
                      style={{ height: `${(bar.high - Math.max(bar.open, bar.close)) * 0.8}px` }}
                    />
                    {/* Body */}
                    <div
                      className={`w-full max-w-[14px] rounded-xs transition-all ${
                        bar.up
                          ? 'bg-emerald-500 shadow-xs shadow-emerald-500/50'
                          : 'bg-rose-500 shadow-xs shadow-rose-500/50'
                      }`}
                      style={{
                        height: `${Math.max(6, Math.abs(bar.close - bar.open) * 0.9)}px`
                      }}
                    />
                    {/* Lower wick */}
                    <div
                      className={`w-0.5 ${bar.up ? 'bg-emerald-400' : 'bg-rose-400'}`}
                      style={{ height: `${(Math.min(bar.open, bar.close) - bar.low) * 0.8}px` }}
                    />
                  </div>
                ))}
              </div>

              {/* Live Status Axis */}
              <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono pt-2 border-t border-zinc-800/60">
                <span>09:15 AM</span>
                <span>11:30 AM</span>
                <span>01:45 PM</span>
                <span className="text-emerald-400 font-bold">03:30 PM (MARKET CLOSE)</span>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <div className="text-[10px] text-zinc-400 font-medium">EXPENSE RATIO</div>
                <div className="text-xs font-bold font-mono text-zinc-100">0.04% p.a.</div>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <div className="text-[10px] text-zinc-400 font-medium">AUM (FUND SIZE)</div>
                <div className="text-xs font-bold font-mono text-zinc-100">₹32,450 Cr</div>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <div className="text-[10px] text-zinc-400 font-medium">TRACKING ERROR</div>
                <div className="text-xs font-bold font-mono text-emerald-400">0.03% (Optimal)</div>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <div className="text-[10px] text-zinc-400 font-medium">RISK PROFILE</div>
                <div className="text-xs font-bold font-mono text-blue-400">Moderate (54/100)</div>
              </div>
            </div>
          </div>

          {/* Right AI & Signal Panel (Right 4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-3">
            {/* Simulated Portfolio Value Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-emerald-500/30 space-y-2 shadow-lg">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-semibold">Simulated Net Capital</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
                  +8.42% P&L
                </span>
              </div>
              <div className="text-2xl font-black font-mono text-zinc-100">
                ₹1,08,420
              </div>
              <p className="text-[11px] text-zinc-400">
                Virtual ₹1,00,000 baseline growing via smart ETF allocation.
              </p>
            </div>

            {/* Dynamic AI Assistant Pulse Box */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-purple-500/30 space-y-2.5 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-zinc-200">SmartETF AI Intelligence</div>
                <Zap className="w-3.5 h-3.5 text-amber-400 ml-auto animate-pulse" />
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800/70 space-y-1">
                <div className="text-xs font-bold text-purple-300">
                  {aiSignals[activeSignalIndex].title}
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  {aiSignals[activeSignalIndex].detail}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                <span>Autonomous Market Signal Feed</span>
              </div>
            </div>

            {/* Factor Scores Mini Card */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <div className="text-xs font-bold text-zinc-200 flex items-center justify-between">
                <span>Risk Radar Benchmark</span>
                <span className="text-[10px] text-zinc-400 font-mono">5 Dimensions</span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div>
                  <div className="flex justify-between text-zinc-400 mb-0.5">
                    <span>Diversification</span>
                    <span className="font-mono text-zinc-200">88/100</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full w-[88%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-zinc-400 mb-0.5">
                    <span>Liquidity</span>
                    <span className="font-mono text-zinc-200">82/100</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full w-[82%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-zinc-400 mb-0.5">
                    <span>Tracking Precision</span>
                    <span className="font-mono text-zinc-200">74/100</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-400 h-full rounded-full w-[74%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating ETF Cards Grid */}
        <div className="pt-2">
          <div className="text-xs font-bold text-zinc-400 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Popular Simulated ETF Tickers:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {FLOATING_ETFS.map((etf) => (
              <div
                key={etf.symbol}
                className="p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-emerald-500/40 transition-all space-y-2 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-sm text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    {etf.symbol}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${etf.badgeColor}`}>
                    {etf.badge}
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-200">
                    ₹{etf.price.toFixed(2)}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold flex items-center gap-0.5 ${
                      etf.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {etf.changePercent >= 0 ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    {etf.changePercent >= 0 ? '+' : ''}
                    {etf.changePercent}%
                  </span>
                </div>

                <div className="text-[10px] text-zinc-400 truncate">
                  {etf.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
