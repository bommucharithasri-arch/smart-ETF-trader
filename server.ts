import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import {
  ETFS_DATA,
  MARKET_SECTORS,
  MARKET_INDICES,
  INITIAL_HOLDINGS,
  INITIAL_ORDERS,
  INITIAL_WATCHLIST,
  INITIAL_NOTIFICATIONS,
  LEARNING_LESSONS,
  QUIZ_QUESTIONS,
  INITIAL_CASH
} from './src/data/mockData.ts';
import { Order, Holding, WatchlistItem, NotificationItem } from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// In-Memory State for Persistent Demo Session
let virtualCash = INITIAL_CASH;
let holdings: Holding[] = [...INITIAL_HOLDINGS];
let orders: Order[] = [...INITIAL_ORDERS];
let watchlist: WatchlistItem[] = [...INITIAL_WATCHLIST];
let notifications: NotificationItem[] = [...INITIAL_NOTIFICATIONS];

// Initialize Google GenAI if key is present
const geminiApiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (geminiApiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Gemini client initialization failed, fallback active:', err);
  }
}

// ----------------------
// REST API ENDPOINTS
// ----------------------

// 1. Markets
app.get('/api/markets', (_req: Request, res: Response) => {
  const sortedByChange = [...ETFS_DATA].sort((a, b) => b.changePercent1D - a.changePercent1D);
  const topGainers = sortedByChange.filter((etf) => etf.changePercent1D > 0).slice(0, 4);
  const topLosers = [...sortedByChange].reverse().filter((etf) => etf.changePercent1D < 0).slice(0, 4);

  res.json({
    indices: MARKET_INDICES,
    sectors: MARKET_SECTORS,
    topGainers,
    topLosers,
    marketSentiment: {
      score: 72,
      label: 'Moderate Greed',
      summary: 'Broad equity indices remain resilient backed by tech and metals momentum.'
    }
  });
});

