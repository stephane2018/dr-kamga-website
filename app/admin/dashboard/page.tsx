"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut, BookOpen, Users, Calendar, Mail, MessageSquare, Loader2, Shield, User, UserCog, Home, Layers, PartyPopper } from "lucide-react"
import { MasterclassAdmin } from "@/components/admin/masterclass-admin"
import { SeminairesAdmin } from "@/components/admin/seminaires-admin"
import { AppointmentsAdmin } from "@/components/admin/appointments-admin"
import { NewsletterAdmin } from "@/components/admin/newsletter-admin"
import { UsersAdmin } from "@/components/admin/users-admin"
import { AxisCardsAdmin } from "@/components/admin/axis-cards-admin"
import { EventsAdmin } from "@/components/admin/events-admin"

type TabType = "masterclass" | "seminaires" | "appointments" | "newsletter" | "users" | "axis-cards" | "events"

export default function AdminDashboardPage() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>("masterclass")
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    const tabParam = searchParams.get("tab") as TabType | null
    if (tabParam && ["masterclass", "seminaires", "appointments", "newsletter", "users", "axis-cards", "events"].includes(tabParam)) {
      if ((tabParam === "users" || tabParam === "axis-cards") && session?.user?.role !== "admin") {
        return
      }
      setActiveTab(tabParam)
    } else {
      setActiveTab("masterclass");
    }
  }, [searchParams, session])

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    router.push(`/admin/dashboard?tab=${tab}`, { scroll: false })
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await signOut()
    } catch (error) {
      console.error("Error logging out:", error)
      setIsLoggingOut(false)
    }
  }

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Cabinet DAB Admin</h1>
                <p className="text-xs text-muted-foreground">Gestion des formations</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">
                    {session?.user?.name || "Admin"}
                  </p>
                  {session?.user?.role && (
                    <Badge
                      variant={session.user.role === "admin" ? "default" : "secondary"}
                      className="text-xs flex items-center gap-1"
                    >
                      {session.user.role === "admin" ? (
                        <>
                          <Shield className="h-3 w-3" />
                          Admin
                        </>
                      ) : (
                        <>
                          <User className="h-3 w-3" />
                          Manager
                        </>
                      )}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {session?.user?.email || "admin@cabinetdab.com"}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = "/"}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                <span>Accueil</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Déconnexion...</span>
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4" />
                    <span>Déconnexion</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => handleTabChange("masterclass")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === "masterclass"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
            >
              <Users className="h-5 w-5" />
              Masterclass
            </button>
            <button
              onClick={() => handleTabChange("seminaires")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === "seminaires"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
            >
              <Calendar className="h-5 w-5" />
              Séminaires
            </button>
            <button
              onClick={() => handleTabChange("appointments")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === "appointments"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
            >
              <MessageSquare className="h-5 w-5" />
              Rendez-vous
            </button>
            <button
              onClick={() => handleTabChange("newsletter")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === "newsletter"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
            >
              <Mail className="h-5 w-5" />
              Newsletter
            </button>
            <button
              onClick={() => handleTabChange("events")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === "events"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
            >
              <PartyPopper className="h-5 w-5" />
              Événements
            </button>
            {session?.user?.role === "admin" && (
              <button
                onClick={() => handleTabChange("axis-cards")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === "axis-cards"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
              >
                <Layers className="h-5 w-5" />
                Cartes Axes
              </button>
            )}
            {session?.user?.role === "admin" && (
              <button
                onClick={() => handleTabChange("users")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === "users"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
              >
                <UserCog className="h-5 w-5" />
                Utilisateurs
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "masterclass" && <MasterclassAdmin />}
        {activeTab === "seminaires" && <SeminairesAdmin />}
        {activeTab === "appointments" && <AppointmentsAdmin />}
        {activeTab === "newsletter" && <NewsletterAdmin />}
        {activeTab === "events" && <EventsAdmin />}
        {activeTab === "axis-cards" && <AxisCardsAdmin />}
        {activeTab === "users" && session?.user?.role === "admin" && <UsersAdmin />}
      </div>
    </div>
  )
}
