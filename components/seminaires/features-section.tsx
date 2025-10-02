import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Network } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Une Expérience d'Apprentissage Unique</h2>
          <p className="text-xl text-muted-foreground">
            Sessions collectives orientées pratique terrain pour un apprentissage concret
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Sessions Collectives</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Apprenez en groupe avec d'autres agriculteurs motivés et partagez vos expériences.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle>Orientées Pratique</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Exercices concrets, simulations et ateliers pratiques pour une application immédiate.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Network className="h-8 w-8 text-accent" />
              </div>
              <CardTitle>Networking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Créez des liens durables avec d'autres acteurs de la filière agricole.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
