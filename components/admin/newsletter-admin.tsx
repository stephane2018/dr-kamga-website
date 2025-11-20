"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Mail, Download, Users, Calendar } from "lucide-react"
import { AdminSkeleton } from "./admin-skeleton"

interface NewsletterSubscription {
  id: string
  email: string
  language: string
  subscribedAt: string
  isActive: boolean
}

export function NewsletterAdmin() {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("/api/admin/newsletter")
      const data = await response.json()
      if (data.success) {
        setSubscriptions(data.subscriptions)
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportExcel = async () => {
    setIsExporting(true)
    try {
      const response = await fetch("/api/admin/newsletter/export")
      const blob = await response.blob()

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `newsletter-subscriptions-${new Date().toISOString().split("T")[0]}.xlsx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error exporting subscriptions:", error)
      alert("Erreur lors de l'export")
    } finally {
      setIsExporting(false)
    }
  }

  const activeSubscriptions = subscriptions.filter((sub) => sub.isActive)
  const frenchSubscriptions = activeSubscriptions.filter((sub) => sub.language === "fr")
  const englishSubscriptions = activeSubscriptions.filter((sub) => sub.language === "en")

  if (isLoading) {
    return <AdminSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Abonnés</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscriptions.length}</div>
            <p className="text-xs text-muted-foreground">
              Abonnés actifs à la newsletter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Français</CardTitle>
            <span className="text-2xl">🇫🇷</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{frenchSubscriptions.length}</div>
            <p className="text-xs text-muted-foreground">
              {((frenchSubscriptions.length / activeSubscriptions.length) * 100 || 0).toFixed(0)}% des abonnés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">English</CardTitle>
            <span className="text-2xl">🇬🇧</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{englishSubscriptions.length}</div>
            <p className="text-xs text-muted-foreground">
              {((englishSubscriptions.length / activeSubscriptions.length) * 100 || 0).toFixed(0)}% des abonnés
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Abonnés Newsletter</CardTitle>
              <CardDescription>
                Liste complète des abonnés à votre newsletter
              </CardDescription>
            </div>
            <Button onClick={handleExportExcel} disabled={isExporting}>
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? "Export en cours..." : "Exporter Excel"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {subscriptions.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucun abonné pour le moment</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Langue</TableHead>
                    <TableHead>Date d'inscription</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{subscription.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {subscription.language === "fr" ? "🇫🇷 Français" : "🇬🇧 English"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(subscription.subscribedAt).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        {subscription.isActive ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Actif
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Inactif</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
