import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";
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

        try {
          // Lookup admin user by email
          const user = await prisma.adminUser.findUnique({
            where: { email: credentials.email },
            select: { id: true, email: true, password_hash: true, name: true },
          });

          if (!user) {
            console.log('[auth] user not found');
            return null;
          }

          const match = await bcrypt.compare(credentials.password, user.password_hash);
          console.log('[auth] password match for', credentials.email, ':', match);
          if (!match) return null;

          console.log('[auth] authorize success for', credentials.email);
          return { id: user.id, name: user.name, email: user.email };
        } catch (err) {
          console.error("[auth] Database error:", err);
          return null;
        }
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
