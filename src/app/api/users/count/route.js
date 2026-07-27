import { NextResponse } from "next/server";
import { userService } from "@/services/userService";

// GET /api/users/count - Check user count in system
export async function GET() {
  try {
    const count = await userService.getUserCount();
    return NextResponse.json({
      count,
      hasUser: count > 0,
      maxAllowed: 1
    });
  } catch (error) {
    console.error("GET User Count API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve user count", details: error.message },
      { status: 500 }
    );
  }
}
