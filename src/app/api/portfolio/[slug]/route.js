import { NextResponse } from "next/server";
import { portfolioService } from "@/services/portfolioService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const item = await portfolioService.getProjectBySlugOrId(slug);
    if (!item) {
      return NextResponse.json({ error: "Portfolio project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { data: item },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store"
        }
      }
    );
  } catch (error) {
    console.error("GET Portfolio Detail API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio item" },
      { status: 500 }
    );
  }
}
