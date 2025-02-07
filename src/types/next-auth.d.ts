import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      role: string;
    } & DefaultSession["user"];
    accessToken: string;
    expires: Date;
    error?: string;
  }

  interface User {
    email: string;
    role: string;
    token: string;
    expires: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email: string;
    role: string;
    accessToken: string;
    expires: Date;
  }
}