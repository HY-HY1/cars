/**
 * Applies all migrations in supabase/migrations/ in alphabetical order.
 *
 * 1. Supabase Dashboard → Project Settings → Database → Connection string (URI)
 * 2. Replace [YOUR-PASSWORD] with your database password
 * 3. Run:
 *    $env:DATABASE_URL="postgresql://postgres.xxx:[PASSWORD]@aws-0-....pooler.supabase.com:6543/postgres"
 *    npm run db:migrate
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

const url = process.env.DATABASE_URL;

if (!url) {
  console.error(`
Missing DATABASE_URL.

Get it from Supabase Dashboard → Settings → Database → Connection string (URI).
Use the "Transaction" pooler mode and replace [YOUR-PASSWORD].

Example (PowerShell):
  $env:DATABASE_URL="postgresql://postgres.xhkjkgajvzgpjptkfrrh:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
  npm run db:migrate
`);
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const migrationsDir = join(root, "supabase/migrations");

const files = readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

if (files.length === 0) {
  console.log("No migration files found.");
  process.exit(0);
}

const sql = postgres(url, { ssl: "require", max: 1 });

try {
  for (const file of files) {
    const migration = readFileSync(join(migrationsDir, file), "utf8");
    await sql.unsafe(migration);
    console.log(`✓ ${file}`);
  }
  console.log(`\nAll ${files.length} migration(s) applied successfully.`);
} catch (err) {
  console.error("Migration failed:", err.message ?? err);
  process.exit(1);
} finally {
  await sql.end();
}
