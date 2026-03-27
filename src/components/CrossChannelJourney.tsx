"use client";

const PATHS = [
  {
    rank: 1,
    conv: "11.2%",
    steps: [
      { icon: "📱", label: "Meta Ad", color: "#1877F2" },
      { icon: "🌐", label: "Web Form", color: "#0B7F5C" },
      { icon: "📹", label: "Video Meeting", color: "#3CBFA4" },
      { icon: "📋", label: "Premium Proposal", color: "#E17000" },
      { icon: "✅", label: "Signed", color: "#108000" },
    ],
    deal: "$28K",
    days: "8 days",
    touches: "4 touches",
  },
  {
    rank: 2,
    conv: "8.4%",
    steps: [
      { icon: "🔍", label: "Google Ad", color: "#EA4335" },
      { icon: "📞", label: "Phone Call", color: "#60A5FA" },
      { icon: "🏠", label: "Site Visit", color: "#3CBFA4" },
      { icon: "📋", label: "Proposal", color: "#E17000" },
      { icon: "✅", label: "Signed", color: "#108000" },
    ],
    deal: "$31K",
    days: "12 days",
    touches: "3 touches",
  },
  {
    rank: 3,
    conv: "6.1%",
    steps: [
      { icon: "📧", label: "Email", color: "#0B7F5C" },
      { icon: "🌐", label: "Web Form", color: "#60A5FA" },
      { icon: "📹", label: "Video", color: "#3CBFA4" },
      { icon: "📋", label: "Proposal", color: "#E17000" },
      { icon: "✅", label: "Signed", color: "#108000" },
    ],
    deal: "$18K",
    days: "18 days",
    touches: "5 touches",
  },
];

export function CrossChannelJourney() {
  return (
    <div className="qbo-card p-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[13px] font-semibold text-[#22262A]">Cross-Channel Customer Journey — Top 3 Paths</h3>
        <span className="text-[9px] px-2 py-0.5 rounded bg-[#0B7F5C]/10 text-[#0B7F5C] font-bold">MULTI-PLATFORM</span>
      </div>
      <p className="text-[10px] text-[#9CA3AF] mb-4">Full journey across Google + Meta + Email + WhatsApp — ad platforms only see their own silo</p>

      <div className="space-y-3">
        {PATHS.map((path) => (
          <div key={path.rank} className={`p-3 rounded-lg border ${path.rank === 1 ? "border-[#108000]/20 bg-[#F0FAF0]/30" : "border-[#E5E7EB]"}`}>
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${path.rank === 1 ? "bg-[#108000] text-white" : "bg-[#F3F4F6] text-[#6B7280]"}`}>
                  #{path.rank}
                </span>
                <span className="text-[12px] font-bold text-[#108000]">{path.conv} conversion</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-[#9CA3AF]">
                <span>💰 {path.deal}</span>
                <span>⏱ {path.days}</span>
                <span>👆 {path.touches}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {path.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-1 shrink-0">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#E5E7EB]">
                    <span className="text-[13px]">{step.icon}</span>
                    <span className="text-[10px] font-medium text-[#22262A]">{step.label}</span>
                  </div>
                  {i < path.steps.length - 1 && (
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="#D1D5DB" className="shrink-0">
                      <path d="M10 0l6 6-6 6V8H0V4h10V0z" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
