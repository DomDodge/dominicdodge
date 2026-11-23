import type { NextRequest } from "next/server";
import { fail, rateLimited, spoonacular } from "../shared";
import { parseFilters } from "../filters";

// Recipe search: GET /api/sizzle/search?query=tacos
// Optional filters: &diet=vegetarian&intolerances=peanut,dairy (see ../filters.ts).
export async function GET(request: NextRequest) {
  const query = (request.nextUrl.searchParams.get("query") ?? "").trim();
  if (query === "" || query.length > 100) return fail(400, "Bad query");

  const filters = parseFilters(request);
  if ("error" in filters) return filters.error;

  if (rateLimited(request)) return fail(429, "Too many requests");

  return spoonacular(
    "/recipes/complexSearch",
    new URLSearchParams({
      query,
      number: "10",
      addRecipeInformation: "true",
      fillIngredients: "true",
      instructionsRequired: "true",
      ...filters.params,
    })
  );
}
