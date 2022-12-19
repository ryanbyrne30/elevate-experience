import NextAuth, { type NextAuthOptions } from "next-auth";

// Prisma adapter for NextAuth, optional and can be removed
import { env } from "../../../env/server.mjs";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/server/db/client";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // Include user.id on session
  callbacks: {
    async signIn({ user, email }) {
      return !email?.verificationRequest || user.id !== user.email;
    },
    async jwt({ token, user }) {
      return {
        ...token,
        userId: user?.id,
      };
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: env.EMAIL_HOST,
        port: env.EMAIL_PORT,
        auth: {
          user: env.EMAIL_FROM,
          pass: env.EMAIL_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
    }),
  ],
};

export default NextAuth(authOptions);
