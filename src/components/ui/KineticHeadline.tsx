"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/motion";

type KineticHeadlineProps = {
  lines: string[];
  mobileLines?: string[];
  className?: string;
  delay?: number;
};

export function KineticHeadline({
  lines,
  mobileLines,
  className,
  delay = 0.18,
}: KineticHeadlineProps) {
  const prefersReducedMotion = useReducedMotion();

  function renderLines(displayLines: string[], keyPrefix: string) {
    let characterIndex = 0;

    return displayLines.map((line) => (
      <span key={`${keyPrefix}-${line}`} className="block pb-[0.16em]">
        {line.split(" ").map((word, wordIndex, words) => (
          <span
            key={`${keyPrefix}-${word}-${wordIndex}`}
            className="-mx-[0.08em] inline-block overflow-hidden px-[0.08em] align-bottom"
          >
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((character, index) => {
                const itemIndex = characterIndex++;
                return (
                  <motion.span
                    key={`${keyPrefix}-${character}-${index}`}
                    className="inline-block"
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: "115%" }
                    }
                    animate={{ opacity: 1, y: "0%" }}
                    transition={{
                      duration: 0.82,
                      ease: EASE_PREMIUM,
                      delay: delay + itemIndex * 0.018,
                    }}
                  >
                    {character}
                  </motion.span>
                );
              })}
            </span>
            {wordIndex < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </span>
    ));
  }

  return (
    <h1 aria-label={lines.join(" ")} className={cn(className, "-mb-[0.16em]")}>
      <span aria-hidden="true" className={mobileLines ? "sm:hidden" : undefined}>
        {renderLines(mobileLines ?? lines, "mobile")}
      </span>
      {mobileLines && (
        <span aria-hidden="true" className="hidden sm:block">
          {renderLines(lines, "desktop")}
        </span>
      )}
    </h1>
  );
}
