"use client";
import { useState } from "react";

const CURRENT = [
  { channel: "Meta Ads", icon: "📱", pct: 40, color: "#1877F2" },
  { channel: "Google Ads", icon: "🔍", pct: 35, color: "#EA4335" },
  { channel: "Email", icon: "📧", pct: 10, color: "#0B7F5C" },
  { channel: "SMS", icon: "📲", pct: 10, color: "#9CA3AF" },
  { channel: "WhatsApp", icon: "💬", pct: 5, color: "#25D366" },
];

const RECOMMENDED = [
  { channel: "Meta Ads", icon: "📱", pct: 35, color: "#1877F2", delta: -5 },
  { channel: "Google Ads", icon: "🔍", pct: 25, color: "#EA4335", delta: -10 },
  { channel: "Email", icon: "📧", pct: 15, color: "#0B7F5C", delta: 5 },
  { channel: "WhatsApp", icon: "💬", pct: 25, color: "#25D366", delta: 20 },
  { channel: "SMS", icon: "📲", pct: 0, color: "#9CA3AF", delta: -10 },
];

function AllocationBar({ items }: { items: { channel: string; pct: number; color: string }[] }) {
  return (
    <div className="flex h-[28px] rounded-full overflow-hidden">
      {items.filter(i => i.pct > 0).map((item) => (
        <div key={item.channel} className="relative flex items-center justify-center" style={{ width: `${item.pct}%`, backgroundColor: item.color, minWidth: item.pct > 0 ? 24 : 0 }}>
          <span className="text-[9px] font-bold text-white drop-shadow-sm">{item.pct}%</span>
        </div>
      ))}
    </div>
  );
}

export function CampaignBudgetOptimizer() {
  const [applied, setApplied] = useState(false);

  return (
    <div className="qbo-card p-5 overflow-hidden" style={{ borderColor: "rgba(11,127,92,0.12)", boxShadow: "0 0 0 1px rgba(11,127,92,0.04), 0 2px 8px rgba(11,127,92,0.06)" }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-md ii-gradient flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold text-[#22262A]">AI Budget Optimizer — Profit-Based</h3>
          <p className="text-[10px] text-[#9CA3AF]">Optimized on net profit from QBO, not just CPL or ROAS</p>
        </div>
      </div>

      {/* Current allocation */}
      <div className="mb-4">
        <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Current Budget Split</p>
        <AllocationBar items={CURRENT} />
        <div className="flex justify-between mt-1.5">
          {CURRENT.map((c) => (
            <div key={c.channel} className="flex items-center gap-1">
              <span className="text-[10px]">{c.icon}</span>
              <span className="text-[9px] text-[#6B7280]">{c.channel}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended allocation */}
      <div className="mb-4">
        <p className="text-[10px] font-semibold ii-text uppercase tracking-wider mb-2">✦ Recommended Split (Profit-Optimized)</p>
        <AllocationBar items={RECOMMENDED} />
        <div className="flex gap-2 mt-2 flex-wrap">
          {RECOMMENDED.map((r) => (
            <div key={r.channel} className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] ${
              r.delta > 0 ? "bg-[#F0FAF0] text-[#108000]" : r.delta < 0 ? "bg-[#FEF2F2] text-[#D52B1E]" : "bg-[#F3F4F6] text-[#9CA3AF]"
            }`}>
              <span>{r.icon}</span>
              <span className="font-medium">{r.channel}</span>
              <span className="font-bold">{r.delta > 0 ? "+" : ""}{r.delta}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Projected impact */}
      <div className="p-3 bg-[#F0FAF0] rounded-lg mb-4">
        <p className="text-[10px] font-semibold text-[#108000] uppercase tracking-wider mb-2">Projected Monthly Impact</p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-[18px] font-bold text-[#108000]">+$4,200</p>
            <p className="text-[10px] text-[#6B7280]">Net profit/mo</p>
          </div>
          <div>
            <p className="text-[18px] font-bold text-[#108000]">+6</p>
            <p className="text-[10px] text-[#6B7280]">Additional leads</p>
          </div>
          <div>
            <p className="text-[18px] font-bold text-[#108000]">-$400</p>
            <p className="text-[10px] text-[#6B7280]">Waste eliminated</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setApplied(true)}
          className={`text-[12px] font-medium px-4 py-2 rounded-md transition-all ${applied ? "bg-[#108000] text-white" : "ii-gradient text-white hover:opacity-90"}`}
        >
          {applied ? "✓ Applied" : "Apply Recommendations"}
        </button>
        <button className="text-[12px] font-medium px-4 py-2 rounded-md border border-[#D1D5DB] text-[#22262A] hover:bg-[#F3F4F6]">Customize Split</button>
      </div>
    </div>
  );
}
