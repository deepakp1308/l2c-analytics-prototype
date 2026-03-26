"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const primaryNav = [
  { href: "/", label: "Dashboard", icon: "dashboard" },
  { href: "/sales", label: "Sales", icon: "sales" },
  { href: "/cashflow", label: "Cash flow", icon: "cashflow" },
];

const secondaryNav = [
  { label: "Invoicing", icon: "invoicing" },
  { label: "Expenses", icon: "expenses" },
  { label: "Banking", icon: "banking" },
  { label: "Projects", icon: "projects" },
  { label: "Payroll", icon: "payroll" },
  { label: "Reports", icon: "reports" },
  { label: "Taxes", icon: "taxes" },
];

function Icon({ name, size = 18, color = "#8C9BA5" }: { name: string; size?: number; color?: string }) {
  const s = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "dashboard": return <svg {...s}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>;
    case "sales": return <svg {...s}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
    case "cashflow": return <svg {...s}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
    case "invoicing": return <svg {...s}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
    case "expenses": return <svg {...s}><path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"/><line x1="2" y1="10" x2="22" y2="10"/></svg>;
    case "banking": return <svg {...s}><rect x="2" y="10" width="20" height="11" rx="1"/><path d="M12 2L2 10h20L12 2z"/></svg>;
    case "projects": return <svg {...s}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>;
    case "payroll": return <svg {...s}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    case "reports": return <svg {...s}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
    case "taxes": return <svg {...s}><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>;
    default: return <svg {...s}><circle cx="12" cy="12" r="10"/></svg>;
  }
}

export function QBOSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[56px] hover:w-[220px] group bg-[#0D333F] h-screen flex flex-col transition-all duration-200 overflow-hidden shrink-0 z-30">
      {/* QB Logo */}
      <div className="px-3 flex items-center gap-2.5 h-[52px] border-b border-white/10 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-[#2CA01C] flex items-center justify-center shrink-0">
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path d="M6.5 11L2 6.5L3.41 5.09L6.5 8.17L14.59 0.09L16 1.5L6.5 11Z" fill="white"/>
          </svg>
        </div>
        <span className="text-white text-[14px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          QuickBooks
        </span>
      </div>

      {/* Primary Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        <div className="space-y-0.5 px-1.5">
          {primaryNav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 ${
                  active
                    ? "bg-[#055393] text-white"
                    : "text-[#8C9BA5] hover:bg-[#164050] hover:text-[#C8D5DB]"
                }`}
              >
                <div className="shrink-0 w-5 flex items-center justify-center">
                  <Icon name={item.icon} size={18} color={active ? "#FFFFFF" : "#8C9BA5"} />
                </div>
                <span className="text-[13px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="h-px bg-white/10 mx-3 my-3" />

        <div className="space-y-0.5 px-1.5">
          {secondaryNav.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#5D686F] hover:bg-[#164050] hover:text-[#8C9BA5] cursor-default transition-all duration-150"
            >
              <div className="shrink-0 w-5 flex items-center justify-center">
                <Icon name={item.icon} size={16} color="#5D686F" />
              </div>
              <span className="text-[12px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </nav>

      {/* Help */}
      <div className="px-3 py-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-1.5 text-[#5D686F]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span className="text-[12px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">Help</span>
        </div>
      </div>
    </aside>
  );
}
