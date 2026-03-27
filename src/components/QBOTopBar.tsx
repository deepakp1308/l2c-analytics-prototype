"use client";
import { useState } from "react";

export function QBOTopBar({ onToggleAssist }: { onToggleAssist?: () => void }) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="h-[52px] bg-[#F2F2F2] border-b border-[#E5E7EB] flex items-center justify-between px-4 shrink-0 z-20">
      {/* Left: Intuit logo + Business name */}
      <div className="flex items-center gap-3 min-w-[200px]">
        {/* Intuit wordmark */}
        <svg width="48" height="16" viewBox="0 0 48 16" fill="none">
          <text x="0" y="13" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="800" fill="#22262A">INTUIT</text>
        </svg>
        <div className="w-px h-6 bg-[#D1D5DB]" />
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#0B7F5C] flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          </div>
          <span className="text-[14px] font-semibold text-[#22262A]">North &amp; Main</span>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 flex justify-center max-w-[480px] mx-4">
        <div
          className={`flex items-center gap-2 rounded-full px-4 py-[7px] w-full transition-all ${
            searchFocused
              ? "bg-white border border-[#0B7F5C] shadow-[0_0_0_2px_rgba(11,127,92,0.1)]"
              : "bg-white border border-[#E5E7EB]"
          }`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search anything"
            className="bg-transparent text-[13px] text-[#22262A] placeholder-[#9CA3AF] outline-none w-full"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5">
        {/* Workflows */}
        <button className="p-2 rounded-lg hover:bg-[#E5E7EB] transition-colors" title="Workflows">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </button>

        {/* Intuit Intelligence */}
        <button
          onClick={onToggleAssist}
          className="flex items-center gap-1.5 px-3 py-[6px] rounded-full hover:bg-white transition-colors ii-pulse"
          style={{ border: "1px solid rgba(11,127,92,0.2)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="iiGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0B7F5C" />
                <stop offset="100%" stopColor="#3CBFA4" />
              </linearGradient>
            </defs>
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#iiGrad)" />
          </svg>
        </button>

        {/* App integrations */}
        <button className="p-2 rounded-lg hover:bg-[#E5E7EB] transition-colors" title="Integrations">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
        </button>

        {/* Settings */}
        <button className="p-2 rounded-lg hover:bg-[#E5E7EB] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.32 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-[#E5E7EB] transition-colors relative">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#D52B1E] rounded-full" />
        </button>

        {/* Help */}
        <button className="p-2 rounded-lg hover:bg-[#E5E7EB] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#0B7F5C] flex items-center justify-center ml-1 cursor-pointer">
          <span className="text-white text-[11px] font-bold">S</span>
        </div>
      </div>
    </header>
  );
}
