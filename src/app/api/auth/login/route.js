import { NextResponse } from "next/server";
import { authService } from "@/services/authService";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await authService.login(email, password);

    // Get cookie store
    const cookieStore = await cookies();

    // In a real application, sign a JWT token here.
    // For demonstration, we will set a JSON payload representation or basic token.
    const token = JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24 hours
    });

    // Set secure HttpOnly cookie
    cookieStore.set(process.env.SESSION_COOKIE_NAME || "gtw_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 401 }
    );
  }
}
