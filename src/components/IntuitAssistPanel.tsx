"use client";
import { useState } from "react";

type PanelContent = {
  question: string;
  answer: string;
  chartType: "bar" | "line" | "donut";
  chartData: { label: string; value: number; color: string }[];
  action: { label: string; description: string };
  followUps: string[];
};

const RESPONSES: Record<string, PanelContent> = {
  "Which channel has the best conversion path?": {
    question: "Which channel has the best conversion path?",
    answer: "Meta Ads → Web Form → Video Meeting within 48h → Premium Proposal has the highest conversion at 11.2%, which is 3.1x the average. Google Ads converts at 8.4% but produces higher-value deals ($31K avg vs $18K).",
    chartType: "bar",
    chartData: [
      { label: "Meta→Video", value: 11.2, color: "#1877F2" },
      { label: "Google→Visit", value: 8.4, color: "#EA4335" },
      { label: "Email→Call", value: 5.1, color: "#055393" },
      { label: "WhatsApp", value: 4.8, color: "#25D366" },
      { label: "LinkedIn", value: 3.2, color: "#0A66C2" },
    ],
    action: { label: "Build This Workflow", description: "Auto-route Meta leads through video→premium path" },
    followUps: ["What's the cost per acquisition for each path?", "Show me the time-to-close breakdown", "Which rep closes fastest on Meta leads?"],
  },
  "Show pipeline forecast for next 30 days": {
    question: "Show pipeline forecast for next 30 days",
    answer: "Your 30-day pipeline forecast is $62K against a $75K target — a $13K gap. Henderson Kitchen ($32K) is your largest deal but has stalled 18 days in Proposal. If Henderson closes, you'll hit 88% of target.",
    chartType: "bar",
    chartData: [
      { label: "Closing", value: 32, color: "#108000" },
      { label: "Negotiation", value: 18, color: "#055393" },
      { label: "Proposal", value: 12, color: "#E17000" },
      { label: "Gap to Target", value: 13, color: "#D52B1E" },
    ],
    action: { label: "Follow Up Henderson", description: "Send follow-up with limited-time incentive" },
    followUps: ["What's blocking Henderson Kitchen?", "Which deals are most likely to close?", "Compare this quarter vs last quarter"],
  },
  "Why is churn risk increasing?": {
    question: "Why is churn risk increasing?",
    answer: "The Andersons (LTV: $112K, your #3 client) haven't engaged in 62 days — their typical re-engagement window is 90 days. Seasonal data suggests an outdoor renovation project is likely. Two other top-10 clients also show declining engagement.",
    chartType: "line",
    chartData: [
      { label: "Aug", value: 12, color: "#055393" },
      { label: "Sep", value: 10, color: "#055393" },
      { label: "Oct", value: 8, color: "#055393" },
      { label: "Nov", value: 5, color: "#E17000" },
      { label: "Dec", value: 3, color: "#D52B1E" },
      { label: "Jan", value: 1, color: "#D52B1E" },
    ],
    action: { label: "Send Outreach Now", description: "Personalized outdoor project proposal to The Andersons" },
    followUps: ["Which other clients are at risk?", "What re-engagement worked before?", "Draft an outreach email for me"],
  },
  "What's driving the 62% funnel drop-off?": {
    question: "What's driving the 62% funnel drop-off?",
    answer: "Your Qualified→Proposal stage has a 62% drop-off — the largest bottleneck. 7 of 11 stale leads are from website forms with scores above 75. These are warm but unworked. Average days in Qualified stage: 14 days (target: 5).",
    chartType: "bar",
    chartData: [
      { label: "New→Contact", value: 82, color: "#055393" },
      { label: "Contact→Qual", value: 68, color: "#4A90D9" },
      { label: "Qual→Proposal", value: 38, color: "#D52B1E" },
      { label: "Proposal→Won", value: 63, color: "#108000" },
    ],
    action: { label: "Contact Top 3 Leads", description: "Prioritized by score — $41K revenue at risk" },
    followUps: ["Show me the stale leads list", "What's the average response time?", "Set up stage alerts for me"],
  },
};

const DEFAULT_FOLLOWUPS = [
  "Which channel has the best conversion path?",
  "Show pipeline forecast for next 30 days",
  "Why is churn risk increasing?",
  "What's driving the 62% funnel drop-off?",
];

