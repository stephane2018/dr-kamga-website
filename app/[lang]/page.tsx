import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { EventsSection } from "@/components/events-section"
import { ProgramSection } from "@/components/program-section"
import { ProgressPathSection } from "@/components/progress-path-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { CTASection } from "@/components/cta-section"
import { generateSEOMetadata, seoConfig } from "@/components/seo"

export const metadata = generateSEOMetadata({
  ...seoConfig.home,
  url: "/"
})

export default function HomePage({ params }: { params: { lang: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ProgramSection />
        <EventsSection />
      <ProgressPathSection />
      <WhyChooseSection />
      <CTASection />
      <Footer />
    </div>
  )
}
