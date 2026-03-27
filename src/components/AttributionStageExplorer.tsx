"use client";

type StageCard = {
  stage: string;
  icon: string;
  color: string;
  lightBg: string;
  headline: string;
  prompts: string[];
};

const STAGES: StageCard[] = [
  {
    stage: "Ad Spend",
    icon: "📣",
    color: "#0B7F5C",
    lightBg: "#E6F5F0",
    headline: "Budget & Allocation",
    prompts: [
      "Am I overspending on any channel relative to returns?",
      "What's the optimal budget split across my channels?",
      "How does my CPL compare to industry benchmarks?",
    ],
  },
  {
    stage: "Conversion",
    icon: "🎯",
    color: "#60A5FA",
    lightBg: "#E6F5F0",
    headline: "Attribution & Paths",
    prompts: [
      "Which channel produces the most profitable customers long-term?",
      "Show me the cross-channel journey for my best deals",
      "What's the conversion lag between ad click and first purchase?",
    ],
  },
  {
    stage: "Cash Impact",
    icon: "💰",
    color: "#E17000",
    lightBg: "#FFF7ED",
    headline: "Revenue & Collection",
    prompts: [
      "Which channel gets me paid fastest after signing?",
      "What's my true CAC including sales and proposal costs?",
      "How much revenue leaks between invoice and collection by channel?",
    ],
  },
  {
    stage: "LTV & Quality",
    icon: "📈",
    color: "#108000",
    lightBg: "#F0FAF0",
    headline: "Retention & Value",
    prompts: [
      "Which ad channel has the best 2-year customer retention?",
      "Do higher-CPL channels actually produce better clients?",
      "Which channel's customers have the fewest payment disputes?",
    ],
  },
];

export function AttributionStageExplorer({ onPromptClick }: { onPromptClick: (q: string) => void }) {
  return (
    <div className="qbo-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-md ii-gradient flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>
        <h3 className="text-[13px] font-semibold text-[#22262A]">Explore by Attribution Stage</h3>
        <span className="text-[10px] text-[#9CA3AF] ml-auto">Click any question to explore with Intuit Intelligence</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {STAGES.map((s) => (
          <div key={s.stage} className="rounded-lg border border-[#E5E7EB] overflow-hidden hover:shadow-sm transition-shadow">
            <div className="px-3 py-2.5 flex items-center gap-2" style={{ backgroundColor: s.lightBg }}>
              <span className="text-[16px]">{s.icon}</span>
              <div>
                <p className="text-[12px] font-bold" style={{ color: s.color }}>{s.stage}</p>
                <p className="text-[9px] text-[#9CA3AF] leading-tight">{s.headline}</p>
              </div>
            </div>
            <div className="p-2 space-y-1">
              {s.prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => onPromptClick(prompt)}
                  className="w-full text-left text-[11px] text-[#6B7280] px-2 py-1.5 rounded hover:bg-[#F3F4F6] hover:text-[#22262A] transition-colors leading-snug"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
