import { NextResponse } from "next/server";
import { contactService } from "@/services/contactService";

// DELETE /api/contact/[id] - Delete a contact submission
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await contactService.deleteContact(id);
    return NextResponse.json({ message: "Contact query deleted successfully" });
  } catch (error) {
    console.error("DELETE Contact query Error:", error);
    return NextResponse.json(
      { error: "Failed to delete contact submission" },
      { status: 500 }
    );
  }
}

// PATCH /api/contact/[id] - Update status, is_read, and/or admin_notes
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Invalid JSON request payload" },
        { status: 400 }
      );
    }

    const { status, is_read, admin_notes } = body;

    // Validate status value if provided
    const validStatuses = ["New", "In Review", "Approved", "Rejected", "Completed"];
    if (status !== undefined && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status value. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    await contactService.updateContact(id, { status, is_read, admin_notes });

    return NextResponse.json({ message: "Contact updated successfully" });
  } catch (error) {
    console.error("PATCH Contact Error:", error);
    return NextResponse.json(
      { error: "Failed to update contact submission", details: error.message },
      { status: 500 }
    );
  }
}
