import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET() {
  try {
    const [jobsCount] = await executeQuery("SELECT COUNT(*) as count FROM jobs");
    const [appsCount] = await executeQuery("SELECT COUNT(*) as count FROM applications");
    const [contactsCount] = await executeQuery("SELECT COUNT(*) as count FROM contacts");

    const recentApps = await executeQuery(
      "SELECT id, name, position, created_at FROM applications ORDER BY created_at DESC LIMIT 5"
    );
    const recentContacts = await executeQuery(
      "SELECT id, name, email, created_at FROM contacts ORDER BY created_at DESC LIMIT 5"
    );

    return NextResponse.json({
      stats: {
        totalJobs: jobsCount?.count || 0,
        totalApplications: appsCount?.count || 0,
        totalContacts: contactsCount?.count || 0,
      },
      recentApplications: recentApps,
      recentContacts: recentContacts,
    });
  } catch (error) {
    console.error("Dashboard Stats API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve dashboard statistics" },
      { status: 500 }
    );
  }
}
