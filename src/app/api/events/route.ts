import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function GET(req: Request) {
  const today = new Date().toISOString().split("T")[0];
  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  // Only return events posted by admins
  const { data: admins, error: adminErr } = await supabaseAdmin.from('admin_users').select('id')
  if (adminErr) {
    console.error('Failed to load admins', adminErr)
    return NextResponse.json({ error: adminErr.message }, { status: 500 })
  }

  const adminIds = (admins || []).map((a: any) => a.id).filter(Boolean)
  if (!adminIds.length) {
    return NextResponse.json({ data: [] })
  }

  const query = supabaseAdmin.from('events').select('*').gte('date', today).order('date', { ascending: true })
  const { data, error } = await query.in('created_by', adminIds)

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}
