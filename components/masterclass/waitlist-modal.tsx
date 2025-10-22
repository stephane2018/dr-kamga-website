"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Mail, Phone, MessageSquare, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/locales/LanguageProvider"

interface WaitlistModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  masterclassTitle: string
  masterclassType?: string
}

export function WaitlistModal({ open, onOpenChange, masterclassTitle, masterclassType }: WaitlistModalProps) {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [expectations, setExpectations] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setError(t.masterclass.waitlist.errorMessage)
        setIsLoading(false)
        return
      }

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          expectations: expectations.trim(),
          masterclassTitle,
          masterclassType,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        setTimeout(() => {
          setIsSuccess(false)
          setEmail("")
          setPhone("")
          setExpectations("")
          onOpenChange(false)
        }, 3000)
      } else {
        setError(data.error || t.masterclass.waitlist.errorMessage)
      }
    } catch (err) {
      setError(t.masterclass.waitlist.errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                {t.masterclass.waitlist.title}
              </DialogTitle>
              <DialogDescription className="text-center pt-2">
                {t.masterclass.waitlist.subtitle}
              </DialogDescription>
            </DialogHeader>

            <div className="bg-muted/50 rounded-lg p-4 my-2">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.masterclass.waitlist.description}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t.masterclass.waitlist.fields.email.label}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.masterclass.waitlist.fields.email.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t.masterclass.waitlist.fields.phone.label}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t.masterclass.waitlist.fields.phone.placeholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectations">
                  {t.masterclass.waitlist.fields.expectations.label}
                </Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="expectations"
                    placeholder={t.masterclass.waitlist.fields.expectations.placeholder}
                    value={expectations}
                    onChange={(e) => setExpectations(e.target.value)}
                    className="pl-10 min-h-[100px]"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {t.masterclass.waitlist.close}
                </Button>
                <Button type="submit" disabled={isLoading || !email || !phone} className="flex-1">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t.masterclass.waitlist.submitting}
                    </>
                  ) : (
                    t.masterclass.waitlist.submitButton
                  )}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t.masterclass.waitlist.successTitle}
            </h3>
            <p className="text-gray-600">{t.masterclass.waitlist.successMessage}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
