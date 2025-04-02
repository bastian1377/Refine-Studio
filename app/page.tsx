import { ServicesSection } from "@/components/services-section"
import { BookingSection } from "@/components/booking-section"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-black"></div>
            <span className="text-xl font-semibold">Refine Studio</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="text-sm font-medium hover:text-gray-900">
              Services
            </a>
            <a href="#gallery" className="text-sm font-medium hover:text-gray-900">
              Gallery
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-gray-900">
              Testimonials
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-gray-900">
              Contact
            </a>
          </nav>
          <div>
            <a href="#booking" className="inline-block px-4 py-2 bg-black text-white rounded-md">
              Book Now
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="relative h-[70vh] bg-gray-300">{/* Hero image placeholder */}</div>
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
            <div className="container px-4">
              <div className="space-y-4 text-white">
                <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">Welcome to Refine Studio</h1>
                <p className="mx-auto max-w-[700px] text-lg md:text-xl">
                  Where beauty meets relaxation. Experience premium salon services in an elegant atmosphere.
                </p>
                <div className="space-x-4">
                  <a href="#booking" className="inline-block px-6 py-3 bg-white text-black rounded-md">
                    Book Appointment
                  </a>
                  <a
                    href="#services"
                    className="inline-block px-6 py-3 bg-transparent border border-white text-white rounded-md"
                  >
                    Explore Services
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">About Refine Studio</h2>
                <p className="text-gray-600">
                  Refine Studio is a premium salon dedicated to enhancing your natural beauty. Our team of skilled
                  professionals is committed to providing exceptional service in a relaxing environment.
                </p>
                <p className="text-gray-600">
                  We use only high-quality products and stay updated with the latest trends and techniques to ensure you
                  receive the best care possible.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Mon-Sat: 9am-7pm</span>
                  </div>
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>123 Beauty Lane, City</span>
                  </div>
                </div>
              </div>
              <div className="aspect-video lg:aspect-square bg-gray-200 rounded-lg">
                {/* About image placeholder */}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <ServicesSection />

        {/* Booking Section */}
        <section id="booking" className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Book Your Appointment</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose your stylist and service, then schedule your visit to Refine Studio.
              </p>
            </div>
            <BookingSection />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-black"></div>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Refine Studio. All rights reserved.</p>
          </div>
          <nav className="flex gap-4">
            <a href="#" className="text-sm text-gray-500 hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:underline">
              Terms of Service
            </a>
            <a href="/admin" className="text-sm text-gray-500 hover:underline">
              Admin
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

