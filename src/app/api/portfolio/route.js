import { NextResponse } from "next/server";
import { portfolioService } from "@/services/portfolioService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// ── In-memory cache (60 s TTL) ────────────────────────────────────────────────
// Keyed by "category:page:limit" so each distinct request is cached separately.
const portfolioCache = new Map();
const PORTFOLIO_CACHE_TTL = 60_000;
export function clearPortfolioCache() {
  portfolioCache.clear();
}

function getPortfolioCacheKey(category, page, limit) {
  return `${category}:${page}:${limit}`;
}

function getPortfolioCache(key) {
  const entry = portfolioCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > PORTFOLIO_CACHE_TTL) {
    portfolioCache.delete(key);
    return null;
  }
  return entry.data;
}

function setPortfolioCache(key, data) {
  portfolioCache.set(key, { data, ts: Date.now() });
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const category = searchParams.get("category") || "all";

    // ── Serve from cache if fresh ─────────────────────────────────────────
    const cacheKey = getPortfolioCacheKey(category, page, limit);
    const cached = getPortfolioCache(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          "X-Cache": "HIT",
        },
      });
    }

    const [result, categories] = await Promise.all([
      portfolioService.getPublicProjects({ category, page, limit }),
      portfolioService.getCategories(),
    ]);

    const responsePayload = {
      data: result.data,
      pagination: result.pagination,
      categories,
    };

    // ── Populate cache ────────────────────────────────────────────────────
    setPortfolioCache(cacheKey, responsePayload);

    return NextResponse.json(responsePayload, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("GET Public Portfolio API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve portfolio items", details: error.message },
      { status: 500 }
    );
  }
}
