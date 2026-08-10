"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_PREMIUM } from "@/lib/motion";
import { cn } from "@/lib/utils";

const WORDS = ["Software", "AI", "Automation", "Web", "SEO", "Platforms"];
const LONGEST_WORD = WORDS.reduce((a, b) => (b.length > a.length ? b : a));

export function ServiceTicker({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, 1800);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <div className={cn("inline-flex items-baseline gap-2", className)}>
      <span className="sr-only">{WORDS.join(", ")}</span>
      {prefersReducedMotion ? (
        <span aria-hidden="true">{WORDS.join(" · ")}</span>
      ) : (
        <span
          aria-hidden="true"
          className="relative inline-block h-[1.2em] overflow-hidden align-baseline"
        >
          {/* Invisible in-flow text so this box gets a real baseline and
              a real width from actual glyphs, instead of the browser
              falling back to a synthetic bottom-edge baseline and a
              guessed fixed width for the absolutely-positioned word below. */}
          <span className="invisible whitespace-nowrap">{LONGEST_WORD}</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={WORDS[index]}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE_PREMIUM }}
              className="absolute inset-0 block"
            >
              {WORDS[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      )}
    </div>
  );
}
