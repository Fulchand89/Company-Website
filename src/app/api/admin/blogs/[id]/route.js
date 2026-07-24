import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { blogService } from "@/services/blogService";

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
    const blog = await blogService.getBlogById(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("GET Admin Blog Detail Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve blog details" },
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
    const { title, content, category, img } = body;

    // Check existence first
    const existing = await blogService.getBlogById(id);
    if (!existing) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    // Required validation
    if (!title || !content || !category || !img) {
      return NextResponse.json(
        { error: "Title, content, category, and featured image are required" },
        { status: 400 }
      );
    }

    const updatedBlog = await blogService.updateBlog(id, body);

    return NextResponse.json({ message: "Blog post updated successfully", data: updatedBlog });
  } catch (error) {
    console.error("PUT Admin Blog Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update blog details" },
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

    const existing = await blogService.getBlogById(id);
    if (!existing) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    await blogService.deleteBlog(id);

    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("DELETE Admin Blog Error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
