"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/motion";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
};

export function SectionLabel({
  children,
  className,
  light = false,
}: SectionLabelProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: EASE_PREMIUM }}
      className={cn(
        "font-mono text-xs tracking-[0.18em] uppercase",
        light ? "text-ivory/50" : "text-muted",
        className,
      )}
    >
      {children}
    </motion.p>
  );
}
