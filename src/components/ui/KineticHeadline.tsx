"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/motion";

type KineticHeadlineProps = {
  lines: string[];
  className?: string;
  delay?: number;
};

export function KineticHeadline({
  lines,
  className,
  delay = 0.18,
}: KineticHeadlineProps) {
  const prefersReducedMotion = useReducedMotion();
  let characterIndex = 0;

  return (
    <h1 aria-label={lines.join(" ")} className={cn(className, "-mb-[0.12em]")}>
      <span aria-hidden="true">
        {lines.map((line) => (
          <span key={line} className="block pb-[0.12em]">
            {line.split(" ").map((word, wordIndex, words) => (
              <span
                key={`${word}-${wordIndex}`}
                className="inline-block overflow-hidden align-bottom"
              >
                <span className="inline-block whitespace-nowrap">
                  {Array.from(word).map((character, index) => {
                    const itemIndex = characterIndex++;
                    return (
                      <motion.span
                        key={`${character}-${index}`}
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
        ))}
      </span>
    </h1>
  );
}
