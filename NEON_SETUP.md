# Neon Database Setup Guide

This guide will help you set up your Neon database for the Employee Directory application.

## Step 1: Create a Neon Account

1. Go to [Neon Console](https://console.neon.tech/)
2. Sign up for a free account or log in if you already have one

## Step 2: Create a New Project

1. Click "Create Project" in the Neon dashboard
2. Choose a name for your project (e.g., "employee-directory")
3. Select your preferred region
4. Click "Create Project"

## Step 3: Get Your Connection String

1. In your Neon project dashboard, go to the "Connection Details" section
2. Copy the connection string (it should look like this):
   ```
   postgresql://username:password@ep-xxx-xxx.region.neon.tech/dbname?sslmode=require
   ```

## Step 4: Configure Your Environment

1. Create a `.env.local` file in your project root:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and replace the placeholder with your actual Neon connection string:
   ```
   DATABASE_URL="postgresql://username:password@ep-xxx-xxx.region.neon.tech/dbname?sslmode=require"
   ```

## Step 5: Set Up the Database Schema

1. Generate the migration files:
   ```bash
   npm run db:generate
   ```

2. Apply the migrations to your Neon database:
   ```bash
   npm run db:migrate
   ```

## Step 6: (Optional) Add Sample Data

To populate your database with sample employees for testing:

```bash
npm run db:seed
```

This will add 5 sample employees across different departments.

## Step 7: Start the Application

```bash
npm run dev
```

Your employee directory should now be running at [http://localhost:3000](http://localhost:3000) with a fully functional database!

## Database Management

- **View Database**: Use `npm run db:studio` to open Drizzle Studio and manage your data visually
- **Reset Database**: Delete all data from the Neon console and re-run migrations
- **Backup**: Use Neon's built-in backup features in the console

## Troubleshooting

### Connection Issues
- Ensure your DATABASE_URL is correctly formatted
- Check that your Neon database is active (not in sleep mode)
- Verify your IP is allowed (Neon allows all IPs by default)

### Migration Errors
- Make sure you've run `npm run db:generate` before `npm run db:migrate`
- Check that your database user has the necessary permissions

### Environment Variables
- Restart your development server after changing `.env.local`
- Ensure there are no extra spaces or quotes in your environment variables

## Next Steps

Once everything is set up:
1. Start adding employees through the web interface
2. Explore the search and filtering features
3. Customize the employee fields in `src/lib/schema.ts` if needed
4. Set up production deployment with Vercel or your preferred platform
