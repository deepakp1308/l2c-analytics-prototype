"use client";
import Link from "next/link";

export function SceneHeader({
  sceneNumber,
  time,
  title,
  subtitle,
  stage,
  stageColor,
}: {
  sceneNumber: number;
  time: string;
  title: string;
  subtitle: string;
  stage: string;
  stageColor: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
            style={{ backgroundColor: stageColor + "18", color: stageColor }}
          >
            {stage}
          </span>
          <span className="text-sm text-[var(--qb-gray)]">{time}</span>
        </div>
        <div className="flex gap-2">
          {sceneNumber > 1 && (
            <Link
              href={`/scene/${sceneNumber - 1}`}
              className="text-xs px-3 py-1.5 rounded border border-[var(--qb-border)] text-[var(--qb-gray)] hover:bg-[var(--qb-gray-bg)] transition-colors"
            >
              ← Previous
            </Link>
          )}
          {sceneNumber < 9 && (
            <Link
              href={`/scene/${sceneNumber + 1}`}
              className="text-xs px-3 py-1.5 rounded bg-[var(--qb-green)] text-white hover:bg-[var(--qb-green-dark)] transition-colors"
            >
              Next →
            </Link>
          )}
        </div>
      </div>
      <h1 className="text-xl font-bold text-[var(--qb-dark)]">
        Scene {sceneNumber}: {title}
      </h1>
      <p className="text-sm text-[var(--qb-gray)] mt-1">{subtitle}</p>
    </div>
  );
}
