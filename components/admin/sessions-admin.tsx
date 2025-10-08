"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Calendar, MapPin, Users, Euro } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Session {
  id: string
  seminarTitle: string
  startDate: string
  endDate: string
  location: string
  maxParticipants: number
  currentParticipants: number
  price: number
  status: "SCHEDULED" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  isPublished: boolean
}

export function SessionsAdmin() {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Sample data - would come from database
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      seminarTitle: "Séminaire Intensif Export",
      startDate: "2025-03-15",
      endDate: "2025-03-16",
      location: "Paris, France",
      maxParticipants: 15,
      currentParticipants: 8,
      price: 1500,
      status: "SCHEDULED",
      isPublished: true
    },
    {
      id: "2",
      seminarTitle: "Formation Transformation Locale",
      startDate: "2025-04-10",
      endDate: "2025-04-11",
      location: "Lyon, France",
      maxParticipants: 12,
      currentParticipants: 3,
      price: 1200,
      status: "SCHEDULED",
      isPublished: false
    }
  ])

  const [formData, setFormData] = useState({
    seminarTitle: "",
    startDate: "",
    endDate: "",
    location: "",
    maxParticipants: "",
    price: "",
    status: "SCHEDULED" as Session["status"],
    isPublished: false
  })

  const getStatusBadge = (status: Session["status"]) => {
    const variants: Record<Session["status"], { label: string; className: string }> = {
      SCHEDULED: { label: "Planifiée", className: "bg-blue-100 text-blue-800" },
      CONFIRMED: { label: "Confirmée", className: "bg-green-100 text-green-800" },
      IN_PROGRESS: { label: "En cours", className: "bg-purple-100 text-purple-800" },
      COMPLETED: { label: "Terminée", className: "bg-gray-100 text-gray-800" },
      CANCELLED: { label: "Annulée", className: "bg-red-100 text-red-800" }
    }
    return variants[status]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving session:", formData)
    setShowForm(false)
    resetForm()
  }

  const handleEdit = (session: Session) => {
    setEditingId(session.id)
    setFormData({
      seminarTitle: session.seminarTitle,
      startDate: session.startDate,
      endDate: session.endDate,
      location: session.location,
      maxParticipants: session.maxParticipants.toString(),
      price: session.price.toString(),
      status: session.status,
      isPublished: session.isPublished
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette session ?")) {
      setSessions(sessions.filter(s => s.id !== id))
      console.log("Deleting session:", id)
    }
  }

  const resetForm = () => {
    setFormData({
      seminarTitle: "",
      startDate: "",
      endDate: "",
      location: "",
      maxParticipants: "",
      price: "",
      status: "SCHEDULED",
      isPublished: false
    })
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestion des Sessions</h2>
          <p className="text-muted-foreground">Programmer et gérer les sessions de séminaires</p>
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
              Nouvelle Session
            </>
          )}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-6">
            {editingId ? "Modifier" : "Créer"} une Session
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seminar Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Séminaire
              </label>
              <Input
                value={formData.seminarTitle}
                onChange={(e) => setFormData({ ...formData, seminarTitle: e.target.value })}
                placeholder="Nom du séminaire"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date de début
                </label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date de fin
                </label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Localisation
              </label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Paris, France"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Max Participants */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre max de participants
                </label>
                <Input
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                  placeholder="15"
                  min="1"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Prix (EUR)
                </label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="1500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Statut
                </label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as Session["status"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SCHEDULED">Planifiée</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmée</SelectItem>
                    <SelectItem value="IN_PROGRESS">En cours</SelectItem>
                    <SelectItem value="COMPLETED">Terminée</SelectItem>
                    <SelectItem value="CANCELLED">Annulée</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Published */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Publication
                </label>
                <div className="flex items-center space-x-2 h-10">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="isPublished" className="text-sm">
                    Session publiée (visible sur le site)
                  </label>
                </div>
              </div>
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
          Sessions programmées ({sessions.length})
        </h3>

        {sessions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <p className="text-muted-foreground">Aucune session programmée</p>
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="mt-4"
            >
              Programmer la première session
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {sessions.map((session) => {
              const statusInfo = getStatusBadge(session.status)
              const isFull = session.currentParticipants >= session.maxParticipants

              return (
                <div
                  key={session.id}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-lg">{session.seminarTitle}</h4>
                        <Badge className={statusInfo.className}>
                          {statusInfo.label}
                        </Badge>
                        {!session.isPublished && (
                          <Badge variant="outline" className="text-xs">
                            Brouillon
                          </Badge>
                        )}
                        {isFull && (
                          <Badge variant="destructive" className="text-xs">
                            Complet
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(session)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(session.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Dates */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Dates</p>
                        <p>{new Date(session.startDate).toLocaleDateString('fr-FR')}</p>
                        <p>{new Date(session.endDate).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Lieu</p>
                        <p>{session.location}</p>
                      </div>
                    </div>

                    {/* Participants */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Participants</p>
                        <p>
                          {session.currentParticipants} / {session.maxParticipants}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Euro className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Prix</p>
                        <p>{session.price.toLocaleString('fr-FR')} €</p>
                      </div>
                    </div>
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
