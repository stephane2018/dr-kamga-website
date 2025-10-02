import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function RegistrationSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Prochaines Sessions</h2>
          <p className="text-xl text-muted-foreground">Choisissez votre masterclass et réservez votre place</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-primary text-primary-foreground">EN LIGNE</Badge>
                <div className="text-sm text-muted-foreground">Places limitées</div>
              </div>
              <CardTitle className="text-xl">Masterclass Production - Axe 1</CardTitle>
              <CardDescription>Produire pour l'export dès le premier jour</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <span className="font-medium">15 Décembre 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Horaire:</span>
                  <span className="font-medium">14h-17h30 (GMT+1)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Prix:</span>
                  <span className="font-medium text-lg">197€</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Places restantes:</span>
                  <span className="font-medium text-primary">8/20</span>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link href="/contact?masterclass=production">S'inscrire maintenant</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-secondary text-secondary-foreground">PRÉSENTIEL</Badge>
                <div className="text-sm text-muted-foreground">Paris</div>
              </div>
              <CardTitle className="text-xl">Masterclass Transformation - Axe 2</CardTitle>
              <CardDescription>Les clés d'une transformation rentable</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <span className="font-medium">22 Décembre 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Horaire:</span>
                  <span className="font-medium">9h-13h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Prix:</span>
                  <span className="font-medium text-lg">297€</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Places restantes:</span>
                  <span className="font-medium text-primary">5/15</span>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link href="/contact?masterclass=transformation">S'inscrire maintenant</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-white rounded-xl border border-primary/10">
          <h3 className="text-lg font-semibold mb-4 text-center">Modalités d'inscription</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">1</span>
              </div>
              <p className="font-medium">Inscription</p>
              <p className="text-muted-foreground">Cliquez sur "S'inscrire"</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">2</span>
              </div>
              <p className="font-medium">Paiement</p>
              <p className="text-muted-foreground">Paiement sécurisé par carte</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">3</span>
              </div>
              <p className="font-medium">Confirmation</p>
              <p className="text-muted-foreground">Lien de connexion par email</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
