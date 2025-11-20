"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Plus, Edit, Trash2, Save, X, Eye, EyeOff,
  Sprout, Factory, Globe, Shield, CookingPot, DollarSign, Package, Truck, Warehouse, Leaf,
  Lightbulb, Target, TrendingUp, Brain, BookOpen, Award, Briefcase, Heart, Zap, Star, Users, Calendar,
  type LucideIcon
} from "lucide-react"
import { AdminListSkeleton } from "./admin-skeleton"
import { toast } from "sonner"

interface AxisCard {
  id: string
  axisKey: string
  icon: string
  iconColor: string
  titleFr: string
  titleEn: string
  descriptionFr: string
  descriptionEn: string
  contentFr: string
  contentEn: string
  features: string | { fr: string[]; en: string[] }
  duration: string
  maxParticipants: number
  order: number
  isActive: boolean
  isVisibleOnHome: boolean
}

const iconMap: Record<string, LucideIcon> = {
  Sprout, Factory, Globe, Shield, CookingPot, DollarSign, Package, Truck, Warehouse, Leaf,
  Lightbulb, Target, TrendingUp, Brain, BookOpen, Award, Briefcase, Heart, Zap, Star, Users, Calendar
}

export function AxisCardsAdmin() {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [axisCards, setAxisCards] = useState<AxisCard[]>([])

  const [activeLanguage, setActiveLanguage] = useState<'fr' | 'en'>('fr')
  const [formData, setFormData] = useState({
    axisKey: "",
    icon: "",
    iconColor: "primary",
    titleFr: "",
    titleEn: "",
    descriptionFr: "",
    descriptionEn: "",
    contentFr: "",
    contentEn: "",
    featuresFr: "",
    featuresEn: "",
    duration: "",
    maxParticipants: "20",
    order: 0,
    isVisibleOnHome: true
  })

  useEffect(() => {
    fetchAxisCards()
  }, [])

  const fetchAxisCards = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/axis-cards')
      const data = await response.json()

      if (data.success) {
        setAxisCards(data.data || [])
      } else {
        toast.error("Erreur lors du chargement des cartes")
        setAxisCards([])
      }
    } catch (error) {
      console.error("Error fetching axis cards:", error)
      toast.error("Erreur lors du chargement des cartes")
      setAxisCards([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const url = editingId ? `/api/admin/axis-cards/${editingId}` : '/api/admin/axis-cards'
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          axisKey: formData.axisKey,
          icon: formData.icon,
          iconColor: formData.iconColor,
          titleFr: formData.titleFr,
          titleEn: formData.titleEn,
          descriptionFr: formData.descriptionFr,
          descriptionEn: formData.descriptionEn,
          contentFr: formData.contentFr,
          contentEn: formData.contentEn,
          duration: formData.duration,
          maxParticipants: parseInt(formData.maxParticipants),
          order: formData.order,
          isVisibleOnHome: formData.isVisibleOnHome,
          features: {
            fr: formData.featuresFr.split('\n').filter(f => f.trim()),
            en: formData.featuresEn.split('\n').filter(f => f.trim())
          }
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(editingId ? "Carte mise à jour" : "Carte créée")
        setShowForm(false)
        resetForm()
        fetchAxisCards()
      } else {
        toast.error(data.error || "Une erreur s'est produite")
      }
    } catch (error) {
      console.error("Error saving axis card:", error)
      toast.error("Erreur lors de l'enregistrement")
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (axisCard: AxisCard) => {
    setEditingId(axisCard.id)

    // Parse features from string or object
    let featuresFrString = ""
    let featuresEnString = ""
    if (typeof axisCard.features === 'string') {
      try {
        const parsed = JSON.parse(axisCard.features)
        if (parsed.fr) featuresFrString = parsed.fr.join("\n")
        if (parsed.en) featuresEnString = parsed.en.join("\n")
      } catch {
        // If parsing fails, leave empty
      }
    } else if (typeof axisCard.features === 'object' && 'fr' in axisCard.features) {
      featuresFrString = axisCard.features.fr.join("\n")
      featuresEnString = axisCard.features.en.join("\n")
    }

    setFormData({
      axisKey: axisCard.axisKey,
      icon: axisCard.icon,
      iconColor: axisCard.iconColor,
      titleFr: axisCard.titleFr,
      titleEn: axisCard.titleEn,
      descriptionFr: axisCard.descriptionFr,
      descriptionEn: axisCard.descriptionEn,
      contentFr: axisCard.contentFr,
      contentEn: axisCard.contentEn,
      featuresFr: featuresFrString,
      featuresEn: featuresEnString,
      duration: axisCard.duration,
      maxParticipants: axisCard.maxParticipants.toString(),
      order: axisCard.order,
      isVisibleOnHome: axisCard.isVisibleOnHome !== undefined ? axisCard.isVisibleOnHome : true
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette carte ?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/axis-cards/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Carte supprimée")
        fetchAxisCards()
      } else {
        toast.error(data.error || "Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Error deleting axis card:", error)
      toast.error("Erreur lors de la suppression")
    }
  }

  const resetForm = () => {
    setFormData({
      axisKey: "",
      icon: "",
      iconColor: "primary",
      titleFr: "",
      titleEn: "",
      descriptionFr: "",
      descriptionEn: "",
      contentFr: "",
      contentEn: "",
      featuresFr: "",
      featuresEn: "",
      duration: "",
      maxParticipants: "20",
      order: 0,
      isVisibleOnHome: true
    })
    setEditingId(null)
    setActiveLanguage('fr')
  }

  if (loading) {
    return <AdminListSkeleton type="axis-cards" count={6} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestion des Cartes Axes</h2>
          <p className="text-muted-foreground">Créer et gérer les axes stratégiques de formation</p>
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
              Nouvelle Carte
            </>
          )}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-6">
            {editingId ? "Modifier" : "Créer"} une Carte Axe
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Axis Key */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Clé de l'axe
                </label>
                <Input
                  value={formData.axisKey}
                  onChange={(e) => setFormData({ ...formData, axisKey: e.target.value })}
                  placeholder="axis1"
                  required
                  disabled={submitting || editingId !== null}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Ex: axis1, axis2, etc.
                </p>
              </div>

              {/* Icon */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Icône (Lucide React)
                </label>
                <div className="relative">
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    required
                    disabled={submitting}
                  >
                    <option value="">Sélectionner une icône</option>
                    {Object.keys(iconMap).map((iconName) => (
                      <option key={iconName} value={iconName}>
                        {iconName}
                      </option>
                    ))}
                  </select>
                  {formData.icon && (() => {
                    const Icon = iconMap[formData.icon]
                    return Icon ? (
                      <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Icon className="h-5 w-5 text-gray-600" />
                      </div>
                    ) : null
                  })()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Choisissez une icône dans la liste
                </p>
              </div>

              {/* Icon Color */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Couleur de l'icône
                </label>
                <select
                  value={formData.iconColor}
                  onChange={(e) => setFormData({ ...formData, iconColor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  disabled={submitting}
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="accent">Accent</option>
                </select>
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ordre d'affichage
                </label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  placeholder="1"
                  required
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Duration and Max Participants */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Durée
                </label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="3h30"
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre max de participants
                </label>
                <Input
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                  placeholder="20"
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
                    Active/désactive l'affichage de cette carte sur la page d'accueil
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
                  className={`px-4 py-2 font-medium transition-colors ${activeLanguage === 'fr'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  🇫🇷 Français
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLanguage('en')}
                  className={`px-4 py-2 font-medium transition-colors ${activeLanguage === 'en'
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
                    placeholder="Axe 1 - Matières Premières"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description courte (Français)
                  </label>
                  <textarea
                    value={formData.descriptionFr}
                    onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
                    placeholder="Produire pour l'export dès le premier jour"
                    className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Contenu détaillé (Français)
                  </label>
                  <textarea
                    value={formData.contentFr}
                    onChange={(e) => setFormData({ ...formData, contentFr: e.target.value })}
                    placeholder="Maîtrisez les techniques de production qui répondent aux standards internationaux..."
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
                    placeholder="Sélection des variétés adaptées à l'export&#10;Techniques de culture optimisées&#10;Gestion de la qualité dès la production"
                    className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
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
                    placeholder="Axis 1 - Raw Materials"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Short Description (English)
                  </label>
                  <textarea
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    placeholder="Produce for export from day one"
                    className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Detailed Content (English)
                  </label>
                  <textarea
                    value={formData.contentEn}
                    onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
                    placeholder="Master production techniques that meet international standards..."
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
                    placeholder="Selection of export-adapted varieties&#10;Optimized cultivation techniques&#10;Quality management from production"
                    className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
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
          Cartes Axes existantes ({axisCards.length})
        </h3>

        {axisCards.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <p className="text-muted-foreground">Aucune carte pour le moment</p>
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="mt-4"
            >
              Créer la première carte
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {axisCards.map((axisCard) => {
              // Parse features safely
              let features: { fr: string[]; en: string[] } = { fr: [], en: [] }
              if (typeof axisCard.features === 'string') {
                try {
                  features = JSON.parse(axisCard.features)
                } catch {
                  // Keep empty if parsing fails
                }
              } else if (typeof axisCard.features === 'object' && 'fr' in axisCard.features) {
                features = axisCard.features
              }

              return (
                <div
                  key={axisCard.id}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-${axisCard.iconColor}/10 rounded-lg flex items-center justify-center text-${axisCard.iconColor}`}>
                        {(() => {
                          const Icon = iconMap[axisCard.icon] || Sprout
                          return <Icon className="h-6 w-6" />
                        })()}
                      </div>
                      <div>
                        <h4 className="font-bold text-base">{axisCard.titleFr}</h4>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {axisCard.axisKey}
                          </Badge>
                          {axisCard.isVisibleOnHome ? (
                            <Badge variant="default" className="text-xs bg-green-600">
                              <Eye className="h-3 w-3 mr-1" />
                              Visible
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs text-gray-500">
                              <EyeOff className="h-3 w-3 mr-1" />
                              Masqué
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(axisCard)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(axisCard.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-xs text-muted-foreground">
                      ⏱️ Durée: {axisCard.duration}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      👥 Max: {axisCard.maxParticipants} pers.
                    </div>
                    <div className="text-xs text-muted-foreground">
                      📊 Ordre: {axisCard.order}
                    </div>
                    <div className="text-xs">
                      <Badge variant="outline" className="text-xs">
                        {axisCard.iconColor}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {axisCard.descriptionFr}
                  </p>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Caractéristiques (Fr):</p>
                    <ul className="space-y-1">
                      {features.fr.slice(0, 3).map((feature: string, idx: number) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {feature}
                        </li>
                      ))}
                      {features.fr.length > 3 && (
                        <li className="text-xs text-muted-foreground italic">
                          +{features.fr.length - 3} autres...
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
