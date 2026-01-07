#!/usr/bin/env node
const { Client } = require('pg')

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.error('Please set DATABASE_URL')
    process.exit(1)
  }

  const client = new Client({ connectionString: url })
  await client.connect()
  try {
    console.log('Counting non-admin portfolio items...')
    const { rows: pRows } = await client.query(`SELECT COUNT(*) FROM public.portfolio_items WHERE created_by IS NULL OR created_by NOT IN (SELECT id FROM public.admin_users)`)
    console.log('Non-admin portfolio items:', pRows[0].count)

    console.log('Deleting non-admin portfolio items...')
    const res1 = await client.query(`DELETE FROM public.portfolio_items WHERE created_by IS NULL OR created_by NOT IN (SELECT id FROM public.admin_users)`)
    console.log('Deleted portfolio rows:', res1.rowCount)

    console.log('Counting non-admin events...')
    const { rows: eRows } = await client.query(`SELECT COUNT(*) FROM public.events WHERE created_by IS NULL OR created_by NOT IN (SELECT id FROM public.admin_users)`)
    console.log('Non-admin events:', eRows[0].count)

    console.log('Deleting non-admin events...')
    const res2 = await client.query(`DELETE FROM public.events WHERE created_by IS NULL OR created_by NOT IN (SELECT id FROM public.admin_users)`)
    console.log('Deleted events rows:', res2.rowCount)

    console.log('Cleanup complete')
  } catch (err) {
    console.error('Cleanup failed', err)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main().catch((err) => { console.error(err); process.exit(1) })
