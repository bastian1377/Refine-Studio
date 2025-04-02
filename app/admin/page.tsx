"use client"

import { useState, useEffect } from "react"
import { AdminLogin } from "@/components/admin-login"
import { AdminDashboard } from "@/components/admin-dashboard"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)

      // Set up auth state listener
      const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
        setSession(newSession)
      })

      return () => {
        authListener?.subscription.unsubscribe()
      }
    }

    checkSession()
  }, [])

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  if (!session) {
    return <AdminLogin />
  }

  return <AdminDashboard userEmail={session.user?.email} />
}

