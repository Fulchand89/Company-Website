import { NextResponse } from "next/server";
import { eventService } from "@/services/eventService";

export const revalidate = 60;

let eventsCache = null;
let eventsCacheTime = 0;
const CACHE_TTL = 60 * 1000;

// GET /api/events - List active events for public showcase
export async function GET(request) {
  try {
    const now = Date.now();
    if (eventsCache && (now - eventsCacheTime < CACHE_TTL)) {
      return NextResponse.json(eventsCache, {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
      });
    }

    const events = await eventService.getAllEvents();
    eventsCache = events;
    eventsCacheTime = now;

    return NextResponse.json(events, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
    });
  } catch (error) {
    console.error("GET Events API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve events", details: error.message },
      { status: 500 }
    );
  }
}
