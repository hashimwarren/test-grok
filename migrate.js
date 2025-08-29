require('dotenv').config({ path: '.env.local' });
const { execSync } = require('child_process');

console.log('Loading environment variables...');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

try {
  console.log('Running database migration...');
  execSync('npx drizzle-kit migrate', { stdio: 'inherit' });
  console.log('Migration completed successfully!');
} catch (error) {
  console.error('Migration failed:', error.message);
}
