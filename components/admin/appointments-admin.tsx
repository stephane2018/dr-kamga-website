"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MessageSquare, Phone, Mail, Calendar, User, AlertCircle, CheckCircle, Clock, X } from "lucide-react"
import { AdminSkeleton } from "./admin-skeleton"

interface Appointment {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  interest: string
  situation: string | null
  message: string
  language: string
  status: string
  notes: string | null
  createdAt: string
  updatedAt: string
}

export function AppointmentsAdmin() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [notes, setNotes] = useState("")
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/admin/appointments")
      const data = await response.json()
      if (data.success) {
        setAppointments(data.appointments)
      }
    } catch (error) {
      console.error("Error fetching appointments:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setNotes(appointment.notes || "")
    setStatus(appointment.status)
    setIsDetailsOpen(true)
  }

  const handleUpdateAppointment = async () => {
    if (!selectedAppointment) return

    setIsSaving(true)
    try {
      const response = await fetch(`/api/admin/appointments/${selectedAppointment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes, status }),
      })

      const data = await response.json()
      if (data.success) {
        await fetchAppointments()
        setIsDetailsOpen(false)
      }
    } catch (error) {
      console.error("Error updating appointment:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            En attente
          </Badge>
        )
      case "contacted":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Phone className="h-3 w-3 mr-1" />
            Contacté
          </Badge>
        )
      case "closed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Clôturé
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getInterestLabel = (interest: string) => {
    const labels: Record<string, string> = {
      masterclass: "Masterclass",
      seminaires: "Séminaires",
      coaching: "Coaching",
      programme: "Programme Signature",
      information: "Information",
    }
    return labels[interest] || interest
  }

  const filteredAppointments = appointments.filter((appointment) => {
    if (filterStatus === "all") return true
    return appointment.status === filterStatus
  })

  if (isLoading) {
    return <AdminSkeleton />
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Rendez-vous Clients</CardTitle>
              <CardDescription>
                Gérez les demandes de contact et suivez leur statut
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="contacted">Contacté</SelectItem>
                  <SelectItem value="closed">Clôturé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucun rendez-vous trouvé</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Intérêt</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div className="font-medium">
                          {appointment.firstName} {appointment.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.language === "fr" ? "🇫🇷 Français" : "🇬🇧 English"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 text-sm">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="truncate max-w-[200px]">{appointment.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span>{appointment.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {getInterestLabel(appointment.interest)}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(appointment.createdAt).toLocaleDateString("fr-FR")}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(appointment)}
                        >
                          Voir détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Détails du rendez-vous
            </DialogTitle>
            <DialogDescription>
              Mis à jour le {selectedAppointment && new Date(selectedAppointment.updatedAt).toLocaleDateString("fr-FR")}
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-6">
              {/* Client Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nom complet</label>
                  <p className="text-base font-medium">
                    {selectedAppointment.firstName} {selectedAppointment.lastName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-base">{selectedAppointment.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Téléphone</label>
                  <p className="text-base">{selectedAppointment.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Intérêt</label>
                  <p className="text-base">{getInterestLabel(selectedAppointment.interest)}</p>
                </div>
              </div>

              {/* Situation */}
              {selectedAppointment.situation && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Situation actuelle</label>
                  <p className="text-base mt-1 p-3 bg-muted rounded-md">
                    {selectedAppointment.situation}
                  </p>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <p className="text-base mt-1 p-3 bg-muted rounded-md whitespace-pre-wrap">
                  {selectedAppointment.message}
                </p>
              </div>

              {/* Status */}
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">Statut</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="contacted">Contacté</SelectItem>
                    <SelectItem value="closed">Clôturé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">Notes internes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ajoutez des notes sur ce rendez-vous..."
                  rows={4}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)} disabled={isSaving}>
              Annuler
            </Button>
            <Button onClick={handleUpdateAppointment} disabled={isSaving}>
              {isSaving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
