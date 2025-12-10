-- Migration: Add INSERT policy for profiles table
-- This allows the trigger function to create profiles for new users

-- Allow the trigger function to insert profiles
-- The SECURITY DEFINER on the handle_new_user function should handle this,
-- but we add an explicit policy for clarity and robustness
CREATE POLICY "Service role can insert profiles"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- Also allow authenticated users to insert their own profile
-- (in case manual profile creation is needed)
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
