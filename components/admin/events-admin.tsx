"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon, Calendar, MapPin, ExternalLink, Archive, AlertCircle } from "lucide-react"
import { AdminListSkeleton } from "./admin-skeleton"
import { toast } from "sonner"
import { isEventOutdated, parseFrenchDate } from "@/lib/event-utils"

interface Event {
  id: string
  titleFr: string
  titleEn: string
  date: string
  eventDate?: Date | null
  type: string
  locationFr: string
  locationEn: string
  descriptionFr: string
  descriptionEn: string
  imageUrl: string
  socialMediaLink?: string
  socialMediaPlatform?: string
  inscriptionLink?: string
  status: string
  isActive: boolean
  order: number
}

export function EventsAdmin() {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [events, setEvents] = useState<Event[]>([])
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string | null; title: string }>({
    show: false,
    id: null,
    title: ""
  })

  const [formData, setFormData] = useState({
    titleFr: "",
    titleEn: "",
    date: "",
    type: "Atelier communautaire",
    locationFr: "",
    locationEn: "",
    descriptionFr: "",
    descriptionEn: "",
    imageUrl: "",
    socialMediaLink: "",
    socialMediaPlatform: "",
    inscriptionLink: "",
    order: 0
  })

  // Fetch events on mount
  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      // Admin view: fetch all events including archived ones
      const response = await fetch('/api/events?includeAll=true')
      const data = await response.json()

      if (data.success) {
        setEvents(data.data)
      } else {
        toast.error("Erreur lors du chargement des événements")
      }
    } catch (error) {
      console.error("Error fetching events:", error)
      toast.error("Erreur lors du chargement des événements")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const url = editingId ? `/api/events/${editingId}` : '/api/events'
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(editingId ? "Événement mis à jour" : "Événement créé")
        setShowForm(false)
        resetForm()
        fetchEvents()
      } else {
        toast.error(data.error || "Une erreur s'est produite")
      }
    } catch (error) {
      console.error("Error saving event:", error)
      toast.error("Erreur lors de l'enregistrement")
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (event: Event) => {
    setEditingId(event.id)
    setFormData({
      titleFr: event.titleFr,
      titleEn: event.titleEn,
      date: event.date,
      type: event.type,
      locationFr: event.locationFr,
      locationEn: event.locationEn,
      descriptionFr: event.descriptionFr,
      descriptionEn: event.descriptionEn,
      imageUrl: event.imageUrl,
      socialMediaLink: event.socialMediaLink || "",
      socialMediaPlatform: event.socialMediaPlatform || "",
      inscriptionLink: event.inscriptionLink || "",
      order: event.order
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string, title: string) => {
    setDeleteConfirm({ show: true, id, title })
  }

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return

    try {
      const response = await fetch(`/api/events/${deleteConfirm.id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Événement supprimé avec succès")
        fetchEvents()
        setDeleteConfirm({ show: false, id: null, title: "" })
      } else {
        toast.error(data.error || "Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Error deleting event:", error)
      toast.error("Erreur lors de la suppression")
    }
  }

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, id: null, title: "" })
  }

  const handleArchive = async (id: string, title: string) => {
    if (!confirm(`Voulez-vous retirer l'événement "${title}" de la liste publique ?`)) {
      return
    }

    try {
      const response = await fetch(`/api/events/${id}/archive`, {
        method: 'POST',
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Événement archivé avec succès")
        fetchEvents()
      } else {
        toast.error(data.error || "Erreur lors de l'archivage")
      }
    } catch (error) {
      console.error("Error archiving event:", error)
      toast.error("Erreur lors de l'archivage")
    }
  }

  const resetForm = () => {
    setFormData({
      titleFr: "",
      titleEn: "",
      date: "",
      type: "Atelier communautaire",
      locationFr: "",
      locationEn: "",
      descriptionFr: "",
      descriptionEn: "",
      imageUrl: "",
      socialMediaLink: "",
      socialMediaPlatform: "",
      inscriptionLink: "",
      order: 0
    })
    setEditingId(null)
  }

  if (loading) {
    return <AdminListSkeleton count={3} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestion des Événements</h2>
          <p className="text-muted-foreground">Créer et gérer les événements communautaires</p>
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
              Nouvel Événement
            </>
          )}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary p-6">
            <h3 className="text-xl font-bold text-white">
              {editingId ? "✏️ Modifier" : "✨ Créer"} un Événement
            </h3>
            <p className="text-white/80 text-sm mt-1">
              Remplissez tous les champs pour créer un événement complet
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
                  <label className="block text-sm font-medium mb-2">Titre (Français) *</label>
                  <Input
                    value={formData.titleFr}
                    onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
                    placeholder="Journée Prévention Santé"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Titre (Anglais) *</label>
                  <Input
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    placeholder="Health Prevention Day"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date *</label>
                  <Input
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="Samedi 14 décembre 2025"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Type d'événement *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={submitting}
                  >
                    <option value="Atelier communautaire">Atelier communautaire</option>
                    <option value="Évènement en ligne">Évènement en ligne</option>
                    <option value="Rencontre sociale">Rencontre sociale</option>
                    <option value="Webinaire">Webinaire</option>
                    <option value="Conférence">Conférence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Lieu (Français) *</label>
                  <Input
                    value={formData.locationFr}
                    onChange={(e) => setFormData({ ...formData, locationFr: e.target.value })}
                    placeholder="Centre Médical Dr Kamga – Douala"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Lieu (Anglais) *</label>
                  <Input
                    value={formData.locationEn}
                    onChange={(e) => setFormData({ ...formData, locationEn: e.target.value })}
                    placeholder="Dr Kamga Medical Center – Douala"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ordre d'affichage</label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                    disabled={submitting}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Plus le nombre est petit, plus l'événement sera affiché en premier
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description (Français) *</label>
                <textarea
                  value={formData.descriptionFr}
                  onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
                  placeholder="Description complète de l'événement en français..."
                  className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description (Anglais) *</label>
                <textarea
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  placeholder="Full event description in English..."
                  className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Media & Social */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 border-b border-gray-300 pb-3">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <h4 className="font-semibold text-lg">Média & Réseaux Sociaux</h4>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium flex items-center gap-2 mb-2">
                    <ImageIcon className="h-4 w-4" />
                    URL de l'image *
                  </label>
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    required
                    disabled={submitting}
                  />

                  {/* Image Preview */}
                  {formData.imageUrl && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Aperçu de l'image:</p>
                      <div className="relative aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            const parent = e.currentTarget.parentElement
                            if (parent) {
                              parent.innerHTML = '<div class="flex items-center justify-center h-full text-muted-foreground"><div class="text-center"><svg class="h-12 w-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><p class="text-xs">Image introuvable</p></div></div>'
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Lien d'inscription</label>
                    <Input
                      value={formData.inscriptionLink}
                      onChange={(e) => setFormData({ ...formData, inscriptionLink: e.target.value })}
                      placeholder="https://example.com/inscription"
                      disabled={submitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Lien réseau social</label>
                    <Input
                      value={formData.socialMediaLink}
                      onChange={(e) => setFormData({ ...formData, socialMediaLink: e.target.value })}
                      placeholder="https://facebook.com/event/123"
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Plateforme</label>
                    <select
                      value={formData.socialMediaPlatform}
                      onChange={(e) => setFormData({ ...formData, socialMediaPlatform: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={submitting}
                    >
                      <option value="">Sélectionner...</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Facebook Event">Facebook Event</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Twitter">Twitter</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="YouTube">YouTube</option>
                    </select>
                  </div>
                </div>
              </div>
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
          Événements existants ({events.length})
        </h3>

        {events.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <p className="text-muted-foreground">Aucun événement pour le moment</p>
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="mt-4"
            >
              Créer le premier événement
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={event.imageUrl}
                    alt={event.titleFr}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <Badge className="bg-white/90 text-sky-700 backdrop-blur-sm">
                      {event.type}
                    </Badge>
                    {(() => {
                      // Convert eventDate string to Date object if it exists
                      let eventDate: Date | null = null

                      if (event.eventDate) {
                        // eventDate comes as ISO string from API
                        eventDate = new Date(event.eventDate)
                      } else {
                        // Fallback: parse from text date
                        eventDate = parseFrenchDate(event.date)
                      }

                      const isOutdated = isEventOutdated(eventDate, event.status)

                      if (event.status === 'archived') {
                        return (
                          <Badge variant="secondary" className="bg-gray-500 text-white">
                            <Archive className="h-3 w-3 mr-1" />
                            Archivé
                          </Badge>
                        )
                      } else if (isOutdated) {
                        return (
                          <Badge variant="destructive" className="bg-orange-500 text-white">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Expiré
                          </Badge>
                        )
                      }
                      return null
                    })()}
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-slate-900/80 text-white">
                      Ordre: {event.order}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h4 className="font-bold text-lg line-clamp-2">{event.titleFr}</h4>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-sky-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-sky-600" />
                      <span className="line-clamp-1">{event.locationFr}</span>
                    </div>
                    {event.socialMediaLink && (
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-sky-600" />
                        <span className="line-clamp-1">{event.socialMediaPlatform}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {event.descriptionFr}
                  </p>

                  {/* Actions */}
                  <div className="space-y-2 pt-3 border-t">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(event)}
                        className="flex-1"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(event.id, event.titleFr)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Archive button - shown for active or outdated events */}
                    {event.status !== 'archived' && (() => {
                      // Convert eventDate string to Date object if it exists
                      let eventDate: Date | null = null

                      if (event.eventDate) {
                        // eventDate comes as ISO string from API
                        eventDate = new Date(event.eventDate)
                      } else {
                        // Fallback: parse from text date
                        eventDate = parseFrenchDate(event.date)
                      }

                      const isOutdated = isEventOutdated(eventDate, event.status)

                      if (isOutdated) {
                        return (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleArchive(event.id, event.titleFr)}
                            className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                          >
                            <Archive className="h-4 w-4 mr-2" />
                            Retirer de la liste publique
                          </Button>
                        )
                      }

                      return (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleArchive(event.id, event.titleFr)}
                          className="w-full"
                        >
                          <Archive className="h-4 w-4 mr-2" />
                          Archiver
                        </Button>
                      )
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Supprimer l'événement
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Êtes-vous sûr de vouloir supprimer l'événement{" "}
                <span className="font-semibold text-slate-900">
                  "{deleteConfirm.title}"
                </span>{" "}
                ? Cette action est irréversible.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={cancelDelete}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={confirmDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
