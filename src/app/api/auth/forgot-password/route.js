import { NextResponse } from "next/server";
import crypto from "crypto";
import { userService } from "@/services/userService";
import { emailService } from "@/services/emailService";

// POST /api/auth/forgot-password
export async function POST(request) {
  try {
    const { email } = await request.json().catch(() => ({}));

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await userService.getUserByEmail(cleanEmail);

    if (!user) {
      return NextResponse.json(
        { error: `No admin account found with email address "${cleanEmail}". Please check your registered email.` },
        { status: 404 }
      );
    }

    // Generate 32-byte hex token and 1-hour expiry
    const token = crypto.randomBytes(32).toString("hex");
    const expiryDate = new Date(Date.now() + 3600 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    await userService.saveResetToken(user.id, token, expiryDate);

    // Construct reset link
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetUrl = `${origin}/admin/reset-password?token=${token}`;

    // Send email
    const emailResult = await emailService.sendPasswordResetEmail({
      email: user.email,
      name: user.name,
      resetUrl,
      token
    });

    if (!emailResult.success) {
      console.error("SMTP Password Reset Email Error:", emailResult.error);
      return NextResponse.json(
        { 
          error: `Could not send email: ${emailResult.error || "SMTP not configured"}. Make sure SMTP_HOST, SMTP_USER, SMTP_PASS are set in Vercel Environment Variables.` 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `Password reset link sent successfully to ${user.email}! Please check your email inbox (and Spam folder).`
    }, { status: 200 });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json(
      { error: "Failed to process password reset request", details: error.message },
      { status: 500 }
    );
  }
}
