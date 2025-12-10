import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

// Use placeholder URLs for development/testing when env vars are not set
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-anon-key';

const isConfigured = 
  process.env.REACT_APP_SUPABASE_URL && 
  process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!isConfigured) {
  console.warn('Supabase credentials not configured. Some features may not work.');
}

// Create client without strict typing for development flexibility
// In production with actual Supabase, the types will be auto-generated
export const supabase: SupabaseClient<Database> = createClient(supabaseUrl, supabaseAnonKey);
export const isSupabaseConfigured = isConfigured;
