
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

// Mock data - in a real app, you'd use a database
let portfolioItems = [
  {
    id: '1',
    title: 'Corporate Event',
    description: 'Professional audio setup for corporate conference',
    category: 'Corporate',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    location: 'Downtown Convention Center',
    guests: '500+',
    date: '2024',
    featured: true,
  },
  {
    id: '2',
    title: 'Wedding Reception',
    description: 'Elegant sound system for wedding celebration',
    category: 'Weddings',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
    location: 'Garden Venue',
    guests: '200',
    date: '2024',
    featured: false,
  }
]

export async function GET() {
  return NextResponse.json(portfolioItems)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const newItem = {
      id: Date.now().toString(),
      ...body,
    }
    portfolioItems.push(newItem)
    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
