"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import type { StaffMember } from "@/lib/staff-store"
import { Separator } from "@/components/ui/separator"
import { addStaffMember, updateStaffMember } from "@/app/actions/staff"

interface AdminStaffFormProps {
  onComplete: () => void
}

export function AdminStaffForm({ onComplete }: AdminStaffFormProps) {
  const { toast } = useToast()
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null)

  const [formData, setFormData] = useState<Partial<StaffMember>>({
    name: "",
    role: "",
    specialties: [],
    image: "/placeholder.svg?height=100&width=100",
    booksyUrl: "",
    email: "",
    phone: "",
  })

  const [specialtiesInput, setSpecialtiesInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load editing data if available
  useEffect(() => {
    const storedStaff = localStorage.getItem("editingStaff")
    if (storedStaff) {
      const staffData = JSON.parse(storedStaff) as StaffMember
      setEditingStaff(staffData)
      setFormData({
        id: staffData.id,
        name: staffData.name,
        role: staffData.role,
        specialties: [...staffData.specialties],
        image: staffData.image,
        booksyUrl: staffData.booksyUrl,
        email: staffData.email,
        phone: staffData.phone,
      })
      setSpecialtiesInput(staffData.specialties.join(", "))

      // Clear localStorage after loading
      localStorage.removeItem("editingStaff")
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSpecialtiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpecialtiesInput(e.target.value)
    // Convert comma-separated string to array
    const specialtiesArray = e.target.value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "")

    setFormData((prev) => ({ ...prev, specialties: specialtiesArray }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (editingStaff) {
        // Update existing staff
        await updateStaffMember(formData as StaffMember)
        toast({
          title: "Staff updated",
          description: `${formData.name} has been updated successfully.`,
        })
      } else {
        // Add new staff
        await addStaffMember(formData as StaffMember)
        toast({
          title: "Staff added",
          description: `${formData.name} has been added to your team.`,
        })
      }

      // Reset form and navigate back to staff list
      setFormData({
        name: "",
        role: "",
        specialties: [],
        image: "/placeholder.svg?height=100&width=100",
        booksyUrl: "",
        email: "",
        phone: "",
      })
      setSpecialtiesInput("")
      onComplete()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving the staff member.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Basic Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter staff member name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Senior Stylist, Nail Technician"
              required
            />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <Label htmlFor="specialties">Specialties (comma separated)</Label>
          <Input
            id="specialties"
            name="specialties"
            value={specialtiesInput}
            onChange={handleSpecialtiesChange}
            placeholder="e.g. Haircuts, Coloring, Styling"
          />
        </div>

        <div className="space-y-2 mt-4">
          <Label htmlFor="image">Profile Image URL</Label>
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL or path"
          />
          <p className="text-xs text-muted-foreground">For local images, use path like: /images/staff/name.jpg</p>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Contact Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="staff@refinestudio.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          These contact details will be used for alternative booking methods if Booksy is not available.
        </p>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Booking Information</h3>
        <div className="space-y-2">
          <Label htmlFor="booksyUrl">Booksy Profile URL (Optional)</Label>
          <Input
            id="booksyUrl"
            name="booksyUrl"
            value={formData.booksyUrl}
            onChange={handleChange}
            placeholder="https://booksy.com/en-us/profile/..."
          />
          <p className="text-xs text-muted-foreground">
            Leave empty to use alternative booking methods (email/text/call)
          </p>
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={onComplete}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : editingStaff ? "Update Staff" : "Add Staff"}
        </Button>
      </div>
    </form>
  )
}

