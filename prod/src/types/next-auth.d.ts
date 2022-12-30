import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      name: string;
      email: string;
      username: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
  }

  interface JWT {
    username: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    username?: string;
  }
}
