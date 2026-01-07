import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/authOptions'
import { getSupabaseAdmin } from '@/lib/supabase-server'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let supabaseAdmin
  try { supabaseAdmin = getSupabaseAdmin() } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }) }

  try {
    // Fetch admin ids
    const { data: admins } = await supabaseAdmin.from('admin_users').select('id')
    const adminIds = (admins || []).map((a: any) => a.id).filter(Boolean)
    const adminList = adminIds.length ? adminIds.join(',') : ''

    // Delete portfolio items where created_by is null OR not in admin ids
    const orCond = adminList ? `created_by.is.null,created_by.not.in.(${adminList})` : `created_by.is.null`
    const resDel = await supabaseAdmin.from('portfolio_items').delete().or(orCond)
    const deletedPortfolio = (resDel as any).data as any[]
    const pErr = (resDel as any).error
    if (pErr) throw pErr

    // Delete events where created_by is null OR not in admin ids
    const orCondE = adminList ? `created_by.is.null,created_by.not.in.(${adminList})` : `created_by.is.null`
    const resDelE = await supabaseAdmin.from('events').delete().or(orCondE)
    const deletedEvents = (resDelE as any).data as any[]
    const eErr = (resDelE as any).error
    if (eErr) throw eErr

    return NextResponse.json({ message: 'Cleanup completed', deletedPortfolio: deletedPortfolio?.length || 0, deletedEvents: deletedEvents?.length || 0 })
  } catch (err: any) {
    console.error('Cleanup failed', err)
    return NextResponse.json({ error: err.message || 'Cleanup failed' }, { status: 500 })
  }
}