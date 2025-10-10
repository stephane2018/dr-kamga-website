"use client"

import { useState, useEffect } from "react"
import { X, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Check if user has already seen the modal or subscribed
    const hasSeenModal = document.cookie.includes("newsletter_modal_seen=true")
    const hasSubscribed = document.cookie.includes("newsletter_subscribed=true")

    if (!hasSeenModal && !hasSubscribed) {
      // Show modal after 30 seconds for new visitors
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 30000) // 30 seconds delay

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 30)
    document.cookie = `newsletter_modal_seen=true; expires=${expiryDate.toUTCString()}; path=/`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Appel à l'API newsletter
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })

      const data = await response.json()

      if (data.success) {
        const expiryDate = new Date()
        expiryDate.setFullYear(expiryDate.getFullYear() + 1)
        document.cookie = `newsletter_subscribed=true; expires=${expiryDate.toUTCString()}; path=/`

        setIsSubmitted(true)

        setTimeout(() => {
          setIsVisible(false)
        }, 3000)
      } else {
        console.error("Erreur d'inscription:", data.error)
        alert("Une erreur est survenue. Veuillez réessayer.")
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
      alert("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Content */}
          <div className="relative p-8">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>

            {!isSubmitted ? (
              <>
                {/* Icon */}
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Mail className="h-8 w-8 text-white" />
                </div>

                {/* Heading */}
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Transformez Votre Agriculture
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  Rejoignez <strong className="text-primary">+2 000 agriculteurs</strong> qui reçoivent nos conseils
                  exclusifs, stratégies d'exportation et opportunités de marchés internationaux.
                </p>

                {/* Benefits */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">
                      <strong>Stratégies exclusives</strong> pour pénétrer les marchés internationaux
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">
                      <strong>Études de cas réels</strong> d'agriculteurs qui ont multiplié leurs revenus
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">
                      <strong>Accès prioritaire</strong> aux masterclass et événements exclusifs
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary transition-colors"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    {isSubmitting ? "Inscription en cours..." : "Recevoir les conseils gratuits →"}
                  </Button>
                </form>

                {/* Privacy notice */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  En vous inscrivant, vous acceptez de recevoir nos emails. Vous pouvez vous désinscrire à tout moment.
                  Nous respectons votre vie privée.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Merci !</h3>
                <p className="text-gray-600">
                  Votre inscription est confirmée. Consultez votre boîte mail pour recevoir votre premier conseil.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
