import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
          Prêt à Transformer Votre Agriculture ?
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8 text-pretty">
          Rejoignez des centaines d'agriculteurs qui ont déjà franchi le pas vers l'international.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Je découvre le programme</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            asChild
          >
            <Link href="/coaching">Je réserve ma place</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}