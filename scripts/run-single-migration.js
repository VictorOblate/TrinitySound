#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

async function main() {
  const url = process.env.DATABASE_URL
  const name = process.argv[2]
  if (!url) {
    console.error('Please set DATABASE_URL')
    process.exit(1)
  }
  if (!name) {
    console.error('Please provide migration filename as argument')
    process.exit(1)
  }

  const filePath = path.join(process.cwd(), 'supabase', 'migrations', name)
  if (!fs.existsSync(filePath)) {
    console.error('Migration file not found:', filePath)
    process.exit(1)
  }

  const client = new Client({ connectionString: url })
  await client.connect()

  const sql = fs.readFileSync(filePath, 'utf8')
  try {
    await client.query('BEGIN')
    await client.query(sql)
    await client.query('COMMIT')
    console.log('Applied', name)
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Failed to apply', name, err)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main().catch((err) => { console.error(err); process.exit(1) })
