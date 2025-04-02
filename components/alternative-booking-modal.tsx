"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Mail, Phone } from "lucide-react"
import type { StaffMember } from "@/lib/staff-store"

interface AlternativeBookingModalProps {
  open: boolean
  onClose: () => void
  staff: StaffMember | null
}

export function AlternativeBookingModal({ open, onClose, staff }: AlternativeBookingModalProps) {
  if (!staff) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book with {staff.name}</DialogTitle>
          <DialogDescription>
            This stylist doesn't have online booking. Please use one of the following methods to schedule your
            appointment.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Button variant="outline" className="justify-start" asChild>
              <a
                href={`mailto:${staff.email}?subject=Booking Request for ${staff.name}`}
                className="flex items-center gap-3"
              >
                <Mail className="h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span className="font-medium">Email {staff.name}</span>
                  <span className="text-xs text-muted-foreground">{staff.email}</span>
                </div>
              </a>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <a
                href={`sms:${staff.phone}?body=I'd like to book an appointment with ${staff.name}`}
                className="flex items-center gap-3"
              >
                <Phone className="h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span className="font-medium">Text {staff.name}</span>
                  <span className="text-xs text-muted-foreground">{staff.phone}</span>
                </div>
              </a>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <a href={`tel:${staff.phone}`} className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span className="font-medium">Call {staff.name}</span>
                  <span className="text-xs text-muted-foreground">{staff.phone}</span>
                </div>
              </a>
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

