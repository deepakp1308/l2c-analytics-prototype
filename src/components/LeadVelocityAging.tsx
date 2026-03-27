"use client";

import { LineChart } from "@/components/LineChart";
import { BarChart } from "@/components/BarChart";

const VELOCITY_DATA = [
  { label: "W1", value: 6 },
  { label: "W2", value: 8 },
  { label: "W3", value: 7 },
  { label: "W4", value: 9 },
  { label: "W5", value: 11 },
  { label: "W6", value: 10 },
  { label: "W7", value: 13 },
];

const AGING_DATA = [
  { label: "0-3d", value: 18, color: "#108000" },
  { label: "4-7d", value: 12, color: "#60A5FA" },
  { label: "8-14d", value: 8, color: "#E17000" },
  { label: "15-30d", value: 4, color: "#D52B1E" },
  { label: "30d+", value: 3, color: "#8B0000" },
];

export function LeadVelocityAging() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Lead Velocity Rate */}
      <div className="qbo-card p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[13px] font-semibold text-[#22262A]">Lead Velocity Rate</h3>
          <div className="flex items-center gap-1">
            <span className="text-[18px] font-bold text-[#108000]">+12%</span>
            <span className="text-[10px] text-[#9CA3AF]">/month</span>
          </div>
        </div>
        <p className="text-[10px] text-[#9CA3AF] mb-3">New qualified leads per week — the #1 growth predictor</p>
        <LineChart data={VELOCITY_DATA} color="#0B7F5C" height={130} yLabel="Qualified leads/week" />
        <div className="mt-2 p-2 bg-[#F0FAF0] rounded-lg">
          <p className="text-[10px] text-[#108000] font-medium">▲ Accelerating — 13 new leads last week vs 6 four weeks ago</p>
        </div>
      </div>

      {/* Lead Aging Distribution */}
      <div className="qbo-card p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[13px] font-semibold text-[#22262A]">Lead Aging Distribution</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D52B1E]/10 text-[#D52B1E] font-semibold">7 leads &gt;14d</span>
        </div>
        <p className="text-[10px] text-[#9CA3AF] mb-3">Days since last activity — stale leads decay fast</p>
        <BarChart data={AGING_DATA} height={130} />
        <div className="mt-2 p-2 bg-[#FEF2F2] rounded-lg">
          <p className="text-[10px] text-[#D52B1E] font-medium">⚠ 7 leads inactive &gt;14 days — conversion drops 68% after 14 days of inactivity</p>
        </div>
      </div>
    </div>
  );
}
