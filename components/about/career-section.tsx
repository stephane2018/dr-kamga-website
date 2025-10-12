import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Building, Target, Briefcase } from "lucide-react"

export function CareerSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
            Parcours Professionnel
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            40 années d'expérience entre administration ivoirienne, institutions internationales et entrepreneuriat
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Administration Ivoirienne</CardTitle>
              <p className="text-sm text-muted-foreground">30 ans de service en qualité de gestionnaire</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Laboratoires d'analyses</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Exploitation de production animale</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Services vétérinaires</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Politiques Agricoles Nationales</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Coopération sous-régionale et internationale</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Centre de formations Agricoles</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary/5 to-accent/5">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle className="text-xl">Institutions Internationales</CardTitle>
              <p className="text-sm text-muted-foreground">10+ ans à l'Ambassade de CI à Rome</p>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm font-semibold mb-2 text-secondary">Conseiller agricole auprès des agences Onusiennes :</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-secondary mt-1">•</span>
                    <span className="text-muted-foreground">FAO (Organisation des Nations Unies pour l'Alimentation et l'Agriculture)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-secondary mt-1">•</span>
                    <span className="text-muted-foreground">PAM (Programme Alimentaire Mondial)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-secondary mt-1">•</span>
                    <span className="text-muted-foreground">FIDA (Fond International pour le Développement Agricole)</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2 text-secondary">Et d'autre part :</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-secondary mt-1">•</span>
                    <span className="text-muted-foreground">Coopération bilatérale avec les pays de la circonscription diplomatique</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-xl">Retour en Côte d'Ivoire</CardTitle>
              <p className="text-sm text-muted-foreground">Chargé des programmes auprès du bureau de la FAO en CI</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Planification stratégique</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Mobilisation des ressources</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Validation des programmes PND</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Suivi et évaluations</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Cabinet DAB</CardTitle>
              <p className="text-sm text-muted-foreground">Promoteur et gérant du cabinet Development Agricultural Business</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Promoteur du programme "De la Ferme aux marchés mondiaux..."</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Formations et coaching entrepreneurs agricoles</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Représentation (Gestion de l'exploitation - Fournitures d'intrants - Mécanisation agricole)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Conférences et séminaires</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
