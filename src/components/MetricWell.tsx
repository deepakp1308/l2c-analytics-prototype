"use client";
import { MetricCard } from "./MetricCard";

type MetricItem = { label: string; value: string; change: string; changeType: "positive" | "negative" | "neutral"; subtitle?: string };
type MetricSet = { label: string; metrics: MetricItem[] };

export function MetricWell({ title, metricSets, activeSet, onSetChange }: {
  title: string;
  metricSets: MetricSet[];
  activeSet: number;
  onSetChange: (i: number) => void;
}) {
  const current = metricSets[activeSet] || metricSets[0];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">{title}</h4>
        <select
          value={activeSet}
          onChange={(e) => onSetChange(Number(e.target.value))}
          className="text-[11px] border border-[#E5E7EB] rounded px-2 py-1 bg-white text-[#6B7280]"
        >
          {metricSets.map((s, i) => (
            <option key={i} value={i}>{s.label}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {current.metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>
    </div>
  );
}
