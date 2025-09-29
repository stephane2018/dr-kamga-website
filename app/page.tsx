import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ProgramSection } from "@/components/program-section"
import { ProgressPathSection } from "@/components/progress-path-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ProgramSection />
      <ProgressPathSection />
      <WhyChooseSection />
      <CTASection />
      <Footer />
    </div>
  )
}
