import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// Support both standard anon key and the publishable key naming convention
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 
                        process.env.REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isConfigured) {
  console.error('Supabase credentials not configured!');
  console.error('Please set the following environment variables:');
  console.error('- REACT_APP_SUPABASE_URL');
  console.error('- REACT_APP_SUPABASE_ANON_KEY (or REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY)');
  
  // In production, fail fast if credentials are missing
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Supabase credentials are required in production');
  }
}

// For development, use placeholder values only if explicitly in development mode
// In production, require actual credentials
const url = supabaseUrl || (process.env.NODE_ENV === 'production' 
  ? '' 
  : 'https://placeholder.supabase.co');
const key = supabaseAnonKey || (process.env.NODE_ENV === 'production' 
  ? '' 
  : 'placeholder-anon-key');

if (!url || !key) {
  throw new Error('Supabase credentials are missing. Please configure environment variables.');
}

// Create client - will fail gracefully if credentials are invalid
export const supabase: SupabaseClient<Database> = createClient(url, key);
export const isSupabaseConfigured = isConfigured;
