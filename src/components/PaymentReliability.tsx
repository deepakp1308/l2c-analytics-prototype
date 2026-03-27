"use client";

const CHANNELS = [
  { name: "Referral", icon: "🤝", onTime: 94, avgDSO: 12, disputes: 2, ltv: "$86K", color: "#108000" },
  { name: "Google Ads", icon: "🔍", onTime: 78, avgDSO: 14, disputes: 8, ltv: "$62K", color: "#EA4335" },
  { name: "Meta Ads", icon: "📱", onTime: 71, avgDSO: 26, disputes: 12, ltv: "$44K", color: "#1877F2" },
  { name: "Email", icon: "📧", onTime: 65, avgDSO: 22, disputes: 15, ltv: "$28K", color: "#0B7F5C" },
];

export function PaymentReliability() {
  return (
    <div className="qbo-card p-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[13px] font-semibold text-[#22262A]">Payment Reliability by Ad Channel</h3>
        <span className="text-[9px] px-2 py-0.5 rounded bg-[#0B7F5C]/10 text-[#0B7F5C] font-bold">QBO EXCLUSIVE</span>
      </div>
      <p className="text-[10px] text-[#9CA3AF] mb-4">Which channels produce clients who actually pay on time? Only QBO knows.</p>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              {["Channel", "On-Time %", "Avg DSO", "Dispute Rate", "2-Year LTV"].map(h => (
                <th key={h} className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider pb-2 pr-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CHANNELS.map((c, i) => (
              <tr key={c.name} className={`border-b border-[#F3F4F6] ${i === 0 ? "bg-[#F0FAF0]/50" : ""}`}>
                <td className="py-2.5 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px]">{c.icon}</span>
                    <span className="text-[12px] font-medium text-[#22262A]">{c.name}</span>
                    {i === 0 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#108000]/10 text-[#108000] font-semibold">BEST</span>}
                  </div>
                </td>
                <td className="py-2.5 pr-4">
                  <div className="flex items-center gap-2">
                    <div className="w-[50px] h-[6px] bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${c.onTime}%`, backgroundColor: c.onTime >= 80 ? "#108000" : c.onTime >= 70 ? "#E17000" : "#D52B1E" }} />
                    </div>
                    <span className="text-[12px] font-bold" style={{ color: c.onTime >= 80 ? "#108000" : c.onTime >= 70 ? "#E17000" : "#D52B1E" }}>{c.onTime}%</span>
                  </div>
                </td>
                <td className="py-2.5 pr-4 text-[12px] font-medium" style={{ color: c.avgDSO <= 14 ? "#108000" : c.avgDSO <= 22 ? "#E17000" : "#D52B1E" }}>{c.avgDSO}d</td>
                <td className="py-2.5 pr-4 text-[12px] font-medium" style={{ color: c.disputes <= 5 ? "#108000" : c.disputes <= 10 ? "#E17000" : "#D52B1E" }}>{c.disputes}%</td>
                <td className="py-2.5 text-[13px] font-bold text-[#22262A]">{c.ltv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 p-2.5 bg-[#E6F5F0] rounded-lg flex items-start gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#0B7F5C" className="shrink-0 mt-0.5"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
        <p className="text-[11px] text-[#22262A]"><strong>Insight:</strong> Google leads pay 12 days faster than Meta and have 33% fewer payment disputes. Referral clients have 94% on-time payment and $86K 2-year LTV — your most reliable source by every measure.</p>
      </div>
    </div>
  );
}
