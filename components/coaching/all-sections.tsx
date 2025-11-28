"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Target, Calendar, CheckCircle, Star, Phone } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/locales/LanguageProvider"
import { DiagnosticModal } from "./diagnostic-modal"

export function CoachingHeroSection() {
  const { t } = useLanguage()
  
  return (
    <section className="relative bg-gradient-to-br from-[#222C57] via-[#222C57] to-[#1a2242] py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute top-14 left-14 w-32 h-32 animate-pulse" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
        <svg className="absolute top-8 right-12 w-28 h-28" viewBox="0 0 100 100" fill="none">
          <path d="M20 20 L80 20 L80 80 L20 80 Z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M35 35 L65 35 L65 65 L35 65 Z" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
        <svg className="absolute bottom-18 left-1/3 w-26 h-26" viewBox="0 0 100 100" fill="none">
          <polygon points="50,15 85,75 15,75" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M40 55 L60 55" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <svg className="absolute bottom-12 right-1/4 w-30 h-30" viewBox="0 0 100 100" fill="none">
          <path d="M25 50 Q50 25 75 50 Q50 75 25 50" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FDC50A]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#90C14E]/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Premium badge */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-6 py-2 text-sm font-semibold backdrop-blur-sm" variant="secondary">
              {t.coaching.hero.badge}
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-center text-white leading-tight">
            {t.coaching.hero.title}
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-4 text-[#FDC50A] font-light">
              {t.coaching.hero.subtitle}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto text-center mb-12 leading-relaxed">
            {t.coaching.hero.description}
          </p>

          {/* Value props grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all">
              <div className="text-4xl font-bold text-white mb-2">{t.coaching.hero.valueProps.prop1.value}</div>
              <p className="text-white/80 text-sm">{t.coaching.hero.valueProps.prop1.description}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all">
              <div className="text-4xl font-bold text-white mb-2">{t.coaching.hero.valueProps.prop2.value}</div>
              <p className="text-white/80 text-sm">{t.coaching.hero.valueProps.prop2.description}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all">
              <div className="text-4xl font-bold text-white mb-2">{t.coaching.hero.valueProps.prop3.value}</div>
              <p className="text-white/80 text-sm">{t.coaching.hero.valueProps.prop3.description}</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            <Link href="#contact" >
              <Button
              size="lg"
              className="bg-[#FDC50A] text-[#222C57] hover:bg-[#FDC50A]/90 text-lg px-8 py-6 rounded-xl shadow-2xl font-bold"
              asChild
              
            >
              {t.coaching.hero.cta.primary}
            </Button>
            </Link>
            
            <Link href="#content" >

            <Button
              size="lg"
            
              className="border-2 border-white/50 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
              asChild
            >
              {t.coaching.hero.cta.secondary}
            </Button>
            </Link>
          </div>

          {/* Social proof
          <div className="text-center mt-12">
            <p className="text-white/70 text-sm mb-4">{t.coaching.hero.socialProof.limitedSpots}</p>
            <div className="flex items-center justify-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-700 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 border-2 border-white"></div>
              </div>
              <p className="text-white/80 text-sm ml-2">
                {t.coaching.hero.socialProof.successCount}
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export function PositioningSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4" variant="outline">
              {t.coaching.positioning.badge}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">{t.coaching.positioning.title}</h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              {t.coaching.positioning.description}
            </p>
            <div className="space-y-4">
              {t.coaching.positioning.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.coaching.positioning.expert.name}</h3>
              <p className="text-muted-foreground mb-6">
                {t.coaching.positioning.expert.description}
              </p>
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">{t.coaching.positioning.expert.rating}</span>
              </div>
              <p className="text-sm text-muted-foreground">{t.coaching.positioning.expert.basedOn}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ContentSection() {
  const { t } = useLanguage()
  
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-white to-secondary/5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              {t.coaching.content.badge}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            {t.coaching.content.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.coaching.content.subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Card 1 */}
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8 text-white" />
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mt-2 mb-3 text-foreground">
                  {t.coaching.content.cards.diagnostic.title}
                </h3>
                <p className="text-muted-foreground font-medium">
                  {t.coaching.content.cards.diagnostic.subtitle}
                </p>
              </div>

              <div className="space-y-3">
                {t.coaching.content.cards.diagnostic.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group/item">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors"></div>

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Calendar className="h-8 w-8 text-white" />
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mt-2 mb-3 text-foreground">
                  {t.coaching.content.cards.strategy.title}
                </h3>
                <p className="text-muted-foreground font-medium">
                  {t.coaching.content.cards.strategy.subtitle}
                </p>
              </div>

              <div className="space-y-3">
                {t.coaching.content.cards.strategy.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group/item">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors"></div>

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Phone className="h-8 w-8 text-white" />
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mt-2 mb-3 text-foreground">
                  {t.coaching.content.cards.followUp.title}
                </h3>
                <p className="text-muted-foreground font-medium">
                  {t.coaching.content.cards.followUp.subtitle}
                </p>
              </div>

              <div className="space-y-3">
                {t.coaching.content.cards.followUp.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group/item">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom highlight */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl px-8 py-6 border border-primary/20">
            <p className="text-muted-foreground">
              {t.coaching.content.result}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function StatsSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              {t.coaching.stats.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t.coaching.stats.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{t.coaching.stats.items.experience.value}</div>
              <div className="text-sm text-muted-foreground">{t.coaching.stats.items.experience.label}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">{t.coaching.stats.items.farmers.value}</div>
              <div className="text-sm text-muted-foreground">{t.coaching.stats.items.farmers.label}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">{t.coaching.stats.items.countries.value}</div>
              <div className="text-sm text-muted-foreground">{t.coaching.stats.items.countries.label}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{t.coaching.stats.items.growth.value}</div>
              <div className="text-sm text-muted-foreground">{t.coaching.stats.items.growth.label}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TestimonialsSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t.coaching.testimonials.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t.coaching.testimonials.items.testimonial1.name}</CardTitle>
                  <CardDescription>{t.coaching.testimonials.items.testimonial1.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">
                {t.coaching.testimonials.items.testimonial1.content}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t.coaching.testimonials.items.testimonial2.name}</CardTitle>
                  <CardDescription>{t.coaching.testimonials.items.testimonial2.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">
                {t.coaching.testimonials.items.testimonial2.content}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export function BookingSection() {
  const { t } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t.coaching.booking.title}</h2>
          <p className="text-xl text-muted-foreground">
            {t.coaching.booking.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-green-100 text-green-800">{t.coaching.booking.diagnostic.badge}</Badge>
                <div className="text-sm text-muted-foreground">{t.coaching.booking.diagnostic.duration}</div>
              </div>
              <CardTitle className="text-xl">{t.coaching.booking.diagnostic.title}</CardTitle>
              <CardDescription>{t.coaching.booking.diagnostic.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {t.coaching.booking.diagnostic.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium">{t.coaching.booking.diagnostic.slotsTitle}</p>
                <div className="space-y-2">
                  {/* <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div>
                      <div className="font-medium">Mardi 10 Décembre</div>
                      <div className="text-sm text-muted-foreground">14h00 - 14h30</div>
                    </div>
                    <Button size="sm" variant="outline">{t.coaching.booking.diagnostic.cta.split(' ').slice(-2).join(' ')}</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div>
                      <div className="font-medium">Jeudi 12 Décembre</div>
                      <div className="text-sm text-muted-foreground">10h00 - 10h30</div>
                    </div>
                    <Button size="sm" variant="outline">{t.coaching.booking.diagnostic.cta.split(' ').slice(-2).join(' ')}</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div>
                      <div className="font-medium">Vendredi 13 Décembre</div>
                      <div className="text-sm text-muted-foreground">16h00 - 16h30</div>
                    </div>
                    <Button size="sm" variant="outline">{t.coaching.booking.diagnostic.cta.split(' ').slice(-2).join(' ')}</Button>
                  </div> */}
                </div>
              </div>
              <Button className="w-full" onClick={() => setIsModalOpen(true)}>
                {t.coaching.booking.diagnostic.cta}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-primary text-primary-foreground">{t.coaching.booking.premium.badge}</Badge>
                <div className="text-sm text-muted-foreground">{t.coaching.booking.premium.duration}</div>
              </div>
              <CardTitle className="text-xl">{t.coaching.booking.premium.title}</CardTitle>
              <CardDescription>{t.coaching.booking.premium.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {t.coaching.booking.premium.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="bg-primary/5 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">{t.coaching.booking.premium.programDuration}</div>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link href="/contact?service=coaching-premium">{t.coaching.booking.premium.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10">
          <h3 className="text-lg font-semibold mb-4 text-center">{t.coaching.booking.howItWorks.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">1</span>
              </div>
              <p className="font-medium">{t.coaching.booking.howItWorks.steps.step1.title}</p>
              <p className="text-muted-foreground">{t.coaching.booking.howItWorks.steps.step1.description}</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">2</span>
              </div>
              <p className="font-medium">{t.coaching.booking.howItWorks.steps.step2.title}</p>
              <p className="text-muted-foreground">{t.coaching.booking.howItWorks.steps.step2.description}</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">3</span>
              </div>
              <p className="font-medium">{t.coaching.booking.howItWorks.steps.step3.title}</p>
              <p className="text-muted-foreground">{t.coaching.booking.howItWorks.steps.step3.description}</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">4</span>
              </div>
              <p className="font-medium">{t.coaching.booking.howItWorks.steps.step4.title}</p>
              <p className="text-muted-foreground">{t.coaching.booking.howItWorks.steps.step4.description}</p>
            </div>
          </div>
        </div>
      </div>

      <DiagnosticModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  )
}

export function CtaSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
          {t.coaching.cta.title}
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8 text-pretty">
          {t.coaching.cta.description}
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/contact">{t.coaching.cta.button}</Link>
        </Button>
      </div>
    </section>
  )
}
