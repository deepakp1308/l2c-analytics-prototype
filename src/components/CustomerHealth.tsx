"use client";

const CUSTOMERS = [
  { name: "The Andersons", ltv: "$112K", revenue: "$67K", health: "warning" as const, label: "62d inactive", trend: -14 },
  { name: "Henderson", ltv: "$86K", revenue: "$32K", health: "good" as const, label: "Active deal", trend: 8 },
  { name: "Thompson", ltv: "$74K", revenue: "$28K", health: "good" as const, label: "New project", trend: 12 },
  { name: "Reyes", ltv: "$62K", revenue: "$22K", health: "good" as const, label: "Proposal sent", trend: 5 },
  { name: "Chen", ltv: "$51K", revenue: "$14K", health: "good" as const, label: "Paid in full", trend: 3 },
];

export function CustomerHealth() {
  return (
    <div className="qbo-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-semibold text-[#0D333F]">Customer Health — Top 5 by LTV</h3>
      </div>

      <div className="space-y-2">
        {CUSTOMERS.map((c, i) => (
          <div key={c.name} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${c.health === "warning" ? "bg-[#FFF7ED] border border-[#E17000]/15" : "bg-[#F4F4EF]"}`}>
            <span className="text-[12px] font-bold text-[#8C8C8C] w-5 shrink-0">#{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-[#0D333F] truncate">{c.name}</p>
              <p className="text-[10px] text-[#8C8C8C]">{c.label}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[13px] font-bold text-[#0D333F]">{c.ltv}</p>
              <p className="text-[10px] text-[#8C8C8C]">LTV</p>
            </div>
            <div className="text-right shrink-0 w-[50px]">
              <p className="text-[12px] font-semibold text-[#6B6C72]">{c.revenue}</p>
              <p className="text-[10px] text-[#8C8C8C]">Revenue</p>
            </div>
            <div className="shrink-0">
              {c.health === "warning" ? (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#E17000]/10 text-[#E17000]">⚠ At Risk</span>
              ) : (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#108000]/10 text-[#108000]">✓ Healthy</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
