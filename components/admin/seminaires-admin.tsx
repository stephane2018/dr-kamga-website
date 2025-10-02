"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon, Video } from "lucide-react"

interface ProgramDay {
  day: string
  title: string
  items: string[]
}

interface Seminar {
  id: string
  slug: string
  duration: string
  participants: string
  title: string
  subtitle: string
  description: string
  image?: string
  videoUrl?: string
  nextSession: string
  location: string
  program: ProgramDay[]
}

export function SeminairesAdmin() {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Sample data - would come from database
  const [seminaires, setSeminaires] = useState<Seminar[]>([
    {
      id: "1",
      slug: "transformation-unit",
      duration: "2 jours",
      participants: "12-15 participants",
      title: "Créer une unité de transformation compétitive",
      subtitle: "Du concept à la mise en œuvre",
      description: "Apprenez à concevoir, dimensionner et lancer votre unité de transformation pour maximiser la valeur ajoutée de vos produits.",
      image: "/images/seminaires/transformation-unit.jpg",
      videoUrl: "https://www.youtube.com/watch?v=example",
      nextSession: "15-16 Mars 2025",
      location: "Paris, France",
      program: [
        {
          day: "J1",
          title: "Conception et planification",
          items: [
            "Étude de faisabilité et business plan",
            "Choix des équipements et technologies",
            "Dimensionnement et layout optimal"
          ]
        },
        {
          day: "J2",
          title: "Mise en œuvre pratique",
          items: [
            "Simulation de processus de transformation",
            "Calcul des coûts et pricing",
            "Contrôle qualité et traçabilité"
          ]
        }
      ]
    }
  ])

  const [formData, setFormData] = useState({
    slug: "",
    duration: "",
    participants: "",
    title: "",
    subtitle: "",
    description: "",
    image: "",
    videoUrl: "",
    nextSession: "",
    location: "",
    programDays: [{ day: "J1", title: "", items: "" }]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would save to database
    console.log("Saving seminar:", formData)
    setShowForm(false)
    resetForm()
  }

  const handleEdit = (seminar: Seminar) => {
    setEditingId(seminar.id)
    setFormData({
      slug: seminar.slug,
      duration: seminar.duration,
      participants: seminar.participants,
      title: seminar.title,
      subtitle: seminar.subtitle,
      description: seminar.description,
      image: seminar.image || "",
      videoUrl: seminar.videoUrl || "",
      nextSession: seminar.nextSession,
      location: seminar.location,
      programDays: seminar.program.map(p => ({
        day: p.day,
        title: p.title,
        items: p.items.join("\n")
      }))
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce séminaire ?")) {
      setSeminaires(seminaires.filter(s => s.id !== id))
      console.log("Deleting seminar:", id)
    }
  }

  const resetForm = () => {
    setFormData({
      slug: "",
      duration: "",
      participants: "",
      title: "",
      subtitle: "",
      description: "",
      image: "",
      videoUrl: "",
      nextSession: "",
      location: "",
      programDays: [{ day: "J1", title: "", items: "" }]
    })
    setEditingId(null)
  }

  const addProgramDay = () => {
    setFormData({
      ...formData,
      programDays: [...formData.programDays, { day: `J${formData.programDays.length + 1}`, title: "", items: "" }]
    })
  }

  const removeProgramDay = (index: number) => {
    setFormData({
      ...formData,
      programDays: formData.programDays.filter((_, i) => i !== index)
    })
  }

  const updateProgramDay = (index: number, field: string, value: string) => {
    const updated = [...formData.programDays]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, programDays: updated })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestion des Séminaires</h2>
          <p className="text-muted-foreground">Créer et gérer les formations intensives</p>
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
              Nouveau Séminaire
            </>
          )}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-6">
            {editingId ? "Modifier" : "Créer"} un Séminaire
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-6">
              <h4 className="font-semibold text-lg border-b pb-2">Informations de base</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="transformation-unit"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Utilisé dans l'URL: /seminaires/slug
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Durée</label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="2 jours"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nombre de participants</label>
                  <Input
                    value={formData.participants}
                    onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                    placeholder="12-15 participants"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Prochaine session</label>
                  <Input
                    value={formData.nextSession}
                    onChange={(e) => setFormData({ ...formData, nextSession: e.target.value })}
                    placeholder="15-16 Mars 2025"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Lieu</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Paris, France"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Titre</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Créer une unité de transformation compétitive"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Sous-titre</label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Du concept à la mise en œuvre"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Apprenez à concevoir, dimensionner et lancer votre unité..."
                  className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            {/* Media */}
            <div className="space-y-6">
              <h4 className="font-semibold text-lg border-b pb-2">Médias</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    URL de l'image
                  </label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/images/seminaires/example.jpg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Optionnel - Chemin vers l'image
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    URL de la vidéo YouTube
                  </label>
                  <Input
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Optionnel - Lien YouTube
                  </p>
                </div>
              </div>
            </div>

            {/* Program */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="font-semibold text-lg">Programme détaillé</h4>
                <Button type="button" size="sm" onClick={addProgramDay} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un jour
                </Button>
              </div>

              {formData.programDays.map((programDay, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">Jour {index + 1}</h5>
                    {formData.programDays.length > 1 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => removeProgramDay(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Jour</label>
                      <Input
                        value={programDay.day}
                        onChange={(e) => updateProgramDay(index, "day", e.target.value)}
                        placeholder="J1"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Titre du jour</label>
                      <Input
                        value={programDay.title}
                        onChange={(e) => updateProgramDay(index, "title", e.target.value)}
                        placeholder="Conception et planification"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Points du programme (un par ligne)
                    </label>
                    <textarea
                      value={programDay.items}
                      onChange={(e) => updateProgramDay(index, "items", e.target.value)}
                      placeholder="Étude de faisabilité et business plan&#10;Choix des équipements et technologies&#10;Dimensionnement et layout optimal"
                      className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t">
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
          Séminaires existants ({seminaires.length})
        </h3>

        {seminaires.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <p className="text-muted-foreground">Aucun séminaire pour le moment</p>
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="mt-4"
            >
              Créer le premier séminaire
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {seminaires.map((seminar) => (
              <div
                key={seminar.id}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-lg">{seminar.title}</h4>
                      <Badge>{seminar.duration}</Badge>
                      <Badge variant="outline">{seminar.participants}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{seminar.subtitle}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>📅 {seminar.nextSession}</span>
                      <span>📍 {seminar.location}</span>
                      <span>🔗 /seminaires/{seminar.slug}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(seminar)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(seminar.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {seminar.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Programme:</p>
                    {seminar.program.map((day, idx) => (
                      <div key={idx} className="bg-gray-50 rounded p-3">
                        <p className="text-sm font-semibold mb-1">
                          {day.day} - {day.title}
                        </p>
                        <ul className="space-y-1">
                          {day.items.slice(0, 2).map((item, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                              <span className="text-primary">•</span>
                              {item}
                            </li>
                          ))}
                          {day.items.length > 2 && (
                            <li className="text-xs text-muted-foreground italic">
                              +{day.items.length - 2} autres points
                            </li>
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Médias:</p>
                    <div className="space-y-2">
                      {seminar.image && (
                        <div className="flex items-center gap-2 text-xs">
                          <ImageIcon className="h-4 w-4 text-green-600" />
                          <span className="text-muted-foreground">Image disponible</span>
                        </div>
                      )}
                      {seminar.videoUrl && (
                        <div className="flex items-center gap-2 text-xs">
                          <Video className="h-4 w-4 text-blue-600" />
                          <span className="text-muted-foreground">Vidéo disponible</span>
                        </div>
                      )}
                      {!seminar.image && !seminar.videoUrl && (
                        <p className="text-xs text-muted-foreground italic">Aucun média</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
