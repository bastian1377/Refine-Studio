"use client"

import { useState, useEffect } from "react"
import { getServices } from "@/app/actions/services"
import type { Service } from "@/lib/database.types"

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("hair")

  useEffect(() => {
    async function loadServices() {
      const data = await getServices()
      setServices(data)
      setLoading(false)
    }

    loadServices()
  }, [])

  const filteredServices = services.filter((service) => service.category === activeCategory)

  if (loading) {
    return <div className="p-8 text-center">Loading services...</div>
  }

  return (
    <section id="services" className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our range of premium beauty and hair services designed to make you look and feel your best.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-md shadow-sm">
              {["hair", "nails", "makeup", "spa"].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeCategory === category ? "bg-black text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  } ${category === "hair" ? "rounded-l-md" : category === "spa" ? "rounded-r-md" : ""} border`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200 relative">
                    {/* Image placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">Service Image</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-lg">{service.price}</span>
                      <span className="text-sm text-gray-500">{service.duration}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">No {activeCategory} services available at this time.</p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <a
            href="#booking"
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            View Full Service Menu
          </a>
        </div>
      </div>
    </section>
  )
}

