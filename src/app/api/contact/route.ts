import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, eventType, eventDate, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Ferya Event <onboarding@resend.dev>",
      to: env.server.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        eventType ? `Event Type: ${eventType}` : null,
        eventDate ? `Event Date: ${eventDate}` : null,
        ``,
        `Message:`,
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
