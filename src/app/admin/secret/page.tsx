import { redirect } from 'next/navigation'

export default function SecretAdminRedirect({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const token = Array.isArray(searchParams.t) ? searchParams.t?.[0] : searchParams.t
  const expected = process.env.ADMIN_SECRET_LINK_TOKEN || process.env.NEXT_PUBLIC_ADMIN_SECRET_LINK_TOKEN

  if (token && expected && token === expected) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Invalid link</h2>
        <p className="text-gray-600 mt-2">This admin link is not valid.</p>
      </div>
    </div>
  )
}
