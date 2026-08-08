"use client";

import { useRef, type CSSProperties } from "react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect || !sectionRef.current) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    sectionRef.current.style.setProperty("--mx", `${x}%`);
    sectionRef.current.style.setProperty("--my", `${y}%`);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden bg-ink py-20 text-ivory md:py-28"
      style={{ "--mx": "50%", "--my": "40%" } as CSSProperties}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--color-ivory) 14%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-ivory) 14%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(380px circle at var(--mx) var(--my), black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(380px circle at var(--mx) var(--my), black 0%, transparent 70%)",
        }}
      />

      <Container className="relative flex flex-col items-start gap-10">
        <AnimatedText
          as="h2"
          lines={["Have something", "worth building?"]}
          className="max-w-3xl text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] font-medium tracking-tight text-balance"
        />

        <Reveal delay={0.1}>
          <p className="max-w-md text-lg text-ivory/60">
            Tell us what you&apos;re building. We&apos;ll reply with a clear
            next step: what it would take to build, and how we&apos;d
            approach it.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <MagneticLink
            href="/#contact"
            className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-ivory hover:text-ink"
          >
            Start a project
            <AnimatedArrow className="ml-2" />
          </MagneticLink>
        </Reveal>
      </Container>
    </section>
  );
}
