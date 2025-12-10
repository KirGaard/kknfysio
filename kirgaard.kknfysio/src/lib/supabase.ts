import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isConfigured) {
  console.warn('Supabase credentials not configured. Some features may not work.');
}

// Use placeholder values only for development/testing when env vars are not set
// In production, these should always be properly configured
const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseAnonKey || 'placeholder-anon-key';

// Create client - will fail gracefully if credentials are invalid
export const supabase: SupabaseClient<Database> = createClient(url, key);
export const isSupabaseConfigured = isConfigured;
