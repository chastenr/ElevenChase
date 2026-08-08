"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { PROCESS_STEPS } from "@/data/process";
import { cn } from "@/lib/utils";

export function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = Math.min(
      PROCESS_STEPS.length - 1,
      Math.max(0, Math.floor(value * PROCESS_STEPS.length)),
    );
    setActive(index);
  });

  return (
    <div ref={containerRef}>
      {PROCESS_STEPS.map((step, i) => (
        <div
          key={step.index}
          className={cn(
            "border-t border-line py-8 transition-opacity duration-500 md:py-10",
            active === i ? "opacity-100" : "opacity-40",
          )}
        >
          <span className="font-mono text-sm text-accent">{step.index}</span>
          <h3 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
            {step.title}
          </h3>
          <p className="mt-4 max-w-md text-lg text-muted">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
