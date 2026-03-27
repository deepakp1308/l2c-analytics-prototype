"use client";

const SOURCES = [
  { name: "Web Form", icon: "🌐", leads: 12, conv: 34, avgDeal: 8200, days: 8, cpl: 22, quality: 0 },
  { name: "Google Ads", icon: "🔍", leads: 6, conv: 42, avgDeal: 31000, days: 6, cpl: 62, quality: 0 },
  { name: "Meta Ads", icon: "📱", leads: 8, conv: 28, avgDeal: 6400, days: 12, cpl: 48, quality: 0 },
  { name: "Referral", icon: "🤝", leads: 3, conv: 67, avgDeal: 24000, days: 4, cpl: 1, quality: 0 },
  { name: "Email", icon: "📧", leads: 4, conv: 18, avgDeal: 4800, days: 18, cpl: 12, quality: 0 },
];

// Quality Score = Conv% × Deal Size ÷ max(CPL,1) ÷ Days (normalized 0-100)
const scored = SOURCES.map((s) => {
  const raw = (s.conv / 100) * s.avgDeal / Math.max(s.cpl, 1) / s.days;
  return { ...s, rawScore: raw };
});
const maxRaw = Math.max(...scored.map((s) => s.rawScore));
const DATA = scored.map((s) => ({ ...s, quality: Math.round((s.rawScore / maxRaw) * 100) }))
  .sort((a, b) => b.quality - a.quality);

function QualityBar({ value }: { value: number }) {
  const color = value >= 80 ? "#108000" : value >= 50 ? "#E17000" : "#D52B1E";
  return (
    <div className="flex items-center gap-2">
      <div className="w-[60px] h-[6px] bg-[#E5E7EB] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="text-[11px] font-bold" style={{ color }}>{value}</span>
    </div>
  );
}

export function LeadSourceQuality() {
  return (
    <div className="qbo-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[13px] font-semibold text-[#22262A]">Lead Source Quality — Beyond Volume</h3>
          <p className="text-[10px] text-[#9CA3AF]">Quality Score = Conv% × Deal Size ÷ CPL ÷ Days to Close</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              {["Source", "Leads", "Conv %", "Avg Deal", "Days to Close", "CPL", "Quality Score"].map((h) => (
                <th key={h} className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider pb-2 pr-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DATA.map((s, i) => (
              <tr key={s.name} className={`border-b border-[#F3F4F6] ${i === 0 ? "bg-[#F0FAF0]/50" : ""}`}>
                <td className="py-2.5 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px]">{s.icon}</span>
                    <span className="text-[12px] font-medium text-[#22262A]">{s.name}</span>
                    {i === 0 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#108000]/10 text-[#108000] font-semibold">BEST</span>}
                  </div>
                </td>
                <td className="py-2.5 pr-4 text-[12px] text-[#22262A] font-medium">{s.leads}</td>
                <td className="py-2.5 pr-4 text-[12px] font-medium" style={{ color: s.conv >= 40 ? "#108000" : s.conv >= 25 ? "#22262A" : "#D52B1E" }}>{s.conv}%</td>
                <td className="py-2.5 pr-4 text-[12px] text-[#22262A] font-medium">${(s.avgDeal / 1000).toFixed(1)}K</td>
                <td className="py-2.5 pr-4 text-[12px] font-medium" style={{ color: s.days <= 7 ? "#108000" : s.days <= 14 ? "#E17000" : "#D52B1E" }}>{s.days}d</td>
                <td className="py-2.5 pr-4 text-[12px] text-[#9CA3AF]">${s.cpl}</td>
                <td className="py-2.5"><QualityBar value={s.quality} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 p-2.5 bg-[#E6F5F0] rounded-lg flex items-start gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#0B7F5C" className="shrink-0 mt-0.5"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
        <p className="text-[11px] text-[#22262A]"><strong>Insight:</strong> Referrals have the highest quality score (67% conv, $24K deals, 4-day close) at $0 CPL. Google Ads ranks #2 — high CPL but $31K deals close in 6 days.</p>
      </div>
    </div>
  );
}
