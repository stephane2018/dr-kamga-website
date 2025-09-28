import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Target, Award, Building, Users, BookOpen } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-800 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute top-10 left-10 w-24 h-24" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" />
            <path d="M30 50 L50 30 L70 50 L50 70 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <svg className="absolute top-20 right-20 w-32 h-32" viewBox="0 0 100 100" fill="none">
            <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="1.5" fill="none" rx="8" />
            <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-white/20 text-white border-white/30" variant="secondary">
                Parcours Expert
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-white">
                Dr. Kanga Kouamé - Mon Parcours
              </h1>
              <p className="text-xl text-white/90 mb-6 text-pretty">
                Docteur vétérinaire de formation et expert reconnu en agriculture, transformation locale et exportation de produits agroalimentaires. Découvrez comment 40 années d'expérience m'ont mené à développer ma méthode signature "De la ferme aux marchés mondiaux".
              </p>
              <div className="space-y-4 text-white/80">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>40+ années d'expérience terrain</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Diplômé de l'Université de Liège</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Expert FAO, PAM et FIDA</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-[3rem] rotate-3 scale-105"></div>
                <div className="relative bg-gradient-to-br from-primary-foreground to-secondary/20 rounded-[2.5rem] p-2 shadow-2xl">
                  <img
                    src="/kamga.jpg"
                    alt="Dr. Kanga - Expert en agriculture internationale"
                    className="rounded-[2rem] w-full h-full object-cover aspect-square"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profil Expert */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
              Expert Reconnu en Agriculture
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Docteur vétérinaire, 40+ années d'expérience, spécialiste en transformation et exportation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-primary">Formation & Expertise</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold">Docteur Vétérinaire - Université de Liège</p>
                      <p className="text-sm text-muted-foreground">Formation en sécurité sanitaire et qualité des aliments</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold">40+ années d'expérience</p>
                      <p className="text-sm text-muted-foreground">Gestion de projets agricoles et planification stratégique</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold">Spécialités clés</p>
                      <p className="text-sm text-muted-foreground">Chaînes de valeur, transformation locale, marchés internationaux</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary/5 to-accent/5">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary">Expert Polyglotte</h3>
                </div>
                <p className="text-lg mb-4">Communication internationale et terrain</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-sm">Français</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-sm">Anglais</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-sm">Espagnol</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <p className="font-semibold text-sm">Italien</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center italic">
                  + Langues locales africaines
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Parcours Professionnel */}
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

      {/* Programme Signature */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30" variant="secondary">
              Programme Signature
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-balance text-foreground">
              "De la ferme aux marchés mondiaux"
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed">
              Une méthode conçue pour sensibiliser, équiper et accompagner les producteurs locaux dans le développement durable de leur agro-business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-primary">Sensibiliser</h3>
                <p className="text-muted-foreground">
                  Éveiller la conscience entrepreneuriale et identifier les opportunités de marché
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-secondary">Équiper</h3>
                <p className="text-muted-foreground">
                  Fournir les outils techniques et stratégiques pour réussir l'exportation
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-accent">Accompagner</h3>
                <p className="text-muted-foreground">
                  Soutenir dans la durée pour assurer le développement durable
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
            <blockquote className="text-2xl md:text-3xl font-bold mb-6 leading-relaxed">
              "La réussite individuelle doit nourrir un projet collectif et contribuer au développement de la matière grise africaine."
            </blockquote>
            <p className="text-lg text-muted-foreground">
              Préparer les générations futures à prendre le relais du développement agricole africain.
            </p>
          </div>
        </div>
      </section>




      <Footer />
    </div>
  )
}