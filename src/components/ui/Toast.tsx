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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_PREMIUM }}
            onClick={onDismiss}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.94 }}
            transition={{ duration: 0.35, ease: EASE_PREMIUM }}
            className="relative flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl border border-line bg-ink px-8 py-9 text-center text-ivory shadow-2xl"
          >
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss"
              className="absolute top-4 right-4 text-ivory/50 transition-colors hover:text-ivory"
            >
              <X size={16} />
            </button>

            {tone === "success" ? (
              <CheckCircle2 className="text-accent" size={40} />
            ) : (
              <AlertCircle className="text-red-400" size={40} />
            )}
            <p className="text-base leading-relaxed">{message}</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
