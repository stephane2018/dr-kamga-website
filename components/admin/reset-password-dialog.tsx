"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Copy, Check, Eye, EyeOff, RefreshCw, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

interface ResetPasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: string
  userEmail: string
  userName: string
  isCurrentAdmin: boolean
  onSuccess: () => void
}

interface PasswordStrength {
  score: number
  label: string
  color: string
  feedback: string[]
}

export function ResetPasswordDialog({
  open,
  onOpenChange,
  userId,
  userEmail,
  userName,
  isCurrentAdmin,
  onSuccess,
}: ResetPasswordDialogProps) {
  const [newPassword, setNewPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    label: "Très faible",
    color: "bg-red-500",
    feedback: [],
  })

  useEffect(() => {
    if (open) {
      generateStrongPassword()
    }
  }, [open])

  useEffect(() => {
    if (newPassword) {
      calculatePasswordStrength(newPassword)
    }
  }, [newPassword])

  const generateStrongPassword = () => {
    const length = 16
    const charset = {
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    }

    let password = ""
    const allChars = Object.values(charset).join("")

    // Ensure at least one character from each category
    password += charset.lowercase[Math.floor(Math.random() * charset.lowercase.length)]
    password += charset.uppercase[Math.floor(Math.random() * charset.uppercase.length)]
    password += charset.numbers[Math.floor(Math.random() * charset.numbers.length)]
    password += charset.symbols[Math.floor(Math.random() * charset.symbols.length)]

    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)]
    }

    // Shuffle the password
    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("")

    setNewPassword(password)
  }

  const calculatePasswordStrength = (password: string): void => {
    let score = 0
    const feedback: string[] = []

    // Length check
    if (password.length >= 8) score += 20
    if (password.length >= 12) score += 10
    if (password.length >= 16) score += 10

    // Character variety checks
    if (/[a-z]/.test(password)) {
      score += 15
    } else {
      feedback.push("Ajoutez des lettres minuscules")
    }

    if (/[A-Z]/.test(password)) {
      score += 15
    } else {
      feedback.push("Ajoutez des lettres majuscules")
    }

    if (/[0-9]/.test(password)) {
      score += 15
    } else {
      feedback.push("Ajoutez des chiffres")
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
      score += 15
    } else {
      feedback.push("Ajoutez des caractères spéciaux")
    }

    // Bonus for length
    if (password.length < 8) {
      feedback.push("Utilisez au moins 8 caractères")
      score = Math.min(score, 20)
    }

    // Determine label and color
    let label = "Très faible"
    let color = "bg-red-500"

    if (score >= 80) {
      label = "Très fort"
      color = "bg-green-500"
    } else if (score >= 60) {
      label = "Fort"
      color = "bg-blue-500"
    } else if (score >= 40) {
      label = "Moyen"
      color = "bg-yellow-500"
    } else if (score >= 20) {
      label = "Faible"
      color = "bg-orange-500"
    }

    setPasswordStrength({ score, label, color, feedback })
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(newPassword)
      setCopied(true)
      toast.success("Mot de passe copié dans le presse-papiers")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("Erreur lors de la copie")
    }
  }

  const handleSubmit = async () => {
    if (passwordStrength.score < 40) {
      toast.error("Le mot de passe est trop faible. Veuillez en générer un plus fort.")
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch(`/api/admin/users/${userId}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Mot de passe réinitialisé avec succès")
        onSuccess()
        onOpenChange(false)
      } else {
        toast.error(data.error || "Erreur lors de la réinitialisation")
      }
    } catch (error) {
      console.error("Error resetting password:", error)
      toast.error("Erreur lors de la réinitialisation")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Réinitialiser le mot de passe
          </DialogTitle>
          <DialogDescription>
            Générez un nouveau mot de passe sécurisé pour <strong>{userName}</strong> ({userEmail})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Admin Warning */}
          {isCurrentAdmin && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-orange-900">
                  Attention : Vous modifiez votre propre mot de passe
                </p>
                <p className="text-xs text-orange-700 mt-1">
                  Vous serez automatiquement déconnecté après la modification et devrez vous reconnecter avec le nouveau mot de passe.
                </p>
              </div>
            </div>
          )}

          {/* Password Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Nouveau mot de passe</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Entrez un mot de passe"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopy}
                disabled={!newPassword}
                title="Copier"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={generateStrongPassword}
                title="Générer un nouveau mot de passe"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Password Strength Gauge */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Force du mot de passe</span>
              <span className={`font-semibold ${
                passwordStrength.score >= 80 ? "text-green-600" :
                passwordStrength.score >= 60 ? "text-blue-600" :
                passwordStrength.score >= 40 ? "text-yellow-600" :
                passwordStrength.score >= 20 ? "text-orange-600" :
                "text-red-600"
              }`}>
                {passwordStrength.label}
              </span>
            </div>
            <Progress value={passwordStrength.score} className="h-2" />
            {passwordStrength.feedback.length > 0 && (
              <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                {passwordStrength.feedback.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-900">
              💡 <strong>Conseil :</strong> Copiez ce mot de passe et partagez-le de manière sécurisée avec l'utilisateur. 
              Il devra le changer lors de sa prochaine connexion.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
          >
            Annuler
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || passwordStrength.score < 40}
            className="bg-primary hover:bg-primary/90"
          >
            {submitting ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
