import Link from "next/link"
import { Mail, Phone, MapPin, Wheat, Sprout, Leaf, Sun, Tractor } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-muted border-t border-border overflow-hidden">
      {/* Agricultural Background Motifs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large background pattern */}
        <div className="absolute -top-10 -left-10 opacity-5">
          <Wheat className="h-32 w-32 text-primary rotate-12 animate-pulse" style={{ animationDuration: '4s' }} />
        </div>
        <div className="absolute top-20 -right-16 opacity-5">
          <Tractor className="h-40 w-40 text-secondary -rotate-12 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-10 left-1/4 opacity-5">
          <Sun className="h-28 w-28 text-accent animate-spin" style={{ animationDuration: '20s' }} />
        </div>
        <div className="absolute top-1/2 right-1/3 opacity-5">
          <Sprout className="h-24 w-24 text-primary rotate-45 animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        </div>

        {/* Medium scattered motifs */}
        <div className="absolute top-16 left-1/3 opacity-10">
          <Leaf className="h-16 w-16 text-secondary rotate-180 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
        </div>
        <div className="absolute bottom-32 right-1/4 opacity-10">
          <Wheat className="h-20 w-20 text-accent -rotate-30 animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }} />
        </div>
        <div className="absolute top-1/3 left-1/6 opacity-8">
          <Sprout className="h-14 w-14 text-primary/60 rotate-90 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '2.5s' }} />
        </div>

        {/* Small decorative dots and mini motifs */}
        <div className="absolute top-1/4 left-2/3 opacity-15">
          <Leaf className="h-8 w-8 text-secondary/80 animate-pulse" style={{ animationDuration: '2s', animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-1/4 left-1/2 opacity-15">
          <Wheat className="h-6 w-6 text-primary/80 rotate-45 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '3s' }} />
        </div>
        <div className="absolute top-3/4 right-1/6 opacity-15">
          <Sprout className="h-10 w-10 text-accent/80 -rotate-15 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.8s' }} />
        </div>

        {/* Gradient overlays for depth */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-muted/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-muted/80 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">DK</span>
              </div>
              <span className="font-bold text-lg text-foreground">CabinetDab</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Transformez votre exploitation agricole locale en entreprise exportatrice grâce à la méthode éprouvée du
              Dr. Kanga.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@cabinetdab.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Formation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/videos" className="text-muted-foreground hover:text-primary transition-colors">
                  Vidéos Pédagogiques
                </Link>
              </li>
              <li>
                <Link href="/masterclass" className="text-muted-foreground hover:text-primary transition-colors">
                  Masterclass
                </Link>
              </li>
              <li>
                <Link href="/seminaires" className="text-muted-foreground hover:text-primary transition-colors">
                  Séminaires
                </Link>
              </li>
              <li>
                <Link href="/coaching" className="text-muted-foreground hover:text-primary transition-colors">
                  Coaching Privé
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 CabinetDab. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
