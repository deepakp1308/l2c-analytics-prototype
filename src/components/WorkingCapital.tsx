"use client";

const ITEMS = [
  { label: "Cash in Bank", value: "$48K", color: "#108000", pct: 49 },
  { label: "AR Outstanding", value: "$14K", color: "#D52B1E", pct: 14 },
  { label: "Pipeline (30d est.)", value: "$34K", color: "#055393", pct: 35 },
];

export function WorkingCapital() {
  return (
    <div className="qbo-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-semibold text-[#0D333F]">Working Capital Impact</h3>
      </div>

      <div className="text-center mb-4">
        <p className="text-[10px] text-[#8C8C8C] uppercase">Projected 30-Day Cash Position</p>
        <p className="text-[28px] font-bold text-[#0D333F]">$96K</p>
        <p className="text-[11px] text-[#108000] font-medium">▲ +$14K vs current</p>
      </div>

      {/* Stacked bar */}
      <div className="flex h-[24px] rounded-full overflow-hidden mb-3">
        {ITEMS.map((item) => (
          <div key={item.label} style={{ width: `${item.pct}%`, backgroundColor: item.color }} className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" style={{ height: "50%" }} />
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {ITEMS.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[11px] text-[#6B6C72]">{item.label}</span>
            </div>
            <span className="text-[12px] font-semibold text-[#0D333F]">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-[#E8E8E8]">
        <p className="text-[10px] text-[#8C8C8C]">If AR is collected on time and pipeline closes at 55% rate</p>
      </div>
    </div>
  );
}
