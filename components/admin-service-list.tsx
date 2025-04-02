"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2, Clock } from "lucide-react"
import type { Service } from "@/lib/service-store"
import { getServices, deleteService } from "@/app/actions/services"
import { useToast } from "@/components/ui/use-toast"

interface AdminServiceListProps {
  onEdit: () => void
}

export function AdminServiceList({ onEdit }: AdminServiceListProps) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function loadServices() {
      try {
        const servicesData = await getServices()
        setServices(servicesData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load services",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [toast])

  const handleEdit = (service: Service) => {
    // Store in localStorage for the form to access
    localStorage.setItem("editingService", JSON.stringify(service))
    onEdit()
  }

  const handleDelete = (id: string) => {
    setServiceToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (serviceToDelete) {
      try {
        await deleteService(serviceToDelete)
        setServices(services.filter((s) => s.id !== serviceToDelete))
        toast({
          title: "Service deleted",
          description: "Service has been removed successfully",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete service",
          variant: "destructive",
        })
      }
      setDeleteDialogOpen(false)
      setServiceToDelete(null)
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "hair":
        return "Hair"
      case "nails":
        return "Nails"
      case "makeup":
        return "Makeup"
      case "spa":
        return "Spa"
      default:
        return category
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "hair":
        return "bg-blue-100 text-blue-800"
      case "nails":
        return "bg-pink-100 text-pink-800"
      case "makeup":
        return "bg-purple-100 text-purple-800"
      case "spa":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading services...</div>
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground mb-4">No services found</p>
        <Button onClick={() => onEdit()}>Add Your First Service</Button>
      </div>
    )
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-14 rounded overflow-hidden">
                    <Image
                      src={service.imageSrc || "/placeholder.svg?height=40&width=60"}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-medium">{service.title}</span>
                    <p className="text-xs text-muted-foreground line-clamp-1">{service.description}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getCategoryColor(service.category)}>
                  {getCategoryLabel(service.category)}
                </Badge>
              </TableCell>
              <TableCell>{service.price}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{service.duration}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(service)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(service.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-end">
        <Button onClick={() => onEdit()}>Add New Service</Button>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete this service from your system.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

