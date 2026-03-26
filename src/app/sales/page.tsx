"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MetricCard } from "@/components/MetricCard";
import { BarChart } from "@/components/BarChart";
import { DonutChart } from "@/components/DonutChart";
import { DataTable } from "@/components/DataTable";
import { IntuitAssistCard } from "@/components/IntuitAssistCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ProgressBar } from "@/components/ProgressBar";
import { SceneTabs } from "@/components/SceneTabs";

function Scene4_Pipeline() {
  return (
    <div className="space-y-5 fade-in">
      <IntuitAssistCard
        title="Intuit Assist · Pipeline Pulse"
        message={`Henderson ($32K) has been in "Proposal Sent" for 18 days — avg is 6. Park ($14K) cancelled twice. 30-day forecast: $62K vs $75K target (gap: $13K).\n\n➡ Follow up Henderson today; reschedule Park this week.`}
        actions={[{ label: "Follow Up Henderson", primary: true }, { label: "Reschedule Park" }]}
      />

      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Active Deals" value="9" subtitle="$187K total pipeline" />
        <MetricCard label="30-Day Forecast" value="$62K" change="$13K gap to $75K target" changeType="negative" />
        <MetricCard label="Close Rate (Referral)" value="61%" change="vs 33% cold" changeType="positive" />
        <MetricCard label="Avg Meetings to Close" value="2.4" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="qbo-card p-5">
          <h3 className="text-[13px] font-semibold text-[#212B36] mb-4">Pipeline by Stage</h3>
          <BarChart
            data={[
              { label: "Discovery", value: 42000, color: "#0077C5" },
              { label: "Proposal", value: 68000, color: "#2CA01C" },
              { label: "Negotiation", value: 45000, color: "#E87040" },
              { label: "Closing", value: 32000, color: "#065F46" },
            ]}
            height={180}
          />
        </div>
        <div className="qbo-card p-5">
          <h3 className="text-[13px] font-semibold text-[#212B36] mb-4">Win/Loss Analysis (90 Days)</h3>
          <DonutChart
            segments={[
              { label: "Won", value: 14, color: "#2CA01C" },
              { label: "No Decision", value: 8, color: "#D1D5DB" },
              { label: "Competitor", value: 3, color: "#D13B3B" },
              { label: "Budget", value: 2, color: "#E87040" },
            ]}
            centerValue="14"
            centerLabel="Won"
          />
        </div>
      </div>

      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#212B36] mb-3">Deals Needing Attention</h3>
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

      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#212B36] mb-4">Meeting Format → Deal Progression Rate</h3>
        <BarChart
          data={[
            { label: "Video + Visit", value: 78, color: "#2CA01C" },
            { label: "Video Only", value: 68, color: "#0077C5" },
            { label: "Phone", value: 31, color: "#E87040" },
            { label: "Email", value: 12, color: "#D1D5DB" },
          ]}
          height={150}
        />
      </div>

      <IntuitAssistCard
        title="Intuit Assist · Calendar Filler"
        message={`Video + site visit closes 2.4x faster. 3 early-stage deals need site visits. Park deal had 3 meetings, no progression — historically these don't close.\n\n➡ Schedule Thompson & Reyes visits. Consider close-or-kill for Park.`}
        actions={[{ label: "Schedule Visits", primary: true }, { label: "Switch to Video" }]}
      />
    </div>
  );
}

function Scene5_Proposals() {
  return (
    <div className="space-y-5 fade-in">
      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Proposals (90d)" value="40" />
        <MetricCard label="Premium Sign Rate" value="54%" change="vs 29% Basic" changeType="positive" />
        <MetricCard label="Best Send Day" value="Tue/Wed" subtitle="2 days faster" />
        <MetricCard label="48h Abandon" value="80%" subtitle="if unviewed" change="Critical" changeType="negative" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="qbo-card p-5">
          <h3 className="text-[13px] font-semibold text-[#212B36] mb-4">Template Sign Rate</h3>
          <BarChart
            data={[
              { label: "Premium", value: 54, color: "#2CA01C" },
              { label: "Standard", value: 38, color: "#0077C5" },
              { label: "Basic", value: 29, color: "#D1D5DB" },
            ]}
            height={150}
          />
          <p className="text-[10px] text-[#9CA3AF] mt-2 text-center">Sign rate %</p>
        </div>
        <div className="qbo-card p-5">
          <h3 className="text-[13px] font-semibold text-[#212B36] mb-4">Days to Sign by Send Day</h3>
          <BarChart
            data={[
              { label: "Mon", value: 6, color: "#D1D5DB" },
              { label: "Tue", value: 3, color: "#2CA01C" },
              { label: "Wed", value: 3.5, color: "#2CA01C" },
              { label: "Thu", value: 5, color: "#0077C5" },
              { label: "Fri", value: 8, color: "#E87040" },
            ]}
            height={150}
          />
        </div>
      </div>

      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#212B36] mb-3">Active Proposals</h3>
        <DataTable
          headers={["Proposal", "Value", "Template", "Sent", "Views", "Status"]}
          rows={[
            ["Henderson Kitchen", "$32,000", "Premium", "14d ago", "3 views", <StatusBadge key="s1" status="Viewed — Unsigned" variant="warning" />],
            ["Reyes Outdoor", "$22,000", "Premium", "3d ago", "1 view", <StatusBadge key="s2" status="Recently Viewed" variant="info" />],
            ["Liu Master Suite", "$18,000", "Standard", "6d ago", "0 views", <StatusBadge key="s3" status="Unopened" variant="danger" />],
          ]}
        />
      </div>

      <IntuitAssistCard
        title="Intuit Assist · Quote Whisperer"
        message={`Use Premium Package — 1.9x better for $20K+ projects. Send today (Tuesday) for fastest sign time. Henderson was viewed 3x yesterday but unsigned — they're comparing options.\n\n➡ Follow up on Henderson with a limited-time incentive.`}
        actions={[{ label: "Send Premium Proposal", primary: true }, { label: "Follow Up Henderson" }]}
      />
    </div>
  );
}

