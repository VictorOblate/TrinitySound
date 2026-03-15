import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import prisma from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await prisma.portfolioItem.findMany({
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json({ data });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, description, category, image_url, location, guests, date, featured } = body;

  if (!title) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

  const adminId = (session as any).user?.id;

  try {
    const data = await prisma.portfolioItem.create({
      data: {
        title,
        description,
        category,
        image_url,
        location,
        guests,
        date,
        featured: !!featured,
        created_by: adminId,
      },
    });

    return NextResponse.json({ data }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const data = await prisma.portfolioItem.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json({ data });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const data = await prisma.portfolioItem.delete({
      where: { id },
    });

    return NextResponse.json({ data });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
