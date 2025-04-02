"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Service } from "@/lib/service-store"
import { Separator } from "@/components/ui/separator"
import { addService, updateService } from "@/app/actions/services"

interface AdminServiceFormProps {
  onComplete: () => void
}

export function AdminServiceForm({ onComplete }: AdminServiceFormProps) {
  const { toast } = useToast()
  const [editingService, setEditingService] = useState<Service | null>(null)

  const [formData, setFormData] = useState<Partial<Service>>({
    title: "",
    description: "",
    price: "",
    duration: "",
    category: "hair",
    imageSrc: "/placeholder.svg?height=300&width=400",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load editing data if available
  useEffect(() => {
    const storedService = localStorage.getItem("editingService")
    if (storedService) {
      const serviceData = JSON.parse(storedService) as Service
      setEditingService(serviceData)
      setFormData({
        id: serviceData.id,
        title: serviceData.title,
        description: serviceData.description,
        price: serviceData.price,
        duration: serviceData.duration,
        category: serviceData.category,
        imageSrc: serviceData.imageSrc,
      })

      // Clear localStorage after loading
      localStorage.removeItem("editingService")
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value as "hair" | "nails" | "makeup" | "spa",
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (editingService) {
        // Update existing service
        await updateService(formData as Service)
        toast({
          title: "Service updated",
          description: `${formData.title} has been updated successfully.`,
        })
      } else {
        // Add new service
        await addService(formData as Service)
        toast({
          title: "Service added",
          description: `${formData.title} has been added to your services.`,
        })
      }

      // Reset form and navigate back to service list
      setFormData({
        title: "",
        description: "",
        price: "",
        duration: "",
        category: "hair",
        imageSrc: "/placeholder.svg?height=300&width=400",
      })
      onComplete()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving the service.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Service Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Service Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Haircut & Styling"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={handleCategoryChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hair">Hair</SelectItem>
                <SelectItem value="nails">Nails</SelectItem>
                <SelectItem value="makeup">Makeup</SelectItem>
                <SelectItem value="spa">Spa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the service..."
            className="min-h-[100px]"
            required
          />
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Pricing & Duration</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. From $45"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 45 mins"
              required
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Image</h3>
        <div className="space-y-2">
          <Label htmlFor="imageSrc">Image URL</Label>
          <Input
            id="imageSrc"
            name="imageSrc"
            value={formData.imageSrc}
            onChange={handleChange}
            placeholder="Enter image URL or path"
          />
          <p className="text-xs text-muted-foreground">
            For local images, use path like: /images/services/service-name.jpg
          </p>
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={onComplete}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : editingService ? "Update Service" : "Add Service"}
        </Button>
      </div>
    </form>
  )
}

