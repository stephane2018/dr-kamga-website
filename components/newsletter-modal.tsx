"use client"

import { useState, useEffect } from "react"
import { X, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { newsletterModalTranslations } from "../locales/newsletter-modal-translations"
import { useLanguage } from "@/locales/LanguageProvider"

export function NewsletterModal() {
  const { language } = useLanguage()
  const t = newsletterModalTranslations[language]
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const hasSeenModal = document.cookie.includes("newsletter_modal_seen=true")
    const hasSubscribed = document.cookie.includes("newsletter_subscribed=true")

    if (!hasSeenModal && !hasSubscribed) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 15000)

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
        console.error(t.errorSubscription, data.error)
        alert(t.errorMessage)
      }
    } catch (error) {
      console.error(t.errorConnection, error)
      alert(t.errorConnectionMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={handleClose}
      />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            aria-label={t.close}
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative p-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>

            {!isSubmitted ? (
              <>
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Mail className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {t.title}
                </h3>
                <p
                  className="text-gray-600 text-center mb-6 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t.description }}
                />

                <div className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">
                      <strong>{t.benefit1Title}</strong> {t.benefit1Desc}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">
                      <strong>{t.benefit2Title}</strong> {t.benefit2Desc}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">
                      <strong>{t.benefit3Title}</strong> {t.benefit3Desc}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder={t.emailPlaceholder}
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
                    {isSubmitting ? t.submittingButton : t.submitButton}
                  </Button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  {t.privacyNotice}
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
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.successTitle}</h3>
                <p className="text-gray-600">{t.successMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
