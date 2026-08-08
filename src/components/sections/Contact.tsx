"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/lib/actions";
import type { ContactFormState } from "@/lib/contact-types";
import { PROJECT_TYPES, BUDGET_RANGES } from "@/data/contact";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

const fieldClasses =
  "w-full border-b border-line bg-transparent py-3 text-lg text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none transition-colors duration-200";

const initialContactState: ContactFormState = { status: "idle", message: "" };

export function Contact() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialContactState,
  );

  return (
    <section id="contact" className="py-24 md:py-36">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <SectionLabel>{"// Contact"}</SectionLabel>
            <AnimatedText
              as="h2"
              lines={["Tell us about", "your project."]}
              className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] font-medium tracking-tight text-balance"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-lg text-muted">
                A few details are enough to get started. We&apos;ll reply
                with next steps.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <form action={formAction} className="flex flex-col gap-8" noValidate>
              <div className="grid gap-8 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    className={fieldClasses}
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className={fieldClasses}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                  Company{" "}
                  <span className="normal-case text-muted/60">(optional)</span>
                </span>
                <input
                  type="text"
                  name="company"
                  autoComplete="organization"
                  className={fieldClasses}
                />
              </label>

              <div className="grid gap-8 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                    Project type{" "}
                    <span className="normal-case text-muted/60">
                      (optional)
                    </span>
                  </span>
                  <select
                    name="projectType"
                    defaultValue=""
                    className={fieldClasses}
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                    Budget range{" "}
                    <span className="normal-case text-muted/60">
                      (optional)
                    </span>
                  </span>
                  <select
                    name="budget"
                    defaultValue=""
                    className={fieldClasses}
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    {BUDGET_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                  What are you building?
                </span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className={`${fieldClasses} resize-none`}
                />
              </label>

              <div className="flex flex-col items-start gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-accent disabled:opacity-50"
                >
                  {isPending ? "Sending…" : "Send inquiry"}
                  <AnimatedArrow />
                </button>

                {state.status !== "idle" && (
                  <p
                    role="status"
                    className={
                      state.status === "error"
                        ? "text-sm text-red-600 dark:text-red-400"
                        : "text-sm text-muted"
                    }
                  >
                    {state.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
