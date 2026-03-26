"use client";
import { useState } from "react";

export function QBOTopBar({ onToggleAssist }: { onToggleAssist?: () => void }) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="h-[52px] bg-white border-b border-[#E5E7EB] flex items-center justify-between px-4 shrink-0 z-20">
      {/* Left: Company name */}
      <div className="flex items-center gap-3 min-w-[180px]">
        <h2 className="text-[14px] font-semibold text-[#212B36] truncate">
          Santos Design & Build
        </h2>
      </div>

      {/* Center: Search */}
      <div className="flex-1 flex justify-center max-w-[480px] mx-4">
        <div
          className={`flex items-center gap-2 rounded-full px-4 py-[7px] w-full transition-all ${
            searchFocused
              ? "bg-white border border-[#0077C5] shadow-[0_0_0_2px_rgba(0,119,197,0.1)]"
              : "bg-[#F4F5F8] border border-transparent"
          }`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search transactions"
            className="bg-transparent text-[13px] text-[#212B36] placeholder-[#9CA3AF] outline-none w-full"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="text-[10px] text-[#9CA3AF] bg-white border border-[#E5E7EB] rounded px-1.5 py-0.5 font-mono hidden sm:inline-block">/</kbd>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {/* + New */}
        <button className="bg-[#2CA01C] hover:bg-[#1A8A0A] text-white text-[13px] font-semibold px-4 py-[6px] rounded transition-colors">
          + New
        </button>

        <div className="w-px h-6 bg-[#E5E7EB] mx-2" />

        {/* Intuit Assist */}
        <button
          onClick={onToggleAssist}
          className="flex items-center gap-1.5 px-3 py-[6px] rounded-full hover:bg-[#F5F3FF] transition-colors assist-glow"
          style={{ border: "1px solid rgba(108,92,231,0.2)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="assistGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6C5CE7" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#assistGrad)" />
          </svg>
          <span className="text-[12px] font-semibold intuit-assist-text hidden sm:inline">Intuit Assist</span>
        </button>

        <div className="w-px h-6 bg-[#E5E7EB] mx-1" />

        {/* Notifications */}
        <button className="p-2 rounded-full hover:bg-[#F4F5F8] transition-colors relative">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#D13B3B] rounded-full" />
        </button>

        {/* Settings */}
        <button className="p-2 rounded-full hover:bg-[#F4F5F8] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.32 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#2CA01C] flex items-center justify-center ml-1 cursor-pointer">
          <span className="text-white text-[11px] font-bold">MS</span>
        </div>
      </div>
    </header>
  );
}
