import type { NextRequest } from "next/server";

// Simple rate limit: 30 requests per minute per IP.
// In-memory, so it's per server instance (best-effort on serverless hosts).
const WINDOW_MS = 60_000;
const MAX_HITS = 30;
const hitsByIp = new Map<string, number[]>();

function fail(status: number, error: string) {
  return Response.json({ error }, { status });
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
}

function rateLimited(ip: string): boolean {
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

export async function GET(request: NextRequest) {
  const query = (request.nextUrl.searchParams.get("query") ?? "").trim();
  if (query === "" || query.length > 100) return fail(400, "Bad query");

  if (rateLimited(clientIp(request))) return fail(429, "Too many requests");

  const apiKey = process.env.SPOONACULAR_KEY;
  if (!apiKey) return fail(500, "Server is missing SPOONACULAR_KEY");

  const params = new URLSearchParams({
    query,
    number: "10",
    addRecipeInformation: "true",
    fillIngredients: "true",
    instructionsRequired: "true",
  });

  try {
    const upstream = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?${params}`,
      {
        headers: { "x-api-key": apiKey },
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      }
    );
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return fail(502, "Upstream request failed");
  }
}
