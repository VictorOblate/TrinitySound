
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

import { getSupabaseAdmin } from "@/lib/supabase-server"

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    // Only return portfolio items posted by admins
    const { data: admins, error: adminErr } = await supabaseAdmin.from('admin_users').select('id')
    if (adminErr) throw adminErr

    const adminIds = (admins || []).map((a: any) => a.id).filter(Boolean)
    if (!adminIds.length) return NextResponse.json([])

    const { data, error } = await supabaseAdmin
      .from('portfolio_items')
      .select('*')
      .in('created_by', adminIds)
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    // fallback to mock data if Supabase not available or table missing
    console.error("portfolio GET error, returning mock:", err)
    return NextResponse.json(portfolioItems)
  }
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
