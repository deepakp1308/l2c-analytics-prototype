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
      {/* AI Insight Banner */}
      <IntuitAssistCard
        title="Intuit Intelligence · Campaign Analyst"
        message={`Your Meta ad produced $38,400 from 12 leads at $22 CPL — best channel this quarter. WhatsApp has the highest ROI at 11.3x. SMS generated 47 clicks but 0 conversions.\n\n➡ Reallocate $400/mo SMS budget to Meta (+30%). Shift WhatsApp from manual to automated flows.`}
        actions={[{ label: "Reallocate Budget", primary: true }, { label: "View Full Analysis" }]}
      />

      {/* Section 1: Date Range + Bot Filter */}
      <DateRangeSelector dateRange={dateRange} onDateRangeChange={setDateRange} botFilterEnabled={botFilter} onBotFilterToggle={setBotFilter} />

      {/* Section 2: Data Well — 3-Tier Metrics */}
      <div className="qbo-card p-5 space-y-4">
        <MetricWell title="Business Outcome Metrics" metricSets={BUSINESS_SETS} activeSet={bizSet} onSetChange={setBizSet} />
        <div className="border-b border-[#E8E8E8]" />
        <MetricWell title="Campaign Performance Metrics" metricSets={CAMPAIGN_SETS} activeSet={campSet} onSetChange={setCampSet} />
        <div className="border-b border-[#E8E8E8]" />
        <MetricWell title="Lead Funnel Metrics" metricSets={FUNNEL_SETS} activeSet={funnelSet} onSetChange={setFunnelSet} />
      </div>

      {/* Section 3: Time Series — Multi-Channel */}
      <TimeSeriesChart
        activeChannels={activeChannels}
        onToggleChannel={(k) => setActiveChannels(prev => ({ ...prev, [k]: !prev[k] }))}
      />

      {/* Section 4: Automated Campaign Performance */}
      <AutomatedCampaignChart activeMetric={autoMetric} onMetricChange={setAutoMetric} />

      {/* Section 5: Channel ROI Table */}
      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#0D333F] mb-3">Channel ROI Comparison</h3>
        <ChannelROITable />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   Scene 2: Ad-to-Cash Attribution
   ═══════════════════════════════════════ */
function Scene2_Attribution() {
  return (
    <div className="space-y-5 fade-in">
      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Google ROAS" value="$6.20" subtitle="per $1 spent" change="Best channel" changeType="positive" />
        <MetricCard label="Meta ROAS" value="$4.80" subtitle="per $1 spent" />
        <MetricCard label="Google Avg Deal" value="$31K" change="vs $18K Meta" changeType="positive" />
        <MetricCard label="Total Verified Revenue" value="$128,600" subtitle="Ledger-matched" />
      </div>

      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#0D333F] mb-4">Ad-to-Cash Attribution — Ledger Verified</h3>
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2">
          {[
            { label: "Ad Impression", value: "2,840", color: "#93C5FD" },
            { label: "Ad Click", value: "312", color: "#055393" },
            { label: "Lead", value: "84", color: "#4A90D9" },
            { label: "Proposal", value: "22", color: "#108000" },
            { label: "Signed", value: "14", color: "#0D6B3F" },
            { label: "Invoiced", value: "12", color: "#E17000" },
            { label: "Cash Received", value: "$128.6K", color: "#065F46" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-1 shrink-0">
              <div className="text-center">
                <div className="w-[72px] h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: s.color + "18" }}>
                  <span className="text-[11px] font-bold" style={{ color: s.color }}>{s.value}</span>
                </div>
                <p className="text-[9px] text-[#8C8C8C] mt-1 leading-tight">{s.label}</p>
              </div>
              {i < 6 && <span className="text-[#D1D5DB] text-sm mx-0.5">→</span>}
            </div>
          ))}
        </div>
        <div className="mt-3 p-2.5 bg-[#F0FAF0] rounded-lg flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#108000"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
          <p className="text-[11px] text-[#065F46] font-medium">$128,600 verified against QuickBooks General Ledger — to the penny</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="qbo-card p-5">
          <h3 className="text-[13px] font-semibold text-[#0D333F] mb-4">Revenue per $1 Ad Spend</h3>
          <BarChart
            data={[
              { label: "Google", value: 6.2, color: "#EA4335" },
              { label: "Meta", value: 4.8, color: "#1877F2" },
              { label: "Email", value: 2.1, color: "#108000" },
              { label: "SMS", value: 0, color: "#D1D5DB" },
            ]}
            height={160}
          />
        </div>
        <div className="qbo-card p-5">
          <h3 className="text-[13px] font-semibold text-[#0D333F] mb-4">Avg Deal Size by Channel</h3>
          <BarChart
            data={[
              { label: "Google", value: 31000, color: "#EA4335" },
              { label: "Referral", value: 24000, color: "#0097A9" },
              { label: "Meta", value: 18000, color: "#1877F2" },
              { label: "Email", value: 12000, color: "#108000" },
            ]}
            height={160}
          />
        </div>
      </div>

      <IntuitAssistCard
        title="Intuit Intelligence · Prospecting Analyst"
        message={`Google Ads drives $6.20 in collected revenue per $1 vs $4.80 for Meta. Google leads are pricier ($48 CPL) but sign $31K avg deals and pay in 14 days vs 26. For projects over $25K, Google is most profitable.\n\n➡ Increase Google Ads budget for premium renovation services.`}
        actions={[{ label: "Increase Google Budget", primary: true }, { label: "Full Report" }]}
      />
    </div>
  );
}

