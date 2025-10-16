import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  CoachingHeroSection,
  PositioningSection,
  ContentSection,
  StatsSection,
  TestimonialsSection,
  BookingSection,
  CtaSection,
} from "@/components/coaching/all-sections"

export default function CoachingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <CoachingHeroSection />
      <PositioningSection />
      <ContentSection />
      <StatsSection />
      <TestimonialsSection />
      <BookingSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
