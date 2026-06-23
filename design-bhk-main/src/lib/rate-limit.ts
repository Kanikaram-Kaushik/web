type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  ok: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type RequestLike = {
  headers: Headers;
};

type RateLimitStore = Map<string, RateLimitEntry>;

const globalStore = globalThis as typeof globalThis & {
  __designbhkRateLimit?: RateLimitStore;
};

const store: RateLimitStore = globalStore.__designbhkRateLimit ?? new Map();
globalStore.__designbhkRateLimit = store;

const normalizeIp = (ip: string | null) => (ip && ip.length ? ip : "unknown");

export function getClientIp(req: RequestLike) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return normalizeIp(forwarded.split(",")[0]?.trim() ?? null);
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return normalizeIp(realIp.trim());
  }
  return "unknown";
}

export function checkRateLimit({ key, limit, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return {
      ok: true,
      limit,
      remaining: Math.max(limit - 1, 0),
      resetAt: now + windowMs,
    };
  }

  const nextCount = entry.count + 1;
  entry.count = nextCount;
  store.set(key, entry);

  return {
    ok: nextCount <= limit,
    limit,
    remaining: Math.max(limit - nextCount, 0),
    resetAt: entry.resetAt,
  };
}

export function rateLimitHeaders(result: RateLimitResult) {
  const resetSeconds = Math.ceil(result.resetAt / 1000);
  const headers = new Headers();
  headers.set("X-RateLimit-Limit", result.limit.toString());
  headers.set("X-RateLimit-Remaining", result.remaining.toString());
  headers.set("X-RateLimit-Reset", resetSeconds.toString());
  if (!result.ok) {
    const retryAfter = Math.max(Math.ceil((result.resetAt - Date.now()) / 1000), 1);
    headers.set("Retry-After", retryAfter.toString());
  }
  return headers;
}

