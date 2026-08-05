import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { portfolioService } from "@/services/portfolioService";
import { clearPortfolioCache } from "@/app/api/portfolio/route";

export const dynamic = "force-dynamic";

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
    console.error("Admin Auth verification failed:", error);
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

    const [result, categories] = await Promise.all([
      portfolioService.getAdminProjects({ search, category, status, page, limit }),
      portfolioService.getCategories()
    ]);

    return NextResponse.json({
      ...result,
      categories
    });
  } catch (error) {
    console.error("GET Admin Portfolio Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio list for admin" },
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
    const newProject = await portfolioService.createProject(body);

    // Revalidate public portfolio cache for immediate reflection
    try {
      clearPortfolioCache();
      revalidatePath("/");
      revalidatePath("/portfolio");
      revalidatePath(`/portfolio/${newProject.slug}`);
    } catch (rErr) {
      console.warn("RevalidatePath warning:", rErr);
    }

    return NextResponse.json(
      { message: "Portfolio project created successfully", data: newProject },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Admin Portfolio Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create portfolio project" },
      { status: 400 }
    );
  }
}
