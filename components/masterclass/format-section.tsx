import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, MapPin } from "lucide-react"

export function FormatSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Format des Masterclass</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>En Ligne (Zoom)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Sessions interactives en direct</li>
                <li>• Possibilité de poser des questions</li>
                <li>• Enregistrement disponible 30 jours</li>
                <li>• Accessible depuis n'importe où</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <CardTitle>Présentiel (Paris)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Interaction directe avec Dr. Kanga</li>
                <li>• Networking avec autres participants</li>
                <li>• Supports physiques inclus</li>
                <li>• Pause déjeuner offerte</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
