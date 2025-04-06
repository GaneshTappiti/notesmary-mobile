
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

const supabaseUrl = 'https://zsiwyvbiwyppkftcaeph.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzaXd5dmJpd3lwcGtmdGNhZXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMDc3OTEsImV4cCI6MjA1ODU4Mzc5MX0.3f32wT_1wmyVCqUhfnJpHCdoouYnuPyUWtR41N0-rys';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
});
