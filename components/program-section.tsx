import { Sprout, Factory, Globe, Shield, CookingPot, DollarSign } from "lucide-react"

export function ProgramSection() {
  return (
    <section id="programme" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
            Un parcours structuré en 6 axes stratégiques
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-8">
            pour transformer votre vision agricole et atteindre les marchés internationaux.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Axe 1 */}
          <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
              1
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
              <Sprout className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3"> Création de l'exploitation Agricole</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
             Création d'une exploitation agricole adaptée à votre projet agricole et à votre niveau de développement.
            </p>
          </div>
          <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
              2
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
              <CookingPot className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3"> Gestion de la production 
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
             ont donne les outils pour structurer et optimiser votre unité pour devenir compétitif et rentable.
            </p>
          </div>

          {/* Axe 2 */}
          <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
              3
            </div>
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
              <Factory className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-3">Transformation</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
                  Transformez vos matières premières en produits à forte valeur ajoutée avec des équipements adaptés et des processus optimisés.
            </p>
          </div>

          {/* Axe 3 */}
          <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
              4
            </div>
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
              <Globe className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-accent mb-3">Exportation</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Maîtrisez les 3 étapes clés pour réussir votre export et préparez un dossier compétitif et crédible.
            </p>
          </div>

          {/* Module Transversal */}
          <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
              4
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Assurances agricoles</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Garantissez votre investissement et protégez vos produits pendant la transformation et l'export.
            </p>
          </div>
          
          <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
              6
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Financement agricole</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Accédez à des financements adaptés à votre projet agricole et à votre niveau de développement.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}