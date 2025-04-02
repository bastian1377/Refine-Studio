"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Service {
  id: string
  title: string
  description: string
  price: string
  duration: string
  category: "hair" | "nails" | "makeup" | "spa"
  imageSrc: string
}

interface ServiceState {
  services: Service[]
  editingService: Service | null
  setEditingService: (service: Service) => void
  clearEditingService: () => void
  addService: (service: Partial<Service>) => void
  updateService: (service: Service) => void
  removeService: (id: string) => void
}

// Initial services data
const initialServices: Service[] = [
  {
    id: "service1",
    title: "Haircut & Styling",
    description: "Precision cutting and styling tailored to your face shape and preferences.",
    price: "From $45",
    duration: "45 mins",
    category: "hair",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "service2",
    title: "Hair Coloring",
    description: "From subtle highlights to bold transformations using premium products.",
    price: "From $85",
    duration: "2 hours",
    category: "hair",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "service3",
    title: "Hair Treatments",
    description: "Nourishing treatments to repair and revitalize damaged hair.",
    price: "From $65",
    duration: "1 hour",
    category: "hair",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "service4",
    title: "Manicure",
    description: "Classic or gel manicures with a wide range of colors to choose from.",
    price: "From $35",
    duration: "45 mins",
    category: "nails",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "service5",
    title: "Pedicure",
    description: "Relaxing foot treatment with exfoliation, massage, and polish.",
    price: "From $45",
    duration: "1 hour",
    category: "nails",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "service6",
    title: "Nail Art",
    description: "Custom designs and embellishments to express your personal style.",
    price: "From $15",
    duration: "30 mins",
    category: "nails",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "service7",
    title: "Everyday Makeup",
    description: "Natural-looking makeup that enhances your features for daily wear.",
    price: "From $55",
    duration: "45 mins",
    category: "makeup",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "service8",
    title: "Special Occasion",
    description: "Glamorous makeup for weddings, parties, and special events.",
    price: "From $85",
    duration: "1 hour",
    category: "makeup",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "service9",
    title: "Makeup Lesson",
    description: "Learn techniques and tips from our professional makeup artists.",
    price: "From $95",
    duration: "1.5 hours",
    category: "makeup",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "service10",
    title: "Facial Treatment",
    description: "Customized facial to address your specific skin concerns.",
    price: "From $75",
    duration: "1 hour",
    category: "spa",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "service11",
    title: "Massage Therapy",
    description: "Relaxing massage to relieve tension and promote wellness.",
    price: "From $85",
    duration: "1 hour",
    category: "spa",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "service12",
    title: "Body Scrub",
    description: "Exfoliating treatment that leaves your skin smooth and refreshed.",
    price: "From $65",
    duration: "45 mins",
    category: "spa",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
]

export const useServiceStore = create<ServiceState>()(
  persist(
    (set) => ({
      services: initialServices,
      editingService: null,

      setEditingService: (service) => set({ editingService: service }),

      clearEditingService: () => set({ editingService: null }),

      addService: (serviceData) =>
        set((state) => {
          const newService: Service = {
            id: `service_${Date.now()}`,
            title: serviceData.title || "",
            description: serviceData.description || "",
            price: serviceData.price || "",
            duration: serviceData.duration || "",
            category: serviceData.category || "hair",
            imageSrc: serviceData.imageSrc || "/placeholder.svg?height=300&width=400",
          }

          return { services: [...state.services, newService] }
        }),

      updateService: (updatedService) =>
        set((state) => ({
          services: state.services.map((service) => (service.id === updatedService.id ? updatedService : service)),
        })),

      removeService: (id) =>
        set((state) => ({
          services: state.services.filter((service) => service.id !== id),
        })),
    }),
    {
      name: "refine-studio-services",
    },
  ),
)

