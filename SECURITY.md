# Security

This document describes the security architecture of the ElevenChase
marketing site (Next.js App Router, deployed on Vercel) and the policies
that keep it that way.

## 1. Security architecture

ElevenChase is a static/server-rendered marketing site with a small,
deliberately narrow backend surface:

- No database, no authentication system, no admin panel, no user accounts.
- No API routes and no middleware/proxy.
- Exactly two Server Actions (`submitContactForm`, `submitAuditRequest` in
  [`src/lib/actions.ts`](src/lib/actions.ts)) are the only way client input
  reaches the server.
- The only outbound network call from server code is to Resend's email API
  ([`src/lib/mail.ts`](src/lib/mail.ts)), used to notify a fixed, developer
  configured recipient of a form submission. User input is never rendered
  back into any page — it only ever becomes plain text in an outbound email.

This keeps the attack surface small: there is nowhere in the app that
renders attacker-controlled data into HTML, and nothing resembling a
classic injection sink (no raw SQL, no `exec`/`spawn`, no `eval`).

## 2. Environment variable policy

- Real secrets live in `.env.local`, which is gitignored (`.env*` is
  excluded in [`.gitignore`](.gitignore)) and has never been committed to
  git history.
- [`.env.example`](.env.example) documents the required variables with
  placeholder values only — copy it to `.env.local` and fill in real values.
- No `NEXT_PUBLIC_*` environment variables are defined. Nothing in
  `process.env` is ever passed to a Client Component.
- [`src/lib/mail.ts`](src/lib/mail.ts) — the only module that reads secret
  environment variables — starts with `import "server-only"`, so it is a
  build-time error for any Client Component to ever import it.
- Required variables: `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, and the
  optional `CONTACT_EMAIL_FROM`. The email recipient (`to`) and sender
  (`from`) are always taken from environment variables, never from user
  input.

## 3. Contact form protection

Both forms (`Contact.tsx`, `AuditCta.tsx`) submit to Server Actions that
validate everything server-side using [Zod](https://zod.dev) schemas
defined in [`src/lib/form-security.ts`](src/lib/form-security.ts):

- Length limits: name ≤ 100, email ≤ 254, company ≤ 150, message ≤ 5000,
  website URL ≤ 2048 characters.
- `projectType` / `improvementAreas` must match a fixed enum
  ([`src/data/contact.ts`](src/data/contact.ts)) — arbitrary/tampered
  values are rejected.
- Single-line fields (name, company) reject all control characters,
  including CR/LF, as defense-in-depth against email header injection.
  The email subject line is additionally sanitized in `mail.ts` before use.
- Website URLs must parse as `http:`/`https:` — `javascript:`, `data:`,
  `file:` and other schemes are rejected.
- Fields not defined in the schema are never read or forwarded to the
  outbound email, regardless of what a request includes.
- The email recipient/sender are fixed server-side values (see §2); the
  only user-controlled email header is `Reply-To`, which Resend treats as
  an opaque value, not raw header text.

## 4. Authentication / authorization

This is a public marketing site with no accounts, no admin routes, and no
authenticated areas — so there is intentionally no login system, no
session/cookie-based auth, and no authorization middleware. Adding any of
that would be unnecessary attack surface for a site that has nothing to
protect behind a login. If an admin area is ever added, it must be
deny-by-default and independently authorized — do not assume obscurity
(an unlinked route) is protection.

## 5. HTTP security headers

Set globally in [`next.config.ts`](next.config.ts) via `headers()`:

| Header | Value |
| --- | --- |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests` |
| `X-Frame-Options` | `DENY` (legacy defense-in-depth alongside `frame-ancestors`) |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera, microphone, geolocation, payment, usb and FLoC (`interest-cohort`) all disabled |

