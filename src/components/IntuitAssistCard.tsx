"use client";

export function IntuitAssistCard({
  title,
  message,
  actions,
}: {
  title: string;
  message: string;
  actions?: { label: string; primary?: boolean }[];
}) {
  return (
    <div className="bg-white rounded-lg p-4 slide-up" style={{ border: "1px solid rgba(108,92,231,0.12)", boxShadow: "0 0 0 1px rgba(108,92,231,0.04), 0 2px 8px rgba(108,92,231,0.06)" }}>
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-6 h-6 rounded-md intuit-assist-gradient flex items-center justify-center shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>
        <span className="text-[11px] font-semibold intuit-assist-text tracking-wide uppercase">{title}</span>
      </div>
      <p className="text-[13px] text-[#212B36] leading-relaxed whitespace-pre-line">{message}</p>
      {actions && actions.length > 0 && (
        <div className="flex gap-2 mt-3">
          {actions.map((a) => (
            <button
              key={a.label}
              className={`text-[12px] font-medium px-3 py-1.5 rounded-md transition-colors ${
                a.primary
                  ? "intuit-assist-gradient text-white hover:opacity-90"
                  : "border border-[#E5E7EB] text-[#212B36] hover:bg-[#F4F5F8]"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