export function IntuitAssistPanel({ open, onClose, initialQuestion }: {
  open: boolean;
  onClose: () => void;
  initialQuestion?: string;
}) {
  const [input, setInput] = useState("");
  const [activeContent, setActiveContent] = useState<PanelContent | null>(
    initialQuestion ? RESPONSES[initialQuestion] || null : null
  );

  // When initialQuestion changes and panel opens, set content
  if (open && initialQuestion && (!activeContent || activeContent.question !== initialQuestion)) {
    const found = RESPONSES[initialQuestion];
    if (found && found !== activeContent) {
      setTimeout(() => setActiveContent(found), 0);
    }
  }

  if (!open) return null;

  function handleChipClick(q: string) {
    const content = RESPONSES[q];
    if (content) setActiveContent(content);
  }

  // Simple inline bar chart for the panel
  function PanelBarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
    const max = Math.max(...data.map(d => d.value));
    return (
      <div className="space-y-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[10px] text-[#6B6C72] w-[80px] text-right shrink-0 truncate">{d.label}</span>
            <div className="flex-1 bg-[#E8E8E8] rounded-full h-[18px] overflow-hidden">
              <div className="h-full rounded-full flex items-center px-2" style={{ width: `${(d.value / max) * 100}%`, backgroundColor: d.color }}>
                <span className="text-[9px] font-bold text-white">{d.value}{typeof d.value === "number" && d.value < 100 ? "%" : "K"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/10 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-[400px] bg-white border-l border-[#BABEC5] shadow-lg z-50 flex flex-col slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#D9D9D9]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg ii-gradient flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-[#0D333F]">Intuit Intelligence</h3>
              <p className="text-[10px] text-[#8C8C8C]">AI-powered insights for your business</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[#F4F4EF] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B6C72" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeContent ? (
            <div className="space-y-4 fade-in">
              {/* User question */}
              <div className="flex justify-end">
                <div className="bg-[#055393] text-white rounded-lg rounded-tr-none px-3 py-2 max-w-[85%]">
                  <p className="text-[13px]">{activeContent.question}</p>
                </div>
              </div>

              {/* AI response */}
              <div className="flex gap-2.5">
                <div className="w-6 h-6 rounded-md ii-gradient flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                  </svg>
                </div>
                <div className="bg-[#EAF6F7] rounded-lg rounded-tl-none p-3 flex-1">
                  <p className="text-[13px] text-[#0D333F] leading-relaxed">{activeContent.answer}</p>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-[#F4F4EF] rounded-lg p-4">
                <PanelBarChart data={activeContent.chartData} />
              </div>

              {/* Action card */}
              <div className="border border-[#055393]/15 rounded-lg p-3 bg-[#EAF6F7]/50">
                <p className="text-[10px] text-[#8C8C8C] uppercase font-semibold mb-1">Recommended Action</p>
                <p className="text-[13px] font-semibold text-[#0D333F]">{activeContent.action.label}</p>
                <p className="text-[11px] text-[#6B6C72] mt-0.5">{activeContent.action.description}</p>
                <button className="mt-2 text-[12px] font-medium px-3 py-1.5 rounded-md ii-gradient text-white hover:opacity-90 transition-opacity">
                  {activeContent.action.label} →
                </button>
              </div>

              {/* Follow-up chips */}
              <div>
                <p className="text-[10px] font-semibold text-[#8C8C8C] uppercase tracking-wider mb-2">Follow-up Questions</p>
                <div className="space-y-1.5">
                  {activeContent.followUps.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleChipClick(q)}
                      className="w-full text-left text-[12px] text-[#6B6C72] px-3 py-2 rounded-md border border-[#D9D9D9] hover:bg-[#F4F4EF] hover:text-[#0D333F] transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Default welcome state */
            <div className="space-y-4">
              <div className="flex gap-2.5">
                <div className="w-6 h-6 rounded-md ii-gradient flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                  </svg>
                </div>
                <div className="bg-[#EAF6F7] rounded-lg rounded-tl-none p-3 flex-1">
                  <p className="text-[13px] text-[#0D333F] leading-relaxed">
                    Good morning! I&apos;ve analyzed your L2C pipeline overnight. What would you like to explore?
                  </p>
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-semibold text-[#8C8C8C] uppercase tracking-wider">Suggested Questions</p>
                {DEFAULT_FOLLOWUPS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleChipClick(q)}
                    className="w-full text-left text-[12px] text-[#6B6C72] px-3 py-2 rounded-md border border-[#D9D9D9] hover:bg-[#F4F4EF] hover:text-[#0D333F] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-[#D9D9D9]">
          <div className="flex items-center gap-2 bg-[#F4F4EF] rounded-lg px-3 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Intuit Intelligence anything..."
              className="flex-1 bg-transparent text-[13px] text-[#000000] placeholder-[#8C8C8C] outline-none"
            />
            <button className="w-7 h-7 rounded-md ii-gradient flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </div>
          <p className="text-[9px] text-[#8C8C8C] mt-1.5 text-center">Intuit Intelligence uses AI. Responses may not always be accurate.</p>
        </div>
      </div>
    </>
  );
}
