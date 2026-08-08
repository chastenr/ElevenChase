"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/site";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";
import { EASE_PREMIUM, HERO_STAGGER_DELAYS } from "@/lib/motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={prefersReducedMotion ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: EASE_PREMIUM,
        delay: HERO_STAGGER_DELAYS.nav,
      }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-ivory transition-[padding,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled ? "border-line py-4" : "border-transparent py-6",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 md:px-10 lg:px-16">
        <a
          href="#top"
          className="font-mono text-sm tracking-[0.08em] whitespace-nowrap"
        >
          ELEVENCHASE
        </a>

        <div className="hidden items-center gap-10 md:flex">
          <nav className="flex items-center gap-8" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors duration-200 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 text-sm text-ink transition-colors duration-200 hover:text-accent"
          >
            Start a project
            <AnimatedArrow />
          </a>

          <ThemeToggle />
        </div>

        <div className="flex items-center gap-5 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE_PREMIUM }}
            className="overflow-hidden border-t border-line bg-ivory md:hidden"
          >
            <nav
              className="flex flex-col gap-1 px-6 py-6"
              aria-label="Mobile"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: EASE_PREMIUM,
                    delay: 0.05 * i,
                  }}
                  className="border-b border-line py-4 text-2xl font-medium tracking-tight"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="group mt-6 inline-flex items-center gap-2 text-sm text-ink"
              >
                Start a project
                <AnimatedArrow />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
