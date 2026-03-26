"use client";

export function DonutChart({
  segments,
  size = 160,
  centerLabel,
  centerValue,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  centerLabel?: string;
  centerValue?: string;
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total === 0) return null;

  const r = (size - 28) / 2;
  const circ = 2 * Math.PI * r;
  let rotation = -90;

  return (
    <div className="flex items-center gap-5">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg, i) => {
          const pct = seg.value / total;
          const dashLen = circ * pct;
          const gapLen = circ - dashLen;
          const currentRotation = rotation;
          rotation += pct * 360;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              style={{ stroke: seg.color }}
              strokeWidth={20}
              strokeDasharray={`${dashLen} ${gapLen}`}
              strokeLinecap="butt"
              transform={`rotate(${currentRotation} ${size / 2} ${size / 2})`}
            />
          );
        })}
        {centerValue && (
          <>
            <text x={size / 2} y={size / 2 - 4} textAnchor="middle" fontSize="20" fontWeight="700" fill="#212B36">{centerValue}</text>
            {centerLabel && <text x={size / 2} y={size / 2 + 14} textAnchor="middle" fontSize="10" fill="#9CA3AF">{centerLabel}</text>}
          </>
        )}
      </svg>
      <div className="flex flex-col gap-2">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-[11px] text-[#6B7280]">{seg.label}</span>
            <span className="text-[11px] font-semibold text-[#212B36] ml-auto">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
