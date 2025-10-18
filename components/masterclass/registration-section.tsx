"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useLanguage } from "@/locales/LanguageProvider"

export function RegistrationSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t.masterclass.registration.title}</h2>
          <p className="text-xl text-muted-foreground">{t.masterclass.registration.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-primary text-primary-foreground">{t.masterclass.registration.online}</Badge>
                <div className="text-sm text-muted-foreground">{t.masterclass.registration.limitedSeats}</div>
              </div>
              <CardTitle className="text-xl">{t.masterclass.registration.card1.title}</CardTitle>
              <CardDescription>{t.masterclass.registration.card1.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t.masterclass.registration.fields.date}</span>
                  <span className="font-medium">{t.masterclass.registration.card1.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t.masterclass.registration.fields.time}</span>
                  <span className="font-medium">{t.masterclass.registration.card1.time}</span>
                </div>
                {/* <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Prix:</span>
                  <span className="font-medium text-lg">197€</span>
                </div> */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t.masterclass.registration.fields.seatsLeft}</span>
                  <span className="font-medium text-primary">{t.masterclass.registration.card1.seats}</span>
                </div>
              </div>
              <Button className="w-full" asChild disabled={true}>
                <Link 
                // href="/contact?masterclass=production"
                href="#"
                >{t.masterclass.registration.registerButton}</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-secondary text-secondary-foreground">{t.masterclass.registration.inPerson}</Badge>
                <div className="text-sm text-muted-foreground">{t.masterclass.registration.card2.location}</div>
              </div>
              <CardTitle className="text-xl">{t.masterclass.registration.card2.title}</CardTitle>
              <CardDescription>{t.masterclass.registration.card2.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t.masterclass.registration.fields.date}</span>
                  <span className="font-medium">{t.masterclass.registration.card2.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t.masterclass.registration.fields.time}</span>
                  <span className="font-medium">{t.masterclass.registration.card2.time}</span>
                </div>
                {/* <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Prix:</span>
                  <span className="font-medium text-lg">297€</span>
                </div> */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t.masterclass.registration.fields.seatsLeft}</span>
                  <span className="font-medium text-primary">{t.masterclass.registration.card2.seats}</span>
                </div>
              </div>
              <Button className="w-full" asChild disabled={true}>
                <Link
                //  href="/contact?masterclass=transformation"
                  href="#">{t.masterclass.registration.registerButton}</Link>
              </Button>
            </CardContent>
          </Card>
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
      </div>
    </section>
  )
}
