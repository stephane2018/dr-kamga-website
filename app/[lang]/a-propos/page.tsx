import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AboutHeroSection } from "@/components/about/hero-section"
import { ExpertiseSection } from "@/components/about/expertise-section"
import { CareerSection } from "@/components/about/career-section"
import { SignatureProgramSection } from "@/components/about/signature-program-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <AboutHeroSection />
      <ExpertiseSection />
      <CareerSection />
      <SignatureProgramSection />
      <Footer />
    </div>
  )
}
