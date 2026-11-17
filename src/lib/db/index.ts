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
        ALTER TABLE shop_products ADD COLUMN IF NOT EXISTS condition text DEFAULT 'Ex-UK Grade A';
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

let testimonialsTableEnsured = false;

/**
 * Creates the testimonials table on first use so customer-submitted reviews
 * have somewhere to land without requiring a manual SQL migration.
 */
export async function ensureTestimonialsTable() {
  if (testimonialsTableEnsured || !process.env.DATABASE_URL) return;
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS testimonials (
          id text PRIMARY KEY,
          name text NOT NULL,
          role text NOT NULL DEFAULT '',
          company_or_location text NOT NULL DEFAULT '',
          rating integer NOT NULL DEFAULT 5,
          quote text NOT NULL,
          category text NOT NULL DEFAULT 'repair',
          status text NOT NULL DEFAULT 'pending',
          created_at timestamp NOT NULL DEFAULT now(),
          updated_at timestamp NOT NULL DEFAULT now()
        );
      `);
      testimonialsTableEnsured = true;
    } finally {
      client.release();
    }
  } catch (err) {
    console.warn("[DB] Note on testimonials schema check:", err instanceof Error ? err.message : err);
  }
}

let careersTablesEnsured = false;

/**
 * Creates the job postings and applications tables on first use so the
 * careers page works without requiring a manual SQL migration.
 */
export async function ensureCareersTables() {
  if (careersTablesEnsured || !process.env.DATABASE_URL) return;
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS job_postings (
          id text PRIMARY KEY,
          title text NOT NULL,
          department text NOT NULL DEFAULT 'General',
          location text NOT NULL DEFAULT 'Nairobi, Kenya',
          employment_type text NOT NULL DEFAULT 'Full-Time',
          summary text NOT NULL DEFAULT '',
          description text NOT NULL,
          requirements text NOT NULL DEFAULT '',
          apply_email text NOT NULL DEFAULT 'eugene.karewa@zollani.co.ke',
          status text NOT NULL DEFAULT 'draft',
          sort_order integer NOT NULL DEFAULT 0,
          created_at timestamp NOT NULL DEFAULT now(),
          updated_at timestamp NOT NULL DEFAULT now()
        );
        CREATE TABLE IF NOT EXISTS job_applications (
          id text PRIMARY KEY,
          job_id text NOT NULL,
          applicant_name text NOT NULL,
          email text NOT NULL,
          phone text NOT NULL DEFAULT '',
          cover_message text NOT NULL DEFAULT '',
          resume_url text NOT NULL DEFAULT '',
          status text NOT NULL DEFAULT 'new',
          created_at timestamp NOT NULL DEFAULT now()
        );
      `);
      careersTablesEnsured = true;
    } finally {
      client.release();
    }
  } catch (err) {
    console.warn("[DB] Note on careers schema check:", err instanceof Error ? err.message : err);
  }
}
