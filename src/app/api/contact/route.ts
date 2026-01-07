import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

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

    const supabaseAdmin = getSupabaseAdmin();

    const { data, error } = await supabaseAdmin
      .from("contact_messages")
      .insert([
        {
          name,
          email,
          phone,
          event_type: eventType || null,
          event_date: eventDate || null,
          expected_guests: guestCount || null,
          message,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Message received", data }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
