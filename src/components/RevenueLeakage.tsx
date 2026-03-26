"use client";

const LEAKS = [
  { project: "Davis Master Bedroom", item: "Electrical scope change", amount: "$2,800", severity: "high" as const },
  { project: "Chen Bathroom", item: "Tile upgrade not billed", amount: "$1,400", severity: "medium" as const },
];

const TOTAL = "$4,200";

export function RevenueLeakage() {
  return (
    <div className="rounded-lg border-2 border-[#D52B1E]/15 bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FEF2F2] flex items-center justify-center">
            <span className="text-[12px]">🔍</span>
          </div>
          <div>
            <h3 className="text-[13px] font-semibold text-[#0D333F]">Revenue Leakage Detected</h3>
            <p className="text-[10px] text-[#8C8C8C]">Unbilled scope changes found in active projects</p>
          </div>
        </div>
        <span className="text-[18px] font-bold text-[#D52B1E]">{TOTAL}</span>
      </div>

      <div className="space-y-2">
        {LEAKS.map((leak) => (
          <div key={leak.item} className={`flex items-center justify-between px-3 py-2.5 rounded-lg ${leak.severity === "high" ? "bg-[#FEF2F2]" : "bg-[#FFF7ED]"}`}>
            <div>
              <p className="text-[12px] font-medium text-[#0D333F]">{leak.project}</p>
              <p className="text-[10px] text-[#6B6C72]">{leak.item}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-bold text-[#D52B1E]">{leak.amount}</span>
              <button className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#055393] text-white hover:bg-[#044578] transition-colors">
                Issue CO →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
