import { ETF, MarketSector, MarketIndex, LearningLesson, QuizQuestion, Achievement, Holding, Order, WatchlistItem, NotificationItem } from '../types';

export const INITIAL_CASH = 100000;

export const MARKET_INDICES: MarketIndex[] = [
  { name: 'NIFTY 50', value: 24892.40, change: 142.15, changePercent: 0.57, status: 'open' },
  { name: 'SENSEX', value: 81450.20, change: 480.30, changePercent: 0.59, status: 'open' },
  { name: 'NIFTY BANK', value: 52140.85, change: -125.40, changePercent: -0.24, status: 'open' },
  { name: 'NIFTY IT', value: 41890.10, change: 960.50, changePercent: 2.35, status: 'open' },
  { name: 'INDIA VIX', value: 12.84, change: -0.42, changePercent: -3.17, status: 'open' }
];

export const MARKET_SECTORS: MarketSector[] = [
  {
    name: 'IT',
    code: 'IT',
    changePercent: 2.40,
    trend: 'up',
    trackedEtfsCount: 6,
    topEtf: 'ITBEES',
    description: 'Driven by robust cloud spend forecasts and upbeat global tech earnings.'
  },
  {
    name: 'BANKING',
    code: 'BANKING',
    changePercent: -0.80,
    trend: 'down',
    trackedEtfsCount: 8,
    topEtf: 'BANKBEES',
    description: 'Mild margin compression concerns amidst steady credit growth.'
  },
  {
    name: 'AUTO',
    code: 'AUTO',
    changePercent: 1.20,
    trend: 'up',
    trackedEtfsCount: 4,
    topEtf: 'AUTOBEES',
    description: 'Festive retail bookings and EV model rollouts boosting volume optimism.'
  },
  {
    name: 'PHARMA',
    code: 'PHARMA',
    changePercent: 0.50,
    trend: 'up',
    trackedEtfsCount: 5,
    topEtf: 'PHARMABEES',
    description: 'Steady US FDA approvals and domestic formulation market gains.'
  },
  {
    name: 'ENERGY',
    code: 'ENERGY',
    changePercent: -1.35,
    trend: 'down',
    trackedEtfsCount: 5,
    topEtf: 'CPSEETF',
    description: 'Global crude price fluctuations and refining crack spread corrections.'
  },
  {
    name: 'FINANCE',
    code: 'FINANCE',
    changePercent: 0.65,
    trend: 'up',
    trackedEtfsCount: 7,
    topEtf: 'FINBEES',
    description: 'NBFC resilience and steady retail lending disbursement growth.'
  },
  {
    name: 'METALS',
    code: 'METALS',
    changePercent: 1.85,
    trend: 'up',
    trackedEtfsCount: 3,
    topEtf: 'METALBEES',
    description: 'Global infrastructure stimulus and steady commodity pricing index.'
  },
  {
    name: 'FMCG',
    code: 'FMCG',
    changePercent: -0.45,
    trend: 'down',
    trackedEtfsCount: 4,
    topEtf: 'FMCGBEES',
    description: 'Gradual rural demand recovery with raw material price consolidation.'
  },
  {
    name: 'REALTY',
    code: 'REALTY',
    changePercent: 1.95,
    trend: 'up',
    trackedEtfsCount: 3,
    topEtf: 'REALTYBEES',
    description: 'High-end residential absorption and strong commercial leasing pipeline.'
  },
  {
    name: 'HEALTHCARE',
    code: 'HEALTHCARE',
    changePercent: 0.72,
    trend: 'up',
    trackedEtfsCount: 4,
    topEtf: 'HEALTHBEES',
    description: 'Hospital network occupancy rates and diagnostic volume surges.'
  }
];

