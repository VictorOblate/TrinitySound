import CredentialsProvider from "next-auth/providers/credentials";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        console.log('[auth] authorize called for', credentials.email);
        let supabaseAdmin;
        try {
          supabaseAdmin = getSupabaseAdmin();
        } catch (err) {
          console.error("[auth] Supabase admin init error:", err);
          return null;
        }

        // Lookup admin user by email
        const { data, error } = await supabaseAdmin
          .from("admin_users")
          .select("id, email, password_hash, name")
          .eq("email", credentials.email)
          .limit(1)
          .single();

        if (error || !data) {
          console.log('[auth] user not found or query error', { error });
          return null;
        }

        const match = await bcrypt.compare(credentials.password, data.password_hash);
        console.log('[auth] password match for', credentials.email, ':', match);
        if (!match) return null;

        console.log('[auth] authorize success for', credentials.email);
        return { id: data.id, name: data.name, email: data.email };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  // NextAuth will pick NEXTAUTH_SECRET from env automatically, but set it explicitly if needed
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
