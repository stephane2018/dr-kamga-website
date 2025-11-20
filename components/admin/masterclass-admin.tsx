"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff } from "lucide-react"
import { AdminListSkeleton } from "./admin-skeleton"
import { toast } from "sonner"

interface Masterclass {
  id: string
  icon: string
  title: string
  titleFr?: string
  titleEn?: string
  description: string
  descriptionFr?: string
  descriptionEn?: string
  features: string[] | { fr: string[]; en: string[] }
  cta: string
  ctaFr?: string
  ctaEn?: string
  backgroundColor: string
  type?: string
  date?: string
  time?: string
  seats?: string
  isActive?: boolean
  isVisibleOnHome?: boolean
}

export function MasterclassAdmin() {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>([])

  const [activeLanguage, setActiveLanguage] = useState<'fr' | 'en'>('fr')
  const [formData, setFormData] = useState({
    icon: "",
    titleFr: "",
    titleEn: "",
    descriptionFr: "",
    descriptionEn: "",
    featuresFr: "",
    featuresEn: "",
    ctaFr: "",
    ctaEn: "",
    backgroundColor: "",
    type: "online",
    date: "",
    time: "",
    seats: "",
    isVisibleOnHome: true
  })

  // Fetch masterclasses on mount
  useEffect(() => {
    fetchMasterclasses()
  }, [])

  const fetchMasterclasses = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/masterclass')
      const data = await response.json()

      if (data.success) {
        setMasterclasses(data.data)
      } else {
        toast.error("Erreur lors du chargement des masterclasses")
      }
    } catch (error) {
      console.error("Error fetching masterclasses:", error)
      toast.error("Erreur lors du chargement des masterclasses")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const url = editingId ? `/api/masterclass/${editingId}` : '/api/masterclass'
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          icon: formData.icon,
          titleFr: formData.titleFr,
          titleEn: formData.titleEn,
          descriptionFr: formData.descriptionFr,
          descriptionEn: formData.descriptionEn,
          ctaFr: formData.ctaFr,
          ctaEn: formData.ctaEn,
          backgroundColor: formData.backgroundColor,
          type: formData.type,
          date: formData.date,
          time: formData.time,
          seats: formData.seats,
          isVisibleOnHome: formData.isVisibleOnHome,
          features: {
            fr: formData.featuresFr.split('\n').filter(f => f.trim()),
            en: formData.featuresEn.split('\n').filter(f => f.trim())
          }
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(editingId ? "Masterclass mise à jour" : "Masterclass créée")
        setShowForm(false)
        resetForm()
        fetchMasterclasses()
      } else {
        toast.error(data.error || "Une erreur s'est produite")
      }
    } catch (error) {
      console.error("Error saving masterclass:", error)
      toast.error("Erreur lors de l'enregistrement")
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (masterclass: Masterclass) => {
    setEditingId(masterclass.id)

    // Handle both old and new formats
    let featuresFrString = ""
    let featuresEnString = ""
    if (typeof masterclass.features === 'object' && 'fr' in masterclass.features) {
      featuresFrString = masterclass.features.fr.join("\n")
      featuresEnString = masterclass.features.en.join("\n")
    } else if (Array.isArray(masterclass.features)) {
      featuresFrString = masterclass.features.join("\n")
      featuresEnString = masterclass.features.join("\n")
    }

    setFormData({
      icon: masterclass.icon,
      titleFr: masterclass.titleFr || masterclass.title,
      titleEn: masterclass.titleEn || masterclass.title,
      descriptionFr: masterclass.descriptionFr || masterclass.description,
      descriptionEn: masterclass.descriptionEn || masterclass.description,
      featuresFr: featuresFrString,
      featuresEn: featuresEnString,
      ctaFr: masterclass.ctaFr || masterclass.cta,
      ctaEn: masterclass.ctaEn || masterclass.cta,
      backgroundColor: masterclass.backgroundColor,
      type: masterclass.type || "online",
      date: masterclass.date || "",
      time: masterclass.time || "",
      seats: masterclass.seats || "",
      isVisibleOnHome: masterclass.isVisibleOnHome !== undefined ? masterclass.isVisibleOnHome : true
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette masterclass ?")) {
      return
    }

    try {
      const response = await fetch(`/api/masterclass/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Masterclass supprimée")
        fetchMasterclasses()
      } else {
        toast.error(data.error || "Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Error deleting masterclass:", error)
      toast.error("Erreur lors de la suppression")
    }
  }

  const resetForm = () => {
    setFormData({
      icon: "",
      titleFr: "",
      titleEn: "",
      descriptionFr: "",
      descriptionEn: "",
      featuresFr: "",
      featuresEn: "",
      ctaFr: "",
      ctaEn: "",
      backgroundColor: "",
      type: "online",
      date: "",
      time: "",
      seats: "",
      isVisibleOnHome: true
    })
    setEditingId(null)
    setActiveLanguage('fr')
  }

  if (loading) {
    return <AdminListSkeleton type="masterclass" count={2} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestion des Masterclass</h2>
          <p className="text-muted-foreground">Créer et gérer les modules de formation</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90"
          disabled={submitting}
        >
          {showForm ? (
            <>
              <X className="h-4 w-4 mr-2" />
              Annuler
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Masterclass
            </>
          )}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-6">
            {editingId ? "Modifier" : "Créer"} une Masterclass
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Icon */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Icône (emoji)
                </label>
                <Input
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="🌾"
                  className="text-2xl"
                  required
                  disabled={submitting}
                />
              </div>

              {/* Background Color */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Couleur de fond (gradient)
                </label>
                <Input
                  value={formData.backgroundColor}
                  onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                  placeholder="from-amber-50 to-orange-50"
                  required
                  disabled={submitting}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Ex: from-blue-50 to-cyan-50
                </p>
              </div>
            </div>

            {/* Type, Date, Time, Seats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  disabled={submitting}
                >
                  <option value="online">En ligne</option>
                  <option value="inPerson">Présentiel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Date
                </label>
                <Input
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="15 Mars 2025"
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Heure
                </label>
                <Input
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="14h00 - 17h00"
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Places restantes
                </label>
                <Input
                  value={formData.seats}
                  onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                  placeholder="15 places"
                  required
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Visibility Toggle */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="text-sm font-semibold text-blue-900 flex items-center gap-2">
                    {formData.isVisibleOnHome ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                    Afficher sur la page d'accueil
                  </label>
                  <p className="text-xs text-blue-700 mt-1">
                    Active/désactive l'affichage de cette masterclass sur la page d'accueil
                  </p>
                </div>
                <Switch
                  checked={formData.isVisibleOnHome}
                  onCheckedChange={(checked) => setFormData({ ...formData, isVisibleOnHome: checked })}
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Language Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setActiveLanguage('fr')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeLanguage === 'fr'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  🇫🇷 Français
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLanguage('en')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeLanguage === 'en'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  🇬🇧 English
                </button>
              </div>
            </div>

            {/* French Fields */}
            {activeLanguage === 'fr' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Titre (Français)
                  </label>
                  <Input
                    value={formData.titleFr}
                    onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
                    placeholder="Transformation Locale"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description (Français)
                  </label>
                  <textarea
                    value={formData.descriptionFr}
                    onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
                    placeholder="Apprenez à transformer vos produits agricoles..."
                    className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Caractéristiques (Français, une par ligne)
                  </label>
                  <textarea
                    value={formData.featuresFr}
                    onChange={(e) => setFormData({ ...formData, featuresFr: e.target.value })}
                    placeholder="Techniques de conservation&#10;Packaging et branding&#10;Normes sanitaires"
                    className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Texte du bouton (Français)
                  </label>
                  <Input
                    value={formData.ctaFr}
                    onChange={(e) => setFormData({ ...formData, ctaFr: e.target.value })}
                    placeholder="Commencer"
                    required
                    disabled={submitting}
                  />
                </div>
              </div>
            )}

            {/* English Fields */}
            {activeLanguage === 'en' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title (English)
                  </label>
                  <Input
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    placeholder="Local Transformation"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description (English)
                  </label>
                  <textarea
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    placeholder="Learn to transform your agricultural products..."
                    className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Features (English, one per line)
                  </label>
                  <textarea
                    value={formData.featuresEn}
                    onChange={(e) => setFormData({ ...formData, featuresEn: e.target.value })}
                    placeholder="Preservation techniques&#10;Packaging and branding&#10;Health standards"
                    className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Button Text (English)
                  </label>
                  <Input
                    value={formData.ctaEn}
                    onChange={(e) => setFormData({ ...formData, ctaEn: e.target.value })}
                    placeholder="Get Started"
                    required
                    disabled={submitting}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={submitting}
              >
                <Save className="h-4 w-4 mr-2" />
                {submitting ? "En cours..." : editingId ? "Mettre à jour" : "Créer"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false)
                  resetForm()
                }}
                disabled={submitting}
              >
                Annuler
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Masterclass existantes ({masterclasses.length})
        </h3>

        {masterclasses.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <p className="text-muted-foreground">Aucune masterclass pour le moment</p>
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="mt-4"
            >
              Créer la première masterclass
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {masterclasses.map((masterclass) => (
              <div
                key={masterclass.id}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{masterclass.icon}</span>
                    <div>
                      <h4 className="font-bold text-lg">{masterclass.title}</h4>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {masterclass.backgroundColor}
                        </Badge>
                        {masterclass.isVisibleOnHome ? (
                          <Badge variant="default" className="text-xs bg-green-600">
                            <Eye className="h-3 w-3 mr-1" />
                            Visible sur accueil
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs text-gray-500">
                            <EyeOff className="h-3 w-3 mr-1" />
                            Masqué sur accueil
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(masterclass)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(masterclass.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="font-medium">
                      {masterclass.type === 'online' ? '🌐 En ligne' : '🏢 Présentiel'}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    📅 {masterclass.date}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    🕐 {masterclass.time}
                  </div>
                  <div className="text-xs text-primary font-medium">
                    💺 {masterclass.seats}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {masterclass.description}
                </p>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Caractéristiques (Fr):</p>
                  <ul className="space-y-1">
                    {(() => {
                      const features = masterclass.features
                      if (typeof features === 'object' && 'fr' in features) {
                        return features.fr
                      } else if (Array.isArray(features)) {
                        return features
                      }
                      return []
                    })().map((feature: string, idx: number) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-muted-foreground">
                    CTA (Fr): <span className="font-medium text-foreground">{masterclass.ctaFr || masterclass.cta}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