**Why `script-src`/`style-src` allow `'unsafe-inline'` instead of a nonce
or hash policy** (documented in `next.config.ts` as well): the site
renders zero user-generated content, so there is no realistic injection
vector for `unsafe-inline` to exploit today. Nonce-based CSP would require
every page to opt into dynamic rendering, which would remove static
generation from what is currently a fully static site. Hash-based
`style-src` is not practical because the Motion animation library renders
per-element inline `style` attributes whose values vary per element and
per edit. **If this site ever adds a CMS, comments, or any other
user-generated content rendered into pages, revisit this via
proxy/middleware-based nonces** (see Next.js's CSP guide).

All 12 JSON-LD `<script>` blocks and the theme-init script go through a
shared escaping helper ([`src/lib/json-ld.ts`](src/lib/json-ld.ts)) that
escapes `<` so a `</script>` sequence in any field value can't break out
of the script tag.

## 6. Rate limiting

[`src/lib/rate-limit.ts`](src/lib/rate-limit.ts) enforces 5 submissions /
10 minutes and 20 / day per client IP (via Vercel's `x-forwarded-for`,
which Vercel's edge sets and client requests cannot spoof) across both
Server Actions.

**Honest limitation:** this is an in-memory, best-effort limiter. Vercel
serverless functions are stateless across cold starts and can run on
multiple concurrent instances, so this limiter only fully applies within a
single warm instance — it meaningfully slows down naive/single-source
abuse but is **not** a substitute for real distributed rate limiting or
DDoS protection. For that, enable **Vercel Firewall** rate-limiting rules
at the platform level (see §9), or back this module with a shared store
(Vercel KV / Upstash Redis) if abuse is observed in practice.

Server Actions cannot set a custom HTTP status the way a Route Handler
can — a rate-limited request still returns `200` at the transport level,
but no email is sent and the UI surfaces a "too many submissions" state.

## 7. Dependency security

`npm audit` reports 0 known vulnerabilities as of this hardening pass.
Re-run `npm audit` periodically and after adding dependencies; prioritize
Critical/High findings first.

## 8. Reporting vulnerabilities

[`public/.well-known/security.txt`](public/.well-known/security.txt)
exists per [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116) but
currently contains a placeholder `Contact` field — **no dedicated security
contact address exists yet**, and one was not invented. Replace the TODO
address with a real, monitored inbox before relying on this file.

## 9. Deployment security (Vercel — manual configuration)

The following are platform-level settings this repository cannot
configure on its own; enable them in the Vercel dashboard:

- **Vercel Firewall**: rate limiting and bot-challenge rules in front of
  `/` and the pages containing the forms, as real DDoS/abuse protection
  beyond the in-memory limiter in §6.
- **Preview Deployment Protection**: require authentication on preview
  deployments so unfinished/unlinked work isn't publicly indexable.
- **Environment separation**: keep Production, Preview, and Development
  environment variables distinct in the Vercel project settings — a
  Preview deployment should not have access to the production
  `RESEND_API_KEY` unless intentional.
- Do **not** password-protect the production `elevenchase.com` domain —
  it is a public marketing site and should stay publicly reachable.

## 10. Incident response basics

If abuse or a suspected compromise is detected:

1. Rotate the affected secret immediately (§11) — this is the fastest way
   to cut off an attacker using a leaked credential.
2. Check Resend's dashboard logs for unexpected send volume or recipients.
3. Check Vercel's deployment/function logs for unusual request patterns.
4. If a dependency vulnerability is the cause, patch and redeploy, then
   confirm via `npm audit`.
5. If the incident involved a real secret leak, treat it as public and
   rotate rather than assuming exposure was limited.

## 11. Secret rotation procedure

1. Generate a new credential at the provider (e.g. a new Resend API key
   from the Resend dashboard).
2. Update the value in Vercel's Project → Settings → Environment
   Variables for the affected environment(s), and in local `.env.local`.
3. Redeploy so the new value takes effect.
4. Revoke/delete the old credential at the provider once the new one is
   confirmed working.
5. Never commit the new value to git — `.env.example` only ever holds
   placeholders.
