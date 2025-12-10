# Supabase Setup Guide

This document explains how to set up Supabase for the KKN Fysio application.

## Database Migrations

The database schema is managed through SQL migration files in this directory.

### Running Migrations

1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

3. Apply migrations:
   ```bash
   supabase db push
   ```

### Migration Files

- `001_initial_schema.sql` - Creates the initial database schema with profiles, events, and bookings tables
- `002_add_profile_insert_policy.sql` - Adds INSERT policies for the profiles table to support user signup

## Row Level Security (RLS)

All tables have Row Level Security enabled with the following policies:

### Profiles
- Users can read and update their own profile
- Admins can read all profiles
- Users can insert their own profile (required for signup)

### Events
- Public (authenticated and anonymous) can read all events
- Only admins can create, update, or delete events

### Bookings
- Users can read and create their own bookings
- Admins can read, update, and delete all bookings

## User Signup Flow

When a new user signs up:

1. Supabase Auth creates a new user in the `auth.users` table
2. The `on_auth_user_created` trigger automatically creates a profile in the `profiles` table
3. The profile is created with the user's email and full name from metadata

## Email Confirmation

By default, Supabase requires email confirmation for new signups. You can configure this in your Supabase project settings:

1. Go to Authentication > Settings
2. Configure "Enable email confirmations" based on your requirements
3. Set up email templates as needed

## Production Checklist

Before deploying to production:

- [ ] Run all migrations on your production database
- [ ] Configure environment variables with production Supabase credentials
- [ ] Test the signup flow
- [ ] Test the login flow
- [ ] Verify RLS policies are working correctly
- [ ] Set up proper email templates for password reset, confirmation, etc.
- [ ] Configure authentication providers as needed
- [ ] Review and adjust rate limiting settings
