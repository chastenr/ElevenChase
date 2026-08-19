"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { KineticHeadline } from "@/components/ui/KineticHeadline";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { Container } from "@/components/ui/Container";
import { EASE_PREMIUM, HERO_STAGGER_DELAYS } from "@/lib/motion";
import { SITE } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: prefersReducedMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE_PREMIUM, delay },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 pb-0 md:pt-36"
    >
      <Container className="relative z-10 flex flex-1 flex-col justify-center py-12 md:py-16">
        <motion.p
          {...fadeUp(HERO_STAGGER_DELAYS.label)}
          className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase md:text-xs"
        >
          ElevenChase // Software + AI Engineering
        </motion.p>

        <KineticHeadline
          delay={HERO_STAGGER_DELAYS.headline}
          lines={["We build the software", "ambitious companies", "run on."]}
          mobileLines={["We build the", "software", "ambitious", "companies", "run on."]}
          className="mt-8 w-full min-w-0 max-w-[1280px] text-[clamp(2.85rem,13vw,3.4rem)] leading-[0.89] font-medium tracking-[-0.06em] text-balance sm:text-[clamp(3.25rem,8.25vw,7.5rem)] sm:tracking-[-0.065em]"
        />

        <motion.p
          {...fadeUp(HERO_STAGGER_DELAYS.paragraph)}
          className="mt-10 max-w-2xl text-lg leading-relaxed text-muted md:ml-auto md:text-xl"
        >
          Design, engineering and AI systems for companies building serious
          products, automating operations and scaling what already works.
        </motion.p>

        <motion.div
          {...fadeUp(HERO_STAGGER_DELAYS.cta)}
          className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 md:ml-auto md:w-2xl"
        >
          <MagneticLink
            href="/#contact"
            onClick={() => trackEvent("start_project")}
            className="min-h-11 border border-ink bg-ink px-6 py-3 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-transparent hover:text-ink"
          >
            Start a project
            <AnimatedArrow className="ml-2" />
          </MagneticLink>

          <Link
            href="/work"
            onClick={() => trackEvent("hero_view_work")}
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
          >
            See our work
            <AnimatedArrow />
          </Link>

        </motion.div>
      </Container>

      <motion.div
        {...fadeUp(HERO_STAGGER_DELAYS.meta)}
        className="border-t border-line"
      >
        <Container className="grid grid-cols-3 gap-0 py-0 font-mono text-[10px] tracking-[0.14em] text-muted uppercase sm:grid-cols-6 md:text-[11px]">
          {["Software", "AI", "Automation", "Web", "SEO", "Platforms"].map((item) => (
            <span key={item} className="border-r border-line px-2 py-4 text-center first:border-l sm:py-5">{item}</span>
          ))}
        </Container>
      </motion.div>
      <Container className="flex items-center justify-between py-4 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
        <span>Scroll to explore ↓</span>
        <span className="hidden sm:inline">{SITE.location} / {SITE.availability}</span>
      </Container>
    </section>
  );
}
