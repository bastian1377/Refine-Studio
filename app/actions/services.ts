"use server"

import { supabase } from "@/lib/supabase"
import type { Service } from "@/lib/database.types"

export async function getServices(): Promise<Service[]> {
  try {
    const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: true })

    if (error) {
      console.error("Error fetching services:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Exception fetching services:", error)
    return []
  }
}

export async function addService(service: Omit<Service, "id" | "created_at">): Promise<Service | null> {
  try {
    const { data, error } = await supabase.from("services").insert([service]).select()

    if (error) {
      console.error("Error adding service:", error)
      return null
    }

    return data[0] || null
  } catch (error) {
    console.error("Exception adding service:", error)
    return null
  }
}

export async function updateService(id: string, service: Omit<Service, "id" | "created_at">): Promise<Service | null> {
  try {
    const { data, error } = await supabase.from("services").update(service).eq("id", id).select()

    if (error) {
      console.error("Error updating service:", error)
      return null
    }

    return data[0] || null
  } catch (error) {
    console.error("Exception updating service:", error)
    return null
  }
}

export async function deleteService(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("services").delete().eq("id", id)

    if (error) {
      console.error("Error deleting service:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Exception deleting service:", error)
    return false
  }
}

