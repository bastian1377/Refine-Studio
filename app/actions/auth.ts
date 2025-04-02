"use server"

import { supabase } from "@/lib/supabase"

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, user: data.user }
  } catch (error) {
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function signOut() {
  try {
    await supabase.auth.signOut()
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to sign out" }
  }
}

export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      return { session: null, error: error.message }
    }

    return { session: data.session, error: null }
  } catch (error) {
    return { session: null, error: "Failed to get session" }
  }
}

