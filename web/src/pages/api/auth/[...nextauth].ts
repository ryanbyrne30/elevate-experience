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
    session({ session, user, token }) {
      console.log("Token", token);
      console.log("session", session);
      console.log("user", user);
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
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
