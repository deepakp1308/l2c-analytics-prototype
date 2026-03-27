"use client";

const CHANNELS = [
  { name: "Google Ads", icon: "🔍", adSpend: 288, salesTime: 120, proposalCost: 85, onboarding: 0, tCAC: 493, cpl: 48 },
  { name: "Meta Ads", icon: "📱", adSpend: 176, salesTime: 80, proposalCost: 85, onboarding: 0, tCAC: 341, cpl: 22 },
  { name: "Email", icon: "📧", adSpend: 48, salesTime: 60, proposalCost: 85, onboarding: 0, tCAC: 193, cpl: 12 },
  { name: "Referral", icon: "🤝", adSpend: 0, salesTime: 40, proposalCost: 42, onboarding: 0, tCAC: 82, cpl: 0 },
];

export function TrueCAC() {
  const maxCAC = Math.max(...CHANNELS.map(c => c.tCAC));

  return (
    <div className="qbo-card p-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[13px] font-semibold text-[#22262A]">True Customer Acquisition Cost — Beyond CPL</h3>
        <span className="text-[9px] px-2 py-0.5 rounded bg-[#0B7F5C]/10 text-[#0B7F5C] font-bold">QBO EXCLUSIVE</span>
      </div>
      <p className="text-[10px] text-[#9CA3AF] mb-4">Ad spend + sales time + proposal prep = what it really costs to win a customer</p>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              {["Channel", "Ad Spend", "Sales Time", "Proposal", "Total tCAC", "vs CPL"].map(h => (
                <th key={h} className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider pb-2 pr-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CHANNELS.map((c) => {
              const multiplier = c.cpl > 0 ? (c.tCAC / c.cpl).toFixed(1) : "∞";
              return (
                <tr key={c.name} className="border-b border-[#F3F4F6]">
                  <td className="py-2.5 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px]">{c.icon}</span>
                      <span className="text-[12px] font-medium text-[#22262A]">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-3 text-[12px] text-[#22262A]">${c.adSpend}</td>
                  <td className="py-2.5 pr-3 text-[12px] text-[#6B7280]">${c.salesTime}</td>
                  <td className="py-2.5 pr-3 text-[12px] text-[#6B7280]">${c.proposalCost}</td>
                  <td className="py-2.5 pr-3">
                    <div className="flex items-center gap-2">
                      <div className="w-[80px] h-[6px] bg-[#E5E7EB] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(c.tCAC / maxCAC) * 100}%`, backgroundColor: c.tCAC > 400 ? "#D52B1E" : c.tCAC > 200 ? "#E17000" : "#108000" }} />
                      </div>
                      <span className="text-[12px] font-bold text-[#22262A]">${c.tCAC}</span>
                    </div>
                  </td>
                  <td className="py-2.5">
                    <span className="text-[11px] font-medium text-[#D52B1E]">{multiplier}x CPL</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 p-2.5 bg-[#E6F5F0] rounded-lg flex items-start gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#0B7F5C" className="shrink-0 mt-0.5"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
        <p className="text-[11px] text-[#22262A]"><strong>Insight:</strong> Your CPL is $22-$48, but true CAC is $82-$493 when you add sales time + proposal prep. Referrals cost $82 total — 6x cheaper than Google. Ad platforms never show you this.</p>
      </div>
    </div>
  );
}