export const ETFS_DATA: ETF[] = [
  {
    symbol: 'NIFTYBEES',
    name: 'Nippon India ETF Nifty 50 BeES',
    category: 'Equity Large Cap',
    sector: 'NIFTY 50',
    price: 271.45,
    change1D: 1.55,
    changePercent1D: 0.57,
    nav: 271.40,
    aum: '₹34,250 Cr',
    expenseRatio: 0.04,
    trackingError: 0.03,
    peRatio: 22.4,
    volume: '3.4M',
    high52W: 285.50,
    low52W: 218.10,
    description: 'NIFTYBEES mirrors the benchmark NIFTY 50 index, providing diversified exposure across India’s top 50 blue-chip companies spanning financial services, technology, consumer goods, and energy.',
    riskLevel: 'MEDIUM',
    riskScore: 68,
    riskExplanation: 'Moderate volatility and market exposure based on the available project data.',
    aiScore: 88,
    positiveSignals: [
      { label: 'Momentum', detail: 'Sustained institutional inflows into top 50 index constituents.' },
      { label: 'Liquidity', detail: 'Deepest multi-crore daily trading volume on NSE with tight bid-ask spreads.' },
      { label: 'Diversification', detail: 'Instant exposure across 13 major Indian economic industries.' },
      { label: 'Trend', detail: 'Consistently holds above the 50-day and 200-day moving averages.' }
    ],
    riskConsiderations: [
      { label: 'Volatility', detail: 'Equity market swings during quarterly earnings and macro uncertainty.' },
      { label: 'Market Exposure', detail: 'High systemic correlation (beta ~ 1.0) with domestic GDP cycles.' },
      { label: 'Sector Concentration', detail: 'Financial services represent ~35% of total index weight.' },
      { label: 'Tracking Differences', detail: 'Minor dividend cash drag before distribution reinvestment.' }
    ],
    whyThisETF: [
      'Instant diversification across 13 major Indian economic sectors',
      'Ultra-low expense ratio of 0.04% minimizes long-term holding friction',
      'Highest secondary market liquidity among all Indian equity ETFs',
      'Tight tracking error against the NSE NIFTY 50 Total Return Index'
    ],
    aiInsight: {
      rating: 'Strong Buy',
      summary: 'Solid core building block for equity portfolios. Benefits from macro domestic capital capex cycles and institutional inflows.',
      pros: ['Deep secondary liquidity', 'Blue-chip sovereign weightings', 'Low cash drag'],
      risks: ['Subject to broader market downturns', 'Large-cap valuation premiums']
    },
    riskRadar: {
      volatility: 42,
      liquidity: 95,
      diversification: 88,
      tracking: 94,
      marketRisk: 52
    },
    topHoldings: [
      { name: 'HDFC Bank Ltd', weight: 11.4 },
      { name: 'Reliance Industries Ltd', weight: 9.8 },
      { name: 'ICICI Bank Ltd', weight: 8.1 },
      { name: 'Infosys Ltd', weight: 5.9 },
      { name: 'Tata Consultancy Services', weight: 3.8 }
    ],
    historicalPrices: {
      '1D': [
        { date: '09:15', price: 270.10 },
        { date: '10:30', price: 270.80 },
        { date: '11:45', price: 271.20 },
        { date: '13:00', price: 270.95 },
        { date: '14:15', price: 271.30 },
        { date: '15:30', price: 271.45 }
      ],
      '1W': [
        { date: 'Mon', price: 268.20 },
        { date: 'Tue', price: 269.10 },
        { date: 'Wed', price: 269.80 },
        { date: 'Thu', price: 270.50 },
        { date: 'Fri', price: 271.45 }
      ],
      '1M': [
        { date: 'Week 1', price: 264.50 },
        { date: 'Week 2', price: 266.80 },
        { date: 'Week 3', price: 269.10 },
        { date: 'Week 4', price: 271.45 }
      ],
      '1Y': [
        { date: 'Oct 23', price: 224.10 },
        { date: 'Jan 24', price: 242.30 },
        { date: 'Apr 24', price: 251.80 },
        { date: 'Jul 24', price: 265.40 },
        { date: 'Oct 24', price: 271.45 }
      ],
      '5Y': [
        { date: '2020', price: 135.20 },
        { date: '2021', price: 178.50 },
        { date: '2022', price: 195.10 },
        { date: '2023', price: 228.60 },
        { date: '2024', price: 271.45 }
      ]
    }
  },
  {
    symbol: 'BANKBEES',
    name: 'Nippon India ETF Bank BeES',
    category: 'Banking & Financials',
    sector: 'BANKING',
    price: 524.30,
    change1D: -4.20,
    changePercent1D: -0.80,
    nav: 524.20,
    aum: '₹18,920 Cr',
    expenseRatio: 0.16,
    trackingError: 0.05,
    peRatio: 16.8,
    volume: '2.1M',
    high52W: 554.00,
    low52W: 432.50,
    description: 'BANKBEES replicates the NIFTY Bank Index, capturing the performance of leading private and public sector commercial banking institutions in India.',
    riskLevel: 'HIGH',
    riskScore: 78,
    riskExplanation: 'High beta cyclical sector exposure with elevated interest rate sensitivity and loan margin cycles.',
    aiScore: 76,
    positiveSignals: [
      { label: 'Momentum', detail: 'Strong retail loan disbursement and multi-year low systemic NPAs.' },
      { label: 'Liquidity', detail: 'Deep futures & options linkage facilitating liquid block execution.' },
      { label: 'Diversification', detail: 'Balanced private and public sector commercial bank blend.' },
      { label: 'Trend', detail: 'Favorable credit demand runway projected across corporate capex.' }
    ],
    riskConsiderations: [
      { label: 'Volatility', detail: 'High sensitivity to RBI monetary policy and repo rate cycles.' },
      { label: 'Market Exposure', detail: 'Beta > 1.25 relative to broader Nifty 50 index.' },
      { label: 'Sector Concentration', detail: '100% focused on commercial and public banking entities.' },
      { label: 'Tracking Differences', detail: 'Occasional index reconstitution adjustments during rebalancing.' }
    ],
    whyThisETF: [
      'Pure-play high-beta participation in Indian financial credit cycles',
      'Favorable credit quality trends with decade-low NPA ratios',
      'Strong institutional derivatives market linkage for liquid hedging',
      'Attractive historical dividend payout and return on equity metrics'
    ],
    aiInsight: {
      rating: 'Hold',
      summary: 'High beta opportunity. Near-term net interest margins may face mild pressure, yet long-term loan book CAGR remains in the 12-15% zone.',
      pros: ['Clean balance sheets across constituents', 'Strong systemic credit appetite'],
      risks: ['Sensitive to central bank repo rate decisions', 'Sector concentration']
    },
    riskRadar: {
      volatility: 68,
      liquidity: 92,
      diversification: 45,
      tracking: 90,
      marketRisk: 64
    },
    topHoldings: [
      { name: 'HDFC Bank Ltd', weight: 28.5 },
      { name: 'ICICI Bank Ltd', weight: 24.2 },
      { name: 'State Bank of India', weight: 11.5 },
      { name: 'Axis Bank Ltd', weight: 9.8 },
      { name: 'Kotak Mahindra Bank', weight: 9.1 }
    ],
    historicalPrices: {
      '1D': [
        { date: '09:15', price: 528.50 },
        { date: '10:30', price: 527.10 },
        { date: '11:45', price: 525.80 },
        { date: '13:00', price: 524.90 },
        { date: '14:15', price: 524.10 },
        { date: '15:30', price: 524.30 }
      ],
      '1W': [
        { date: 'Mon', price: 531.00 },
        { date: 'Tue', price: 529.50 },
        { date: 'Wed', price: 527.20 },
        { date: 'Thu', price: 525.80 },
        { date: 'Fri', price: 524.30 }
      ],
      '1M': [
        { date: 'Week 1', price: 518.20 },
        { date: 'Week 2', price: 522.60 },
        { date: 'Week 3', price: 529.10 },
        { date: 'Week 4', price: 524.30 }
      ],
      '1Y': [
        { date: 'Oct 23', price: 442.10 },
        { date: 'Jan 24', price: 468.40 },
        { date: 'Apr 24', price: 492.10 },
        { date: 'Jul 24', price: 532.50 },
        { date: 'Oct 24', price: 524.30 }
      ],
      '5Y': [
        { date: '2020', price: 260.40 },
        { date: '2021', price: 365.10 },
        { date: '2022', price: 412.30 },
        { date: '2023', price: 450.80 },
        { date: '2024', price: 524.30 }
      ]
    }
  },
  {
    symbol: 'ITBEES',
    name: 'Nippon India ETF Nifty IT',
    category: 'Technology & IT',
    sector: 'IT',
    price: 43.15,
    change1D: 1.01,
    changePercent1D: 2.40,
    nav: 43.12,
    aum: '₹8,450 Cr',
    expenseRatio: 0.22,
    trackingError: 0.06,
    peRatio: 28.5,
    volume: '4.8M',
    high52W: 46.80,
    low52W: 32.10,
    description: 'ITBEES tracks the NIFTY IT Index, reflecting India’s global software giants and engineering service exporters with substantial USD revenue pipelines.',
    riskLevel: 'MEDIUM',
    riskScore: 62,
    riskExplanation: 'Discretionary tech export exposure with moderate volatility and USD currency hedge.',
    aiScore: 86,
    positiveSignals: [
      { label: 'Momentum', detail: 'Enterprise cloud migration and Generative AI contract signings.' },
      { label: 'Liquidity', detail: 'High daily unit churn across tier-1 software exporters.' },
      { label: 'Diversification', detail: 'Covers consulting, digital transformation and telecom software.' },
      { label: 'Trend', detail: 'Strong bounce off multi-month moving average support.' }
    ],
    riskConsiderations: [
      { label: 'Volatility', detail: 'Subject to quarterly discretionary enterprise spend reviews in the US and Europe.' },
      { label: 'Market Exposure', detail: 'Sensitivity to global tech valuations and offshore billing rates.' },
      { label: 'Sector Concentration', detail: 'TCS and Infosys constitute ~50% of the aggregate portfolio.' },
      { label: 'Tracking Differences', detail: 'Modest dividend distribution timing variances.' }
    ],
    whyThisETF: [
      'Direct participation in Generative AI migration, cloud modernization, and ERP upgrades',
      'Natural hedge against Indian Rupee currency depreciation (foreign revenues)',
      'High cash generation and robust dividend distribution history',
      'Strong pricing power and global enterprise client stickiness'
    ],
    aiInsight: {
      rating: 'Strong Buy',
      summary: 'Tech spending cycle turnaround is underway. Rate easing expectations in Western markets spark discretionary IT spending renewal.',
      pros: ['Generative AI enterprise demand', 'Consistent free cash flow yields'],
      risks: ['Global enterprise tech delay risks', 'Currency volatility']
    },
    riskRadar: {
      volatility: 58,
      liquidity: 88,
      diversification: 50,
      tracking: 92,
      marketRisk: 55
    },
    topHoldings: [
      { name: 'Tata Consultancy Services', weight: 26.1 },
      { name: 'Infosys Ltd', weight: 24.8 },
      { name: 'HCL Technologies', weight: 10.4 },
      { name: 'Wipro Ltd', weight: 8.2 },
      { name: 'Tech Mahindra Ltd', weight: 7.9 }
    ],
    historicalPrices: {
      '1D': [
        { date: '09:15', price: 42.10 },
        { date: '10:30', price: 42.45 },
        { date: '11:45', price: 42.80 },
        { date: '13:00', price: 42.95 },
        { date: '14:15', price: 43.05 },
        { date: '15:30', price: 43.15 }
      ],
      '1W': [
        { date: 'Mon', price: 41.50 },
        { date: 'Tue', price: 41.80 },
        { date: 'Wed', price: 42.10 },
        { date: 'Thu', price: 42.60 },
        { date: 'Fri', price: 43.15 }
      ],
      '1M': [
        { date: 'Week 1', price: 39.80 },
        { date: 'Week 2', price: 40.70 },
        { date: 'Week 3', price: 41.90 },
        { date: 'Week 4', price: 43.15 }
      ],
      '1Y': [
        { date: 'Oct 23', price: 32.40 },
        { date: 'Jan 24', price: 36.80 },
        { date: 'Apr 24', price: 35.10 },
        { date: 'Jul 24', price: 40.20 },
        { date: 'Oct 24', price: 43.15 }
      ],
      '5Y': [
        { date: '2020', price: 16.50 },
        { date: '2021', price: 29.80 },
        { date: '2022', price: 31.40 },
        { date: '2023', price: 34.20 },
        { date: '2024', price: 43.15 }
      ]
    }
  },
  {
    symbol: 'GOLDBEES',
    name: 'Nippon India ETF Gold BeES',
    category: 'Commodities & Metals',
    sector: 'GOLD',
    price: 64.80,
    change1D: 0.52,
    changePercent1D: 0.81,
    nav: 64.78,
    aum: '₹14,500 Cr',
    expenseRatio: 0.12,
    trackingError: 0.04,
    peRatio: 0,
    volume: '5.2M',
    high52W: 66.40,
    low52W: 51.20,
    description: 'GOLDBEES offers seamless, 99.5% purity physical gold tracking. Ideal for inflation hedging, currency preservation, and portfolio volatility mitigation.',
    riskLevel: 'LOW',
    riskScore: 32,
    riskExplanation: 'Lower market beta and defensive store-of-value hedge against equity drawdowns.',
    aiScore: 91,
    positiveSignals: [
      { label: 'Momentum', detail: 'Sovereign central bank bullion reserves demand.' },
      { label: 'Liquidity', detail: 'Largest commodity exchange traded unit in India with instant settlement.' },
      { label: 'Diversification', detail: 'Near-zero or negative correlation to domestic equity corrections.' },
      { label: 'Trend', detail: 'Steady upward trajectory driven by geopolitical inflation hedging.' }
    ],
    riskConsiderations: [
      { label: 'Volatility', detail: 'Low intraday beta, but vulnerable to rapid USD rate adjustments.' },
      { label: 'Market Exposure', detail: 'Zero dividend or coupon yield asset.' },
      { label: 'Sector Concentration', detail: '100% physical gold bullion backed.' },
      { label: 'Tracking Differences', detail: 'Import duty changes can cause localized temporary tracking shifts.' }
    ],
    whyThisETF: [
      'Zero storage hassle, locker rent, or making charges',
      'Inverse/low correlation with domestic equity drawdown phases',
      'Central bank bullion accumulation providing structural floor',
      'High daily trading liquidity on NSE for swift rebalancing'
    ],
    aiInsight: {
      rating: 'Buy',
      summary: 'Essential tactical hedge. Geopolitical uncertainties and interest rate cutting trends support precious metals upside.',
      pros: ['Defensive drawdown cushion', 'Direct physical gold backing'],
      risks: ['Zero yield/dividend asset', 'Subject to international spot gold moves']
    },
    riskRadar: {
      volatility: 35,
      liquidity: 96,
      diversification: 92,
      tracking: 98,
      marketRisk: 30
    },
    topHoldings: [
      { name: 'Physical Gold (99.5% purity)', weight: 98.8 },
      { name: 'TREPS / Cash Equiv', weight: 1.2 }
    ],
    historicalPrices: {
      '1D': [
        { date: '09:15', price: 64.30 },
        { date: '10:30', price: 64.45 },
        { date: '11:45', price: 64.60 },
        { date: '13:00', price: 64.70 },
        { date: '14:15', price: 64.75 },
        { date: '15:30', price: 64.80 }
      ],
      '1W': [
        { date: 'Mon', price: 63.90 },
        { date: 'Tue', price: 64.10 },
        { date: 'Wed', price: 64.35 },
        { date: 'Thu', price: 64.50 },
        { date: 'Fri', price: 64.80 }
      ],
      '1M': [
        { date: 'Week 1', price: 62.40 },
        { date: 'Week 2', price: 63.10 },
        { date: 'Week 3', price: 63.95 },
        { date: 'Week 4', price: 64.80 }
      ],
      '1Y': [
        { date: 'Oct 23', price: 52.80 },
        { date: 'Jan 24', price: 56.40 },
        { date: 'Apr 24', price: 62.10 },
        { date: 'Jul 24', price: 63.80 },
        { date: 'Oct 24', price: 64.80 }
      ],
      '5Y': [
        { date: '2020', price: 38.20 },
        { date: '2021', price: 41.50 },
        { date: '2022', price: 46.80 },
        { date: '2023', price: 54.10 },
        { date: '2024', price: 64.80 }
      ]
    }
  },
  {
    symbol: 'AUTOBEES',
    name: 'Nippon India ETF Nifty Auto',
    category: 'Thematic / Sectoral',
    sector: 'AUTO',
    price: 268.90,
    change1D: 3.19,
    changePercent1D: 1.20,
    nav: 268.80,
    aum: '₹3,150 Cr',
    expenseRatio: 0.24,
    trackingError: 0.08,
    peRatio: 24.1,
    volume: '850K',
    high52W: 284.00,
    low52W: 172.00,
    description: 'AUTOBEES tracks the NIFTY Auto Index, reflecting the growth of four-wheeler, two-wheeler, commercial vehicle manufacturers, and auto component suppliers.',
    riskLevel: 'MEDIUM',
    riskScore: 65,
    riskExplanation: 'Consumer cyclical exposure balanced by premiumization and EV manufacturing trends.',
    aiScore: 82,
    positiveSignals: [
      { label: 'Momentum', detail: 'Strong festive booking velocity and order backlog in SUV segments.' },
      { label: 'Liquidity', detail: 'Growing secondary market liquidity with institutional participation.' },
      { label: 'Diversification', detail: 'Mix of OEMs, commercial vehicle makers and auto ancillary suppliers.' },
      { label: 'Trend', detail: 'Beneficiary of softening commodity and raw material input costs.' }
    ],
    riskConsiderations: [
      { label: 'Volatility', detail: 'High sensitivity to interest rate financing cycles and fuel price spikes.' },
      { label: 'Market Exposure', detail: 'Discretionary consumer demand cycle dependence.' },
      { label: 'Sector Concentration', detail: 'Top 3 automotive giants comprise over 50% index weight.' },
      { label: 'Tracking Differences', detail: 'Mild impact from constituent corporate dividend timelines.' }
    ],
    whyThisETF: [
      'Surging premiumization in passenger vehicles and utility segment expansion',
      'EV transition momentum with government manufacturing subsidies',
      'Softening raw material commodity input costs aiding operating margins',
      'Strong export potential in tier-1 auto ancillary suppliers'
    ],
    aiInsight: {
      rating: 'Buy',
      summary: 'Solid festive seasonal momentum. Watch for rural two-wheeler recovery and export market normalization.',
      pros: ['High operating leverage', 'Strong order backlogs in premium SUVs'],
      risks: ['Cyclical consumer discretionary spending', 'EV technology transition risks']
    },
    riskRadar: {
      volatility: 62,
      liquidity: 78,
      diversification: 58,
      tracking: 88,
      marketRisk: 59
    },
    topHoldings: [
      { name: 'Mahindra & Mahindra Ltd', weight: 19.4 },
      { name: 'Tata Motors Ltd', weight: 16.8 },
      { name: 'Maruti Suzuki India Ltd', weight: 15.2 },
      { name: 'Bajaj Auto Ltd', weight: 9.4 },
      { name: 'Eicher Motors Ltd', weight: 7.6 }
    ],
    historicalPrices: {
      '1D': [
        { date: '09:15', price: 266.00 },
        { date: '10:30', price: 267.20 },
        { date: '11:45', price: 268.10 },
        { date: '13:00', price: 267.80 },
        { date: '14:15', price: 268.40 },
        { date: '15:30', price: 268.90 }
      ],
      '1W': [
        { date: 'Mon', price: 262.10 },
        { date: 'Tue', price: 264.40 },
        { date: 'Wed', price: 266.00 },
        { date: 'Thu', price: 267.50 },
        { date: 'Fri', price: 268.90 }
      ],
      '1M': [
        { date: 'Week 1', price: 254.20 },
        { date: 'Week 2', price: 259.00 },
        { date: 'Week 3', price: 263.80 },
        { date: 'Week 4', price: 268.90 }
      ],
      '1Y': [
        { date: 'Oct 23', price: 178.40 },
        { date: 'Jan 24', price: 205.20 },
        { date: 'Apr 24', price: 232.00 },
        { date: 'Jul 24', price: 258.90 },
        { date: 'Oct 24', price: 268.90 }
      ],
      '5Y': [
        { date: '2020', price: 82.50 },
        { date: '2021', price: 112.40 },
        { date: '2022', price: 135.20 },
        { date: '2023', price: 182.10 },
        { date: '2024', price: 268.90 }
      ]
    }
  },
  {
    symbol: 'PHARMABEES',
    name: 'Nippon India ETF Nifty Pharma',
    category: 'Healthcare & Pharma',
    sector: 'PHARMA',
    price: 21.80,
    change1D: 0.11,
    changePercent1D: 0.50,
    nav: 21.78,
    aum: '₹2,680 Cr',
    expenseRatio: 0.21,
    trackingError: 0.07,
    peRatio: 33.2,
    volume: '1.4M',
    high52W: 23.40,
    low52W: 15.60,
    description: 'Tracks the NIFTY Pharma Index, comprising India’s top pharmaceutical leaders in generics, biosimilars, and active pharmaceutical ingredients (APIs).',
    riskLevel: 'LOW',
    riskScore: 38,
    riskExplanation: 'Defensive healthcare demand with low systemic beta during market drawdowns.',
    aiScore: 84,
    positiveSignals: [
      { label: 'Momentum', detail: 'Accelerated complex generic approvals and domestic formulation margins.' },
      { label: 'Liquidity', detail: 'Steady institutional accumulation in defensive healthcare names.' },
      { label: 'Diversification', detail: 'Spans formulations, APIs, CDMO and domestic chronic therapies.' },
      { label: 'Trend', detail: 'Consistent multi-year outperformance against cyclical sectors.' }
    ],
    riskConsiderations: [
      { label: 'Volatility', detail: 'Vulnerable to US FDA regulatory inspection warning letters.' },
      { label: 'Market Exposure', detail: 'Defensive profile can lag during aggressive cyclical bull markets.' },
      { label: 'Sector Concentration', detail: '100% focused on pharmaceuticals and life sciences.' },
      { label: 'Tracking Differences', detail: 'Small cash balance maintenance for redemption liquidity.' }
    ],
    whyThisETF: [
      'Defensive growth characteristics with non-discretionary health demand',
      'Accelerated complex generic and biosimilar pipeline launches in the US',
      'Expansion into domestic branded formulations driving margin resilience',
      'CDMO and contract research opportunities from global pharma majors'
    ],
    aiInsight: {
      rating: 'Buy',
      summary: 'Defensive asset with secular growth tailwinds. Helps insulate portfolio when cyclicals experience volatility.',
      pros: ['Recession-resistant healthcare demand', 'Robust FDA compliance turnaround'],
      risks: ['US generic price erosion', 'Regulatory inspection scrutiny']
    },
    riskRadar: {
      volatility: 46,
      liquidity: 81,
      diversification: 62,
      tracking: 89,
      marketRisk: 42
    },
    topHoldings: [
      { name: 'Sun Pharmaceutical Ind Ltd', weight: 23.5 },
      { name: 'Dr. Reddy’s Laboratories', weight: 13.8 },
      { name: 'Cipla Ltd', weight: 12.9 },
      { name: 'Divi’s Laboratories', weight: 9.6 },
      { name: 'Lupin Ltd', weight: 7.2 }
    ],
    historicalPrices: {
      '1D': [
        { date: '09:15', price: 21.65 },
        { date: '10:30', price: 21.70 },
        { date: '11:45', price: 21.72 },
        { date: '13:00', price: 21.75 },
        { date: '14:15', price: 21.78 },
        { date: '15:30', price: 21.80 }
      ],
      '1W': [
        { date: 'Mon', price: 21.40 },
        { date: 'Tue', price: 21.50 },
        { date: 'Wed', price: 21.65 },
        { date: 'Thu', price: 21.72 },
        { date: 'Fri', price: 21.80 }
      ],
      '1M': [
        { date: 'Week 1', price: 20.80 },
        { date: 'Week 2', price: 21.10 },
        { date: 'Week 3', price: 21.45 },
        { date: 'Week 4', price: 21.80 }
      ],
      '1Y': [
        { date: 'Oct 23', price: 16.20 },
        { date: 'Jan 24', price: 17.80 },
        { date: 'Apr 24', price: 19.10 },
        { date: 'Jul 24', price: 20.50 },
        { date: 'Oct 24', price: 21.80 }
      ],
      '5Y': [
        { date: '2020', price: 10.50 },
        { date: '2021', price: 14.10 },
        { date: '2022', price: 13.80 },
        { date: '2023', price: 15.90 },
        { date: '2024', price: 21.80 }
      ]
    }
  },
  {
    symbol: 'CPSEETF',
    name: 'CPSE ETF (Public Sector Undertakings)',
    category: 'Equity Thematic',
    sector: 'ENERGY',
    price: 91.20,
    change1D: -1.25,
    changePercent1D: -1.35,
    nav: 91.15,
    aum: '₹41,200 Cr',
    expenseRatio: 0.05,
    trackingError: 0.05,
    peRatio: 11.2,
    volume: '6.5M',
    high52W: 104.50,
    low52W: 55.80,
    description: 'Composed of India’s top sovereign public sector enterprises including NTPC, Power Grid, ONGC, and Coal India. Renowned for dividend yields and infra spend.',
    riskLevel: 'HIGH',
    riskScore: 72,
    riskExplanation: 'Sovereign dividend utilities subject to public policy and commodity cycles.',
    aiScore: 79,
    positiveSignals: [
      { label: 'Momentum', detail: 'Record public capex and state power grid modernization investments.' },
      { label: 'Liquidity', detail: 'Massive institutional and retail daily turnover.' },
      { label: 'Diversification', detail: 'Dominant monopolistic positions in power, coal and oil exploration.' },
      { label: 'Trend', detail: 'Historically high dividend yield supporting long-term total returns.' }
    ],
    riskConsiderations: [
      { label: 'Volatility', detail: 'Subject to government disinvestment announcements and divestment discounts.' },
      { label: 'Market Exposure', detail: 'High correlation with domestic energy and resource pricing.' },
      { label: 'Sector Concentration', detail: 'Heavy concentration in power generation and petroleum.' },
      { label: 'Tracking Differences', detail: 'Frequent large dividend adjustments impact price quotes.' }
    ],
    whyThisETF: [
      'Strategic monopoly and oligopoly positions in power, energy, and resources',
      'Industry-leading dividend yield (historically 4-6%)',
      'Beneficiary of mega public capital capex and power grid revamps',
      'Very low expense ratio of 0.05%'
    ],
    aiInsight: {
      rating: 'Hold',
      summary: 'Attractive valuation and dividend characteristics, though recent rally warrants disciplined systematic accumulation on dips.',
      pros: ['High dividend support', 'Dominant sovereign utility moat'],
      risks: ['Commodity price cycles', 'Public policy interventions']
    },
    riskRadar: {
      volatility: 65,
      liquidity: 94,
      diversification: 48,
      tracking: 91,
      marketRisk: 61
    },
    topHoldings: [
      { name: 'NTPC Ltd', weight: 19.8 },
      { name: 'Power Grid Corp of India', weight: 18.9 },
      { name: 'ONGC Ltd', weight: 17.2 },
      { name: 'Coal India Ltd', weight: 16.4 },
      { name: 'Bharat Electronics Ltd', weight: 11.5 }
    ],
    historicalPrices: {
      '1D': [
        { date: '09:15', price: 92.50 },
        { date: '10:30', price: 92.10 },
        { date: '11:45', price: 91.70 },
        { date: '13:00', price: 91.40 },
        { date: '14:15', price: 91.10 },
        { date: '15:30', price: 91.20 }
      ],
      '1W': [
        { date: 'Mon', price: 93.80 },
        { date: 'Tue', price: 93.10 },
        { date: 'Wed', price: 92.40 },
        { date: 'Thu', price: 91.80 },
        { date: 'Fri', price: 91.20 }
      ],
      '1M': [
        { date: 'Week 1', price: 88.50 },
        { date: 'Week 2', price: 90.20 },
        { date: 'Week 3', price: 92.70 },
        { date: 'Week 4', price: 91.20 }
      ],
      '1Y': [
        { date: 'Oct 23', price: 58.20 },
        { date: 'Jan 24', price: 74.50 },
        { date: 'Apr 24', price: 88.10 },
        { date: 'Jul 24', price: 96.40 },
        { date: 'Oct 24', price: 91.20 }
      ],
      '5Y': [
        { date: '2020', price: 22.10 },
        { date: '2021', price: 31.40 },
        { date: '2022', price: 38.60 },
        { date: '2023', price: 55.20 },
        { date: '2024', price: 91.20 }
      ]
    }
  },
  {
    symbol: 'JUNIORBEES',
    name: 'Nippon India ETF Nifty Next 50',
    category: 'Equity Large & Mid Cap',
    sector: 'GROWTH',
    price: 745.20,
    change1D: 8.40,
    changePercent1D: 1.14,
    nav: 745.10,
    aum: '₹5,820 Cr',
    expenseRatio: 0.14,
    trackingError: 0.05,
    peRatio: 26.8,
    volume: '620K',
    high52W: 785.00,
    low52W: 520.00,
    description: 'Tracks the 50 potential future leaders ranked 51-100 on the NSE. Higher growth runway with well-governed corporate balance sheets.',
    riskLevel: 'HIGH',
    riskScore: 75,
    riskExplanation: 'High growth mid-cap momentum with wider drawdown swings than NIFTY 50.',
    aiScore: 85,
    positiveSignals: [
      { label: 'Momentum', detail: 'Rapid earnings compounding in emerging market leaders.' },
      { label: 'Liquidity', detail: 'Robust institutional presence with active arbitrage tracking.' },
      { label: 'Diversification', detail: 'Less concentrated in financial mega-caps than NIFTY 50.' },
      { label: 'Trend', detail: 'Historically delivers alpha over multi-year economic expansion cycles.' }
    ],
    riskConsiderations: [
      { label: 'Volatility', detail: 'Steeper peak-to-trough drawdowns during market corrections.' },
      { label: 'Market Exposure', detail: 'Higher beta (~1.15) relative to large-cap benchmarks.' },
      { label: 'Sector Concentration', detail: 'Broader spread across consumer, manufacturing and green energy.' },
      { label: 'Tracking Differences', detail: 'Slightly higher bid-ask spread compared to NIFTYBEES.' }
    ],
    whyThisETF: [
      'Captures upcoming candidates ready for promotion into NIFTY 50',
      'Less concentrated than top-heavy mega-caps',
      'Enhanced historical alpha over standard large-cap indices',
      'Diverse industry spread including defense, green energy, and specialty retail'
    ],
    aiInsight: {
      rating: 'Buy',
      summary: 'Ideal growth accelerator for younger investors seeking superior risk-adjusted alpha alongside core NIFTY 50.',
      pros: ['Alpha generation potential', 'High business vitality'],
      risks: ['Higher drawdown volatility than NIFTY 50', 'Slightly wider bid-ask spreads']
    },
    riskRadar: {
      volatility: 55,
      liquidity: 80,
      diversification: 85,
      tracking: 88,
      marketRisk: 58
    },
    topHoldings: [
      { name: 'Trent Ltd', weight: 4.8 },
      { name: 'Bharat Electronics Ltd', weight: 4.5 },
      { name: 'Hindustan Aeronautics Ltd', weight: 4.2 },
      { name: 'TVS Motor Co Ltd', weight: 3.9 },
      { name: 'Siemens Ltd', weight: 3.6 }
    ],
    historicalPrices: {
      '1D': [
        { date: '09:15', price: 738.00 },
        { date: '10:30', price: 740.50 },
        { date: '11:45', price: 742.80 },
        { date: '13:00', price: 743.90 },
        { date: '14:15', price: 744.50 },
        { date: '15:30', price: 745.20 }
      ],
      '1W': [
        { date: 'Mon', price: 732.00 },
        { date: 'Tue', price: 735.40 },
        { date: 'Wed', price: 739.00 },
        { date: 'Thu', price: 742.10 },
        { date: 'Fri', price: 745.20 }
      ],
      '1M': [
        { date: 'Week 1', price: 718.00 },
        { date: 'Week 2', price: 726.50 },
        { date: 'Week 3', price: 738.00 },
        { date: 'Week 4', price: 745.20 }
      ],
      '1Y': [
        { date: 'Oct 23', price: 540.00 },
        { date: 'Jan 24', price: 610.00 },
        { date: 'Apr 24', price: 685.00 },
        { date: 'Jul 24', price: 730.00 },
        { date: 'Oct 24', price: 745.20 }
      ],
      '5Y': [
        { date: '2020', price: 290.00 },
        { date: '2021', price: 420.00 },
        { date: '2022', price: 460.00 },
        { date: '2023', price: 530.00 },
        { date: '2024', price: 745.20 }
      ]
    }
  },
  {
    symbol: 'SILVERBEES',
    name: 'Nippon India ETF Silver BeES',
    category: 'Commodities & Metals',
    sector: 'METALS',
    price: 88.40,
    change1D: 1.62,
    changePercent1D: 1.87,
    nav: 88.35,
    aum: '₹4,120 Cr',
    expenseRatio: 0.18,
    trackingError: 0.06,
    peRatio: 0,
    volume: '3.1M',
    high52W: 94.20,
    low52W: 69.50,
    description: 'Direct investment into physical 99.9% fine silver. Combines precious metal store of value with massive industrial green tech demand.',
    riskLevel: 'HIGH',
    riskScore: 74,
    riskExplanation: 'Precious metal combined with high industrial solar & EV demand volatility.',
    aiScore: 80,
    positiveSignals: [
      { label: 'Momentum', detail: 'Structural multi-year global physical silver supply deficit.' },
      { label: 'Liquidity', detail: 'Rapidly expanding liquidity on national commodity segments.' },
      { label: 'Diversification', detail: 'Dual industrial and monetary hedge utility.' },
      { label: 'Trend', detail: 'Breakout above key multi-month technical resistance levels.' }
    ],
    riskConsiderations: [
      { label: 'Volatility', detail: 'Significantly higher volatility and sharp swings compared to gold.' },
      { label: 'Market Exposure', detail: 'Heavy correlation with global industrial manufacturing sentiment.' },
      { label: 'Sector Concentration', detail: '100% fine silver bullion backed.' },
      { label: 'Tracking Differences', detail: 'Vault storage, insurance costs, and customs duty changes.' }
    ],
    whyThisETF: [
      'Dual utility: Safe haven hedge + critical industrial component for solar PV & EVs',
      'Surging structural global silver deficit over the past 3 consecutive years',
      'Pure dematerialized storage with zero risk of theft or purity degradation',
      'High beta upside relative to gold during commodity expansion phases'
    ],
    aiInsight: {
      rating: 'Buy',
      summary: 'Industrial demand from solar panel installations and electronics provides substantial fundamental support to silver pricing.',
      pros: ['Green technology demand driver', 'High momentum potential'],
      risks: ['Higher volatility than gold', 'Industrial cycle dependency']
    },
    riskRadar: {
      volatility: 72,
      liquidity: 86,
      diversification: 80,
      tracking: 94,
      marketRisk: 54
    },
    topHoldings: [
      { name: 'Physical Silver (99.9% purity)', weight: 98.5 },
      { name: 'TREPS / Cash Reserve', weight: 1.5 }
    ],
    historicalPrices: {
      '1D': [
        { date: '09:15', price: 86.90 },
        { date: '10:30', price: 87.20 },
        { date: '11:45', price: 87.60 },
        { date: '13:00', price: 87.90 },
        { date: '14:15', price: 88.10 },
        { date: '15:30', price: 88.40 }
      ],
      '1W': [
        { date: 'Mon', price: 85.20 },
        { date: 'Tue', price: 85.90 },
        { date: 'Wed', price: 86.80 },
        { date: 'Thu', price: 87.40 },
        { date: 'Fri', price: 88.40 }
      ],
      '1M': [
        { date: 'Week 1', price: 82.50 },
        { date: 'Week 2', price: 84.10 },
        { date: 'Week 3', price: 86.00 },
        { date: 'Week 4', price: 88.40 }
      ],
      '1Y': [
        { date: 'Oct 23', price: 71.00 },
        { date: 'Jan 24', price: 73.50 },
        { date: 'Apr 24', price: 83.20 },
        { date: 'Jul 24', price: 89.00 },
        { date: 'Oct 24', price: 88.40 }
      ],
      '5Y': [
        { date: '2020', price: 54.00 },
        { date: '2021', price: 62.00 },
        { date: '2022', price: 66.50 },
        { date: '2023', price: 72.80 },
        { date: '2024', price: 88.40 }
      ]
    }
  },
  {
    symbol: 'LIQUIDBEES',
    name: 'Nippon India ETF Liquid BeES',
    category: 'Cash & Debt Equivalent',
    sector: 'FINANCE',
    price: 1000.00,
    change1D: 0.00,
    changePercent1D: 0.02,
    nav: 1000.00,
    aum: '₹12,850 Cr',
    expenseRatio: 0.25,
    trackingError: 0.01,
    peRatio: 0,
    volume: '1.8M',
    high52W: 1000.05,
    low52W: 999.95,
    description: 'Fixed face value ₹1,000 cash proxy. Ideal for parking paper trading or collateral balances with daily fractional dividend accrual.',
    riskLevel: 'LOW',
    riskScore: 12,
    riskExplanation: 'Ultra-low capital risk backed by overnight repo money market instruments.',
    aiScore: 95,
    positiveSignals: [
      { label: 'Momentum', detail: 'Constant ₹1,000 face value with daily fractional unit accruals.' },
      { label: 'Liquidity', detail: 'Instant redemption and margin pledge capability on NSE.' },
      { label: 'Diversification', detail: 'Backed by sovereign collateral and clearing corporation guarantees.' },
      { label: 'Trend', detail: 'Perfect preservation of trading purchasing power.' }
    ],
    riskConsiderations: [
      { label: 'Volatility', detail: 'Near-zero price volatility.' },
      { label: 'Market Exposure', detail: 'Zero equity upside during bull runs.' },
      { label: 'Sector Concentration', detail: '100% money market debt and repo instruments.' },
      { label: 'Tracking Differences', detail: 'Virtually zero tracking error.' }
    ],
    whyThisETF: [
      'Near-zero capital risk with overnight money market asset backing',
      'Daily returns credited as fractional units',
      'Instant margin deployment readiness on trading terminal',
      'Ultra stable NAV anchor for portfolio rebalancing buffer'
    ],
    aiInsight: {
      rating: 'Hold',
      summary: 'Prime capital preservation vehicle when equity markets are stretched or when awaiting tactical re-entry triggers.',
      pros: ['Zero market volatility', 'Capital preservation'],
      risks: ['Opportunity cost during bull markets', 'Inflation drag']
    },
    riskRadar: {
      volatility: 5,
      liquidity: 98,
      diversification: 99,
      tracking: 99,
      marketRisk: 4
    },
    topHoldings: [
      { name: 'Tri-party Repo (TREPS)', weight: 88.4 },
      { name: 'Overnight Reverse Repo & T-Bills', weight: 11.6 }
    ],
    historicalPrices: {
      '1D': [
        { date: '09:15', price: 1000.00 },
        { date: '10:30', price: 1000.00 },
        { date: '11:45', price: 1000.00 },
        { date: '13:00', price: 1000.00 },
        { date: '14:15', price: 1000.00 },
        { date: '15:30', price: 1000.00 }
      ],
      '1W': [
        { date: 'Mon', price: 1000.00 },
        { date: 'Tue', price: 1000.00 },
        { date: 'Wed', price: 1000.00 },
        { date: 'Thu', price: 1000.00 },
        { date: 'Fri', price: 1000.00 }
      ],
      '1M': [
        { date: 'Week 1', price: 1000.00 },
        { date: 'Week 2', price: 1000.00 },
        { date: 'Week 3', price: 1000.00 },
        { date: 'Week 4', price: 1000.00 }
      ],
      '1Y': [
        { date: 'Oct 23', price: 1000.00 },
        { date: 'Jan 24', price: 1000.00 },
        { date: 'Apr 24', price: 1000.00 },
        { date: 'Jul 24', price: 1000.00 },
        { date: 'Oct 24', price: 1000.00 }
      ],
      '5Y': [
        { date: '2020', price: 1000.00 },
        { date: '2021', price: 1000.00 },
        { date: '2022', price: 1000.00 },
        { date: '2023', price: 1000.00 },
        { date: '2024', price: 1000.00 }
      ]
    }
  }
];

