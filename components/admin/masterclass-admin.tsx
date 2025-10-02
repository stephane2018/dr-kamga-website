"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"

interface Masterclass {
  id: string
  icon: string
  title: string
  description: string
  features: string[]
  cta: string
  backgroundColor: string
}

export function MasterclassAdmin() {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Sample data - would come from database
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>([
    {
      id: "1",
      icon: "🌾",
      title: "Transformation Locale",
      description: "Apprenez à transformer vos produits agricoles pour maximiser leur valeur",
      features: [
        "Techniques de conservation",
        "Packaging et branding",
        "Normes sanitaires"
      ],
      cta: "Commencer",
      backgroundColor: "from-amber-50 to-orange-50"
    },
    {
      id: "2",
      icon: "🌍",
      title: "Export International",
      description: "Maîtrisez les stratégies d'exportation vers les marchés mondiaux",
      features: [
        "Analyse de marché",
        "Documentation export",
        "Logistique internationale"
      ],
      cta: "Découvrir",
      backgroundColor: "from-blue-50 to-cyan-50"
    }
  ])

  const [formData, setFormData] = useState({
    icon: "",
    title: "",
    description: "",
    features: "",
    cta: "",
    backgroundColor: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would save to database
    console.log("Saving masterclass:", formData)
    setShowForm(false)
    resetForm()
  }

  const handleEdit = (masterclass: Masterclass) => {
    setEditingId(masterclass.id)
    setFormData({
      icon: masterclass.icon,
      title: masterclass.title,
      description: masterclass.description,
      features: masterclass.features.join("\n"),
      cta: masterclass.cta,
      backgroundColor: masterclass.backgroundColor
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette masterclass ?")) {
      setMasterclasses(masterclasses.filter(m => m.id !== id))
      // Here you would delete from database
      console.log("Deleting masterclass:", id)
    }
  }

  const resetForm = () => {
    setFormData({
      icon: "",
      title: "",
      description: "",
      features: "",
      cta: "",
      backgroundColor: ""
    })
    setEditingId(null)
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
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Ex: from-blue-50 to-cyan-50
                </p>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Titre
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Transformation Locale"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Apprenez à transformer vos produits agricoles..."
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Caractéristiques (une par ligne)
              </label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Techniques de conservation&#10;Packaging et branding&#10;Normes sanitaires"
                className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                required
              />
            </div>

            {/* CTA */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Texte du bouton (CTA)
              </label>
              <Input
                value={formData.cta}
                onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                placeholder="Commencer"
                required
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4 mr-2" />
                {editingId ? "Mettre à jour" : "Créer"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false)
                  resetForm()
                }}
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
                      <Badge variant="secondary" className="text-xs">
                        {masterclass.backgroundColor}
                      </Badge>
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

                <p className="text-sm text-muted-foreground mb-4">
                  {masterclass.description}
                </p>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Caractéristiques:</p>
                  <ul className="space-y-1">
                    {masterclass.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-muted-foreground">
                    CTA: <span className="font-medium text-foreground">{masterclass.cta}</span>
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
