import { NextResponse } from "next/server";
import { jobService } from "@/services/jobService";

export const revalidate = 60;

let jobsCache = null;
let jobsCacheTime = 0;
const CACHE_TTL = 60 * 1000;

// GET /api/jobs - List all jobs (with optional pagination)
export async function GET(request) {
  try {
    const searchParams = request.nextUrl?.searchParams || new URL(request.url).searchParams;
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const now = Date.now();
    const cacheKey = `jobs_${page || 'all'}_${limit || 'all'}`;

    if (jobsCache && jobsCache[cacheKey] && (now - jobsCacheTime < CACHE_TTL)) {
      return NextResponse.json(jobsCache[cacheKey], {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
      });
    }

    let payload;
    if (page || limit) {
      const p = parseInt(page || "1", 10);
      const l = parseInt(limit || "10", 10);
      payload = await jobService.getPaginatedJobs(p, l);
    } else {
      payload = await jobService.getAllJobs();
    }

    if (!jobsCache) jobsCache = {};
    jobsCache[cacheKey] = payload;
    jobsCacheTime = now;

    return NextResponse.json(payload, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
    });
  } catch (error) {
    console.error("GET Jobs API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve job listings", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/jobs - Create a new job opening
export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Invalid JSON request payload" },
        { status: 400 }
      );
    }

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
      { error: "Failed to create job opening", details: error.message },
      { status: 500 }
    );
  }
}
