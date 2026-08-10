"use client";

import { track } from "@vercel/analytics";

/**
 * Typed wrapper around Vercel Analytics' custom event tracking. Vercel
 * Analytics already auto-tracks pageviews (including every /work/[slug]
 * and /insights/[slug] visit) — these are only the conversion-funnel
 * events that aren't pageviews. No PII (name/email/message contents) is
 * ever included in an event payload.
 */
export type AnalyticsEvent =
  | "hero_book_call"
  | "hero_view_work"
  | "start_project"
  | "project_form_started"
  | "project_form_submitted"
  | "audit_form_submitted";

export function trackEvent(event: AnalyticsEvent) {
  track(event);
}
