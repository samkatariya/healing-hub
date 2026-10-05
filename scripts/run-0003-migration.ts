import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("ERROR: DATABASE_URL is not set in environment or .env");
  process.exit(1);
}

async function run() {
  console.log("Connecting to database via postgres...");
  const sql = postgres(url, { ssl: 'require', max: 1 });

  const migrationFilePath = path.join(process.cwd(), 'drizzle/migrations/0003_hospitals_and_booking_requests.sql');
  const sqlContent = fs.readFileSync(migrationFilePath, 'utf8');

  // Split by statement-breakpoint
  const statements = sqlContent
    .split('--> statement-breakpoint')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  console.log(`Found ${statements.length} migration statements to execute.`);

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    console.log(`Executing statement ${i + 1}/${statements.length}...`);
    await sql.unsafe(stmt);
  }

  console.log("Statements executed successfully. Verifying...");

  const hospitals = await sql`SELECT count(*)::int as count FROM hospitals`;
  console.log(`Hospitals count in DB: ${hospitals[0]?.count}`);

  const sampleHospitals = await sql`SELECT slug, name, area, phone FROM hospitals ORDER BY sort_order ASC`;
  console.log("Hospitals list:");
  console.table(sampleHospitals);

  const bookingRequests = await sql`SELECT count(*)::int as count FROM booking_requests`;
  console.log(`Booking requests table verified. Current row count: ${bookingRequests[0]?.count}`);

  await sql.end();
}

run()
  .then(() => {
    console.log("Migration 0003 applied successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  });
