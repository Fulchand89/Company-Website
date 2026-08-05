import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export const dynamic = "force-dynamic";

let cacheData = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 1000;

export function clearTeamsCache() {
  cacheData = null;
  cacheTime = 0;
}

export async function GET() {
  try {
    const now = Date.now();
    if (cacheData && (now - cacheTime < CACHE_TTL)) {
      return NextResponse.json(cacheData, {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
      });
    }

    try {
      const teamMembers = await executeQuery(
        "SELECT * FROM team_members WHERE status = 'active' ORDER BY display_order ASC, created_at DESC"
      );

      const formattedMembers = (teamMembers || []).map(t => {
        let parsedSocials = {};
        try {
          if (t.social_links) parsedSocials = JSON.parse(t.social_links);
        } catch (_) { }

        return {
          id: t.id,
          name: t.name,
          designation: t.designation,
          role: t.designation,
          img: t.img,
          bio: t.bio,
          social_links: parsedSocials,
          display_order: t.display_order,
          featured: t.featured,
        };
      });

      const responsePayload = {
        data: formattedMembers
      };

      cacheData = responsePayload;
      cacheTime = now;

      return NextResponse.json(responsePayload, {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
      });
    } catch (dbError) {
      console.warn("Teams DB query error:", dbError.message);
      return NextResponse.json({ data: [] }, {
        headers: { "Cache-Control": "no-store" }
      });
    }
  } catch (error) {
    console.error("GET Teams API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve team members" },
      { status: 500 }
    );
  }
}