/* ═══════════════════════════════════════
   Scene 3: Lead Funnel & Score Analytics
   ═══════════════════════════════════════ */
function Scene3_LeadFunnel() {
  return (
    <div className="space-y-5 fade-in">
      <IntuitAssistCard
        title="Intuit Intelligence · Leak Doctor"
        message={`Qualified-to-Proposal has a 62% drop-off — your largest bottleneck. 7 of 11 stale leads are from website forms with scores above 75. These are warm but unworked.\n\nEstimated revenue at risk: $41,000.\n\n➡ Contact the 3 highest-value leads today.`}
        actions={[{ label: "Contact Top 3", primary: true }, { label: "Set Stage Alerts" }]}
      />

      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Total Leads" value="34" subtitle="in pipeline" />
        <MetricCard label="Stale Leads" value="11" subtitle=">14 days inactive" change="Action needed" changeType="negative" />
        <MetricCard label="Revenue at Risk" value="$41K" change="7 high-score leads" changeType="negative" />
        <MetricCard label="Biggest Drop-off" value="62%" subtitle="Qualified → Proposal" change="Bottleneck" changeType="negative" />
      </div>

      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#0D333F] mb-4">Lead Funnel — Stage Breakdown</h3>
        <FunnelChart
          stages={[
            { label: "New Leads", value: 34, color: "#055393", conversion: "100%" },
            { label: "Contacted", value: 28, color: "#4A90D9", conversion: "82%" },
            { label: "Qualified", value: 19, color: "#108000", conversion: "56%" },
            { label: "Proposal", value: 8, color: "#E17000", conversion: "24%" },
            { label: "Won", value: 5, color: "#065F46", conversion: "15%" },
          ]}
        />
      </div>

      <div className="qbo-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-semibold text-[#0D333F]">Stale High-Score Leads</h3>
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
    </div>
  );
}

/* ═══════════════════════════════════════
   Scene 9: L2C End-to-End Intelligence
   ═══════════════════════════════════════ */
