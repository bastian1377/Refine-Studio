import { getStaff } from "@/app/actions/staff"
import { BookingSection } from "@/components/booking-section"

export async function BookingSectionServer() {
  const staff = await getStaff()

  return <BookingSection initialStaff={staff} />
}

