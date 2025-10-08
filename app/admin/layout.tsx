import { auth } from "@/auth"
import { AdminNav } from "@/components/admin/admin-nav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // Si pas de session, le middleware redirigera automatiquement vers /admin/login
  // Donc ici, on affiche soit la page de login (sans nav) soit les pages protégées (avec nav)

  // Afficher sans navigation pour la page de login
  if (!session) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    )
  }

  // Afficher avec navigation pour toutes les autres pages admin
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav session={session} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
