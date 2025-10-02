import { Badge } from "@/components/ui/badge"

export function AboutHeroSection() {
  return (
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
  )
}
