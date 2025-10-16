"use client"

import { useLanguage } from '@/locales/LanguageProvider'
import { Button } from '@/components/ui/button'
import { Globe, ChevronDown, Check } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

const languages = {
  fr: { name: 'Français', flag: '🇫🇷' },
  en: { name: 'English', flag: '🇬🇧' },
}

export function LanguageSwitcher({ variant = 'header' }: { variant?: 'header' | 'mobile' }) {
  const { language, setLanguage } = useLanguage()

  if (variant === 'mobile') {
    return (
      <div className="w-full">
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setLanguage('fr')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              language === 'fr'
                ? 'bg-primary text-primary-foreground font-medium'
                : 'hover:bg-accent text-foreground'
            }`}
          >
            <span className="text-xl">{languages.fr.flag}</span>
            <span className="flex-1 text-left">{languages.fr.name}</span>
            {language === 'fr' && <Check className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              language === 'en'
                ? 'bg-primary text-primary-foreground font-medium'
                : 'hover:bg-accent text-foreground'
            }`}
          >
            <span className="text-xl">{languages.en.flag}</span>
            <span className="flex-1 text-left">{languages.en.name}</span>
            {language === 'en' && <Check className="h-4 w-4" />}
          </button>
        </div>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10 gap-2 px-3"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{languages[language].flag}</span>
          <span className="uppercase font-semibold">{language}</span>
          <ChevronDown className="h-3 w-3 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
       
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setLanguage('fr')}
          className={`cursor-pointer ${
            language === 'fr' ? 'bg-primary/10 font-medium' : ''
          }`}
        >
          <span className="mr-2 text-lg">{languages.fr.flag}</span>
          <span className="flex-1">{languages.fr.name}</span>
          {language === 'fr' && <Check className="h-4 w-4 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={`cursor-pointer ${
            language === 'en' ? 'bg-primary/10 font-medium' : ''
          }`}
        >
          <span className="mr-2 text-lg">{languages.en.flag}</span>
          <span className="flex-1">{languages.en.name}</span>
          {language === 'en' && <Check className="h-4 w-4 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
