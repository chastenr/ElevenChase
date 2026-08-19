"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

const STEPS = [
  {
    label: "Input",
    number: "01",
    title: "The problem enters the system.",
    description:
      "We start with the operation as it exists today — the people, constraints and systems that shape the real problem.",
    items: ["Business problem", "Users", "Current systems", "Operational constraints"],
  },
  {
    label: "Engineering",
    number: "02",
    title: "The work becomes an architecture.",
    description:
      "Strategy, product decisions and engineering move together until the right system is clear enough to build.",
    items: ["Strategy", "Architecture", "Design", "Development", "AI", "Automation"],
  },
  {
    label: "Output",
    number: "03",
    title: "The system leaves ready for production.",
    description:
      "The result is working software tied to a measurable operational improvement, with infrastructure that can keep scaling.",
    items: ["Working software", "Measurable improvement", "Scalable infrastructure"],
  },
] as const;

const TEETH = Array.from({ length: 20 }, (_, index) => index * 18);

function GearField({ rotation }: { rotation: MotionValue<number> | number }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,246,241,0.045)_0,transparent_58%)]" />
      <motion.div
        className="absolute top-[46%] left-1/2 aspect-square w-[min(1120px,108vw)] -translate-x-1/2 -translate-y-1/2"
        style={{ rotate: rotation }}
      >
        <svg viewBox="0 0 800 800" fill="none" className="size-full text-[#f7f6f1]">
          <circle cx="400" cy="400" r="269" stroke="currentColor" strokeOpacity="0.13" strokeWidth="2" />
          <circle cx="400" cy="400" r="190" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.5" />
          <circle cx="400" cy="400" r="72" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
          {TEETH.map((rotationValue) => (
            <path
              key={rotationValue}
              d="M372 86 L428 86 L438 143 L427 166 L373 166 L362 143 Z"
              stroke="currentColor"
              strokeOpacity="0.28"
              strokeWidth="2.2"
              transform={`rotate(${rotationValue} 400 400)`}
            />
          ))}
          {Array.from({ length: 10 }, (_, index) => (
            <line
              key={index}
              x1="400"
              y1="210"
              x2="400"
              y2="328"
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="1.5"
              transform={`rotate(${index * 36} 400 400)`}
            />
          ))}
          <circle cx="400" cy="400" r="13" stroke="currentColor" strokeOpacity="0.32" strokeWidth="2" />
          <circle cx="400" cy="400" r="4" fill="currentColor" fillOpacity="0.62" />
        </svg>
      </motion.div>
      <div className="absolute -bottom-[23vw] -left-[13vw] aspect-square w-[42vw] min-w-72 rounded-full border border-white/10" />
      <div className="absolute -right-[13vw] -bottom-[23vw] aspect-square w-[42vw] min-w-72 rounded-full border border-white/10" />
    </div>
  );
}

export function TechnicalDiagram() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const gearRotation = useTransform(scrollYProgress, [0, 1], [0, 92]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [28, -28]);

  return (
    <section ref={sectionRef} className="relative bg-[#0e0e0d] text-[#f7f6f1]">
      <div className="sticky top-0 h-[100svh] overflow-hidden border-y border-white/10">
        <motion.div
          className="absolute inset-0"
          style={prefersReducedMotion ? undefined : { y: backgroundY }}
        >
          <GearField rotation={prefersReducedMotion ? 0 : gearRotation} />
        </motion.div>

        <Container className="relative z-10 flex h-full flex-col py-20 md:py-24">
          <div className="flex items-start justify-between gap-8">
            <SectionLabel light className="!text-white/50">{"// How ElevenChase thinks"}</SectionLabel>
            <span className="hidden font-mono text-[10px] tracking-[0.16em] text-white/35 uppercase sm:block">
              Scroll sequence / 03
            </span>
          </div>
          <h2 className="mt-6 max-w-4xl text-[clamp(2.35rem,6vw,6.5rem)] leading-[0.94] font-medium tracking-[-0.055em]">
            From friction to
            <br /> production software.
          </h2>
          <div className="mt-auto flex items-end justify-between gap-6 border-t border-white/12 pt-4">
            <p className="max-w-xl font-mono text-[9px] tracking-[0.12em] text-white/42 uppercase md:text-[10px]">
              Fig. 01 — Turning operational problems into production software.
            </p>
            <span className="font-mono text-[9px] tracking-[0.14em] text-white/35 uppercase md:text-[10px]">
              01 — 03
            </span>
          </div>
        </Container>
      </div>

      <div className="relative z-10 -mt-[100svh]">
        <Container>
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="flex h-[100svh] items-end pt-72 pb-24 md:pt-80 md:pb-28"
            >
              <article className="engineering-step-card relative mx-auto w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/18 bg-[#121211]/94 shadow-[0_30px_90px_rgba(0,0,0,0.38)] backdrop-blur-sm md:rounded-[2rem]">
                <div className="absolute top-0 left-0 h-px w-full bg-white/75" />
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-10 md:py-7">
                  <span className="font-mono text-sm tracking-[0.16em] text-white/68 uppercase md:text-base">
                    {step.number} / {step.label}
                  </span>
                  <span className="flex size-11 items-center justify-center rounded-full border border-white/20 md:size-14">
                    <span className="engineering-signal size-2 rounded-full bg-white/80" />
                  </span>
                </div>
                <div className="grid min-h-[310px] gap-9 px-6 py-8 md:min-h-[340px] md:grid-cols-[1.55fr_0.75fr] md:gap-16 md:px-10 md:py-10">
                  <div>
                    <h3 className="max-w-2xl text-[clamp(1.75rem,3.2vw,3.25rem)] leading-[1.04] tracking-[-0.04em]">
                      {step.title}
                    </h3>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/58 md:text-xl">
                      {step.description}
                    </p>
                  </div>
                  <ul className="border-t border-white/12 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-8">
                    {step.items.map((item) => (
                      <li
                        key={item}
                        className="border-b border-white/10 py-2.5 font-mono text-[10px] tracking-[0.12em] text-white/58 uppercase md:text-[11px]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}
