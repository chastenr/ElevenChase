"use client";

import { motion, type Variants } from "motion/react";
import { EASE_PREMIUM } from "@/lib/motion";

type RevealDirection = "up" | "down" | "left" | "right" | "none" | "scale";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  amount?: number;
};

function getVariants(direction: RevealDirection, distance: number): Variants {
  switch (direction) {
    case "up":
      return { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } };
    case "down":
      return { hidden: { opacity: 0, y: -distance }, visible: { opacity: 1, y: 0 } };
    case "left":
      return { hidden: { opacity: 0, x: distance }, visible: { opacity: 1, x: 0 } };
    case "right":
      return { hidden: { opacity: 0, x: -distance }, visible: { opacity: 1, x: 0 } };
    case "scale":
      return { hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1 } };
    default:
      return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  }
}

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 24,
  once = true,
  amount = 0.3,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={getVariants(direction, distance)}
      transition={{ duration, ease: EASE_PREMIUM, delay }}
    >
      {children}
    </motion.div>
  );
}
