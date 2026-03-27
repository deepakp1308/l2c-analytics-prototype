"use client";

import { DonutChart } from "@/components/DonutChart";

const SEGMENTS = [
  { label: "Hot (90-100)", value: 5, color: "#108000", tag: "Hot", pct: "15%" },
  { label: "Warm (75-89)", value: 8, color: "#60A5FA", tag: "Warm", pct: "24%" },
  { label: "Nurture (50-74)", value: 12, color: "#E17000", tag: "Nurture", pct: "35%" },
  { label: "Cold (25-49)", value: 6, color: "#D52B1E", tag: "Cold", pct: "18%" },
  { label: "Unscored (<25)", value: 3, color: "#D1D5DB", tag: "Unscored", pct: "9%" },
];

const FACTORS = [
  { name: "Engagement", weight: "40%", desc: "Page views, email opens, form fills" },
  { name: "Fit", weight: "30%", desc: "Budget, location, project type match" },
  { name: "Recency", weight: "20%", desc: "Days since last interaction" },
  { name: "Financial Signal", weight: "10%", desc: "QBO data: business size, payment history", isNew: true },
];

export function LeadScoreDistribution() {
  return (
    <div className="qbo-card p-5">
      <h3 className="text-[13px] font-semibold text-[#22262A] mb-4">Lead Score Distribution</h3>

      <div className="flex gap-6">
        {/* Donut */}
        <div className="shrink-0">
          <DonutChart
            segments={SEGMENTS.map((s) => ({ label: s.label, value: s.value, color: s.color }))}
            size={140}
            centerValue="34"
            centerLabel="total leads"
          />
        </div>

        {/* Breakdown */}
        <div className="flex-1 space-y-2">
          {SEGMENTS.map((s) => (
            <div key={s.tag} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-medium text-[#22262A]">{s.tag}</span>
                  <span className="text-[10px] text-[#9CA3AF]">{s.label.match(/\(.*\)/)?.[0]}</span>
                </div>
              </div>
              <span className="text-[13px] font-bold text-[#22262A]">{s.value}</span>
              <span className="text-[10px] text-[#9CA3AF] w-8 text-right">{s.pct}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Score factors */}
      <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
        <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Score Composition</p>
        <div className="grid grid-cols-4 gap-2">
          {FACTORS.map((f) => (
            <div key={f.name} className={`p-2.5 rounded-lg ${f.isNew ? "bg-[#E6F5F0] border border-[#0B7F5C]/15" : "bg-[#F3F4F6]"}`}>
              <div className="flex items-center gap-1">
                <span className="text-[12px] font-bold text-[#22262A]">{f.weight}</span>
                {f.isNew && <span className="text-[8px] px-1 py-0.5 rounded bg-[#0B7F5C] text-white font-bold">QBO</span>}
              </div>
              <p className="text-[11px] font-medium text-[#22262A] mt-0.5">{f.name}</p>
              <p className="text-[9px] text-[#9CA3AF] leading-tight mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
