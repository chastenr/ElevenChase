"use client";

import { useReducedMotion } from "motion/react";
import { ACTIVITY_ITEMS } from "@/data/activity";
import { cn } from "@/lib/utils";

export function ActivityFeed() {
  const prefersReducedMotion = useReducedMotion();
  const items = prefersReducedMotion
    ? ACTIVITY_ITEMS
    : [...ACTIVITY_ITEMS, ...ACTIVITY_ITEMS];

  return (
    <div className="relative h-[420px] overflow-hidden border border-line bg-ivory-soft">
      <div
        tabIndex={0}
        className={cn(
          "flex flex-col focus:outline-none",
          !prefersReducedMotion &&
            "animate-[activity-scroll_32s_linear_infinite] hover:[animation-play-state:paused] focus-visible:[animation-play-state:paused]",
        )}
      >
        {items.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="flex items-center justify-between gap-4 border-b border-line px-6 py-4"
          >
            <span className="text-sm text-ink">{item.label}</span>
            <span className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
              {item.category}
            </span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ivory-soft to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ivory-soft to-transparent" />
    </div>
  );
}
