"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const scenes = [
  { id: 1, time: "7:30 AM", title: "Campaign Analytics", stage: "GET PROSPECTS" },
  { id: 2, time: "8:45 AM", title: "Ad-to-Cash Attribution", stage: "GET PROSPECTS" },
  { id: 3, time: "10:00 AM", title: "Lead Funnel & Scoring", stage: "GET PROSPECTS" },
  { id: 4, time: "11:00 AM", title: "Pipeline Health", stage: "WIN CUSTOMERS" },
  { id: 5, time: "1:30 PM", title: "Proposal Performance", stage: "WIN CUSTOMERS" },
  { id: 6, time: "2:15 PM", title: "Contract-to-Cash", stage: "WIN CUSTOMERS" },
  { id: 7, time: "3:00 PM", title: "Project Profitability", stage: "GET PAID" },
  { id: 8, time: "3:45 PM", title: "Payment Velocity", stage: "GET PAID" },
  { id: 9, time: "5:00 PM", title: "L2C Intelligence", stage: "E2E INTELLIGENCE" },
];

const stageColors: Record<string, string> = {
  "GET PROSPECTS": "var(--qb-blue)",
  "WIN CUSTOMERS": "var(--qb-green)",
  "GET PAID": "var(--qb-orange)",
  "E2E INTELLIGENCE": "var(--qb-purple)",
};

export function Sidebar() {
  const pathname = usePathname();
  let lastStage = "";

  return (
    <aside className="w-64 bg-white border-r border-[var(--qb-border)] h-screen overflow-y-auto flex flex-col shrink-0">
      {/* QB Logo */}
      <div className="p-4 border-b border-[var(--qb-border)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[var(--qb-green)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">QB</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--qb-dark)]">QuickBooks</p>
            <p className="text-[10px] text-[var(--qb-gray)]">L2C Analytics</p>
          </div>
        </div>
      </div>

      {/* Maria Profile */}
      <div className="p-4 border-b border-[var(--qb-border)] bg-[var(--qb-gray-bg)]">
        <p className="text-xs font-semibold text-[var(--qb-dark)]">Maria Santos</p>
        <p className="text-[10px] text-[var(--qb-gray)]">Santos Design & Build</p>
        <p className="text-[10px] text-[var(--qb-gray)]">Austin, TX · $1.2M Revenue</p>
      </div>

      {/* Scene Navigation */}
      <nav className="flex-1 p-2">
        {scenes.map((scene) => {
          const isActive = pathname === `/scene/${scene.id}`;
          const showStage = scene.stage !== lastStage;
          lastStage = scene.stage;

          return (
            <div key={scene.id}>
              {showStage && (
                <div className="flex items-center gap-2 px-2 pt-3 pb-1">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: stageColors[scene.stage] }}
                  />
                  <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: stageColors[scene.stage] }}>
                    {scene.stage}
                  </span>
                </div>
              )}
              <Link
                href={`/scene/${scene.id}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs transition-colors ${
                  isActive
                    ? "bg-[var(--qb-green-light)] text-[var(--qb-green-dark)] font-semibold"
                    : "text-[var(--qb-dark)] hover:bg-[var(--qb-gray-bg)]"
                }`}
              >
                <span className="text-[10px] text-[var(--qb-gray)] w-12 shrink-0">{scene.time}</span>
                <span className="truncate">{scene.title}</span>
              </Link>
            </div>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[var(--qb-border)]">
        <p className="text-[9px] text-[var(--qb-gray-light)] text-center">
          A Day in the Life · L2C Customer Storyboard
        </p>
      </div>
    </aside>
  );
}
