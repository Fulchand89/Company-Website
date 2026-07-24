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

export async function GET(request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status") || "";

    const result = await blogService.getPaginatedBlogsForAdmin({
      search,
      category,
      status,
      page,
      limit
    });

    // Also get categories and tags list for dropdown filters/inputs
    const categories = await blogService.getAllCategories();
    const tags = await blogService.getAllTags();

    return NextResponse.json({
      ...result,
      categories,
      tags
    });
  } catch (error) {
    console.error("GET Admin Blogs API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve blog listings" },
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
    const { title, content, category, img } = body;

    // Basic required field validations
    if (!title || !content || !category || !img) {
      return NextResponse.json(
        { error: "Title, content, category, and featured image are required" },
        { status: 400 }
      );
    }

    const newBlog = await blogService.createBlog(body);

    return NextResponse.json(
      { message: "Blog post created successfully", data: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Admin Blogs API Error:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
