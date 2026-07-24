import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { teamService } from "@/services/teamService";

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

    const result = await teamService.getPaginatedTeamMembersForAdmin({
      search,
      status,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET Admin Teams API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve team member listings" },
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
    const { name, designation, img } = body;

    // Required field validations
    if (!name || !designation || !img) {
      return NextResponse.json(
        { error: "Name, designation, and profile image are required" },
        { status: 400 }
      );
    }

    const newMember = await teamService.createTeamMember(body);

    return NextResponse.json(
      { message: "Team member created successfully", data: newMember },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Admin Teams API Error:", error);
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}
