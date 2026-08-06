import { NextResponse } from "next/server";
import { contactService } from "@/services/contactService";
import { emailService } from "@/services/emailService";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Invalid JSON request payload" },
        { status: 400 }
      );
    }

    const { name, email, phone, message, service, details } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    const contact = await contactService.createContact({ name, email, phone, message, service, details });

    // Send email notifications. We wrap this in a try/catch block so that
    // SMTP connection errors do not fail the database submission.
    try {
      await emailService.sendContactEmails({ name, email, phone, message });
    } catch (emailError) {
      console.error("Failed to send contact email notifications:", emailError);
    }

    return NextResponse.json(
      { message: "Contact message submitted successfully", contact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API Route Error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact request", details: error.message },
      { status: 500 }
    );
  }
}

// Optional GET handler to view submissions (with optional pagination)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    if (page || limit) {
      const p = parseInt(page || "1", 10);
      const l = parseInt(limit || "10", 10);
      const result = await contactService.getPaginatedContacts(p, l);
      return NextResponse.json(result);
    }

    const contacts = await contactService.getAllContacts();
    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Get Contacts API Route Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve messages", details: error.message },
      { status: 500 }
    );
  }
}
