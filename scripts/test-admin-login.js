#!/usr/bin/env node
const { Client } = require('pg')
const bcrypt = require('bcryptjs')

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.error('Please set DATABASE_URL')
    process.exit(1)
  }

  const email = process.argv[2] || 'admin@trinitysound.com'
  const password = process.argv[3] || 'admin123'

  const client = new Client({ connectionString: url })
  await client.connect()
  try {
    const res = await client.query('SELECT id, email, password_hash FROM public.admin_users WHERE email=$1 LIMIT 1', [email])
    if (!res.rows.length) {
      console.log('No admin with that email')
      process.exit(1)
    }
    const row = res.rows[0]
    const ok = await bcrypt.compare(password, row.password_hash)
    console.log({ email: row.email, id: row.id, password_match: ok })
  } finally {
    await client.end()
  }
}

main().catch((err)=>{console.error(err); process.exit(1)})
