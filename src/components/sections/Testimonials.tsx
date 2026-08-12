"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { TESTIMONIALS } from "@/data/testimonials";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (
      isPaused ||
      isInteracting ||
      prefersReducedMotion ||
      TESTIMONIALS.length < 2
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isInteracting, isPaused, prefersReducedMotion]);

  if (TESTIMONIALS.length === 0) return null;

  const testimonial = TESTIMONIALS[activeIndex];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-16 md:py-24"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocus={() => setIsInteracting(true)}
      onBlur={() => setIsInteracting(false)}
    >
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-4xl">
            <SectionLabel>{"// Client feedback"}</SectionLabel>
            <AnimatedText
              as="h2"
              id="testimonials-heading"
              lines={["See why businesses", "choose ElevenChase."]}
              className="mt-5 text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] font-medium tracking-tight text-balance"
            />
          </div>

          {!prefersReducedMotion && (
            <button
              type="button"
              onClick={() => setIsPaused((paused) => !paused)}
              aria-pressed={isPaused}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[0.6875rem] tracking-wider text-muted uppercase transition-colors hover:border-line-strong hover:text-ink"
            >
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${
                  isPaused ? "bg-muted" : "bg-accent"
                }`}
              />
              {isPaused ? "Play feedback" : "Pause feedback"}
            </button>
          )}
        </div>

        <Reveal className="mt-10 md:mt-14">
          <figure className="relative grid min-h-[24rem] overflow-hidden border border-line md:grid-cols-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
                className="flex flex-col justify-between gap-12 p-6 sm:p-8 md:col-span-9 md:min-h-[30rem] md:p-12 lg:p-16"
              >
                <div>
                  {testimonial.isPlaceholder && (
                    <span className="inline-flex rounded-full border border-line bg-ivory px-3 py-1 font-mono text-[0.625rem] tracking-wider text-muted uppercase">
                      Feedback pending approval
                    </span>
                  )}
                  <blockquote
                    id="active-testimonial"
                    className={`max-w-4xl text-[clamp(1.4rem,2.6vw,2.35rem)] leading-[1.3] tracking-tight text-pretty text-ink-soft ${
                      testimonial.isPlaceholder ? "mt-6" : ""
                    }`}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>

                <figcaption className="flex items-center gap-4">
                  {testimonial.photo && (
                    <div className="shrink-0 overflow-hidden rounded-full border border-line bg-ivory-soft">
                      <Image
                        src={testimonial.photo}
                        alt="Placeholder portrait for the client testimonial"
                        width={56}
                        height={56}
                        className="h-14 w-14 object-cover grayscale"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-ink">{testimonial.name}</p>
                    <p className="mt-0.5 text-sm text-muted">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </figcaption>
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-4 border-t border-line bg-ivory-soft md:col-span-3 md:grid-cols-2 md:grid-rows-4 md:border-t-0 md:border-l">
              {TESTIMONIALS.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={`${item.name}-${index}`}
                    type="button"
                    onClick={() => {
                      setActiveIndex(index);
                      setIsPaused(true);
                    }}
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-pressed={isActive}
                    aria-controls="active-testimonial"
                    className={`group flex min-h-24 items-center justify-center border-r border-b border-line p-3 transition-colors hover:bg-ivory focus-visible:z-10 md:min-h-0 ${
                      isActive ? "bg-ivory" : "bg-ivory-soft"
                    }`}
                  >
                    <span
                      className={`rounded-full border p-1.5 transition-all ${
                        isActive
                          ? "scale-105 border-line-strong bg-ivory shadow-sm"
                          : "border-transparent grayscale group-hover:grayscale-0"
                      }`}
                    >
                      <Image
                        src={item.photo ?? "/testimonial-placeholder.svg"}
                        alt=""
                        width={56}
                        height={56}
                        className="h-11 w-11 rounded-full object-cover md:h-12 md:w-12"
                      />
                    </span>
                  </button>
                );
              })}

              <div aria-hidden="true" className="hidden border-r border-b border-line md:block" />
            </div>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
