import { NextResponse } from "next/server";
import { eventService } from "@/services/eventService";

export const dynamic = "force-dynamic";

// ── In-memory cache (120 s TTL) ───────────────────────────────────────────────
// Events change infrequently; a 2-minute cache is safe and avoids a DB round-
// trip on every About-page load.
const EVENTS_CACHE_TTL = 120_000;
let eventsCache = null;
let eventsCacheTime = 0;

// GET /api/events - List active events for public showcase
export async function GET(request) {
  try {
    const now = Date.now();

    // Serve from cache if still fresh
    if (eventsCache && now - eventsCacheTime < EVENTS_CACHE_TTL) {
      return NextResponse.json(eventsCache, {
        headers: {
          "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
          "X-Cache": "HIT",
        },
      });
    }

    const events = await eventService.getAllEvents();

    // Populate cache
    eventsCache = events;
    eventsCacheTime = now;

    return NextResponse.json(events, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("GET Events API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve events", details: error.message },
      { status: 500 }
    );
  }
}
