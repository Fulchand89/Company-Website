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

export async function GET(request, { params }) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const member = await teamService.getTeamMemberById(id);

    if (!member) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json(member);
  } catch (error) {
    console.error("GET Admin Team Member Detail Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve team member details" },
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
    const { name, designation, img } = body;

    // Check existence first
    const existing = await teamService.getTeamMemberById(id);
    if (!existing) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    // Required validation
    if (!name || !designation || !img) {
      return NextResponse.json(
        { error: "Name, designation, and profile image are required" },
        { status: 400 }
      );
    }

    const updatedMember = await teamService.updateTeamMember(id, body);

    return NextResponse.json({ message: "Team member updated successfully", data: updatedMember });
  } catch (error) {
    console.error("PUT Admin Team Member Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update team member details" },
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

    const existing = await teamService.getTeamMemberById(id);
    if (!existing) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    await teamService.deleteTeamMember(id);

    return NextResponse.json({ message: "Team member deleted successfully" });
  } catch (error) {
    console.error("DELETE Admin Team Member Error:", error);
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
