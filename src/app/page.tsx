"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MetricCard } from "@/components/MetricCard";
import { BarChart } from "@/components/BarChart";
import { LineChart } from "@/components/LineChart";
import { DonutChart } from "@/components/DonutChart";
import { FunnelChart } from "@/components/FunnelChart";
import { DataTable } from "@/components/DataTable";
import { IntuitAssistCard } from "@/components/IntuitAssistCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ProgressBar } from "@/components/ProgressBar";
import { SceneTabs } from "@/components/SceneTabs";
import { DateRangeSelector } from "@/components/DateRangeSelector";
import { MetricWell } from "@/components/MetricWell";
import { TimeSeriesChart } from "@/components/TimeSeriesChart";
import { AutomatedCampaignChart } from "@/components/AutomatedCampaignChart";
import { ChannelROITable } from "@/components/ChannelROITable";
import { AttributionFunnel } from "@/components/AttributionFunnel";
import { L2CHealthScore } from "@/components/L2CHealthScore";
import { RevenueVelocity } from "@/components/RevenueVelocity";
import { CashConversion } from "@/components/CashConversion";
import { StageExplorer } from "@/components/StageExplorer";
import { CustomerHealth } from "@/components/CustomerHealth";
import { WorkingCapital } from "@/components/WorkingCapital";
import { RevenueLeakage } from "@/components/RevenueLeakage";
import { AIReportBuilder } from "@/components/AIReportBuilder";
import { LeadSourceQuality } from "@/components/LeadSourceQuality";
import { LeadVelocityAging } from "@/components/LeadVelocityAging";
import { LeadScoreDistribution } from "@/components/LeadScoreDistribution";
import { LeadStageExplorer } from "@/components/LeadStageExplorer";
import { TrueCAC } from "@/components/TrueCAC";
import { DaysToCashProfit } from "@/components/DaysToCashProfit";
import { CrossChannelJourney } from "@/components/CrossChannelJourney";
import { PaymentReliability } from "@/components/PaymentReliability";
import { AttributionStageExplorer } from "@/components/AttributionStageExplorer";
import { CampaignProfitability } from "@/components/CampaignProfitability";
import { CampaignCashTimeline } from "@/components/CampaignCashTimeline";
import { CampaignBudgetOptimizer } from "@/components/CampaignBudgetOptimizer";
import { CampaignStageExplorer } from "@/components/CampaignStageExplorer";

/* ── Metric data sets for the Data Well ── */
const BUSINESS_SETS = [
  { label: "Revenue Focus", metrics: [
    { label: "Campaign Revenue", value: "$142.6K", change: "+18% vs 30d", changeType: "positive" as const },
    { label: "Overall ROI", value: "4.2x", change: "+0.8x", changeType: "positive" as const },
    { label: "Net Profit", value: "$38,400", change: "+12%", changeType: "positive" as const },
    { label: "Customer LTV", value: "$8,240", change: "+6%", changeType: "positive" as const },
  ]},
  { label: "Deal Focus", metrics: [
    { label: "Avg Deal Size", value: "$31K", change: "+8%", changeType: "positive" as const },
    { label: "Gross Margin", value: "27%", change: "+2pp", changeType: "positive" as const },
    { label: "Revenue per Lead", value: "$2,264", change: "+14%", changeType: "positive" as const },
    { label: "Repeat Purchase", value: "34%", change: "-2pp", changeType: "negative" as const },
  ]},
];
const CAMPAIGN_SETS = [
  { label: "Core Metrics", metrics: [
    { label: "Impressions", value: "48.2K", change: "+22%", changeType: "positive" as const },
    { label: "Clicks", value: "2,140", change: "+15%", changeType: "positive" as const },
    { label: "CTR", value: "4.4%", change: "+0.3pp", changeType: "positive" as const },
    { label: "CPL", value: "$22", change: "-8%", changeType: "positive" as const },
  ]},
  { label: "Spend & Engagement", metrics: [
    { label: "CPC", value: "$1.84", change: "-5%", changeType: "positive" as const },
    { label: "Total Spend", value: "$4,200", change: "+10%", changeType: "negative" as const },
    { label: "Bounce Rate", value: "42%", change: "-3pp", changeType: "positive" as const },
    { label: "Engagement", value: "6.8%", change: "+1.2pp", changeType: "positive" as const },
  ]},
];
const FUNNEL_SETS = [
  { label: "Conversion Path", metrics: [
    { label: "Total Leads", value: "63", change: "+12", changeType: "positive" as const },
    { label: "MQLs", value: "41", change: "+8", changeType: "positive" as const },
    { label: "SQLs", value: "18", change: "+3", changeType: "positive" as const },
    { label: "Conv Rate", value: "15.2%", change: "+2.1pp", changeType: "positive" as const },
  ]},
  { label: "Pipeline Value", metrics: [
    { label: "Opportunities", value: "12", change: "+4", changeType: "positive" as const },
    { label: "Won Deals", value: "5", change: "+2", changeType: "positive" as const },
    { label: "Avg Days to Close", value: "14d", change: "-3d", changeType: "positive" as const },
    { label: "Pipeline Value", value: "$62K", change: "+18%", changeType: "positive" as const },
  ]},
];

