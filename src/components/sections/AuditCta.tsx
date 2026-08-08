"use client";

import { useActionState } from "react";
import { submitAuditRequest } from "@/lib/actions";
import type { ContactFormState } from "@/lib/contact-types";
import { IMPROVEMENT_AREAS } from "@/data/contact";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

const fieldClasses =
  "w-full border-b border-line bg-transparent py-3 text-base text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none transition-colors duration-200";

const initialState: ContactFormState = { status: "idle", message: "" };

export function AuditCta() {
  const [state, formAction, isPending] = useActionState(
    submitAuditRequest,
    initialState,
  );

  return (
    <section id="audit" className="border-y border-line py-16 md:py-24">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <SectionLabel>{"// Free audit"}</SectionLabel>
            <AnimatedText
              as="h2"
              lines={["Not sure what your", "website needs?"]}
              className="mt-5 text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.05] font-medium tracking-tight text-balance"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-lg text-muted">
                We&apos;ll look at your website&apos;s performance, technical
                foundation and search structure and tell you where the
                biggest opportunities are.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <form
              action={formAction}
              className="flex flex-col gap-6"
              noValidate
            >
              <div className="grid gap-6 sm:grid-cols-2">
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
                    Work email
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

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                    Company{" "}
                    <span className="normal-case text-muted/60">
                      (optional)
                    </span>
                  </span>
                  <input
                    type="text"
                    name="company"
                    autoComplete="organization"
                    className={fieldClasses}
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                    Website URL
                  </span>
                  <input
                    type="url"
                    name="website"
                    required
                    placeholder="https://"
                    className={fieldClasses}
                  />
                </label>
              </div>

              <fieldset className="flex flex-col gap-3">
                <legend className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                  What would you like to improve?
                </legend>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {IMPROVEMENT_AREAS.map((area) => (
                    <label
                      key={area}
                      className="flex items-center gap-2 text-sm text-ink-soft"
                    >
                      <input
                        type="checkbox"
                        name="improvementAreas"
                        value={area}
                        className="h-4 w-4 accent-accent"
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col items-start gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-accent disabled:opacity-50"
                >
                  {isPending ? "Sending…" : "Request an audit"}
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
