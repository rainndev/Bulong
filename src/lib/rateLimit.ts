type Bucket = {
  hits: number[];
  blockedUntil?: number;
};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_PER_WINDOW = 3; // submissions per window
const BLOCK_MS = 10 * 60_000; // 10-minute block after limit is hit

const TOO_MANY_ATTEMPTS = 5; // 429s within 10 min -> longer block
const LONG_BLOCK_MS = 60 * 60_000; // 1 hour

const MAX_BODY_CHARS = 2500;

const now = () => Date.now();

const getClientIp = (request: Request): string => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
};

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; status: 429 | 403; error: string; retryAfterSec: number };

const sweepStale = () => {
  const cutoff = now() - Math.max(LONG_BLOCK_MS, WINDOW_MS * 2);

  for (const [key, bucket] of buckets) {
    const lastHit = bucket.hits[bucket.hits.length - 1] ?? 0;
    const stale =
      lastHit < cutoff &&
      (!bucket.blockedUntil || bucket.blockedUntil < cutoff);

    if (stale) buckets.delete(key);
  }
};

export const checkRateLimit = (request: Request): RateLimitResult => {
  sweepStale();

  const ip = getClientIp(request);
  const key = `ip:${ip}`;
  const bucket = buckets.get(key) ?? { hits: [] };

  const t = now();

  // Active block?
  if (bucket.blockedUntil && bucket.blockedUntil > t) {
    return {
      allowed: false,
      status: 429,
      error: "Too many messages — please try again later.",
      retryAfterSec: Math.ceil((bucket.blockedUntil - t) / 1000),
    };
  }

  // Sliding window
  bucket.hits = bucket.hits.filter((hit) => t - hit < WINDOW_MS);

  if (bucket.hits.length >= MAX_PER_WINDOW) {
    bucket.blockedUntil = t + BLOCK_MS;

    bucket.blockedUntil =
      (bucket.blockedUntil ?? 0) +
      Math.min(bucket.hits.length, TOO_MANY_ATTEMPTS) * LONG_BLOCK_MS;

    buckets.set(key, bucket);

    return {
      allowed: false,
      status: 429,
      error: "Too many messages — please try again later.",
      retryAfterSec: Math.ceil(((bucket.blockedUntil ?? t) - t) / 1000),
    };
  }

  bucket.hits.push(t);
  buckets.set(key, bucket);

  return { allowed: true };
};

/** Per-inbox cooldown: same IP can't flood one recipient. */
export const checkInboxCooldown = (
  ip: string,
  inbox: string,
): RateLimitResult => {
  const key = `inbox:${ip}:${inbox}`;
  const bucket = buckets.get(key) ?? { hits: [] };
  const t = now();

  if (bucket.blockedUntil && bucket.blockedUntil > t) {
    return {
      allowed: false,
      status: 429,
      error: "You recently sent a message here — wait a bit before another.",
      retryAfterSec: Math.ceil((bucket.blockedUntil - t) / 1000),
    };
  }

  if (bucket.hits.length >= 1) {
    bucket.blockedUntil = t + 2 * 60_000; // 2 minutes per inbox
    buckets.set(key, bucket);

    return {
      allowed: false,
      status: 429,
      error: "You recently sent a message here — wait a bit before another.",
      retryAfterSec: 120,
    };
  }

  bucket.hits.push(t);
  buckets.set(key, bucket);

  return { allowed: true };
};

export { getClientIp };

/** Reject oversized payloads before parsing. */
export const isBodyTooLarge = (raw: string): boolean =>
  raw.length > MAX_BODY_CHARS;

/** Reject obvious bot user agents (empty UA is allowed — some proxies strip it). */
const BOT_UA_PATTERNS = [
  /curl\//i,
  /wget\//i,
  /python-requests/i,
  /scrapy/i,
  /httpclient/i,
  /go-http-client/i,
  /libwww/i,
  /java\/\d/i,
];

export const isBotUserAgent = (userAgent: string): boolean =>
  BOT_UA_PATTERNS.some((pattern) => pattern.test(userAgent));

/** Simple Honeypot validator: bots fill hidden fields; humans leave them empty. */
export const honeypotPassed = (honeypot: unknown): boolean =>
  honeypot === undefined || honeypot === null || honeypot === "";
