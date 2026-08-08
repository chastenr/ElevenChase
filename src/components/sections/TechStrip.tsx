"use client";

import { useReducedMotion } from "motion/react";
import { TECH_STACK } from "@/data/tech";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function TechStrip() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="border-y border-line py-12 md:py-14"
      aria-label="Technology"
    >
      <Container>
        <Reveal>
          <p className="max-w-2xl text-2xl leading-snug font-medium tracking-tight text-balance md:text-3xl">
            &ldquo;Technology should serve the product, not the other way
            around.&rdquo;
          </p>
        </Reveal>

        {prefersReducedMotion && (
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm tracking-[0.06em] text-muted uppercase">
            {TECH_STACK.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        )}
      </Container>

      {!prefersReducedMotion && (
        <div className="relative mt-8 overflow-hidden">
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
