import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Settings } from "lucide-react"

export default function AdminNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-xl w-full text-center space-y-6">
        {/* Icon */}
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Settings className="h-12 w-12 text-primary" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Page admin introuvable</h1>
          <p className="text-slate-600">
            Cette section de l'administration n'existe pas ou vous n'avez pas les permissions nécessaires.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button asChild className="gap-2">
            <Link href="/admin">
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
