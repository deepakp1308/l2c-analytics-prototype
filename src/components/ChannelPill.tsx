"use client";
import { ChannelLogo } from "./ChannelLogo";

export function ChannelPill({ channelKey, name, color, active, onClick }: {
  channelKey: string; name: string; color: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all shrink-0"
      style={{
        backgroundColor: active ? color + "12" : "#FFFFFF",
        borderColor: active ? color : "#E5E7EB",
        color: active ? color : "#9CA3AF",
      }}
    >
      <ChannelLogo channel={channelKey} size={16} />
      {name}
    </button>
  );
}
