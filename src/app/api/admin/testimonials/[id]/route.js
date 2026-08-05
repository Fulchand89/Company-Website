import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { testimonialService } from "@/services/testimonialService";
import { clearTestimonialsCache } from "@/app/api/testimonials/route";

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

export async function GET(request, { params }) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const testimonial = await testimonialService.getTestimonialById(id);

    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("GET Admin Testimonial Detail Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve testimonial details" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { name, project, text, img } = body;

    // Check existence first
    const existing = await testimonialService.getTestimonialById(id);
    if (!existing) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    // Required validation
    if (!name || !project || !text || !img) {
      return NextResponse.json(
        { error: "Name, project, testimonial text, and client image are required" },
        { status: 400 }
      );
    }

    const updatedTestimonial = await testimonialService.updateTestimonial(id, body);

    try {
      clearTestimonialsCache();
      revalidatePath("/");
      revalidatePath("/testimonial");
    } catch (rErr) {
      console.warn("Revalidate error:", rErr);
    }

    return NextResponse.json({ message: "Testimonial updated successfully", data: updatedTestimonial });
  } catch (error) {
    console.error("PUT Admin Testimonial Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial details" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const existing = await testimonialService.getTestimonialById(id);
    if (!existing) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    await testimonialService.deleteTestimonial(id);

    try {
      clearTestimonialsCache();
      revalidatePath("/");
      revalidatePath("/testimonial");
    } catch (rErr) {
      console.warn("Revalidate error:", rErr);
    }

    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("DELETE Admin Testimonial Error:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
