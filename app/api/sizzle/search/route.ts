import type { NextRequest } from "next/server";
import { fail, rateLimited, spoonacular } from "../shared";

// Recipe search: GET /api/sizzle/search?query=tacos
export async function GET(request: NextRequest) {
  const query = (request.nextUrl.searchParams.get("query") ?? "").trim();
  if (query === "" || query.length > 100) return fail(400, "Bad query");

  if (rateLimited(request)) return fail(429, "Too many requests");

  return spoonacular(
    "/recipes/complexSearch",
    new URLSearchParams({
      query,
      number: "10",
      addRecipeInformation: "true",
      fillIngredients: "true",
      instructionsRequired: "true",
    })
  );
}
