"use client";
import { useRouter, usePathname } from "next/navigation";

const scenes = [
  { id: 1, label: "Campaign ROI", page: "/", group: "Dashboard" },
  { id: 2, label: "Ad Attribution", page: "/", group: "Dashboard" },
  { id: 3, label: "Lead Funnel", page: "/", group: "Dashboard" },
  { id: 4, label: "Pipeline", page: "/sales", group: "Sales" },
  { id: 5, label: "Proposals", page: "/sales", group: "Sales" },
  { id: 6, label: "Contract→Cash", page: "/sales", group: "Sales" },
  { id: 7, label: "Profitability", page: "/cashflow", group: "Cash Flow" },
  { id: 8, label: "Payments", page: "/cashflow", group: "Cash Flow" },
  { id: 9, label: "L2C Intelligence", page: "/", group: "Dashboard" },
];

export function SceneTabs({ active, onChange }: { active: number; onChange: (id: number) => void }) {
  const router = useRouter();
  const pathname = usePathname();

  function handleClick(scene: (typeof scenes)[number]) {
    if (scene.page !== pathname) {
      router.push(scene.page + "?scene=" + scene.id);
    } else {
      onChange(scene.id);
    }
  }

  const groups = scenes.reduce((acc, s) => {
    if (!acc[s.group]) acc[s.group] = [];
    acc[s.group].push(s);
    return acc;
  }, {} as Record<string, typeof scenes>);

  return (
    <div className="fixed bottom-0 left-[56px] right-0 bg-white/95 backdrop-blur-sm border-t border-[#BABEC5] z-40">
      <div className="flex items-center h-10 px-3 overflow-x-auto gap-1">
        <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-widest px-1 shrink-0">Demo</span>
        <div className="w-px h-4 bg-[#BABEC5] mx-1" />
        {Object.entries(groups).map(([group, items]) => (
          <div key={group} className="flex items-center gap-0.5 shrink-0">
            <span className="text-[8px] font-bold text-[#8C8C8C] uppercase tracking-wider pl-1.5 pr-0.5">{group}</span>
            {items.map((s) => (
              <button
                key={s.id}
                onClick={() => handleClick(s)}
                className={`text-[11px] font-medium px-2 py-1 rounded transition-all ${
                  active === s.id
                    ? "bg-[#055393] text-white"
                    : "text-[#6B6C72] hover:bg-[#F4F4EF] hover:text-[#0D333F]"
                }`}
              >
                {s.id}. {s.label}
              </button>
            ))}
            <div className="w-px h-4 bg-[#BABEC5] mx-0.5" />
          </div>
        ))}
      </div>
    </div>
  );
}
