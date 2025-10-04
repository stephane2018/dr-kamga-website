import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Calendar, MessageSquare, Clock, CheckCircle, ArrowRight, Sparkles } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-background to-secondary/10 py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-5">
          <svg className="absolute top-5 left-5 sm:top-10 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" />
            <path d="M30 50 L50 30 L70 50 L50 70 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
          </svg>
          <svg className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24" viewBox="0 0 100 100" fill="none">
            <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="1" fill="none" rx="8" />
            <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <div className="hidden sm:flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mx-2 animate-pulse"></div>
                <div className="w-2 h-2 bg-secondary rounded-full mx-2 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-accent rounded-full mx-2 animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
              Parlons de Votre <span className="text-primary">Projet</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto text-pretty mb-6 sm:mb-8 px-4">
              Prêt à transformer votre agriculture en entreprise d'exportation ?
              <br className="hidden md:block" />
              Contactez-nous pour découvrir comment notre méthode peut vous accompagner vers les marchés internationaux.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="whitespace-nowrap">Réponse sous 24h</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                <span className="whitespace-nowrap">Appel diagnostic gratuit</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="whitespace-nowrap">Accompagnement personnalisé</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            <div className="xl:col-span-2 order-2 xl:order-1">
            {/* Formulaire de Contact */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-primary/2">
              <CardHeader className="pb-6 sm:pb-8">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl sm:text-2xl text-gray-900 mb-1">Envoyez-nous un message</CardTitle>
                    <CardDescription className="text-sm sm:text-base">Remplissez ce formulaire et nous vous recontacterons dans les 24h</CardDescription>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="font-medium">Réponse garantie sous 24h</span>
                    </div>
                    <div className="hidden sm:block text-gray-500">|</div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                      <span className="font-medium">Consultation gratuite incluse</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <form className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium">Prénom *</Label>
                      <Input
                        id="firstName"
                        placeholder="Votre prénom"
                        required
                        className="h-11 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">Nom *</Label>
                      <Input
                        id="lastName"
                        placeholder="Votre nom"
                        required
                        className="h-11 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        required
                        className="h-11 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+33 1 23 45 67 89"
                        className="h-11 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interest" className="text-sm font-medium">Vous êtes intéressé par *</Label>
                    <Select>
                      <SelectTrigger className="h-11 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200">
                        <SelectValue placeholder="Sélectionnez une option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masterclass">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            <span className="text-sm">Masterclass Thématiques</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="seminaires">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div>
                            <span className="text-sm">Séminaires Pratiques</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="coaching">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                            <span className="text-sm">Coaching Privé</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="programme">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            <span className="text-sm">Programme "De la ferme aux marchés mondiaux"</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="information">
                          <span className="text-sm">Informations générales</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="situation" className="text-sm font-medium">Décrivez votre situation actuelle</Label>
                    <Textarea
                      id="situation"
                      placeholder="Parlez-nous de votre exploitation, vos produits, vos objectifs d'exportation..."
                      rows={3}
                      className="min-h-[80px] border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Comment pouvons-nous vous aider à atteindre vos objectifs d'exportation ?"
                      rows={4}
                      required
                      className="min-h-[100px] border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200 resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] text-base">
                    <ArrowRight className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Envoyer le message</span>
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-3 sm:mt-4 leading-relaxed">
                    En envoyant ce formulaire, vous acceptez d'être contacté par notre équipe pour discuter de votre projet.
                  </p>
                </form>
              </CardContent>
            </Card>

            </div>
            <div className="xl:col-span-1 order-1 xl:order-2">
              <div className="xl:sticky xl:top-8 space-y-4 sm:space-y-6">
                {/* Appel Diagnostic - Featured */}
                {/* <Card className="border-0 shadow-2xl bg-gradient-to-br from-primary to-secondary text-white overflow-hidden relative transform hover:scale-[1.02] transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12"></div>
                  <div className="absolute top-4 left-4 bg-white/20 rounded-full px-3 py-1">
                    <span className="text-xs font-bold text-white">GRATUIT</span>
                  </div>
                  <CardHeader className="relative p-4 sm:p-6 pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg sm:text-xl text-white mb-1">Appel Diagnostic Gratuit</CardTitle>
                        <CardDescription className="text-white/90 text-sm">30 minutes avec Dr. Kanga Kouamé</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative p-4 sm:p-6 pt-0">
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      <div className="flex items-start space-x-3 text-white/90">
                        <CheckCircle className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm leading-relaxed">Analyse de votre situation actuelle</span>
                      </div>
                      <div className="flex items-start space-x-3 text-white/90">
                        <CheckCircle className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm leading-relaxed">Évaluation de votre potentiel d'exportation</span>
                      </div>
                      <div className="flex items-start space-x-3 text-white/90">
                        <CheckCircle className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm leading-relaxed">Recommandations personnalisées</span>
                      </div>
                    </div>
                    <Button size="lg" className="w-full h-11 sm:h-12 bg-white text-primary hover:bg-white/90 font-bold text-sm sm:text-base shadow-lg">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>Réserver mon appel gratuit</span>
                    </Button>
                  </CardContent>
                </Card> */}

                {/* Quick Contact Cards - Compact */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center">Autres moyens de contact</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-4 p-3 sm:p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg hover:shadow-md transition-all duration-300">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base">Email</h4>
                        <p className="text-xs sm:text-sm text-primary font-medium truncate">info@cabinetdab.com</p>
                        <p className="text-xs text-gray-500">Réponse sous 24h</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-3 sm:p-4 bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-lg hover:shadow-md transition-all duration-300">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base">Téléphone</h4>
                        <p className="text-xs sm:text-sm text-secondary font-medium">+33 1 23 45 67 89</p>
                        <p className="text-xs text-gray-500">Lun-Ven 9h-18h</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-3 sm:p-4 bg-gradient-to-r from-accent/5 to-accent/10 rounded-lg hover:shadow-md transition-all duration-300">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base">Bureau</h4>
                        <p className="text-xs sm:text-sm text-accent font-medium">Abidjan, Côte d'Ivoire</p>
                        <p className="text-xs text-gray-500">Interventions mondiales</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Horaires et Infos - Combined */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3 sm:gap-4">
                  <Card className="border-0 shadow-lg">
                    <CardHeader >
                      <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                        <span>Horaires d'ouverture</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-100">
                          <span className="font-medium text-sm sm:text-base">Lundi - Vendredi</span>
                          <span className="text-primary font-semibold text-sm sm:text-base">9h00 - 18h00</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-100">
                          <span className="font-medium text-sm sm:text-base">Samedi</span>
                          <span className="text-secondary font-semibold text-sm sm:text-base">9h00 - 12h00</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 sm:py-2">
                          <span className="font-medium text-sm sm:text-base">Dimanche</span>
                          <span className="text-gray-400 text-sm sm:text-base">Fermé</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 sm:mt-16 lg:mt-20 bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Notre Impact</h3>
              <p className="text-gray-600 text-sm sm:text-base">Des résultats concrets pour nos partenaires</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">40+</div>
                <div className="text-xs sm:text-sm text-gray-600 leading-tight">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-secondary" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-secondary mb-1 sm:mb-2">500+</div>
                <div className="text-xs sm:text-sm text-gray-600 leading-tight">Entreprises accompagnées</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-1 sm:mb-2">15</div>
                <div className="text-xs sm:text-sm text-gray-600 leading-tight">Pays d'intervention</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">95%</div>
                <div className="text-xs sm:text-sm text-gray-600 leading-tight">Taux de satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
