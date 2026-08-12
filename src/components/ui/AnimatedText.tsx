"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/motion";

type AnimatedTextProps = {
  lines: string[];
  as?: ElementType;
  id?: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  trigger?: "mount" | "inView";
};

// The container (overflow-hidden mask) must stay put and host the
// viewport observation, since an IntersectionObserver clips its target's
// rect against overflow-hidden ancestors, so if the animated line
// itself (translated out of view) were the observed node, it would
// report zero intersection forever and whileInView would never fire.
const CONTAINER_VARIANTS: Variants = { hidden: {}, visible: {} };
const LINE_VARIANTS: Variants = { hidden: { y: "110%" }, visible: { y: "0%" } };

export function AnimatedText({
  lines,
  as: Tag = "div",
  id,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  trigger = "inView",
}: AnimatedTextProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <Tag id={id} className={className}>
        {lines.map((line, i) => (
          <span key={line + i} className={cn("block", lineClassName)}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  const containerProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "visible" as const }
      : {
          initial: "hidden",
          whileInView: "visible" as const,
          viewport: { once: true, amount: 0.4 },
        };

  return (
    // The tight leading used on these headings allocates less box height
    // than descenders (g/y/p/q/j) actually need, so at very large sizes the
    // reveal mask's overflow-hidden clips them. pb-[0.2em] on each mask
    // gives descenders room; -mb-[0.2em] here cancels the trailing line's
    // padding so spacing after the heading is unaffected.
    <Tag id={id} className={cn(className, "-mb-[0.2em]")}>
      {lines.map((line, i) => (
        <motion.span
          key={line + i}
          className="block overflow-hidden pb-[0.2em]"
          variants={CONTAINER_VARIANTS}
          {...containerProps}
        >
          <motion.span
            className={cn("block", lineClassName)}
            variants={LINE_VARIANTS}
            transition={{
              duration: 0.75,
              ease: EASE_PREMIUM,
              delay: delay + i * stagger,
            }}
          >
            {line as ReactNode}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
