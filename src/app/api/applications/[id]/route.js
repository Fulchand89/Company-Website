import { NextResponse } from "next/server";
import { applicationService } from "@/services/applicationService";
import fs from "fs/promises";
import path from "path";

// DELETE /api/applications/[id] - Delete an application and its resume file
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Get the application details first to find resume URL
    const list = await applicationService.getAllApplications();
    const app = list.find((a) => a.id === parseInt(id, 10));

    if (app && app.resume_url) {
      const filePath = path.join(process.cwd(), "public", app.resume_url);
      try {
        await fs.unlink(filePath);
      } catch (err) {
        console.warn("Could not delete resume file from disk:", err.message);
      }
    }

    await applicationService.deleteApplication(id);

    return NextResponse.json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("DELETE Application API Error:", error);
    return NextResponse.json(
      { error: "Failed to delete candidate application" },
      { status: 500 }
    );
  }
}
