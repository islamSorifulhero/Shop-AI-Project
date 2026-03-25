'use client';
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are ShopAI Assistant, a helpful e-commerce shopping assistant. You help customers find products, answer questions about orders, shipping, returns, and provide product recommendations.

Your personality:
- Friendly, helpful, and enthusiastic about shopping
- Knowledgeable about products in electronics, fashion, home goods, sports, beauty, books, toys, and automotive
- Keep responses concise but helpful (2-4 sentences usually)
- Use emojis occasionally to be friendly

You can help with:
- Product recommendations and comparisons
- Finding products by category, price range, or features
- Answering questions about shipping (standard 3-5 days, express 1-2 days)
- Return policy (30-day returns, free for defective items)
- Payment methods (credit/debit cards, PayPal, crypto)
- General shopping advice

Available product categories: Electronics, Fashion, Home & Garden, Sports, Beauty, Books, Toys, Automotive

Keep responses short and actionable. Always be positive and encouraging.`;

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your ShopAI assistant 🛍️ I can help you find products, answer questions, and make your shopping experience amazing! What are you looking for today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 400,
          system: SYSTEM_PROMPT,
          messages: [
            ...messages.filter(m => m.id !== '1').map(m => ({
              role: m.role,
              content: m.content,
            })),
            { role: 'user', content: userMessage.content },
          ],
        }),
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || "I'm having trouble connecting right now. Please try again!";

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        timestamp: new Date(),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having a connection issue right now. Please try again in a moment! 😊",
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "Recommend headphones under $100",
    "What's your return policy?",
    "Best-selling products?",
    "Shipping times?",
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center',
          isOpen
            ? 'bg-gray-700 dark:bg-gray-600 rotate-0'
            : 'bg-gradient-to-br from-primary-500 to-accent-600 hover:scale-110'
        )}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-accent-600 px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">ShopAI Assistant</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-white/80 text-xs">Online · Powered by Claude</span>
              </div>
            </div>
            <Sparkles className="w-4 h-4 text-white/60 ml-auto" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={clsx('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <p className={clsx('text-xs mt-1', msg.role === 'user' ? 'text-gray-400' : 'text-white/60')}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="chat-bubble-ai">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickPrompts.map(prompt => (
                <button
                  key={prompt}
                  onClick={() => { setInput(prompt); }}
                  className="text-xs px-2.5 py-1.5 bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-gray-100 dark:border-gray-800 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-600 rounded-xl flex items-center justify-center text-white hover:opacity-90 disabled:opacity-50 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
