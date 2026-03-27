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
      { label: "Email→Call", value: 5.1, color: "#0B7F5C" },
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
      { label: "Negotiation", value: 18, color: "#0B7F5C" },
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
      { label: "Aug", value: 12, color: "#0B7F5C" },
      { label: "Sep", value: 10, color: "#0B7F5C" },
      { label: "Oct", value: 8, color: "#0B7F5C" },
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
      { label: "New→Contact", value: 82, color: "#0B7F5C" },
      { label: "Contact→Qual", value: 68, color: "#60A5FA" },
      { label: "Qual→Proposal", value: 38, color: "#D52B1E" },
      { label: "Proposal→Won", value: 63, color: "#108000" },
    ],
    action: { label: "Contact Top 3 Leads", description: "Prioritized by score — $41K revenue at risk" },
    followUps: ["Show me the stale leads list", "What's the average response time?", "Set up stage alerts for me"],
  },
  "Which campaign should I invest more in this month?": {
    question: "Which campaign should I invest more in this month?",
    answer: "Meta Ads has the best CPL ($22) and highest lead volume (12 this month). Google Ads is pricier ($48 CPL) but produces 1.7x larger deals. For this month, increase Meta by 30% — you'll gain 4-6 leads. Next month, test Google for premium services.",
    chartType: "bar",
    chartData: [
      { label: "Meta", value: 4.8, color: "#1877F2" },
      { label: "Google", value: 3.1, color: "#EA4335" },
      { label: "Email", value: 6.8, color: "#0B7F5C" },
      { label: "WhatsApp", value: 11.3, color: "#25D366" },
    ],
    action: { label: "Increase Meta Budget 30%", description: "Reallocate from SMS ($400/mo) to Meta Ads" },
    followUps: ["What's my true cost to acquire a paying customer?", "Show pipeline forecast for next 30 days", "Are my ads attracting the right customer profile?"],
  },
  "Which leads should I call first today?": {
    question: "Which leads should I call first today?",
    answer: "You have 4 uncontacted leads from the past 48h. Jennifer Thompson (score: 92, est. $8.2K) is your top priority — she came from a web form and viewed your portfolio twice. Leads contacted within 2h convert at 34% vs 11% for next-day.",
    chartType: "bar",
    chartData: [
      { label: "J. Thompson", value: 92, color: "#108000" },
      { label: "R. Kim", value: 88, color: "#108000" },
      { label: "A. Chen", value: 82, color: "#60A5FA" },
      { label: "P. Davis", value: 71, color: "#E17000" },
    ],
    action: { label: "Call Jennifer Thompson", description: "Score 92 · Web Form · Est. $8,200 · 2 portfolio views" },
    followUps: ["Why are qualified leads not converting to proposals?", "What's the average response time?", "Which deals are at risk of stalling this week?"],
  },
  "Which deals are at risk of stalling this week?": {
    question: "Which deals are at risk of stalling this week?",
    answer: "Henderson Kitchen ($32K) has been in Proposal for 18 days (avg: 6). Park Bathroom ($14K) cancelled 2 meetings. These two represent $46K in at-risk pipeline. Thompson ($28K) and Reyes ($22K) are progressing normally.",
    chartType: "bar",
    chartData: [
      { label: "Henderson", value: 18, color: "#D52B1E" },
      { label: "Park", value: 12, color: "#E17000" },
      { label: "Thompson", value: 4, color: "#108000" },
      { label: "Reyes", value: 3, color: "#108000" },
    ],
    action: { label: "Follow Up Henderson Today", description: "18 days stalled — send limited-time incentive" },
    followUps: ["How do I close the $13K gap to hit my quarterly target?", "Show pipeline forecast for next 30 days", "Which channel has the best conversion path?"],
  },
  "Who owes me money and how do I get paid faster?": {
    question: "Who owes me money and how do I get paid faster?",
    answer: "3 clients owe you $14,100 total. Morrison ($6.2K, 38 days overdue) is chronically late — require 50% deposit next time. Cho ($3.8K) is usually on-time, likely an oversight. Switching to ACH saves 8 days on average vs checks.",
    chartType: "bar",
    chartData: [
      { label: "Morrison", value: 6.2, color: "#D52B1E" },
      { label: "Cho", value: 3.8, color: "#E17000" },
      { label: "Patel", value: 4.1, color: "#E17000" },
    ],
    action: { label: "Send Payment Reminders", description: "Auto-send to Morrison and Cho with ACH link" },
    followUps: ["What payment method should I default to save time?", "How much cash will I have in 30 days?", "Which customers are about to churn?"],
  },
  "Which customers are about to churn?": {
    question: "Which customers are about to churn?",
    answer: "The Andersons (LTV: $112K) are your highest churn risk — 62 days inactive with a 90-day re-engagement window. Seasonal data suggests an outdoor project. Two other top-10 clients (Park, Liu) show declining engagement but are still within normal range.",
    chartType: "bar",
    chartData: [
      { label: "Andersons", value: 62, color: "#D52B1E" },
      { label: "Park", value: 28, color: "#E17000" },
      { label: "Liu", value: 21, color: "#E17000" },
      { label: "Others", value: 8, color: "#108000" },
    ],
    action: { label: "Send Outreach to Andersons", description: "Personalized outdoor project proposal — seasonal timing" },
    followUps: ["Who's ready for an upsell based on project history?", "What re-engagement worked before?", "What's my most profitable customer type?"],
  },
  "Which source is generating the best leads this month?": {
    question: "Which source is generating the best leads this month?",
    answer: "Referrals are your highest-quality source: 67% conversion, $24K avg deal, 4-day close at $0 CPL. Google Ads ranks #2 with 42% conversion and $31K deals but $62 CPL. Web forms have the most volume (12 leads) but lower quality scores.",
    chartType: "bar",
    chartData: [
      { label: "Referral", value: 100, color: "#108000" },
      { label: "Google", value: 78, color: "#EA4335" },
      { label: "Web Form", value: 52, color: "#0B7F5C" },
      { label: "Meta", value: 38, color: "#1877F2" },
      { label: "Email", value: 18, color: "#E17000" },
    ],
    action: { label: "Launch Referral Program", description: "Incentivize past clients — highest quality, zero acquisition cost" },
    followUps: ["Is my lead quality improving or declining?", "How do my leads compare to industry benchmarks?", "What's my true cost to acquire a paying customer?"],
  },
  "Why are qualified leads stalling before proposal?": {
    question: "Why are qualified leads stalling before proposal?",
    answer: "3 root causes: (1) Avg response time is 19h — leads that wait >6h are 3x less likely to convert. (2) 4 of 7 stale leads came from web forms with no automated follow-up. (3) Your proposal template takes 2.5h to customize — competitors use templated proposals in 20min.",
    chartType: "bar",
    chartData: [
      { label: "Slow response", value: 42, color: "#D52B1E" },
      { label: "No auto-nurture", value: 28, color: "#E17000" },
      { label: "Proposal prep", value: 18, color: "#60A5FA" },
      { label: "Budget unclear", value: 12, color: "#9CA3AF" },
    ],
    action: { label: "Set Up Auto-Response", description: "Immediate email + text within 5 min of form submission" },
    followUps: ["What nurture sequence works best for stale leads?", "Does lead score actually predict conversion?", "What proposal format closes fastest at my price point?"],
  },
  "What's the optimal time and channel to first contact?": {
    question: "What's the optimal time and channel to first contact?",
    answer: "Your data shows Tuesday and Wednesday between 9-11 AM have the highest connect rates (42%). Phone calls convert 2.1x better than email for first touch. Text message within 5 minutes of form fill gets 67% response rate vs 12% for email.",
    chartType: "bar",
    chartData: [
      { label: "Tue 9-11", value: 42, color: "#108000" },
      { label: "Wed 9-11", value: 38, color: "#108000" },
      { label: "Mon 2-4", value: 28, color: "#60A5FA" },
      { label: "Thu 9-11", value: 24, color: "#60A5FA" },
      { label: "Fri AM", value: 15, color: "#E17000" },
    ],
    action: { label: "Schedule Calls for Tomorrow 9 AM", description: "4 uncontacted leads ready for first touch" },
    followUps: ["Which leads should I call first today?", "Can you auto-assign leads based on rep capacity?", "What's my lead response time vs competitors?"],
  },
  "What proposal format closes fastest at my price point?": {
    question: "What proposal format closes fastest at my price point?",
    answer: "For projects $15-35K (your sweet spot): Video walkthrough proposals close in 4.2 days vs 8.6 days for PDF-only. Including 3D renders increases close rate by 22%. Proposals with 3 pricing tiers (Good/Better/Best) have 18% higher average deal size.",
    chartType: "bar",
    chartData: [
      { label: "Video+Render", value: 78, color: "#108000" },
      { label: "Video Only", value: 62, color: "#60A5FA" },
      { label: "PDF+Photos", value: 44, color: "#E17000" },
      { label: "PDF Only", value: 31, color: "#D52B1E" },
    ],
    action: { label: "Create Video Proposal Template", description: "Automate with project photos + 3-tier pricing" },
    followUps: ["What's the ideal pricing for my close rate?", "How long is my average negotiation and can I shorten it?", "Which deals are at risk of stalling this week?"],
  },
  "Which channel produces the most profitable customers long-term?": {
    question: "Which channel produces the most profitable customers long-term?",
    answer: "Referral clients have $86K 2-year LTV with 94% on-time payment and only 2% dispute rate. Google Ads is #2 at $62K LTV with 78% on-time. Meta leads have lower LTV ($44K) and 12% dispute rate. Per dollar invested, referrals are 6x more profitable than Google over 2 years.",
    chartType: "bar",
    chartData: [
      { label: "Referral", value: 86, color: "#108000" },
      { label: "Google", value: 62, color: "#EA4335" },
      { label: "Meta", value: 44, color: "#1877F2" },
      { label: "Email", value: 28, color: "#0B7F5C" },
    ],
    action: { label: "Launch Referral Incentive Program", description: "Offer $500 credit for every signed referral — ROI: 104x" },
    followUps: ["Do higher-CPL channels actually produce better clients?", "Which channel's customers have the fewest payment disputes?", "What's my true CAC including sales and proposal costs?"],
  },
  "What's my true CAC including sales and proposal costs?": {
    question: "What's my true CAC including sales and proposal costs?",
    answer: "Your true CAC ranges from $82 (Referral) to $493 (Google). Google's CPL is $48 but true CAC is $493 when you add $120 sales time + $85 proposal prep — that's 10.3x the CPL. Meta's true CAC is $341 (15.5x CPL). Referrals cost $82 total with minimal sales effort.",
    chartType: "bar",
    chartData: [
      { label: "Google", value: 493, color: "#D52B1E" },
      { label: "Meta", value: 341, color: "#E17000" },
      { label: "Email", value: 193, color: "#60A5FA" },
      { label: "Referral", value: 82, color: "#108000" },
    ],
    action: { label: "Optimize Sales Process", description: "Template proposals to cut $85 prep cost by 60%" },
    followUps: ["Am I overspending on any channel relative to returns?", "Which channel gets me paid fastest after signing?", "What's the optimal budget split across my channels?"],
  },
  "Which channel gets me paid fastest after signing?": {
    question: "Which channel gets me paid fastest after signing?",
    answer: "Referral clients pay in 18 days (ad click → cash in bank). Google is 28 days, WhatsApp 22 days, Email 34 days, Meta 40 days. The gap between 'conversion' (what ad platforms report) and actual cash receipt averages 22 days. Meta's 40-day cash cycle means you're floating $6K per deal.",
    chartType: "bar",
    chartData: [
      { label: "Referral", value: 18, color: "#108000" },
      { label: "WhatsApp", value: 22, color: "#25D366" },
      { label: "Google", value: 28, color: "#EA4335" },
      { label: "Email", value: 34, color: "#0B7F5C" },
      { label: "Meta", value: 40, color: "#1877F2" },
    ],
    action: { label: "Require Deposits for Meta Leads", description: "50% upfront deposit to reduce cash cycle from 40d to ~20d" },
    followUps: ["How much revenue leaks between invoice and collection by channel?", "Which channel's customers have the fewest payment disputes?", "Which channel produces the most profitable customers long-term?"],
  },
  "Which campaign is most profitable after all costs?": {
    question: "Which campaign is most profitable after all costs?",
    answer: "WhatsApp Automated flows earn $4,400 net profit at 11.3x ROI with $0 ad spend — your most profitable campaign. Email Newsletter is 9.9x ROI on just $193 spend. Meta looks big ($38.4K revenue) but nets only $4.8K after $22.8K project costs + $8.2K labor. SMS is losing $400/mo with zero conversions.",
    chartType: "bar",
    chartData: [
      { label: "WhatsApp", value: 11.3, color: "#25D366" },
      { label: "Email", value: 9.9, color: "#0B7F5C" },
      { label: "Meta", value: 1.8, color: "#1877F2" },
      { label: "Google", value: 0.2, color: "#EA4335" },
      { label: "SMS", value: 0, color: "#D52B1E" },
    ],
    action: { label: "Scale WhatsApp Automations", description: "Add 3 more flows: post-project check-in, seasonal offer, referral ask" },
    followUps: ["Should I kill SMS and move budget to WhatsApp?", "What's the revenue per email sent vs per ad click?", "What content type gets the highest engagement by channel?"],
  },
  "Should I kill SMS and move budget to WhatsApp?": {
    question: "Should I kill SMS and move budget to WhatsApp?",
    answer: "Yes. SMS has spent $400/mo for 6 months ($2,400 total) with 47 clicks but 0 conversions and $0 revenue. WhatsApp automations earn $4,400/mo at 11.3x ROI. Moving the $400 to WhatsApp could generate 2-3 additional leads based on current conversion rates. Payback: immediate.",
    chartType: "bar",
    chartData: [
      { label: "SMS Revenue", value: 0, color: "#D52B1E" },
      { label: "SMS Cost", value: 400, color: "#D52B1E" },
      { label: "WA Revenue", value: 4400, color: "#25D366" },
      { label: "WA Cost", value: 0, color: "#108000" },
    ],
    action: { label: "Kill SMS, Move to WhatsApp", description: "Redirect $400/mo → WhatsApp automated flows. Projected: +2-3 leads/mo" },
    followUps: ["Which campaign is most profitable after all costs?", "Are my WhatsApp campaigns outperforming email?", "Which automated flows have the best open/click rates?"],
  },
  "Which campaigns produce the best-paying clients?": {
    question: "Which campaigns produce the best-paying clients?",
    answer: "WhatsApp automated flow clients pay 92% on-time with only 3% dispute rate and $48K 2-year LTV. Referrals are even better: 94% on-time, 2% disputes, $86K LTV. Meta Ad leads are the worst payers: 68% on-time, 14% dispute rate. This matters — late payments cost you $180/month in carrying costs per overdue invoice.",
    chartType: "bar",
    chartData: [
      { label: "Referral", value: 94, color: "#108000" },
      { label: "WhatsApp", value: 92, color: "#25D366" },
      { label: "Google", value: 78, color: "#EA4335" },
      { label: "Email", value: 72, color: "#0B7F5C" },
      { label: "Meta", value: 68, color: "#1877F2" },
    ],
    action: { label: "Require Deposits for Meta Leads", description: "50% upfront deposit reduces cash risk from $6K to $3K per deal" },
    followUps: ["Which campaign is most profitable after all costs?", "Which channel gets me paid fastest after signing?", "What's my true CAC including sales and proposal costs?"],
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
            <span className="text-[10px] text-[#6B7280] w-[80px] text-right shrink-0 truncate">{d.label}</span>
            <div className="flex-1 bg-[#E5E7EB] rounded-full h-[18px] overflow-hidden">
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
      <div className="fixed right-0 top-0 h-full w-[400px] bg-white border-l border-[#D1D5DB] shadow-lg z-50 flex flex-col slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg ii-gradient flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-[#22262A]">Intuit Intelligence</h3>
              <p className="text-[10px] text-[#9CA3AF]">AI-powered insights for your business</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[#F3F4F6] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round">
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
                <div className="bg-[#0B7F5C] text-white rounded-lg rounded-tr-none px-3 py-2 max-w-[85%]">
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
                <div className="bg-[#E6F5F0] rounded-lg rounded-tl-none p-3 flex-1">
                  <p className="text-[13px] text-[#22262A] leading-relaxed">{activeContent.answer}</p>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-[#F3F4F6] rounded-lg p-4">
                <PanelBarChart data={activeContent.chartData} />
              </div>

              {/* Action card */}
              <div className="border border-[#0B7F5C]/15 rounded-lg p-3 bg-[#E6F5F0]/50">
                <p className="text-[10px] text-[#9CA3AF] uppercase font-semibold mb-1">Recommended Action</p>
                <p className="text-[13px] font-semibold text-[#22262A]">{activeContent.action.label}</p>
                <p className="text-[11px] text-[#6B7280] mt-0.5">{activeContent.action.description}</p>
                <button className="mt-2 text-[12px] font-medium px-3 py-1.5 rounded-md ii-gradient text-white hover:opacity-90 transition-opacity">
                  {activeContent.action.label} →
                </button>
              </div>

              {/* Follow-up chips */}
              <div>
                <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Follow-up Questions</p>
                <div className="space-y-1.5">
                  {activeContent.followUps.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleChipClick(q)}
                      className="w-full text-left text-[12px] text-[#6B7280] px-3 py-2 rounded-md border border-[#E5E7EB] hover:bg-[#F3F4F6] hover:text-[#22262A] transition-colors"
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
                <div className="bg-[#E6F5F0] rounded-lg rounded-tl-none p-3 flex-1">
                  <p className="text-[13px] text-[#22262A] leading-relaxed">
                    Good morning! I&apos;ve analyzed your L2C pipeline overnight. What would you like to explore?
                  </p>
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">Suggested Questions</p>
                {DEFAULT_FOLLOWUPS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleChipClick(q)}
                    className="w-full text-left text-[12px] text-[#6B7280] px-3 py-2 rounded-md border border-[#E5E7EB] hover:bg-[#F3F4F6] hover:text-[#22262A] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-2 bg-[#F3F4F6] rounded-lg px-3 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Intuit Intelligence anything..."
              className="flex-1 bg-transparent text-[13px] text-[#000000] placeholder-[#9CA3AF] outline-none"
            />
            <button className="w-7 h-7 rounded-md ii-gradient flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </div>
          <p className="text-[9px] text-[#9CA3AF] mt-1.5 text-center">Intuit Intelligence uses AI. Responses may not always be accurate.</p>
        </div>
      </div>
    </>
  );
}
