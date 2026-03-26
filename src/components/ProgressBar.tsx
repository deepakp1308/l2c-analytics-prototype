export function ProgressBar({
  value,
  max = 100,
  color = "#055393",
  label,
  showValue = true,
}: {
  value: number;
  max?: number;
  color?: string;
  label?: string;
  showValue?: boolean;
}) {
  const pct = Math.min(100, (value / max) * 100);

  return (
    <div>
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-[11px] text-[#8C8C8C]">{label}</span>
          {showValue && <span className="text-[11px] font-semibold text-[#0D333F]">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="h-2 bg-[#D9D9D9] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
