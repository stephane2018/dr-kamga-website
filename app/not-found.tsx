"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-primary/10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full p-8 shadow-xl">
              <img
                src="/new-logo.png"
                alt="Cabinet DAB"
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Page introuvable
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" asChild className="min-w-[200px]">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Retour à l'accueil
            </Link>
          </Button>

          <Button size="lg" variant="outline" asChild className="min-w-[200px]">
            <Link href="/contact" className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Nous contacter
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Pages populaires :
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/masterclass"
              className="text-sm text-primary hover:underline"
            >
              Masterclass
            </Link>
            <Link
              href="/seminaires"
              className="text-sm text-primary hover:underline"
            >
              Séminaires
            </Link>
            <Link
              href="/coaching"
              className="text-sm text-primary hover:underline"
            >
              Coaching
            </Link>
            <Link
              href="/a-propos"
              className="text-sm text-primary hover:underline"
            >
              À propos
            </Link>
            <Link
              href="/videos"
              className="text-sm text-primary hover:underline"
            >
              Vidéos
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la page précédente
          </button>
        </div>
      </div>
    </div>
  )
}
