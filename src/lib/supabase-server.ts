import { createClient } from '@supabase/supabase-js'
import { proxySupabaseFetch } from './supabase-proxy'

// Lazily create the server-side Supabase client when first needed.
// This avoids build-time errors when env vars are not set during static builds.
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be provided')
  }

  // If proxy mode is enabled use a custom fetch that forwards requests through
  // our undici-backed proxy helper. This is useful in environments like
  // Codespaces where direct IPv6 connectivity to Supabase may be restricted.
  if (process.env.USE_SUPABASE_PROXY === 'true') {
    const fetchFn: typeof fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const inputUrl = typeof input === 'string' ? input : input instanceof URL ? input.toString() : (input as Request).url
      // Create a path relative to the SUPABASE_URL so proxySupabaseFetch can build the correct target
      const target = new URL(inputUrl)
      const path = target.pathname + target.search
      return proxySupabaseFetch(path, init)
    }

    const opts: any = {
      global: { headers: { 'x-supabase-client': 'trinity-sound-server' } },
      fetch: fetchFn,
    }

    return createClient(url, key, opts)
  }

  return createClient(url, key, {
    global: { headers: { 'x-supabase-client': 'trinity-sound-server' } },
  })
}
