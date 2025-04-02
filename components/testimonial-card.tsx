import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  quote: string
  rating: number
  service: string
}

export function TestimonialCard({ name, quote, rating, service }: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < rating ? "fill-primary text-primary" : "text-muted"}`} />
          ))}
        </div>
        <blockquote className="space-y-2">
          <p className="text-muted-foreground">"{quote}"</p>
          <footer className="mt-4">
            <div className="font-medium">{name}</div>
            <div className="text-sm text-muted-foreground">{service}</div>
          </footer>
        </blockquote>
      </CardContent>
    </Card>
  )
}