export const INITIAL_HOLDINGS: Holding[] = [
  {
    symbol: 'NIFTYBEES',
    etfName: 'Nippon India ETF Nifty 50 BeES',
    quantity: 120,
    avgBuyPrice: 260.50,
    currentPrice: 271.45,
    investedAmount: 31260,
    currentValue: 32574,
    totalPnl: 1314,
    totalPnlPercent: 4.20,
    dayPnl: 186,
    dayPnlPercent: 0.57,
    riskLevel: 'MEDIUM'
  },
  {
    symbol: 'ITBEES',
    etfName: 'Nippon India ETF Nifty IT',
    quantity: 350,
    avgBuyPrice: 39.80,
    currentPrice: 43.15,
    investedAmount: 13930,
    currentValue: 15102.50,
    totalPnl: 1172.50,
    totalPnlPercent: 8.42,
    dayPnl: 353.50,
    dayPnlPercent: 2.40,
    riskLevel: 'MEDIUM'
  },
  {
    symbol: 'GOLDBEES',
    etfName: 'Nippon India ETF Gold BeES',
    quantity: 180,
    avgBuyPrice: 61.20,
    currentPrice: 64.80,
    investedAmount: 11016,
    currentValue: 11664,
    totalPnl: 648,
    totalPnlPercent: 5.88,
    dayPnl: 93.60,
    dayPnlPercent: 0.81,
    riskLevel: 'LOW'
  },
  {
    symbol: 'BANKBEES',
    etfName: 'Nippon India ETF Bank BeES',
    quantity: 15,
    avgBuyPrice: 532.00,
    currentPrice: 524.30,
    investedAmount: 7980,
    currentValue: 7864.50,
    totalPnl: -115.50,
    totalPnlPercent: -1.45,
    dayPnl: -63.00,
    dayPnlPercent: -0.80,
    riskLevel: 'HIGH'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-719302',
    symbol: 'NIFTYBEES',
    etfName: 'Nippon India ETF Nifty 50 BeES',
    type: 'BUY',
    quantity: 40,
    price: 268.50,
    totalAmount: 10740,
    timestamp: 'Today, 09:45 AM',
    status: 'FILLED',
    riskLevel: 'MEDIUM',
    riskScore: 68
  },
  {
    id: 'ORD-682194',
    symbol: 'ITBEES',
    etfName: 'Nippon India ETF Nifty IT',
    type: 'BUY',
    quantity: 100,
    price: 42.10,
    totalAmount: 4210,
    timestamp: 'Today, 11:20 AM',
    status: 'FILLED',
    riskLevel: 'MEDIUM',
    riskScore: 62
  },
  {
    id: 'ORD-554109',
    symbol: 'GOLDBEES',
    etfName: 'Nippon India ETF Gold BeES',
    type: 'SELL',
    quantity: 20,
    price: 64.20,
    totalAmount: 1284,
    timestamp: 'Yesterday, 03:10 PM',
    status: 'FILLED',
    riskLevel: 'LOW',
    riskScore: 32
  },
  {
    id: 'ORD-449120',
    symbol: 'BANKBEES',
    etfName: 'Nippon India ETF Bank BeES',
    type: 'BUY',
    quantity: 15,
    price: 532.00,
    totalAmount: 7980,
    timestamp: '2 days ago',
    status: 'FILLED',
    riskLevel: 'HIGH',
    riskScore: 78
  }
];

