#!/usr/bin/env node
const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcryptjs')

async function main(){
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in env')
    process.exit(1)
  }
  const supabase = createClient(url, key, { auth: { persistSession: false } })
  const email = process.argv[2] || 'admin@trinitysound.com'
  const password = process.argv[3] || 'admin123'

  const resp = await supabase.from('admin_users').select('id, email, password_hash').eq('email', email).limit(1).single()
  console.log('raw resp:', JSON.stringify(resp, null, 2))
  const { data, error } = resp
  if (error) {
    console.error('Supabase error:', error)
    process.exit(1)
  }
  if (!data) {
    console.log('No admin user with that email')
    process.exit(1)
  }
  const ok = await bcrypt.compare(password, data.password_hash)
  console.log({ email: data.email, id: data.id, password_match: ok })
}

main().catch(err=>{console.error(err); process.exit(1)})
