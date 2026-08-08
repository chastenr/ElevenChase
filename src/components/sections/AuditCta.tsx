"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitAuditRequest } from "@/lib/actions";
import type { ContactFormState } from "@/lib/contact-types";
import { IMPROVEMENT_AREAS } from "@/data/contact";
import {
  HONEYPOT_FIELD_NAME,
  TIMESTAMP_FIELD_NAME,
  EMAIL_PATTERN,
  FIELD_LIMITS,
  isSafeHttpUrl,
} from "@/lib/form-security";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { Toast } from "@/components/ui/Toast";

const fieldClasses =
  "w-full border-b border-line bg-transparent py-3 text-base text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none transition-colors duration-200";

const initialState: ContactFormState = { status: "idle", message: "" };

export function AuditCta() {
  const [state, formAction, isPending] = useActionState(
    submitAuditRequest,
    initialState,
  );
  const mountTimeRef = useRef<number | null>(null);
  const timestampInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [improvementAreas, setImprovementAreas] = useState<string[]>([]);

  // Track the previous action result so a fresh result (even one with the
  // same status/message as before) re-opens the toast and, on success,
  // clears the form. Adjusting state during render like this — rather than
  // in an effect — is React's recommended way to react to a changed value
  // without an extra render/flash. See "You Might Not Need an Effect."
  const [prevState, setPrevState] = useState(state);
  const [toastDismissed, setToastDismissed] = useState(false);
  if (state !== prevState) {
    setPrevState(state);
    setToastDismissed(false);
    if (state.status === "success") {
      setName("");
      setEmail("");
      setCompany("");
      setWebsite("");
      setImprovementAreas([]);
    }
  }
  const toastOpen = state.status !== "idle" && !toastDismissed;

  useEffect(() => {
    if (!toastOpen) return;
    const timer = setTimeout(() => setToastDismissed(true), 5000);
    return () => clearTimeout(timer);
  }, [toastOpen, state]);

  const isValid =
    name.trim().length > 0 &&
    EMAIL_PATTERN.test(email.trim()) &&
    isSafeHttpUrl(website.trim());

  function toggleImprovementArea(area: string) {
    setImprovementAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    );
  }

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
              onSubmit={() => {
                if (timestampInputRef.current) {
                  timestampInputRef.current.value = String(
                    mountTimeRef.current ?? Date.now(),
                  );
                }
              }}
              className="flex flex-col gap-6"
              noValidate
            >
              <div
                aria-hidden="true"
                className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
              >
                <label htmlFor="hp_field_audit">Leave this field empty</label>
                <input
                  id="hp_field_audit"
                  type="text"
                  name={HONEYPOT_FIELD_NAME}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <input
                ref={timestampInputRef}
                type="hidden"
                name={TIMESTAMP_FIELD_NAME}
                defaultValue=""
              />

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
                    maxLength={FIELD_LIMITS.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    maxLength={FIELD_LIMITS.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    maxLength={FIELD_LIMITS.company}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
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
                    maxLength={FIELD_LIMITS.website}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
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
                        checked={improvementAreas.includes(area)}
                        onChange={() => toggleImprovementArea(area)}
                        className="h-4 w-4 accent-accent"
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col items-start gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isPending || !isValid}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ink"
                >
                  {isPending ? "Sending…" : "Request an audit"}
                  <AnimatedArrow />
                </button>

                {!isValid && (
                  <p className="text-xs text-muted">
                    Fill in your name, email and website URL to continue.
                  </p>
                )}

                {isValid && state.status === "error" && (
                  <p role="status" className="text-sm text-red-600 dark:text-red-400">
                    {state.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>

      <Toast
        show={toastOpen}
        message={state.message}
        tone={state.status === "error" ? "error" : "success"}
        onDismiss={() => setToastDismissed(true)}
      />
    </section>
  );
}
