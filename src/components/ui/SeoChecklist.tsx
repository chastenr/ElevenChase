"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { SEO_CHECKLIST } from "@/data/seo-checklist";
import { EASE_PREMIUM } from "@/lib/motion";

export function SeoChecklist() {
  return (
    <div className="border border-line bg-ivory-soft font-mono text-sm">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="ml-3 text-xs text-muted">seo-engineering.log</span>
      </div>
      <ul className="flex flex-col gap-4 p-6">
        {SEO_CHECKLIST.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.4,
              ease: EASE_PREMIUM,
              delay: i * 0.12,
            }}
            className="flex items-center gap-3 text-ink-soft"
          >
            <Check
              size={14}
              className="shrink-0 text-accent"
              aria-hidden="true"
            />
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
