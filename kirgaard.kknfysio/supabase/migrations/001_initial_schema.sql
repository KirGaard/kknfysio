-- Migration: Initial schema setup
-- Creates profiles, events, and bookings tables with RLS policies

-- Create custom types
CREATE TYPE event_type AS ENUM ('hold', 'online', 'workshop');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');

-- Create profiles table (links to auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create events table (for classes/workshops)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type event_type NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  location TEXT,
  max_spots INTEGER,
  price DECIMAL(10, 2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  status booking_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_event_id ON bookings(event_id);
CREATE INDEX idx_events_start_time ON events(start_time);
CREATE INDEX idx_events_type ON events(type);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Events policies
-- Public can read all events
CREATE POLICY "Public can read events"
  ON events FOR SELECT
  TO authenticated, anon
  USING (true);

-- Admins can insert events
CREATE POLICY "Admins can insert events"
  ON events FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Admins can update events
CREATE POLICY "Admins can update events"
  ON events FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Admins can delete events
CREATE POLICY "Admins can delete events"
  ON events FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Bookings policies
-- Users can read their own bookings
CREATE POLICY "Users can read own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own bookings
CREATE POLICY "Users can create own bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins can read all bookings
CREATE POLICY "Admins can read all bookings"
  ON bookings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Admins can update all bookings
CREATE POLICY "Admins can update all bookings"
  ON bookings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Admins can delete bookings
CREATE POLICY "Admins can delete all bookings"
  ON bookings FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
