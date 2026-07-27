import { NextResponse } from "next/server";
import { userService } from "@/services/userService";
import { hashPassword } from "@/services/authService";

// POST /api/auth/reset-password
export async function POST(request) {
  try {
    const { token, newPassword } = await request.json().catch(() => ({}));

    if (!token || !token.trim()) {
      return NextResponse.json(
        { error: "Reset token is required or invalid" },
        { status: 400 }
      );
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Lookup user by valid reset token
    const user = await userService.getUserByResetToken(token.trim());
    if (!user) {
      return NextResponse.json(
        { error: "Password reset link is invalid or has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Hash new password and update user
    const passwordHash = hashPassword(newPassword);
    await userService.updatePassword(user.id, passwordHash);

    return NextResponse.json({
      message: "Password reset successfully! You can now sign in with your new password."
    }, { status: 200 });

  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json(
      { error: "Failed to reset password", details: error.message },
      { status: 500 }
    );
  }
}
