"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Save, X, Shield, User, Lock, Unlock, Mail, KeyRound } from "lucide-react"
import { AdminListSkeleton } from "./admin-skeleton"
import { ResetPasswordDialog } from "./reset-password-dialog"
import { toast } from "sonner"
import { signOut, useSession } from "next-auth/react"

interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  isActive: boolean
  createdBy: string | null
  createdAt: string
  updatedAt: string
}

export function UsersAdmin() {
  const { data: session } = useSession()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [users, setUsers] = useState<AdminUser[]>([])
  const [resetPasswordDialog, setResetPasswordDialog] = useState<{
    open: boolean
    userId: string
    userEmail: string
    userName: string
    isCurrentAdmin: boolean
  }>({ open: false, userId: "", userEmail: "", userName: "", isCurrentAdmin: false })

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    role: "manager",
    isActive: true
  })

  // Fetch users on mount
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/users')
      const data = await response.json()

      if (data.success) {
        setUsers(data.data || [])
      } else {
        toast.error("Erreur lors du chargement des utilisateurs")
        setUsers([])
      }
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Erreur lors du chargement des utilisateurs")
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const willForceReauth =
        !!editingId &&
        formData.role === "admin" &&
        !!formData.password &&
        !!session?.user?.email &&
        formData.email === session.user.email

      const url = editingId ? `/api/admin/users/${editingId}` : '/api/admin/users'
      const method = editingId ? 'PUT' : 'POST'

      const body: any = {
        email: formData.email,
        name: formData.name,
        role: formData.role,
        isActive: formData.isActive
      }

      // Only include password for new users or if it's being changed
      if (!editingId || formData.password) {
        body.password = formData.password
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (data.success) {
        if (willForceReauth) {
          toast.success("Mot de passe modifié. Veuillez vous reconnecter.")
          await signOut({
            callbackUrl: "/admin/login",
            redirect: true,
          })
          return
        }

        toast.success(editingId ? "Utilisateur mis à jour" : "Utilisateur créé")
        setShowForm(false)
        resetForm()
        fetchUsers()
      } else {
        toast.error(data.error || "Une erreur s'est produite")
      }
    } catch (error) {
      console.error("Error saving user:", error)
      toast.error("Erreur lors de l'enregistrement")
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (user: AdminUser) => {
    setEditingId(user.id)
    setFormData({
      email: user.email,
      name: user.name,
      password: "", // Don't pre-fill password for security
      role: user.role,
      isActive: user.isActive
    })
    setShowForm(true)
  }

  const handleToggleActive = async (userId: string, currentStatus: boolean) => {
    const user = users.find(u => u.id === userId)
    
    if (user?.role === "admin" && currentStatus) {
      const activeAdmins = users.filter(u => u.role === "admin" && u.isActive)
      
      if (activeAdmins.length <= 1) {
        toast.error(
          "Impossible de bloquer le dernier administrateur actif. Créez d'abord un nouvel administrateur.",
          { duration: 5000 }
        )
        return
      }
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(currentStatus ? "Utilisateur bloqué" : "Utilisateur débloqué")
        fetchUsers()
      } else {
        toast.error(data.error || "Erreur lors de la modification")
      }
    } catch (error) {
      console.error("Error toggling user status:", error)
      toast.error("Erreur lors de la modification")
    }
  }

  const handleDelete = async (id: string) => {
    const user = users.find(u => u.id === id)
    
    if (user?.role === "admin") {
      toast.error(
        "Les comptes administrateurs ne peuvent pas être supprimés pour des raisons de sécurité. Vous pouvez uniquement les bloquer.",
        { duration: 5000 }
      )
      return
    }

    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Utilisateur supprimé")
        fetchUsers()
      } else {
        toast.error(data.error || "Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("Erreur lors de la suppression")
    }
  }

  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      password: "",
      role: "manager",
      isActive: true
    })
    setEditingId(null)
  }

  const handleResetPassword = (user: AdminUser) => {
    const isCurrentAdmin = session?.user?.email === user.email
    setResetPasswordDialog({
      open: true,
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      isCurrentAdmin,
    })
  }

  const handleResetPasswordSuccess = async () => {
    const isCurrentAdmin = resetPasswordDialog.isCurrentAdmin
    
    if (isCurrentAdmin) {
      toast.success("Mot de passe modifié. Vous allez être déconnecté...")
      setTimeout(async () => {
        await signOut({
          callbackUrl: "/admin/login",
          redirect: true,
        })
      }, 1500)
    } else {
      fetchUsers()
    }
  }

  if (loading) {
    return <AdminListSkeleton type="users" count={3} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestion des Utilisateurs</h2>
          <p className="text-muted-foreground">Créer et gérer les comptes administrateurs et managers</p>
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
              Nouvel Utilisateur
            </>
          )}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary p-6">
            <h3 className="text-xl font-bold text-white">
              {editingId ? "✏️ Modifier" : "✨ Créer"} un Utilisateur
            </h3>
            <p className="text-white/80 text-sm mt-1">
              {editingId
                ? "Modifiez les informations de l'utilisateur"
                : "Créez un nouveau compte administrateur ou manager"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Basic Info */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 border-b border-gray-300 pb-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <h4 className="font-semibold text-lg">Informations de base</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="manager@example.com"
                    required
                    disabled={submitting || !!editingId}
                  />
                  {editingId && (
                    <p className="text-xs text-muted-foreground mt-1">
                      L'email ne peut pas être modifié
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Nom complet
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jean Dupont"
                    required
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Shield className="inline h-4 w-4 mr-1" />
                    Rôle
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={submitting}
                  >
                    <option value="manager">Manager</option>
                    <option value="admin">Administrateur</option>
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Les admins ont tous les droits, les managers ont un accès limité
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Lock className="inline h-4 w-4 mr-1" />
                    Mot de passe {editingId && "(laisser vide pour ne pas changer)"}
                  </label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={editingId ? "Nouveau mot de passe (optionnel)" : "Mot de passe sécurisé"}
                    required={!editingId}
                    disabled={submitting}
                    minLength={8}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum 8 caractères
                  </p>
                </div>
              </div>
            </div>

            {/* Status Toggle */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="text-sm font-semibold text-blue-900 flex items-center gap-2">
                    {formData.isActive ? (
                      <Unlock className="h-4 w-4" />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                    Compte actif
                  </label>
                  <p className="text-xs text-blue-700 mt-1">
                    Les comptes inactifs ne peuvent pas se connecter
                  </p>
                </div>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  disabled={submitting}
                />
              </div>
            </div>

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
          Utilisateurs existants ({users?.length || 0})
        </h3>

        {!users || users.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <p className="text-muted-foreground">Aucun utilisateur pour le moment</p>
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="mt-4"
            >
              Créer le premier utilisateur
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-lg">{user.name}</h4>
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                        {user.role === "admin" ? (
                          <>
                            <Shield className="h-3 w-3 mr-1" />
                            Admin
                          </>
                        ) : (
                          <>
                            <User className="h-3 w-3 mr-1" />
                            Manager
                          </>
                        )}
                      </Badge>
                      {user.isActive ? (
                        <Badge variant="default" className="bg-green-600">
                          <Unlock className="h-3 w-3 mr-1" />
                          Actif
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <Lock className="h-3 w-3 mr-1" />
                          Bloqué
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>
                        <Mail className="inline h-3 w-3 mr-1" />
                        {user.email}
                      </p>
                      <p className="text-xs">
                        Créé le {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(user)}
                      title="Modifier"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => handleResetPassword(user)}
                      title="Réinitialiser le mot de passe"
                    >
                      <KeyRound className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={user.isActive ? "text-orange-600 hover:text-orange-700 hover:bg-orange-50" : "text-green-600 hover:text-green-700 hover:bg-green-50"}
                      onClick={() => handleToggleActive(user.id, user.isActive)}
                      title={user.isActive ? "Bloquer" : "Débloquer"}
                    >
                      {user.isActive ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                    </Button>
                    {user.role !== "admin" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(user.id)}
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reset Password Dialog */}
      <ResetPasswordDialog
        open={resetPasswordDialog.open}
        onOpenChange={(open) => setResetPasswordDialog({ ...resetPasswordDialog, open })}
        userId={resetPasswordDialog.userId}
        userEmail={resetPasswordDialog.userEmail}
        userName={resetPasswordDialog.userName}
        isCurrentAdmin={resetPasswordDialog.isCurrentAdmin}
        onSuccess={handleResetPasswordSuccess}
      />
    </div>
  )
}
