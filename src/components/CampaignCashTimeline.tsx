"use client";

import { BarChart } from "@/components/BarChart";

const CASH_DAYS = [
  { label: "WhatsApp", value: 12, color: "#25D366" },
  { label: "Email", value: 22, color: "#0B7F5C" },
  { label: "Referral", value: 18, color: "#108000" },
  { label: "Meta", value: 34, color: "#1877F2" },
  { label: "Google", value: 42, color: "#EA4335" },
];

const QUALITY = [
  { campaign: "WhatsApp Auto", icon: "💬", onTime: 92, ltv: "$48K", disputes: "3%", color: "#108000" },
  { campaign: "Referral", icon: "🤝", onTime: 94, ltv: "$86K", disputes: "2%", color: "#108000" },
  { campaign: "Email Nurture", icon: "📧", onTime: 72, ltv: "$28K", disputes: "11%", color: "#E17000" },
  { campaign: "Meta Ad", icon: "📱", onTime: 68, ltv: "$44K", disputes: "14%", color: "#D52B1E" },
  { campaign: "Google Ad", icon: "🔍", onTime: 78, ltv: "$62K", disputes: "8%", color: "#E17000" },
];

export function CampaignCashTimeline() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Campaign → Cash Days */}
      <div className="qbo-card p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[13px] font-semibold text-[#22262A]">Campaign → Cash Days</h3>
          <span className="text-[9px] px-2 py-0.5 rounded bg-[#0B7F5C]/10 text-[#0B7F5C] font-bold">QBO VERIFIED</span>
        </div>
        <p className="text-[10px] text-[#9CA3AF] mb-3">Campaign touch → cash in bank (not &quot;conversion&quot;)</p>
        <BarChart data={CASH_DAYS} height={140} />
        <div className="mt-2 p-2 bg-[#FFF7ED] rounded-lg">
          <p className="text-[10px] text-[#E17000] font-medium">HubSpot/Klaviyo say &quot;conversion&quot; at day 1. Cash actually takes 12-42 days depending on campaign type.</p>
        </div>
      </div>

      {/* Customer Quality by Campaign */}
      <div className="qbo-card p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[13px] font-semibold text-[#22262A]">Customer Quality by Campaign</h3>
          <span className="text-[9px] px-2 py-0.5 rounded bg-[#0B7F5C]/10 text-[#0B7F5C] font-bold">QBO EXCLUSIVE</span>
        </div>
        <p className="text-[10px] text-[#9CA3AF] mb-3">Which campaigns produce clients who pay on time?</p>

        <div className="space-y-2">
          {QUALITY.map((q) => (
            <div key={q.campaign} className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-[#F3F4F6]">
              <span className="text-[13px]">{q.icon}</span>
              <span className="text-[11px] font-medium text-[#22262A] w-[90px] truncate">{q.campaign}</span>
              <div className="flex items-center gap-1 flex-1">
                <div className="w-[40px] h-[5px] bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${q.onTime}%`, backgroundColor: q.color }} />
                </div>
                <span className="text-[10px] font-bold" style={{ color: q.color }}>{q.onTime}%</span>
              </div>
              <span className="text-[10px] font-semibold text-[#22262A] w-[36px] text-right">{q.ltv}</span>
              <span className="text-[10px] text-[#9CA3AF] w-[24px] text-right">{q.disputes}</span>
            </div>
          ))}
          <div className="flex items-center justify-between text-[9px] text-[#9CA3AF] px-2.5 pt-1">
            <span />
            <div className="flex gap-4">
              <span>On-Time %</span>
              <span>LTV</span>
              <span>Disputes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
