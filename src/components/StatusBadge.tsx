export function StatusBadge({
  status,
  variant = "default",
}: {
  status: string;
  variant?: "success" | "warning" | "danger" | "info" | "default";
}) {
  const colors = {
    success: "bg-[#E4F7E4] text-[#0D6B3F]",
    warning: "bg-[#FFF7ED] text-[#B45309]",
    danger: "bg-[#FEF2F2] text-[#D13B3B]",
    info: "bg-[#E6F3FB] text-[#0077C5]",
    default: "bg-[#F4F5F8] text-[#6B7280]",
  };

  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${colors[variant]}`}>
      {status}
    </span>
  );
}
