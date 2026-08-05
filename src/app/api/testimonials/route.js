import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export const dynamic = "force-dynamic";

// ── In-memory cache (60 s TTL) ────────────────────────────────────────────────
const TESTIMONIALS_CACHE_TTL = 60_000;
let testimonialsCache = null;
let testimonialsCacheTime = 0;

export function clearTestimonialsCache() {
  testimonialsCache = null;
  testimonialsCacheTime = 0;
}

export async function GET(request) {
  try {
    const searchParams = request.nextUrl?.searchParams || new URL(request.url).searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "9", 10);

    // ── Serve from cache if fresh ─────────────────────────────────────────
    const now = Date.now();
    if (testimonialsCache && now - testimonialsCacheTime < TESTIMONIALS_CACHE_TTL) {
      const allData = testimonialsCache.data;
      const offset = (page - 1) * limit;
      const paged = allData.slice(offset, offset + limit);
      const total = allData.length;
      return NextResponse.json(
        { data: paged, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
            "X-Cache": "HIT",
          },
        }
      );
    }

    try {
      const offset = (page - 1) * limit;
      
      const [countResult, rows] = await Promise.all([
        executeQuery("SELECT COUNT(*) as count FROM testimonials WHERE status = 'published'"),
        executeQuery("SELECT * FROM testimonials WHERE status = 'published' ORDER BY created_at DESC LIMIT ? OFFSET ?", [limit, offset])
      ]);

      const total = countResult[0]?.count || 0;

      const formattedTestimonials = (rows || []).map(t => ({
        id: t.id,
        name: t.name,
        project: t.project,
        text: t.text,
        img: t.img,
        rating: t.rating || 5,
      }));

      testimonialsCache = { data: formattedTestimonials };
      testimonialsCacheTime = now;

      const responsePayload = {
        data: formattedTestimonials,
        pagination: { total, page, limit, totalPages: Math.ceil(total / limit) || 1 }
      };

      return NextResponse.json(responsePayload, {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          "X-Cache": "MISS",
        },
      });
    } catch (dbError) {
      console.warn("Testimonials DB Query Error:", dbError.message);
      return NextResponse.json({
        data: [],
        pagination: { total: 0, page, limit, totalPages: 0 }
      }, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
    }
  } catch (error) {
    console.error("GET Testimonials API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve testimonials" },
      { status: 500 }
    );
  }
}

