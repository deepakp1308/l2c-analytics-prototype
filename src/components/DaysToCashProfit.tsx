"use client";

import { BarChart } from "@/components/BarChart";

const DAYS_DATA = [
  { label: "Referral", value: 18, color: "#108000" },
  { label: "Google", value: 28, color: "#EA4335" },
  { label: "Email", value: 34, color: "#0B7F5C" },
  { label: "Meta", value: 40, color: "#1877F2" },
  { label: "WhatsApp", value: 22, color: "#25D366" },
];

const PROFIT_DATA = [
  { label: "Referral", value: 42.0, color: "#108000" },
  { label: "WhatsApp", value: 11.3, color: "#25D366" },
  { label: "Google", value: 6.2, color: "#EA4335" },
  { label: "Meta", value: 4.8, color: "#1877F2" },
  { label: "Email", value: 2.1, color: "#0B7F5C" },
];

export function DaysToCashProfit() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Days to Cash */}
      <div className="qbo-card p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[13px] font-semibold text-[#22262A]">Days to Cash</h3>
          <span className="text-[9px] px-2 py-0.5 rounded bg-[#0B7F5C]/10 text-[#0B7F5C] font-bold">QBO VERIFIED</span>
        </div>
        <p className="text-[10px] text-[#9CA3AF] mb-3">Ad click → cash in your bank account (not just &quot;conversion&quot;)</p>
        <BarChart data={DAYS_DATA} height={140} />
        <div className="mt-2 p-2 bg-[#FFF7ED] rounded-lg">
          <p className="text-[10px] text-[#E17000] font-medium">Ad platforms say &quot;conversion&quot; at day 1. Cash takes 18-40 days depending on channel.</p>
        </div>
      </div>

      {/* Profit per Ad Dollar */}
      <div className="qbo-card p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[13px] font-semibold text-[#22262A]">Profit per Ad Dollar</h3>
          <span className="text-[9px] px-2 py-0.5 rounded bg-[#0B7F5C]/10 text-[#0B7F5C] font-bold">NET MARGIN</span>
        </div>
        <p className="text-[10px] text-[#9CA3AF] mb-3">Net profit after QBO project costs — not gross revenue</p>
        <BarChart data={PROFIT_DATA} height={140} />
        <div className="mt-2 p-2 bg-[#F0FAF0] rounded-lg">
          <p className="text-[10px] text-[#108000] font-medium">Referrals generate $42 net profit per $1 invested (time value). WhatsApp is $11.30 — highest for paid channels.</p>
        </div>
      </div>
    </div>
  );
}
