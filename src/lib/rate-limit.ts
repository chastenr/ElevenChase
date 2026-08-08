import "server-only";
import { headers } from "next/headers";

/**
 * Best-effort, in-memory rate limiting for Server Actions.
 *
 * IMPORTANT LIMITATION: Vercel's serverless functions are stateless and can
 * run across many isolated instances, and this in-memory store is scoped to
 * a single warm lambda instance. That means this limiter meaningfully slows
 * down casual/naive abuse from a single instance but is NOT a substitute for
 * distributed rate limiting or DDoS protection. For real protection against
 * a determined or distributed attacker, enable Vercel Firewall / rate
 * limiting rules at the platform level (see SECURITY.md) or back this with
 * a shared store (e.g. Vercel KV / Upstash Redis) if abuse is observed.
 */

type Bucket = {
  count: number;
  windowStart: number;
};

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const WINDOW_LIMIT = 5; // 5 submissions per 10 minutes per IP

const DAY_MS = 24 * 60 * 60 * 1000;
const DAY_LIMIT = 20; // 20 submissions per day per IP

const shortWindowBuckets = new Map<string, Bucket>();
const dailyBuckets = new Map<string, Bucket>();

const MAX_TRACKED_KEYS = 5000;

function prune(store: Map<string, Bucket>, windowMs: number, now: number) {
  if (store.size <= MAX_TRACKED_KEYS) return;
  for (const [key, bucket] of store) {
    if (now - bucket.windowStart > windowMs) {
      store.delete(key);
    }
  }
}

function checkBucket(
  store: Map<string, Bucket>,
  key: string,
  windowMs: number,
  limit: number,
  now: number,
) {
  const existing = store.get(key);

  if (!existing || now - existing.windowStart > windowMs) {
    store.set(key, { count: 1, windowStart: now });
    return true;
  }

  if (existing.count >= limit) {
    return false;
  }

  existing.count += 1;
  return true;
}

/**
 * Resolves the caller's IP from Vercel's trusted `x-forwarded-for` header,
 * which Vercel's edge network sets and is not attacker-spoofable when the
 * app is deployed on Vercel (Vercel overwrites/appends this header at the
 * edge rather than passing through an arbitrary client-supplied value).
 * Falls back to a constant key if unavailable (e.g. local dev), which
 * degrades to a single shared bucket rather than failing open silently.
 */
async function resolveClientKey() {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim();
  return ip || "unknown";
}

export type RateLimitResult = {
  allowed: boolean;
};

export async function checkRateLimit(): Promise<RateLimitResult> {
  const key = await resolveClientKey();
  const now = Date.now();

  prune(shortWindowBuckets, WINDOW_MS, now);
  prune(dailyBuckets, DAY_MS, now);

  const withinShortWindow = checkBucket(
    shortWindowBuckets,
    key,
    WINDOW_MS,
    WINDOW_LIMIT,
    now,
  );
  const withinDailyWindow = checkBucket(dailyBuckets, key, DAY_MS, DAY_LIMIT, now);

  return { allowed: withinShortWindow && withinDailyWindow };
}
