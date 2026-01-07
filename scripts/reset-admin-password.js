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
  const supabase = createClient(url, key)
  const email = process.argv[2] || 'admin@trinitysound.com'
  const password = process.argv[3] || 'admin123'
  const hash = await bcrypt.hash(password, 10)
  const { data, error } = await supabase.from('admin_users').update({ password_hash: hash }).eq('email', email)
  if (error) {
    console.error('Supabase error:', error)
    process.exit(1)
  }
  console.log('Updated admin password hash for', email)
}

main().catch(err=>{console.error(err); process.exit(1)})
