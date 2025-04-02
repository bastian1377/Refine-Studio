"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Edit, Trash2, ExternalLink, Mail, Phone } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { StaffMember } from "@/lib/staff-store"
import { getStaff, deleteStaffMember } from "@/app/actions/staff"
import { useToast } from "@/components/ui/use-toast"

interface AdminStaffListProps {
  onEdit: () => void
}

export function AdminStaffList({ onEdit }: AdminStaffListProps) {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function loadStaff() {
      try {
        const staffData = await getStaff()
        setStaff(staffData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load staff members",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadStaff()
  }, [toast])

  const handleEdit = (staffMember: StaffMember) => {
    setEditingStaff(staffMember)
    // Store in localStorage for the form to access
    localStorage.setItem("editingStaff", JSON.stringify(staffMember))
    onEdit()
  }

  const handleDelete = (id: string) => {
    setStaffToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (staffToDelete) {
      try {
        await deleteStaffMember(staffToDelete)
        setStaff(staff.filter((s) => s.id !== staffToDelete))
        toast({
          title: "Staff deleted",
          description: "Staff member has been removed successfully",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete staff member",
          variant: "destructive",
        })
      }
      setDeleteDialogOpen(false)
      setStaffToDelete(null)
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading staff members...</div>
  }

  if (staff.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground mb-4">No staff members found</p>
        <Button onClick={() => onEdit()}>Add Your First Staff Member</Button>
      </div>
    )
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Staff Member</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Booking</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff.map((staffMember) => (
            <TableRow key={staffMember.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={staffMember.image || "/placeholder.svg?height=40&width=40"}
                      alt={staffMember.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium">{staffMember.name}</span>
                </div>
              </TableCell>
              <TableCell>{staffMember.role}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={`mailto:${staffMember.email}`}
                          className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-secondary"
                        >
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email {staffMember.name}</span>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{staffMember.email}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={`tel:${staffMember.phone}`}
                          className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-secondary"
                        >
                          <Phone className="h-4 w-4" />
                          <span className="sr-only">Call {staffMember.name}</span>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{staffMember.phone}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 max-w-[200px] truncate">
                  {staffMember.booksyUrl ? (
                    <>
                      <span className="truncate">Booksy</span>
                      <a href={staffMember.booksyUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    </>
                  ) : (
                    <span className="text-muted-foreground italic">Alternative Booking</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(staffMember)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(staffMember.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-end">
        <Button onClick={() => onEdit()}>Add New Staff Member</Button>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this staff member from your system.
            </AlertDialogDescription>
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

