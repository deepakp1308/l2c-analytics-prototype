"use client";

type Stage = { label: string; value: string; count: number; color: string; dropoff?: string };

const STAGES: Stage[] = [
  { label: "Ad Impressions", value: "2,840", count: 2840, color: "#93C5FD", dropoff: "" },
  { label: "Ad Clicks", value: "312", count: 312, color: "#0B7F5C", dropoff: "11.0%" },
  { label: "Leads", value: "84", count: 84, color: "#60A5FA", dropoff: "26.9%" },
  { label: "Proposals", value: "22", count: 22, color: "#108000", dropoff: "26.2%" },
  { label: "Signed", value: "14", count: 14, color: "#0D6B3F", dropoff: "63.6%" },
  { label: "Invoiced", value: "12", count: 12, color: "#E17000", dropoff: "85.7%" },
  { label: "Cash Received", value: "$128.6K", count: 10, color: "#065F46", dropoff: "83.3%" },
];

export function AttributionFunnel() {
  const maxCount = STAGES[0].count;

  return (
    <div>
      {/* Funnel visualization */}
      <div className="relative">
        {STAGES.map((stage, i) => {
          const widthPct = Math.max(18, (stage.count / maxCount) * 100);
          const nextWidthPct = i < STAGES.length - 1 ? Math.max(18, (STAGES[i + 1].count / maxCount) * 100) : widthPct;

          return (
            <div key={i} className="relative mb-0">
              {/* Stage row */}
              <div className="flex items-center gap-0">
                {/* Left label */}
                <div className="w-[100px] text-right pr-3 shrink-0">
                  <p className="text-[11px] font-medium text-[#22262A]">{stage.label}</p>
                </div>

                {/* Funnel bar */}
                <div className="flex-1 flex justify-center">
                  <div className="relative" style={{ width: `${widthPct}%` }}>
                    {/* Main bar */}
                    <div
                      className="h-[44px] rounded-[4px] flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: stage.color }}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" style={{ height: "50%" }} />
                      <span className="text-white font-bold text-[14px] relative z-10 drop-shadow-sm">{stage.value}</span>
                    </div>

                    {/* Taper connector to next stage */}
                    {i < STAGES.length - 1 && (
                      <svg
                        width="100%"
                        height="12"
                        viewBox="0 0 100 12"
                        preserveAspectRatio="none"
                        className="block"
                      >
                        <polygon
                          points={`0,0 100,0 ${50 + (nextWidthPct / widthPct) * 50},12 ${50 - (nextWidthPct / widthPct) * 50},12`}
                          fill={stage.color}
                          fillOpacity="0.3"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Right: conversion rate */}
                <div className="w-[70px] pl-3 shrink-0">
                  {stage.dropoff && (
                    <span className="text-[10px] font-semibold text-[#108000]">
                      {stage.dropoff}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom summary strip */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E5E7EB]">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[10px] text-[#9CA3AF] uppercase">End-to-End</p>
            <p className="text-[16px] font-bold text-[#22262A]">3.6%</p>
          </div>
          <div className="w-px h-8 bg-[#E5E7EB]" />
          <div>
            <p className="text-[10px] text-[#9CA3AF] uppercase">Avg Cycle</p>
            <p className="text-[16px] font-bold text-[#22262A]">34 days</p>
          </div>
          <div className="w-px h-8 bg-[#E5E7EB]" />
          <div>
            <p className="text-[10px] text-[#9CA3AF] uppercase">Cash Collected</p>
            <p className="text-[16px] font-bold text-[#108000]">$128,600</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#F0FAF0] px-3 py-1.5 rounded-lg">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#108000"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
          <p className="text-[11px] text-[#065F46] font-medium">Ledger-verified to the penny</p>
        </div>
      </div>
    </div>
  );
}
