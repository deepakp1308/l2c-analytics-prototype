"use client";

export function DateRangeSelector({ dateRange, onDateRangeChange, botFilterEnabled, onBotFilterToggle }: {
  dateRange: string;
  onDateRangeChange: (v: string) => void;
  botFilterEnabled: boolean;
  onBotFilterToggle: (v: boolean) => void;
}) {
  return (
    <div className="qbo-card px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B6C72" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <select
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value)}
          className="text-[13px] border border-[#BABEC5] rounded-md px-3 py-1.5 bg-white text-[#0D333F] font-medium"
        >
          <option value="last7">Last 7 Days</option>
          <option value="last30">Last 30 Days</option>
          <option value="quarter">This Quarter</option>
          <option value="lastQuarter">Last Quarter</option>
          <option value="ytd">Year to Date</option>
        </select>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="text-[12px] text-[#6B6C72] font-medium">Exclude Bot Traffic</span>
        <button
          onClick={() => onBotFilterToggle(!botFilterEnabled)}
          className="relative w-[36px] h-[20px] rounded-full transition-colors"
          style={{ backgroundColor: botFilterEnabled ? "#055393" : "#D9D9D9" }}
        >
          <div
            className="absolute top-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform"
            style={{ left: botFilterEnabled ? 18 : 2 }}
          />
        </button>
      </div>
    </div>
  );
}
