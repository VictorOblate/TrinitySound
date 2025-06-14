
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const index = portfolioItems.findIndex(item => item.id === params.id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }
    
    portfolioItems[index] = { ...portfolioItems[index], ...body }
    return NextResponse.json(portfolioItems[index])
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const index = portfolioItems.findIndex(item => item.id === params.id)
  
  if (index === -1) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 })
  }
  
  portfolioItems.splice(index, 1)
  return NextResponse.json({ success: true })
}
