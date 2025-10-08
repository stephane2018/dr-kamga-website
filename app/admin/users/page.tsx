import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { UsersAdmin } from "@/components/admin/users-admin"

export default async function UsersPage() {
  const session = await auth()

  // Vérifier que l'utilisateur est un SUPER_ADMIN
  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/admin")
  }

  return <UsersAdmin />
}
