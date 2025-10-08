"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Video, Eye, EyeOff } from "lucide-react"

interface MasterclassVideo {
  id: string
  title: string
  description: string
  videoUrl: string
  thumbnailUrl: string
  duration: string
  category: string
  showOnHome: boolean
  displayOrder: number
  masterclassTitle: string
}

export function MasterclassVideosAdmin() {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Sample data - would come from database
  const [videos, setVideos] = useState<MasterclassVideo[]>([
    {
      id: "1",
      title: "Les 3 règles pour produire selon les normes internationales",
      description: "Découvrez les standards essentiels pour préparer vos produits à l'exportation.",
      videoUrl: "https://youtube.com/watch?v=xxx",
      thumbnailUrl: "",
      duration: "8 min",
      category: "Capsule",
      showOnHome: true,
      displayOrder: 1,
      masterclassTitle: "Transformation Locale"
    },
    {
      id: "2",
      title: "Comment transformer son produit et allonger sa durée de vie",
      description: "Techniques de transformation pour maximiser la valeur ajoutée de vos produits.",
      videoUrl: "https://youtube.com/watch?v=yyy",
      thumbnailUrl: "",
      duration: "45 min",
      category: "Cours Long",
      showOnHome: true,
      displayOrder: 2,
      masterclassTitle: "Transformation Locale"
    }
  ])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    duration: "",
    category: "Capsule",
    showOnHome: false,
    displayOrder: "0",
    masterclassTitle: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving video:", formData)
    setShowForm(false)
    resetForm()
  }

  const handleEdit = (video: MasterclassVideo) => {
    setEditingId(video.id)
    setFormData({
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl,
      duration: video.duration,
      category: video.category,
      showOnHome: video.showOnHome,
      displayOrder: video.displayOrder.toString(),
      masterclassTitle: video.masterclassTitle
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette vidéo ?")) {
      setVideos(videos.filter(v => v.id !== id))
      console.log("Deleting video:", id)
    }
  }

  const toggleShowOnHome = (id: string) => {
    setVideos(videos.map(v =>
      v.id === id ? { ...v, showOnHome: !v.showOnHome } : v
    ))
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      duration: "",
      category: "Capsule",
      showOnHome: false,
      displayOrder: "0",
      masterclassTitle: ""
    })
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Vidéos Complémentaires</h2>
          <p className="text-muted-foreground">Gérer les vidéos affichées sur la page masterclass</p>
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
              Nouvelle Vidéo
            </>
          )}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-6">
            {editingId ? "Modifier" : "Créer"} une Vidéo
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Titre de la vidéo *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Les 3 règles pour produire..."
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
                placeholder="Découvrez les standards essentiels..."
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Video URL */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  URL de la vidéo (YouTube) *
                </label>
                <Input
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=xxx"
                  required
                />
              </div>

              {/* Thumbnail URL */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  URL de la miniature (optionnel)
                </label>
                <Input
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Duration */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Durée
                </label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="8 min"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Catégorie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Capsule">Capsule</option>
                  <option value="Cours Long">Cours Long</option>
                </select>
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ordre d'affichage
                </label>
                <Input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                  placeholder="1"
                  min="0"
                />
              </div>
            </div>

            {/* Masterclass Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Masterclass associée *
              </label>
              <Input
                value={formData.masterclassTitle}
                onChange={(e) => setFormData({ ...formData, masterclassTitle: e.target.value })}
                placeholder="Transformation Locale"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Sera remplacé par un select de masterclasses
              </p>
            </div>

            {/* Show on Home */}
            <div className="flex items-center space-x-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <input
                type="checkbox"
                id="showOnHome"
                checked={formData.showOnHome}
                onChange={(e) => setFormData({ ...formData, showOnHome: e.target.checked })}
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <div>
                <label htmlFor="showOnHome" className="text-sm font-medium cursor-pointer">
                  Afficher sur la page masterclass
                </label>
                <p className="text-xs text-muted-foreground">
                  Cette vidéo sera visible dans la section "Vidéos Complémentaires"
                </p>
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
          Vidéos existantes ({videos.length})
        </h3>

        {videos.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">Aucune vidéo pour le moment</p>
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
            >
              Créer la première vidéo
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Video className="h-5 w-5 text-primary" />
                      <h4 className="font-bold text-lg">{video.title}</h4>
                      <Badge
                        variant={video.category === "Cours Long" ? "outline" : "secondary"}
                        className={video.category === "Capsule" ? "bg-[#5C3317] text-white" : ""}
                      >
                        {video.category}
                      </Badge>
                      {video.showOnHome && (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <Eye className="h-3 w-3 mr-1" />
                          Visible
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {video.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Masterclass</p>
                        <p className="font-medium">{video.masterclassTitle}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Durée</p>
                        <p className="font-medium">{video.duration}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Ordre</p>
                        <p className="font-medium">#{video.displayOrder}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">URL</p>
                        <a
                          href={video.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline text-xs truncate block"
                        >
                          {video.videoUrl}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleShowOnHome(video.id)}
                      title={video.showOnHome ? "Masquer" : "Afficher"}
                    >
                      {video.showOnHome ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(video)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(video.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
