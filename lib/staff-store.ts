"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface StaffMember {
  id: string
  name: string
  role: string
  specialties: string[]
  image: string
  booksyUrl: string
  email: string
  phone: string
}

interface StaffState {
  staff: StaffMember[]
  editingStaff: StaffMember | null
  setEditingStaff: (staff: StaffMember) => void
  clearEditingStaff: () => void
  addStaff: (staff: Partial<StaffMember>) => void
  updateStaff: (staff: StaffMember) => void
  removeStaff: (id: string) => void
}

// Initial staff data
const initialStaff: StaffMember[] = [
  {
    id: "stylist1",
    name: "Emma Johnson",
    role: "Senior Stylist",
    specialties: ["Haircuts", "Coloring", "Styling"],
    image: "/placeholder.svg?height=100&width=100",
    booksyUrl: "https://booksy.com/en-us/profile/stylist1",
    email: "emma@refinestudio.com",
    phone: "(123) 456-7891",
  },
  {
    id: "stylist2",
    name: "Michael Chen",
    role: "Color Specialist",
    specialties: ["Balayage", "Highlights", "Color Correction"],
    image: "/placeholder.svg?height=100&width=100",
    booksyUrl: "https://booksy.com/en-us/profile/stylist2",
    email: "michael@refinestudio.com",
    phone: "(123) 456-7892",
  },
  {
    id: "stylist3",
    name: "Sofia Rodriguez",
    role: "Nail Technician",
    specialties: ["Manicures", "Pedicures", "Nail Art"],
    image: "/placeholder.svg?height=100&width=100",
    booksyUrl: "",
    email: "sofia@refinestudio.com",
    phone: "(123) 456-7893",
  },
  {
    id: "stylist4",
    name: "James Wilson",
    role: "Makeup Artist",
    specialties: ["Bridal", "Special Occasion", "Lessons"],
    image: "/placeholder.svg?height=100&width=100",
    booksyUrl: "",
    email: "james@refinestudio.com",
    phone: "(123) 456-7894",
  },
]

export const useStaffStore = create<StaffState>()(
  persist(
    (set) => ({
      staff: initialStaff,
      editingStaff: null,

      setEditingStaff: (staff) => set({ editingStaff: staff }),

      clearEditingStaff: () => set({ editingStaff: null }),

      addStaff: (staffData) =>
        set((state) => {
          const newStaff: StaffMember = {
            id: `staff_${Date.now()}`,
            name: staffData.name || "",
            role: staffData.role || "",
            specialties: staffData.specialties || [],
            image: staffData.image || "/placeholder.svg?height=100&width=100",
            booksyUrl: staffData.booksyUrl || "",
            email: staffData.email || "",
            phone: staffData.phone || "",
          }

          return { staff: [...state.staff, newStaff] }
        }),

      updateStaff: (updatedStaff) =>
        set((state) => ({
          staff: state.staff.map((staff) => (staff.id === updatedStaff.id ? updatedStaff : staff)),
        })),

      removeStaff: (id) =>
        set((state) => ({
          staff: state.staff.filter((staff) => staff.id !== id),
        })),
    }),
    {
      name: "refine-studio-staff",
    },
  ),
)

