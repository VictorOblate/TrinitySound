import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function GET() {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  const { data, error } = await supabaseAdmin
    .from("portfolio_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, description, category, image_url, location, guests, date, featured } = body;

  if (!title) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

  let supabaseAdmin;
  try { supabaseAdmin = getSupabaseAdmin(); } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }

  const adminId = (session as any).user?.id

  const { data, error } = await supabaseAdmin
    .from("portfolio_items")
    .insert([{ title, description, category, image_url, location, guests, date, featured: !!featured, created_by: adminId }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data }, { status: 201 });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  let supabaseAdmin;
  try { supabaseAdmin = getSupabaseAdmin(); } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }

  const { data, error } = await supabaseAdmin.from("portfolio_items").update(updates).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  let supabaseAdmin;
  try { supabaseAdmin = getSupabaseAdmin(); } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }

  const { data, error } = await supabaseAdmin.from("portfolio_items").delete().eq("id", id).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data });
}
