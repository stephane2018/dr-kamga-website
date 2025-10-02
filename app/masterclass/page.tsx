import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MasterclassHeroSection } from "@/components/masterclass/hero-section"
import { AxisCardsSection } from "@/components/masterclass/axis-cards-section"
import { FormatSection } from "@/components/masterclass/format-section"
import { BenefitsSection } from "@/components/masterclass/benefits-section"
import { VideosSection } from "@/components/masterclass/videos-section"
import { RegistrationSection } from "@/components/masterclass/registration-section"
import { CtaSection } from "@/components/masterclass/cta-section"

export default function MasterclassPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <MasterclassHeroSection />
      <AxisCardsSection />
      <FormatSection />
      <BenefitsSection />
      <VideosSection />
      <RegistrationSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
