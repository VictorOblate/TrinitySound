#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.error('Please set DATABASE_URL')
    process.exit(1)
  }

  const migrationsDir = path.join(process.cwd(), 'supabase', 'migrations')
  if (!fs.existsSync(migrationsDir)) {
    console.error('Migrations directory not found:', migrationsDir)
    process.exit(1)
  }

  const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort()
  if (!files.length) {
    console.log('No SQL migrations to run')
    return
  }

  const client = new Client({ connectionString: url })
  await client.connect()

  try {
    for (const file of files) {
      const filePath = path.join(migrationsDir, file)
      console.log('Running', file)
      const sql = fs.readFileSync(filePath, 'utf8')
      try {
        await client.query('BEGIN')
        await client.query(sql)
        await client.query('COMMIT')
        console.log('Applied', file)
      } catch (err) {
        await client.query('ROLLBACK')
        console.error('Failed to apply', file)
        throw err
      }
    }
    console.log('All migrations applied')
  } finally {
    await client.end()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
