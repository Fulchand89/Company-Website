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
      { error: "Failed to retrieve users list" },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user (Registration)
export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required fields" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email address already exists" },
        { status: 400 }
      );
    }

    // Securely hash the password using PBKDF2
    const passwordHash = hashPassword(password);

    const newUser = await userService.createUser({
      name,
      email,
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
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
