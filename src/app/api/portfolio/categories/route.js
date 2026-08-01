import { NextResponse } from "next/server";
import { portfolioService } from "@/services/portfolioService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const categories = await portfolioService.getCategories();
    return NextResponse.json(
      { categories },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store"
        }
      }
    );
  } catch (error) {
    console.error("GET Portfolio Categories API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
