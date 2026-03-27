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
    stage: "Reach",
    icon: "📣",
    color: "#0B7F5C",
    lightBg: "#E6F5F0",
    headline: "Audience & Impressions",
    prompts: [
      "Which channel reaches the most qualified audience?",
      "Am I wasting spend on impressions that never convert?",
      "How does my reach compare to competitors in my area?",
    ],
  },
  {
    stage: "Engagement",
    icon: "🎯",
    color: "#60A5FA",
    lightBg: "#E6F5F0",
    headline: "Clicks & Interactions",
    prompts: [
      "What content type gets the highest engagement by channel?",
      "Which automated flows have the best open/click rates?",
      "Are my WhatsApp campaigns outperforming email?",
    ],
  },
  {
    stage: "Conversion",
    icon: "💰",
    color: "#E17000",
    lightBg: "#FFF7ED",
    headline: "Leads & Deals",
    prompts: [
      "Which campaign converts fastest from click to signed deal?",
      "What's the revenue per email sent vs per ad click?",
      "Show me conversion path for my highest-value deals",
    ],
  },
  {
    stage: "Profitability",
    icon: "📊",
    color: "#108000",
    lightBg: "#F0FAF0",
    headline: "Net Profit & ROI",
    prompts: [
      "Which campaign is most profitable after all costs?",
      "Should I kill SMS and move budget to WhatsApp?",
      "What's my break-even point for Google Ads this quarter?",
    ],
  },
];

export function CampaignStageExplorer({ onPromptClick }: { onPromptClick: (q: string) => void }) {
  return (
    <div className="qbo-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-md ii-gradient flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
        </div>
        <h3 className="text-[13px] font-semibold text-[#22262A]">Explore by Campaign Stage</h3>
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
