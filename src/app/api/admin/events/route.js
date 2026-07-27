import { NextResponse } from "next/server";
import { eventService } from "@/services/eventService";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl?.searchParams || new URL(request.url).searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const result = await eventService.getPaginatedEvents(page, limit);
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET Admin Events Error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, img, status, display_order } = body;

    if (!title || !img) {
      return NextResponse.json({ error: "Title and image URL are required" }, { status: 400 });
    }

    const newEvent = await eventService.createEvent({
      title,
      img,
      status: status || "active",
      display_order: parseInt(display_order || "0", 10),
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("POST Admin Events Error:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
