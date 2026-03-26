"use client";

export function AIAgentCard({
  agentName,
  message,
  actions,
}: {
  agentName: string;
  message: string;
  actions?: { label: string; primary?: boolean }[];
}) {
  return (
    <div className="ai-glow rounded-lg bg-white border border-[var(--qb-green)]/20 p-4 mt-4 fade-in-up">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-[var(--qb-green)] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
            <path d="M9 14h6l2 8H7l2-8z" />
          </svg>
        </div>
        <span className="text-xs font-semibold text-[var(--qb-green)] uppercase tracking-wide">
          AI Agent: {agentName}
        </span>
      </div>
      <p className="text-sm text-[var(--qb-dark)] leading-relaxed whitespace-pre-line">
        {message}
      </p>
      {actions && actions.length > 0 && (
        <div className="flex gap-2 mt-3">
          {actions.map((a) => (
            <button
              key={a.label}
              className={`text-xs font-medium px-3 py-1.5 rounded ${
                a.primary
                  ? "bg-[var(--qb-green)] text-white hover:bg-[var(--qb-green-dark)]"
                  : "border border-[var(--qb-border)] text-[var(--qb-dark)] hover:bg-[var(--qb-gray-bg)]"
              } transition-colors`}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
