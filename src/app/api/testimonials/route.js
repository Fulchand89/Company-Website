import { NextResponse } from "next/server";
import { ensureTestimonialSchema, testimonialService } from "@/services/testimonialService";

export const dynamic = "force-dynamic";

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
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "9", 10);

    try {
      // Skip schema check for public reads — just query directly
      const offset = (page - 1) * limit;
      const [countResult] = await (await import("@/lib/db")).executeQuery(
        "SELECT COUNT(*) as count FROM testimonials WHERE status = 'published'"
      );
      const total = countResult?.count || 0;
      const rows = await (await import("@/lib/db")).executeQuery(
        "SELECT * FROM testimonials WHERE status = 'published' ORDER BY created_at DESC LIMIT ? OFFSET ?",
        [limit, offset]
      );

      const formattedTestimonials = (rows || []).map(t => ({
        id: t.id,
        name: t.name,
        project: t.project,
        text: t.text,
        img: t.img,
        rating: t.rating || 5,
      }));

      return NextResponse.json({
        data: formattedTestimonials,
        pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
      });
    } catch (dbError) {
      // Table doesn't exist or DB unreachable — use static fallback
      const offset = (page - 1) * limit;
      const total = STATIC_TESTIMONIALS.length;
      const totalPages = Math.ceil(total / limit);
      const data = STATIC_TESTIMONIALS.slice(offset, offset + limit);

      return NextResponse.json({
        data,
        pagination: {
          total,
          page,
          limit,
          totalPages
        }
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
