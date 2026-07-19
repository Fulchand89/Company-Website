import { NextResponse } from "next/server";
import { jobService } from "@/services/jobService";

// GET /api/jobs - List all jobs (with optional pagination)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    if (page || limit) {
      const p = parseInt(page || "1", 10);
      const l = parseInt(limit || "10", 10);
      const result = await jobService.getPaginatedJobs(p, l);
      return NextResponse.json(result);
    }

    const jobs = await jobService.getAllJobs();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("GET Jobs API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve job listings" },
      { status: 500 }
    );
  }
}

// POST /api/jobs - Create a new job opening
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, department, location, type, experience, description } = body;

    if (!title || !department || !location || !type || !experience || !description) {
      return NextResponse.json(
        { error: "All job fields are required" },
        { status: 400 }
      );
    }

    const newJob = await jobService.createJob({
      title,
      department,
      location,
      type,
      experience,
      description,
    });

    return NextResponse.json(
      { message: "Job created successfully", job: newJob },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Jobs API Error:", error);
    return NextResponse.json(
      { error: "Failed to create job opening" },
      { status: 500 }
    );
  }
}
