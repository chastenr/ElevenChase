"use client";

import { track } from "@vercel/analytics";

/**
 * Typed wrapper around Vercel Analytics' custom event tracking. Vercel
 * Analytics already auto-tracks pageviews (including every
 * /insights/[slug] visit) — these are only the conversion-funnel
 * events that aren't pageviews. No PII (name/email/message contents) is
 * ever included in an event payload.
 */
export type AnalyticsEvent =
  | "hero_book_call"
  | "start_project"
  | "project_form_started"
  | "project_form_submitted"
  | "marketing_opt_in_selected"
  | "audit_form_submitted";

export function trackEvent(event: AnalyticsEvent) {
  track(event);
}
