
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const data = await prisma.portfolioItem.findMany({
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(data)
  } catch (err) {
    console.error("portfolio GET error:", err)
    return NextResponse.json({ error: "Failed to fetch portfolio items" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await request.headers.get('authorization')
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, category, image_url, location, guests, date, featured } = body

    if (!title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newItem = await prisma.portfolioItem.create({
      data: {
        title,
        description,
        category,
        image_url,
        location,
        guests,
        date,
        featured: !!featured,
      },
    })

    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    console.error("portfolio POST error:", error)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
