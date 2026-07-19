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
