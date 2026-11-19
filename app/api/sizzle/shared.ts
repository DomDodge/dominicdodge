import type { NextRequest } from "next/server";

// Helpers shared by the Sizzle routes (search, cuisine).
// Not a route itself: only files named route.ts are served.

// Simple rate limit: 30 requests per minute per IP, shared across Sizzle routes.
// In-memory, so it's per server instance (best-effort on serverless hosts).
const WINDOW_MS = 60_000;
const MAX_HITS = 30;
const hitsByIp = new Map<string, number[]>();

export function fail(status: number, error: string) {
  return Response.json({ error }, { status });
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
}

export function rateLimited(request: NextRequest): boolean {
  const ip = clientIp(request);
  const now = Date.now();
  const hits = (hitsByIp.get(ip) ?? []).filter((t) => t > now - WINDOW_MS);
  if (hits.length >= MAX_HITS) {
    hitsByIp.set(ip, hits);
    return true;
  }
  hits.push(now);
  hitsByIp.set(ip, hits);

  // Keep the map from growing forever.
  if (hitsByIp.size > 5000) {
    for (const [key, times] of hitsByIp) {
      if (!times.some((t) => t > now - WINDOW_MS)) hitsByIp.delete(key);
    }
  }
  return false;
}

// Calls a Spoonacular endpoint with the server-side key and passes the response through.
export async function spoonacular(path: string, params: URLSearchParams) {
  const apiKey = process.env.SPOONACULAR_KEY;
  if (!apiKey) return fail(500, "Server is missing SPOONACULAR_KEY");

  try {
    const upstream = await fetch(`https://api.spoonacular.com${path}?${params}`, {
      headers: { "x-api-key": apiKey },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return fail(502, "Upstream request failed");
  }
}
