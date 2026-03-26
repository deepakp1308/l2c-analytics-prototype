"use client";
import { ChannelPill } from "./ChannelPill";
import { CHANNEL_CONFIG } from "./ChannelLogo";

const TIME_LABELS = ["Mar 1", "Mar 5", "Mar 10", "Mar 15", "Mar 20", "Mar 25"];

const MOCK_DATA: Record<string, number[]> = {
  email:     [1200, 1400, 1100, 1600, 1500, 1800],
  sms:       [300,  280,  350,  320,  310,  340],
  whatsapp:  [450,  520,  480,  600,  580,  650],
  googleAds: [2200, 2400, 2100, 2600, 2500, 2800],
  meta:      [1800, 2000, 1900, 2200, 2100, 2400],
  tiktok:    [400,  500,  450,  600,  550,  700],
  linkedin:  [600,  650,  620,  700,  680,  750],
};

export function TimeSeriesChart({ activeChannels, onToggleChannel }: {
  activeChannels: Record<string, boolean>;
  onToggleChannel: (key: string) => void;
}) {
  const svgW = 600, svgH = 260, padX = 45, padY = 20, padB = 30;
  const chartW = svgW - padX - 10;
  const chartH = svgH - padY - padB;

  // Find global max across active channels
  const activeKeys = Object.entries(activeChannels).filter(([, v]) => v).map(([k]) => k);
  let globalMax = 100;
  activeKeys.forEach(k => {
    const d = MOCK_DATA[k];
    if (d) globalMax = Math.max(globalMax, ...d);
  });

  function toX(i: number) { return padX + (i / (TIME_LABELS.length - 1)) * chartW; }
  function toY(v: number) { return padY + (1 - v / globalMax) * chartH; }

  return (
    <div className="qbo-card p-5">
      <h3 className="text-[13px] font-semibold text-[#0D333F] mb-3">Campaign Performance Over Time</h3>

      {/* Channel pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {CHANNEL_CONFIG.map(ch => (
          <ChannelPill
            key={ch.key}
            channelKey={ch.key}
            name={ch.name}
            color={ch.color}
            active={!!activeChannels[ch.key]}
            onClick={() => onToggleChannel(ch.key)}
          />
        ))}
      </div>

      {/* Chart */}
      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{ height: 260 }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(pct => (
          <g key={pct}>
            <line x1={padX} y1={padY + pct * chartH} x2={padX + chartW} y2={padY + pct * chartH} stroke="#E8E8E8" strokeWidth="0.5" />
            <text x={padX - 6} y={padY + pct * chartH + 3} textAnchor="end" fontSize="9" fill="#8C8C8C">
              {Math.round(globalMax * (1 - pct))}
            </text>
          </g>
        ))}

        {/* Lines + areas per active channel */}
        {activeKeys.map(key => {
          const data = MOCK_DATA[key];
          if (!data) return null;
          const cfg = CHANNEL_CONFIG.find(c => c.key === key);
          if (!cfg) return null;
          const pts = data.map((v, i) => ({ x: toX(i), y: toY(v) }));
          const polyline = pts.map(p => `${p.x},${p.y}`).join(" ");
          const area = `${toX(0)},${padY + chartH} ${polyline} ${toX(data.length - 1)},${padY + chartH}`;

          return (
            <g key={key}>
              <polygon points={area} fill={cfg.color} fillOpacity="0.06" />
              <polyline points={polyline} fill="none" stroke={cfg.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              {pts.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="3" fill="white" stroke={cfg.color} strokeWidth="1.5" />
              ))}
            </g>
          );
        })}

        {/* X-axis labels */}
        {TIME_LABELS.map((label, i) => (
          <text key={i} x={toX(i)} y={svgH - 6} textAnchor="middle" fontSize="9" fill="#8C8C8C">{label}</text>
        ))}
      </svg>
    </div>
  );
}
