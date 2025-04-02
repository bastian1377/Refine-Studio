"use server"

import { supabase } from "@/lib/supabase"
import type { StaffMember } from "@/lib/database.types"

export async function getStaff(): Promise<StaffMember[]> {
  try {
    const { data, error } = await supabase.from("staff").select("*").order("created_at", { ascending: true })

    if (error) {
      console.error("Error fetching staff:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Exception fetching staff:", error)
    return []
  }
}

export async function addStaffMember(staff: Omit<StaffMember, "id" | "created_at">): Promise<StaffMember | null> {
  try {
    const { data, error } = await supabase.from("staff").insert([staff]).select()

    if (error) {
      console.error("Error adding staff member:", error)
      return null
    }

    return data[0] || null
  } catch (error) {
    console.error("Exception adding staff member:", error)
    return null
  }
}

export async function updateStaffMember(
  id: string,
  staff: Omit<StaffMember, "id" | "created_at">,
): Promise<StaffMember | null> {
  try {
    const { data, error } = await supabase.from("staff").update(staff).eq("id", id).select()

    if (error) {
      console.error("Error updating staff member:", error)
      return null
    }

    return data[0] || null
  } catch (error) {
    console.error("Exception updating staff member:", error)
    return null
  }
}

export async function deleteStaffMember(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("staff").delete().eq("id", id)

    if (error) {
      console.error("Error deleting staff member:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Exception deleting staff member:", error)
    return false
  }
}

