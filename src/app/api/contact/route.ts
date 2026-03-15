import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      eventType,
      eventDate,
      guestCount,
      message,
    } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name and message" },
        { status: 400 },
      );
    }

    const data = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        event_type: eventType || null,
        event_date: eventDate ? new Date(eventDate) : null,
        expected_guests: guestCount || null,
        message,
      },
    });

    return NextResponse.json({ message: "Message received", data }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
