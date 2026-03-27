export function MetricCard({
  label,
  value,
  change,
  changeType = "neutral",
  subtitle,
}: {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  subtitle?: string;
}) {
  const changeColor =
    changeType === "positive" ? "text-[#108000]"
      : changeType === "negative" ? "text-[#D52B1E]"
      : "text-[#9CA3AF]";

  return (
    <div className="qbo-card p-4 hover:shadow-sm transition-shadow">
      <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">{label}</p>
      <p className="text-[22px] font-bold text-[#22262A] leading-tight">{value}</p>
      {subtitle && <p className="text-[11px] text-[#9CA3AF] mt-0.5">{subtitle}</p>}
      {change && (
        <p className={`text-[11px] font-medium mt-1 ${changeColor}`}>
          {changeType === "positive" ? "▲ " : changeType === "negative" ? "▼ " : ""}{change}
        </p>
      )}
    </div>
  );
}
