
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bgyqrenoxpqzoddjpwds.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJneXFyZW5veHBxem9kZGpwd2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNzAzNzQsImV4cCI6MjA1Nzk0NjM3NH0.RgecPekihiWvtFKTlovPt-lAoC8gHx3wLUUXw51Htns";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
