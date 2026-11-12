import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

/**
 * Removes sslmode / uselibpqcompat from the connection string so `pg` does not
 * emit the SSL deprecation warning. SSL is configured explicitly via the `ssl` option below.
 */
function stripSslParams(url: string | undefined): string | undefined {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete("sslmode");
    parsed.searchParams.delete("uselibpqcompat");
    return parsed.toString();
  } catch {
    return url;
  }
}

export const pool = new Pool({
  connectionString: stripSslParams(process.env.DATABASE_URL),
  ssl: process.env.DATABASE_URL?.includes("localhost") ? false : { rejectUnauthorized: false },
});

export const db = drizzle(pool, { schema });

let columnsMigrated = false;

/**
 * Ensures newly added columns exist in postgres table without requiring manual SQL migrations
 */
export async function ensureProductDraftColumns() {
  if (columnsMigrated || !process.env.DATABASE_URL) return;
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        ALTER TABLE shop_products ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'published';
        ALTER TABLE shop_products ADD COLUMN IF NOT EXISTS sender_phone text;
        ALTER TABLE shop_products ADD COLUMN IF NOT EXISTS raw_message text;
        ALTER TABLE shop_products ADD COLUMN IF NOT EXISTS specs text;
        ALTER TABLE shop_products ADD COLUMN IF NOT EXISTS condition text DEFAULT 'Certified Refurbished';
        ALTER TABLE shop_products ADD COLUMN IF NOT EXISTS warranty text DEFAULT '6 Months Warranty';
      `);
      columnsMigrated = true;
    } finally {
      client.release();
    }
  } catch (err) {
    // If table doesn't exist yet or connection fails, continue gracefully
    console.warn("[DB] Note on schema check:", err instanceof Error ? err.message : err);
  }
}
