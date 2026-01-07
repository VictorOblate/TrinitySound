import { NextRequest, NextResponse } from 'next/server'
import { proxySupabaseFetch } from '@/lib/supabase-proxy'

const PREFIX = '/api/_supabase-proxy'

async function handle(req: NextRequest) {
  // Require a secret for HTTP access unless explicitly disabled
  const proxySecret = process.env.SUPABASE_PROXY_SECRET
  if (!proxySecret) {
    return NextResponse.json({ error: 'proxy_disabled' }, { status: 403 })
  }

  const forwarded = req.headers.get('x-supabase-proxy-secret')
  if (forwarded !== proxySecret) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const url = new URL(req.url)
  const path = url.pathname.replace(PREFIX, '') + url.search
  const body = req.body ? await req.arrayBuffer() : undefined

  const res = await proxySupabaseFetch(path, { method: req.method, headers: Object.fromEntries(req.headers), body })
  const outHeaders: Record<string, string> = {}
  res.headers.forEach((v, k) => (outHeaders[k] = v))
  const buf = await res.arrayBuffer()

  return new NextResponse(Buffer.from(buf), { status: res.status, headers: outHeaders })
}

export async function GET(req: NextRequest) {
  return handle(req)
}
export async function POST(req: NextRequest) {
  return handle(req)
}
export async function PUT(req: NextRequest) {
  return handle(req)
}
export async function PATCH(req: NextRequest) {
  return handle(req)
}
export async function DELETE(req: NextRequest) {
  return handle(req)
}
export async function OPTIONS(req: NextRequest) {
  return handle(req)
}
