"use client";

import { useReducedMotion } from "motion/react";
import { TECH_STACK } from "@/data/tech";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function TechStrip() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="border-y border-line py-24 md:py-32"
      aria-label="Technology"
    >
      <Container>
        <SectionLabel>{"// Stack"}</SectionLabel>
        <Reveal><h2 className="mt-6 max-w-4xl text-[clamp(2.5rem,5vw,4.75rem)] leading-[1] font-medium tracking-[-0.045em]">Tools are chosen<br />for the problem.</h2></Reveal>
        <Reveal delay={0.1}><p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">We work primarily with modern web, cloud and AI infrastructure, but architecture follows the product rather than the other way around.</p></Reveal>

        {prefersReducedMotion && (
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm tracking-[0.06em] text-muted uppercase">
            {TECH_STACK.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        )}
      </Container>

      {!prefersReducedMotion && (
        <div className="relative mt-14 overflow-hidden">
          <div
            className={cn(
              "flex w-max gap-12 px-6 font-mono text-sm tracking-[0.06em] text-muted uppercase md:px-10 lg:px-16",
              "animate-[marquee-scroll_36s_linear_infinite] hover:[animation-play-state:paused]",
            )}
          >
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <span key={`${tech}-${i}`} className="whitespace-nowrap">
                {tech}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ivory to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ivory to-transparent md:w-24" />
        </div>
      )}
    </section>
  );
}
