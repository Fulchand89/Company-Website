import { NextResponse } from "next/server";
import { portfolioService } from "@/services/portfolioService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const category = searchParams.get("category") || "all";

    const [result, categories] = await Promise.all([
      portfolioService.getPublicProjects({ category, page, limit }),
      portfolioService.getCategories()
    ]);

    return NextResponse.json(
      {
        data: result.data,
        pagination: result.pagination,
        categories: categories
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store"
        }
      }
    );
  } catch (error) {
    console.error("GET Public Portfolio API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve portfolio items", details: error.message },
      { status: 500 }
    );
  }
}