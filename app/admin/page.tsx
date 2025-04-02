"use client"

import { useState, useEffect } from "react"
import { AdminLogin } from "@/components/admin-login"
import { AdminDashboard } from "@/components/admin-dashboard"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false)
        setError("Authentication timed out. Please check your Supabase configuration.")
        console.error("Authentication timed out. Environment variables may be incorrect.")
      }
    }, 10000) // 10 seconds timeout

    async function checkSession() {
      try {
        console.log("Checking session...")
        console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set")
        // Don't log the actual key for security, just whether it exists
        console.log("Supabase Key exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Session error:", error)
          setError("Failed to get session: " + error.message)
          setLoading(false)
          return
        }

        console.log("Session data:", data.session ? "Session exists" : "No session")
        setSession(data.session)
        setLoading(false)
      } catch (err) {
        console.error("Unexpected error:", err)
        setError("An unexpected error occurred")
        setLoading(false)
      }
    }

    checkSession()

    return () => clearTimeout(timeoutId)
  }, [loading])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mb-4">Loading authentication...</div>
          <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
          <div className="mt-4 text-sm text-gray-500">
            If this takes too long, there might be an issue with your Supabase configuration.
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md p-4 bg-red-50 text-red-700 rounded-md">
          <h2 className="text-lg font-bold mb-2">Authentication Error</h2>
          <p>{error}</p>
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
            <p className="font-medium">Troubleshooting steps:</p>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>Check that your Supabase URL and anon key are correctly set in Vercel</li>
              <li>Verify that your Supabase project is active</li>
              <li>Check that your Vercel domain is added to the allowed URLs in Supabase</li>
              <li>Try clearing your browser cache and cookies</li>
            </ol>
          </div>
          <div className="mt-4 flex gap-4">
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">
              Try Again
            </button>
            <button onClick={() => (window.location.href = "/")} className="px-4 py-2 bg-black text-white rounded-md">
              Return to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return <AdminLogin />
  }

  return <AdminDashboard userEmail={session.user?.email} />
}

