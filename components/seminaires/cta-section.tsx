import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
          Rejoignez le Prochain Séminaire
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8 text-pretty">
          Places limitées pour garantir un accompagnement personnalisé et des échanges de qualité.
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/contact">Réserver ma place pour le prochain séminaire</Link>
        </Button>
      </div>
    </section>
  )
}
