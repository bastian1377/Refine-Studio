import { createClient } from "@supabase/supabase-js"

// Get environment variables with fallbacks for build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-for-build.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key-for-build"

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)

