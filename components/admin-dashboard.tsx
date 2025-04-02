"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "@/app/actions/auth"
import { getStaff } from "@/app/actions/staff"
import { getServices } from "@/app/actions/services"
import type { StaffMember, Service } from "@/lib/database.types"

export function AdminDashboard({ userEmail }: { userEmail?: string }) {
  const [activeTab, setActiveTab] = useState("staff")
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      try {
        const [staffData, servicesData] = await Promise.all([getStaff(), getServices()])

        setStaff(staffData)
        setServices(servicesData)
      } catch (err) {
        setError("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleLogout = async () => {
    await signOut()
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Refine Studio Admin</h1>
        <div className="flex items-center gap-4">
          {userEmail && <span className="text-sm text-gray-500">Logged in as {userEmail}</span>}
          <button onClick={() => router.push("/")} className="px-4 py-2 border rounded-md hover:bg-gray-100">
            View Website
          </button>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="border-b">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("staff")}
              className={`py-2 px-4 text-center border-b-2 ${
                activeTab === "staff"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Manage Staff
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`py-2 px-4 text-center border-b-2 ${
                activeTab === "services"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Manage Services
            </button>
          </nav>
        </div>
      </div>

      {activeTab === "staff" ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Staff Members</h2>
          {staff.length === 0 ? (
            <p className="text-gray-500">No staff members found. Add your first staff member.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Role</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((member) => (
                    <tr key={member.id} className="border-t">
                      <td className="py-2 px-4">{member.name}</td>
                      <td className="py-2 px-4">{member.role}</td>
                      <td className="py-2 px-4">{member.email}</td>
                      <td className="py-2 px-4 flex gap-2">
                        <button className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm">Edit</button>
                        <button className="px-2 py-1 bg-red-500 text-white rounded-md text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4">
            <button className="px-4 py-2 bg-black text-white rounded-md">Add Staff Member</button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Services</h2>
          {services.length === 0 ? (
            <p className="text-gray-500">No services found. Add your first service.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left">Title</th>
                    <th className="py-2 px-4 text-left">Category</th>
                    <th className="py-2 px-4 text-left">Price</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="border-t">
                      <td className="py-2 px-4">{service.title}</td>
                      <td className="py-2 px-4">{service.category}</td>
                      <td className="py-2 px-4">{service.price}</td>
                      <td className="py-2 px-4 flex gap-2">
                        <button className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm">Edit</button>
                        <button className="px-2 py-1 bg-red-500 text-white rounded-md text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4">
            <button className="px-4 py-2 bg-black text-white rounded-md">Add Service</button>
          </div>
        </div>
      )}
    </div>
  )
}

