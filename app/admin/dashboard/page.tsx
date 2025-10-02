"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, BookOpen, Users, Calendar } from "lucide-react"
import Link from "next/link"
import { MasterclassAdmin } from "@/components/admin/masterclass-admin"
import { SeminairesAdmin } from "@/components/admin/seminaires-admin"

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"masterclass" | "seminaires">("masterclass")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
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
                <p className="text-sm font-medium text-foreground">Admin</p>
                <p className="text-xs text-muted-foreground">admin@cabinetdab.com</p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/login" className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("masterclass")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === "masterclass"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
              }`}
            >
              <Users className="h-5 w-5" />
              Masterclass
            </button>
            <button
              onClick={() => setActiveTab("seminaires")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                activeTab === "seminaires"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
              }`}
            >
              <Calendar className="h-5 w-5" />
              Séminaires
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "masterclass" && <MasterclassAdmin />}
        {activeTab === "seminaires" && <SeminairesAdmin />}
      </div>
    </div>
  )
}