export const INITIAL_WATCHLIST: WatchlistItem[] = [
  {
    id: 'wl-1',
    symbol: 'NIFTYBEES',
    etfName: 'Nippon India ETF Nifty 50 BeES',
    price: 271.45,
    changePercent: 0.57,
    priceAlertAbove: 275.00,
    priceAlertBelow: 265.00,
    aiAlertsEnabled: true,
    addedAt: 'Today, 09:20 AM',
    riskLevel: 'MEDIUM',
    riskScore: 68,
    aiScore: 88
  },
  {
    id: 'wl-2',
    symbol: 'ITBEES',
    etfName: 'Nippon India ETF Nifty IT',
    price: 43.15,
    changePercent: 2.40,
    priceAlertAbove: 45.00,
    priceAlertBelow: 40.00,
    aiAlertsEnabled: true,
    addedAt: 'Today, 09:25 AM',
    riskLevel: 'MEDIUM',
    riskScore: 62,
    aiScore: 86
  },
  {
    id: 'wl-3',
    symbol: 'AUTOBEES',
    etfName: 'Nippon India ETF Nifty Auto',
    price: 268.90,
    changePercent: 1.20,
    priceAlertAbove: 275.00,
    aiAlertsEnabled: false,
    addedAt: 'Yesterday',
    riskLevel: 'MEDIUM',
    riskScore: 65,
    aiScore: 82
  },
  {
    id: 'wl-4',
    symbol: 'SILVERBEES',
    etfName: 'Nippon India ETF Silver BeES',
    price: 88.40,
    changePercent: 1.87,
    priceAlertAbove: 90.00,
    aiAlertsEnabled: true,
    addedAt: 'Yesterday',
    riskLevel: 'HIGH',
    riskScore: 74,
    aiScore: 80
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Paper Trade Executed',
    message: 'Bought 100 ITBEES at ₹42.10 (ORD-682194). Balance updated.',
    type: 'ORDER',
    timestamp: '11:20 AM',
    read: false
  },
  {
    id: 'notif-2',
    title: 'AI Market Momentum Alert',
    message: 'IT sector leading with +2.40% surge following positive tech guidance.',
    type: 'AI',
    timestamp: '10:05 AM',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Paper Trade Executed',
    message: 'Bought 40 NIFTYBEES at ₹268.50 (ORD-719302).',
    type: 'ORDER',
    timestamp: '09:45 AM',
    read: true
  },
  {
    id: 'notif-4',
    title: 'Watchlist Update',
    message: 'Added ITBEES to your watchlist with AI alerts enabled.',
    type: 'ALERT',
    timestamp: '09:25 AM',
    read: true
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'ETF Explorer',
    description: 'Explore and analyze details of 3 different ETFs.',
    icon: '🧭',
    unlocked: true,
    progress: 3,
    maxProgress: 3,
    unlockedAt: 'Today'
  },
  {
    id: 'ach-2',
    title: 'First Paper Trade',
    description: 'Complete your first virtual paper buy or sell trade.',
    icon: '⚡',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    unlockedAt: 'Today'
  },
  {
    id: 'ach-3',
    title: '10 Paper Trades',
    description: 'Execute 10 simulated paper trades to build market intuition.',
    icon: '🎯',
    unlocked: false,
    progress: 4,
    maxProgress: 10
  },
  {
    id: 'ach-4',
    title: 'Watchlist Starter',
    description: 'Add your first ETF to your personal tracking watchlist.',
    icon: '⭐',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    unlockedAt: 'Today'
  },
  {
    id: 'ach-5',
    title: 'Quiz Master',
    description: 'Achieve a score of 80% or higher in the ETF Knowledge Quiz.',
    icon: '🎓',
    unlocked: false,
    progress: 0,
    maxProgress: 100
  },
  {
    id: 'ach-6',
    title: 'Market Explorer',
    description: 'Analyze the Market Heatmap and check sector breadth.',
    icon: '📊',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    unlockedAt: 'Today'
  }
];

