import "server-only";

/**
 * Hand-written HTML email templates (table-based layout, inline styles
 * only) rather than a React/JSX email framework — there are only two
 * templates, so a templating dependency isn't warranted. Table layout +
 * inline styles is the standard approach for compatibility across Gmail,
 * Apple Mail, and Outlook's Word-based rendering engine.
 */

const BRAND = {
  ivory: "#f7f6f1",
  ink: "#111110",
  inkSoft: "#2c2b27",
  muted: "#75746c",
  mutedSoft: "#96938a",
  line: "#dedad0",
  white: "#ffffff",
  fontStack:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

const LOGO_URL = "https://www.elevenchase.com/logo-mark.png";
const SITE_URL = "https://www.elevenchase.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Renders \n-separated plain text as safe, styled HTML paragraphs. */
function renderParagraphs(text: string, style: string) {
  return text
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => `<p style="margin:0 0 16px 0;${style}">${escapeHtml(line)}</p>`)
    .join("");
}

function emailShell(bodyHtml: string, preheader: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>ElevenChase</title>
</head>
<body style="margin:0; padding:0; background-color:${BRAND.ivory}; font-family:${BRAND.fontStack};">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.ivory};">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:${BRAND.white}; border:1px solid ${BRAND.line}; border-radius:12px;">
          ${bodyHtml}
        </table>
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">
          <tr>
            <td style="padding: 20px 24px; text-align:center; font-size:12px; color:${BRAND.mutedSoft}; font-family:${BRAND.fontStack};">
              ElevenChase &mdash; Websites &middot; Software &middot; AI Systems
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderCustomerConfirmationEmail({ name }: { name: string }) {
  const firstName = name.trim().split(/\s+/)[0] || "there";
  const safeFirstName = escapeHtml(firstName);

  const body = `
    <tr>
      <td style="padding: 36px 40px 0 40px;">
        <img src="${LOGO_URL}" width="28" height="28" alt="ElevenChase" style="display:block; border:0;">
      </td>
    </tr>
    <tr>
      <td style="padding: 24px 40px 0 40px; font-family:${BRAND.fontStack};">
        <h1 style="margin:0; font-size:26px; line-height:1.25; font-weight:600; color:${BRAND.ink};">Project request received.</h1>
        <p style="margin:10px 0 0 0; font-size:16px; color:${BRAND.muted};">Thanks for reaching out to ElevenChase.</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 24px 40px 0 40px; font-size:16px; line-height:1.6; color:${BRAND.inkSoft}; font-family:${BRAND.fontStack};">
        <p style="margin:0 0 16px 0;">Hi ${safeFirstName},</p>
        <p style="margin:0 0 16px 0;">We&rsquo;ve successfully received your project request and our team will review the details you submitted.</p>
        <p style="margin:0;">We&rsquo;ll get back to you as soon as possible with the next steps.</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 28px 40px 0 40px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BRAND.line}; border-bottom:1px solid ${BRAND.line};">
          <tr>
            <td style="padding: 20px 0 4px 0; font-family:${BRAND.fontStack};">
              <p style="margin:0; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:${BRAND.muted};">What happens next?</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0 20px 0; font-family:${BRAND.fontStack};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding:6px 0; font-size:15px; line-height:1.5; color:${BRAND.inkSoft};">1.&nbsp; We review your project requirements.</td></tr>
                <tr><td style="padding:6px 0; font-size:15px; line-height:1.5; color:${BRAND.inkSoft};">2.&nbsp; We&rsquo;ll contact you if we need any additional information.</td></tr>
                <tr><td style="padding:6px 0; font-size:15px; line-height:1.5; color:${BRAND.inkSoft};">3.&nbsp; If the project looks like a good fit, we&rsquo;ll schedule a discovery call to discuss your goals, timeline, and budget.</td></tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 24px 40px 0 40px; font-size:16px; line-height:1.6; color:${BRAND.inkSoft}; font-family:${BRAND.fontStack};">
        <p style="margin:0 0 16px 0;">If you need to add anything to your request, simply reply to this email.</p>
        <p style="margin:0;">Thank you for considering ElevenChase.</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 24px 40px 0 40px;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="border-radius:999px; background-color:${BRAND.ink};">
              <a href="${SITE_URL}" style="display:inline-block; padding:12px 26px; font-size:14px; font-weight:500; color:${BRAND.ivory}; text-decoration:none; border-radius:999px; font-family:${BRAND.fontStack};">Visit ElevenChase</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px 40px 36px 40px; margin-top:24px; border-top:1px solid ${BRAND.line}; font-family:${BRAND.fontStack};">
        <p style="margin:24px 0 4px 0; font-size:14px; color:${BRAND.ink}; font-weight:500;">Chasten Ramirez</p>
        <p style="margin:0 0 12px 0; font-size:14px; color:${BRAND.muted};">Founder, ElevenChase</p>
        <p style="margin:0; font-size:13px; color:${BRAND.muted};">
          <a href="mailto:chase@elevenchase.com" style="color:${BRAND.muted}; text-decoration:underline;">chase@elevenchase.com</a>
          &nbsp;&middot;&nbsp;
          <a href="${SITE_URL}" style="color:${BRAND.muted}; text-decoration:underline;">elevenchase.com</a>
        </p>
      </td>
    </tr>`;

  return emailShell(body, "We've received your project request and will follow up shortly.");
}

export function renderAdminNotificationEmail({
  name,
  email,
  company,
  website,
  projectType,
  budget,
  timeline,
  message,
}: {
  name: string;
  email: string;
  company?: string;
  website?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
}) {
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
  ];
  if (company) rows.push(["Company", company]);
  if (website) rows.push(["Website", website]);
  if (projectType) rows.push(["Project type", projectType]);
  if (budget) rows.push(["Budget", budget]);
  if (timeline) rows.push(["Timeline", timeline]);

  const rowsHtml = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 16px 8px 0; font-size:13px; color:${BRAND.muted}; white-space:nowrap; vertical-align:top; font-family:${BRAND.fontStack};">${escapeHtml(label)}</td>
        <td style="padding:8px 0; font-size:15px; color:${BRAND.ink}; font-family:${BRAND.fontStack};">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join("");

  const body = `
    <tr>
      <td style="padding: 32px 40px 0 40px; font-family:${BRAND.fontStack};">
        <p style="margin:0; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:${BRAND.muted};">New project inquiry</p>
        <h1 style="margin:8px 0 0 0; font-size:22px; line-height:1.3; font-weight:600; color:${BRAND.ink};">${escapeHtml(name)}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 40px 0 40px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BRAND.line}; padding-top:4px;">
          ${rowsHtml}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 40px 0 40px; font-family:${BRAND.fontStack};">
        <p style="margin:0 0 8px 0; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:${BRAND.muted};">Message</p>
        <div style="font-size:15px; line-height:1.6; color:${BRAND.inkSoft};">
          ${renderParagraphs(message, "")}
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 40px 32px 40px; border-top:1px solid ${BRAND.line}; margin-top:16px; font-family:${BRAND.fontStack};">
        <p style="margin:16px 0 0 0; font-size:14px; color:${BRAND.muted};">Reply to <a href="mailto:${escapeHtml(email)}" style="color:${BRAND.ink}; text-decoration:underline;">${escapeHtml(email)}</a></p>
      </td>
    </tr>`;

  return emailShell(body, `New project inquiry from ${name}`);
}
