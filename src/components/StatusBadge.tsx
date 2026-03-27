export function StatusBadge({
  status,
  variant = "default",
}: {
  status: string;
  variant?: "success" | "warning" | "danger" | "info" | "default";
}) {
  const colors = {
    success: "bg-[#F0FAF0] text-[#108000]",
    warning: "bg-[#FFF7ED] text-[#E17000]",
    danger: "bg-[#FEF2F2] text-[#D52B1E]",
    info: "bg-[#E6F5F0] text-[#0B7F5C]",
    default: "bg-[#F3F4F6] text-[#6B7280]",
  };

  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${colors[variant]}`}>
      {status}
    </span>
  );
}
