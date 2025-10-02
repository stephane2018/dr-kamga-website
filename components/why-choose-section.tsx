import { Button } from "@/components/ui/button"
import { Users, Globe } from "lucide-react"
import Link from "next/link"

export function WhyChooseSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance"> Nos services</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Gestion de l'exploitation</h3>
            <p className="text-muted-foreground mb-4">
              Optimisez vos rendements et structurez votre exploitation avec nos experts en gestion agricole.
            </p>
            <Button variant="outline" asChild>
              <Link href="/a-propos">En savoir plus</Link>
            </Button>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fournitures d'intrants</h3>
            <p className="text-muted-foreground mb-4">
              Accédez à des intrants de qualité certifiée pour garantir la performance de vos cultures.
            </p>
            <Button variant="outline" asChild>
              <Link href="/a-propos">En savoir plus</Link>
            </Button>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mécanisation agricole</h3>
            <p className="text-muted-foreground mb-4">
              Modernisez vos opérations avec des équipements performants adaptés à vos besoins.
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