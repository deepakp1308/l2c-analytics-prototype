"use client";

export function BarChart({
  data,
  height = 200,
  barColor = "#2CA01C",
  showValues = true,
}: {
  data: { label: string; value: number; color?: string }[];
  height?: number;
  barColor?: string;
  showValues?: boolean;
}) {
  const maxVal = Math.max(...data.map((d) => d.value));
  if (maxVal === 0) return null;

  return (
    <div className="flex items-end gap-3 justify-around" style={{ height }}>
      {data.map((d, i) => {
        const barH = Math.max(2, (d.value / maxVal) * (height - 44));
        const isLarge = d.value >= 1000;
        const displayVal = isLarge ? `$${(d.value / 1000).toFixed(0)}K` : d.value;
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            {showValues && (
              <span className="text-[11px] font-semibold text-[#212B36]">
                {displayVal}
              </span>
            )}
            <div
              className="w-full max-w-[44px] rounded-t-[4px] transition-all duration-300"
              style={{ height: barH, backgroundColor: d.color || barColor }}
            />
            <span className="text-[10px] text-[#9CA3AF] text-center leading-tight mt-1 max-w-[56px]">
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
