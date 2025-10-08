"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Shield, User, Mail, Key } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Admin {
  id: string
  username: string
  email: string | null
  role: "SUPER_ADMIN" | "SUB_ADMIN"
  isActive: boolean
  createdAt: string
  lastLoginAt: string | null
}

export function UsersAdmin() {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Sample data - would come from database
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: "1",
      username: "admin",
      email: "admin@cabinetdab.com",
      role: "SUPER_ADMIN",
      isActive: true,
      createdAt: "2025-01-01",
      lastLoginAt: "2025-01-07"
    },
    {
      id: "2",
      username: "marie_dupont",
      email: "marie@cabinetdab.com",
      role: "SUB_ADMIN",
      isActive: true,
      createdAt: "2025-01-05",
      lastLoginAt: "2025-01-06"
    }
  ])

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "SUB_ADMIN" as Admin["role"],
    isActive: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving admin:", formData)
    setShowForm(false)
    resetForm()
  }

  const handleEdit = (admin: Admin) => {
    setEditingId(admin.id)
    setFormData({
      username: admin.username,
      email: admin.email || "",
      password: "",
      role: admin.role,
      isActive: admin.isActive
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet administrateur ?")) {
      setAdmins(admins.filter(a => a.id !== id))
      console.log("Deleting admin:", id)
    }
  }

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "SUB_ADMIN",
      isActive: true
    })
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestion des Administrateurs</h2>
          <p className="text-muted-foreground">Créer et gérer les comptes administrateurs</p>
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
              Nouvel Administrateur
            </>
          )}
        </Button>
      </div>

      {/* Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium mb-1">Accès réservé aux Super Administrateurs</p>
            <p>Seuls les SUPER_ADMIN peuvent créer et gérer d'autres comptes administrateurs.</p>
          </div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-6">
            {editingId ? "Modifier" : "Créer"} un Administrateur
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nom d'utilisateur *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="john_doe"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email (optionnel)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Mot de passe {editingId ? "(laisser vide pour ne pas modifier)" : "*"}
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Minimum 8 caractères"
                  className="pl-10"
                  required={!editingId}
                  minLength={8}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Le mot de passe doit contenir au moins 8 caractères
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Role */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Rôle
                </label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value as Admin["role"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SUB_ADMIN">Administrateur</SelectItem>
                    <SelectItem value="SUPER_ADMIN">Super Administrateur</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.role === "SUPER_ADMIN"
                    ? "Accès complet + gestion des admins"
                    : "Accès limité aux contenus"}
                </p>
              </div>

              {/* Active */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Statut
                </label>
                <div className="flex items-center space-x-2 h-10">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="isActive" className="text-sm">
                    Compte actif
                  </label>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Les comptes inactifs ne peuvent pas se connecter
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
          Administrateurs ({admins.length})
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      {admin.role === "SUPER_ADMIN" ? (
                        <Shield className="h-6 w-6 text-primary" />
                      ) : (
                        <User className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{admin.username}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={admin.role === "SUPER_ADMIN" ? "default" : "secondary"}>
                          {admin.role === "SUPER_ADMIN" ? "Super Admin" : "Administrateur"}
                        </Badge>
                        <Badge variant={admin.isActive ? "default" : "secondary"} className={admin.isActive ? "bg-green-100 text-green-800" : ""}>
                          {admin.isActive ? "Actif" : "Inactif"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{admin.email || "Non défini"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Créé le</p>
                      <p className="font-medium">
                        {new Date(admin.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Dernière connexion</p>
                      <p className="font-medium">
                        {admin.lastLoginAt
                          ? new Date(admin.lastLoginAt).toLocaleDateString('fr-FR')
                          : "Jamais"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(admin)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(admin.id)}
                    disabled={admin.role === "SUPER_ADMIN"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
