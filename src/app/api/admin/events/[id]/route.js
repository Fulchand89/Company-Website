import { NextResponse } from "next/server";
import { eventService } from "@/services/eventService";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, img, status, display_order } = body;

    if (!title || !img) {
      return NextResponse.json({ error: "Title and image are required" }, { status: 400 });
    }

    const updated = await eventService.updateEvent(id, {
      title,
      img,
      status: status || "active",
      display_order: parseInt(display_order || "0", 10),
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT Admin Event Error:", error);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await eventService.deleteEvent(id);
    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("DELETE Admin Event Error:", error);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
