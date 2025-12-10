-- Migration: Add INSERT policy for profiles table
-- This allows new users to have profiles created during signup

-- Allow authenticated users to insert their own profile
-- This is needed when a user signs up and the trigger creates their profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Note: The handle_new_user() trigger function is defined with SECURITY DEFINER,
-- which means it executes with the privileges of the user who defined it (typically postgres).
-- This allows the trigger to bypass RLS policies when creating profiles.
-- However, we still add the above policy to allow manual profile creation if needed
-- and to make the security model explicit and transparent.
