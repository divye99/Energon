import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Loader2, Bot } from 'lucide-react';
import { callGeminiAPI } from '../data/constants';

const VoltChatbot = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{
    role: 'assistant',
    text: "Hi! I'm Volt ⚡ — Energon's AI assistant. Paste your BOQ or ask me anything about wires, cables, or pricing.",
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    const responseText = await callGeminiAPI(userMsg, products);
    setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-brand-green-dark text-white p-4 rounded-full shadow-xl hover:scale-105 transition-transform flex items-center gap-2 group ring-4 ring-brand-green/20"
      >
        {isOpen ? <X size={22} /> : <Sparkles size={22} className="text-green-300" />}
        <span className={`font-semibold hidden group-hover:block whitespace-nowrap text-sm ${isOpen ? 'hidden' : ''}`}>
          Volt AI
        </span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[480px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-brand-green-dark p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={18} className="text-green-300" />
              <div>
                <h3 className="font-semibold text-sm">Volt AI Assistant</h3>
                <span className="text-[10px] text-green-300">Powered by Gemini · Energon</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-xl p-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-green text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-xl rounded-tl-none border border-slate-200 shadow-sm">
                  <Loader2 size={15} className="animate-spin text-brand-green" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <input
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none text-slate-800 placeholder-slate-400"
                placeholder="Ask about pricing, specs, BOQ..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-brand-green text-white p-2 rounded-lg hover:bg-brand-green-mid disabled:opacity-50 transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default VoltChatbot;
