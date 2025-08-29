import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import * as schema from '../src/lib/schema';

// This script helps set up the database for local development
// Make sure to set your DATABASE_URL in .env.local

async function setupDatabase() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('DATABASE_URL environment variable is not set');
    console.error('Please create a .env.local file with your Neon database URL');
    process.exit(1);
  }

  try {
    const sql = neon(databaseUrl);
    const db = drizzle(sql, { schema });

    console.log('Setting up database...');

    // Run migrations
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });

    console.log('Database setup complete!');
    console.log('You can now start adding employees to your directory.');

  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
