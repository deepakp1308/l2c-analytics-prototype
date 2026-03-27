"use client";

const BARS = [
  { label: "Pipeline", value: 187, color: "#0B7F5C" },
  { label: "Won", value: 64, color: "#60A5FA" },
  { label: "Invoiced", value: 48, color: "#108000" },
  { label: "Collected", value: 48, color: "#065F46" },
  { label: "Outstanding", value: 14, color: "#D52B1E" },
];

export function CashConversion() {
  const maxVal = Math.max(...BARS.map(b => b.value));

  return (
    <div className="qbo-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-semibold text-[#22262A]">Cash Conversion Efficiency</h3>
        <div className="text-right">
          <span className="text-[18px] font-bold text-[#22262A]">25.7%</span>
          <p className="text-[10px] text-[#9CA3AF]">Pipeline → Cash</p>
        </div>
      </div>

      {/* Waterfall bars */}
      <div className="flex items-end gap-2 justify-around" style={{ height: 160 }}>
        {BARS.map((b, i) => {
          const barH = Math.max(4, (b.value / maxVal) * 130);
          return (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[11px] font-bold text-[#22262A]">${b.value}K</span>
              <div className="w-full max-w-[48px] rounded-t-[4px] relative overflow-hidden" style={{ height: barH, backgroundColor: b.color }}>
                <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" style={{ height: "50%" }} />
              </div>
              <span className="text-[9px] text-[#9CA3AF] text-center leading-tight mt-1">{b.label}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#D52B1E]" />
          <span className="text-[11px] text-[#6B7280]">$14K outstanding from 3 clients</span>
        </div>
        <span className="text-[11px] font-semibold text-[#0B7F5C]">View AR →</span>
      </div>
    </div>
  );
}
