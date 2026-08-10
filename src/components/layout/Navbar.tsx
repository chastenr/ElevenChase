"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS, SERVICES_NAV } from "@/data/site";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Container } from "@/components/ui/Container";
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
      <Container className="flex items-center justify-between">
        <Link
          href="/#top"
          className="flex items-center gap-2.5 font-mono text-sm tracking-[0.08em] whitespace-nowrap"
        >
          <Image
            src="/logo-mark.png"
            alt=""
            width={24}
            height={24}
            priority
            className="h-6 w-6"
            aria-hidden="true"
          />
          ELEVENCHASE
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8" aria-label="Primary">
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-muted transition-colors duration-200 hover:text-ink group-focus-within:text-ink"
              >
                Services
                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                />
              </button>

              <div className="pointer-events-none absolute top-full left-1/2 z-50 w-[560px] -translate-x-1/2 translate-y-1 pt-4 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="grid grid-cols-2 gap-1 border border-line bg-ivory p-2">
                  {SERVICES_NAV.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="flex flex-col gap-1 p-4 transition-colors duration-200 hover:bg-ink/5"
                    >
                      <span className="font-mono text-xs text-muted">
                        {service.index}
                      </span>
                      <span className="text-sm font-medium text-ink">
                        {service.label}
                      </span>
                      <span className="text-xs text-muted">
                        {service.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors duration-200 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/#contact"
            className="group inline-flex items-center gap-1.5 text-sm text-ink transition-colors duration-200 hover:text-accent"
          >
            Book a call
            <AnimatedArrow />
          </Link>

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
      </Container>

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
              className="flex max-h-[calc(100svh-5rem)] flex-col gap-1 overflow-y-auto px-6 py-6"
              aria-label="Mobile"
            >
              <p className="pt-2 font-mono text-xs tracking-[0.1em] text-muted uppercase">
                Services
              </p>
              {SERVICES_NAV.map((service, i) => (
                <motion.a
                  key={service.href}
                  href={service.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: EASE_PREMIUM,
                    delay: 0.04 * i,
                  }}
                  className="border-b border-line py-3 text-lg font-medium tracking-tight"
                >
                  {service.label}
                </motion.a>
              ))}

              <p className="pt-6 font-mono text-xs tracking-[0.1em] text-muted uppercase">
                Menu
              </p>
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
                    delay: 0.04 * i,
                  }}
                  className="border-b border-line py-3 text-lg font-medium tracking-tight"
                >
                  {link.label}
                </motion.a>
              ))}

              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="group mt-6 mb-2 inline-flex items-center gap-2 text-sm text-accent"
              >
                Book a call
                <AnimatedArrow />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
