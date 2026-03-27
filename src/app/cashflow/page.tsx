"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MetricCard } from "@/components/MetricCard";
import { BarChart } from "@/components/BarChart";
import { LineChart } from "@/components/LineChart";
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
   Scene 7: Project Profitability
   Differentiators vs SF/HubSpot:
   - Real-time margin tracking vs estimate
   - Cost variance by category (labor, materials, subs)
   - Subcontractor performance scoring
   - Scope creep detection
   ═══════════════════════════════════════ */
const PROFIT_METRICS_1 = [
  { label: "Margin Health", metrics: [
    { label: "Active Projects", value: "4", change: "$83K total", changeType: "positive" as const },
    { label: "Avg Target Margin", value: "22%", change: "across portfolio", changeType: "positive" as const },
    { label: "Actual Avg Margin", value: "17%", change: "-5pp vs target", changeType: "negative" as const },
    { label: "Margin at Risk", value: "$3,400", change: "Davis project", changeType: "negative" as const },
  ]},
  { label: "Cost Breakdown", metrics: [
    { label: "Total Labor", value: "$32.4K", change: "42% of costs", changeType: "positive" as const },
    { label: "Total Materials", value: "$18.6K", change: "24% of costs", changeType: "positive" as const },
    { label: "Subcontractors", value: "$14.2K", change: "18% — over budget", changeType: "negative" as const },
    { label: "Overhead", value: "$12.1K", change: "16% of costs", changeType: "positive" as const },
  ]},
];
const PROFIT_METRICS_2 = [
  { label: "Variance", metrics: [
    { label: "Budget Variance", value: "-$4,200", change: "over budget", changeType: "negative" as const },
    { label: "Biggest Overrun", value: "Electrical", change: "+$2,800 on Davis", changeType: "negative" as const },
    { label: "Best Performing", value: "Thompson", change: "2pp above target", changeType: "positive" as const },
    { label: "Scope Changes", value: "3", change: "1 unbilled ($2,800)", changeType: "negative" as const },
  ]},
];

const PROFIT_CHIPS = [
  "Which project is at risk of losing money?",
  "How does my actual margin compare to estimates?",
  "Which subcontractor is causing cost overruns?",
  "Show me unbilled scope changes across all projects",
];

