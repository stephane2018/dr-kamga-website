import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Mail } from "lucide-react"
import Image from "next/image"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Cabinet DAB Admin</h1>
          <p className="text-muted-foreground">Espace d'administration</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>

          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@cabinetdab.com"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="ml-2 text-sm text-muted-foreground">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-lg font-semibold">
              Se connecter
            </Button>
          </form>

          {/* Footer Note */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            Accès réservé aux administrateurs autorisés
          </p>
        </div>

        {/* Security Note */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            🔒 Connexion sécurisée
          </p>
        </div>
      </div>
    </div>
  )
}
