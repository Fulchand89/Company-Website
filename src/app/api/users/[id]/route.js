import { NextResponse } from "next/server";
import { userService } from "@/services/userService";
import { hashPassword } from "@/services/authService";

// GET /api/users/[id] - Get a single user by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const user = await userService.getUserById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("GET User Detail Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve user details" },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] - Update user details
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { name, email, role, password } = await request.json();

    const existingUser = await userService.getUserById(id);
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required fields" },
        { status: 400 }
      );
    }

    // Check email uniqueness if email is changing
    if (email !== existingUser.email) {
      const emailCheck = await userService.getUserByEmail(email);
      if (emailCheck) {
        return NextResponse.json(
          { error: "This email address is already in use by another account" },
          { status: 400 }
        );
      }
    }

    // Update user basic details
    const updatedUser = await userService.updateUser(id, {
      name,
      email,
      role: role || existingUser.role
    });

    // Optionally update password if provided
    if (password && password.trim() !== "") {
      const passwordHash = hashPassword(password);
      await userService.updatePassword(id, passwordHash);
    }

    return NextResponse.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("PUT User Detail Error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete a user
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const existingUser = await userService.getUserById(id);
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await userService.deleteUser(id);

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("DELETE User Error:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
