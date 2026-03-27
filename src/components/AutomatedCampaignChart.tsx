"use client";
import { ChannelLogo } from "./ChannelLogo";

const PERIODS = ["Week 1", "Week 2", "Week 3", "Week 4"];
const CHANNELS = [
  { key: "email", name: "Email", color: "#0B7F5C" },
  { key: "sms", name: "SMS", color: "#108000" },
  { key: "whatsapp", name: "WhatsApp", color: "#25D366" },
];

const DATA: Record<string, Record<string, number[]>> = {
  sendVolume: { email: [4200, 4800, 5100, 5600], sms: [1200, 1400, 1300, 1500], whatsapp: [800, 950, 1100, 1250] },
  openRate:   { email: [22, 24, 23, 26], sms: [45, 48, 44, 50], whatsapp: [62, 65, 60, 68] },
  clickRate:  { email: [3.2, 3.8, 3.5, 4.1], sms: [2.1, 2.4, 2.0, 2.6], whatsapp: [5.8, 6.2, 5.5, 6.8] },
};

const SUMMARIES: Record<string, Record<string, string>> = {
  sendVolume: { email: "5,600 sent", sms: "1,500 sent", whatsapp: "1,250 sent" },
  openRate:   { email: "26% open", sms: "50% open", whatsapp: "68% open" },
  clickRate:  { email: "4.1% CTR", sms: "2.6% CTR", whatsapp: "6.8% CTR" },
};

const TABS = [
  { key: "sendVolume", label: "Send Volume" },
  { key: "openRate", label: "Open Rate" },
  { key: "clickRate", label: "Click Rate" },
];

export function AutomatedCampaignChart({ activeMetric, onMetricChange }: {
  activeMetric: string;
  onMetricChange: (m: string) => void;
}) {
  const metricData = DATA[activeMetric] || DATA.sendVolume;
  const summaries = SUMMARIES[activeMetric] || SUMMARIES.sendVolume;

  // Find max for scaling
  let maxVal = 0;
  Object.values(metricData).forEach(arr => arr.forEach(v => { if (v > maxVal) maxVal = v; }));

  const svgW = 560, svgH = 200, padX = 50, padY = 15, padB = 30;
  const chartW = svgW - padX - 10;
  const chartH = svgH - padY - padB;
  const groupW = chartW / PERIODS.length;
  const barW = groupW / (CHANNELS.length + 1);

  return (
    <div className="qbo-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-semibold text-[#22262A]">Automated Campaign Performance</h3>
        <div className="flex gap-1 bg-[#ECEEF2] rounded-lg p-0.5">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => onMetricChange(t.key)}
              className={`qbo-tab text-[11px] px-2.5 py-1 ${activeMetric === t.key ? "qbo-tab-active" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped bar chart */}
      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{ height: 200 }}>
        {/* Grid */}
        {[0, 0.25, 0.5, 0.75, 1].map(pct => (
          <g key={pct}>
            <line x1={padX} y1={padY + pct * chartH} x2={padX + chartW} y2={padY + pct * chartH} stroke="#E5E7EB" strokeWidth="0.5" />
            <text x={padX - 6} y={padY + pct * chartH + 3} textAnchor="end" fontSize="8" fill="#9CA3AF">
              {activeMetric === "sendVolume"
                ? Math.round(maxVal * (1 - pct)).toLocaleString()
                : (maxVal * (1 - pct)).toFixed(0) + "%"}
            </text>
          </g>
        ))}

        {/* Bars */}
        {PERIODS.map((_, pi) => {
          const groupX = padX + pi * groupW;
          return CHANNELS.map((ch, ci) => {
            const val = metricData[ch.key]?.[pi] || 0;
            const barH = (val / maxVal) * chartH;
            const x = groupX + (ci + 0.5) * barW;
            return (
              <rect
                key={`${pi}-${ci}`}
                x={x}
                y={padY + chartH - barH}
                width={barW * 0.8}
                height={barH}
                rx={2}
                fill={ch.color}
              />
            );
          });
        })}

        {/* X labels */}
        {PERIODS.map((label, i) => (
          <text key={i} x={padX + i * groupW + groupW / 2} y={svgH - 8} textAnchor="middle" fontSize="9" fill="#9CA3AF">{label}</text>
        ))}
      </svg>

      {/* Legend + summary cards */}
      <div className="grid grid-cols-3 gap-3 mt-3">
        {CHANNELS.map(ch => (
          <div key={ch.key} className="flex items-center gap-2.5 p-3 bg-[#F3F4F6] rounded-lg">
            <ChannelLogo channel={ch.key} size={24} />
            <div>
              <p className="text-[12px] font-semibold text-[#22262A]">{ch.name}</p>
              <p className="text-[11px] text-[#6B7280]">{summaries[ch.key]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
