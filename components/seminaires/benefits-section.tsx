import { Target, Users, Network, Clock } from "lucide-react"

export function BenefitsSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Pourquoi Choisir Nos Séminaires ?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Apprentissage Collectif</h3>
                  <p className="text-muted-foreground">
                    Bénéficiez de l'expérience et des questions des autres participants pour enrichir votre
                    apprentissage.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Pratique Réelle</h3>
                  <p className="text-muted-foreground">
                    Exercices concrets, simulations et études de cas pour une application immédiate sur le terrain.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Network className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Réseau Professionnel</h3>
                  <p className="text-muted-foreground">
                    Créez des liens durables avec d'autres agriculteurs et experts de la filière.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Format Intensif</h3>
              <p className="text-muted-foreground mb-6">
                Des sessions concentrées sur 2-3 jours pour maximiser votre temps et votre apprentissage.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">87%</div>
                  <div className="text-sm text-muted-foreground">Mise en pratique</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
