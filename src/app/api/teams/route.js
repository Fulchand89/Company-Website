import { NextResponse } from "next/server";
import { ensureTeamSchema, teamService } from "@/services/teamService";

export const dynamic = "force-dynamic";

const STATIC_TEAM_MEMBERS = Array(8).fill({
  name: "Jennifer",
  designation: "CEO",
  img: "/assets/images/hero/team-demo.png",
  role: "CEO",
});

export async function GET() {
  try {
    try {
      // Skip schema check for public reads — just query directly
      const { executeQuery } = await import("@/lib/db");
      const teamMembers = await executeQuery(
        "SELECT * FROM team_members WHERE status = 'active' ORDER BY display_order ASC, created_at DESC"
      );

      const formattedMembers = teamMembers.map(t => {
        let parsedSocials = {};
        try {
          if (t.social_links) parsedSocials = JSON.parse(t.social_links);
        } catch (_) { }

        return {
          id: t.id,
          name: t.name,
          designation: t.designation,
          role: t.designation, // Alias for component compatibility
          img: t.img,
          bio: t.bio,
          social_links: parsedSocials,
          display_order: t.display_order,
          featured: t.featured,
        };
      });

      return NextResponse.json({ data: formattedMembers });
    } catch (dbError) {
      // Table doesn't exist or DB unreachable — use static fallback
      return NextResponse.json({ data: STATIC_TEAM_MEMBERS });
    }
  } catch (error) {
    console.error("GET Teams API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve team members" },
      { status: 500 }
    );
  }
}
