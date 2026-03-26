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
    stage: "Attract",
    icon: "📣",
    color: "#055393",
    lightBg: "#EAF6F7",
    headline: "Campaign & Acquisition",
    prompts: [
      "Which campaign should I invest more in this month?",
      "What's my true cost to acquire a paying customer?",
      "Are my ads attracting the right customer profile?",
    ],
  },
  {
    stage: "Convert",
    icon: "🎯",
    color: "#4A90D9",
    lightBg: "#EAF6F7",
    headline: "Lead Qualification & Nurture",
    prompts: [
      "Which leads should I call first today?",
      "Why are qualified leads not converting to proposals?",
      "What proposal format closes fastest for my price range?",
    ],
  },
  {
    stage: "Close",
    icon: "🤝",
    color: "#108000",
    lightBg: "#F0FAF0",
    headline: "Deal Closing & Signing",
    prompts: [
      "Which deals are at risk of stalling this week?",
      "How do I close the $13K gap to hit my quarterly target?",
      "What's the fastest way to get Henderson to sign?",
    ],
  },
  {
    stage: "Collect",
    icon: "💰",
    color: "#E17000",
    lightBg: "#FFF7ED",
    headline: "Invoicing & Payment",
    prompts: [
      "Who owes me money and how do I get paid faster?",
      "What payment method should I default to save time?",
      "How much cash will I have in 30 days?",
    ],
  },
  {
    stage: "Grow",
    icon: "📈",
    color: "#0097A9",
    lightBg: "#EAF6F7",
    headline: "Retention & Expansion",
    prompts: [
      "Which customers are about to churn?",
      "Who's ready for an upsell based on project history?",
      "What's my most profitable customer type?",
    ],
  },
];

export function StageExplorer({ onPromptClick }: { onPromptClick: (q: string) => void }) {
  return (
    <div className="qbo-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-md ii-gradient flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>
        <h3 className="text-[13px] font-semibold text-[#0D333F]">Explore by L2C Stage</h3>
        <span className="text-[10px] text-[#8C8C8C] ml-auto">Click any question to explore with Intuit Intelligence</span>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {STAGES.map((s) => (
          <div key={s.stage} className="rounded-lg border border-[#D9D9D9] overflow-hidden hover:shadow-sm transition-shadow">
            {/* Stage header */}
            <div className="px-3 py-2.5 flex items-center gap-2" style={{ backgroundColor: s.lightBg }}>
              <span className="text-[16px]">{s.icon}</span>
              <div>
                <p className="text-[12px] font-bold" style={{ color: s.color }}>{s.stage}</p>
                <p className="text-[9px] text-[#8C8C8C] leading-tight">{s.headline}</p>
              </div>
            </div>

            {/* Prompt list */}
            <div className="p-2 space-y-1">
              {s.prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => onPromptClick(prompt)}
                  className="w-full text-left text-[11px] text-[#6B6C72] px-2 py-1.5 rounded hover:bg-[#F4F4EF] hover:text-[#0D333F] transition-colors leading-snug"
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
