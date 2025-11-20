"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/locales/LanguageProvider"
import { WaitlistModal } from "./waitlist-modal"
import { getLocalizedField } from "@/lib/helpers/language"
import { Skeleton } from "@/components/ui/skeleton"

interface Masterclass {
  id: string
  icon: string
  titleFr: string
  titleEn: string
  descriptionFr: string
  descriptionEn: string
  features: { fr: string[]; en: string[] }
  ctaFr: string
  ctaEn: string
  backgroundColor: string
  type: string
  date: string
  time: string
  seats: string
  isActive: boolean
}

export function RegistrationSection() {
  const { t, language } = useLanguage()
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const [selectedMasterclass, setSelectedMasterclass] = useState<{
    title: string
    type: string
  } | null>(null)

  useEffect(() => {
    async function fetchMasterclasses() {
      try {
        setLoading(true)
        const response = await fetch('/api/masterclass')
        const result = await response.json()

        if (result.success) {
          setMasterclasses(result.data)
        } else {
          setError(result.error || 'Failed to load masterclasses')
        }
      } catch (err) {
        setError('Failed to load masterclasses')
        console.error('Error fetching masterclasses:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMasterclasses()
  }, [])

  const handleOpenModal = (title: string, type: string) => {
    setSelectedMasterclass({ title, type })
    setIsWaitlistModalOpen(true)
  }

  const onlineMasterclass = masterclasses.find(m => m.type === 'online')
  const inPersonMasterclass = masterclasses.find(m => m.type === 'inPerson')

  if (loading) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Skeleton className="h-6 w-20 mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Skeleton className="h-6 w-20 mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-destructive">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t.masterclass.registration.title}</h2>
          <p className="text-xl text-muted-foreground">{t.masterclass.registration.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{onlineMasterclass && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-primary text-primary-foreground">{t.masterclass.registration.online}</Badge>
                  <div className="text-sm text-muted-foreground">{t.masterclass.registration.limitedSeats}</div>
                </div>
                <CardTitle className="text-xl">
                  {getLocalizedField(onlineMasterclass, 'title', language)}
                </CardTitle>
                <CardDescription>
                  {getLocalizedField(onlineMasterclass, 'description', language)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t.masterclass.registration.fields.date}</span>
                    <span className="font-medium">{onlineMasterclass.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t.masterclass.registration.fields.time}</span>
                    <span className="font-medium">{onlineMasterclass.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t.masterclass.registration.fields.seatsLeft}</span>
                    <span className="font-medium text-primary">{onlineMasterclass.seats}</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleOpenModal(
                    getLocalizedField(onlineMasterclass, 'title', language) + ' - ' + getLocalizedField(onlineMasterclass, 'description', language),
                    t.masterclass.registration.online
                  )}
                >
                  {getLocalizedField(onlineMasterclass, 'cta', language)}
                </Button>
              </CardContent>
            </Card>
          )}

{inPersonMasterclass && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-secondary text-secondary-foreground">{t.masterclass.registration.inPerson}</Badge>
                  <div className="text-sm text-muted-foreground">{t.masterclass.registration.limitedSeats}</div>
                </div>
                <CardTitle className="text-xl">
                  {getLocalizedField(inPersonMasterclass, 'title', language)}
                </CardTitle>
                <CardDescription>
                  {getLocalizedField(inPersonMasterclass, 'description', language)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t.masterclass.registration.fields.date}</span>
                    <span className="font-medium">{inPersonMasterclass.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t.masterclass.registration.fields.time}</span>
                    <span className="font-medium">{inPersonMasterclass.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t.masterclass.registration.fields.seatsLeft}</span>
                    <span className="font-medium text-primary">{inPersonMasterclass.seats}</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleOpenModal(
                    getLocalizedField(inPersonMasterclass, 'title', language) + ' - ' + getLocalizedField(inPersonMasterclass, 'description', language),
                    t.masterclass.registration.inPerson
                  )}
                >
                  {getLocalizedField(inPersonMasterclass, 'cta', language)}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-8 p-6 bg-white rounded-xl border border-primary/10">
          <h3 className="text-lg font-semibold mb-4 text-center">{t.masterclass.registration.modalitiesTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">1</span>
              </div>
              <p className="font-medium">{t.masterclass.registration.step1.title}</p>
              <p className="text-muted-foreground">{t.masterclass.registration.step1.description}</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">2</span>
              </div>
              <p className="font-medium">{t.masterclass.registration.step2.title}</p>
              <p className="text-muted-foreground">{t.masterclass.registration.step2.description}</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">3</span>
              </div>
              <p className="font-medium">{t.masterclass.registration.step3.title}</p>
              <p className="text-muted-foreground">{t.masterclass.registration.step3.description}</p>
            </div>
          </div>
        </div>

        {selectedMasterclass && (
          <WaitlistModal
            open={isWaitlistModalOpen}
            onOpenChange={setIsWaitlistModalOpen}
            masterclassTitle={selectedMasterclass.title}
            masterclassType={selectedMasterclass.type}
          />
        )}
      </div>
    </section>
  )
}
