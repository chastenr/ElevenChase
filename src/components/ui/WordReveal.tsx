"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/motion";

type WordRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
};

export function WordReveal({
  text,
  as: Tag = "p",
  className,
}: WordRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return <Tag className={className} data-i18n-heading>{text}</Tag>;
  }

  return (
    <Tag className={cn(className)} aria-label={text} data-i18n-heading>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.42 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.035 } },
        }}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block"
            variants={{
              hidden: { opacity: 0.14, y: 8 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.62, ease: EASE_PREMIUM }}
          >
            {word}
            {index < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