export const LEARNING_LESSONS: LearningLesson[] = [
  {
    id: 'les-1',
    title: 'What is an ETF? (Exchange Traded Fund)',
    duration: '5 min read',
    level: 'Beginner',
    category: 'Foundations',
    description: 'Discover how an ETF packages hundreds of stocks into a single tradable unit that trades live like a stock during market hours.',
    keyTakeaways: [
      'An ETF pools investor money to buy an index or basket of securities.',
      'Unlike mutual funds which settle once a day at end-of-day NAV, ETFs trade in real time.',
      'ETFs generally have drastically lower expense ratios than actively managed funds.'
    ],
    completed: true
  },
  {
    id: 'les-2',
    title: 'Demystifying Tracking Error & Expense Ratio',
    duration: '7 min read',
    level: 'Beginner',
    category: 'Mechanics',
    description: 'Learn the two most crucial metrics when evaluating which ETF issuer to choose for the exact same underlying benchmark.',
    keyTakeaways: [
      'Expense ratio is the annual percentage fee charged by the fund manager.',
      'Tracking error measures standard deviation of excess returns between the ETF and index.',
      'Lower expense ratios coupled with minimal tracking error yield the highest compounding fidelity.'
    ],
    completed: false
  },
  {
    id: 'les-3',
    title: 'Secondary Market Liquidity & iNAV',
    duration: '8 min read',
    level: 'Intermediate',
    category: 'Trading Skills',
    description: 'Understand intraday indicative NAV (iNAV), market makers, creation units, and how to avoid wide bid-ask spreads when executing orders.',
    keyTakeaways: [
      'Never use market orders during the first 15 minutes of market open (09:15 - 09:30).',
      'Compare market price against indicative NAV (iNAV) before placing trades.',
      'Use limit orders close to the iNAV for optimal execution.'
    ],
    completed: false
  },
  {
    id: 'les-4',
    title: 'Asset Allocation & The Core-Satellite Strategy',
    duration: '10 min read',
    level: 'Intermediate',
    category: 'Portfolio Construction',
    description: 'Build an all-weather portfolio using 70% low-cost broad index ETFs as the core and 30% tactical thematic or commodity ETFs as satellites.',
    keyTakeaways: [
      'Core allocation (e.g. NIFTYBEES, JUNIORBEES) anchors stability.',
      'Satellite allocation (e.g. ITBEES, GOLDBEES, AUTOBEES) generates sector alpha.',
      'Rebalancing periodically locks in profits and restores target risk profile.'
    ],
    completed: false
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'How do ETFs differ primarily from traditional Open-Ended Mutual Funds?',
    options: [
      'ETFs can only hold government bonds',
      'ETFs trade continuously on the stock exchange at real-time prices throughout market hours',
      'ETFs have no fund management fees whatsoever',
      'ETFs guarantee capital protection'
    ],
    correctIndex: 1,
    explanation: 'Correct! ETFs trade on stock exchanges like regular shares, allowing investors to buy and sell at live prices during trading hours, whereas mutual funds settle once daily at close-of-market NAV.'
  },
  {
    id: 2,
    question: 'What does a lower "Expense Ratio" indicate in an ETF?',
    options: [
      'The ETF has poorer risk management',
      'More of your money stays invested and compounds over time rather than going towards management fees',
      'The ETF is actively attempting to beat the index',
      'The fund manager takes higher leverage'
    ],
    correctIndex: 1,
    explanation: 'Correct! The expense ratio represents the annual percentage deducted for fund operating expenses. A lower ratio means lower drag on your long-term compounding.'
  },
  {
    id: 3,
    question: 'What does "Tracking Error" measure in ETF analysis?',
    options: [
      'The likelihood of default by the custodian',
      'The volatility of the company’s quarterly earnings',
      'How closely the ETF’s returns mirror the returns of the underlying benchmark index',
      'The speed of dividend payouts'
    ],
    correctIndex: 2,
    explanation: 'Correct! Tracking error quantifies the consistency with which an ETF follows its benchmark index. Lower tracking error signifies higher operational precision.'
  },
  {
    id: 4,
    question: 'Why is Gold (e.g. GOLDBEES) frequently included in an ETF portfolio?',
    options: [
      'It always produces the highest quarterly cash dividends',
      'It acts as an uncorrelated or inverse hedge against equity market drawdown phases and currency inflation',
      'It eliminates all investment risk from equities',
      'It is guaranteed by central banks to double every 3 years'
    ],
    correctIndex: 1,
    explanation: 'Correct! Gold historically has low or negative correlation with equity downturns, providing portfolio stabilization and inflation resilience.'
  },
  {
    id: 5,
    question: 'What is the purpose of periodic Portfolio Rebalancing?',
    options: [
      'To chase whatever stock surged the most this morning',
      'To systematically restore your portfolio to your chosen target risk-weightings by trimming winners and buying under-allocated assets',
      'To increase broker commission fees',
      'To convert all holdings into cash permanently'
    ],
    correctIndex: 1,
    explanation: 'Correct! Portfolio rebalancing trims outperforming assets that have grown beyond your risk tolerance and reallocates into under-allocated asset classes to maintain your target risk profile.'
  }
];

