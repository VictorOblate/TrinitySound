#!/usr/bin/env node
const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')
// Prefer `.env.local` in Next.js projects, fall back to `.env`.
dotenv.config({ path: '.env.local', override: false })
dotenv.config({ path: '.env', override: false })

async function main() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in env')
    process.exit(1)
  }

  const supabase = createClient(url, key)
  const bucketId = 'uploads'

  try {
    const { data: existing } = await supabase.storage.listBuckets()
    if (existing.find((b) => b.name === bucketId)) {
      console.log('Bucket already exists:', bucketId)
      return
    }

    const { error } = await supabase.storage.createBucket(bucketId, { public: true })
    if (error) throw error
    console.log('Created bucket:', bucketId)
  } catch (err) {
    console.error('Error creating bucket:', err)
    process.exit(1)
  }
}

main()
