"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { EngineeringOrbit } from "@/components/ui/EngineeringOrbit";

export function OpeningSequence({ children }: { children: React.ReactNode }) {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sequenceRef,
    offset: ["start start", "end end"],
  });

  const orbitX = useTransform(scrollYProgress, [0, 0.78, 1], [0, 76, 104]);
  const orbitY = useTransform(scrollYProgress, [0, 0.78, 1], [0, 190, 250]);
  const orbitScale = useTransform(scrollYProgress, [0, 0.78, 1], [1, 0.94, 0.9]);
  const orbitOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 0.9, 1],
    [1, 0.92, 0.48, 0],
  );

  return (
    <div ref={sequenceRef} className="relative isolate">
      <div
        className="pointer-events-none absolute inset-0 z-20 overflow-x-clip"
        aria-hidden="true"
      >
        <motion.div
          data-testid="opening-orbit-motion"
          className="sticky top-0 h-[100svh] overflow-hidden text-white mix-blend-difference"
          style={
            prefersReducedMotion
              ? { opacity: 0.72 }
              : {
                  x: orbitX,
                  y: orbitY,
                  scale: orbitScale,
                  opacity: orbitOpacity,
                }
          }
        >
          <EngineeringOrbit />
        </motion.div>
      </div>
      {children}
    </div>
  );
}