function Scene6_ContractToCash() {
  return (
    <div className="space-y-5 fade-in">
      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Signed→Invoice Gap" value="11 days" change="Target: 2 days" changeType="negative" />
        <MetricCard label="Invoice→Payment" value="22 days" />
        <MetricCard label="Total Cycle" value="33 days" subtitle="signed to cash" />
        <MetricCard label="Cash Acceleration" value="$18K/yr" subtitle="if gap → 2 days" change="Opportunity" changeType="positive" />
      </div>

      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#212B36] mb-4">Contract-to-Cash Pipeline</h3>
        <div className="space-y-3">
          {[
            { stage: "Signed", count: 3, value: "$64,000", color: "#0077C5", pct: 100 },
            { stage: "Invoiced", count: 2, value: "$32,000", color: "#2CA01C", pct: 50 },
            { stage: "Paid", count: 1, value: "$14,000", color: "#065F46", pct: 22 },
          ].map((s) => (
            <div key={s.stage}>
              <div className="flex justify-between mb-1">
                <span className="text-[12px] font-medium text-[#212B36]">{s.stage}</span>
                <span className="text-[11px] text-[#9CA3AF]">{s.count} deals · {s.value}</span>
              </div>
              <ProgressBar value={s.pct} color={s.color} />
            </div>
          ))}
        </div>
      </div>

      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#212B36] mb-3">Post-Signature Deals</h3>
        <DataTable
          headers={["Deal", "Value", "Signed", "Invoiced", "Paid", "Action"]}
          rows={[
            ["Henderson Kitchen", "$32K", <StatusBadge key="s1" status="Just Now" variant="success" />, <StatusBadge key="i1" status="Not Yet" variant="warning" />, "—", <button key="b1" className="text-[11px] intuit-assist-gradient text-white px-2 py-1 rounded font-medium">Invoice Now →</button>],
            ["Reyes Outdoor", "$22K", "12d ago", "8d ago", "—", <StatusBadge key="s2" status="Awaiting Payment" variant="info" />],
            ["Chen Bathroom", "$14K", "28d ago", "22d ago", "6d ago", <StatusBadge key="s3" status="Paid" variant="success" />],
          ]}
        />
      </div>

      <div className="flex gap-0 qbo-card overflow-hidden">
        {[
          { label: "Signed → Invoiced", value: "11 days", color: "#0077C5" },
          { label: "Invoiced → Paid", value: "22 days", color: "#E87040" },
          { label: "Total Cycle", value: "33 days", color: "#065F46" },
        ].map((s, i) => (
          <div key={i} className="flex-1 text-center p-4 border-r border-[#E5E7EB] last:border-r-0">
            <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-[#9CA3AF]">{s.label}</p>
          </div>
        ))}
      </div>

      <IntuitAssistCard
        title="Intuit Assist · Cash Accelerator"
        message={`Signed-to-invoice gap averages 11 days — that's 11 days of cash left on the table every deal. Henderson was just signed for $32K.\n\n➡ Send the deposit invoice now. Reducing this gap to 2 days = $18,000/yr faster collections.`}
        actions={[{ label: "Generate Invoice", primary: true }, { label: "Set Auto-Invoice" }]}
      />
    </div>
  );
}

export default function SalesPage() {
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
          <h1 className="text-[20px] font-semibold text-[#212B36]">Sales</h1>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">
            {tabs.find((t) => t.id === currentScene)?.label || "Pipeline"}
          </p>
        </div>
        <select className="text-[12px] border border-[#E5E7EB] rounded-md px-3 py-1.5 bg-white text-[#6B7280]">
          <option>This Quarter</option>
          <option>Last 30 Days</option>
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

      {currentScene === 4 && <Scene4_Pipeline />}
      {currentScene === 5 && <Scene5_Proposals />}
      {currentScene === 6 && <Scene6_ContractToCash />}

      <SceneTabs active={activeScene} onChange={setActiveScene} />
    </div>
  );
}