// 2. ETFs list
app.get('/api/etfs', (req: Request, res: Response) => {
  const { sector, category, search } = req.query;
  let results = [...ETFS_DATA];

  if (sector && typeof sector === 'string' && sector !== 'ALL') {
    results = results.filter((e) => e.sector.toLowerCase() === sector.toLowerCase());
  }

  if (category && typeof category === 'string' && category !== 'ALL') {
    results = results.filter((e) => e.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    results = results.filter((e) => e.symbol.toLowerCase().includes(q) || e.name.toLowerCase().includes(q));
  }

  res.json(results);
});

// 3. Single ETF details
app.get('/api/etfs/:symbol', (req: Request, res: Response) => {
  const symbol = req.params.symbol.toUpperCase();
  const etf = ETFS_DATA.find((e) => e.symbol === symbol);

  if (!etf) {
    return res.status(404).json({ error: `ETF with symbol ${symbol} not found.` });
  }

  return res.json(etf);
});

// 4. User Holdings & Cash
app.get('/api/holdings', (_req: Request, res: Response) => {
  // recalculate with latest prices
  const updatedHoldings = holdings.map((h) => {
    const liveEtf = ETFS_DATA.find((e) => e.symbol === h.symbol);
    const price = liveEtf ? liveEtf.price : h.currentPrice;
    const currentValue = h.quantity * price;
    const investedAmount = h.quantity * h.avgBuyPrice;
    const totalPnl = currentValue - investedAmount;
    const totalPnlPercent = investedAmount > 0 ? (totalPnl / investedAmount) * 100 : 0;
    const dayPnl = liveEtf ? h.quantity * liveEtf.change1D : 0;
    const dayPnlPercent = liveEtf ? liveEtf.changePercent1D : 0;

    return {
      ...h,
      currentPrice: price,
      investedAmount,
      currentValue,
      totalPnl,
      totalPnlPercent,
      dayPnl,
      dayPnlPercent
    };
  });

  const totalInvested = updatedHoldings.reduce((sum, h) => sum + h.investedAmount, 0);
  const totalValue = updatedHoldings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalPnl = totalValue - totalInvested;
  const totalPnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;

  res.json({
    virtualCash,
    initialCash: INITIAL_CASH,
    totalPortfolioValue: totalValue + virtualCash,
    investedValue: totalInvested,
    holdingsValue: totalValue,
    totalPnl,
    totalPnlPercent,
    holdings: updatedHoldings
  });
});

// 5. Orders - Get and Post
app.get('/api/orders', (_req: Request, res: Response) => {
  res.json(orders);
});

app.post('/api/orders', (req: Request, res: Response) => {
  const { symbol, type, quantity, price } = req.body;

  if (!symbol || !type || !quantity || quantity <= 0) {
    return res.status(400).json({ error: 'Valid symbol, order type, and positive quantity required.' });
  }

  const orderType = (type as string).toUpperCase();
  if (orderType !== 'BUY' && orderType !== 'SELL') {
    return res.status(400).json({ error: 'Order type must be BUY or SELL.' });
  }

  const targetEtf = ETFS_DATA.find((e) => e.symbol === symbol.toUpperCase());
  if (!targetEtf) {
    return res.status(400).json({ error: `ETF ${symbol} not recognized.` });
  }

  const execPrice = price && price > 0 ? Number(price) : targetEtf.price;
  const orderQty = parseInt(quantity, 10);
  const totalAmount = orderQty * execPrice;

  // Validate BUY
  if (orderType === 'BUY') {
    if (totalAmount > virtualCash) {
      return res.status(400).json({
        error: `Insufficient virtual cash. Required: ₹${totalAmount.toLocaleString('en-IN')}, Available: ₹${virtualCash.toLocaleString('en-IN')}`
      });
    }

    // Deduct cash
    virtualCash -= totalAmount;

    // Update holdings
    const existingIndex = holdings.findIndex((h) => h.symbol === targetEtf.symbol);
    if (existingIndex >= 0) {
      const existing = holdings[existingIndex];
      const newQty = existing.quantity + orderQty;
      const newInvested = existing.investedAmount + totalAmount;
      const newAvgPrice = newInvested / newQty;
      holdings[existingIndex] = {
        ...existing,
        quantity: newQty,
        avgBuyPrice: Number(newAvgPrice.toFixed(2)),
        investedAmount: newInvested,
        currentPrice: execPrice,
        currentValue: newQty * execPrice,
        totalPnl: newQty * execPrice - newInvested,
        totalPnlPercent: ((newQty * execPrice - newInvested) / newInvested) * 100
      };
    } else {
      holdings.push({
        symbol: targetEtf.symbol,
        etfName: targetEtf.name,
        quantity: orderQty,
        avgBuyPrice: execPrice,
        currentPrice: execPrice,
        investedAmount: totalAmount,
        currentValue: totalAmount,
        totalPnl: 0,
        totalPnlPercent: 0,
        dayPnl: 0,
        dayPnlPercent: 0
      });
    }
  }

  // Validate SELL
  if (orderType === 'SELL') {
    const existingIndex = holdings.findIndex((h) => h.symbol === targetEtf.symbol);
    if (existingIndex < 0 || holdings[existingIndex].quantity < orderQty) {
      const availableQty = existingIndex >= 0 ? holdings[existingIndex].quantity : 0;
      return res.status(400).json({
        error: `Insufficient holdings to sell. Requested: ${orderQty}, Available: ${availableQty}`
      });
    }

    // Add cash
    virtualCash += totalAmount;

    // Update holdings
    const existing = holdings[existingIndex];
    const newQty = existing.quantity - orderQty;
    if (newQty === 0) {
      holdings.splice(existingIndex, 1);
    } else {
      const remainingInvested = newQty * existing.avgBuyPrice;
      holdings[existingIndex] = {
        ...existing,
        quantity: newQty,
        investedAmount: remainingInvested,
        currentPrice: execPrice,
        currentValue: newQty * execPrice,
        totalPnl: newQty * execPrice - remainingInvested,
        totalPnlPercent: ((newQty * execPrice - remainingInvested) / remainingInvested) * 100
      };
    }
  }

  // Generate unique order ID
  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const now = new Date();
  const timeString = `Today, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

  const newOrder: Order = {
    id: orderId,
    symbol: targetEtf.symbol,
    etfName: targetEtf.name,
    type: orderType,
    quantity: orderQty,
    price: execPrice,
    totalAmount,
    timestamp: timeString,
    status: 'FILLED'
  };

  orders.unshift(newOrder);

  // Add Notification
  const newNotif: NotificationItem = {
    id: `notif-${Date.now()}`,
    title: `Paper Trade Executed (${orderType})`,
    message: `${orderType === 'BUY' ? 'Bought' : 'Sold'} ${orderQty} ${targetEtf.symbol} at ₹${execPrice.toFixed(2)} (${orderId}).`,
    type: 'ORDER',
    timestamp: timeString,
    read: false
  };
  notifications.unshift(newNotif);

  return res.status(201).json({
    success: true,
    message: 'Order executed successfully in paper trading simulator.',
    order: newOrder,
    virtualCash
  });
});

app.delete('/api/orders/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  orders = orders.filter((o) => o.id !== id);
  res.json({ success: true, message: `Order ${id} removed.` });
});

// 6. Watchlist
app.get('/api/watchlist', (_req: Request, res: Response) => {
  // sync live prices
  const syncedWatchlist = watchlist.map((w) => {
    const etf = ETFS_DATA.find((e) => e.symbol === w.symbol);
    return {
      ...w,
      price: etf ? etf.price : w.price,
      changePercent: etf ? etf.changePercent1D : w.changePercent
    };
  });
  res.json(syncedWatchlist);
});

app.post('/api/watchlist', (req: Request, res: Response) => {
  const { symbol, priceAlertAbove, priceAlertBelow, aiAlertsEnabled } = req.body;
  if (!symbol) {
    return res.status(400).json({ error: 'Symbol is required' });
  }

  const existing = watchlist.find((w) => w.symbol.toUpperCase() === symbol.toUpperCase());
  if (existing) {
    return res.json({ success: true, message: 'Already in watchlist', item: existing });
  }

  const etf = ETFS_DATA.find((e) => e.symbol === symbol.toUpperCase());
  if (!etf) {
    return res.status(404).json({ error: `ETF ${symbol} not found.` });
  }

  const newItem: WatchlistItem = {
    id: `wl-${Date.now()}`,
    symbol: etf.symbol,
    etfName: etf.name,
    price: etf.price,
    changePercent: etf.changePercent1D,
    priceAlertAbove: priceAlertAbove ? Number(priceAlertAbove) : undefined,
    priceAlertBelow: priceAlertBelow ? Number(priceAlertBelow) : undefined,
    aiAlertsEnabled: aiAlertsEnabled ?? true,
    addedAt: 'Just now'
  };

  watchlist.push(newItem);

  notifications.unshift({
    id: `notif-${Date.now()}`,
    title: 'Watchlist Added',
    message: `Added ${etf.symbol} to your watchlist.`,
    type: 'ALERT',
    timestamp: 'Just now',
    read: false
  });

  return res.status(201).json({ success: true, item: newItem });
});

app.delete('/api/watchlist/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  watchlist = watchlist.filter((w) => w.id !== id && w.symbol !== id);
  res.json({ success: true, message: 'Removed from watchlist.' });
});

// 7. AI Advisor
app.get('/api/ai-advisor', (_req: Request, res: Response) => {
  res.json({
    macroOutlook: {
      status: 'Constructive Bullish',
      confidence: 84,
      summary: 'Domestic retail inflows remain robust. Technology and metals exhibit strong momentum divergence, while banking consolidation offers dip-buying value.'
    },
    topPicks: [
      {
        symbol: 'ITBEES',
        rationale: 'Generative AI adoption and anticipated Western central bank rate cuts revive enterprise IT spending.',
        horizon: '6-12 Months',
        riskLevel: 'Moderate'
      },
      {
        symbol: 'GOLDBEES',
        rationale: 'Geopolitical stabilization hedge with central bank sovereign bullion demand.',
        horizon: '12-24 Months',
        riskLevel: 'Low'
      },
      {
        symbol: 'NIFTYBEES',
        rationale: 'Foundational diversified exposure to India’s secular GDP compounding.',
        horizon: '3+ Years',
        riskLevel: 'Low to Moderate'
      }
    ],
    portfolioHealthInsights: {
      overallScore: 82,
      diversificationScore: 85,
      costEfficiencyScore: 94,
      recommendation: 'Your portfolio has healthy large-cap and IT coverage. Consider increasing GOLDBEES allocation to 15% to hedge potential equity corrections.'
    }
  });
});

// 8. Learning & Quiz
app.get('/api/learning', (_req: Request, res: Response) => {
  res.json({
    lessons: LEARNING_LESSONS,
    quiz: QUIZ_QUESTIONS
  });
});

// 9. Notifications
app.get('/api/notifications', (_req: Request, res: Response) => {
  res.json(notifications);
});

// 10. AI Chat Assistant (with Gemini API or high-fidelity local response engine)
app.post('/api/ai-chat', async (req: Request, res: Response) => {
  const { message, context } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message text is required.' });
  }

  const query = message.trim().toLowerCase();

  // Try real Gemini API if client available
  if (aiClient) {
    try {
      const systemInstruction = `You are "SmartETF AI Assistant", a friendly, professional fintech AI mentor embedded inside the Smart ETF Trader educational paper-trading app.
The user is learning and paper trading (no real money).
Tone: Clear, encouraging, objective, educational, beginner-friendly.
Guidelines:
- Explain ETF concepts simply (expense ratio, tracking error, NAV vs market price, diversification).
- Never give guaranteed financial returns or regulated individual advice.
- When asked about portfolio or ETFs, use the available context if provided.
Context summary:
- Available ETFs: NIFTYBEES, BANKBEES, ITBEES, GOLDBEES, AUTOBEES, PHARMABEES, LIQUIDBEES, SILVERBEES, CPSEETF, JUNIORBEES.
- User Virtual Cash: ₹${virtualCash.toLocaleString('en-IN')}
- User Holdings: ${holdings.map((h) => `${h.symbol} (${h.quantity} units)`).join(', ') || 'No holdings yet'}.
Keep responses structured, concise, and easy to read.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `${message} ${context ? `\n[User Context: ${JSON.stringify(context)}]` : ''}`,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });

      const replyText = response.text || 'I analyzed your query. How else can I assist your ETF journey?';
      return res.json({ reply: replyText, source: 'gemini-3.8-flash' });
    } catch (err: any) {
      console.warn('Gemini generateContent error, switching to local domain engine:', err.message);
      // Fallback seamlessly
    }
  }

  // Local Educational Response Engine (Guaranteed college demo performance)
  let reply = '';
  const suggestedPrompts: string[] = [];

  if (query.includes('what is an etf') || query.includes('explain etf')) {
    reply = `### What is an ETF?
An **Exchange Traded Fund (ETF)** is an investment vehicle that bundles a basket of securities (like stocks, bonds, or commodities) into a single fund that trades continuously on the stock exchange just like a regular share.

**Key Advantages:**
1. **Instant Diversification:** Buying 1 unit of **NIFTYBEES** gives you fractional exposure to India's top 50 companies (HDFC Bank, Reliance, Infosys, etc.).
2. **Lower Costs:** Passive ETFs typically feature expense ratios as low as **0.04%**, compared to 1.0%–2.0% in active mutual funds.
3. **Real-Time Trading:** You can buy or sell at live market prices throughout trading hours (9:15 AM – 3:30 PM), with full transparency.
4. **No Lock-In:** High liquidity allows you to enter and exit whenever the market is open.`;
    suggestedPrompts.push('What is NIFTYBEES?', 'Explain expense ratio', 'Explain ETF risk');
  } else if (query.includes('niftybees') || query.includes('what is niftybees')) {
    reply = `### NIFTYBEES Breakdown
**Nippon India ETF Nifty 50 BeES (NIFTYBEES)** was India's very first ETF, launched in 2001.

- **Underlying Benchmark:** NIFTY 50 Index (India's top 50 blue chips).
- **Expense Ratio:** ~0.04% (among the lowest in India).
- **Liquidity:** Deepest daily volume on NSE with multi-crore turnover.
- **Top Holdings:** HDFC Bank (~11.4%), Reliance Industries (~9.8%), ICICI Bank (~8.1%), Infosys (~5.9%).
- **Current Paper Price:** ₹271.45

**Role in your portfolio:** It serves as the foundational **"Core"** asset for long-term Indian economic wealth accumulation.`;
    suggestedPrompts.push('Explain my current portfolio allocation', 'What is tracking error?');
  } else if (query.includes('expense ratio')) {
    reply = `### Understanding Expense Ratio
The **Expense Ratio** represents the annual fee charged by the Asset Management Company (AMC) to manage the fund, expressed as an annual percentage of your total investment.

- For example, if you hold **₹1,00,000** in an ETF with an expense ratio of **0.05%**, your annual fund management cost is just **₹50**.
- **Passive Index ETFs** have significantly lower expense ratios (0.04% – 0.25%) than actively managed mutual funds (1.2% – 2.2%).
- Over a 15–20 year compounding horizon, lower expense ratios can save you lakhs of rupees in cumulative fee drag!`;
    suggestedPrompts.push('What is tracking error?', 'Explain ETF risk');
  } else if (query.includes('risk') || query.includes('etf risk')) {
    reply = `### Understanding ETF Risks
While ETFs provide broad diversification, they are not risk-free:

1. **Market Risk:** If the overall stock market declines, equity ETFs (like NIFTYBEES or BANKBEES) will decline proportionally.
2. **Sector Concentration:** Sector ETFs (like ITBEES or AUTOBEES) carry higher volatility because all constituents belong to one industry.
3. **Tracking Error:** The variance between the ETF's return and the underlying index's return due to cash drag, transaction costs, and replication timing.
4. **Liquidity / Spread Risk:** For smaller ETFs, the difference between the bid and ask price can lead to buying above or selling below NAV.

**Pro-Tip:** Check the **ETF Risk Radar** on our ETF Details page to inspect Volatility, Liquidity, and Tracking scores!`;
    suggestedPrompts.push('Analyze My Portfolio', 'What is tracking error?');
  } else if (query.includes('p&l') || query.includes('portfolio p&l') || query.includes('why did my portfolio')) {
    const totalPnl = holdings.reduce((sum, h) => sum + (h.quantity * h.currentPrice - h.investedAmount), 0);
    reply = `### Why Portfolio P&L Changes
Your portfolio P&L (Profit & Loss) fluctuates based on:

1. **Daily Market Movements:** When underlying constituent stocks move, the ETF's market price updates in real time.
2. **Current Portfolio Status:**
   - Total Holdings Value: **₹${holdings.reduce((s, h) => s + h.quantity * h.currentPrice, 0).toLocaleString('en-IN')}**
   - Total Unrealized P&L: **${totalPnl >= 0 ? '+' : ''}₹${totalPnl.toFixed(2)}**
   - Available Virtual Cash: **₹${virtualCash.toLocaleString('en-IN')}**
3. **Sector Weightings:** For example, today's **+2.40% surge in ITBEES** boosts tech holdings, while **BANKBEES (-0.80%)** creates mild temporary consolidation.`;
    suggestedPrompts.push('Analyze My Portfolio', 'Explain my current portfolio allocation');
  } else if (query.includes('portfolio') || query.includes('allocation') || query.includes('analyze')) {
    const totalHoldingsVal = holdings.reduce((sum, h) => sum + h.quantity * h.currentPrice, 0);
    const totalVal = totalHoldingsVal + virtualCash;
    reply = `### Portfolio Allocation Analysis
Here is your current simulated paper trading distribution:

- **Total Capital:** ₹${totalVal.toLocaleString('en-IN')}
- **Active Holdings:** ₹${totalHoldingsVal.toLocaleString('en-IN')} (${((totalHoldingsVal / totalVal) * 100).toFixed(1)}%)
- **Virtual Cash Balance:** ₹${virtualCash.toLocaleString('en-IN')} (${((virtualCash / totalVal) * 100).toFixed(1)}%)

**Holdings Breakdown:**
${holdings.map((h) => `- **${h.symbol}**: ${h.quantity} units (~₹${(h.quantity * h.currentPrice).toFixed(0)}) | P&L: ${h.totalPnl >= 0 ? '+' : ''}₹${h.totalPnl.toFixed(0)}`).join('\n') || '- No holdings currently.'}

**Educational Suggestion:**
Maintain at least 10–15% in **GOLDBEES** as an inflation cushion, and keep **NIFTYBEES** as your core anchor (40–50%). Check the **Portfolio Rebalancing Simulator** to test custom targets!`;
    suggestedPrompts.push('Explain ETF risk', 'What is Market Momentum?');
  } else if (query.includes('tracking error')) {
    reply = `### What is Tracking Error?
**Tracking Error** measures how closely an ETF follows the returns of its underlying benchmark index.

- **Formula:** It is the standard deviation of excess return differences between the ETF and the index over a specific period.
- **Ideal Value:** The closer to **0.00%**, the better! For instance, NIFTYBEES typically operates with an exemplary tracking error of ~**0.03%**.
- **Causes of Tracking Error:**
  - Annual expense ratio fees.
  - Cash drag held for liquidity/creation units.
  - Rebalancing execution timing during constituent changes.`;
    suggestedPrompts.push('Explain expense ratio', 'What is NIFTYBEES?');
  } else if (query.includes('diversification')) {
    reply = `### The Power of Diversification
Diversification is the time-tested principle of spreading your capital across different asset classes, sectors, and companies to minimize catastrophic downside risk without sacrificing expected returns.

- Instead of picking 1 or 2 individual stocks that could experience corporate governance issues, an ETF gives you **50 to 500 companies** in one tap.
- A classic all-weather ETF mix:
  - **Equities (60%):** NIFTYBEES + JUNIORBEES for capital growth.
  - **Commodities (15%):** GOLDBEES + SILVERBEES for currency/inflation hedge.
  - **Sectors (15%):** ITBEES + BANKBEES for tactical alpha.
  - **Cash Equivalent (10%):** LIQUIDBEES for dry powder.`;
    suggestedPrompts.push('Explain ETF risk', 'Analyze My Portfolio');
  } else if (query.includes('momentum') || query.includes('market momentum')) {
    reply = `### Market Momentum Insights
Today's market momentum shows strong sector rotation:

- **Top Leading Sector:** **IT (+2.40%)** and **METALS (+1.85%)** are experiencing strong institutional buying interest.
- **Lagging Sector:** **ENERGY (-1.35%)** and **BANKING (-0.80%)** are in consolidation.
- Momentum strategies allocate towards sectors displaying accelerating relative strength against the benchmark.
- Inspect our **Market Heatmap** to watch real-time sector breadth across all 10 monitored segments!`;
    suggestedPrompts.push('What is NIFTYBEES?', 'Explain ETF risk');
  } else {
    reply = `Hello! I am your **SmartETF AI Assistant**.
I can help explain ETF investing concepts, decode expense ratios and tracking errors, analyze your paper trading portfolio allocation, and evaluate market trends.

Feel free to ask questions like:
- *"What is an ETF?"*
- *"Explain expense ratio and tracking error."*
- *"Why did my portfolio P&L change?"*
- *"How should I allocate across NIFTYBEES, ITBEES, and GOLDBEES?"*`;
    suggestedPrompts.push('What is an ETF?', 'Analyze My Portfolio', 'Explain Risk', 'What is Market Momentum?');
  }

  return res.json({
    reply,
    suggestedPrompts,
    source: 'smartetf-domain-engine'
  });
});

// 11. API Health Monitor
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    timestamp: new Date().toISOString(),
    status: 'healthy',
    services: {
      backendApi: { status: 'Online', latencyMs: 14 },
      databaseStore: { status: 'Connected', latencyMs: 8, engine: 'In-Memory State Store' },
      marketsApi: { status: 'Online', latencyMs: 22 },
      etfApi: { status: 'Online', latencyMs: 18 },
      ordersApi: { status: 'Online', latencyMs: 16 },
      aiAdvisorApi: {
        status: 'Online',
        latencyMs: aiClient ? 65 : 12,
        mode: aiClient ? 'Gemini 3.8 Flash' : 'Smart Local Domain Engine'
      }
    }
  });
});

// ----------------------
// VITE MIDDLEWARE SETUP
// ----------------------
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Smart ETF Trader full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
