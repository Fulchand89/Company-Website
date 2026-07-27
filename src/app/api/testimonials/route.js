import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export const revalidate = 60; // Cache on Vercel CDN for 60 seconds

// In-memory cache for fast repeated reads
let cacheData = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 1000; // 60 seconds

const STATIC_TESTIMONIALS = [
  {
    id: 1,
    img: "/assets/images/hero/client-img1.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
  },
  {
    id: 2,
    img: "/assets/images/hero/client-img2.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
  },
  {
    id: 3,
    img: "/assets/images/hero/client-img3.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
  },
  {
    id: 4,
    img: "/assets/images/hero/client-img1.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
  },
  {
    id: 5,
    img: "/assets/images/hero/client-img2.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
  },
  {
    id: 6,
    img: "/assets/images/hero/client-img3.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
  },
  {
    id: 7,
    img: "/assets/images/hero/client-img1.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
  },
  {
    id: 8,
    img: "/assets/images/hero/client-img2.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
  },
  {
    id: 9,
    img: "/assets/images/hero/client-img3.png",
    name: "Roy Donaldson",
    project: "Book Luxor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis, doloremque laudantium nemo perspiciatis nam rem beatae deserunt iusto est quibusdam, mollitia eaque! Harum, labore modi. Voluptate esse eveniet quisquam!",
    rating: 5,
  },
];

export async function GET(request) {
  try {
    const searchParams = request.nextUrl?.searchParams || new URL(request.url).searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "9", 10);

    const now = Date.now();
    const cacheKey = `testimonials_${page}_${limit}`;

    if (cacheData && cacheData[cacheKey] && (now - cacheTime < CACHE_TTL)) {
      return NextResponse.json(cacheData[cacheKey], {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
      });
    }

    try {
      const offset = (page - 1) * limit;
      
      // Run DB queries concurrently to cut latency in half
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

      const responsePayload = {
        data: formattedTestimonials.length > 0 ? formattedTestimonials : STATIC_TESTIMONIALS.slice(offset, offset + limit),
        pagination: { total: total || STATIC_TESTIMONIALS.length, page, limit, totalPages: Math.ceil((total || STATIC_TESTIMONIALS.length) / limit) }
      };

      if (!cacheData) cacheData = {};
      cacheData[cacheKey] = responsePayload;
      cacheTime = now;

      return NextResponse.json(responsePayload, {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
      });
    } catch (dbError) {
      console.warn("Testimonials DB Query Error, using static fallback:", dbError.message);
      const offset = (page - 1) * limit;
      const total = STATIC_TESTIMONIALS.length;
      const totalPages = Math.ceil(total / limit);
      const data = STATIC_TESTIMONIALS.slice(offset, offset + limit);

      return NextResponse.json({
        data,
        pagination: { total, page, limit, totalPages }
      }, {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
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
