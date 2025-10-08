import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-slate-200 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
              <Search className="h-16 w-16 text-primary" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-slate-900">Page introuvable</h2>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-5 w-5" />
              Retour à l'accueil
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-5 w-5" />
              Page précédente
            </Link>
          </Button>
        </div>

        {/* Suggestions */}
        <div className="pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-600 mb-4">Vous cherchez peut-être :</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/">
              <Button variant="ghost" size="sm">Accueil</Button>
            </Link>
            <Link href="/masterclass">
              <Button variant="ghost" size="sm">Masterclass</Button>
            </Link>
            <Link href="/seminaires">
              <Button variant="ghost" size="sm">Séminaires</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="sm">Contact</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
