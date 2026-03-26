"use client";

const STAGES = [
  { label: "Attract", score: 82, color: "#055393", icon: "📣" },
  { label: "Convert", score: 68, color: "#4A90D9", icon: "🎯" },
  { label: "Close", score: 71, color: "#108000", icon: "🤝" },
  { label: "Collect", score: 64, color: "#E17000", icon: "💰" },
  { label: "Grow", score: 75, color: "#0097A9", icon: "📈" },
];

const OVERALL = 72;

function ScoreRing({ score, size = 100 }: { score: number; size?: number }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dashLen = (score / 100) * circ;
  const gapLen = circ - dashLen;
  const color = score >= 80 ? "#108000" : score >= 60 ? "#E17000" : "#D52B1E";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E8E8E8" strokeWidth="8" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        style={{ stroke: color }}
        strokeWidth="8" strokeDasharray={`${dashLen} ${gapLen}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x={size / 2} y={size / 2 - 6} textAnchor="middle" fontSize="28" fontWeight="800" fill="#0D333F">{score}</text>
      <text x={size / 2} y={size / 2 + 14} textAnchor="middle" fontSize="10" fill="#8C8C8C">/100</text>
    </svg>
  );
}

export function L2CHealthScore() {
  return (
    <div className="qbo-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-semibold text-[#0D333F]">L2C Health Score</h3>
        <span className="text-[10px] text-[#8C8C8C]">Updated today</span>
      </div>

      <div className="flex items-center gap-6">
        {/* Overall score ring */}
        <div className="shrink-0">
          <ScoreRing score={OVERALL} size={110} />
        </div>

        {/* Stage breakdown */}
        <div className="flex-1 grid grid-cols-5 gap-2">
          {STAGES.map((s) => {
            const barColor = s.score >= 80 ? "#108000" : s.score >= 60 ? "#E17000" : "#D52B1E";
            return (
              <div key={s.label} className="text-center">
                <span className="text-[14px]">{s.icon}</span>
                <p className="text-[10px] font-semibold text-[#0D333F] mt-0.5">{s.label}</p>
                <p className="text-[16px] font-bold mt-0.5" style={{ color: barColor }}>{s.score}</p>
                <div className="h-1.5 bg-[#E8E8E8] rounded-full mt-1 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${s.score}%`, backgroundColor: barColor }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
