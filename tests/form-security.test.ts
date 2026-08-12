import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  contactSchema,
  auditSchema,
  isBotSubmission,
  isSafeHttpUrl,
  HONEYPOT_FIELD_NAME,
  TIMESTAMP_FIELD_NAME,
  MIN_SUBMIT_MS,
} from "../src/lib/form-security.ts";
import { jsonLdScriptProps } from "../src/lib/json-ld.ts";

const VALID_CONTACT = {
  name: "Jane Doe",
  email: "jane@example.com",
  company: "",
  website: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "We need a new marketing website.",
  marketingOptIn: "false",
};

const VALID_AUDIT = {
  name: "Jane Doe",
  email: "jane@example.com",
  company: "",
  website: "https://example.com",
  improvementAreas: ["SEO", "Performance"],
};

function formDataWith(fields: Record<string, string>) {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    fd.set(key, value);
  }
  return fd;
}

describe("contactSchema", () => {
  test("accepts a valid submission", () => {
    const result = contactSchema.safeParse(VALID_CONTACT);
    assert.equal(result.success, true);
  });

  test("rejects an invalid email address", () => {
    const result = contactSchema.safeParse({
      ...VALID_CONTACT,
      email: "not-an-email",
    });
    assert.equal(result.success, false);
  });

  test("parses explicit marketing consent as a boolean", () => {
    const optedIn = contactSchema.safeParse({
      ...VALID_CONTACT,
      marketingOptIn: "true",
    });
    const optedOut = contactSchema.safeParse(VALID_CONTACT);

    assert.equal(optedIn.success, true);
    assert.equal(optedIn.data?.marketingOptIn, true);
    assert.equal(optedOut.success, true);
    assert.equal(optedOut.data?.marketingOptIn, false);
  });

  test("rejects a tampered marketing consent value", () => {
    const result = contactSchema.safeParse({
      ...VALID_CONTACT,
      marketingOptIn: "yes",
    });
    assert.equal(result.success, false);
  });

  test("rejects an oversized message (> 5000 chars)", () => {
    const result = contactSchema.safeParse({
      ...VALID_CONTACT,
      message: "a".repeat(5001),
    });
    assert.equal(result.success, false);
  });

  test("rejects an oversized name (> 100 chars)", () => {
    const result = contactSchema.safeParse({
      ...VALID_CONTACT,
      name: "a".repeat(101),
    });
    assert.equal(result.success, false);
  });

  test("rejects CRLF characters in name (email header injection attempt)", () => {
    const result = contactSchema.safeParse({
      ...VALID_CONTACT,
      name: "Jane\r\nBcc: attacker@evil.com",
    });
    assert.equal(result.success, false);
  });

  test("rejects malformed/missing required fields", () => {
    const result = contactSchema.safeParse({
      name: "",
      email: "",
      company: "",
      website: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
      marketingOptIn: "false",
    });
    assert.equal(result.success, false);
  });

  test("accepts XSS-style payloads in message as inert text (never rendered as HTML)", () => {
    const result = contactSchema.safeParse({
      ...VALID_CONTACT,
      message: "<script>alert(1)</script><img src=x onerror=alert(1)> ' OR 1=1 --",
    });
    // These strings are safe here because the message is only ever sent as
    // plain text in an outbound email — never rendered as HTML anywhere in
    // the app. Validation should not falsely reject legitimate-length text.
    assert.equal(result.success, true);
  });

  test("ignores unexpected/extra properties (mass-assignment safe)", () => {
    const result = contactSchema.safeParse({
      ...VALID_CONTACT,
      role: "admin",
      isAdmin: true,
    });
    assert.equal(result.success, true);
    assert.equal((result.data as Record<string, unknown>).role, undefined);
    assert.equal((result.data as Record<string, unknown>).isAdmin, undefined);
  });
});

describe("auditSchema", () => {
  test("accepts a valid submission", () => {
    const result = auditSchema.safeParse(VALID_AUDIT);
    assert.equal(result.success, true);
  });

  test("rejects a javascript: URL for website", () => {
    const result = auditSchema.safeParse({
      ...VALID_AUDIT,
      website: "javascript:alert(1)",
    });
    assert.equal(result.success, false);
  });

  test("rejects a tampered improvementAreas value not in the allowed enum", () => {
    const result = auditSchema.safeParse({
      ...VALID_AUDIT,
      improvementAreas: ["Not A Real Option"],
    });
    assert.equal(result.success, false);
  });

  test("requires a website URL", () => {
    const result = auditSchema.safeParse({ ...VALID_AUDIT, website: "" });
    assert.equal(result.success, false);
  });
});

describe("isSafeHttpUrl", () => {
  test("accepts http/https URLs", () => {
    assert.equal(isSafeHttpUrl("https://example.com"), true);
    assert.equal(isSafeHttpUrl("http://example.com"), true);
  });

  test("rejects javascript: and other non-http schemes", () => {
    assert.equal(isSafeHttpUrl("javascript:alert(1)"), false);
    assert.equal(isSafeHttpUrl("data:text/html,<script>alert(1)</script>"), false);
    assert.equal(isSafeHttpUrl("file:///etc/passwd"), false);
    assert.equal(isSafeHttpUrl("not a url"), false);
  });
});

describe("isBotSubmission", () => {
  test("flags a filled honeypot field as a bot", () => {
    const fd = formDataWith({
      [HONEYPOT_FIELD_NAME]: "I am a bot",
      [TIMESTAMP_FIELD_NAME]: String(Date.now() - MIN_SUBMIT_MS - 1000),
    });
    assert.equal(isBotSubmission(fd), true);
  });

  test("flags a missing timestamp as a bot (raw POST without JS)", () => {
    const fd = formDataWith({ [HONEYPOT_FIELD_NAME]: "" });
    assert.equal(isBotSubmission(fd), true);
  });

  test("flags a submission faster than the minimum fill time as a bot", () => {
    const fd = formDataWith({
      [HONEYPOT_FIELD_NAME]: "",
      [TIMESTAMP_FIELD_NAME]: String(Date.now() - 100),
    });
    assert.equal(isBotSubmission(fd), true);
  });

  test("allows a normal, human-paced submission", () => {
    const fd = formDataWith({
      [HONEYPOT_FIELD_NAME]: "",
      [TIMESTAMP_FIELD_NAME]: String(Date.now() - MIN_SUBMIT_MS - 1000),
    });
    assert.equal(isBotSubmission(fd), false);
  });
});

describe("jsonLdScriptProps", () => {
  test("escapes a </script> breakout attempt", () => {
    const props = jsonLdScriptProps({
      name: '</script><script>alert(1)</script>',
    });
    assert.equal(props.dangerouslySetInnerHTML.__html.includes("</script>"), false);
    assert.ok(props.dangerouslySetInnerHTML.__html.includes("\\u003cscript>"));
  });
});
