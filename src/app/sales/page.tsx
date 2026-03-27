"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MetricCard } from "@/components/MetricCard";
import { BarChart } from "@/components/BarChart";
import { DonutChart } from "@/components/DonutChart";
import { DataTable } from "@/components/DataTable";
import { IntuitAssistCard } from "@/components/IntuitAssistCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ProgressBar } from "@/components/ProgressBar";
import { SceneTabs } from "@/components/SceneTabs";
import { MetricWell } from "@/components/MetricWell";
import { AIReportBuilder } from "@/components/AIReportBuilder";

function openIntelligencePanel(question: string) {
  window.dispatchEvent(new CustomEvent("open-intuit-intelligence", { detail: question }));
}

/* ═══════════════════════════════════════
   Scene 4: Pipeline
   Differentiators vs SF/HubSpot:
   - Financial-weighted pipeline (QBO margin data)
   - Deal profitability forecast (cost estimates from QBO)
   - Cash-adjusted deal scoring
   ═══════════════════════════════════════ */
const PIPELINE_METRICS_1 = [
  { label: "Pipeline Health", metrics: [
    { label: "Active Deals", value: "9", change: "$187K total", changeType: "positive" as const },
    { label: "30-Day Forecast", value: "$62K", change: "$13K gap to target", changeType: "negative" as const },
    { label: "Close Rate (Referral)", value: "61%", change: "vs 33% cold", changeType: "positive" as const },
    { label: "Avg Meetings to Close", value: "2.4", change: "-0.3 vs 90d", changeType: "positive" as const },
  ]},
  { label: "Deal Quality", metrics: [
    { label: "Weighted Pipeline", value: "$94K", change: "stage-adjusted", changeType: "positive" as const },
    { label: "Avg Deal Size", value: "$20.8K", change: "+8%", changeType: "positive" as const },
    { label: "Stalled Deals", value: "2", change: "$46K at risk", changeType: "negative" as const },
    { label: "Avg Days in Stage", value: "6.2d", change: "+1.8d", changeType: "negative" as const },
  ]},
];
const PIPELINE_METRICS_2 = [
  { label: "Profitability Forecast", metrics: [
    { label: "Projected Margin", value: "18%", change: "across active deals", changeType: "positive" as const },
    { label: "Highest Margin Deal", value: "24%", change: "Thompson $28K", changeType: "positive" as const },
    { label: "Lowest Margin Deal", value: "4%", change: "Davis $19K ⚠", changeType: "negative" as const },
    { label: "Revenue at Risk", value: "$46K", change: "Henderson + Park", changeType: "negative" as const },
  ]},
];
const PIPELINE_METRICS_3 = [
  { label: "Cash Impact", metrics: [
    { label: "Expected Cash (30d)", value: "$48K", change: "at current close rate", changeType: "positive" as const },
    { label: "Avg Deal-to-Cash", value: "34 days", change: "signed → collected", changeType: "negative" as const },
    { label: "Deposit Coverage", value: "42%", change: "of signed deals", changeType: "negative" as const },
    { label: "Cash Acceleration", value: "$18K/yr", change: "if auto-invoice", changeType: "positive" as const },
  ]},
];

const PIPELINE_CHIPS = [
  "Which deals are at risk of stalling this week?",
  "How do I close the $13K gap to hit my quarterly target?",
  "What meeting format closes deals fastest?",
  "Which deals have the best profit margins?",
];

