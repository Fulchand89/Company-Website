import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { userService } from "@/services/userService";
import { hashPassword } from "@/services/authService";

export async function PUT(request) {
  try {
    const cookieStore = await cookies();
    const cookieName = process.env.SESSION_COOKIE_NAME || "gtw_session";
    const sessionCookie = cookieStore.get(cookieName);

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = JSON.parse(decodeURIComponent(sessionCookie.value));
    const userId = session.id;

    const { name, email, password } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Check email uniqueness if email is changing
    const existingUser = await userService.getUserById(userId);
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (email !== existingUser.email) {
      const emailCheck = await userService.getUserByEmail(email);
      if (emailCheck) {
        return NextResponse.json(
          { error: "This email address is already in use" },
          { status: 400 }
        );
      }
    }

    // Update user details
    const updatedUser = await userService.updateUser(userId, {
      name,
      email,
      role: existingUser.role
    });

    // Update password if provided
    if (password && password.trim() !== "") {
      const passwordHash = hashPassword(password);
      await userService.updatePassword(userId, passwordHash);
    }

    // Update session cookie with new email
    const updatedToken = JSON.stringify({
      ...session,
      email: updatedUser.email
    });
    
    cookieStore.set(cookieName, updatedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return NextResponse.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Profile API Update Error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
