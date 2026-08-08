"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { EASE_PREMIUM } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FaqItemProps = {
  question: string;
  answer: string;
};

export function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-lg font-medium tracking-tight text-balance md:text-xl">
          {question}
        </span>
        <Plus
          size={20}
          aria-hidden="true"
          className={cn(
            "shrink-0 text-muted transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open && "rotate-45 text-ink",
          )}
        />
      </button>
      <motion.div
        id={panelId}
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: 0.35, ease: EASE_PREMIUM }}
        className="overflow-hidden"
      >
        <p className="max-w-2xl pb-6 text-muted">{answer}</p>
      </motion.div>
    </div>
  );
}
