"use client";

const FLOW_STAGES = [
  { label: "Pipeline", value: "$187K", perDay: "$6.2K/day", color: "#055393", width: 100 },
  { label: "Proposals", value: "$94K", perDay: "$3.1K/day", color: "#4A90D9", width: 72 },
  { label: "Signed", value: "$64K", perDay: "$2.1K/day", color: "#108000", width: 52 },
  { label: "Invoiced", value: "$48K", perDay: "$1.6K/day", color: "#E17000", width: 38 },
  { label: "Collected", value: "$48K", perDay: "$1.6K/day", color: "#065F46", width: 36 },
];

export function RevenueVelocity() {
  return (
    <div className="qbo-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-semibold text-[#0D333F]">Revenue Velocity</h3>
        <span className="text-[10px] text-[#8C8C8C]">$ flowing through each stage per day</span>
      </div>

      <div className="space-y-1">
        {FLOW_STAGES.map((s, i) => (
          <div key={s.label} className="relative">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-medium text-[#6B6C72] w-[64px] text-right shrink-0">{s.label}</span>
              <div className="flex-1">
                <div
                  className="h-[32px] rounded-[4px] flex items-center justify-between px-3 relative overflow-hidden"
                  style={{ width: `${s.width}%`, backgroundColor: s.color, minWidth: 120 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/12 to-transparent" style={{ height: "50%" }} />
                  <span className="text-[12px] font-bold text-white relative z-10">{s.value}</span>
                  <span className="text-[10px] text-white/80 relative z-10">{s.perDay}</span>
                </div>
              </div>
            </div>
            {/* Arrow connector */}
            {i < FLOW_STAGES.length - 1 && (
              <div className="flex items-center gap-3">
                <div className="w-[64px] shrink-0" />
                <div className="pl-4">
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="#BABEC5">
                    <path d="M6 10L0 0H12L6 10Z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-[#E8E8E8] flex items-center gap-4">
        <div>
          <span className="text-[10px] text-[#8C8C8C] uppercase">Avg Cycle</span>
          <p className="text-[14px] font-bold text-[#0D333F]">34 days</p>
        </div>
        <div className="w-px h-8 bg-[#E8E8E8]" />
        <div>
          <span className="text-[10px] text-[#8C8C8C] uppercase">Bottleneck</span>
          <p className="text-[14px] font-bold text-[#D52B1E]">Proposal → Signed (18d)</p>
        </div>
      </div>
    </div>
  );
}
