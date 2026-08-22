"use client";

import { useRef, type CSSProperties } from "react";
import { LocalizedLink as Link } from "@/components/ui/LocalizedLink";
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
      className="group relative overflow-hidden bg-ink py-28 text-ivory md:py-44"
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
        <p className="font-mono text-[11px] tracking-[0.18em] text-ivory/50 uppercase">Ready when you are</p>
        <AnimatedText
          as="h2"
          lines={["Have something", "worth building?"]}
          className="max-w-5xl text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.9] font-medium tracking-[-0.06em] text-balance"
        />

        <Reveal delay={0.1}>
          <p className="max-w-xl text-lg leading-relaxed text-ivory/60">
            Tell us what you&apos;re building. We&apos;ll reply with a clear
            next step: what it would take to build, and how we&apos;d
            approach it.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <MagneticLink
              href="/#contact"
              className="min-h-12 border border-ivory bg-ivory px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-transparent hover:text-ivory"
            >
              Start a project
              <AnimatedArrow className="ml-2" />
            </MagneticLink>

            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ivory/70 transition-colors duration-200 hover:text-ivory"
            >
              Book a discovery call
              <AnimatedArrow />
            </Link>
          </div>
        </Reveal>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[10px] tracking-[0.12em] text-ivory/40 uppercase">
          <p>No sales deck. No unnecessary calls. Just a clear next step.</p>
          <Link href="/faq" className="underline underline-offset-4 transition-colors hover:text-ivory">
            Questions first? Read the FAQ →
          </Link>
        </div>
      </Container>
    </section>
  );
}
