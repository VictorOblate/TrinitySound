import http from 'node:http'
import https from 'node:https'
import dns from 'node:dns'

const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

const ALLOWED_PREFIXES = (process.env.SUPABASE_PROXY_ALLOWED_PREFIXES || '/rest/v1,/storage/v1,/auth/v1').split(',')
const FORCE_IPV6 = process.env.SUPABASE_PROXY_FORCE_IPV6 === 'true'

const agents = new Map<string, http.Agent | https.Agent>()

function getAgentForHost(hostname: string, isHttps: boolean) {
  const key = `${isHttps ? 'https' : 'http'}:${hostname}`
  if (agents.has(key)) return agents.get(key)!

  const lookup = (hostname: string, options: any, callback: any) => {
    if (typeof options === 'function') callback = options
    // If forced, prefer IPv6 lookups, otherwise fallback to system default
    if (FORCE_IPV6) {
      dns.lookup(hostname, { family: 6 }, callback)
    } else {
      dns.lookup(hostname, callback)
    }
  }

  const agentOptions = { keepAlive: true as const, lookup }
  const agent = isHttps ? new https.Agent(agentOptions) : new http.Agent(agentOptions)
  agents.set(key, agent)
  return agent
}

/**
 * Proxies a request to the Supabase project using native http/https request.
 * Enforces a prefix allowlist so arbitrary HTTP requests cannot be made.
 */
export async function proxySupabaseFetch(path: string, init?: RequestInit) {
  if (!SUPABASE_URL || !SERVICE_ROLE) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set to use the proxy')
  }

  const p = path.startsWith('/') ? path : `/${path}`
  const allowed = ALLOWED_PREFIXES.some((pref) => p.startsWith(pref))
  if (!allowed) {
    return new Response(JSON.stringify({ error: 'forbidden_path' }), {
      status: 403,
      headers: { 'content-type': 'application/json' },
    })
  }

  const url = new URL(p, SUPABASE_URL)
  const isHttps = url.protocol === 'https:'
  const headers = new Headers(init?.headers as HeadersInit)

  if (!headers.has('apikey') && ANON_KEY) headers.set('apikey', ANON_KEY)
  if (!headers.has('Authorization') && SERVICE_ROLE) headers.set('Authorization', `Bearer ${SERVICE_ROLE}`)

  const agent = getAgentForHost(url.hostname, isHttps)

  return await new Promise<Response>((resolve, reject) => {
    const opts: any = {
      method: init?.method || 'GET',
      headers: Object.fromEntries(headers.entries()),
      agent,
    }

    const client = isHttps ? https : http
    const req = client.request(url, opts, (res) => {
      const chunks: Buffer[] = []
      res.on('data', (c) => chunks.push(Buffer.from(c)))
      res.on('end', () => {
        const buf = Buffer.concat(chunks)
        const outHeaders: Record<string, string> = {}
        Object.entries(res.headers).forEach(([k, v]) => {
          if (Array.isArray(v)) outHeaders[k] = v.join(',')
          else if (v) outHeaders[k] = v
        })
        const response = new Response(buf, { status: res.statusCode, headers: outHeaders })
        resolve(response)
      })
    })

    req.on('error', (err) => reject(err))

    if (init?.body) {
      // Support ArrayBuffer/Uint8Array/Buffer
      if (init.body instanceof ArrayBuffer) req.write(Buffer.from(init.body))
      else if (ArrayBuffer.isView(init.body)) req.write(Buffer.from(init.body as any))
      else if (typeof init.body === 'string') req.write(init.body)
      else if (init.body instanceof Uint8Array) req.write(Buffer.from(init.body))
      else {
        // If it's a ReadableStream, pipe it
        // Convert ReadableStream to Buffer in userland is complex; assume small bodies provided as buffer/string
        try {
          req.write(Buffer.from(JSON.stringify(init.body)))
        } catch (e) {
          // ignore
        }
      }
    }

    req.end()
  })
}
