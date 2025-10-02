import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Building, Target } from "lucide-react"

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
            30 ans en administration ivoirienne, 10+ ans aux institutions internationales
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Administration Ivoirienne</CardTitle>
              <p className="text-sm text-muted-foreground">30 ans de service</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Direction de laboratoires</li>
                <li>• Gestion de ranchs</li>
                <li>• Services vétérinaires</li>
                <li>• Politiques agricoles nationales</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle className="text-lg">Institutions Internationales</CardTitle>
              <p className="text-sm text-muted-foreground">10+ ans à Rome</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Représentant FAO</li>
                <li>• Missions PAM</li>
                <li>• Projets FIDA</li>
                <li>• Sécurité alimentaire mondiale</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-lg">Retour en Côte d'Ivoire</CardTitle>
              <p className="text-sm text-muted-foreground">Assistant Représentant FAO</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Planification stratégique</li>
                <li>• Politiques de développement</li>
                <li>• Accompagnement terrain</li>
                <li>• Formation entrepreneurs</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
