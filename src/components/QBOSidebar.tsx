"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

/* ─── Icon rail items (far left, always visible) ─── */
const RAIL_ITEMS = [
  { label: "Create", icon: "plus", href: "#" },
  { label: "Bookmarks", icon: "bookmark", href: "#" },
  { label: "Home", icon: "home", href: "/" },
  { label: "Inbox", icon: "inbox", href: "#", badge: 3 },
  { label: "Reports", icon: "reports", href: "#" },
];

/* ─── App categories (second column) ─── */
const APP_CATEGORIES = [
  {
    label: "Marketing",
    icon: "marketing",
    color: "#0B7F5C",
    href: "/",
    subItems: [
      { label: "L2C Intelligence", href: "/?scene=9" },
      { label: "Lead Funnel", href: "/?scene=3" },
      { label: "Ad Attribution", href: "/?scene=2" },
      { label: "Campaign ROI", href: "/?scene=1" },
    ],
  },
  {
    label: "Customer Hub",
    icon: "customer",
    color: "#3B82F6",
    href: "/sales",
    subItems: [
      { label: "Pipeline", href: "/sales?scene=4" },
      { label: "Proposals", href: "/sales?scene=5" },
      { label: "Contracts", href: "/sales?scene=6" },
    ],
  },
  {
    label: "Sales & Get Paid",
    icon: "sales",
    color: "#3B82F6",
    href: "/cashflow",
    subItems: [
      { label: "Project Margins", href: "/cashflow?scene=7" },
      { label: "Payments & Waterfall", href: "/cashflow?scene=8" },
    ],
  },
  {
    label: "Sales Tax",
    icon: "tax",
    color: "#EA580C",
    href: "#",
    subItems: [],
  },
];

function RailIcon({ name, size = 18, color = "#6B7280" }: { name: string; size?: number; color?: string }) {
  const s = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "plus": return <svg {...s}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
    case "bookmark": return <svg {...s}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>;
    case "home": return <svg {...s}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    case "inbox": return <svg {...s}><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>;
    case "reports": return <svg {...s}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
    case "appstore": return <svg {...s}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case "allapps": return <svg {...s}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case "customize": return <svg {...s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.32 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
    default: return <svg {...s}><circle cx="12" cy="12" r="10"/></svg>;
  }
}

function CategoryIcon({ name, color }: { name: string; color: string }) {
  const iconColor = "#FFFFFF";
  const s = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: iconColor, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "marketing": return <svg {...s}><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>;
    case "customer": return <svg {...s}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>;
    case "sales": return <svg {...s}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
    case "tax": return <svg {...s}><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>;
    default: return <svg {...s}><circle cx="12" cy="12" r="10"/></svg>;
  }
}

export function QBOSidebar() {
  const pathname = usePathname();
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Marketing");

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("?")[0]);
  };

  return (
    <div className="flex h-screen shrink-0 z-30">
      {/* ═══ Column 1: Icon Rail ═══ */}
      <aside className="w-[56px] bg-white border-r border-[#E5E7EB] flex flex-col items-center py-3 shrink-0">
        {/* Rail icons */}
        <div className="space-y-1">
          {RAIL_ITEMS.map((item) => {
            const active = item.href === "/" && pathname === "/";
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`w-10 h-10 flex flex-col items-center justify-center rounded-lg transition-colors relative ${
                  active ? "bg-[#E6F5F0] text-[#0B7F5C]" : "text-[#6B7280] hover:bg-[#F3F4F6]"
                }`}
                title={item.label}
              >
                <RailIcon name={item.icon} size={18} color={active ? "#0B7F5C" : "#6B7280"} />
                {item.badge && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] rounded-full bg-[#D52B1E] text-white text-[8px] font-bold flex items-center justify-center">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex-1" />

        {/* Bottom rail icons */}
        <div className="space-y-1">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] transition-colors" title="App Store">
            <RailIcon name="appstore" size={18} color="#6B7280" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] transition-colors" title="All Apps">
            <RailIcon name="allapps" size={18} color="#6B7280" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] transition-colors" title="Customize">
            <RailIcon name="customize" size={18} color="#6B7280" />
          </button>
        </div>

        {/* Rail labels (below icons) */}
        <div className="mt-1 space-y-0.5 text-center">
          {RAIL_ITEMS.map((item) => (
            <p key={item.label} className="text-[8px] text-[#9CA3AF] leading-none hidden">{item.label}</p>
          ))}
        </div>
      </aside>

      {/* ═══ Column 2: App Navigation Panel ═══ */}
      <aside className="w-[200px] bg-white border-r border-[#E5E7EB] flex flex-col overflow-hidden">
        {/* ALL APPS header */}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">All Apps</span>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-[#F3F4F6]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </button>
            <button className="p-1 rounded hover:bg-[#F3F4F6]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg>
            </button>
          </div>
        </div>

        {/* App categories */}
        <nav className="flex-1 overflow-y-auto px-2 space-y-0.5">
          {APP_CATEGORIES.map((cat) => {
            const catActive = isActive(cat.href);
            const expanded = expandedCategory === cat.label;

            return (
              <div key={cat.label}>
                {/* Category header */}
                <button
                  onClick={() => {
                    setExpandedCategory(expanded ? null : cat.label);
                  }}
                  className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left transition-colors ${
                    catActive ? "bg-[#E6F5F0]" : "hover:bg-[#F3F4F6]"
                  }`}
                >
                  <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: cat.color }}>
                    <CategoryIcon name={cat.icon} color={cat.color} />
                  </div>
                  <span className={`text-[13px] font-medium flex-1 ${catActive ? "text-[#0B7F5C]" : "text-[#22262A]"}`}>
                    {cat.label}
                  </span>
                  {cat.subItems.length > 0 && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" className={`transition-transform ${expanded ? "rotate-180" : ""}`}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  )}
                </button>

                {/* Sub-items */}
                {expanded && cat.subItems.length > 0 && (
                  <div className="ml-[34px] mt-0.5 space-y-0.5">
                    {cat.subItems.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block text-[13px] text-[#6B7280] hover:text-[#22262A] hover:bg-[#F3F4F6] px-2 py-1.5 rounded-md transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* UPGRADE section */}
        <div className="px-3 py-3 border-t border-[#E5E7EB]">
          <button className="w-full flex items-center gap-2 px-2 py-1.5 text-[12px] font-medium text-[#6B7280] hover:text-[#22262A] rounded-md hover:bg-[#F3F4F6] transition-colors">
            <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">UPGRADE</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>
      </aside>
    </div>
  );
}