function Scene9_L2CFunnel() {
  return (
    <div className="space-y-5 fade-in">
      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="E2E Conversion" value="3.6%" subtitle="Campaign → Cash" />
        <MetricCard label="Best Path" value="11.2%" subtitle="Meta→Video→Premium" change="3.1x avg" changeType="positive" />
        <MetricCard label="Top Client LTV" value="$112K" subtitle="The Andersons" />
        <MetricCard label="Churn Risk" value="Moderate" subtitle="Rising — 62d inactive" change="Act now" changeType="negative" />
      </div>

      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#0D333F] mb-4">L2C Funnel — Campaign to Cash Collected</h3>
        <FunnelChart
          stages={[
            { label: "Impressions", value: 280, color: "#93C5FD", conversion: "—" },
            { label: "Leads", value: 84, color: "#055393", conversion: "30%" },
            { label: "Opportunities", value: 41, color: "#4A90D9", conversion: "49%" },
            { label: "Proposals", value: 22, color: "#108000", conversion: "54%" },
            { label: "Signed", value: 14, color: "#0D6B3F", conversion: "64%" },
            { label: "Invoiced", value: 12, color: "#E17000", conversion: "86%" },
            { label: "Cash Collected", value: 10, color: "#9D174D", conversion: "83%" },
          ]}
        />
        <div className="mt-3 p-2.5 bg-[#F5F3FF] rounded-lg">
          <p className="text-[11px] text-[#6C5CE7] font-medium">End-to-end: 3.6% conversion · Ledger-verified at every stage</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="qbo-card p-5">
          <h3 className="text-[13px] font-semibold text-[#0D333F] mb-3">Customer Profile — The Andersons</h3>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div><p className="text-[10px] text-[#8C8C8C] uppercase">Revenue</p><p className="text-lg font-bold text-[#0D333F]">$67K</p></div>
            <div><p className="text-[10px] text-[#8C8C8C] uppercase">Predicted LTV</p><p className="text-lg font-bold intuit-assist-text">$112K</p></div>
            <div><p className="text-[10px] text-[#8C8C8C] uppercase">Engagement</p><p className="text-lg font-bold text-[#E87040]">Declining</p></div>
          </div>
          <LineChart data={[{ label: "Aug", value: 12 }, { label: "Sep", value: 10 }, { label: "Oct", value: 8 }, { label: "Nov", value: 5 }, { label: "Dec", value: 3 }, { label: "Jan", value: 1 }]} color="#E17000" height={100} />
          <ProgressBar value={65} color="#E17000" label="Churn Risk" />
        </div>
        <div className="qbo-card p-5">
          <h3 className="text-[13px] font-semibold text-[#0D333F] mb-3">Weekly Report Builder</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Pipeline Forecast", value: "$62K" },
              { label: "Funnel Conv Rate", value: "3.6%" },
              { label: "DSO Trend", value: "27 days" },
              { label: "Avg Margin", value: "18%" },
            ].map((m) => (
              <div key={m.label} className="p-2.5 bg-[#F4F4EF] rounded-lg">
                <p className="text-sm font-bold text-[#0D333F]">{m.value}</p>
                <p className="text-[9px] text-[#8C8C8C]">{m.label}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <button className="text-[12px] px-3 py-1.5 bg-[#2CA01C] text-white rounded-md font-medium">Schedule</button>
            <button className="text-[12px] px-3 py-1.5 border border-[#BABEC5] rounded-md font-medium text-[#0D333F]">Export PDF</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <IntuitAssistCard
          title="Intuit Intelligence · Pathfinder"
          message={`Highest-converting path: Meta ad → web form → video meeting within 48h → Premium proposal → signed in 4 days. This path converts at 11.2% vs 3.6% average.\n\n➡ Build this into your default workflow.`}
          actions={[{ label: "Build Workflow", primary: true }]}
        />
        <IntuitAssistCard
          title="Intuit Intelligence · Customer Intelligence"
          message={`The Andersons (top-5 by LTV: $112K) haven't engaged in 62 days. Their re-engagement cycle is 90 days. Seasonal pattern suggests outdoor project.\n\n➡ Reach out this week before the window closes.`}
          actions={[{ label: "Send Outreach", primary: true }]}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   Dashboard Page Shell
   ═══════════════════════════════════════ */
function DashboardInner() {
  const searchParams = useSearchParams();
  const [activeScene, setActiveScene] = useState(1);

  useEffect(() => {
    const s = searchParams.get("scene");
    if (s) setActiveScene(Number(s));
  }, [searchParams]);

  const tabs = [
    { id: 1, label: "Campaign ROI" },
    { id: 2, label: "Ad Attribution" },
    { id: 3, label: "Lead Funnel" },
    { id: 9, label: "L2C Intelligence" },
  ];

  const dashboardScenes = [1, 2, 3, 9];
  const currentScene = dashboardScenes.includes(activeScene) ? activeScene : 1;

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[20px] font-semibold text-[#0D333F]">Dashboard</h1>
          <p className="text-[12px] text-[#8C8C8C] mt-0.5">
            {tabs.find((t) => t.id === currentScene)?.label || "Overview"}
          </p>
        </div>
        <select className="text-[12px] border border-[#BABEC5] rounded-md px-3 py-1.5 bg-white text-[#6B6C72]">
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
