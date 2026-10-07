export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface ETF {
  symbol: string;
  name: string;
  category: string;
  sector: string;
  price: number;
  change1D: number;
  changePercent1D: number;
  nav: number;
  aum: string;
  expenseRatio: number;
  trackingError: number;
  peRatio: number;
  volume: string;
  high52W: number;
  low52W: number;
  description: string;
  whyThisETF: string[];
  riskLevel: RiskLevel;
  riskScore: number;
  riskExplanation: string;
  aiScore: number;
  positiveSignals: {
    label: string;
    detail: string;
  }[];
  riskConsiderations: {
    label: string;
    detail: string;
  }[];
  aiInsight: {
    rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Neutral' | 'Underweight';
    summary: string;
    pros: string[];
    risks: string[];
  };
  riskRadar: {
    volatility: number; // 0 - 100
    liquidity: number; // 0 - 100
    diversification: number; // 0 - 100
    tracking: number; // 0 - 100
    marketRisk: number; // 0 - 100
  };
  topHoldings: { name: string; weight: number }[];
  historicalPrices: {
    [key: string]: { date: string; price: number }[];
  };
}

export interface MarketSector {
  name: string;
  code: string;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
  trackedEtfsCount: number;
  topEtf: string;
  description: string;
}

export interface Order {
  id: string;
  symbol: string;
  etfName: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  totalAmount: number;
  timestamp: string;
  status: 'FILLED' | 'CANCELLED';
  riskLevel?: RiskLevel;
  riskScore?: number;
}

export interface Holding {
  symbol: string;
  etfName: string;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  investedAmount: number;
  currentValue: number;
  totalPnl: number;
  totalPnlPercent: number;
  dayPnl: number;
  dayPnlPercent: number;
  riskLevel?: RiskLevel;
}

export interface WatchlistItem {
  id: string;
  symbol: string;
  etfName: string;
  price: number;
  changePercent: number;
  priceAlertAbove?: number;
  priceAlertBelow?: number;
  aiAlertsEnabled: boolean;
  addedAt: string;
  riskLevel?: RiskLevel;
  riskScore?: number;
  aiScore?: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'ORDER' | 'ALERT' | 'AI' | 'ACHIEVEMENT' | 'SYSTEM';
  timestamp: string;
  read: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  unlockedAt?: string;
}

export interface GoalPlan {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetMonths: number;
  expectedReturnAnnual: number;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedPrompts?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  displayName?: string;
  email: string;
  role: string;
  avatar?: string;
  virtualCash: number;
  initialCash: number;
  authProvider?: 'email' | 'google' | 'microsoft' | 'demo';
  createdAt?: string;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  status: 'open' | 'closed';
}

export interface LearningLesson {
  id: string;
  title: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  description: string;
  keyTakeaways: string[];
  completed: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
