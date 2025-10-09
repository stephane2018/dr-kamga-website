"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <nav className="bg-primary sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex ">
            <div className="w-14   h-14 bg-primary-foreground rounded-full flex items-center justify-center">
              <Image src="/new-logo.png" alt="Logo" width={80} height={80} className="w-full h-full rounded-full" />
            </div>
            <div className="flex flex-col ml-2 mt-4">  
              <span className="font-semibold text-lg text-white">Cabinet DAB</span>
            </div>
           
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center  space-x-8">
            <Link
              href="/"
              className={cn(
                "relative px-2 py-2 rounded-lg transition-all duration-200",
                isActive("/")
                  ? "text-white bg-white/10 font-medium"
                  : "text-white/80 hover:text-white hover:bg-white/5 "
              )}
            >
              Accueil
              {isActive("/") && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
            </Link>
            <Link
              href="/a-propos"
              className={cn(
                "relative  px-2 py-2 rounded-lg transition-all duration-200",
                isActive("/a-propos")
                    ? "text-white bg-white/10 font-medium"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              )}
            >
              À Propos
              {isActive("/a-propos") && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
            </Link>
            <Link
              href="/masterclass"
              className={cn(
                "relative  px-2 py-2 rounded-lg transition-all duration-200",
                isActive("/masterclass")
                   ? "text-white bg-white/10 font-medium"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              )}
            >
              Masterclass
              {isActive("/masterclass") && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
            </Link>
            {/* <Link
              href="/seminaires"
              className={cn(
                "relative px-3 py-2 rounded-lg transition-all duration-200",
                isActive("/seminaires")
                  ? "text-primary-foreground bg-primary-foreground/10 font-medium"
                  : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/5"
              )}
            >
              Séminaires
              {isActive("/seminaires") && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-secondary rounded-full"></div>
              )}
            </Link> */}
            <Link
              href="/coaching"
              className={cn(
                "relative  px-1 py-2 rounded-lg transition-all duration-200",
                isActive("/coaching")
                   ? "text-white bg-white/10 font-medium"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              )}
            >
              Coaching Privé
              {isActive("/coaching") && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
            </Link>
            <Button variant="secondary" asChild>
              <Link href="/contact">Nous Contacter</Link>
            </Button>
            {/* <Button variant="outline" className="text-primary border-white hover:bg-white/10" asChild>
              <Link href="/admin/login">Se connecter</Link>
            </Button> */}
          </div>

       
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:bg-primary/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-primary/20">
              <Link
                href="/"
                className="block px-3 py-2 text-primary hover:text-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/a-propos"
                className="block px-3 py-2 text-primary hover:text-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                À Propos
              </Link>
              <Link
                href="/masterclass"
                className="block px-3 py-2 text-primary hover:text-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Masterclass
              </Link>
              {/* <Link
                href="/seminaires"
                className="block px-3 py-2 text-primary hover:text-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Séminaires
              </Link> */}
              <Link
                href="/coaching"
                className="block px-3 py-2 text-primary hover:text-primary/80 transition-colors"
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