function Scene7_Profitability() {
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
            <h3 className="text-[13px] font-semibold ii-text uppercase tracking-wide">Intuit Intelligence · Margin Monitor</h3>
            <p className="text-[14px] text-[#22262A] leading-relaxed mt-1.5">
              Davis Master Bedroom trending to <strong>4% margin</strong> (target: 22%). Root cause: electrical sub exceeded estimate by <strong>$2,800</strong> — scope change never billed.
              Your portfolio margin is <strong>17% vs 22% target</strong>. Three projects are healthy; Davis needs immediate action to avoid going negative.
            </p>
            <div className="flex gap-2 mt-3">
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md ii-gradient text-white hover:opacity-90">Issue Change Order</button>
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md border border-[#D1D5DB] text-[#22262A] hover:bg-[#F3F4F6]">Adjust Budget</button>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E5E7EB] pt-3">
          <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Ask Intuit Intelligence</p>
          <div className="flex flex-wrap gap-2">
            {PROFIT_CHIPS.map((chip) => (
              <button key={chip} onClick={() => openIntelligencePanel(chip)} className="text-[12px] text-[#0B7F5C] px-3 py-1.5 rounded-full border border-[#0B7F5C]/20 bg-[#E6F5F0]/50 hover:bg-[#E6F5F0] hover:border-[#0B7F5C]/40 transition-all">{chip}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Wells */}
      <div className="qbo-card p-5 space-y-4">
        <MetricWell title="Margin Health" metricSets={PROFIT_METRICS_1} activeSet={m1} onSetChange={setM1} />
        <div className="border-b border-[#E5E7EB]" />
        <MetricWell title="Cost Variance" metricSets={PROFIT_METRICS_2} activeSet={m2} onSetChange={setM2} />
      </div>

      {/* Active Project Health */}
      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#22262A] mb-3">Active Project Health</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Thompson Living Room", value: "$28K", margin: 24, target: 22, ok: true, completion: 40 },
            { name: "Reyes Outdoor", value: "$22K", margin: 21, target: 22, ok: true, completion: 25 },
            { name: "Chen Bathroom", value: "$14K", margin: 19, target: 22, ok: true, completion: 85 },
            { name: "Davis Master Bedroom", value: "$19K", margin: 4, target: 22, ok: false, completion: 60 },
          ].map((p) => (
            <div key={p.name} className={`p-3 rounded-lg border ${!p.ok ? "border-[#D52B1E]/30 bg-[#FEF2F2]/50" : "border-[#E5E7EB]"}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-[12px] font-semibold text-[#22262A]">{p.name}</p>
                  <p className="text-[10px] text-[#9CA3AF]">{p.value} · {p.completion}% done</p>
                </div>
                <StatusBadge status={`${p.margin}% margin`} variant={p.ok ? "success" : "danger"} />
              </div>
              <ProgressBar value={p.completion} color={p.ok ? "#108000" : "#D52B1E"} label="Completion" />
              <div className="mt-2">
                <ProgressBar value={p.margin} max={30} color={p.margin >= p.target ? "#108000" : "#D52B1E"} label={`Margin (${p.target}% target)`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Alert */}
      <div className="rounded-lg border-2 border-[#D52B1E]/15 bg-white p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 rounded-full bg-[#FEF2F2] flex items-center justify-center">
            <span className="text-[11px] text-[#D52B1E] font-bold">!</span>
          </div>
          <h3 className="text-[13px] font-semibold text-[#D52B1E]">Davis Master Bedroom — Budget Alert</h3>
          <span className="text-[9px] px-2 py-0.5 rounded bg-[#0B7F5C]/10 text-[#0B7F5C] font-bold ml-auto">QBO REAL-TIME</span>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-3">
          <div><p className="text-[10px] text-[#9CA3AF]">Budget</p><p className="text-sm font-bold text-[#22262A]">$19,000</p></div>
          <div><p className="text-[10px] text-[#9CA3AF]">Actual (60%)</p><p className="text-sm font-bold text-[#D52B1E]">$14,200</p></div>
          <div><p className="text-[10px] text-[#9CA3AF]">Projected Final</p><p className="text-sm font-bold text-[#D52B1E]">$19,380</p></div>
        </div>
        <BarChart data={[
          { label: "Labor", value: 6800, color: "#0B7F5C" },
          { label: "Materials", value: 3200, color: "#108000" },
          { label: "Electrical Sub", value: 4200, color: "#D52B1E" },
        ]} height={130} />
        <p className="text-[10px] text-[#D52B1E] mt-2">Electrical subcontractor exceeded estimate by $2,800 — scope change not captured in a change order</p>
      </div>

      {/* Subcontractor Performance — QBO EXCLUSIVE */}
      <div className="qbo-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-semibold text-[#22262A]">Subcontractor Performance Scoring</h3>
          <span className="text-[9px] px-2 py-0.5 rounded bg-[#0B7F5C]/10 text-[#0B7F5C] font-bold">QBO EXCLUSIVE</span>
        </div>
        <p className="text-[10px] text-[#9CA3AF] mb-3">Cost accuracy + on-time + quality history from QBO project data — SF/HubSpot can&apos;t track this</p>
        <DataTable
          headers={["Subcontractor", "Projects", "Avg Variance", "On-Time", "Score"]}
          rows={[
            ["Martinez Plumbing", "8", <span key="v1" className="text-[#108000] font-bold">+2%</span>, "94%", <span key="s1" className="text-[#108000] font-bold">A</span>],
            ["Lee Carpentry", "12", <span key="v2" className="text-[#108000] font-bold">+5%</span>, "88%", <span key="s2" className="text-[#0B7F5C] font-bold">B+</span>],
            ["Apex Electrical", "6", <span key="v3" className="text-[#D52B1E] font-bold">+22%</span>, "67%", <span key="s3" className="text-[#D52B1E] font-bold">D</span>],
          ]}
        />
      </div>

      {/* Stage Explorer */}
      <div className="qbo-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-md ii-gradient flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
          </div>
          <h3 className="text-[13px] font-semibold text-[#22262A]">Explore by Cost Category</h3>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { stage: "Labor", icon: "👷", color: "#0B7F5C", bg: "#E6F5F0", prompts: ["Am I over-staffing any project?", "Which crew is most cost-effective?", "How does labor % compare to industry?"] },
            { stage: "Materials", icon: "🧱", color: "#108000", bg: "#F0FAF0", prompts: ["Where can I reduce material costs?", "Which supplier gives best pricing?", "Are material costs trending up?"] },
            { stage: "Subs", icon: "🔧", color: "#E17000", bg: "#FFF7ED", prompts: ["Which sub is over budget most often?", "Should I replace Apex Electrical?", "What's the true cost of sub overruns?"] },
            { stage: "Overhead", icon: "📊", color: "#3CBFA4", bg: "#E6F5F0", prompts: ["What's my overhead rate vs revenue?", "How can I reduce fixed costs?", "Which project absorbs the most overhead?"] },
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
   Scene 8: Payments & Waterfall
   Differentiators vs SF/HubSpot:
   - Full revenue waterfall pipeline→cash
   - Payment behavior prediction
   - Working capital forecast
   - Collection effectiveness index
   ═══════════════════════════════════════ */
const PAYMENT_METRICS_1 = [
  { label: "Collection Health", metrics: [
    { label: "Current DSO", value: "27 days", change: "Was 18d (6mo ago)", changeType: "negative" as const },
    { label: "Overdue AR", value: "$14,100", change: "3 clients = 72%", changeType: "negative" as const },
    { label: "ACH Saves", value: "8 days", change: "vs check", changeType: "positive" as const },
    { label: "30-Day Collections", value: "$31,400", change: "projected", changeType: "positive" as const },
  ]},
  { label: "Forecasting", metrics: [
    { label: "Expected Cash (30d)", value: "$48K", change: "at current rate", changeType: "positive" as const },
    { label: "Collection Rate", value: "78%", change: "on time", changeType: "positive" as const },
    { label: "Dispute Rate", value: "8%", change: "-2pp vs 90d", changeType: "positive" as const },
    { label: "Avg Payment Method", value: "Check", change: "Switch to ACH!", changeType: "negative" as const },
  ]},
];
const PAYMENT_METRICS_2 = [
  { label: "Working Capital", metrics: [
    { label: "Cash in Bank", value: "$48K", change: "current balance", changeType: "positive" as const },
    { label: "AR Outstanding", value: "$14K", change: "due within 30d", changeType: "negative" as const },
    { label: "Pipeline (30d)", value: "$34K", change: "at 55% close", changeType: "positive" as const },
    { label: "Projected Position", value: "$96K", change: "+$14K vs today", changeType: "positive" as const },
  ]},
];

const PAYMENT_CHIPS = [
  "Who owes me money and how do I get paid faster?",
  "What payment method should I default to save time?",
  "How much cash will I have in 30 days?",
  "Which clients are chronically late payers?",
];

function Scene8_Payments() {
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
            <h3 className="text-[13px] font-semibold ii-text uppercase tracking-wide">Intuit Intelligence · DSO Reducer</h3>
            <p className="text-[14px] text-[#22262A] leading-relaxed mt-1.5">
              DSO rose <strong>50% over 6 months</strong> (18d → 27d). Three clients drive 72% of overdue: Morrison ($6.2K, 38d), Cho ($3.8K), Patel ($4.1K).
              Switching from check to ACH saves <strong>8 days per payment</strong>. Your projected 30-day cash position is <strong>$96K</strong> if AR is collected and pipeline closes at 55%.
            </p>
            <div className="flex gap-2 mt-3">
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md ii-gradient text-white hover:opacity-90">Send Reminders</button>
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md border border-[#D1D5DB] text-[#22262A] hover:bg-[#F3F4F6]">Switch Default to ACH</button>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E5E7EB] pt-3">
          <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Ask Intuit Intelligence</p>
          <div className="flex flex-wrap gap-2">
            {PAYMENT_CHIPS.map((chip) => (
              <button key={chip} onClick={() => openIntelligencePanel(chip)} className="text-[12px] text-[#0B7F5C] px-3 py-1.5 rounded-full border border-[#0B7F5C]/20 bg-[#E6F5F0]/50 hover:bg-[#E6F5F0] hover:border-[#0B7F5C]/40 transition-all">{chip}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Wells */}
      <div className="qbo-card p-5 space-y-4">
        <MetricWell title="Collection Health" metricSets={PAYMENT_METRICS_1} activeSet={m1} onSetChange={setM1} />
        <div className="border-b border-[#E5E7EB]" />
        <MetricWell title="Working Capital" metricSets={PAYMENT_METRICS_2} activeSet={m2} onSetChange={setM2} />
      </div>

      {/* DSO + Payment Method */}
      <div className="grid grid-cols-2 gap-4">
        <div className="qbo-card p-5">
          <h3 className="text-[13px] font-semibold text-[#22262A] mb-3">DSO Trend (6 Months)</h3>
          <LineChart data={[
            { label: "Oct", value: 18 }, { label: "Nov", value: 19 }, { label: "Dec", value: 21 },
            { label: "Jan", value: 23 }, { label: "Feb", value: 25 }, { label: "Mar", value: 27 },
          ]} color="#D52B1E" yLabel="Days Sales Outstanding" />
        </div>
        <div className="qbo-card p-5">
          <h3 className="text-[13px] font-semibold text-[#22262A] mb-3">Payment Method Speed</h3>
          <BarChart data={[
            { label: "Wire", value: 8, color: "#3CBFA4" },
            { label: "ACH", value: 12, color: "#108000" },
            { label: "Card", value: 15, color: "#0B7F5C" },
            { label: "Check", value: 20, color: "#E17000" },
          ]} height={160} />
          <p className="text-[10px] text-[#9CA3AF] mt-2 text-center">Avg days to payment</p>
        </div>
      </div>

      {/* Overdue Receivables */}
      <div className="qbo-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-semibold text-[#22262A]">Overdue Receivables</h3>
          <StatusBadge status="$14,100 overdue" variant="danger" />
        </div>
        <DataTable
          headers={["Client", "Amount", "Days Overdue", "Method", "History", "Prediction"]}
          rows={[
            ["Morrison", "$6,200", <StatusBadge key="s1" status="38 days" variant="danger" />, "Check", "Chronically late", <span key="p1" className="text-[#D52B1E] text-[10px] font-medium">Will pay in ~14d</span>],
            ["Cho", "$3,800", <StatusBadge key="s2" status="22 days" variant="warning" />, "Check", "Usually on time", <span key="p2" className="text-[#E17000] text-[10px] font-medium">Likely oversight</span>],
            ["Patel", "$4,100", <StatusBadge key="s3" status="19 days" variant="warning" />, "ACH", "First project", <span key="p3" className="text-[#0B7F5C] text-[10px] font-medium">No history</span>],
          ]}
        />
      </div>

      {/* Revenue Waterfall */}
      <div className="qbo-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[13px] font-semibold text-[#22262A]">Revenue Waterfall — Pipeline to Cash</h3>
          <span className="text-[9px] px-2 py-0.5 rounded bg-[#0B7F5C]/10 text-[#0B7F5C] font-bold">QBO EXCLUSIVE</span>
        </div>
        <div className="flex items-end gap-2 justify-around" style={{ height: 180 }}>
          {[
            { label: "Pipeline", value: 187, color: "#0B7F5C" },
            { label: "Proposals", value: 94, color: "#60A5FA" },
            { label: "Invoiced", value: 62, color: "#108000" },
            { label: "Collected", value: 48, color: "#065F46" },
            { label: "Outstanding", value: 14, color: "#E17000" },
          ].map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[11px] font-bold text-[#22262A]">${d.value}K</span>
              <div className="w-full max-w-[52px] rounded-t-[4px] relative overflow-hidden" style={{ height: (d.value / 187) * 140, backgroundColor: d.color }}>
                <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" style={{ height: "50%" }} />
              </div>
              <span className="text-[9px] text-[#9CA3AF] text-center mt-1">{d.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 p-2.5 bg-[#E6F5F0] rounded-lg">
          <p className="text-[11px] text-[#0B7F5C] font-medium">25.7% pipeline-to-cash conversion — $14K outstanding from 3 clients</p>
        </div>
      </div>

      {/* Stage Explorer */}
      <div className="qbo-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-md ii-gradient flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
          </div>
          <h3 className="text-[13px] font-semibold text-[#22262A]">Explore by Cash Flow Stage</h3>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { stage: "Invoicing", icon: "📄", color: "#0B7F5C", bg: "#E6F5F0", prompts: ["How fast am I invoicing after project milestones?", "Which projects have uninvoiced work?", "What's my auto-invoice rate vs manual?"] },
            { stage: "Collection", icon: "💰", color: "#108000", bg: "#F0FAF0", prompts: ["Who owes me money right now?", "What's the best reminder cadence?", "How much would early-pay discounts save me?"] },
            { stage: "Forecasting", icon: "📈", color: "#E17000", bg: "#FFF7ED", prompts: ["What's my 30-day cash forecast?", "How sensitive is my cash to deal slippage?", "What if Morrison doesn't pay for 60 days?"] },
            { stage: "Optimization", icon: "⚡", color: "#3CBFA4", bg: "#E6F5F0", prompts: ["How do I reduce DSO by 5 days?", "What's the ROI of switching to ACH?", "Should I require deposits for new clients?"] },
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
function CashFlowInner() {
  const searchParams = useSearchParams();
  const [activeScene, setActiveScene] = useState(7);

  useEffect(() => {
    const s = searchParams.get("scene");
    if (s) setActiveScene(Number(s));
  }, [searchParams]);

  const tabs = [
    { id: 7, label: "Project Margins" },
    { id: 8, label: "Payments & Waterfall" },
  ];

  const cashScenes = [7, 8];
  const currentScene = cashScenes.includes(activeScene) ? activeScene : 7;

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[20px] font-semibold text-[#22262A]">Cash flow</h1>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">{tabs.find((t) => t.id === currentScene)?.label || "Overview"}</p>
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

      {currentScene === 7 && <Scene7_Profitability />}
      {currentScene === 8 && <Scene8_Payments />}

      <SceneTabs active={activeScene} onChange={setActiveScene} />
    </div>
  );
}

export default function CashFlowPage() {
  return <Suspense><CashFlowInner /></Suspense>;
}
