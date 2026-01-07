import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    // read file
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const supabaseAdmin = getSupabaseAdmin();

    const filePath = `uploads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

    // ensure bucket exists
    const bucketName = 'uploads'
    const createRes = await supabaseAdmin.storage.createBucket(bucketName, { public: true }).catch(() => null)

    const { error: uploadErr } = await supabaseAdmin.storage.from(bucketName).upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

    if (uploadErr) {
      console.error("Upload error:", uploadErr);
      return NextResponse.json({ error: uploadErr.message }, { status: 500 });
    }

    const { data: urlData } = supabaseAdmin.storage.from(bucketName).getPublicUrl(filePath);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
