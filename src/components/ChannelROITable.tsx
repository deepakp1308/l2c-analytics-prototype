"use client";
import { ChannelLogo } from "./ChannelLogo";

type Row = {
  channelKey: string;
  channelName: string;
  conversions: number;
  revenue: string;
  cost: string;
  timeToConvert: string;
  roi: string;
  roiPositive: boolean;
};

const DATA: Row[] = [
  { channelKey: "meta",      channelName: "Meta",       conversions: 12, revenue: "$38,400", cost: "$8,000",  timeToConvert: "8 days",  roi: "4.8x", roiPositive: true },
  { channelKey: "googleAds", channelName: "Google Ads",  conversions: 6,  revenue: "$28,600", cost: "$9,200",  timeToConvert: "12 days", roi: "3.1x", roiPositive: true },
  { channelKey: "email",     channelName: "Email",       conversions: 8,  revenue: "$8,200",  cost: "$1,200",  timeToConvert: "18 days", roi: "6.8x", roiPositive: true },
  { channelKey: "whatsapp",  channelName: "WhatsApp",    conversions: 4,  revenue: "$6,800",  cost: "$600",    timeToConvert: "5 days",  roi: "11.3x", roiPositive: true },
  { channelKey: "sms",       channelName: "SMS",         conversions: 2,  revenue: "$2,400",  cost: "$800",    timeToConvert: "6 days",  roi: "3.0x", roiPositive: true },
  { channelKey: "linkedin",  channelName: "LinkedIn",    conversions: 5,  revenue: "$12,600", cost: "$4,800",  timeToConvert: "15 days", roi: "2.6x", roiPositive: true },
  { channelKey: "tiktok",    channelName: "TikTok",      conversions: 3,  revenue: "$4,200",  cost: "$3,400",  timeToConvert: "22 days", roi: "1.2x", roiPositive: false },
];

export function ChannelROITable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#E5E7EB]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#F3F4F6] border-b border-[#E5E7EB]">
            {["Channel", "Conversions", "Revenue", "Cost", "Time to Convert", "ROI"].map(h => (
              <th key={h} className="text-left px-4 py-2.5 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DATA.map(row => (
            <tr key={row.channelKey} className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#F3F4F6] transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <ChannelLogo channel={row.channelKey} size={24} />
                  <span className="text-[13px] font-medium text-[#22262A]">{row.channelName}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-[13px] text-[#22262A]">{row.conversions}</td>
              <td className="px-4 py-3 text-[13px] font-semibold text-[#22262A]">{row.revenue}</td>
              <td className="px-4 py-3 text-[13px] text-[#6B7280]">{row.cost}</td>
              <td className="px-4 py-3 text-[13px] text-[#6B7280]">{row.timeToConvert}</td>
              <td className="px-4 py-3">
                <span className={`text-[13px] font-bold ${row.roiPositive ? "text-[#108000]" : "text-[#D52B1E]"}`}>
                  {row.roiPositive ? "▲" : "▼"} {row.roi}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