/* ═══════════════════════════════════════
   Scene 1: Campaign & Audience Analytics
   ═══════════════════════════════════════ */
const CAMPAIGN_FOLLOWUP_CHIPS = [
  "Which campaign is most profitable after all costs?",
  "Show me automated flow ROI vs manual campaigns",
  "What's the real profit margin per channel?",
  "Which campaigns produce the best-paying clients?",
];

function Scene1_CampaignROI() {
  const [dateRange, setDateRange] = useState("last30");
  const [botFilter, setBotFilter] = useState(true);
  const [bizSet, setBizSet] = useState(0);
  const [campSet, setCampSet] = useState(0);
  const [funnelSet, setFunnelSet] = useState(0);
  const [activeChannels, setActiveChannels] = useState<Record<string, boolean>>({
    email: true, sms: true, whatsapp: true, googleAds: true, meta: true, tiktok: false, linkedin: false,
  });
  const [autoMetric, setAutoMetric] = useState("sendVolume");

  return (
    <div className="space-y-5 fade-in">
      {/* 1. Intuit Intelligence Banner */}
      <div className="qbo-card p-5" style={{ borderColor: "rgba(11,127,92,0.12)", boxShadow: "0 0 0 1px rgba(11,127,92,0.04), 0 2px 8px rgba(11,127,92,0.06)" }}>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg ii-gradient flex items-center justify-center shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
          </div>
          <div>
            <h3 className="text-[13px] font-semibold ii-text uppercase tracking-wide">Intuit Intelligence · Campaign Analyst</h3>
            <p className="text-[14px] text-[#22262A] leading-relaxed mt-1.5">
              Your Meta ad produced $38,400 revenue — but <strong>net profit is only $4,760</strong> after project costs and labor (1.8x ROI).
              WhatsApp automations earn <strong>$4,400 at 11.3x ROI</strong> with $0 ad spend. Email is 9.9x ROI.
              SMS has spent $2,400 over 6 months with <strong>zero cash collected</strong>.
            </p>
            <div className="flex gap-2 mt-3">
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md ii-gradient text-white hover:opacity-90">Optimize Budget</button>
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md border border-[#D1D5DB] text-[#22262A] hover:bg-[#F3F4F6]">View Profitability Report</button>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E5E7EB] pt-3">
          <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Ask Intuit Intelligence</p>
          <div className="flex flex-wrap gap-2">
            {CAMPAIGN_FOLLOWUP_CHIPS.map((chip) => (
              <button key={chip} onClick={() => openIntelligencePanel(chip)} className="text-[12px] text-[#0B7F5C] px-3 py-1.5 rounded-full border border-[#0B7F5C]/20 bg-[#E6F5F0]/50 hover:bg-[#E6F5F0] hover:border-[#0B7F5C]/40 transition-all">
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Date Range + Bot Filter */}
      <DateRangeSelector dateRange={dateRange} onDateRangeChange={setDateRange} botFilterEnabled={botFilter} onBotFilterToggle={setBotFilter} />

      {/* 3. Data Well — 3-Tier Metrics */}
      <div className="qbo-card p-5 space-y-4">
        <MetricWell title="Business Outcome Metrics" metricSets={BUSINESS_SETS} activeSet={bizSet} onSetChange={setBizSet} />
        <div className="border-b border-[#E5E7EB]" />
        <MetricWell title="Campaign Performance Metrics" metricSets={CAMPAIGN_SETS} activeSet={campSet} onSetChange={setCampSet} />
        <div className="border-b border-[#E5E7EB]" />
        <MetricWell title="Lead Funnel Metrics" metricSets={FUNNEL_SETS} activeSet={funnelSet} onSetChange={setFunnelSet} />
      </div>

      {/* 4. Time Series — Multi-Channel */}
      <TimeSeriesChart
        activeChannels={activeChannels}
        onToggleChannel={(k) => setActiveChannels(prev => ({ ...prev, [k]: !prev[k] }))}
      />

      {/* 5. True Campaign Profitability */}
      <CampaignProfitability />

      {/* 6. Campaign → Cash Timeline + Customer Quality */}
      <CampaignCashTimeline />

      {/* 7. Automated Campaign Performance */}
      <AutomatedCampaignChart activeMetric={autoMetric} onMetricChange={setAutoMetric} />

      {/* 8. AI Budget Optimizer */}
      <CampaignBudgetOptimizer />

      {/* 9. Channel ROI Table */}
      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#22262A] mb-3">Channel ROI Comparison</h3>
        <ChannelROITable />
      </div>

      {/* 10. Campaign Stage Explorer */}
      <CampaignStageExplorer onPromptClick={openIntelligencePanel} />

      {/* 11. AI Report Builder */}
      <AIReportBuilder />
    </div>
  );
}

/* ═══════════════════════════════════════
   Scene 2: Ad-to-Cash Attribution
   ═══════════════════════════════════════ */
/* ── Attribution metric data sets ── */
const ATTR_REVENUE_SETS = [
  { label: "Verified Revenue", metrics: [
    { label: "Total Verified Revenue", value: "$128.6K", change: "Ledger-matched", changeType: "positive" as const },
    { label: "Google ROAS", value: "$6.20", change: "per $1 spent", changeType: "positive" as const },
    { label: "Meta ROAS", value: "$4.80", change: "per $1 spent", changeType: "positive" as const },
    { label: "Verification Rate", value: "82%", change: "+6pp vs 30d", changeType: "positive" as const },
  ]},
  { label: "By Channel", metrics: [
    { label: "Google Revenue", value: "$42.8K", change: "+22%", changeType: "positive" as const },
    { label: "Meta Revenue", value: "$38.4K", change: "+18%", changeType: "positive" as const },
    { label: "Email Revenue", value: "$8.2K", change: "+4%", changeType: "positive" as const },
    { label: "Referral Revenue", value: "$39.2K", change: "+31%", changeType: "positive" as const },
  ]},
];
const ATTR_COST_SETS = [
  { label: "Full CAC", metrics: [
    { label: "True Avg CAC", value: "$340", change: "incl. sales + proposal", changeType: "negative" as const },
    { label: "Meta CPL", value: "$22", change: "Best CPL", changeType: "positive" as const },
    { label: "Google CPL", value: "$48", change: "Highest CPL", changeType: "negative" as const },
    { label: "Total Ad Spend", value: "$4,200", change: "+10% vs 30d", changeType: "negative" as const },
  ]},
  { label: "Efficiency", metrics: [
    { label: "CPC", value: "$1.84", change: "-5%", changeType: "positive" as const },
    { label: "CTR", value: "4.4%", change: "+0.3pp", changeType: "positive" as const },
    { label: "Proposal Cost", value: "$85", change: "per deal", changeType: "negative" as const },
    { label: "Sales Time/Lead", value: "1.5h", change: "-0.3h", changeType: "positive" as const },
  ]},
];
const ATTR_CASH_SETS = [
  { label: "Days to Cash", metrics: [
    { label: "Avg Days to Cash", value: "22d", change: "ad click → bank", changeType: "negative" as const },
    { label: "Google D2C", value: "14d", change: "Fastest paid", changeType: "positive" as const },
    { label: "Meta D2C", value: "26d", change: "Slowest paid", changeType: "negative" as const },
    { label: "Avg Deal Size", value: "$31K", change: "Google leads", changeType: "positive" as const },
  ]},
  { label: "Payment Quality", metrics: [
    { label: "On-Time Rate", value: "78%", change: "+4pp", changeType: "positive" as const },
    { label: "Dispute Rate", value: "8%", change: "-2pp", changeType: "positive" as const },
    { label: "AR Outstanding", value: "$14K", change: "3 clients", changeType: "negative" as const },
    { label: "Best LTV Channel", value: "Referral", change: "$86K / 2yr", changeType: "positive" as const },
  ]},
];

const ATTR_FOLLOWUP_CHIPS = [
  "Which channel produces the most profitable customers long-term?",
  "What's my true cost to acquire a paying customer?",
  "Show cross-channel journey for my best deals",
  "Which ad channel has the best payment reliability?",
];

function Scene2_Attribution() {
  const [revSet, setRevSet] = useState(0);
  const [costSet, setCostSet] = useState(0);
  const [cashSet, setCashSet] = useState(0);

  return (
    <div className="space-y-5 fade-in">
      {/* 1. Intuit Intelligence Banner */}
      <div className="qbo-card p-5" style={{ borderColor: "rgba(11,127,92,0.12)", boxShadow: "0 0 0 1px rgba(11,127,92,0.04), 0 2px 8px rgba(11,127,92,0.06)" }}>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg ii-gradient flex items-center justify-center shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
          </div>
          <div>
            <h3 className="text-[13px] font-semibold ii-text uppercase tracking-wide">Intuit Intelligence · Attribution Analyst</h3>
            <p className="text-[14px] text-[#22262A] leading-relaxed mt-1.5">
              Google Ads drives <strong>$6.20 in collected revenue</strong> per $1 — ledger-verified. But your true CAC is <strong>$493</strong> (not $48 CPL) when you factor in sales time + proposals.
              Referrals cost <strong>$82 true CAC</strong> with $86K 2-year LTV — 6x more efficient. Meta leads take <strong>40 days</strong> to become cash vs 18 for referrals.
            </p>
            <div className="flex gap-2 mt-3">
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md ii-gradient text-white hover:opacity-90">Optimize Channel Mix</button>
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md border border-[#D1D5DB] text-[#22262A] hover:bg-[#F3F4F6]">View Full Attribution</button>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E5E7EB] pt-3">
          <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Ask Intuit Intelligence</p>
          <div className="flex flex-wrap gap-2">
            {ATTR_FOLLOWUP_CHIPS.map((chip) => (
              <button key={chip} onClick={() => openIntelligencePanel(chip)} className="text-[12px] text-[#0B7F5C] px-3 py-1.5 rounded-full border border-[#0B7F5C]/20 bg-[#E6F5F0]/50 hover:bg-[#E6F5F0] hover:border-[#0B7F5C]/40 transition-all">
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Metric Data Well — 3 tiers */}
      <div className="qbo-card p-5 space-y-4">
        <MetricWell title="Attribution Metrics" metricSets={ATTR_REVENUE_SETS} activeSet={revSet} onSetChange={setRevSet} />
        <div className="border-b border-[#E5E7EB]" />
        <MetricWell title="True Cost Metrics" metricSets={ATTR_COST_SETS} activeSet={costSet} onSetChange={setCostSet} />
        <div className="border-b border-[#E5E7EB]" />
        <MetricWell title="Cash Impact Metrics" metricSets={ATTR_CASH_SETS} activeSet={cashSet} onSetChange={setCashSet} />
      </div>

      {/* 3. Attribution Funnel */}
      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#22262A] mb-4">Ad-to-Cash Attribution — Ledger Verified</h3>
        <AttributionFunnel />
      </div>

      {/* 4. True CAC Breakdown */}
      <TrueCAC />

      {/* 5. Days to Cash + Profit per Ad Dollar */}
      <DaysToCashProfit />

      {/* 6. Cross-Channel Journey */}
      <CrossChannelJourney />

      {/* 7. Payment Reliability */}
      <PaymentReliability />

      {/* 8. Revenue per $1 + Deal Size (existing, enhanced) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="qbo-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-semibold text-[#22262A]">Verified Revenue per $1 Ad Spend</h3>
            <span className="text-[9px] px-2 py-0.5 rounded bg-[#108000]/10 text-[#108000] font-bold">LEDGER VERIFIED</span>
          </div>
          <BarChart
            data={[
              { label: "Google", value: 6.2, color: "#EA4335" },
              { label: "Meta", value: 4.8, color: "#1877F2" },
              { label: "Email", value: 2.1, color: "#0B7F5C" },
              { label: "SMS", value: 0, color: "#D1D5DB" },
            ]}
            height={140}
          />
        </div>
        <div className="qbo-card p-5">
          <h3 className="text-[13px] font-semibold text-[#22262A] mb-4">Avg Deal Size by Channel</h3>
          <BarChart
            data={[
              { label: "Google", value: 31000, color: "#EA4335" },
              { label: "Referral", value: 24000, color: "#108000" },
              { label: "Meta", value: 18000, color: "#1877F2" },
              { label: "Email", value: 12000, color: "#0B7F5C" },
            ]}
            height={140}
          />
        </div>
      </div>

      {/* 9. Attribution Stage Explorer */}
      <AttributionStageExplorer onPromptClick={openIntelligencePanel} />

      {/* 10. AI Report Builder */}
      <AIReportBuilder />
    </div>
  );
}

/* ═══════════════════════════════════════
   Scene 3: Lead Funnel & Score Analytics
   ═══════════════════════════════════════ */
/* ── Lead Funnel metric data sets ── */
const LEAD_VOLUME_SETS = [
  { label: "Core Metrics", metrics: [
    { label: "Total Leads", value: "63", change: "+12 vs 30d", changeType: "positive" as const },
    { label: "MQLs", value: "41", change: "+8", changeType: "positive" as const },
    { label: "SQLs", value: "18", change: "+3", changeType: "positive" as const },
    { label: "Won Deals", value: "5", change: "+2", changeType: "positive" as const },
  ]},
  { label: "By Source", metrics: [
    { label: "Web Form", value: "12", change: "+4", changeType: "positive" as const },
    { label: "Google Ads", value: "6", change: "+1", changeType: "positive" as const },
    { label: "Meta Ads", value: "8", change: "+3", changeType: "positive" as const },
    { label: "Referrals", value: "3", change: "+1", changeType: "positive" as const },
  ]},
];
const LEAD_QUALITY_SETS = [
  { label: "Scoring", metrics: [
    { label: "Avg Lead Score", value: "72", change: "+4 pts", changeType: "positive" as const },
    { label: "Conv Rate", value: "15.2%", change: "+2.1pp", changeType: "positive" as const },
    { label: "Avg Response Time", value: "19h", change: "Target: <2h", changeType: "negative" as const },
    { label: "Biggest Drop-off", value: "62%", change: "Qual→Proposal", changeType: "negative" as const },
  ]},
  { label: "Engagement", metrics: [
    { label: "Email Open Rate", value: "38%", change: "+5pp", changeType: "positive" as const },
    { label: "Form Fill Rate", value: "12%", change: "+1.4pp", changeType: "positive" as const },
    { label: "Site Visits/Lead", value: "3.2", change: "+0.8", changeType: "positive" as const },
    { label: "Stale Leads", value: "11", change: ">14d inactive", changeType: "negative" as const },
  ]},
];
const LEAD_PIPELINE_SETS = [
  { label: "Revenue", metrics: [
    { label: "Pipeline Value", value: "$187K", change: "+$22K", changeType: "positive" as const },
    { label: "Revenue at Risk", value: "$41K", change: "7 stale leads", changeType: "negative" as const },
    { label: "Revenue/Lead", value: "$2,264", change: "+14%", changeType: "positive" as const },
    { label: "Avg Days to Close", value: "14d", change: "-3d", changeType: "positive" as const },
  ]},
  { label: "Forecasting", metrics: [
    { label: "30-Day Forecast", value: "$62K", change: "at 55% close rate", changeType: "positive" as const },
    { label: "Weighted Pipeline", value: "$94K", change: "stage-adjusted", changeType: "positive" as const },
    { label: "Lead Velocity", value: "+12%", change: "/month", changeType: "positive" as const },
    { label: "Target Gap", value: "$13K", change: "to $75K target", changeType: "negative" as const },
  ]},
];

const LEAD_FOLLOWUP_CHIPS = [
  "Why are qualified leads not converting?",
  "Which leads should I prioritize today?",
  "What's my lead response time vs competitors?",
  "Show me lead quality by source",
];

function Scene3_LeadFunnel() {
  const [volSet, setVolSet] = useState(0);
  const [qualSet, setQualSet] = useState(0);
  const [pipSet, setPipSet] = useState(0);

  return (
    <div className="space-y-5 fade-in">
      {/* 1. Intuit Intelligence Banner */}
      <div className="qbo-card p-5" style={{ borderColor: "rgba(11,127,92,0.12)", boxShadow: "0 0 0 1px rgba(11,127,92,0.04), 0 2px 8px rgba(11,127,92,0.06)" }}>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg ii-gradient flex items-center justify-center shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
          </div>
          <div>
            <h3 className="text-[13px] font-semibold ii-text uppercase tracking-wide">Intuit Intelligence · Lead Analyst</h3>
            <p className="text-[14px] text-[#22262A] leading-relaxed mt-1.5">
              Your Qualified→Proposal stage has a <strong>62% drop-off</strong> — the largest bottleneck.
              7 stale leads with scores above 75 represent <strong>$41K at risk</strong>. Leads contacted within 2 hours convert at 34% vs 11% next-day.
              Your lead velocity is <strong>up 12%/month</strong> — the pipeline is growing but leaking at qualification.
            </p>
            <div className="flex gap-2 mt-3">
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md ii-gradient text-white hover:opacity-90">Contact Top Leads</button>
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md border border-[#D1D5DB] text-[#22262A] hover:bg-[#F3F4F6]">Set Stage Alerts</button>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E5E7EB] pt-3">
          <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Ask Intuit Intelligence</p>
          <div className="flex flex-wrap gap-2">
            {LEAD_FOLLOWUP_CHIPS.map((chip) => (
              <button key={chip} onClick={() => openIntelligencePanel(chip)} className="text-[12px] text-[#0B7F5C] px-3 py-1.5 rounded-full border border-[#0B7F5C]/20 bg-[#E6F5F0]/50 hover:bg-[#E6F5F0] hover:border-[#0B7F5C]/40 transition-all">
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Metric Data Well — 3 tiers */}
      <div className="qbo-card p-5 space-y-4">
        <MetricWell title="Lead Volume Metrics" metricSets={LEAD_VOLUME_SETS} activeSet={volSet} onSetChange={setVolSet} />
        <div className="border-b border-[#E5E7EB]" />
        <MetricWell title="Lead Quality Metrics" metricSets={LEAD_QUALITY_SETS} activeSet={qualSet} onSetChange={setQualSet} />
        <div className="border-b border-[#E5E7EB]" />
        <MetricWell title="Pipeline Impact Metrics" metricSets={LEAD_PIPELINE_SETS} activeSet={pipSet} onSetChange={setPipSet} />
      </div>

      {/* 3. Lead Funnel */}
      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#22262A] mb-4">Lead Funnel — Stage Breakdown</h3>
        <FunnelChart
          stages={[
            { label: "New Leads", value: 34, color: "#0B7F5C", conversion: "100%" },
            { label: "Contacted", value: 28, color: "#60A5FA", conversion: "82%" },
            { label: "Qualified", value: 19, color: "#108000", conversion: "56%" },
            { label: "Proposal", value: 8, color: "#E17000", conversion: "24%" },
            { label: "Won", value: 5, color: "#065F46", conversion: "15%" },
          ]}
        />
        <div className="mt-3 p-2.5 bg-[#FFF7ED] rounded-lg">
          <p className="text-[11px] text-[#E17000] font-medium">⚠ Biggest drop: Qualified → Proposal (62%) — 7 leads stalled &gt;14 days</p>
        </div>
      </div>

      {/* 4. Lead Source Quality Matrix */}
      <LeadSourceQuality />

      {/* 5. Lead Velocity & Aging */}
      <LeadVelocityAging />

      {/* 6. Lead Score Distribution */}
      <LeadScoreDistribution />

      {/* 7. Stale High-Score Leads Table */}
      <div className="qbo-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-semibold text-[#22262A]">Stale High-Score Leads</h3>
          <StatusBadge status="7 leads · $41K at risk" variant="danger" />
        </div>
        <DataTable
          headers={["Lead", "Source", "Score", "Days Stale", "Est. Value"]}
          rows={[
            ["Jennifer Thompson", "Web Form", <ProgressBar key="p1" value={92} color="#108000" />, <StatusBadge key="s1" status="18 days" variant="danger" />, "$8,200"],
            ["Robert Kim", "Web Form", <ProgressBar key="p2" value={88} color="#108000" />, <StatusBadge key="s2" status="16 days" variant="danger" />, "$6,800"],
            ["Amanda Chen", "Meta Ad", <ProgressBar key="p3" value={82} color="#108000" />, <StatusBadge key="s3" status="15 days" variant="warning" />, "$7,500"],
          ]}
        />
      </div>

      {/* 8. Explore by Lead Stage */}
      <LeadStageExplorer onPromptClick={openIntelligencePanel} />

      {/* 9. AI Report Builder */}
      <AIReportBuilder />
    </div>
  );
}

/* ═══════════════════════════════════════
   Scene 9: L2C End-to-End Intelligence
   ═══════════════════════════════════════ */
function openIntelligencePanel(question: string) {
  window.dispatchEvent(new CustomEvent("open-intuit-intelligence", { detail: question }));
}

const L2C_FOLLOWUP_CHIPS = [
  "Which channel has the best conversion path?",
  "Show pipeline forecast for next 30 days",
  "Why is churn risk increasing?",
  "What's driving the 62% funnel drop-off?",
];

function Scene9_L2CFunnel() {
  return (
    <div className="space-y-5 fade-in">
      {/* Intuit Intelligence Banner + Follow-up Chips */}
      <div className="qbo-card p-5" style={{ borderColor: "rgba(11,127,92,0.12)", boxShadow: "0 0 0 1px rgba(11,127,92,0.04), 0 2px 8px rgba(11,127,92,0.06)" }}>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg ii-gradient flex items-center justify-center shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
          <div>
            <h3 className="text-[13px] font-semibold ii-text uppercase tracking-wide">Intuit Intelligence · L2C Analyst</h3>
            <p className="text-[14px] text-[#22262A] leading-relaxed mt-1.5">
              Your L2C health score is <strong>72/100</strong>. Revenue velocity is slowing — $187K in pipeline but only $48K collected last 30 days.
              You have <strong>$4,200 in unbilled scope changes</strong> and <strong>$14K overdue AR</strong>. Three actions can improve your cash position by $18K.
            </p>
            <div className="flex gap-2 mt-3">
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md ii-gradient text-white hover:opacity-90">View Full Analysis</button>
              <button className="text-[12px] font-medium px-3 py-1.5 rounded-md border border-[#D1D5DB] text-[#22262A] hover:bg-[#F3F4F6]">Export Report</button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5E7EB] pt-3">
          <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Ask Intuit Intelligence</p>
          <div className="flex flex-wrap gap-2">
            {L2C_FOLLOWUP_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => openIntelligencePanel(chip)}
                className="text-[12px] text-[#0B7F5C] px-3 py-1.5 rounded-full border border-[#0B7F5C]/20 bg-[#E6F5F0]/50 hover:bg-[#E6F5F0] hover:border-[#0B7F5C]/40 transition-all"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* L2C Health Score */}
      <L2CHealthScore />

      {/* Revenue Velocity + Cash Conversion side by side */}
      <div className="grid grid-cols-2 gap-4">
        <RevenueVelocity />
        <CashConversion />
      </div>

      {/* AI-First Stage Explorer */}
      <StageExplorer onPromptClick={openIntelligencePanel} />

      {/* E2E Funnel */}
      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#22262A] mb-4">L2C Funnel — Campaign to Cash Collected</h3>
        <FunnelChart
          stages={[
            { label: "Impressions", value: 280, color: "#93C5FD", conversion: "—" },
            { label: "Leads", value: 84, color: "#0B7F5C", conversion: "30%" },
            { label: "Opportunities", value: 41, color: "#60A5FA", conversion: "49%" },
            { label: "Proposals", value: 22, color: "#108000", conversion: "54%" },
            { label: "Signed", value: 14, color: "#0D6B3F", conversion: "64%" },
            { label: "Invoiced", value: 12, color: "#E17000", conversion: "86%" },
            { label: "Cash Collected", value: 10, color: "#9D174D", conversion: "83%" },
          ]}
        />
        <div className="mt-3 p-2.5 bg-[#E6F5F0] rounded-lg">
          <p className="text-[11px] text-[#0B7F5C] font-medium">End-to-end: 3.6% conversion · Ledger-verified at every stage</p>
        </div>
      </div>

      {/* Customer Health + Working Capital */}
      <div className="grid grid-cols-2 gap-4">
        <CustomerHealth />
        <WorkingCapital />
      </div>

      {/* Revenue Leakage */}
      <RevenueLeakage />

      {/* AI Report Builder */}
      <AIReportBuilder />
    </div>
  );
}

/* ═══════════════════════════════════════
   Dashboard Page Shell
   ═══════════════════════════════════════ */
function DashboardInner() {
  const searchParams = useSearchParams();
  const [activeScene, setActiveScene] = useState(9);

  useEffect(() => {
    const s = searchParams.get("scene");
    if (s) setActiveScene(Number(s));
  }, [searchParams]);

  const tabs = [
    { id: 9, label: "L2C Intelligence" },
    { id: 3, label: "Lead Funnel" },
    { id: 2, label: "Ad Attribution" },
    { id: 1, label: "Campaign ROI" },
  ];

  const dashboardScenes = [9, 3, 2, 1];
  const currentScene = dashboardScenes.includes(activeScene) ? activeScene : 9;

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[20px] font-semibold text-[#22262A]">Dashboard</h1>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">
            {tabs.find((t) => t.id === currentScene)?.label || "Overview"}
          </p>
        </div>
        <select className="text-[12px] border border-[#D1D5DB] rounded-md px-3 py-1.5 bg-white text-[#6B7280]">
          <option>This Quarter</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>

      <div className="flex gap-1 mb-6 bg-[#ECEEF2] rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveScene(tab.id)}
            className={`qbo-tab ${currentScene === tab.id ? "qbo-tab-active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {currentScene === 1 && <Scene1_CampaignROI />}
      {currentScene === 2 && <Scene2_Attribution />}
      {currentScene === 3 && <Scene3_LeadFunnel />}
      {currentScene === 9 && <Scene9_L2CFunnel />}

      <SceneTabs active={activeScene} onChange={setActiveScene} />
    </div>
  );
}

export default function DashboardPage() {
  return <Suspense><DashboardInner /></Suspense>;
}
