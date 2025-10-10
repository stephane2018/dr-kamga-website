"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Loader2, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

export default function UnsubscribePage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    // Récupérer l'email de l'URL si présent
    const emailFromUrl = searchParams.get("email")
    if (emailFromUrl) {
      setEmail(decodeURIComponent(emailFromUrl))
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus("success")
      } else {
        setStatus("error")
        setErrorMessage(data.error || "Une erreur est survenue")
      }
    } catch (err) {
      setStatus("error")
      setErrorMessage("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Désinscription</CardTitle>
          <CardDescription>
            Se désabonner de la liste de diffusion du Cabinet DAB
          </CardDescription>
        </CardHeader>

        <CardContent>
          {status === "idle" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Votre adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                <p className="leading-relaxed">
                  En confirmant votre désinscription, vous ne recevrez plus d'emails marketing
                  de notre part. Cette action est irréversible.
                </p>
              </div>

              {errorMessage && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                  {errorMessage}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="flex-1"
                >
                  <Link href="/">Annuler</Link>
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !email}
                  variant="destructive"
                  className="flex-1"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    "Me désinscrire"
                  )}
                </Button>
              </div>
            </form>
          )}

          {status === "success" && (
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Désinscription confirmée</h3>
                <p className="text-sm text-muted-foreground">
                  Votre demande de désinscription a été prise en compte.
                  Vous ne recevrez plus d'emails de notre part.
                </p>
              </div>
              <Button asChild className="w-full mt-4">
                <Link href="/">Retour à l'accueil</Link>
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Erreur</h3>
                <p className="text-sm text-muted-foreground">
                  {errorMessage || "Une erreur est survenue lors de la désinscription."}
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStatus("idle")}
                  className="flex-1"
                >
                  Réessayer
                </Button>
                <Button asChild className="flex-1">
                  <Link href="/">Retour à l'accueil</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
