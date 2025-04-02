import { createClient } from "@supabase/supabase-js"

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Log environment variable status (not the actual values)
if (typeof window !== "undefined") {
  console.log("Supabase URL exists:", !!supabaseUrl)
  console.log("Supabase Key exists:", !!supabaseKey)
}

// Validate environment variables
if (!supabaseUrl) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

// Create Supabase client
export const supabase = createClient(
  supabaseUrl || "https://placeholder-for-build.supabase.co",
  supabaseKey || "placeholder-key-for-build",
)

