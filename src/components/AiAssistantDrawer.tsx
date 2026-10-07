import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  RefreshCw,
  HelpCircle,
  Copy,
  Check,
  ChevronRight,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { ChatMessage } from '../types';

export const AiAssistantDrawer: React.FC = () => {
  const {
    isAiDrawerOpen,
    setIsAiDrawerOpen,
    holdings,
    virtualCash,
    selectedEtfSymbol,
    openEtfDetails
  } = useTrading();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: `👋 Hello! I am **SmartETF AI Assistant**.
I can answer your questions about ETFs, explain expense ratios and tracking errors, analyze your paper trading portfolio allocation, and break down market trends.

How can I help you today?`,
      timestamp: 'Just now',
      suggestedPrompts: [
        'Explain ETF',
        'Analyze My Portfolio',
        'Explain Risk',
        'What is Market Momentum?'
      ]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAiDrawerOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isAiDrawerOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          context: {
            virtualCash,
            activeHoldings: holdings.map((h) => ({ symbol: h.symbol, quantity: h.quantity, avgBuyPrice: h.avgBuyPrice })),
            selectedEtfSymbol
          }
        })
      });

      if (!response.ok) {
        throw new Error('API server request failed');
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: data.suggestedPrompts
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      // Local fallback in case network disconnects
      const fallbackMsg: ChatMessage = {
        id: `ai-fb-${Date.now()}`,
        sender: 'assistant',
        content: `I've analyzed your question on **"${query}"** in the educational simulator.
ETFs allow passive, low-cost index tracking with real-time liquidity. For broad safety, keep 50%+ in large-cap indices like **NIFTYBEES**, 15% in **GOLDBEES** for stability, and allocate the remainder to sectoral growth like **ITBEES** or **BANKBEES**.`,
        timestamp: 'Just now',
        suggestedPrompts: ['What is NIFTYBEES?', 'Explain ETF risk', 'Analyze My Portfolio']
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exampleQuestions = [
    'What is an ETF?',
    'What is NIFTYBEES?',
    'Explain expense ratio.',
    'Explain ETF risk.',
    'Why did my portfolio P&L change?',
    'What is diversification?',
    'What is tracking error?',
    'Explain my current portfolio allocation.'
  ];

  return (
    <>
      {/* Floating Bottom-Right Trigger Button (Requirement 1) */}
      <button
        onClick={() => setIsAiDrawerOpen(!isAiDrawerOpen)}
        className="fixed bottom-20 md:bottom-6 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        aria-label="Open SmartETF AI Assistant"
      >
        <span className="text-base group-hover:rotate-12 transition-transform">🤖</span>
        <span>Ask SmartETF</span>
        <span className="w-2 h-2 rounded-full bg-zinc-950 animate-ping opacity-75"></span>
      </button>

      {/* Slide-out Drawer Panel */}
      {isAiDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full sm:w-[480px] h-full bg-zinc-900 border-l border-zinc-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 bg-zinc-950/70 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-zinc-950 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-zinc-100 flex items-center gap-2">
                    SmartETF AI Assistant
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                      v2.5
                    </span>
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Ask questions about ETFs, markets, portfolio analytics and investing concepts.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAiDrawerOpen(false)}
                className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Context Bar */}
            <div className="px-4 py-2 bg-zinc-950/40 border-b border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Simulated Portfolio: ₹{virtualCash.toLocaleString('en-IN')} Cash</span>
              </div>
              <span className="text-zinc-400 font-mono">{holdings.length} Active Positions</span>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 mb-1 px-1">
                    {msg.sender === 'assistant' ? (
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <Sparkles className="w-3 h-3" /> SmartETF AI
                      </span>
                    ) : (
                      <span>You</span>
                    )}
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`relative p-3.5 rounded-2xl max-w-[90%] text-xs leading-relaxed group ${
                      msg.sender === 'user'
                        ? 'bg-emerald-500 text-zinc-950 font-medium rounded-tr-sm shadow-md shadow-emerald-500/10'
                        : 'bg-zinc-950/80 border border-zinc-800 text-zinc-200 rounded-tl-sm shadow-inner'
                    }`}
                  >
                    {/* Render message formatting */}
                    <div className="whitespace-pre-line space-y-2">
                      {msg.content}
                    </div>

                    {msg.sender === 'assistant' && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="absolute top-2 right-2 p-1 rounded-md text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Render suggested prompts if present */}
                  {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-full">
                      {msg.suggestedPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => handleSendMessage(prompt)}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-800/80 hover:bg-emerald-500/20 hover:border-emerald-500/40 border border-zinc-700/60 text-zinc-300 hover:text-emerald-400 transition-all cursor-pointer flex items-center gap-1"
                        >
                          <span>{prompt}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 max-w-xs text-xs text-zinc-400">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                  <span>SmartETF AI is formulating an answer...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Inspiration Drawer (Accordion / Pill list) */}
            <div className="px-4 py-2 bg-zinc-950/60 border-t border-zinc-800/80 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-1.5">
              <span className="text-[10px] text-zinc-400 font-bold uppercase mr-1">Quick:</span>
              {exampleQuestions.slice(0, 4).map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className="text-[10px] px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-colors flex-shrink-0 cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-950/90">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about ETFs, portfolio P&L, expense ratios..."
                  className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 placeholder-zinc-400 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-zinc-950 font-bold transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-2 px-1">
                <span>Educational AI simulation</span>
                <span className="flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-amber-400" />
                  Not certified financial advice
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
