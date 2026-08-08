"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContactForm } from "@/lib/actions";
import type { ContactFormState } from "@/lib/contact-types";
import { PROJECT_TYPES } from "@/data/contact";
import {
  HONEYPOT_FIELD_NAME,
  TIMESTAMP_FIELD_NAME,
  EMAIL_PATTERN,
  FIELD_LIMITS,
} from "@/lib/form-security";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { Toast } from "@/components/ui/Toast";

const fieldClasses =
  "w-full border-b border-line bg-transparent py-3 text-lg text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none transition-colors duration-200";

const initialContactState: ContactFormState = { status: "idle", message: "" };

export function Contact() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialContactState,
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
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");

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
      setProjectType("");
      setMessage("");
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
    message.trim().length > 0;

  return (
    <section id="contact" className="py-16 md:py-24">
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
            <form
              action={formAction}
              onSubmit={() => {
                if (timestampInputRef.current) {
                  timestampInputRef.current.value = String(
                    mountTimeRef.current ?? Date.now(),
                  );
                }
              }}
              className="flex flex-col gap-8"
              noValidate
            >
              <div
                aria-hidden="true"
                className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
              >
                <label htmlFor="hp_field_contact">Leave this field empty</label>
                <input
                  id="hp_field_contact"
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
                    maxLength={FIELD_LIMITS.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    maxLength={FIELD_LIMITS.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={fieldClasses}
                  />
                </label>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
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
                    Website{" "}
                    <span className="normal-case text-muted/60">
                      (optional)
                    </span>
                  </span>
                  <input
                    type="url"
                    name="website"
                    placeholder="https://"
                    maxLength={FIELD_LIMITS.website}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className={fieldClasses}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                  What do you need?{" "}
                  <span className="normal-case text-muted/60">
                    (optional)
                  </span>
                </span>
                <select
                  name="projectType"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
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
                  Project details
                </span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="What are you building?"
                  maxLength={FIELD_LIMITS.message}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${fieldClasses} resize-none`}
                />
              </label>

              <div className="flex flex-col items-start gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isPending || !isValid}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ink"
                >
                  {isPending ? "Sending…" : "Start the conversation"}
                  <AnimatedArrow />
                </button>

                {!isValid && (
                  <p className="text-xs text-muted">
                    Fill in your name, email and project details to continue.
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
