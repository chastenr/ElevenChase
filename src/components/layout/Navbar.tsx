"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/site";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 border-b transition-all duration-500", scrolled || open ? "border-line bg-ivory/90 py-4 backdrop-blur-xl" : "border-transparent bg-transparent py-6")}>
      <Container className="flex items-center justify-between">
        <Link href="/#top" className="flex min-h-11 items-center gap-2.5 font-mono text-xs tracking-[0.12em]">
          <Image src="/logo-mark-white.png" alt="" width={24} height={24} priority className="h-6 w-6 invert dark:invert-0" aria-hidden="true" />
          ELEVENCHASE
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          <nav className="flex items-center gap-7" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-muted transition-colors hover:text-ink">{link.label}</Link>
            ))}
          </nav>
          <ThemeToggle className="min-h-11 min-w-11" />
          <Link href="/#contact" className="group inline-flex min-h-11 items-center gap-2 border border-ink bg-ink px-5 text-sm text-ivory transition-colors hover:bg-transparent hover:text-ink">
            Start a project <AnimatedArrow />
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle className="min-h-11 min-w-11" />
          <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex min-h-11 min-w-11 items-center justify-center" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu">
            {open ? <X size={21} aria-hidden /> : <Menu size={21} aria-hidden />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={prefersReducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE_PREMIUM }} className="fixed inset-x-0 top-[77px] h-[calc(100svh-77px)] border-t border-line bg-ivory lg:hidden">
            <Container className="flex h-full flex-col justify-between py-8">
              <nav className="flex flex-col" aria-label="Mobile">
                {NAV_LINKS.map((link, index) => (
                  <motion.div key={link.href} initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: EASE_PREMIUM, delay: index * 0.04 }}>
                    <Link href={link.href} onClick={() => setOpen(false)} className="flex min-h-16 items-center justify-between border-b border-line text-[clamp(1.75rem,8vw,2.5rem)] tracking-tight">
                      {link.label}<span className="font-mono text-xs text-muted">0{index + 1}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="border-t border-line pt-6">
                <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Have something worth building?</p>
                <Link href="/#contact" onClick={() => setOpen(false)} className="mt-4 inline-flex min-h-11 items-center gap-2 text-lg">Start a project <AnimatedArrow /></Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
