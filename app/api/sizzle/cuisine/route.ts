import type { NextRequest } from "next/server";
import { fail, rateLimited, spoonacular } from "../shared";
import { parseFilters } from "../filters";

// Random recipes for one cuisine: GET /api/sizzle/cuisine?cuisine=mexican
// Optional filters: &diet=vegetarian&intolerances=peanut,dairy (see ../filters.ts).

// Keep in sync with CUISINES in src/api/recipes_api.ts (Sizzle frontend).
const ALLOWED_CUISINES = ["mexican", "asian", "southern", "italian", "indian", "mediterranean", "thai"];

export async function GET(request: NextRequest) {
  const cuisine = (request.nextUrl.searchParams.get("cuisine") ?? "").trim().toLowerCase();
  if (!ALLOWED_CUISINES.includes(cuisine)) return fail(400, "Unknown cuisine");

  const filters = parseFilters(request);
  if ("error" in filters) return filters.error;

  if (rateLimited(request)) return fail(429, "Too many requests");

  // complexSearch (not /recipes/random) because only it supports diet and intolerance filters.
  // sort=random keeps each call returning different meals. Same fields as search, so the
  // response has `results` like a search; the app reads either `results` or the old `recipes`.
  return spoonacular(
    "/recipes/complexSearch",
    new URLSearchParams({
      cuisine,
      sort: "random",
      number: "10",
      addRecipeInformation: "true",
      fillIngredients: "true",
      instructionsRequired: "true",
      ...filters.params,
    })
  );
}
