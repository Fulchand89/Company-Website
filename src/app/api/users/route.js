import { NextResponse } from "next/server";
import { userService } from "@/services/userService";
import { hashPassword } from "@/services/authService";

// GET /api/users - List all users
export async function GET() {
  try {
    const users = await userService.getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error("GET Users API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve users list", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user (Registration)
export async function POST(request) {
  try {
    // Enforce single user rule for admin panel
    const existingCount = await userService.getUserCount();
    if (existingCount >= 1) {
      return NextResponse.json(
        { error: "Only one administrator user is allowed in the system. Further user registration is disabled." },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Invalid JSON request payload" },
        { status: 400 }
      );
    }

    const { name, email, password, role } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Email address is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if email already exists
    const existingUser = await userService.getUserByEmail(cleanEmail);
    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email address already exists" },
        { status: 400 }
      );
    }

    // Securely hash the password using bcrypt
    const passwordHash = hashPassword(password);

    const newUser = await userService.createUser({
      name: name.trim(),
      email: cleanEmail,
      passwordHash,
      role: role || "user"
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Users API Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to register user", 
        details: error.message 
      },
      { status: 500 }
    );
  }
}
