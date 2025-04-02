import { getServices } from "@/app/actions/services"
import { ServicesSection } from "@/components/services-section"

export async function ServicesSectionServer() {
  const services = await getServices()

  return <ServicesSection initialServices={services} />
}

