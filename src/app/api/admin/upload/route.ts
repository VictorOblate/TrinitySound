import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import sharp from "sharp";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files allowed" }, { status: 400 });
    }

    // Validate file size before compression (max 10MB input)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 });
    }

    // Read file as buffer
    const buffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

    // Compress image with sharp
    // Optimize for web: max 1800px width, quality 80%, remove metadata
    const compressedBuffer = await sharp(imageBuffer)
      .resize(1800, 1800, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toBuffer();

    // Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 9);
    const filename = `portfolio-${timestamp}-${randomId}.webp`;

    // Convert to base64 for temporary storage
    const base64 = compressedBuffer.toString("base64");
    const dataUrl = `data:image/webp;base64,${base64}`;

    // Calculate compression ratio
    const compressionRatio = ((1 - compressedBuffer.length / imageBuffer.length) * 100).toFixed(1);

    return NextResponse.json({
      url: dataUrl,
      filename: filename,
      size: compressedBuffer.length,
      originalSize: imageBuffer.length,
      compressionRatio: `${compressionRatio}%`,
      note: "Image stored as base64. For production, configure Vercel Blob Storage in .env with BLOB_READ_WRITE_TOKEN",
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
