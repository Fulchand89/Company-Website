import { NextResponse } from "next/server";
import { eventService } from "@/services/eventService";

export const dynamic = "force-dynamic";

// GET /api/events - List active events for public showcase
export async function GET(request) {
  try {
    const events = await eventService.getAllEvents();

    return NextResponse.json(events, {
      headers: { 
        "Cache-Control": "no-store, max-age=0, must-revalidate",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store"
      }
    });
  } catch (error) {
    console.error("GET Events API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve events", details: error.message },
      { status: 500 }
    );
  }
}
