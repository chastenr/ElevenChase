import { z } from "zod";
// Relative import (not the "@/" alias) so this module can be loaded
// directly by a plain Node test runner without a bundler/path resolver.
import {
  PROJECT_TYPES,
  IMPROVEMENT_AREAS,
  BUDGET_RANGES,
  TIMELINES,
} from "../data/contact.ts";

/**
 * Pure, framework-independent contact-form validation and bot-detection
 * logic. Deliberately has no Next.js/server-only imports so it can be
 * unit-tested directly with a plain test runner and shared between the
 * "use client" form components (constants only) and the "use server"
 * Server Actions (schemas + isBotSubmission).
 */

export const HONEYPOT_FIELD_NAME = "hp_field";
export const TIMESTAMP_FIELD_NAME = "formRenderedAt";
export const MIN_SUBMIT_MS = 1500;

export function isBotSubmission(formData: FormData): boolean {
  const honeypot = String(formData.get(HONEYPOT_FIELD_NAME) ?? "").trim();
  if (honeypot.length > 0) return true;

  const startedAtRaw = formData.get(TIMESTAMP_FIELD_NAME);
  const startedAt = Number(startedAtRaw);
  if (!startedAtRaw || !Number.isFinite(startedAt) || startedAt <= 0) {
    return true;
  }

  const elapsed = Date.now() - startedAt;
  return elapsed < MIN_SUBMIT_MS;
}

// Disallow all C0 control characters (including CR/LF) in single-line fields.
const SINGLE_LINE_PATTERN = /^[^\x00-\x1F\x7F]*$/;
// Multi-line fields may contain \t, \n, \r but no other control characters.
const MULTI_LINE_PATTERN = /^[^\x00-\x08\x0B\x0C\x0E-\x1F\x7F]*$/;

// Exported so form components can run the same lightweight check
// client-side (to disable the submit button) without duplicating it. The
// server-side Zod schemas below remain the actual security boundary.
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  company: 150,
  website: 2048,
  message: 5000,
} as const;

export function isSafeHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const nameSchema = z
  .string()
  .trim()
  .min(1, "Please fill in your name, email and a short description.")
  .max(100, "Name is too long.")
  .regex(SINGLE_LINE_PATTERN, "Name contains invalid characters.");

const emailSchema = z
  .string()
  .trim()
  .min(1, "Please enter a valid email address.")
  .max(254, "Email is too long.")
  .regex(EMAIL_PATTERN, "Please enter a valid email address.");

const optionalCompanySchema = z
  .string()
  .trim()
  .max(150, "Company name is too long.")
  .regex(SINGLE_LINE_PATTERN, "Company contains invalid characters.")
  .optional()
  .or(z.literal(""));

const optionalWebsiteSchema = z
  .string()
  .trim()
  .max(2048, "Website URL is too long.")
  .refine(
    (value) => value === "" || isSafeHttpUrl(value),
    "Please enter a valid website URL.",
  )
  .optional()
  .or(z.literal(""));

const requiredWebsiteSchema = z
  .string()
  .trim()
  .min(1, "Please fill in your name, email and website URL.")
  .max(2048, "Website URL is too long.")
  .refine(isSafeHttpUrl, "Please enter a valid website URL.");

const messageSchema = z
  .string()
  .trim()
  .min(1, "Please fill in your name, email and a short description.")
  .max(5000, "Message is too long.")
  .regex(MULTI_LINE_PATTERN, "Message contains invalid characters.");

const optionalProjectTypeSchema = z
  .enum(PROJECT_TYPES)
  .optional()
  .or(z.literal(""));

const optionalBudgetSchema = z
  .enum(BUDGET_RANGES)
  .optional()
  .or(z.literal(""));

const optionalTimelineSchema = z
  .enum(TIMELINES)
  .optional()
  .or(z.literal(""));

const improvementAreaSchema = z.enum(IMPROVEMENT_AREAS);

// The form sends an explicit string because native FormData has no boolean
// type. Only these two exact values are accepted at the server boundary.
const marketingOptInSchema = z
  .enum(["true", "false"])
  .transform((value) => value === "true");

export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  company: optionalCompanySchema,
  website: optionalWebsiteSchema,
  projectType: optionalProjectTypeSchema,
  budget: optionalBudgetSchema,
  timeline: optionalTimelineSchema,
  message: messageSchema,
  marketingOptIn: marketingOptInSchema,
});

export const auditSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  company: optionalCompanySchema,
  website: requiredWebsiteSchema,
  improvementAreas: z.array(improvementAreaSchema).max(IMPROVEMENT_AREAS.length),
});
