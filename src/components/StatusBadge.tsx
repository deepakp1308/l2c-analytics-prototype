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
    info: "bg-[#EAF6F7] text-[#055393]",
    default: "bg-[#F4F4EF] text-[#6B6C72]",
  };

  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${colors[variant]}`}>
      {status}
    </span>
  );
}
