"use client"

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const galleryImages = [
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Hair styling result",
      className: "md:col-span-2 md:row-span-2",
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "Salon interior",
      className: "md:col-span-2",
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "Hair coloring result",
    },
    {
      src: "/placeholder.svg?height=600&width=600",
      alt: "Spa treatment",
    },
  ]

  return (
    <>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className={cn("relative overflow-hidden rounded-lg cursor-pointer group", image.className)}
            onClick={() => setSelectedImage(image.src)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedImage && (
            <div className="relative aspect-[4/3] w-full">
              <Image src={selectedImage || "/placeholder.svg"} alt="Gallery image" fill className="object-contain" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

