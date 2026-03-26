"use client";

const channels: Record<string, { color: string; initial: string }> = {
  email:     { color: "#055393", initial: "E" },
  sms:       { color: "#108000", initial: "S" },
  whatsapp:  { color: "#25D366", initial: "W" },
  googleAds: { color: "#EA4335", initial: "G" },
  meta:      { color: "#1877F2", initial: "M" },
  tiktok:    { color: "#000000", initial: "T" },
  linkedin:  { color: "#0A66C2", initial: "L" },
};

export function ChannelLogo({ channel, size = 20 }: { channel: string; size?: number }) {
  const cfg = channels[channel] || { color: "#8C8C8C", initial: "?" };
  const fontSize = Math.round(size * 0.48);

  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0"
      style={{ width: size, height: size, backgroundColor: cfg.color }}
    >
      <span style={{ fontSize, lineHeight: 1, color: "#FFFFFF", fontWeight: 700 }}>{cfg.initial}</span>
    </div>
  );
}

export const CHANNEL_CONFIG = [
  { key: "email",     name: "Email",      color: "#055393" },
  { key: "sms",       name: "SMS",        color: "#108000" },
  { key: "whatsapp",  name: "WhatsApp",   color: "#25D366" },
  { key: "googleAds", name: "Google Ads", color: "#EA4335" },
  { key: "meta",      name: "Meta",       color: "#1877F2" },
  { key: "tiktok",    name: "TikTok",     color: "#000000" },
  { key: "linkedin",  name: "LinkedIn",   color: "#0A66C2" },
];
