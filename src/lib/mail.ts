import "server-only";
import {
  renderCustomerConfirmationEmail,
  renderAdminNotificationEmail,
} from "@/lib/email-templates";

export type ContactPayload = {
  formType: "project" | "audit";
  name: string;
  email: string;
  company?: string;
  website?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  improvementAreas?: string;
  message?: string;
};

export type SendResult =
  | { status: "sent" }
  | { status: "not_configured" }
  | { status: "failed" };

const RESEND_API_URL = "https://api.resend.com/emails";

/**
 * Strips characters that could be used for email header injection
 * (CRLF) if a field is ever placed into a header value such as the
 * subject line. Defense-in-depth: Resend's JSON API already treats
 * these as opaque string values, not raw header text.
 */
function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

type ResendEmail = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
};

async function sendViaResend(apiKey: string, email: ResendEmail) {
  const res = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: email.from,
      to: email.to,
      reply_to: email.replyTo,
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  });

  if (!res.ok) {
    // Log status only; the response body can echo back request fields
    // (including user-supplied text) and is not safe to log verbatim.
    console.error(`[contact] Resend API error, status=${res.status}`);
    return false;
  }
  return true;
}

function buildAdminText(payload: ContactPayload) {
  return [
    "NEW PROJECT INQUIRY",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : null,
    payload.website ? `Website: ${payload.website}` : null,
    payload.projectType ? `Project type: ${payload.projectType}` : null,
    payload.budget ? `Budget: ${payload.budget}` : null,
    payload.timeline ? `Timeline: ${payload.timeline}` : null,
    payload.improvementAreas
      ? `Wants to improve: ${payload.improvementAreas}`
      : null,
    "",
    payload.message ?? "",
    "",
    `Reply to ${payload.email}`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function buildCustomerText(name: string) {
  const firstName = name.trim().split(/\s+/)[0] || "there";
  return [
    `Hi ${firstName},`,
    "",
    "Thanks for reaching out to ElevenChase.",
    "",
    "We've successfully received your project request and our team will review the details you submitted.",
    "",
    "We'll get back to you as soon as possible with the next steps.",
    "",
    "What happens next?",
    "1. We review your project requirements.",
    "2. We'll contact you if we need any additional information.",
    "3. If the project looks like a good fit, we'll schedule a discovery call to discuss your goals, timeline, and budget.",
    "",
    "If you need to add anything to your request, simply reply to this email.",
    "",
    "Thank you for considering ElevenChase.",
    "",
    "Best,",
    "Chasten Ramirez",
    "Founder, ElevenChase",
    "chase@elevenchase.com",
    "https://www.elevenchase.com",
  ].join("\n");
}

/**
 * Sends the contact/audit form payload via Resend's HTTP API.
 * Configure RESEND_API_KEY and CONTACT_EMAIL_TO (and optionally
 * CONTACT_EMAIL_FROM) as environment variables to enable delivery.
 * Until then, submissions are logged server-side only.
 *
 * The default sender below uses elevenchase.com, a domain verified in
 * Resend (SPF/DKIM confirmed) — NOT Resend's onboarding@resend.dev test
 * address, which can only deliver to the Resend account's own signup
 * email and will reject any other recipient with a 403.
 *
 * Flow: send the internal admin notification first — that's the actual
 * business-critical capture of the lead. Only if that succeeds do we
 * attempt the customer confirmation (project inquiries only), and a
 * confirmation failure is logged but does NOT flip the overall result to
 * "failed". This matters operationally: if it did, the caller would show
 * the visitor an error and invite a retry, which would re-send a second
 * admin notification for the same inquiry the business already received.
 */
export async function sendContactNotification(
  payload: ContactPayload,
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from =
    process.env.CONTACT_EMAIL_FROM?.trim() || "ElevenChase <chase@elevenchase.com>";

  if (!apiKey || !to) {
    // Never log PII (name/email/message). Only log that delivery was skipped.
    console.warn(
      `[contact] RESEND_API_KEY / CONTACT_EMAIL_TO not set, skipping email delivery for formType=${payload.formType}.`,
    );
    return { status: "not_configured" };
  }

  const safeName = sanitizeHeaderValue(payload.name);
  const adminSubject =
    payload.formType === "audit"
      ? `New audit request: ${safeName}`
      : `New ElevenChase Project Inquiry — ${safeName}`;

  const adminSent = await sendViaResend(apiKey, {
    from,
    to,
    replyTo: payload.email,
    subject: adminSubject,
    text: buildAdminText(payload),
    html: renderAdminNotificationEmail({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      website: payload.website,
      projectType: payload.projectType,
      budget: payload.budget,
      timeline: payload.timeline,
      message: payload.message ?? payload.improvementAreas ?? "",
    }),
  });

  if (!adminSent) {
    return { status: "failed" };
  }

  if (payload.formType === "project") {
    const confirmationSent = await sendViaResend(apiKey, {
      from,
      to: payload.email,
      replyTo: to,
      subject: "We received your project request — ElevenChase",
      text: buildCustomerText(payload.name),
      html: renderCustomerConfirmationEmail({ name: payload.name }),
    });

    if (!confirmationSent) {
      // The lead is already safely captured via the admin email above;
      // log this so it can be followed up on manually, but don't fail
      // the submission over a best-effort courtesy email.
      console.error(
        "[contact] customer confirmation email failed after admin notification succeeded",
      );
    }
  }

  return { status: "sent" };
}
