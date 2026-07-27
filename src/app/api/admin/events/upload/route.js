import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".svg"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

async function checkAuth() {
  try {
    const cookieStore = await cookies();
    const cookieName = process.env.SESSION_COOKIE_NAME || "gtw_session";
    const sessionCookie = cookieStore.get(cookieName);

    if (!sessionCookie) return false;

    const decodedValue = decodeURIComponent(sessionCookie.value);
    const session = JSON.parse(decodedValue);

    if (session.role === "admin" && (!session.exp || Date.now() / 1000 < session.exp)) {
      return true;
    }
  } catch (error) {
    console.error("API Auth verification failed:", error);
  }
  return false;
}

export async function POST(request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Invalid file object" }, { status: 400 });
    }

    const fileExtension = path.extname(file.name).toLowerCase();
    const mimeType = file.type;

    if (!ALLOWED_MIME_TYPES.includes(mimeType) && !ALLOWED_EXTENSIONS.includes(fileExtension)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, WEBP, and SVG images are allowed." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Image too large. Maximum size is 5 MB." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueId = crypto.randomUUID();
    const cleanOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFilename = `${uniqueId}-${cleanOriginalName}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads", "events");
    await mkdir(uploadDir, { recursive: true });

    const absoluteFilePath = path.join(uploadDir, uniqueFilename);
    await writeFile(absoluteFilePath, buffer);

    const relativeUrl = `/uploads/events/${uniqueFilename}`;

    return NextResponse.json(
      { message: "Event image uploaded successfully", url: relativeUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST Admin Event Upload Error:", error);
    return NextResponse.json({ error: "Failed to process image upload." }, { status: 500 });
  }
}
