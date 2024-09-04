const { execSync } = require('node:child_process');
try {
  // Generate Prisma Client
  execSync('npx prisma generate');
} catch (error) {
  console.error('Prisma Client generation failed.');
  process.exit(1);
}

try {
  // Check if the database is already initialized
  execSync('npx prisma db pull');
  console.log('Database is already initialized.');
} catch (error) {
  // If the database is not initialized, run the migration
  console.log('Initializing the database...');
  execSync('npx prisma db push');
}
