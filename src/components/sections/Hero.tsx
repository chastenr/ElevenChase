"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { ServiceTicker } from "@/components/ui/ServiceTicker";
import { Container } from "@/components/ui/Container";
import { EASE_PREMIUM, HERO_STAGGER_DELAYS } from "@/lib/motion";
import { SITE } from "@/data/site";

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
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 pb-6 md:pt-28 md:pb-8"
    >
      <Container className="flex flex-1 flex-col justify-center gap-8 md:gap-10">
        <motion.p
          {...fadeUp(HERO_STAGGER_DELAYS.label)}
          className="font-mono text-xs tracking-[0.18em] text-muted uppercase"
        >
          ElevenChase // Software + AI Engineering
        </motion.p>

        <AnimatedText
          as="h1"
          trigger="mount"
          delay={HERO_STAGGER_DELAYS.headline}
          lines={["We build the software", "ambitious companies", "run on."]}
          className="text-[clamp(2.25rem,4.5vw,4.75rem)] leading-[1.05] font-medium tracking-tight text-balance"
        />

        <motion.p
          {...fadeUp(HERO_STAGGER_DELAYS.paragraph)}
          className="max-w-xl text-lg text-muted md:text-xl"
        >
          We design, build and scale software, AI systems and
          high-performance digital experiences, from first idea to
          production.
        </motion.p>

        <motion.div
          {...fadeUp(HERO_STAGGER_DELAYS.paragraph + 0.05)}
          className="font-mono text-xs tracking-[0.14em] text-muted uppercase"
        >
          Building <ServiceTicker className="text-ink" /> for ambitious
          companies
        </motion.div>

        <motion.div
          {...fadeUp(HERO_STAGGER_DELAYS.cta)}
          className="flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <MagneticLink
            href="/#contact"
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-accent"
          >
            Start a project
            <AnimatedArrow className="ml-2" />
          </MagneticLink>

          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
          >
            Explore our work
            <AnimatedArrow />
          </Link>

          <Link
            href="/#audit"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-ink"
          >
            Get a website audit
            <AnimatedArrow />
          </Link>
        </motion.div>
      </Container>

      <motion.div
        {...fadeUp(HERO_STAGGER_DELAYS.meta)}
        className="border-t border-line"
      >
        <Container className="flex items-center justify-between py-5 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
          <span>Software · AI · Web · SEO</span>
          <span className="hidden sm:inline">
            {SITE.location} / {SITE.availability}
          </span>
        </Container>
      </motion.div>
    </section>
  );
}
