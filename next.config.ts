import path from "node:path";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * script-src/style-src intentionally allow 'unsafe-inline' rather than a
 * nonce- or hash-based policy. Why this is the deliberate, honest choice
 * for this specific app (not a shortcut):
 *
 * - The site renders zero user-generated content anywhere (the only user
 *   input, the contact/audit forms, is validated server-side and sent to
 *   an outbound email — it is never reflected back into any page's HTML).
 *   That removes the actual injection vector 'unsafe-inline' protects
 *   against, so its marginal real-world risk here is low.
 * - Nonce-based CSP requires every page to opt into dynamic rendering
 *   (see Next.js's CSP guide), which would remove static generation from
 *   what is currently a fully static marketing site — a materially worse
 *   performance/cost tradeoff for a low-risk surface.
 * - Hash-based CSP is impractical for style-src specifically because the
 *   Motion animation library renders per-element inline `style` attributes
 *   (initial animation state) with values that vary per element and per
 *   edit, so a fixed allowlist of style hashes would silently go stale.
 *
 * If this site ever adds user-generated content, a CMS, or third-party
 * embeds, revisit this via proxy-based nonces (see SECURITY.md).
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    serverActions: {
      // Contact/audit form submissions are small text fields; 64kb is
      // generous headroom over real usage and rejects oversized payloads.
      bodySizeLimit: "64kb",
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "payment=()",
              "usb=()",
              "interest-cohort=()",
            ].join(", "),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "elevenchase.com" }],
        destination: "https://www.elevenchase.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
