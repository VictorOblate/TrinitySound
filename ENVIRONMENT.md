# Environment Variables Guide

## Overview
Trinity Sound uses MySQL with Prisma ORM for database management and NextAuth for authentication. All Supabase references have been removed.

## Required Environment Variables

### Database Configuration
- **DATABASE_URL** - MySQL connection string in format: `mysql://username:password@host:port/database_name`
  - Example: `mysql://admin:password@localhost:3306/trinity_sound`

### NextAuth Configuration
- **NEXTAUTH_SECRET** - Secret key for signing sessions and tokens
  - Generate with: `openssl rand -base64 32`
- **NEXTAUTH_URL** - Base URL for NextAuth callbacks
  - Development: `http://localhost:3000`
  - Production: `https://yourdomain.com`
- **NEXTAUTH_PROVIDERS** - Authentication providers (default: "credentials")

### Admin Configuration
- **ADMIN_SECRET_LINK_TOKEN** - Secret token to access hidden admin login at `/admin/secret?t=<token>`

## File Storage Configuration

Trinity Sound uses **image compression with Sharp** and can store images in two ways:

### For Development (Current Setup)
- ✅ Images are automatically compressed to WebP format
- ✅ Stored as base64 for immediate use in forms
- ⚠️ Base64 storage works for portfolios but is not ideal for production
- ✅ Max file size: 10MB, resizes to 1800px

### For Production (Vercel Blob)

When deployed to Vercel, you can enable persistent cloud storage:

1. **Deploy to Vercel**:
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Create Blob Store** in Vercel Dashboard:
   - Project Settings → Storage → Blob → Create

3. **Get your token**:
   - In Blob settings, copy the **Read/Write Token** (starts with `vercel_blob_rw_`)

4. **Add to `.env`**:
   ```
   BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxxxxxxxxxxx"
   ```

5. **Update the upload endpoint** (`src/app/api/admin/upload/route.ts`):
   - Install: `npm install @vercel/blob`
   - Uncomment the Vercel Blob code in the upload route
   - Redeploy: `vercel --prod`

### Image Compression Details

Every uploaded image is:
- ✅ Resized to max 1800px (maintains aspect ratio)
- ✅ Converted to WebP format (80% quality)
- ✅ Metadata removed
- **Result**: Files typically 70-80% smaller than originals

## Database Setup with Prisma

### 1. Create MySQL Database
```bash
mysql -u root -p
CREATE DATABASE trinity_sound CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 2. Configure DATABASE_URL
Add to your `.env` file:
```
DATABASE_URL="mysql://username:password@localhost:3306/trinity_sound"
```

### 3. Run Prisma Migrations
```bash
# Generate/apply migrations to database
npx prisma migrate dev

# View database in Prisma Studio
npx prisma studio
```

### 4. Seed Initial Admin (Optional)
Replace `admin@trinitysound.com` and password hash with your values. Use bcryptjs to generate a hash:
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password', 10))"
```

Then insert into database or use Prisma Studio.

## Prisma Commands

```bash
# View database in GUI
npx prisma studio

# Create a new migration
npx prisma migrate dev --name add_new_field

# Deploy migrations in production
npx prisma migrate deploy

# Reset database (dev only)
npx prisma migrate reset
```

## Important Notes

- Keep `NEXTAUTH_SECRET` and `ADMIN_SECRET_LINK_TOKEN` secret and never commit to version control
- The `DATABASE_URL` should not be committed to version control
- Ensure your MySQL server is running and accessible before starting the app
- File upload endpoint needs configuration (see File Storage section above)

## Environment Variables Example

See `.env.example` for a complete template with all configuration options.

