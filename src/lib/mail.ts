import "server-only";

export type ContactPayload = {
  formType: "project" | "audit";
  name: string;
  email: string;
  company?: string;
  website?: string;
  projectType?: string;
  improvementAreas?: string;
  message?: string;
};

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

/**
 * Sends the contact/audit form payload via Resend's HTTP API.
 * Configure RESEND_API_KEY and CONTACT_EMAIL_TO (and optionally
 * CONTACT_EMAIL_FROM) as environment variables to enable delivery.
 * Until then, submissions are logged server-side only.
 */
export async function sendContactNotification(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM ?? "ElevenChase <onboarding@resend.dev>";

  if (!apiKey || !to) {
    // Never log PII (name/email/message). Only log that delivery was skipped.
    console.warn(
      `[contact] RESEND_API_KEY / CONTACT_EMAIL_TO not set, skipping email delivery for formType=${payload.formType}.`,
    );
    return { delivered: false as const };
  }

  const safeName = sanitizeHeaderValue(payload.name);
  const subject =
    payload.formType === "audit"
      ? `New audit request: ${safeName}`
      : `New project inquiry: ${safeName}`;

  const res = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        payload.company ? `Company: ${payload.company}` : null,
        payload.website ? `Website: ${payload.website}` : null,
        payload.projectType ? `Project type: ${payload.projectType}` : null,
        payload.improvementAreas
          ? `Wants to improve: ${payload.improvementAreas}`
          : null,
        "",
        payload.message ?? "",
      ]
        .filter(Boolean)
        .join("\n"),
    }),
  });

  if (!res.ok) {
    // Log status only; the response body can echo back request fields
    // (including user-supplied text) and is not safe to log verbatim.
    console.error(`[contact] Resend API error, status=${res.status}`);
    return { delivered: false as const };
  }

  return { delivered: true as const };
}