export const BENCHMARK_COMPARISON = {
  timeframes: ['1M', '3M', '6M', '1Y', 'YTD'],
  portfolioReturn: 8.42,
  nifty50Return: 6.90,
  goldReturn: 11.20,
  alpha: 1.52,
  chartData: [
    { period: 'Jan', portfolio: 0.0, nifty50: 0.0, gold: 0.0 },
    { period: 'Feb', portfolio: 1.8, nifty50: 1.2, gold: 0.9 },
    { period: 'Mar', portfolio: 2.9, nifty50: 2.1, gold: 3.4 },
    { period: 'Apr', portfolio: 4.1, nifty50: 3.5, gold: 5.6 },
    { period: 'May', portfolio: 5.2, nifty50: 4.1, gold: 7.2 },
    { period: 'Jun', portfolio: 4.8, nifty50: 4.0, gold: 8.5 },
    { period: 'Jul', portfolio: 6.4, nifty50: 5.3, gold: 9.1 },
    { period: 'Aug', portfolio: 7.1, nifty50: 5.8, gold: 9.8 },
    { period: 'Sep', portfolio: 7.9, nifty50: 6.4, gold: 10.5 },
    { period: 'Oct', portfolio: 8.42, nifty50: 6.90, gold: 11.20 }
  ]
};
