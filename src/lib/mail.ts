export type ContactPayload = {
  formType: "project" | "audit";
  name: string;
  email: string;
  company?: string;
  website?: string;
  projectType?: string;
  budget?: string;
  improvementAreas?: string;
  message?: string;
};

const RESEND_API_URL = "https://api.resend.com/emails";

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
    console.warn(
      "[contact] RESEND_API_KEY / CONTACT_EMAIL_TO not set, skipping email delivery.",
      payload,
    );
    return { delivered: false as const };
  }

  const subject =
    payload.formType === "audit"
      ? `New audit request: ${payload.name}`
      : `New project inquiry: ${payload.name}`;

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
        payload.budget ? `Budget: ${payload.budget}` : null,
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
    console.error("[contact] Resend API error", res.status, await res.text());
    return { delivered: false as const };
  }

  return { delivered: true as const };
}
