import { Button } from "@/components/ui/button"
import { Users, Globe } from "lucide-react"
import Link from "next/link"

export function WhyChooseSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Pourquoi Choisir CabinetDab ?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expertise Reconnue</h3>
            <p className="text-muted-foreground mb-4">
              Plus de 20 ans d'expérience dans l'accompagnement d'agriculteurs vers l'export.
            </p>
            <Button variant="outline" asChild>
              <Link href="/a-propos">En savoir plus</Link>
            </Button>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Méthode Éprouvée</h3>
            <p className="text-muted-foreground mb-4">
              Une approche structurée qui a fait ses preuves sur des centaines de projets.
            </p>
            <Button variant="outline" asChild>
              <Link href="/a-propos">En savoir plus</Link>
            </Button>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Résultats Concrets</h3>
            <p className="text-muted-foreground mb-4">
              Nos participants multiplient en moyenne leur chiffre d'affaires par 3.
            </p>
            <Button variant="outline" asChild>
              <Link href="/a-propos">En savoir plus</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}