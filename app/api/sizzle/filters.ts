import type { NextRequest } from "next/server";
import { fail } from "./shared";

// Optional diet and intolerances filters shared by the Sizzle routes (search, cuisine).
// Returns them as Spoonacular complexSearch params; anything not on these lists is rejected.
// Not a route itself: only files named route.ts are served.

// Keep in sync with DIETS and INTOLERANCES in src/api/recipes_api.ts (Sizzle frontend).
const ALLOWED_DIETS = ["vegetarian", "vegan", "pescetarian", "ketogenic", "paleo"];
const ALLOWED_INTOLERANCES = [
  "dairy",
  "egg",
  "gluten",
  "wheat",
  "peanut",
  "tree nut",
  "soy",
  "sesame",
  "seafood",
  "shellfish",
];

export type FilterResult = { params: Record<string, string> } | { error: Response };

export function parseFilters(request: NextRequest): FilterResult {
  const search = request.nextUrl.searchParams;
  const params: Record<string, string> = {};

  const diet = (search.get("diet") ?? "").trim().toLowerCase();
  if (diet !== "") {
    if (!ALLOWED_DIETS.includes(diet)) return { error: fail(400, "Unknown diet") };
    params.diet = diet;
  }

  const raw = (search.get("intolerances") ?? "").trim().toLowerCase();
  if (raw !== "") {
    const intolerances = [...new Set(raw.split(",").map((i) => i.trim()).filter(Boolean))];
    if (intolerances.some((i) => !ALLOWED_INTOLERANCES.includes(i))) {
      return { error: fail(400, "Unknown intolerance") };
    }
    if (intolerances.length > 0) params.intolerances = intolerances.join(",");
  }

  return { params };
}
