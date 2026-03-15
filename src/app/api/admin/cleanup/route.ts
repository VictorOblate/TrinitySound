import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/authOptions'
import prisma from '@/lib/db'

// Ensure this is treated as a dynamic route
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    // Fetch valid admin ids
    const admins = await prisma.adminUser.findMany({
      select: { id: true },
    })
    const adminIds = admins.map((a) => a.id)

    // Delete portfolio items where created_by is null OR not in admin ids
    const deletedPortfolio = await prisma.portfolioItem.deleteMany({
      where: {
        OR: [
          { created_by: null },
          { created_by: { notIn: adminIds } },
        ],
      },
    })

    // Delete events where created_by is null OR not in admin ids
    const deletedEvents = await prisma.event.deleteMany({
      where: {
        OR: [
          { created_by: null },
          { created_by: { notIn: adminIds } },
        ],
      },
    })

    return NextResponse.json({
      message: 'Cleanup completed',
      deletedPortfolio: deletedPortfolio.count,
      deletedEvents: deletedEvents.count,
    })
  } catch (err: any) {
    console.error('Cleanup failed', err)
    return NextResponse.json({ error: err.message || 'Cleanup failed' }, { status: 500 })
  }
}