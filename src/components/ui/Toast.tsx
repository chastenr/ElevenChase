"use client";

import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { EASE_PREMIUM } from "@/lib/motion";

type ToastTone = "success" | "error";

type ToastProps = {
  show: boolean;
  message: string;
  tone?: ToastTone;
  onDismiss: () => void;
};

export function Toast({ show, message, tone = "success", onDismiss }: ToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.35, ease: EASE_PREMIUM }}
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto flex max-w-md items-start gap-3 rounded-2xl border border-line bg-ink px-5 py-4 text-ivory shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-6"
        >
          {tone === "success" ? (
            <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={20} />
          ) : (
            <AlertCircle className="mt-0.5 shrink-0 text-red-400" size={20} />
          )}
          <p className="flex-1 text-sm leading-snug">{message}</p>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="shrink-0 text-ivory/60 transition-colors hover:text-ivory"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
