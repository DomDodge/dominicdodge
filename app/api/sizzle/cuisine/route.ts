import type { NextRequest } from "next/server";
import { fail, rateLimited, spoonacular } from "../shared";

// Random recipes for one cuisine: GET /api/sizzle/cuisine?cuisine=mexican

// Keep in sync with CUISINES in src/api/recipes_api.ts (Sizzle frontend).
const ALLOWED_CUISINES = ["mexican", "asian", "southern", "italian", "indian", "mediterranean", "thai"];

export async function GET(request: NextRequest) {
  const cuisine = (request.nextUrl.searchParams.get("cuisine") ?? "").trim().toLowerCase();
  if (!ALLOWED_CUISINES.includes(cuisine)) return fail(400, "Unknown cuisine");

  if (rateLimited(request)) return fail(429, "Too many requests");

  return spoonacular(
    "/recipes/random",
    new URLSearchParams({
      number: "10",
      "include-tags": cuisine,
    })
  );
}
