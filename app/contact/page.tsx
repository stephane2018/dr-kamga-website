import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Calendar } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Contactez-Nous</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Prêt à transformer votre agriculture ? Contactez-nous pour découvrir comment la méthode de Cabinetdab peut
              vous aider à atteindre les marchés internationaux.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire de Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
                <CardDescription>Remplissez ce formulaire et nous vous recontacterons dans les 24h</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input id="firstName" placeholder="Votre prénom" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input id="lastName" placeholder="Votre nom" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="votre@email.com" required />
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" placeholder="+33 1 23 45 67 89" />
                  </div>

                  <div>
                    <Label htmlFor="interest">Vous êtes intéressé par *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="videos">Vidéos Pédagogiques</SelectItem>
                        <SelectItem value="masterclass">Masterclass Thématiques</SelectItem>
                        <SelectItem value="seminaires">Séminaires Pratiques</SelectItem>
                        <SelectItem value="coaching">Coaching Privé</SelectItem>
                        <SelectItem value="information">Informations générales</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="situation">Décrivez votre situation actuelle</Label>
                    <Textarea
                      id="situation"
                      placeholder="Parlez-nous de votre exploitation, vos produits, vos objectifs..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" placeholder="Comment pouvons-nous vous aider ?" rows={4} required />
                  </div>

                  <Button type="submit" className="w-full">
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Informations de Contact */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Informations de Contact</CardTitle>
                  <CardDescription>Plusieurs moyens de nous joindre selon vos préférences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground">info@cabinetdab.com</p>
                      <p className="text-sm text-muted-foreground">Réponse sous 24h</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Téléphone</h3>
                      <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                      <p className="text-sm text-muted-foreground">Lun-Ven 9h-18h</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Adresse</h3>
                      <p className="text-muted-foreground">123 Avenue de l'Agriculture</p>
                      <p className="text-muted-foreground">75001 Paris, France</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Appel Diagnostic Gratuit</span>
                  </CardTitle>
                  <CardDescription>Réservez 30 minutes avec un expert de Cabinetdab pour évaluer votre potentiel</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Profitez d'un appel gratuit pour faire le point sur votre situation et découvrir comment notre
                    méthode peut vous aider à atteindre vos objectifs d'exportation.
                  </p>
                  <Button className="w-full bg-transparent" variant="outline">
                    Réserver mon appel gratuit
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horaires d'Ouverture</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Lundi - Vendredi</span>
                      <span className="text-muted-foreground">9h00 - 18h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samedi</span>
                      <span className="text-muted-foreground">9h00 - 12h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimanche</span>
                      <span className="text-muted-foreground">Fermé</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
