import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export const revalidate = 60;

let cacheData = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 1000;

const STATIC_TEAM_MEMBERS = [
  { id: 1, name: "Jennifer", designation: "CEO & Founder", img: "/assets/images/hero/team-demo.png", role: "CEO & Founder" },
  { id: 2, name: "Alexander Reed", designation: "Chief Technology Officer", img: "/assets/images/hero/team-demo.png", role: "Chief Technology Officer" },
  { id: 3, name: "Sophia Chen", designation: "VP of Product & Design", img: "/assets/images/hero/team-demo.png", role: "VP of Product & Design" },
  { id: 4, name: "Marcus Vance", designation: "Head of AI & Engineering", img: "/assets/images/hero/team-demo.png", role: "Head of AI & Engineering" },
  { id: 5, name: "Emily Watson", designation: "Lead UI/UX Designer", img: "/assets/images/hero/team-demo.png", role: "Lead UI/UX Designer" },
  { id: 6, name: "David Miller", designation: "Senior Full Stack Dev", img: "/assets/images/hero/team-demo.png", role: "Senior Full Stack Dev" },
  { id: 7, name: "Rachel Adams", designation: "Marketing Director", img: "/assets/images/hero/team-demo.png", role: "Marketing Director" },
  { id: 8, name: "Daniel Kim", designation: "DevOps Lead", img: "/assets/images/hero/team-demo.png", role: "DevOps Lead" },
];

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
        data: formattedMembers.length > 0 ? formattedMembers : STATIC_TEAM_MEMBERS
      };

      cacheData = responsePayload;
      cacheTime = now;

      return NextResponse.json(responsePayload, {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
      });
    } catch (dbError) {
      console.warn("Teams DB query error, using static fallback:", dbError.message);
      return NextResponse.json({ data: STATIC_TEAM_MEMBERS }, {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
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
