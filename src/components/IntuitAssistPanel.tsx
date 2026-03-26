"use client";
import { useState } from "react";

/* Intuit Intelligence slide-over panel — QBO blue branding */
export function IntuitAssistPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [input, setInput] = useState("");

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/10 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-[380px] bg-white border-l border-[#BABEC5] shadow-lg z-50 flex flex-col slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#D9D9D9]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg ii-gradient flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-[#0D333F]">Intuit Intelligence</h3>
              <p className="text-[10px] text-[#8C8C8C]">AI-powered insights for your business</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[#F4F4EF] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B6C72" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex gap-2.5">
            <div className="w-6 h-6 rounded-md ii-gradient flex items-center justify-center shrink-0 mt-0.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
            </div>
            <div className="bg-[#EAF6F7] rounded-lg rounded-tl-none p-3 flex-1">
              <p className="text-[13px] text-[#0D333F] leading-relaxed">
                Good morning! I&apos;ve analyzed your L2C pipeline overnight. Here are your top priorities:
              </p>
              <div className="mt-3 space-y-2">
                {[
                  { icon: "🔴", text: "7 stale leads with $41K at risk — contact top 3 today" },
                  { icon: "📊", text: "Meta ad outperforming Google by 34% on CPL" },
                  { icon: "⚠️", text: "Davis project $380 over budget — electrical sub issue" },
                  { icon: "💰", text: "2 invoices overdue totaling $18.5K" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[12px] shrink-0">{item.icon}</span>
                    <span className="text-[12px] text-[#0D333F]">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold text-[#8C8C8C] uppercase tracking-wider">Quick Actions</p>
            {[
              "Show me pipeline forecast for this quarter",
              "Which leads should I contact first?",
              "Summarize project profitability",
              "Draft a follow-up for overdue invoices",
            ].map((q) => (
              <button
                key={q}
                className="w-full text-left text-[12px] text-[#6B6C72] px-3 py-2 rounded-md border border-[#D9D9D9] hover:bg-[#F4F4EF] hover:text-[#0D333F] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-3 border-t border-[#D9D9D9]">
          <div className="flex items-center gap-2 bg-[#F4F4EF] rounded-lg px-3 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Intuit Intelligence anything..."
              className="flex-1 bg-transparent text-[13px] text-[#000000] placeholder-[#8C8C8C] outline-none"
            />
            <button className="w-7 h-7 rounded-md ii-gradient flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </div>
          <p className="text-[9px] text-[#8C8C8C] mt-1.5 text-center">Intuit Intelligence uses AI. Responses may not always be accurate.</p>
        </div>
      </div>
    </>
  );
}
