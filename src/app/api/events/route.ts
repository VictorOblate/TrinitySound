import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const data = await prisma.event.findMany({
      where: {
        date: {
          gte: today,
        },
      },
      orderBy: { date: "asc" },
    });

    return NextResponse.json({ data });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
