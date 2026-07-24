import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { testimonialService } from "@/services/testimonialService";

export const dynamic = "force-dynamic";

// Helper to check admin authorization
async function checkAuth() {
  try {
    const cookieStore = await cookies();
    const cookieName = process.env.SESSION_COOKIE_NAME || "gtw_session";
    const sessionCookie = cookieStore.get(cookieName);

    if (!sessionCookie) return false;

    const decodedValue = decodeURIComponent(sessionCookie.value);
    const session = JSON.parse(decodedValue);

    if (session.role === "admin" && (!session.exp || Date.now() / 1000 < session.exp)) {
      return true;
    }
  } catch (error) {
    console.error("API Auth verification failed:", error);
  }
  return false;
}

export async function GET(request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const result = await testimonialService.getPaginatedTestimonialsForAdmin({
      search,
      status,
      page,
      limit
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET Admin Testimonials API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve testimonial listings" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, project, text, img } = body;

    // Basic required field validations
    if (!name || !project || !text || !img) {
      return NextResponse.json(
        { error: "Name, project, testimonial text, and client image are required" },
        { status: 400 }
      );
    }

    const newTestimonial = await testimonialService.createTestimonial(body);

    return NextResponse.json(
      { message: "Testimonial created successfully", data: newTestimonial },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Admin Testimonials API Error:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
