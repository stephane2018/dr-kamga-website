import { Users, Factory, Globe } from "lucide-react"

export function BenefitsSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Les Avantages des Masterclass</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Interaction Directe</h3>
            <p className="text-muted-foreground">
              Posez vos questions directement au Dr. Kanga et obtenez des réponses personnalisées.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Factory className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Études de Cas Réels</h3>
            <p className="text-muted-foreground">
              Analysez des projets concrets et apprenez des succès et échecs d'autres agriculteurs.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Réponses aux Questions</h3>
            <p className="text-muted-foreground">
              Clarifiez tous vos doutes et obtenez des conseils adaptés à votre situation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
