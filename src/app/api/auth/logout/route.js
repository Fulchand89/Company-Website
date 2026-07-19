import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const cookieName = process.env.SESSION_COOKIE_NAME || "gtw_session";
    
    // Delete the session cookie
    cookieStore.delete(cookieName);

    return NextResponse.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
