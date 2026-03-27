"use client";

const CAMPAIGNS = [
  { name: "Meta Homeowner Ad", icon: "📱", revenue: 38400, projCost: 22800, labor: 8200, adSpend: 2640, netProfit: 4760, roi: 1.8 },
  { name: "WhatsApp Automated", icon: "💬", revenue: 12400, projCost: 6800, labor: 1200, adSpend: 0, netProfit: 4400, roi: 11.3 },
  { name: "Google Renovation", icon: "🔍", revenue: 28600, projCost: 18200, labor: 6100, adSpend: 3720, netProfit: 580, roi: 0.2 },
  { name: "Email Newsletter", icon: "📧", revenue: 8200, projCost: 4100, labor: 2000, adSpend: 193, netProfit: 1907, roi: 9.9 },
  { name: "SMS Spring Promo", icon: "📲", revenue: 0, projCost: 0, labor: 0, adSpend: 400, netProfit: -400, roi: -1.0 },
];

export function CampaignProfitability() {
  return (
    <div className="qbo-card p-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[13px] font-semibold text-[#22262A]">Campaign Profitability — Net After QBO Costs</h3>
        <span className="text-[9px] px-2 py-0.5 rounded bg-[#0B7F5C]/10 text-[#0B7F5C] font-bold">QBO EXCLUSIVE</span>
      </div>
      <p className="text-[10px] text-[#9CA3AF] mb-4">Revenue minus project costs, labor, materials, and ad spend — what HubSpot &amp; Klaviyo can&apos;t show</p>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              {["Campaign", "Revenue", "Project Cost", "Labor", "Ad Spend", "Net Profit", "True ROI"].map(h => (
                <th key={h} className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider pb-2 pr-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CAMPAIGNS.map((c) => (
              <tr key={c.name} className={`border-b border-[#F3F4F6] ${c.netProfit < 0 ? "bg-[#FEF2F2]/50" : c.roi >= 5 ? "bg-[#F0FAF0]/30" : ""}`}>
                <td className="py-2.5 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px]">{c.icon}</span>
                    <span className="text-[12px] font-medium text-[#22262A]">{c.name}</span>
                  </div>
                </td>
                <td className="py-2.5 pr-3 text-[12px] font-medium text-[#22262A]">${(c.revenue / 1000).toFixed(1)}K</td>
                <td className="py-2.5 pr-3 text-[12px] text-[#6B7280]">${(c.projCost / 1000).toFixed(1)}K</td>
                <td className="py-2.5 pr-3 text-[12px] text-[#6B7280]">${(c.labor / 1000).toFixed(1)}K</td>
                <td className="py-2.5 pr-3 text-[12px] text-[#6B7280]">${c.adSpend > 0 ? (c.adSpend >= 1000 ? `${(c.adSpend / 1000).toFixed(1)}K` : c.adSpend) : "$0"}</td>
                <td className="py-2.5 pr-3">
                  <span className={`text-[12px] font-bold ${c.netProfit >= 0 ? "text-[#108000]" : "text-[#D52B1E]"}`}>
                    {c.netProfit >= 0 ? "+" : ""}${c.netProfit >= 1000 || c.netProfit <= -1000 ? `${(c.netProfit / 1000).toFixed(1)}K` : c.netProfit}
                  </span>
                </td>
                <td className="py-2.5">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    c.roi >= 5 ? "bg-[#108000]/10 text-[#108000]" :
                    c.roi >= 1 ? "bg-[#E17000]/10 text-[#E17000]" :
                    "bg-[#D52B1E]/10 text-[#D52B1E]"
                  }`}>
                    {c.roi > 0 ? "+" : ""}{c.roi}x
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 p-2.5 bg-[#E6F5F0] rounded-lg flex items-start gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#0B7F5C" className="shrink-0 mt-0.5"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
        <p className="text-[11px] text-[#22262A]"><strong>Insight:</strong> Meta looks like the winner at $38.4K revenue, but net profit is only $4.8K (1.8x ROI) after project costs. WhatsApp automations earn $4.4K at 11.3x ROI with $0 ad spend. Email is 9.9x ROI — most capital-efficient. Kill SMS (-$400/mo).</p>
      </div>
    </div>
  );
}
