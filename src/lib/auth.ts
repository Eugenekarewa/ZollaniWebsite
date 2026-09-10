import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { headers } from "next/headers";
import { db } from "@/lib/db";

const origin = (value?: string) => value ? `https://${value}` : undefined;
const trustedOrigins = [
  "http://localhost:3000",
  process.env.V0_RUNTIME_URL,
  process.env.V0_DEV_APP_URL,
  process.env.V0_BUILD_URL,
  process.env.V0_SANDBOX_URL,
  origin(process.env.VERCEL_URL),
  origin(process.env.VERCEL_PROJECT_PRODUCTION_URL),
  "https://zollani.co.ke",
].filter((value): value is string => Boolean(value));

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: { enabled: true },
  baseURL: process.env.BETTER_AUTH_URL ?? origin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ?? origin(process.env.VERCEL_URL) ?? process.env.V0_RUNTIME_URL,
  trustedOrigins,
  ...(process.env.NODE_ENV === "development" ? { advanced: { defaultCookieAttributes: { sameSite: "none" as const, secure: true } } } : {}),
});

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}
