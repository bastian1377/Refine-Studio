"use client"

import { useState, useEffect } from "react"
import { getStaff } from "@/app/actions/staff"
import type { StaffMember } from "@/lib/database.types"

export function BookingSection() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStaff, setSelectedStaff] = useState("")
  const [selectedService, setSelectedService] = useState("hair")

  useEffect(() => {
    async function loadStaff() {
      const data = await getStaff()
      setStaff(data)
      if (data.length > 0) {
        setSelectedStaff(data[0].id)
      }
      setLoading(false)
    }

    loadStaff()
  }, [])

  const selectedStaffMember = staff.find((s) => s.id === selectedStaff)

  if (loading) {
    return <div className="p-8 text-center">Loading booking information...</div>
  }

  if (staff.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center bg-white p-8 rounded-lg shadow-md">
        <p className="mb-4">No staff members available for booking at this time.</p>
        <a href="tel:+1234567890" className="inline-block px-6 py-3 bg-black text-white rounded-md">
          Call for Appointment
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <div className="flex border-b">
            <button className="py-2 px-4 border-b-2 border-black text-black">Choose Staff</button>
            <button className="py-2 px-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700">
              Select Service
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Select Your Stylist</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {staff.map((staffMember) => (
              <div key={staffMember.id}>
                <input
                  type="radio"
                  id={staffMember.id}
                  name="staff"
                  value={staffMember.id}
                  checked={selectedStaff === staffMember.id}
                  onChange={() => setSelectedStaff(staffMember.id)}
                  className="sr-only"
                />
                <label
                  htmlFor={staffMember.id}
                  className={`flex gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    selectedStaff === staffMember.id ? "border-black bg-gray-50" : ""
                  }`}
                >
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex-shrink-0">
                    {/* Staff image placeholder */}
                  </div>
                  <div>
                    <h4 className="font-medium">{staffMember.name}</h4>
                    <p className="text-sm text-gray-500">{staffMember.role}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {staffMember.specialties.map((specialty, index) => (
                        <span key={index} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-6 pt-6 border-t">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              {selectedStaffMember?.booksyUrl ? "Choose your date & time on Booksy" : "Book via email, text, or phone"}
            </span>
          </div>
          <button className="w-full md:w-auto px-6 py-2 bg-black text-white rounded-md">
            {selectedStaffMember?.booksyUrl ? "Continue to Booking" : "Contact to Book"}
          </button>
        </div>
      </div>
    </div>
  )
}

