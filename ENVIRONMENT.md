# Environment variables

Add these variables to your environment for full functionality:

- SUPABASE_URL - your Supabase project URL
- SUPABASE_SERVICE_ROLE_KEY - Supabase service role key (server-side only)
- ADMIN_SECRET_LINK_TOKEN - secret token to access the hidden admin login link at `/admin/secret?t=<token>`
- DATABASE_URL - Postgres connection string (used by drizzle migrations)

Notes:
- Create a Supabase Storage bucket named `uploads` (or change the bucket name in `src/app/api/admin/upload/route.ts`) to host uploaded images.

Apply migrations (example):

1. Add `DATABASE_URL` to your environment (Supabase provides the connection string on the Database -> Connection tab).
2. Run migrations with Drizzle CLI (examples):

   - Check status: `npm run migrate:status`
   - Generate a migration (if needed): `npm run migrate:generate`
   - Push/apply migrations: `npm run migrate:push` or `npm run migrate:dev`

If you'd like, I can run migrations locally if you provide a `DATABASE_URL` (or you can run them from your CI / runner).
Example:

```
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=service_role_...
ADMIN_SECRET_LINK_TOKEN=super-secret-token-123
```

Note: keep `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_SECRET_LINK_TOKEN` secret and do not expose them to the browser.

Proxy configuration (Codespaces/IPv6-only Supabase):

- To route Supabase calls through an IPv6-capable pooled connection, set `USE_SUPABASE_PROXY=true` in your environment and provide a `SUPABASE_PROXY_SECRET` to secure the HTTP proxy endpoint.
- By default the proxy only allows requests to these Supabase paths: `/rest/v1`, `/storage/v1`, and `/auth/v1`. You can override with `SUPABASE_PROXY_ALLOWED_PREFIXES` (comma-separated).
- Example:

```
USE_SUPABASE_PROXY=true
SUPABASE_PROXY_SECRET=some-very-secret-token
SUPABASE_PROXY_ALLOWED_PREFIXES=/rest/v1,/storage/v1,/auth/v1
```

When `USE_SUPABASE_PROXY=true` the server Supabase client will use an undici-backed proxy fetch which is robust in Codespaces and other IPv6-limited environments.
