import { NextResponse } from "next/server";
import { applicationService } from "@/services/applicationService";
import { emailService } from "@/services/emailService";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

// Allowed MIME types and file extensions
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];
const ALLOWED_EXTENSIONS = [".pdf", ".docx"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

// GET /api/applications - Get all submissions (Admin View with optional pagination & filtering)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Support fetching unique applied positions for filter UI dropdowns dynamically
    const getPositions = searchParams.get("getPositions");
    if (getPositions === "true") {
      const positions = await applicationService.getUniquePositions();
      return NextResponse.json({ positions });
    }

    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const search = searchParams.get("search") || "";
    const position = searchParams.get("position") || "";
    const status = searchParams.get("status") || "";
    const dateFrom = searchParams.get("dateFrom") || "";
    const dateTo = searchParams.get("dateTo") || "";
    const sort = searchParams.get("sort") || "latest";

    if (page || limit) {
      const p = parseInt(page || "1", 10);
      const l = parseInt(limit || "10", 10);
      const result = await applicationService.getPaginatedApplications({
        page: p,
        limit: l,
        search,
        position,
        status,
        dateFrom,
        dateTo,
        sort
      });
      return NextResponse.json(result);
    }

    const list = await applicationService.getAllApplications();
    return NextResponse.json(list);
  } catch (error) {
    console.error("GET Applications API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve applications", details: error.message },
      { status: 500 }
    );
  }
}

// PATCH /api/applications - Update candidate application status
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing required fields (id, status)" },
        { status: 400 }
      );
    }

    const allowedStatuses = ["New", "Reviewing", "Shortlisted", "Interview Scheduled", "Rejected", "Hired"];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    await applicationService.updateApplicationStatus(id, status);
    return NextResponse.json({ message: "Application status updated successfully" });
  } catch (error) {
    console.error("PATCH Applications API Error:", error);
    return NextResponse.json(
      { error: "Failed to update application status" },
      { status: 500 }
    );
  }
}

// POST /api/applications - Create a new job application and upload resume
export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    
    // Default position to "General Application" if not provided or empty
    let position = formData.get("position");
    if (!position || position.toString().trim() === "") {
      position = "General Application";
    }

    const resumeFile = formData.get("resume");

    // 1. Validation: Required fields
    if (!name || !email || !phone || !position || !resumeFile) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, phone, position, resume)" },
        { status: 400 }
      );
    }

    // 2. Validation: File instance verification
    if (!(resumeFile instanceof File)) {
      return NextResponse.json(
        { error: "Invalid file upload object" },
        { status: 400 }
      );
    }

    // 3. Validation: File type (PDF & DOCX only)
    const fileExtension = path.extname(resumeFile.name).toLowerCase();
    const mimeType = resumeFile.type;

    const isAllowedMime = ALLOWED_MIME_TYPES.includes(mimeType);
    const isAllowedExt = ALLOWED_EXTENSIONS.includes(fileExtension);

    if (!isAllowedMime && !isAllowedExt) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF and DOCX files are allowed." },
        { status: 400 }
      );
    }

    // 4. Validation: File size (Max 5 MB)
    if (resumeFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum allowed size is 5 MB." },
        { status: 400 }
      );
    }

    // 5. Generate unique filename and save path
    const buffer = Buffer.from(await resumeFile.arrayBuffer());
    const uniqueId = crypto.randomUUID();
    const cleanOriginalName = resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFilename = `${uniqueId}-${cleanOriginalName}`;
    
    // Vercel has a read-only filesystem except for /tmp
    const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL;
    const uploadDir = isProduction
      ? path.join("/tmp", "resumes")
      : path.join(process.cwd(), "public", "uploads", "resumes");
    
    // Ensure upload directory exists
    await mkdir(uploadDir, { recursive: true });
    
    const absoluteFilePath = path.join(uploadDir, uniqueFilename);
    await writeFile(absoluteFilePath, buffer);
    
    // Public URL path to store in database
    // Note: On Vercel, files in /tmp are not publicly accessible via URL.
    // For a permanent solution, you should use AWS S3, Cloudinary, or Vercel Blob.
    const relativeResumeUrl = isProduction
      ? `/uploads/resumes/${uniqueFilename}` // This will 404 on Vercel, but allows DB save.
      : `/uploads/resumes/${uniqueFilename}`;

    // 6. Save details to MySQL
    const application = await applicationService.createApplication({
      name,
      email,
      phone,
      position,
      resumeUrl: relativeResumeUrl
    });

    // Send email notifications. Wrap in try/catch to avoid breaking the response if SMTP fails.
    try {
      await emailService.sendCareerEmails({
        id: application.id,
        name,
        email,
        phone,
        position,
        experience: formData.get("experience") || null,
        resumeUrl: relativeResumeUrl,
        absoluteResumePath: absoluteFilePath,
        filename: resumeFile.name
      });
    } catch (emailError) {
      console.error("Failed to send career application email notifications:", emailError);
    }

    return NextResponse.json(
      { message: "Application and resume uploaded successfully", application },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Applications API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Failed to process upload.", details: error.message },
      { status: 500 }
    );
  }
}
