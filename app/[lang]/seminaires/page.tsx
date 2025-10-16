import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SeminairesHeroSection } from "@/components/seminaires/hero-section"
import { FeaturesSection } from "@/components/seminaires/features-section"
import { SeminarsCardsSection } from "@/components/seminaires/seminars-cards-section"
import { BenefitsSection } from "@/components/seminaires/benefits-section"
import { CtaSection } from "@/components/seminaires/cta-section"

export default function SeminairesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <SeminairesHeroSection />
      <FeaturesSection />
      <SeminarsCardsSection />
      <BenefitsSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
