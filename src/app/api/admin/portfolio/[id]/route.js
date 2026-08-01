import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { portfolioService } from "@/services/portfolioService";

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

export async function GET(request, { params }) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const item = await portfolioService.getProjectBySlugOrId(id);

    if (!item) {
      return NextResponse.json({ error: "Portfolio project not found" }, { status: 404 });
    }

    return NextResponse.json({ data: item });
  } catch (error) {
    console.error("GET Admin Portfolio Item Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio item" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const body = await request.json();

    const updated = await portfolioService.updateProject(id, body);

    // Revalidate public portfolio routes immediately
    try {
      revalidatePath("/portfolio");
      revalidatePath(`/portfolio/${updated.slug}`);
      revalidatePath(`/portfolio/${id}`);
    } catch (rErr) {
      console.warn("RevalidatePath warning:", rErr);
    }

    return NextResponse.json({
      message: "Portfolio project updated successfully",
      data: updated
    });
  } catch (error) {
    console.error("PUT Admin Portfolio Item Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update portfolio project" },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    await portfolioService.deleteProject(id);

    try {
      revalidatePath("/portfolio");
    } catch (rErr) {
      console.warn("RevalidatePath warning:", rErr);
    }

    return NextResponse.json({ message: "Portfolio project deleted successfully" });
  } catch (error) {
    console.error("DELETE Admin Portfolio Item Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete portfolio project" },
      { status: 400 }
    );
  }
}
