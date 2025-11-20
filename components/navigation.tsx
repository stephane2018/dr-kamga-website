"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Check, Globe, User, Shield, LogOut, Settings } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useLanguage } from "@/locales/LanguageProvider"
import { useSession, signOut } from "next-auth/react"
import { Badge } from "@/components/ui/badge"

const languages = {
  fr: { name: 'Français', flag: '🇫🇷', short: 'FR' },
  en: { name: 'English', flag: '🇬🇧', short: 'EN' },
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const pathname = usePathname()
  const { language, t, setLanguage } = useLanguage()
  const { data: session } = useSession()

  const isActive = (path: string) => {
    const pathWithLang = `/${language}${path}`
    if (path === "/") return pathname === `/${language}` || pathname === `/${language}/`
    return pathname.startsWith(pathWithLang)
  }

  const getLocalizedPath = (path: string) => {
    return `/${language}${path}`
  }

  const dropdownRef = useRef<HTMLDivElement>(null)
  const userDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false)
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang)
    setLangDropdownOpen(false)
  }

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/admin/login",
      redirect: true,
    })
  }

  return (
    <nav className="bg-primary sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={getLocalizedPath("/")} className="flex ">
            <div className="md:w-14 md:h-14 h-11 w-11 bg-primary-foreground rounded-full flex items-center justify-center">
              <Image src="/new-logo.png" alt="Logo" width={80} height={80} className="w-full h-full rounded-full" />
            </div>
            <div className="flex flex-col ml-2 md:mt-4 mt-2">
              <span className="font-semibold text-lg text-white">Cabinet DAB</span>
            </div>

          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href={getLocalizedPath("/")}
              className={cn(
                "relative px-2 py-2 rounded-lg transition-all duration-200",
                isActive("/")
                  ? "text-white bg-white/10 font-medium"
                  : "text-white/80 hover:text-white hover:bg-white/5 "
              )}
            >
              {t.nav.home}
              {isActive("/") && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
            </Link>
            <Link
              href={getLocalizedPath("/a-propos")}
              className={cn(
                "relative  px-2 py-2 rounded-lg transition-all duration-200",
                isActive("/a-propos")
                    ? "text-white bg-white/10 font-medium"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              )}
            >
              {t.nav.about}
              {isActive("/a-propos") && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
            </Link>
            <Link
              href={getLocalizedPath("/masterclass")}
              className={cn(
                "relative  px-2 py-2 rounded-lg transition-all duration-200",
                isActive("/masterclass")
                   ? "text-white bg-white/10 font-medium"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              )}
            >
              {t.nav.masterclass}
              {isActive("/masterclass") && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
            </Link>

            <Link
              href={getLocalizedPath("/coaching")}
              className={cn(
                "relative  px-1 py-2 rounded-lg transition-all duration-200",
                isActive("/coaching")
                   ? "text-white bg-white/10 font-medium"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              )}
            >
              {t.nav.coaching}
              {isActive("/coaching") && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
            </Link>
            <Button variant="secondary" asChild>
              <Link href={getLocalizedPath("/contact")}>{t.nav.contact}</Link>
            </Button>

            {/* Custom Language Dropdown - Desktop */}
            <div className="relative ml-2" ref={dropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-all"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{languages[language].flag} {languages[language].short}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>


              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="py-1">

                    <button
                      onClick={() => handleLanguageChange('fr')}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        language === 'fr'
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">{languages.fr.flag}</span>
                      <span className="flex-1 text-left">{languages.fr.name}</span>
                      {language === 'fr' && <Check className="h-4 w-4 text-primary" />}
                    </button>
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        language === 'en'
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">{languages.en.flag}</span>
                      <span className="flex-1 text-left">{languages.en.name}</span>
                      {language === 'en' && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu - Desktop */}
            {session && (
              <div className="relative ml-2" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-all border border-white/20"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{session.user?.name || 'Admin'}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <p className="font-semibold text-gray-900 text-sm">{session.user?.name}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{session.user?.email}</p>
                      {session.user?.role && (
                        <Badge
                          variant={session.user.role === "admin" ? "default" : "secondary"}
                          className="mt-2 text-xs"
                        >
                          {session.user.role === "admin" ? (
                            <>
                              <Shield className="h-3 w-3 mr-1" />
                              Admin
                            </>
                          ) : (
                            <>
                              <User className="h-3 w-3 mr-1" />
                              Manager
                            </>
                          )}
                        </Badge>
                      )}
                    </div>
                    <div className="py-1">
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Administration</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

       
          <div className="md:hidden">
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 rounded-t-md sm:px-3 bg-white border-t border-primary/20">
              <Link
                href={getLocalizedPath("/")}
                className="block px-3 py-2 text-primary hover:text-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.home}
              </Link>
              <Link
                href={getLocalizedPath("/a-propos")}
                className="block px-3 py-2 text-primary hover:text-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.about}
              </Link>
              <Link
                href={getLocalizedPath("/masterclass")}
                className="block px-3 py-2 text-primary hover:text-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.masterclass}
              </Link>

              <Link
                href={getLocalizedPath("/coaching")}
                className="block px-3 py-2 text-primary hover:text-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.coaching}
              </Link>
              <div className="px-3 py-2">
                <Button asChild className="w-full">
                  <Link href={getLocalizedPath("/contact")}>{t.nav.contact}</Link>
                </Button>
              </div>

              {/* User Menu - Mobile */}
              {session && (
                <div className="px-3 py-4 border-t border-primary/10">
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{session.user?.name}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{session.user?.email}</p>
                      </div>
                      {session.user?.role && (
                        <Badge
                          variant={session.user.role === "admin" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {session.user.role === "admin" ? (
                            <>
                              <Shield className="h-3 w-3 mr-1" />
                              Admin
                            </>
                          ) : (
                            <>
                              <User className="h-3 w-3 mr-1" />
                              Manager
                            </>
                          )}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Administration</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Language Switcher - Mobile */}
              <div className="px-3 py-4 border-t border-primary/10">

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      handleLanguageChange('fr')
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      language === 'fr'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{languages.fr.flag}</span>
                    <span className="flex-1 text-left">{languages.fr.name}</span>
                    {language === 'fr' && <Check className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => {
                      handleLanguageChange('en')
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      language === 'en'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{languages.en.flag}</span>
                    <span className="flex-1 text-left">{languages.en.name}</span>
                    {language === 'en' && <Check className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
