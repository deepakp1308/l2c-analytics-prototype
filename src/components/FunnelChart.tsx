"use client";

export function FunnelChart({
  stages,
}: {
  stages: { label: string; value: number; color: string; conversion?: string }[];
}) {
  const maxVal = stages[0]?.value || 1;

  return (
    <div className="flex flex-col gap-2">
      {stages.map((stage, i) => {
        const widthPct = Math.max(15, (stage.value / maxVal) * 100);
        return (
          <div key={i} className="flex items-center gap-3">
            <div className="w-24 text-right shrink-0">
              <span className="text-[11px] font-medium text-[#6B7280]">{stage.label}</span>
            </div>
            <div className="flex-1">
              <div
                className="h-8 rounded-md flex items-center px-3 transition-all duration-300"
                style={{ width: `${widthPct}%`, backgroundColor: stage.color, minWidth: 48 }}
              >
                <span className="text-[11px] font-bold text-white drop-shadow-sm">
                  {stage.value.toLocaleString()}
                </span>
              </div>
            </div>
            {stage.conversion && (
              <span className="text-[10px] text-[#9CA3AF] w-12 text-right shrink-0">{stage.conversion}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
