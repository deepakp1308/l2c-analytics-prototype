"use client";

export function LineChart({
  data,
  height = 160,
  color = "#0B7F5C",
  yLabel,
}: {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  yLabel?: string;
}) {
  if (data.length < 2) return null;

  const maxVal = Math.max(...data.map((d) => d.value));
  const minVal = Math.min(...data.map((d) => d.value));
  const range = maxVal - minVal || 1;

  const svgW = 400;
  const svgH = height;
  const padX = 10;
  const padY = 20;
  const chartW = svgW - padX * 2;
  const chartH = svgH - padY * 2;

  const pts = data.map((d, i) => ({
    x: padX + (i / (data.length - 1)) * chartW,
    y: padY + (1 - (d.value - minVal) / range) * chartH,
  }));

  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPoints = `${padX},${svgH - padY} ${polyline} ${svgW - padX},${svgH - padY}`;
  const gradId = `lg-${color.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div>
      {yLabel && <p className="text-[10px] text-[#9CA3AF] mb-1">{yLabel}</p>}
      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{ height }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
          <line key={pct} x1={padX} y1={padY + pct * chartH} x2={svgW - padX} y2={padY + pct * chartH} stroke="#E5E7EB" strokeWidth="0.5" />
        ))}
        <polygon points={areaPoints} fill={`url(#${gradId})`} />
        <polyline points={polyline} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="white" stroke={color} strokeWidth="2" />
            <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="10" fontWeight="600" fill="#22262A">{data[i].value}</text>
          </g>
        ))}
      </svg>
      <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-1 px-1">
        {data.map((d, i) => <span key={i}>{d.label}</span>)}
      </div>
    </div>
  );
}
