import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, role, experience, skills, available, img, status } = body;

    const skillsJson = Array.isArray(skills) ? JSON.stringify(skills) : skills;
    const availableVal = available ? 1 : 0;
    
    // Build update query dynamically based on provided fields
    const updates = [];
    const values = [];

    if (name !== undefined) { updates.push("name = ?"); values.push(name); }
    if (role !== undefined) { updates.push("role = ?"); values.push(role); }
    if (experience !== undefined) { updates.push("experience = ?"); values.push(experience); }
    if (skills !== undefined) { updates.push("skills = ?"); values.push(skillsJson); }
    if (available !== undefined) { updates.push("available = ?"); values.push(availableVal); }
    if (img !== undefined) { updates.push("img = ?"); values.push(img); }
    if (status !== undefined) { updates.push("status = ?"); values.push(status); }

    if (updates.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    values.push(id);
    const query = `UPDATE developers SET ${updates.join(", ")} WHERE id = ?`;

    await executeQuery(query, values);

    return NextResponse.json({ success: true, message: "Developer updated successfully" });
  } catch (error) {
    console.error("PUT Developer API Error:", error);
    return NextResponse.json({ error: "Failed to update developer" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    
    await executeQuery("DELETE FROM developers WHERE id = ?", [id]);

    return NextResponse.json({ success: true, message: "Developer deleted successfully" });
  } catch (error) {
    console.error("DELETE Developer API Error:", error);
    return NextResponse.json({ error: "Failed to delete developer" }, { status: 500 });
  }
}
