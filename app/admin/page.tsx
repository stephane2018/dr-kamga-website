import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Calendar, Users, Video } from "lucide-react"

export default async function AdminPage() {
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Bienvenue, {session?.user?.username}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Masterclasses</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Modules actifs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Séminaires</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Séminaires actifs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Sessions programmées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vidéos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Vidéos complémentaires</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>Accédez rapidement aux fonctionnalités principales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/masterclasses"
              className="block p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Gérer les Masterclasses</p>
                  <p className="text-sm text-muted-foreground">Créer et modifier les masterclasses</p>
                </div>
              </div>
            </a>
            <a
              href="/admin/seminaires"
              className="block p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Gérer les Séminaires</p>
                  <p className="text-sm text-muted-foreground">Créer et modifier les séminaires</p>
                </div>
              </div>
            </a>
            <a
              href="/admin/sessions"
              className="block p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Programmer des Sessions</p>
                  <p className="text-sm text-muted-foreground">Planifier les sessions de séminaires</p>
                </div>
              </div>
            </a>
            {session?.user?.role === "SUPER_ADMIN" && (
              <a
                href="/admin/users"
                className="block p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Gérer les Administrateurs</p>
                    <p className="text-sm text-muted-foreground">Créer et gérer les sous-admins</p>
                  </div>
                </div>
              </a>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations système</CardTitle>
            <CardDescription>Votre compte et vos permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-700">Nom d'utilisateur</p>
              <p className="text-lg">{session?.user?.username}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Rôle</p>
              <p className="text-lg">
                {session?.user?.role === "SUPER_ADMIN" ? "Super Administrateur" : "Administrateur"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Permissions</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                <li>✓ Gestion des masterclasses</li>
                <li>✓ Gestion des séminaires</li>
                <li>✓ Programmation des sessions</li>
                {session?.user?.role === "SUPER_ADMIN" && (
                  <li>✓ Gestion des administrateurs</li>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
