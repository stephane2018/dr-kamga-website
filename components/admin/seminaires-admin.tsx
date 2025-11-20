"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon, Video, Eye, EyeOff } from "lucide-react"
import { AdminListSkeleton } from "./admin-skeleton"
import { toast } from "sonner"

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
  program: ProgramDay[] | { fr: ProgramDay[]; en: ProgramDay[] }
  isVisibleOnHome?: boolean
}

export function SeminairesAdmin() {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [seminaires, setSeminaires] = useState<Seminar[]>([])

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
    programDays: [{ day: "J1", title: "", items: "" }],
    isVisibleOnHome: true
  })

  // Fetch seminars on mount
  useEffect(() => {
    fetchSeminaires()
  }, [])

  const fetchSeminaires = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/seminaires')
      const data = await response.json()

      if (data.success) {
        setSeminaires(data.data)
      } else {
        toast.error("Erreur lors du chargement des séminaires")
      }
    } catch (error) {
      console.error("Error fetching seminars:", error)
      toast.error("Erreur lors du chargement des séminaires")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Convert programDays to multilingual program format
      const programArray = formData.programDays.map(pd => ({
        day: pd.day,
        title: pd.title,
        items: pd.items.split('\n').filter(item => item.trim())
      }))

      // Create program in multilingual format {fr: [], en: []}
      const program = {
        fr: programArray,
        en: programArray // Using same content for both languages for now
      }

      const url = editingId ? `/api/seminaires/${editingId}` : '/api/seminaires'
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: formData.slug,
          duration: formData.duration,
          participants: formData.participants,
          titleFr: formData.title,
          titleEn: formData.title, // Using same content for both languages
          subtitleFr: formData.subtitle,
          subtitleEn: formData.subtitle,
          descriptionFr: formData.description,
          descriptionEn: formData.description,
          image: formData.image || undefined,
          videoUrl: formData.videoUrl || undefined,
          nextSession: formData.nextSession,
          location: formData.location,
          program,
          isVisibleOnHome: formData.isVisibleOnHome
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(editingId ? "Séminaire mis à jour" : "Séminaire créé")
        setShowForm(false)
        resetForm()
        fetchSeminaires()
      } else {
        toast.error(data.error || "Une erreur s'est produite")
      }
    } catch (error) {
      console.error("Error saving seminar:", error)
      toast.error("Erreur lors de l'enregistrement")
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (seminar: Seminar) => {
    setEditingId(seminar.id)

    // Parse program - it comes as {fr: [], en: []} from API
    let programDays: { day: string; title: string; items: string }[] = []
    if (seminar.program) {
      // If program is an object with fr/en, use the fr version
      const programData = typeof seminar.program === 'object' && 'fr' in seminar.program
        ? (seminar.program as any).fr
        : seminar.program

      if (Array.isArray(programData)) {
        programDays = programData.map(p => ({
          day: p.day,
          title: p.title,
          items: Array.isArray(p.items) ? p.items.join("\n") : p.items
        }))
      }
    }

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
      programDays: programDays.length > 0 ? programDays : [{ day: "J1", title: "", items: "" }],
      isVisibleOnHome: seminar.isVisibleOnHome !== undefined ? seminar.isVisibleOnHome : true
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce séminaire ?")) {
      return
    }

    try {
      const response = await fetch(`/api/seminaires/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Séminaire supprimé")
        fetchSeminaires()
      } else {
        toast.error(data.error || "Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Error deleting seminar:", error)
      toast.error("Erreur lors de la suppression")
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
      programDays: [{ day: "J1", title: "", items: "" }],
      isVisibleOnHome: true
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

  if (loading) {
    return <AdminListSkeleton type="seminar" count={1} />
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
              Nouveau Séminaire
            </>
          )}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary p-6">
            <h3 className="text-xl font-bold text-white">
              {editingId ? "✏️ Modifier" : "✨ Créer"} un Séminaire
            </h3>
            <p className="text-white/80 text-sm mt-1">
              Remplissez tous les champs pour créer un séminaire complet
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Info */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 border-b border-gray-300 pb-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <h4 className="font-semibold text-lg">Informations de base</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="transformation-unit"
                    required
                    disabled={submitting}
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
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nombre de participants</label>
                  <Input
                    value={formData.participants}
                    onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                    placeholder="12-15 participants"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Prochaine session</label>
                  <Input
                    value={formData.nextSession}
                    onChange={(e) => setFormData({ ...formData, nextSession: e.target.value })}
                    placeholder="15-16 Mars 2025"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Lieu</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Paris, France"
                    required
                    disabled={submitting}
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
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Sous-titre</label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Du concept à la mise en œuvre"
                  required
                  disabled={submitting}
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
                    Active/désactive l'affichage de ce séminaire sur la page d'accueil
                  </p>
                </div>
                <Switch
                  checked={formData.isVisibleOnHome}
                  onCheckedChange={(checked) => setFormData({ ...formData, isVisibleOnHome: checked })}
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Media */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 border-b border-gray-300 pb-3">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <h4 className="font-semibold text-lg">Médias</h4>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    URL de l'image
                  </label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/images/seminaires/example.jpg"
                    disabled={submitting}
                  />
                  <p className="text-xs text-muted-foreground">
                    Optionnel - Chemin vers l'image
                  </p>

                  {/* Image Preview */}
                  {formData.image && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Aperçu de l'image:</p>
                      <div className="relative aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.nextElementSibling?.classList.remove('hidden')
                          }}
                        />
                        <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-100">
                          <div className="text-center text-muted-foreground">
                            <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p className="text-xs">Image introuvable</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    URL de la vidéo YouTube
                  </label>
                  <Input
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    disabled={submitting}
                  />
                  <p className="text-xs text-muted-foreground">
                    Optionnel - Lien YouTube
                  </p>

                  {/* Video Preview */}
                  {formData.videoUrl && (() => {
                    const getYouTubeId = (url: string) => {
                      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
                      const match = url.match(regExp)
                      return (match && match[2].length === 11) ? match[2] : null
                    }
                    const videoId = getYouTubeId(formData.videoUrl)

                    return videoId ? (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Aperçu de la vidéo:</p>
                        <div className="relative aspect-video w-full bg-gray-900 rounded-lg overflow-hidden">
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video preview"
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-xs text-yellow-800">⚠️ URL YouTube invalide</p>
                      </div>
                    )
                  })()}
                </div>
              </div>
            </div>

            {/* Program */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between border-b border-gray-300 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-lg">Programme détaillé</h4>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={addProgramDay}
                  variant="outline"
                  disabled={submitting}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un jour
                </Button>
              </div>

              {formData.programDays.map((programDay, index) => (
                <div key={index} className="bg-white rounded-lg p-5 space-y-4 border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-primary/10 rounded-md flex items-center justify-center">
                        <span className="text-primary text-sm font-bold">{index + 1}</span>
                      </div>
                      <h5 className="font-semibold text-gray-900">Jour {index + 1}</h5>
                    </div>
                    {formData.programDays.length > 1 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeProgramDay(index)}
                        disabled={submitting}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
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
                        disabled={submitting}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Titre du jour</label>
                      <Input
                        value={programDay.title}
                        onChange={(e) => updateProgramDay(index, "title", e.target.value)}
                        placeholder="Conception et planification"
                        required
                        disabled={submitting}
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
                      disabled={submitting}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Séparez chaque point par une nouvelle ligne (Entrée)
                    </p>

                    {/* Live Preview of Program Points */}
                    {programDay.items.trim() && (
                      <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs font-medium text-blue-900 mb-2 flex items-center gap-1">
                          <span>👁️</span> Aperçu en direct:
                        </p>
                        <ul className="space-y-2">
                          {programDay.items
                            .split('\n')
                            .filter(item => item.trim())
                            .map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-blue-900">
                                <span className="text-primary font-bold mt-0.5">•</span>
                                <span className="flex-1">{item.trim()}</span>
                              </li>
                            ))}
                        </ul>
                        {programDay.items.split('\n').filter(item => item.trim()).length === 0 && (
                          <p className="text-xs text-blue-700 italic">Commencez à taper pour voir l'aperçu...</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t">
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
                      {seminar.isVisibleOnHome ? (
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
                    <p className="text-xs font-medium text-muted-foreground">Programme (Fr):</p>
                    {(() => {
                      const program = seminar?.program as any
                      const programArray: any[] = (typeof program === 'object' && program !== null && 'fr' in program) ? program.fr : []
                      return programArray.map((day: any, idx: number) => (
                        <div key={idx} className="bg-gray-50 rounded p-3">
                          <p className="text-sm font-semibold mb-1">
                            {day.day} - {day.title}
                          </p>
                          <ul className="space-y-1">
                            {day.items.slice(0, 2).map((item: string, i: number) => (
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
                      ))
                    })()}
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
