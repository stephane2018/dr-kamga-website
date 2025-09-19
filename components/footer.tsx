import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">DK</span>
              </div>
              <span className="font-bold text-lg text-foreground">Cabinetdab</span>
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
          <p>&copy; 2024 Cabinetdab. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
