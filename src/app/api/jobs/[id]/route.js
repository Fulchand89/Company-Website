import { NextResponse } from "next/server";
import { jobService } from "@/services/jobService";

// GET /api/jobs/[id] - Get a single job by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const job = await jobService.getJobById(id);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("GET Job Detail Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve job details" },
      { status: 500 }
    );
  }
}

// PUT /api/jobs/[id] - Update a job by ID
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, department, location, type, experience, description } = body;

    // Check existence first
    const existing = await jobService.getJobById(id);
    if (!existing) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (!title || !department || !location || !type || !experience || !description) {
      return NextResponse.json(
        { error: "All job fields are required" },
        { status: 400 }
      );
    }

    const updatedJob = await jobService.updateJob(id, {
      title,
      department,
      location,
      type,
      experience,
      description,
    });

    return NextResponse.json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    console.error("PUT Job Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update job details" },
      { status: 500 }
    );
  }
}

// DELETE /api/jobs/[id] - Delete a job by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const existing = await jobService.getJobById(id);
    if (!existing) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    await jobService.deleteJob(id);

    return NextResponse.json({ message: "Job listing deleted successfully" });
  } catch (error) {
    console.error("DELETE Job Listing Error:", error);
    return NextResponse.json(
      { error: "Failed to delete job listing" },
      { status: 500 }
    );
  }
}
