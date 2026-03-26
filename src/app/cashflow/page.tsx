"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MetricCard } from "@/components/MetricCard";
import { BarChart } from "@/components/BarChart";
import { LineChart } from "@/components/LineChart";
import { DataTable } from "@/components/DataTable";
import { IntuitAssistCard } from "@/components/IntuitAssistCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ProgressBar } from "@/components/ProgressBar";
import { SceneTabs } from "@/components/SceneTabs";

function Scene7_Profitability() {
  return (
    <div className="space-y-5 fade-in">
      <IntuitAssistCard
        title="Intuit Assist · Margin Monitor"
        message={`Davis trending to 4% margin (target 22%). Root cause: electrical sub exceeded estimate by $2,800 — scope change never reflected in a change order. Projected final: -2%.\n\n➡ Issue change order for electrical scope. Reduce remaining materials by $600.`}
        actions={[{ label: "Issue Change Order", primary: true }, { label: "Adjust Budget" }, { label: "Flag Electrical" }]}
      />

      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Active Projects" value="4" />
        <MetricCard label="Avg Target Margin" value="22%" />
        <MetricCard label="Davis Trending" value="4%" change="Target: 22%" changeType="negative" />
        <MetricCard label="Margin at Risk" value="$3,400" change="Without action" changeType="negative" />
      </div>

      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#212B36] mb-3">Active Project Health</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Thompson Living Room", value: "$28K", margin: 24, target: 22, ok: true, completion: 40 },
            { name: "Reyes Outdoor", value: "$22K", margin: 21, target: 22, ok: true, completion: 25 },
            { name: "Chen Bathroom", value: "$14K", margin: 19, target: 22, ok: true, completion: 85 },
            { name: "Davis Master Bedroom", value: "$19K", margin: 4, target: 22, ok: false, completion: 60 },
          ].map((p) => (
            <div key={p.name} className={`p-3 rounded-lg border ${!p.ok ? "border-[#D13B3B]/30 bg-[#FEF2F2]/50" : "border-[#E5E7EB]"}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-[12px] font-semibold text-[#212B36]">{p.name}</p>
                  <p className="text-[10px] text-[#9CA3AF]">{p.value} · {p.completion}% done</p>
                </div>
                <StatusBadge status={`${p.margin}% margin`} variant={p.ok ? "success" : "danger"} />
              </div>
              <ProgressBar value={p.completion} color={p.ok ? "#2CA01C" : "#D13B3B"} label="Completion" />
              <div className="mt-2">
                <ProgressBar value={p.margin} max={30} color={p.margin >= p.target ? "#2CA01C" : "#D13B3B"} label={`Margin (${p.target}% target)`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border-2 border-[#D13B3B]/20 bg-white p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 rounded-full bg-[#FEF2F2] flex items-center justify-center">
            <span className="text-[11px] text-[#D13B3B] font-bold">!</span>
          </div>
          <h3 className="text-[13px] font-semibold text-[#D13B3B]">Davis Master Bedroom — Budget Alert</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-3">
          <div><p className="text-[10px] text-[#9CA3AF]">Budget</p><p className="text-sm font-bold text-[#212B36]">$19,000</p></div>
          <div><p className="text-[10px] text-[#9CA3AF]">Actual (60%)</p><p className="text-sm font-bold text-[#D13B3B]">$14,200</p></div>
          <div><p className="text-[10px] text-[#9CA3AF]">Projected Final</p><p className="text-sm font-bold text-[#D13B3B]">$19,380</p></div>
        </div>
        <BarChart
          data={[
            { label: "Labor", value: 6800, color: "#0077C5" },
            { label: "Materials", value: 3200, color: "#2CA01C" },
            { label: "Electrical Sub", value: 4200, color: "#D13B3B" },
          ]}
          height={130}
        />
        <p className="text-[10px] text-[#D13B3B] mt-2">Electrical subcontractor exceeded estimate by $2,800 — scope change not captured</p>
      </div>
    </div>
  );
}

function Scene8_Payments() {
  return (
    <div className="space-y-5 fade-in">
      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Current DSO" value="27 days" change="Was 18d (6mo ago)" changeType="negative" />
        <MetricCard label="Overdue AR" value="$14,100" subtitle="3 clients = 72%" change="Action needed" changeType="negative" />
        <MetricCard label="ACH Saves" value="8 days" subtitle="faster than check" change="Switch default" changeType="positive" />
        <MetricCard label="30-Day Collections" value="$31,400" subtitle="projected" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="qbo-card p-5">
          <h3 className="text-[13px] font-semibold text-[#212B36] mb-3">DSO Trend (6 Months)</h3>
          <LineChart
            data={[
              { label: "Oct", value: 18 }, { label: "Nov", value: 19 }, { label: "Dec", value: 21 },
              { label: "Jan", value: 23 }, { label: "Feb", value: 25 }, { label: "Mar", value: 27 },
            ]}
            color="#D13B3B"
            yLabel="Days Sales Outstanding"
          />
        </div>
        <div className="qbo-card p-5">
          <h3 className="text-[13px] font-semibold text-[#212B36] mb-3">Payment Method Speed</h3>
          <BarChart
            data={[
              { label: "Wire", value: 8, color: "#6C5CE7" },
              { label: "ACH", value: 12, color: "#2CA01C" },
              { label: "Card", value: 15, color: "#0077C5" },
              { label: "Check", value: 20, color: "#E87040" },
            ]}
            height={160}
          />
          <p className="text-[10px] text-[#9CA3AF] mt-2 text-center">Avg days to payment</p>
        </div>
      </div>

      <div className="qbo-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-semibold text-[#212B36]">Overdue Receivables</h3>
          <StatusBadge status="$14,100 overdue" variant="danger" />
        </div>
        <DataTable
          headers={["Client", "Amount", "Days Overdue", "Method", "History"]}
          rows={[
            ["Morrison", "$6,200", <StatusBadge key="s1" status="38 days" variant="danger" />, "Check", "Chronically late"],
            ["Cho", "$3,800", <StatusBadge key="s2" status="22 days" variant="warning" />, "Check", "Usually on time"],
            ["Patel", "$4,100", <StatusBadge key="s3" status="19 days" variant="warning" />, "ACH", "First project"],
          ]}
        />
      </div>

      <div className="qbo-card p-5">
        <h3 className="text-[13px] font-semibold text-[#212B36] mb-4">Revenue Waterfall — Pipeline to Cash</h3>
        <div className="flex items-end gap-2 justify-around" style={{ height: 180 }}>
          {[
            { label: "Pipeline", value: 187, color: "#0077C5" },
            { label: "Proposals", value: 94, color: "#4A90D9" },
            { label: "Invoiced", value: 62, color: "#2CA01C" },
            { label: "Collected", value: 48, color: "#065F46" },
            { label: "Outstanding", value: 14, color: "#E87040" },
          ].map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[11px] font-bold text-[#212B36]">${d.value}K</span>
              <div
                className="w-full max-w-[52px] rounded-t-[4px]"
                style={{ height: (d.value / 187) * 140, backgroundColor: d.color }}
              />
              <span className="text-[9px] text-[#9CA3AF] text-center mt-1">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      <IntuitAssistCard
        title="Intuit Assist · DSO Reducer"
        message={`DSO rose 50% over 6 months. Three clients drive 72% of overdue: Morrison ($6.2K, 38d), Cho ($3.8K, 22d), Patel ($4.1K, 19d).\n\nFor Morrison: require 50% deposit on future projects. Switch default to ACH to save ~5 days.\n\n➡ Send reminders to Morrison and Cho today.`}
        actions={[{ label: "Send Reminders", primary: true }, { label: "Switch to ACH" }, { label: "Set Deposit Policy" }]}
      />
    </div>
  );
}

export default function CashFlowPage() {
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
          <h1 className="text-[20px] font-semibold text-[#212B36]">Cash flow</h1>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">
            {tabs.find((t) => t.id === currentScene)?.label || "Overview"}
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

      {currentScene === 7 && <Scene7_Profitability />}
      {currentScene === 8 && <Scene8_Payments />}

      <SceneTabs active={activeScene} onChange={setActiveScene} />
    </div>
  );
}