function Scene4_Pipeline() {
  const [m1, setM1] = useState(0);
  const [m2, setM2] = useState(0);
  const [m3, setM3] = useState(0);

  return (
    <div className="space-y-5 fade-in">
      {/* II Banner */}
      <div className="qbo-card p-5" style={{ borderColor: "rgba(11,127,92,0.12)", boxShadow: "0 0 0 1px rgba(11,127,92,0.04), 0 2px 8px rgba(11,127,92,0.06)" }}>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg ii-gradient flex items-center justify-center shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
          </div>
          <div>
            <h3 className="text-[13px] font-semibold ii-text uppercase tracking-wide">Intuit Intelligence · Pipeline Pulse</h3>
            <p className="text-[14px] text-[#22262A] leading-relaxed mt-1.5">
              Henderson ($32K) stalled 18 days at Proposal — 3x average. <strong>Projected margin: only 12%</strong> after QBO cost estimates.
              Park ($14K) cancelled twice. Your pipeline is $187K but <strong>cash-adjusted value is only $94K</strong> at current close rates.
              Video+visit closes <strong>2.4x faster</strong> than phone — 3 deals need site visits.
            </p>
            <div className="flex gap-2 mt-3">
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md ii-gradient text-white hover:opacity-90">Follow Up Henderson</button>
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md border border-[#D1D5DB] text-[#22262A] hover:bg-[#F3F4F6]">Schedule Site Visits</button>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E5E7EB] pt-3">
          <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Ask Intuit Intelligence</p>
          <div className="flex flex-wrap gap-2">
            {PIPELINE_CHIPS.map((chip) => (
              <button key={chip} onClick={() => openIntelligencePanel(chip)} className="text-[12px] text-[#0B7F5C] px-3 py-1.5 rounded-full border border-[#0B7F5C]/20 bg-[#E6F5F0]/50 hover:bg-[#E6F5F0] hover:border-[#0B7F5C]/40 transition-all">{chip}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Wells */}
      <div className="qbo-card p-5 space-y-4">
        <MetricWell title="Pipeline Health" metricSets={PIPELINE_METRICS_1} activeSet={m1} onSetChange={setM1} />
        <div className="border-b border-[#E5E7EB]" />
        <MetricWell title="Profitability Forecast" metricSets={PIPELINE_METRICS_2} activeSet={m2} onSetChange={setM2} />
        <div className="border-b border-[#E5E7EB]" />
        <MetricWell title="Cash Impact" metricSets={PIPELINE_METRICS_3} activeSet={m3} onSetChange={setM3} />
      </div>

      {/* Pipeline + Win/Loss */}
      <div className="grid grid-cols-2 gap-4">
        <div className="qbo-card p-5">
          <h3 className="text-[13px] font-semibold text-[#22262A] mb-4">Pipeline by Stage</h3>
          <BarChart data={[
            { label: "Discovery", value: 42000, color: "#0B7F5C" },
            { label: "Proposal", value: 68000, color: "#108000" },
            { label: "Negotiation", value: 45000, color: "#E17000" },
            { label: "Closing", value: 32000, color: "#065F46" },
          ]} height={180} />
        </div>
        <div className="qbo-card p-5">
          <h3 className="text-[13px] font-semibold text-[#22262A] mb-4">Win/Loss Analysis (90 Days)</h3>
          <DonutChart segments={[
            { label: "Won", value: 14, color: "#108000" },
            { label: "No Decision", value: 8, color: "#D1D5DB" },
            { label: "Competitor", value: 3, color: "#D52B1E" },
            { label: "Budget", value: 2, color: "#E17000" },
          ]} centerValue="14" centerLabel="Won" />
        </div>
      </div>

      {/* Deal Profitability Forecast — QBO EXCLUSIVE */}
      <div className="qbo-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-semibold text-[#22262A]">Deal Profitability Forecast</h3>
          <span className="text-[9px] px-2 py-0.5 rounded bg-[#0B7F5C]/10 text-[#0B7F5C] font-bold">QBO EXCLUSIVE</span>
        </div>
        <p className="text-[10px] text-[#9CA3AF] mb-3">Projected margin using QBO cost estimates — Salesforce/HubSpot can&apos;t see your costs</p>
        <DataTable
          headers={["Deal", "Revenue", "Est. Cost", "Proj. Margin", "Days in Stage", "Risk"]}
          rows={[
            ["Thompson Living Room", "$28K", "$21.3K", <span key="m1" className="text-[#108000] font-bold">24%</span>, "4d", <StatusBadge key="r1" status="Healthy" variant="success" />],
            ["Reyes Outdoor", "$22K", "$17.4K", <span key="m2" className="text-[#108000] font-bold">21%</span>, "3d", <StatusBadge key="r2" status="On Track" variant="success" />],
            ["Henderson Kitchen", "$32K", "$28.2K", <span key="m3" className="text-[#E17000] font-bold">12%</span>, "18d", <StatusBadge key="r3" status="Low Margin" variant="warning" />],
            ["Davis Bedroom", "$19K", "$18.2K", <span key="m4" className="text-[#D52B1E] font-bold">4%</span>, "—", <StatusBadge key="r4" status="Margin Risk" variant="danger" />],
          ]}
        />
      </div>

      {/* Deals Needing Attention */}
      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#22262A] mb-3">Deals Needing Attention</h3>
        <DataTable
          headers={["Deal", "Value", "Stage", "Days in Stage", "Avg", "Risk"]}
          rows={[
            ["Henderson Kitchen", "$32,000", "Proposal Sent", "18 days", "6 days", <StatusBadge key="r1" status="Stalling" variant="danger" />],
            ["Park Bathroom", "$14,000", "Discovery", "12 days", "5 days", <StatusBadge key="r2" status="2x Cancelled" variant="warning" />],
            ["Thompson Living Room", "$28,000", "Discovery", "4 days", "5 days", <StatusBadge key="r3" status="On Track" variant="success" />],
            ["Reyes Outdoor", "$22,000", "Proposal Sent", "3 days", "6 days", <StatusBadge key="r4" status="On Track" variant="success" />],
          ]}
        />
      </div>

      {/* Meeting format */}
      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#22262A] mb-4">Meeting Format → Deal Progression Rate</h3>
        <BarChart data={[
          { label: "Video + Visit", value: 78, color: "#108000" },
          { label: "Video Only", value: 68, color: "#0B7F5C" },
          { label: "Phone", value: 31, color: "#E17000" },
          { label: "Email", value: 12, color: "#D1D5DB" },
        ]} height={150} />
      </div>

      {/* Stage Explorer */}
      <div className="qbo-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-md ii-gradient flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
          </div>
          <h3 className="text-[13px] font-semibold text-[#22262A]">Explore by Deal Stage</h3>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { stage: "Discovery", icon: "🔎", color: "#0B7F5C", bg: "#E6F5F0", prompts: ["Which discovery deals should I prioritize?", "What's the avg conversion rate from discovery?", "How do discovery deals compare by source?"] },
            { stage: "Proposal", icon: "📋", color: "#108000", bg: "#F0FAF0", prompts: ["Which proposals are stalling and why?", "What proposal template closes fastest?", "Show me margin forecast for open proposals"] },
            { stage: "Negotiation", icon: "🤝", color: "#E17000", bg: "#FFF7ED", prompts: ["What concessions work without killing margin?", "How long do my negotiations typically take?", "Which deals need executive escalation?"] },
            { stage: "Closing", icon: "✅", color: "#065F46", bg: "#F0FAF0", prompts: ["What's blocking my closing deals?", "How fast can I invoice after signing?", "Show me cash timeline for closing deals"] },
          ].map((s) => (
            <div key={s.stage} className="rounded-lg border border-[#E5E7EB] overflow-hidden hover:shadow-sm transition-shadow">
              <div className="px-3 py-2.5 flex items-center gap-2" style={{ backgroundColor: s.bg }}>
                <span className="text-[16px]">{s.icon}</span>
                <p className="text-[12px] font-bold" style={{ color: s.color }}>{s.stage}</p>
              </div>
              <div className="p-2 space-y-1">
                {s.prompts.map((p) => (
                  <button key={p} onClick={() => openIntelligencePanel(p)} className="w-full text-left text-[11px] text-[#6B7280] px-2 py-1.5 rounded hover:bg-[#F3F4F6] hover:text-[#22262A] transition-colors leading-snug">{p}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AIReportBuilder />
    </div>
  );
}

/* ═══════════════════════════════════════
   Scene 5: Proposals
   Differentiators vs SF/HubSpot:
   - Proposal ROI (cost to create vs revenue won)
   - Margin-aware pricing recommendations
   - Proposal-to-cash tracking
   ═══════════════════════════════════════ */
const PROPOSAL_METRICS_1 = [
  { label: "Performance", metrics: [
    { label: "Proposals (90d)", value: "40", change: "+8 vs prior", changeType: "positive" as const },
    { label: "Premium Sign Rate", value: "54%", change: "vs 29% Basic", changeType: "positive" as const },
    { label: "Best Send Day", value: "Tue/Wed", change: "2 days faster", changeType: "positive" as const },
    { label: "48h Abandon", value: "80%", change: "if unviewed", changeType: "negative" as const },
  ]},
];
const PROPOSAL_METRICS_2 = [
  { label: "Financial Impact", metrics: [
    { label: "Proposal ROI", value: "38x", change: "$85 cost → $3.2K avg margin", changeType: "positive" as const },
    { label: "Avg Signed Value", value: "$24K", change: "+12% with Premium", changeType: "positive" as const },
    { label: "Revenue Pending", value: "$72K", change: "3 unsigned proposals", changeType: "negative" as const },
    { label: "Margin on Signed", value: "21%", change: "after QBO costs", changeType: "positive" as const },
  ]},
];

const PROPOSAL_CHIPS = [
  "What proposal format closes fastest at my price point?",
  "Which unsigned proposals should I follow up today?",
  "How does pricing affect my close rate and margin?",
  "Show me proposal ROI by template type",
];

function Scene5_Proposals() {
  const [m1, setM1] = useState(0);
  const [m2, setM2] = useState(0);

  return (
    <div className="space-y-5 fade-in">
      {/* II Banner */}
      <div className="qbo-card p-5" style={{ borderColor: "rgba(11,127,92,0.12)", boxShadow: "0 0 0 1px rgba(11,127,92,0.04), 0 2px 8px rgba(11,127,92,0.06)" }}>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg ii-gradient flex items-center justify-center shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
          </div>
          <div>
            <h3 className="text-[13px] font-semibold ii-text uppercase tracking-wide">Intuit Intelligence · Quote Whisperer</h3>
            <p className="text-[14px] text-[#22262A] leading-relaxed mt-1.5">
              Premium templates close at <strong>54% vs 29% Basic</strong> — and produce <strong>21% margin</strong> after QBO project costs.
              Henderson viewed your proposal 3x yesterday but hasn&apos;t signed — they&apos;re comparing options.
              Liu&apos;s proposal is <strong>unopened for 6 days</strong> — 80% abandon rate after 48h.
            </p>
            <div className="flex gap-2 mt-3">
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md ii-gradient text-white hover:opacity-90">Follow Up Henderson</button>
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md border border-[#D1D5DB] text-[#22262A] hover:bg-[#F3F4F6]">Resend Liu Proposal</button>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E5E7EB] pt-3">
          <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Ask Intuit Intelligence</p>
          <div className="flex flex-wrap gap-2">
            {PROPOSAL_CHIPS.map((chip) => (
              <button key={chip} onClick={() => openIntelligencePanel(chip)} className="text-[12px] text-[#0B7F5C] px-3 py-1.5 rounded-full border border-[#0B7F5C]/20 bg-[#E6F5F0]/50 hover:bg-[#E6F5F0] hover:border-[#0B7F5C]/40 transition-all">{chip}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Wells */}
      <div className="qbo-card p-5 space-y-4">
        <MetricWell title="Proposal Performance" metricSets={PROPOSAL_METRICS_1} activeSet={m1} onSetChange={setM1} />
        <div className="border-b border-[#E5E7EB]" />
        <MetricWell title="Financial Impact" metricSets={PROPOSAL_METRICS_2} activeSet={m2} onSetChange={setM2} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="qbo-card p-5">
          <h3 className="text-[13px] font-semibold text-[#22262A] mb-4">Template Sign Rate</h3>
          <BarChart data={[
            { label: "Premium", value: 54, color: "#108000" },
            { label: "Standard", value: 38, color: "#0B7F5C" },
            { label: "Basic", value: 29, color: "#D1D5DB" },
          ]} height={150} />
        </div>
        <div className="qbo-card p-5">
          <h3 className="text-[13px] font-semibold text-[#22262A] mb-4">Days to Sign by Send Day</h3>
          <BarChart data={[
            { label: "Mon", value: 6, color: "#D1D5DB" },
            { label: "Tue", value: 3, color: "#108000" },
            { label: "Wed", value: 3.5, color: "#108000" },
            { label: "Thu", value: 5, color: "#0B7F5C" },
            { label: "Fri", value: 8, color: "#E17000" },
          ]} height={150} />
        </div>
      </div>

      {/* Proposal ROI — QBO EXCLUSIVE */}
      <div className="qbo-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-semibold text-[#22262A]">Proposal ROI — Cost to Create vs Revenue Won</h3>
          <span className="text-[9px] px-2 py-0.5 rounded bg-[#0B7F5C]/10 text-[#0B7F5C] font-bold">QBO EXCLUSIVE</span>
        </div>
        <DataTable
          headers={["Template", "Proposals", "Cost/Each", "Sign Rate", "Avg Revenue", "Net Margin", "ROI"]}
          rows={[
            ["Premium", "18", "$85", <span key="s1" className="text-[#108000] font-bold">54%</span>, "$28K", "21%", <span key="r1" className="text-[#108000] font-bold">68x</span>],
            ["Standard", "14", "$65", "38%", "$22K", "18%", <span key="r2" className="text-[#0B7F5C] font-bold">42x</span>],
            ["Basic", "8", "$35", <span key="s3" className="text-[#D52B1E] font-bold">29%</span>, "$14K", "12%", <span key="r3" className="text-[#E17000] font-bold">22x</span>],
          ]}
        />
      </div>

      {/* Active Proposals */}
      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#22262A] mb-3">Active Proposals</h3>
        <DataTable
          headers={["Proposal", "Value", "Template", "Sent", "Views", "Status"]}
          rows={[
            ["Henderson Kitchen", "$32,000", "Premium", "14d ago", "3 views", <StatusBadge key="s1" status="Viewed — Unsigned" variant="warning" />],
            ["Reyes Outdoor", "$22,000", "Premium", "3d ago", "1 view", <StatusBadge key="s2" status="Recently Viewed" variant="info" />],
            ["Liu Master Suite", "$18,000", "Standard", "6d ago", "0 views", <StatusBadge key="s3" status="Unopened" variant="danger" />],
          ]}
        />
      </div>

      {/* Stage Explorer */}
      <div className="qbo-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-md ii-gradient flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
          </div>
          <h3 className="text-[13px] font-semibold text-[#22262A]">Explore by Proposal Stage</h3>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { stage: "Draft", icon: "✏️", color: "#0B7F5C", bg: "#E6F5F0", prompts: ["What pricing maximizes both close rate and margin?", "Which template should I use for this deal size?", "How should I structure payment terms?"] },
            { stage: "Sent", icon: "📤", color: "#60A5FA", bg: "#E6F5F0", prompts: ["Which sent proposals need follow-up?", "What's the ideal follow-up timing?", "How do I re-engage unopened proposals?"] },
            { stage: "Viewed", icon: "👁", color: "#E17000", bg: "#FFF7ED", prompts: ["Which viewed proposals are likely to close?", "Why do viewed proposals go unsigned?", "What incentive works best for hesitant buyers?"] },
            { stage: "Signed", icon: "✅", color: "#108000", bg: "#F0FAF0", prompts: ["How fast should I invoice after signing?", "What's the avg margin on recently signed deals?", "Which signed deals need deposit collection?"] },
          ].map((s) => (
            <div key={s.stage} className="rounded-lg border border-[#E5E7EB] overflow-hidden hover:shadow-sm transition-shadow">
              <div className="px-3 py-2.5 flex items-center gap-2" style={{ backgroundColor: s.bg }}>
                <span className="text-[16px]">{s.icon}</span>
                <p className="text-[12px] font-bold" style={{ color: s.color }}>{s.stage}</p>
              </div>
              <div className="p-2 space-y-1">
                {s.prompts.map((p) => (
                  <button key={p} onClick={() => openIntelligencePanel(p)} className="w-full text-left text-[11px] text-[#6B7280] px-2 py-1.5 rounded hover:bg-[#F3F4F6] hover:text-[#22262A] transition-colors leading-snug">{p}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AIReportBuilder />
    </div>
  );
}

/* ═══════════════════════════════════════
   Scene 6: Contract → Cash
   Differentiators vs SF/HubSpot:
   - Full signed→invoiced→paid pipeline
   - Auto-invoice gap detection
   - Payment prediction + cash acceleration
   ═══════════════════════════════════════ */
const C2C_METRICS_1 = [
  { label: "Cycle Times", metrics: [
    { label: "Signed→Invoice Gap", value: "11 days", change: "Target: 2 days", changeType: "negative" as const },
    { label: "Invoice→Payment", value: "22 days", change: "DSO trending up", changeType: "negative" as const },
    { label: "Total Cycle", value: "33 days", change: "signed to cash", changeType: "negative" as const },
    { label: "Cash Acceleration", value: "$18K/yr", change: "if gap → 2 days", changeType: "positive" as const },
  ]},
];
const C2C_METRICS_2 = [
  { label: "Collection Health", metrics: [
    { label: "On-Time Rate", value: "78%", change: "+4pp vs 90d", changeType: "positive" as const },
    { label: "Overdue AR", value: "$14.1K", change: "3 clients", changeType: "negative" as const },
    { label: "Best Method", value: "ACH", change: "8d faster than check", changeType: "positive" as const },
    { label: "Deposit Coverage", value: "42%", change: "of new deals", changeType: "negative" as const },
  ]},
];

const C2C_CHIPS = [
  "Who owes me money and how do I get paid faster?",
  "What's the cash impact of auto-invoicing?",
  "Which payment methods reduce my DSO most?",
  "Show me the collection forecast for next 30 days",
];

function Scene6_ContractToCash() {
  const [m1, setM1] = useState(0);
  const [m2, setM2] = useState(0);

  return (
    <div className="space-y-5 fade-in">
      {/* II Banner */}
      <div className="qbo-card p-5" style={{ borderColor: "rgba(11,127,92,0.12)", boxShadow: "0 0 0 1px rgba(11,127,92,0.04), 0 2px 8px rgba(11,127,92,0.06)" }}>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg ii-gradient flex items-center justify-center shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
          </div>
          <div>
            <h3 className="text-[13px] font-semibold ii-text uppercase tracking-wide">Intuit Intelligence · Cash Accelerator</h3>
            <p className="text-[14px] text-[#22262A] leading-relaxed mt-1.5">
              Your signed-to-invoice gap is <strong>11 days</strong> — that&apos;s 11 days of cash left on the table every deal.
              Henderson was just signed for $32K but <strong>no invoice generated yet</strong>. Reducing this gap to 2 days = <strong>$18,000/yr faster collections</strong>.
              Morrison owes $6.2K for 38 days — require deposits next time.
            </p>
            <div className="flex gap-2 mt-3">
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md ii-gradient text-white hover:opacity-90">Generate Invoice Now</button>
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md border border-[#D1D5DB] text-[#22262A] hover:bg-[#F3F4F6]">Set Auto-Invoice</button>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E5E7EB] pt-3">
          <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Ask Intuit Intelligence</p>
          <div className="flex flex-wrap gap-2">
            {C2C_CHIPS.map((chip) => (
              <button key={chip} onClick={() => openIntelligencePanel(chip)} className="text-[12px] text-[#0B7F5C] px-3 py-1.5 rounded-full border border-[#0B7F5C]/20 bg-[#E6F5F0]/50 hover:bg-[#E6F5F0] hover:border-[#0B7F5C]/40 transition-all">{chip}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Wells */}
      <div className="qbo-card p-5 space-y-4">
        <MetricWell title="Cycle Times" metricSets={C2C_METRICS_1} activeSet={m1} onSetChange={setM1} />
        <div className="border-b border-[#E5E7EB]" />
        <MetricWell title="Collection Health" metricSets={C2C_METRICS_2} activeSet={m2} onSetChange={setM2} />
      </div>

      {/* Contract-to-Cash Pipeline */}
      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#22262A] mb-4">Contract-to-Cash Pipeline</h3>
        <div className="space-y-3">
          {[
            { stage: "Signed", count: 3, value: "$64,000", color: "#0B7F5C", pct: 100 },
            { stage: "Invoiced", count: 2, value: "$32,000", color: "#108000", pct: 50 },
            { stage: "Paid", count: 1, value: "$14,000", color: "#065F46", pct: 22 },
          ].map((s) => (
            <div key={s.stage}>
              <div className="flex justify-between mb-1">
                <span className="text-[12px] font-medium text-[#22262A]">{s.stage}</span>
                <span className="text-[11px] text-[#9CA3AF]">{s.count} deals · {s.value}</span>
              </div>
              <ProgressBar value={s.pct} color={s.color} />
            </div>
          ))}
        </div>
      </div>

      {/* Post-Signature Deals */}
      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#22262A] mb-3">Post-Signature Deals</h3>
        <DataTable
          headers={["Deal", "Value", "Signed", "Invoiced", "Paid", "Action"]}
          rows={[
            ["Henderson Kitchen", "$32K", <StatusBadge key="s1" status="Just Now" variant="success" />, <StatusBadge key="i1" status="Not Yet" variant="warning" />, "—", <button key="b1" className="text-[11px] ii-gradient text-white px-2 py-1 rounded font-medium">Invoice Now →</button>],
            ["Reyes Outdoor", "$22K", "12d ago", "8d ago", "—", <StatusBadge key="s2" status="Awaiting Payment" variant="info" />],
            ["Chen Bathroom", "$14K", "28d ago", "22d ago", "6d ago", <StatusBadge key="s3" status="Paid ✓" variant="success" />],
          ]}
        />
      </div>

      {/* Cycle Breakdown */}
      <div className="flex gap-0 qbo-card overflow-hidden">
        {[
          { label: "Signed → Invoiced", value: "11 days", color: "#0B7F5C", sub: "Target: 2 days" },
          { label: "Invoiced → Paid", value: "22 days", color: "#E17000", sub: "DSO trending up" },
          { label: "Total Cycle", value: "33 days", color: "#065F46", sub: "Industry avg: 25d" },
        ].map((s, i) => (
          <div key={i} className="flex-1 text-center p-4 border-r border-[#E5E7EB] last:border-r-0">
            <p className="text-[18px] font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-[#9CA3AF]">{s.label}</p>
            <p className="text-[9px] text-[#D1D5DB] mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Stage Explorer */}
      <div className="qbo-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-md ii-gradient flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
          </div>
          <h3 className="text-[13px] font-semibold text-[#22262A]">Explore by Collection Stage</h3>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { stage: "Signed", icon: "✍️", color: "#0B7F5C", bg: "#E6F5F0", prompts: ["How fast should I invoice after signing?", "What deposit % should I require?", "Which deals need milestone billing?"] },
            { stage: "Invoiced", icon: "📄", color: "#60A5FA", bg: "#E6F5F0", prompts: ["Which invoices are at risk of going overdue?", "What payment terms get me paid fastest?", "Should I offer early payment discount?"] },
            { stage: "Overdue", icon: "⚠️", color: "#D52B1E", bg: "#FEF2F2", prompts: ["Who owes me money right now?", "What's the best collection strategy per client?", "Should I require deposits from chronic late-payers?"] },
            { stage: "Collected", icon: "💰", color: "#108000", bg: "#F0FAF0", prompts: ["What's my cash forecast for next 30 days?", "How much faster would ACH get me paid?", "What's my collection effectiveness trend?"] },
          ].map((s) => (
            <div key={s.stage} className="rounded-lg border border-[#E5E7EB] overflow-hidden hover:shadow-sm transition-shadow">
              <div className="px-3 py-2.5 flex items-center gap-2" style={{ backgroundColor: s.bg }}>
                <span className="text-[16px]">{s.icon}</span>
                <p className="text-[12px] font-bold" style={{ color: s.color }}>{s.stage}</p>
              </div>
              <div className="p-2 space-y-1">
                {s.prompts.map((p) => (
                  <button key={p} onClick={() => openIntelligencePanel(p)} className="w-full text-left text-[11px] text-[#6B7280] px-2 py-1.5 rounded hover:bg-[#F3F4F6] hover:text-[#22262A] transition-colors leading-snug">{p}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AIReportBuilder />
    </div>
  );
}

/* ═══════════════════════════════════════
   Page Shell
   ═══════════════════════════════════════ */
function SalesInner() {
  const searchParams = useSearchParams();
  const [activeScene, setActiveScene] = useState(4);

  useEffect(() => {
    const s = searchParams.get("scene");
    if (s) setActiveScene(Number(s));
  }, [searchParams]);

  const tabs = [
    { id: 4, label: "Pipeline" },
    { id: 5, label: "Proposals" },
    { id: 6, label: "Contract → Cash" },
  ];

  const salesScenes = [4, 5, 6];
  const currentScene = salesScenes.includes(activeScene) ? activeScene : 4;

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[20px] font-semibold text-[#22262A]">Sales</h1>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">{tabs.find((t) => t.id === currentScene)?.label || "Pipeline"}</p>
        </div>
        <select className="text-[12px] border border-[#D1D5DB] rounded-md px-3 py-1.5 bg-white text-[#6B7280]">
          <option>This Quarter</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div className="flex gap-1 mb-6 bg-[#ECEEF2] rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveScene(tab.id)} className={`qbo-tab ${currentScene === tab.id ? "qbo-tab-active" : ""}`}>{tab.label}</button>
        ))}
      </div>

      {currentScene === 4 && <Scene4_Pipeline />}
      {currentScene === 5 && <Scene5_Proposals />}
      {currentScene === 6 && <Scene6_ContractToCash />}

      <SceneTabs active={activeScene} onChange={setActiveScene} />
    </div>
  );
}

export default function SalesPage() {
  return <Suspense><SalesInner /></Suspense>;
}
