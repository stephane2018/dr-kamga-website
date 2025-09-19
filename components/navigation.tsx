"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-primary sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">CD</span>
            </div>
            <span className="font-bold text-lg text-primary-foreground">Cabinetdab</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
              Accueil
            </Link>
            <Link href="/videos" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
              Vidéos
            </Link>
            <Link
              href="/masterclass"
              className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
            >
              Masterclass
            </Link>
            <Link
              href="/seminaires"
              className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
            >
              Séminaires
            </Link>
            <Link
              href="/coaching"
              className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
            >
              Coaching Privé
            </Link>
            <Button variant="secondary" asChild>
              <Link href="/contact">Nous Contacter</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary border-t border-primary-foreground/20">
              <Link
                href="/"
                className="block px-3 py-2 text-primary-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/videos"
                className="block px-3 py-2 text-primary-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Vidéos
              </Link>
              <Link
                href="/masterclass"
                className="block px-3 py-2 text-primary-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Masterclass
              </Link>
              <Link
                href="/seminaires"
                className="block px-3 py-2 text-primary-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Séminaires
              </Link>
              <Link
                href="/coaching"
                className="block px-3 py-2 text-primary-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Coaching Privé
              </Link>
              <div className="px-3 py-2">
                <Button asChild className="w-full">
                  <Link href="/contact">Nous Contacter</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
