# Production Deployment Guide

This guide explains how to deploy the KKN Fysio application to production.

## Prerequisites

1. A Supabase project (create one at https://app.supabase.com)
2. Environment variables configured

## Step 1: Configure Environment Variables

Create a `.env.local` file (for local testing) or configure your production environment with:

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

**Note:** You can also use `REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY` instead of `REACT_APP_SUPABASE_ANON_KEY` - the application supports both naming conventions.

### Getting your credentials:

1. Go to https://app.supabase.com
2. Select your project
3. Navigate to Settings → API
4. Copy the "Project URL" → use as `REACT_APP_SUPABASE_URL`
5. Copy the "anon public" key → use as `REACT_APP_SUPABASE_ANON_KEY`

## Step 2: Set Up the Database

You need to run the database migrations on your Supabase project.

### Option A: Using Supabase CLI (Recommended)

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

### Option B: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the migration files in order:
   - First run: `supabase/migrations/001_initial_schema.sql`
   - Then run: `supabase/migrations/002_add_profile_insert_policy.sql`

## Step 3: Test the Application

Before deploying to production, test locally:

```bash
# Install dependencies
npm install

# Start development server
npm start

# Try to sign up with a test account
```

## Step 4: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Step 5: Deploy

Deploy the `build/` folder to your hosting provider. The application works with any static hosting service:

- Vercel
- Netlify
- Firebase Hosting
- AWS S3 + CloudFront
- etc.

Make sure to configure your environment variables in your hosting provider's settings.

## Troubleshooting

### "Failed to fetch" error during signup

This usually means:
1. Environment variables are not set correctly
2. The Supabase URL or key is invalid
3. CORS is not configured properly in Supabase

**Solution:**
- Verify your environment variables are set correctly
- Check the browser console for detailed error messages
- Ensure your Supabase project allows requests from your domain

### Email confirmation not working

By default, Supabase requires email confirmation for new signups.

**Options:**
1. Configure email templates in Supabase → Authentication → Email Templates
2. Disable email confirmation in Supabase → Authentication → Settings (not recommended for production)

### Database migrations not applied

**Solution:**
- Ensure you ran all migration files in order
- Check the Supabase logs for any errors
- Verify the trigger `on_auth_user_created` exists in your database
