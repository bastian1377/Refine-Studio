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
    async function checkSession() {
      try {
        console.log("Checking session...")
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Session error:", error)
          setError("Failed to get session: " + error.message)
          setLoading(false)
          return
        }

        console.log("Session data:", data.session ? "Session exists" : "No session")
        setSession(data.session)

        // Set up auth state listener
        const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
          console.log("Auth state changed:", event)
          setSession(newSession)
        })

        setLoading(false)

        return () => {
          authListener?.subscription.unsubscribe()
        }
      } catch (err) {
        console.error("Unexpected error:", err)
        setError("An unexpected error occurred")
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mb-4">Loading authentication...</div>
          <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md p-4 bg-red-50 text-red-700 rounded-md">
          <h2 className="text-lg font-bold mb-2">Error</h2>
          <p>{error}</p>
          <p className="mt-4 text-sm">Please check your Supabase configuration and environment variables.</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 px-4 py-2 bg-black text-white rounded-md"
          >
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  if (!session) {
    return <AdminLogin />
  }

  return <AdminDashboard userEmail={session.user?.email} />
}

